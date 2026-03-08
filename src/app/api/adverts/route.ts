import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";

/**
 * GET /api/adverts?site=xxx&placement=yyy&product=zzz
 * Public endpoint — returns active adverts for display on landing pages.
 * No auth required.
 */
export async function GET(request: NextRequest) {
  const site = request.nextUrl.searchParams.get("site");
  const placement = request.nextUrl.searchParams.get("placement");
  const product = request.nextUrl.searchParams.get("product");

  if (!site || !placement) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  await initOperatorTables();

  let query: string;
  let params: (string | null)[];

  if (product) {
    query = `SELECT a.business_slug, a.image_urls, a.link_url, a.alt_text
             FROM adverts a
             WHERE a.site = $1 AND a.placement = $2 AND a.product = $3
               AND a.status = 'active'
               AND (a.start_date IS NULL OR a.start_date <= CURRENT_DATE)
               AND (a.end_date IS NULL OR a.end_date >= CURRENT_DATE)
               AND array_length(a.image_urls, 1) > 0
             ORDER BY a.updated_at DESC`;
    params = [site, placement, product];
  } else {
    query = `SELECT a.business_slug, a.image_urls, a.link_url, a.alt_text
             FROM adverts a
             WHERE a.site = $1 AND a.placement = $2
               AND a.status = 'active'
               AND (a.start_date IS NULL OR a.start_date <= CURRENT_DATE)
               AND (a.end_date IS NULL OR a.end_date >= CURRENT_DATE)
               AND array_length(a.image_urls, 1) > 0
             ORDER BY a.updated_at DESC`;
    params = [site, placement];
  }

  const result = await pool.query(query, params);

  const adverts = result.rows.map((row) => ({
    businessSlug: row.business_slug,
    businessName: row.business_slug.replace(/-/g, " "),
    imageUrls: (row.image_urls || []).filter((url: string) => url !== ""),
    linkUrl: row.link_url,
    altText: row.alt_text,
  }));

  // Shuffle so each page load starts with a random advertiser (fair rotation)
  for (let i = adverts.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [adverts[i], adverts[j]] = [adverts[j], adverts[i]];
  }

  return NextResponse.json({ adverts });
}
