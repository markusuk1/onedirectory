import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";

/**
 * GET /api/operator/profile?slug=xxx&product=yyy&site=zzz
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
    return NextResponse.json({ error: "Not authorized for this business" }, { status: 403 });
  }

  const profile = await pool.query(
    `SELECT description, phone, landline_phone, mobile_phone, email, website, logo_url, tagline, services
     FROM operator_profiles
     WHERE business_slug = $1 AND product = $2 AND site = $3`,
    [slug, product, site]
  );

  return NextResponse.json({
    profile: profile.rows[0] || null,
  });
}

/**
 * PUT /api/operator/profile
 */
export async function PUT(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    slug,
    product,
    site,
    description,
    phone,
    landlinePhone,
    mobilePhone,
    email,
    website,
    tagline,
    services,
  } = body;

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
    return NextResponse.json({ error: "Not authorized for this business" }, { status: 403 });
  }

  await pool.query(
    `INSERT INTO operator_profiles (operator_id, business_slug, product, site, description, phone, landline_phone, mobile_phone, email, website, tagline, services, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, NOW())
     ON CONFLICT (business_slug, product, site)
     DO UPDATE SET description = $5, phone = $6, landline_phone = $7, mobile_phone = $8, email = $9, website = $10, tagline = $11, services = $12, updated_at = NOW()`,
    [
      session.user.id,
      slug,
      product,
      site,
      description || null,
      landlinePhone || mobilePhone || phone || null,
      landlinePhone || phone || null,
      mobilePhone || null,
      email || null,
      website || null,
      tagline || null,
      services && services.length > 0 ? services : null,
    ]
  );

  return NextResponse.json({ success: true });
}
