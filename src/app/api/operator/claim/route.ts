import { NextRequest, NextResponse } from "next/server";
import { createClaim, completeClaim, getClaimByToken } from "@/lib/claim";

/**
 * POST /api/operator/claim
 * Two modes:
 * 1. { action: "create", businessSlug, product, site } — generate a claim token
 * 2. { action: "complete", token, name, email, password } — complete the claim
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (body.action === "create") {
      const { businessSlug, product, site } = body;
      if (!businessSlug || !product || !site) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
      const token = await createClaim(businessSlug, product, site);
      if (!token) {
        return NextResponse.json(
          { error: "This business has already been claimed" },
          { status: 409 }
        );
      }
      return NextResponse.json({ token });
    }

    if (body.action === "complete") {
      const { token, name, email, password } = body;
      if (!token || !name || !email || !password) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }
      if (password.length < 8) {
        return NextResponse.json(
          { error: "Password must be at least 8 characters" },
          { status: 400 }
        );
      }
      const result = await completeClaim(token, name, email, password);
      if (!result.success) {
        return NextResponse.json({ error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Claim error:", error);
    return NextResponse.json(
      { error: "Failed to process claim" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/operator/claim?token=xxx — validate a claim token
 */
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Token required" }, { status: 400 });
  }

  const claim = await getClaimByToken(token);
  if (!claim) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    businessSlug: claim.business_slug,
    product: claim.product,
    site: claim.site,
    status: claim.status,
  });
}
