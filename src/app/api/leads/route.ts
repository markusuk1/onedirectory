import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import pool, { initDb } from "@/lib/db";
import { getSiteId, getSiteConfig } from "@/lib/siteConfig";
import { getPostHogClient } from "@/lib/posthog-server";
import { createClaim } from "@/lib/claim";
import { processAutoQuotes } from "@/lib/auto-quote";
import { processOperatorOutreach } from "@/lib/operator-outreach";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";
import { validateFields } from "@/lib/formValidation";
import { createBuyToken, getLeadPrice } from "@/lib/lead-buy";

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";

export async function POST(request: NextRequest) {
  try {
    await initDb();

    const body = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "";
    const userAgent = request.headers.get("user-agent") || "";
    const siteId = getSiteId();
    const site = getSiteConfig();

    // Validate product-specific fields if config defines them
    if (body.product && body.details) {
      const config = PRODUCT_CONFIGS[body.product as ProductId];
      if (config?.quoteFields) {
        const errors = validateFields(config.quoteFields, body.details);
        if (Object.keys(errors).length > 0) {
          return NextResponse.json(
            { error: "Validation failed", fields: errors },
            { status: 400 }
          );
        }
      }
    }

    const leadResult = await pool.query(
      `INSERT INTO leads (type, site, product, business_slug, business_name, name, email, phone, date, passengers, pickup, destination, journey_type, message, details, ip, user_agent, allow_direct_contact, contact_methods)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
       RETURNING id`,
      [
        body.type || "quote_request",
        siteId,
        body.product || null,
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
        body.details ? JSON.stringify(body.details) : null,
        ip,
        userAgent,
        body.allowDirectContact || false,
        body.contactMethods?.length ? `{${body.contactMethods.join(",")}}` : null,
      ]
    );
    const leadId = leadResult.rows[0].id;

    // Generate buy token if customer opted in to direct contact
    let buyToken: string | null = null;
    if (body.allowDirectContact && body.product) {
      try {
        buyToken = await createBuyToken(leadId, body.product);
      } catch (err) {
        console.error("Buy token generation failed:", err);
      }
    }

    // Send email notification
    if (NOTIFY_EMAIL) {
      const businessLine = body.businessName
        ? `<tr><td style="padding:4px 8px;font-weight:600">Business</td><td style="padding:4px 8px">${body.businessName}</td></tr>`
        : "";
      const productLabels: Record<string, string> = {
        "van-hire": "Van Hire",
        "skip-hire": "Skip Hire",
        locksmith: "Locksmith",
        "removal-companies": "Removal Companies",
        "bouncy-castle-hire": "Bouncy Castle Hire",
        "limo-hire": "Limo Hire",
        "plant-hire": "Plant Hire",
        "driving-lessons": "Driving Lessons",
      };
      const productLabel = productLabels[body.product] || "Minibus Hire";

      // Build product-specific detail rows
      let detailRows = "";
      if (body.product === "skip-hire" && body.details) {
        const d = body.details;
        detailRows = `
          <tr><td style="padding:4px 8px;font-weight:600">Skip Size</td><td style="padding:4px 8px">${d.skipSize || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Waste Type</td><td style="padding:4px 8px">${d.wasteType || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Delivery Address</td><td style="padding:4px 8px">${d.address || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Duration</td><td style="padding:4px 8px">${d.duration || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Placement</td><td style="padding:4px 8px">${d.placement || "—"}</td></tr>
        `;
      } else if (body.product === "van-hire" && body.details) {
        const d = body.details;
        detailRows = `
          <tr><td style="padding:4px 8px;font-weight:600">Van Size</td><td style="padding:4px 8px">${d.vanSize || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Drive Type</td><td style="padding:4px 8px">${d.driveType || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Start Date</td><td style="padding:4px 8px">${d.startDate || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">End Date</td><td style="padding:4px 8px">${d.endDate || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Collection Location</td><td style="padding:4px 8px">${d.collectionLocation || "—"}</td></tr>
        `;
      } else if (body.product === "locksmith" && body.details) {
        const d = body.details;
        detailRows = `
          <tr><td style="padding:4px 8px;font-weight:600">Service</td><td style="padding:4px 8px">${d.serviceType || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Urgency</td><td style="padding:4px 8px">${d.urgency || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Property Type</td><td style="padding:4px 8px">${d.propertyType || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Location</td><td style="padding:4px 8px">${d.location || "—"}</td></tr>
        `;
      } else if (body.product === "removal-companies" && body.details) {
        const d = body.details;
        detailRows = `
          <tr><td style="padding:4px 8px;font-weight:600">Move Type</td><td style="padding:4px 8px">${d.moveType || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Bedrooms</td><td style="padding:4px 8px">${d.bedrooms || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Moving From</td><td style="padding:4px 8px">${d.movingFrom || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Moving To</td><td style="padding:4px 8px">${d.movingTo || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Moving Date</td><td style="padding:4px 8px">${d.moveDate || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Packing Service</td><td style="padding:4px 8px">${d.needPacking || "—"}</td></tr>
        `;
      } else if (body.product === "bouncy-castle-hire" && body.details) {
        const d = body.details;
        detailRows = `
          <tr><td style="padding:4px 8px;font-weight:600">Event Type</td><td style="padding:4px 8px">${d.eventType || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Event Date</td><td style="padding:4px 8px">${d.eventDate || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Venue</td><td style="padding:4px 8px">${d.venue || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Indoor/Outdoor</td><td style="padding:4px 8px">${d.indoorOutdoor || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Age Range</td><td style="padding:4px 8px">${d.ageRange || "—"}</td></tr>
        `;
      } else if (body.product === "limo-hire" && body.details) {
        const d = body.details;
        detailRows = `
          <tr><td style="padding:4px 8px;font-weight:600">Occasion</td><td style="padding:4px 8px">${d.occasion || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Event Date</td><td style="padding:4px 8px">${d.eventDate || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Pickup</td><td style="padding:4px 8px">${d.pickupLocation || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Destination</td><td style="padding:4px 8px">${d.destination || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Passengers</td><td style="padding:4px 8px">${d.passengers || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Hours</td><td style="padding:4px 8px">${d.hours || "—"}</td></tr>
        `;
      } else if (body.product === "plant-hire" && body.details) {
        const d = body.details;
        detailRows = `
          <tr><td style="padding:4px 8px;font-weight:600">Equipment</td><td style="padding:4px 8px">${d.equipmentType || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Start Date</td><td style="padding:4px 8px">${d.startDate || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Duration</td><td style="padding:4px 8px">${d.duration || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Site Location</td><td style="padding:4px 8px">${d.siteLocation || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Operated/Self-Drive</td><td style="padding:4px 8px">${d.operatedOrSelfDrive || "—"}</td></tr>
        `;
      } else if (body.product === "driving-lessons" && body.details) {
        const d = body.details;
        detailRows = `
          <tr><td style="padding:4px 8px;font-weight:600">Lesson Type</td><td style="padding:4px 8px">${d.lessonType || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Transmission</td><td style="padding:4px 8px">${d.transmission || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Experience</td><td style="padding:4px 8px">${d.experience || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Area</td><td style="padding:4px 8px">${d.area || "—"}</td></tr>
        `;
      } else {
        detailRows = `
          <tr><td style="padding:4px 8px;font-weight:600">Date</td><td style="padding:4px 8px">${body.date || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Passengers</td><td style="padding:4px 8px">${body.passengers || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Journey</td><td style="padding:4px 8px">${body.journeyType || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Pickup</td><td style="padding:4px 8px">${body.pickup || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Destination</td><td style="padding:4px 8px">${body.destination || "—"}</td></tr>
        `;
      }

      const fromAddress = "Hire UK Quotes <notify@hirenortheast.co.uk>";

      // Generate claim link for the business (if this lead is for a specific business)
      let claimSection = "";
      if (body.businessSlug && body.product) {
        const claimToken = await createClaim(body.businessSlug, body.product, siteId).catch(() => null);
        if (claimToken) {
          const claimUrl = `https://${site.domain}/operator/claim/${claimToken}`;
          claimSection = `
            <div style="margin:16px 0;padding:12px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px">
              <p style="margin:0 0 8px;font-weight:600;color:#0369a1">Operator Claim Link</p>
              <p style="margin:0;font-size:13px;color:#555">Send this to the operator so they can claim their profile:</p>
              <a href="${claimUrl}" style="display:inline-block;margin-top:8px;font-size:13px;color:#0369a1;word-break:break-all">${claimUrl}</a>
            </div>
          `;
        }
      }

      // Buy lead section for admin email
      let buySection = "";
      if (buyToken) {
        const { priceFormatted } = getLeadPrice(body.product);
        const buyUrl = `https://${site.domain}/leads/buy/${buyToken}`;
        buySection = `
            <div style="margin:16px 0;padding:12px;background:#fef9c3;border:1px solid #fde68a;border-radius:8px">
              <p style="margin:0 0 4px;font-weight:600;color:#92400e">Buy Lead Available — ${priceFormatted}</p>
              <p style="margin:0 0 8px;font-size:13px;color:#555">Customer opted in to direct contact via: ${(body.contactMethods || []).join(", ")}</p>
              <p style="margin:0;font-size:13px;color:#555">Send this link to operators:</p>
              <a href="${buyUrl}" style="display:inline-block;margin-top:8px;font-size:13px;color:#92400e;word-break:break-all">${buyUrl}</a>
            </div>
          `;
      }

      // Admin notification
      await sendEmail({
        from: fromAddress,
        to: NOTIFY_EMAIL,
        subject: `New ${productLabel} Quote — ${site.shortName}${body.businessName ? ` — ${body.businessName}` : ""}`,
        html: `
          <h2 style="margin:0 0 16px">New ${productLabel} Quote Request</h2>
          <p style="margin:0 0 12px;color:#666">From <strong>${site.name}</strong> (${site.domain})</p>
          <table style="border-collapse:collapse;width:100%;max-width:500px">
            <tr><td style="padding:4px 8px;font-weight:600">Product</td><td style="padding:4px 8px">${productLabel}</td></tr>
            ${businessLine}
            <tr><td style="padding:4px 8px;font-weight:600">Name</td><td style="padding:4px 8px">${body.name || "—"}</td></tr>
            <tr><td style="padding:4px 8px;font-weight:600">Email</td><td style="padding:4px 8px">${body.email || "—"}</td></tr>
            <tr><td style="padding:4px 8px;font-weight:600">Phone</td><td style="padding:4px 8px">${body.phone || "—"}</td></tr>
            ${detailRows}
            ${body.message ? `<tr><td style="padding:4px 8px;font-weight:600">Message</td><td style="padding:4px 8px">${body.message}</td></tr>` : ""}
          </table>
          ${claimSection}
          ${buySection}
        `,
      }).catch((err: unknown) => console.error("Email notification failed:", err));

      // Customer auto-confirmation
      if (body.email) {
        await sendEmail({
          from: fromAddress,
          to: body.email,
          replyTo: "mark@hirenortheast.co.uk",
          subject: `We've received your ${productLabel.toLowerCase()} quote request`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
              <h2 style="margin:0 0 16px;color:#1a1a1a">Thanks for your quote request${body.name ? `, ${body.name}` : ""}!</h2>
              <p style="margin:0 0 12px;color:#444;line-height:1.5">We've received your <strong>${productLabel.toLowerCase()}</strong> request and will be in touch within 24 hours with quotes from local operators.</p>
              <h3 style="margin:16px 0 8px;color:#1a1a1a">Your request details:</h3>
              <table style="border-collapse:collapse;width:100%;max-width:500px">
                ${detailRows}
                ${body.message ? `<tr><td style="padding:4px 8px;font-weight:600">Message</td><td style="padding:4px 8px">${body.message}</td></tr>` : ""}
              </table>
              <p style="margin:16px 0 0;color:#666;font-size:14px">If you need to get in touch, just reply to this email.</p>
              <p style="margin:8px 0 0;color:#666;font-size:14px">— ${site.name}</p>
            </div>
          `,
        }).catch((err: unknown) => console.error("Customer confirmation email failed:", err));
      }
    }

    // Track lead submission server-side with PostHog
    const distinctId = request.headers.get("x-posthog-distinct-id") || ip || "anonymous";
    const sessionId = request.headers.get("x-posthog-session-id") || undefined;
    const posthog = getPostHogClient();
    posthog.capture({
      distinctId,
      event: "lead_submitted",
      properties: {
        type: body.type || "quote_request",
        product: body.product || null,
        business_slug: body.businessSlug || null,
        business_name: body.businessName || null,
        site: siteId,
        ...(sessionId ? { $session_id: sessionId } : {}),
      },
    });

    // Process auto-quotes (non-blocking)
    if (body.product && body.email) {
      processAutoQuotes({
        id: leadId,
        product: body.product,
        site: siteId,
        businessSlug: body.businessSlug,
        businessName: body.businessName,
        name: body.name,
        email: body.email,
        phone: body.phone,
        date: body.date,
        passengers: body.passengers,
        pickup: body.pickup,
        destination: body.destination,
        journeyType: body.journeyType,
        message: body.message,
        details: body.details,
      }).catch((err) => console.error("Auto-quote processing failed:", err));
    }

    // Contact matching operators via WhatsApp + email (non-blocking)
    if (body.product) {
      processOperatorOutreach({
        id: leadId,
        product: body.product,
        site: siteId,
        businessSlug: body.businessSlug,
        businessName: body.businessName,
        date: body.date,
        passengers: body.passengers,
        pickup: body.pickup,
        destination: body.destination,
        journeyType: body.journeyType,
        details: body.details,
      }).catch((err) => console.error("Operator outreach failed:", err));
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
