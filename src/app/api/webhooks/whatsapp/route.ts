import { NextRequest, NextResponse } from "next/server";

const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN || "hireuk_wh_verify_2026";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "";

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

    // Handle incoming messages
    if (value.messages && value.messages.length > 0) {
      for (const message of value.messages) {
        const from = message.from; // sender phone number
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

        // Send Telegram alert
        await sendTelegramAlert(
          `📱 <b>WhatsApp Message Received</b>\n\n` +
          `👤 From: ${senderName}\n` +
          `📞 Number: +${from}\n` +
          `💬 Message: ${messageText}\n` +
          `🕐 Time: ${new Date(parseInt(timestamp) * 1000).toLocaleString("en-GB", { timeZone: "Europe/London" })}`
        );
      }
    }

    // Handle message status updates (sent/delivered/read)
    if (value.statuses && value.statuses.length > 0) {
      for (const status of value.statuses) {
        const recipientId = status.recipient_id;
        const statusType = status.status; // sent, delivered, read, failed
        const msgTimestamp = status.timestamp;

        // Only alert on failures
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
