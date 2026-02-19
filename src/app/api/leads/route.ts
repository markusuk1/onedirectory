import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import pool, { initDb } from "@/lib/db";
import { getSiteId, getSiteConfig } from "@/lib/siteConfig";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";

export async function POST(request: NextRequest) {
  try {
    await initDb();

    const body = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";
    const siteId = getSiteId();
    const site = getSiteConfig();

    await pool.query(
      `INSERT INTO leads (type, site, business_slug, business_name, name, email, phone, date, passengers, pickup, destination, journey_type, message, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
      [
        body.type || "quote_request",
        siteId,
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

    // Send email notification
    if (resend && NOTIFY_EMAIL) {
      const businessLine = body.businessName
        ? `<tr><td style="padding:4px 8px;font-weight:600">Business</td><td style="padding:4px 8px">${body.businessName}</td></tr>`
        : "";

      await resend.emails.send({
        from: `${site.name} <notifications@${site.domain}>`,
        to: NOTIFY_EMAIL,
        subject: `New Quote Request — ${site.shortName}${body.businessName ? ` — ${body.businessName}` : ""}`,
        html: `
          <h2 style="margin:0 0 16px">New Quote Request</h2>
          <p style="margin:0 0 12px;color:#666">From <strong>${site.name}</strong> (${site.domain})</p>
          <table style="border-collapse:collapse;width:100%;max-width:500px">
            ${businessLine}
            <tr><td style="padding:4px 8px;font-weight:600">Name</td><td style="padding:4px 8px">${body.name || "—"}</td></tr>
            <tr><td style="padding:4px 8px;font-weight:600">Email</td><td style="padding:4px 8px">${body.email || "—"}</td></tr>
            <tr><td style="padding:4px 8px;font-weight:600">Phone</td><td style="padding:4px 8px">${body.phone || "—"}</td></tr>
            <tr><td style="padding:4px 8px;font-weight:600">Date</td><td style="padding:4px 8px">${body.date || "—"}</td></tr>
            <tr><td style="padding:4px 8px;font-weight:600">Passengers</td><td style="padding:4px 8px">${body.passengers || "—"}</td></tr>
            <tr><td style="padding:4px 8px;font-weight:600">Journey</td><td style="padding:4px 8px">${body.journeyType || "—"}</td></tr>
            <tr><td style="padding:4px 8px;font-weight:600">Pickup</td><td style="padding:4px 8px">${body.pickup || "—"}</td></tr>
            <tr><td style="padding:4px 8px;font-weight:600">Destination</td><td style="padding:4px 8px">${body.destination || "—"}</td></tr>
            ${body.message ? `<tr><td style="padding:4px 8px;font-weight:600">Message</td><td style="padding:4px 8px">${body.message}</td></tr>` : ""}
          </table>
        `,
      }).catch((err) => console.error("Email notification failed:", err));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead save error:", error);
    return NextResponse.json(
      { error: "Failed to save lead" },
      { status: 500 }
    );
  }
}
