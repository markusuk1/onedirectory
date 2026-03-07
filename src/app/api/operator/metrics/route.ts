import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";

/**
 * GET /api/operator/metrics?slug=xxx&product=yyy&site=zzz&period=30
 */
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  const product = request.nextUrl.searchParams.get("product");
  const site = request.nextUrl.searchParams.get("site");
  const period = parseInt(request.nextUrl.searchParams.get("period") || "30");

  if (!slug || !product || !site) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  await initOperatorTables();

  // Verify ownership
  const claim = await pool.query(
    `SELECT id FROM operator_claims
     WHERE operator_id = $1 AND business_slug = $2 AND product = $3 AND site = $4 AND status = 'approved'`,
    [session.user.id, slug, product, site]
  );

  if (claim.rows.length === 0) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  const since = new Date();
  since.setDate(since.getDate() - period);

  // Quote requests
  const quoteRequests = await pool.query(
    `SELECT COUNT(*) as count FROM leads
     WHERE business_slug = $1 AND product = $2 AND site = $3
       AND type = 'quote_request' AND created_at >= $4`,
    [slug, product, site, since]
  );

  // Phone reveals
  const phoneReveals = await pool.query(
    `SELECT COUNT(*) as count FROM leads
     WHERE business_slug = $1 AND site = $2
       AND type = 'phone_reveal' AND created_at >= $3`,
    [slug, site, since]
  );

  // Website clicks
  const websiteClicks = await pool.query(
    `SELECT COUNT(*) as count FROM leads
     WHERE business_slug = $1 AND site = $2
       AND type = 'website_click' AND created_at >= $3`,
    [slug, site, since]
  );

  // Auto-quotes sent
  const autoQuotes = await pool.query(
    `SELECT COUNT(*) as count FROM auto_quotes_sent
     WHERE business_slug = $1 AND sent_at >= $2`,
    [slug, since]
  );

  // Daily breakdown for the period
  const daily = await pool.query(
    `SELECT DATE(created_at) as date, type, COUNT(*) as count
     FROM leads
     WHERE business_slug = $1 AND site = $2 AND created_at >= $3
     GROUP BY DATE(created_at), type
     ORDER BY DATE(created_at)`,
    [slug, site, since]
  );

  return NextResponse.json({
    period,
    quoteRequests: parseInt(quoteRequests.rows[0].count),
    phoneReveals: parseInt(phoneReveals.rows[0].count),
    websiteClicks: parseInt(websiteClicks.rows[0].count),
    autoQuotesSent: parseInt(autoQuotes.rows[0].count),
    daily: daily.rows,
  });
}
