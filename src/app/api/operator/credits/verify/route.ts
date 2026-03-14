import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";
import { verifyCheckout } from "@/lib/sumup";

export const dynamic = "force-dynamic";

/**
 * GET /api/operator/credits/verify?slug=X&product=Y&site=Z
 *
 * Called after SumUp redirects back. Verifies the most recent pending
 * credit purchase for this business and marks it as paid if confirmed.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const slug = searchParams.get("slug");
  const product = searchParams.get("product");
  const site = searchParams.get("site");
  const origin = request.nextUrl.origin;
  const dashboardUrl = `${origin}/operator/dashboard`;

  if (!slug || !product || !site) {
    return NextResponse.redirect(`${dashboardUrl}?credits=error`);
  }

  await initOperatorTables();

  // Find the most recent pending credit purchase for this business
  const result = await pool.query(
    `SELECT id, sumup_checkout_id FROM quote_credit_purchases
     WHERE business_slug = $1 AND product = $2 AND site = $3 AND status = 'pending'
     ORDER BY created_at DESC LIMIT 1`,
    [slug, product, site]
  );

  if (result.rows.length === 0) {
    return NextResponse.redirect(`${dashboardUrl}?credits=not_found`);
  }

  const { id, sumup_checkout_id } = result.rows[0];

  const verification = await verifyCheckout(sumup_checkout_id);

  if (verification?.status === "PAID") {
    await pool.query(
      `UPDATE quote_credit_purchases SET status = 'paid', verified_at = NOW() WHERE id = $1`,
      [id]
    );
    return NextResponse.redirect(`${dashboardUrl}?credits=success`);
  }

  return NextResponse.redirect(`${dashboardUrl}?credits=pending`);
}
