import { NextRequest, NextResponse } from "next/server";
import pool, { initDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await initDb();

    const body = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    await pool.query(
      `INSERT INTO leads (type, business_slug, ip, user_agent)
       VALUES ($1, $2, $3, $4)`,
      [body.type || "phone_reveal", body.businessSlug || null, ip, userAgent]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reveal tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track reveal" },
      { status: 500 }
    );
  }
}
