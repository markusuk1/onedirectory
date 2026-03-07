import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import pool, { initDb } from "@/lib/db";
import { getSiteConfig, getSiteId } from "@/lib/siteConfig";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const site = getSiteConfig();
    const siteId = getSiteId();
    const ip = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";

    await initDb();
    await pool.query(
      `INSERT INTO leads (type, site, name, email, message, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      ["feedback", siteId, name, email, message, ip, userAgent]
    );

    if (NOTIFY_EMAIL) {
      await sendEmail({
        from: "Hire UK Feedback <notify@hirenortheast.co.uk>",
        to: NOTIFY_EMAIL,
        subject: `New website feedback — ${site.shortName}`,
        html: `
          <h2>New feedback submission</h2>
          <p><strong>Site:</strong> ${site.name} (${site.domain})</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback save error:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}
