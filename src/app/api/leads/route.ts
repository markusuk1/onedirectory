import { NextRequest, NextResponse } from "next/server";
import pool, { initDb } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    await initDb();

    const body = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    await pool.query(
      `INSERT INTO leads (type, business_slug, business_name, name, email, phone, date, passengers, pickup, destination, journey_type, message, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
      [
        body.type || "quote_request",
        body.businessSlug || null,
        body.businessName || null,
        body.name || null,
        body.email || null,
        body.phone || null,
        body.date || null,
        body.passengers || null,
        body.pickup || null,
        body.destination || null,
        body.journeyType || null,
        body.message || null,
        ip,
        userAgent,
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead save error:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
