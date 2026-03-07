import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";

/**
 * GET /api/operator/adverts?slug=xxx&product=yyy&site=zzz
 * Returns all adverts for a business (across all placements)
 */
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  const product = request.nextUrl.searchParams.get("product");
  const site = request.nextUrl.searchParams.get("site");

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

  const result = await pool.query(
    `SELECT id, image_urls, link_url, alt_text, placement, status, start_date, end_date
     FROM adverts
     WHERE business_slug = $1 AND product = $2 AND site = $3
     ORDER BY placement`,
    [slug, product, site]
  );

  return NextResponse.json({ adverts: result.rows });
}

/**
 * PUT /api/operator/adverts
 * Create or update an advert's link_url and alt_text.
 * Status is NOT operator-controllable (except pausing an active ad).
 */
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, product, site, placement, link_url, alt_text } = body;

  if (!slug || !product || !site || !placement) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

  await pool.query(
    `INSERT INTO adverts (operator_id, business_slug, product, site, placement, link_url, alt_text)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (business_slug, product, site, placement)
     DO UPDATE SET link_url = $6, alt_text = $7, updated_at = NOW()`,
    [session.user.id, slug, product, site, placement, link_url || null, alt_text || null]
  );

  return NextResponse.json({ ok: true });
}

/**
 * PATCH /api/operator/adverts
 * Operator can pause their own active advert.
 */
export async function PATCH(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, product, site, placement, action } = body;

  if (!slug || !product || !site || !placement || !action) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

  if (action === "pause") {
    await pool.query(
      `UPDATE adverts SET status = 'paused', updated_at = NOW()
       WHERE business_slug = $1 AND product = $2 AND site = $3 AND placement = $4 AND status = 'active'`,
      [slug, product, site, placement]
    );
  }

  return NextResponse.json({ ok: true });
}
