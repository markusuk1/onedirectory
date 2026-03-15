import { NextRequest, NextResponse } from "next/server";
import pool, { initDb } from "@/lib/db";
import { initInstantQuoteTables } from "@/lib/db-schema";
import { sendJobOffers } from "@/lib/job-outreach";

export async function POST(request: NextRequest) {
  try {
    await initDb();
    await initInstantQuoteTables();

    const body = await request.json();
    const { quoteId, sessionId, name, email, phone } = body;

    if (!quoteId || !sessionId || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Verify the quote exists and belongs to the session
    const quoteResult = await pool.query(
      `SELECT iq.id, iq.price_pence, iq.operator_price_pence, iq.platform_fee_pence, iq.summary,
              iqs.product, iqs.site, iqs.details, iqs.expires_at
       FROM instant_quotes iq
       JOIN instant_quote_sessions iqs ON iqs.id = iq.session_id
       WHERE iq.id = $1 AND iq.session_id = $2`,
      [quoteId, sessionId],
    );

    if (quoteResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Quote not found or expired" },
        { status: 404 },
      );
    }

    // Check for existing acceptance on this session
    const existingAcceptance = await pool.query(
      `SELECT id FROM quote_acceptances WHERE session_id = $1`,
      [sessionId],
    );

    if (existingAcceptance.rows.length > 0) {
      return NextResponse.json(
        { error: "A quote from this session has already been accepted" },
        { status: 409 },
      );
    }

    // Create acceptance record
    const acceptResult = await pool.query(
      `INSERT INTO quote_acceptances (quote_id, session_id, name, email, phone, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING id`,
      [quoteId, sessionId, name.trim(), email.trim(), phone.trim()],
    );
    const acceptanceId = acceptResult.rows[0].id;

    // Track analytics
    const quote = quoteResult.rows[0];
    await pool.query(
      `INSERT INTO quote_analytics (session_id, quote_id, event_type, product, site, tier, price_pence, metadata)
       VALUES ($1, $2, 'quote_accepted', $3, $4, 'premium', $5, $6)`,
      [
        sessionId,
        quoteId,
        quote.product,
        quote.site,
        quote.price_pence,
        JSON.stringify({
          acceptanceId,
          customerName: name.trim(),
          summary: quote.summary,
          operatorPrice: quote.operator_price_pence,
          platformFee: quote.platform_fee_pence,
        }),
      ],
    );

    // Trigger operator job outreach (non-blocking)
    const details = typeof quote.details === "string"
      ? JSON.parse(quote.details)
      : quote.details || {};

    sendJobOffers({
      acceptanceId,
      quoteId,
      sessionId,
      product: quote.product,
      site: quote.site,
      customerName: name.trim(),
      customerEmail: email.trim(),
      customerPhone: phone.trim(),
      customerPricePence: quote.price_pence,
      operatorPricePence: quote.operator_price_pence,
      platformFeePence: quote.platform_fee_pence,
      summary: quote.summary,
      details,
    }).catch((err) => console.error("Job outreach error:", err));

    return NextResponse.json({
      success: true,
      acceptanceId,
    });
  } catch (error) {
    console.error("Quote acceptance error:", error);
    return NextResponse.json(
      { error: "Failed to accept quote" },
      { status: 500 },
    );
  }
}
