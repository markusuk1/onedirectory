import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { initTrackingTables } from "@/lib/db-schema";

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "hireuk_wh_verify_2026";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

let trackingReady = false;
async function ensureTracking() {
  if (!trackingReady) {
    await initTrackingTables();
    trackingReady = true;
  }
}

// GET: Meta webhook verification (one-time handshake)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("[WhatsApp Webhook] Verified successfully");
    return new NextResponse(challenge, { status: 200 });
  }

  console.warn("[WhatsApp Webhook] Verification failed", { mode, token });
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

// Extract prices from message text
function extractPrices(text: string): Array<{ amount: number; currency: string; raw: string }> {
  const matches = text.match(/£\s*[\d,]+(\.\d{2})?/g) || [];
  return matches.map((raw) => ({
    amount: parseFloat(raw.replace(/[£,\s]/g, "")),
    currency: "GBP",
    raw: raw.trim(),
  }));
}

// Extract vehicle hints from message text
function extractVehicleHint(text: string): string {
  const matches = text.match(
    /(\d{1,2}\s*-?\s*seater|executive\s+coach|minibus|coach|luton|transit|sprinter|tipper|digger|dumper)/gi
  );
  if (!matches) return "";
  const unique = [...new Set(matches.map((m) => m.toLowerCase()))];
  return unique.slice(0, 3).join(", ");
}

// Classify operator availability from message text
function classifyAvailability(text: string, hasPrices: boolean): string {
  if (/\b(unavailable|can'?t do|cannot|not available|no longer|fully booked|unable)\b/i.test(text)) {
    return "declined";
  }
  if (hasPrices || /\b(available|yes|can do|happy to)\b/i.test(text)) {
    return "available";
  }
  return "unclear";
}

// POST: Incoming messages and status updates from WhatsApp
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract message data from webhook payload
    const entry = body?.entry?.[0];
    const changes = entry?.changes?.[0];
    const value = changes?.value;

    if (!value) {
      return NextResponse.json({ status: "ok" });
    }

    // Handle incoming messages (operator responses)
    if (value.messages && value.messages.length > 0) {
      await ensureTracking();

      for (const message of value.messages) {
        const from = message.from; // sender phone number (E.164 no +)
        const timestamp = message.timestamp;
        const msgType = message.type;

        // Get sender profile name if available
        const contact = value.contacts?.[0];
        const senderName = contact?.profile?.name || from;

        let messageText = "";
        if (msgType === "text") {
          messageText = message.text?.body || "";
        } else if (msgType === "image") {
          messageText = `[Image] ${message.image?.caption || ""}`;
        } else if (msgType === "document") {
          messageText = `[Document] ${message.document?.filename || ""}`;
        } else if (msgType === "audio") {
          messageText = "[Voice message]";
        } else if (msgType === "video") {
          messageText = "[Video]";
        } else if (msgType === "location") {
          messageText = `[Location] ${message.location?.latitude}, ${message.location?.longitude}`;
        } else {
          messageText = `[${msgType}]`;
        }

        console.log(`[WhatsApp Webhook] Message from ${senderName} (${from}): ${messageText}`);

        // Match to most recent outreach for this phone number
        try {
          const matchResult = await pool.query(
            `SELECT ol.id as outreach_id, ol.lead_id, ol.sent_at, ol.product
             FROM outreach_log ol
             WHERE ol.operator_phone = $1 AND ol.channel = 'whatsapp'
             ORDER BY ol.sent_at DESC
             LIMIT 1`,
            [from]
          );

          const match = matchResult.rows[0] || null;
          const matchConfidence = match ? "best_effort" : "unmatched";
          const responseTimeMinutes = match
            ? Math.round((Date.now() - new Date(match.sent_at).getTime()) / 60000)
            : null;

          // Extract structured data from message
          const prices = extractPrices(messageText);
          const vehicleInfo = extractVehicleHint(messageText);
          const availability = classifyAvailability(messageText, prices.length > 0);

          // Store response
          await pool.query(
            `INSERT INTO operator_responses
             (outreach_id, lead_id, channel, operator_phone, operator_name,
              raw_message, prices, vehicle_info, availability, match_confidence, response_time_minutes, received_at)
             VALUES ($1, $2, 'whatsapp', $3, $4, $5, $6, $7, $8, $9, $10, NOW())`,
            [
              match?.outreach_id || null,
              match?.lead_id || null,
              from,
              senderName,
              messageText,
              JSON.stringify(prices),
              vehicleInfo || null,
              availability,
              matchConfidence,
              responseTimeMinutes,
            ]
          );

          // Update lead status to 'quoted' if a price was provided
          if (match?.lead_id && prices.length > 0) {
            await pool.query(
              `UPDATE leads SET status = 'quoted' WHERE id = $1 AND status IN ('new', 'contacted')`,
              [match.lead_id]
            );
            await pool.query(
              `INSERT INTO lead_events (lead_id, event_type, new_value, notes)
               VALUES ($1, 'response_received', 'quoted', $2)`,
              [match.lead_id, `WhatsApp response from ${senderName} (${from}): ${availability}, ${prices.length} price(s)`]
            );
          }
        } catch (dbErr) {
          console.error("[WhatsApp Webhook] DB response logging failed:", dbErr);
        }

        // Send Telegram alert (keep existing behavior)
        await sendTelegramAlert(
          `📱 <b>WhatsApp Message Received</b>\n\n` +
          `👤 From: ${senderName}\n` +
          `📞 Number: +${from}\n` +
          `💬 Message: ${messageText}\n` +
          `🕐 Time: ${new Date(parseInt(timestamp) * 1000).toLocaleString("en-GB", { timeZone: "Europe/London" })}`
        );
      }
    }

    // Handle message status updates (sent/delivered/read/failed)
    if (value.statuses && value.statuses.length > 0) {
      await ensureTracking();

      for (const status of value.statuses) {
        const recipientId = status.recipient_id;
        const statusType = status.status; // sent, delivered, read, failed
        const msgTimestamp = status.timestamp;
        const waMessageId = status.id; // Meta's message ID — matches outreach_log.message_id

        // Update outreach_log with delivery status
        try {
          const errorMsg = statusType === "failed"
            ? `${status.errors?.[0]?.title || "Unknown error"} (${status.errors?.[0]?.code || "unknown"})`
            : null;

          await pool.query(
            `UPDATE outreach_log
             SET wa_status = $1, wa_status_at = $2, error_message = COALESCE($3, error_message)
             WHERE message_id = $4 AND channel = 'whatsapp'`,
            [
              statusType,
              new Date(parseInt(msgTimestamp) * 1000),
              errorMsg,
              waMessageId,
            ]
          );
        } catch (dbErr) {
          console.error("[WhatsApp Webhook] DB status update failed:", dbErr);
        }

        // Only alert on failures (keep existing behavior)
        if (statusType === "failed") {
          const errorCode = status.errors?.[0]?.code || "unknown";
          const errorTitle = status.errors?.[0]?.title || "Unknown error";

          console.error(`[WhatsApp Webhook] Message FAILED to ${recipientId}: ${errorTitle} (${errorCode})`);

          await sendTelegramAlert(
            `❌ <b>WhatsApp Message Failed</b>\n\n` +
            `📞 To: +${recipientId}\n` +
            `⚠️ Error: ${errorTitle}\n` +
            `🔢 Code: ${errorCode}\n` +
            `🕐 Time: ${new Date(parseInt(msgTimestamp) * 1000).toLocaleString("en-GB", { timeZone: "Europe/London" })}`
          );
        }
      }
    }

    // Always return 200 to acknowledge receipt (Meta requirement)
    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("[WhatsApp Webhook] Error processing webhook:", error);
    // Still return 200 to prevent Meta from retrying
    return NextResponse.json({ status: "ok" });
  }
}

async function sendTelegramAlert(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.warn("[WhatsApp Webhook] Telegram not configured, skipping alert");
    return;
  }

  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch (err) {
    console.error("[WhatsApp Webhook] Telegram alert failed:", err);
  }
}
