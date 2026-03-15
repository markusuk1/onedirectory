import { NextRequest, NextResponse } from "next/server";
import pool, { initDb } from "@/lib/db";
import { initInstantQuoteTables } from "@/lib/db-schema";
import { getSiteId } from "@/lib/siteConfig";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";
import { generateInstantQuotes, type Tier } from "@/lib/pricing";

export async function POST(request: NextRequest) {
  try {
    await initDb();
    await initInstantQuoteTables();

    const body = await request.json();
    const siteId = getSiteId();

    // Honeypot
    if (body._hp) {
      return NextResponse.json({ success: true, sessionId: "ok", quotes: [] });
    }

    const product = (body.product || "").trim() as ProductId;
    const details = body.details || {};
    const tier: Tier = body.tier || "premium";

    // Validate product exists
    if (!PRODUCT_CONFIGS[product]) {
      return NextResponse.json(
        { error: "Invalid product" },
        { status: 400 },
      );
    }

    // Generate quotes via pricing engine
    const batch = generateInstantQuotes(
      { product, site: siteId, details },
      tier,
    );

    // Store session
    const expiresAt = batch.expiresAt.toISOString();
    const sessionResult = await pool.query(
      `INSERT INTO instant_quote_sessions (product, site, details, tier, expires_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [product, siteId, JSON.stringify(details), tier, expiresAt],
    );
    const sessionId = sessionResult.rows[0].id;

    // Store individual quotes
    for (let i = 0; i < batch.quotes.length; i++) {
      const q = batch.quotes[i];
      await pool.query(
        `INSERT INTO instant_quotes (id, session_id, price_pence, operator_price_pence, platform_fee_pence, tier, summary, sort_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          q.id,
          sessionId,
          q.pricePence,
          q.operatorPricePence,
          q.platformFeePence,
          q.tier,
          q.summary,
          i,
        ],
      );
    }

    // Track analytics
    await pool.query(
      `INSERT INTO quote_analytics (session_id, event_type, product, site, tier, metadata)
       VALUES ($1, 'quotes_shown', $2, $3, $4, $5)`,
      [
        sessionId,
        product,
        siteId,
        tier,
        JSON.stringify({
          count: batch.quotes.length,
          minPrice: Math.min(...batch.quotes.map((q) => q.pricePence)),
          maxPrice: Math.max(...batch.quotes.map((q) => q.pricePence)),
          avgPrice: Math.round(
            batch.quotes.reduce((s, q) => s + q.pricePence, 0) /
              batch.quotes.length,
          ),
        }),
      ],
    );

    return NextResponse.json({
      success: true,
      sessionId,
      quotes: batch.quotes.map((q) => ({
        id: q.id,
        pricePence: q.pricePence,
        summary: q.summary,
        tier: q.tier,
      })),
      expiresAt,
    });
  } catch (error) {
    console.error("Quote generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate quotes" },
      { status: 500 },
    );
  }
}
