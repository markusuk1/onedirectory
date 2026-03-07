import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";

/**
 * GET /api/operator/auto-quotes?slug=xxx&product=yyy&site=zzz
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
    `SELECT enabled, config FROM auto_quote_configs
     WHERE business_slug = $1 AND product = $2 AND site = $3`,
    [slug, product, site]
  );

  return NextResponse.json({
    config: result.rows[0] || { enabled: false, config: {} },
  });
}

/**
 * PUT /api/operator/auto-quotes
 */
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { slug, product, site, enabled, config } = body;

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

  await pool.query(
    `INSERT INTO auto_quote_configs (operator_id, business_slug, product, site, enabled, config, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, NOW())
     ON CONFLICT (business_slug, product, site)
     DO UPDATE SET enabled = $5, config = $6, updated_at = NOW()`,
    [session.user.id, slug, product, site, enabled ?? false, JSON.stringify(config || {})]
  );

  return NextResponse.json({ success: true });
}
