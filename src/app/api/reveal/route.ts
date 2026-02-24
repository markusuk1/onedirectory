import { NextRequest, NextResponse } from "next/server";
import pool, { initDb } from "@/lib/db";
import { getSiteId } from "@/lib/siteConfig";
import { getPostHogClient } from "@/lib/posthog-server";

export async function POST(request: NextRequest) {
  try {
    await initDb();

    const body = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    await pool.query(
      `INSERT INTO leads (type, site, business_slug, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5)`,
      [body.type || "phone_reveal", getSiteId(), body.businessSlug || null, ip, userAgent]
    );

    // Track phone reveal server-side with PostHog
    const distinctId = request.headers.get("x-posthog-distinct-id") || ip || "anonymous";
    const sessionId = request.headers.get("x-posthog-session-id") || undefined;
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId,
      event: "phone_reveal_tracked",
      properties: {
        business_slug: body.businessSlug || null,
        site: getSiteId(),
        ...(sessionId ? { $session_id: sessionId } : {}),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reveal tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track reveal" },
      { status: 500 }
    );
  }
}
