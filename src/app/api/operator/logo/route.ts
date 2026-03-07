import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";

/**
 * POST /api/operator/logo
 * Accepts multipart form data with:
 * - file: the logo image
 * - slug: business slug
 * - product: product id
 * - site: site id
 */
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string;
  const product = formData.get("product") as string;
  const site = formData.get("site") as string;

  if (!file || !slug || !product || !site) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate file type
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }

  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be under 2MB" }, { status: 400 });
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

  // Upload to Vercel Blob
  const ext = file.name.split(".").pop() || "png";
  const filename = `logos/${slug}-${Date.now()}.${ext}`;

  const blob = await put(filename, file, {
    access: "public",
    contentType: file.type,
  });

  // Update profile with logo URL
  await pool.query(
    `INSERT INTO operator_profiles (operator_id, business_slug, product, site, logo_url, updated_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     ON CONFLICT (business_slug, product, site)
     DO UPDATE SET logo_url = $5, updated_at = NOW()`,
    [session.user.id, slug, product, site, blob.url]
  );

  return NextResponse.json({ url: blob.url });
}
