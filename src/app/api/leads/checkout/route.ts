import { NextRequest, NextResponse } from "next/server";
import { getBuyTokenDetails, getLeadPrice, createLeadCheckout } from "@/lib/lead-buy";

export const dynamic = "force-dynamic";

/**
 * GET /api/leads/checkout?token=X&op=HASH
 *
 * Creates a SumUp checkout for a lead purchase and redirects
 * the operator to the SumUp payment page. After payment, SumUp
 * redirects back to /leads/reveal/[token]?op=HASH.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const token = searchParams.get("token");
  const op = searchParams.get("op");

  if (!token || !op) {
    return NextResponse.json({ error: "Missing token or op" }, { status: 400 });
  }

  const lead = await getBuyTokenDetails(token);
  if (!lead || !lead.allow_direct_contact) {
    return NextResponse.json({ error: "Invalid token" }, { status: 404 });
  }

  const origin = request.nextUrl.origin;
  const redirectUrl = `${origin}/leads/reveal/${token}?op=${op}`;

  const paymentUrl = await createLeadCheckout(
    lead.token_id,
    op,
    lead.product,
    redirectUrl
  );

  if (!paymentUrl) {
    // SumUp not configured — fall back to reveal page directly (honor system)
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.redirect(paymentUrl);
}
