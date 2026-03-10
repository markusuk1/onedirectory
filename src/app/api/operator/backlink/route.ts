import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";

/**
 * POST — operator confirms they've added our badge/link to their website.
 * We mark backlink_added = true on their profile, unlocking 5 bonus quotes.
 */
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { slug, product, site } = await request.json();
  if (!slug || !product || !site)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  await initOperatorTables();

  // Verify ownership
  const claim = await pool.query(
    `SELECT id FROM operator_claims
     WHERE operator_id = $1 AND business_slug = $2 AND product = $3 AND site = $4 AND status = 'approved'`,
    [session.user.id, slug, product, site]
  );

  if (claim.rows.length === 0)
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });

  // Mark backlink as added (upsert profile row if needed)
  await pool.query(
    `INSERT INTO operator_profiles (operator_id, business_slug, product, site, backlink_added)
     VALUES ($1, $2, $3, $4, true)
     ON CONFLICT (business_slug, product, site)
     DO UPDATE SET backlink_added = true, updated_at = NOW()`,
    [session.user.id, slug, product, site]
  );

  return NextResponse.json({ ok: true });
}
