import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";
import { createCheckout } from "@/lib/sumup";

export const dynamic = "force-dynamic";

/**
 * GET /api/operator/credits/checkout?slug=X&product=Y&site=Z&pack=25
 *
 * Creates a SumUp checkout for a quote credit pack purchase.
 * Redirects operator to SumUp payment page.
 */
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const slug = searchParams.get("slug");
  const product = searchParams.get("product");
  const site = searchParams.get("site");
  const packCredits = parseInt(searchParams.get("pack") || "0", 10);

  if (!slug || !product || !site || !packCredits) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  const config = PRODUCT_CONFIGS[product as ProductId];
  if (!config?.creditPacks) {
    return NextResponse.json({ error: "No credit packs for this product" }, { status: 400 });
  }

  const pack = config.creditPacks.find((p) => p.credits === packCredits);
  if (!pack) {
    return NextResponse.json({ error: "Invalid pack size" }, { status: 400 });
  }

  await initOperatorTables();

  const origin = request.nextUrl.origin;

  const result = await createCheckout({
    amountPence: pack.pricePence,
    reference: `credits_${slug.slice(0, 20)}_${packCredits}`,
    description: `${pack.credits} quote credits — ${config.shortName}`,
    redirectUrl: `${origin}/api/operator/credits/verify?slug=${slug}&product=${product}&site=${site}`,
  });

  if (!result) {
    return NextResponse.redirect(`${origin}/operator/dashboard?credits=error`);
  }

  // Insert pending credit purchase record
  await pool.query(
    `INSERT INTO quote_credit_purchases
       (operator_id, business_slug, product, site, credits, amount_pence, sumup_checkout_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [session.user.id, slug, product, site, pack.credits, pack.pricePence, result.checkoutId]
  );

  return NextResponse.redirect(result.paymentUrl);
}
