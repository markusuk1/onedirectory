import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { put } from "@vercel/blob";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";

/**
 * POST /api/operator/advert-images
 * Upload a single advert image to a specific slot (0-3).
 * Accepts multipart form data: file, slug, product, site, placement, position
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
  const placement = formData.get("placement") as string;
  const position = parseInt(formData.get("position") as string);

  if (!file || !slug || !product || !site || !placement || isNaN(position) || position < 0 || position > 3) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }

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
  const filename = `adverts/${slug}-${placement}-${position}-${Date.now()}.${ext}`;

  const blob = await put(filename, file, {
    access: "public",
    contentType: file.type,
  });

  // Ensure advert row exists
  await pool.query(
    `INSERT INTO adverts (operator_id, business_slug, product, site, placement)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (business_slug, product, site, placement) DO NOTHING`,
    [session.user.id, slug, product, site, placement]
  );

  // Get current image_urls
  const result = await pool.query(
    `SELECT image_urls FROM adverts
     WHERE business_slug = $1 AND product = $2 AND site = $3 AND placement = $4`,
    [slug, product, site, placement]
  );

  const urls: string[] = result.rows[0]?.image_urls || ["", "", "", ""];
  // Pad to 4 slots
  while (urls.length < 4) urls.push("");
  urls[position] = blob.url;

  await pool.query(
    `UPDATE adverts SET image_urls = $1, updated_at = NOW()
     WHERE business_slug = $2 AND product = $3 AND site = $4 AND placement = $5`,
    [urls, slug, product, site, placement]
  );

  return NextResponse.json({ url: blob.url, position });
}
