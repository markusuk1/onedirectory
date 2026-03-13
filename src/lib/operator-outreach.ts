import pool from "./db";
import { initTrackingTables } from "./db-schema";
import { sendEmail } from "./email";
import { getSiteConfig } from "./siteConfig";
import { getAllBusinesses } from "./data";
import type { ProductId } from "./productConfig";

const WA_TEMPLATES: Record<string, string> = {
  "minibus-hire": "lead_minibus_hire",
  "van-hire": "lead_van_hire",
  "skip-hire": "lead_skip_hire",
  locksmith: "lead_locksmith",
  "removal-companies": "lead_removals",
  "bouncy-castle-hire": "lead_bouncy_castle",
  "limo-hire": "lead_limo_hire",
  "plant-hire": "lead_plant_hire",
  "driving-lessons": "lead_driving_lessons",
};

interface OutreachLead {
  id?: string;
  product: string;
  site: string;
  businessSlug?: string;
  businessName?: string;
  date?: string;
  passengers?: string | number;
  pickup?: string;
  destination?: string;
  journeyType?: string;
  details?: Record<string, string>;
}

function extractOutwardCode(location: string | undefined | null): string {
  if (!location) return "Not specified";
  const match = location.match(
    /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s*\d[A-Z]{2}\b/i
  );
  if (match) return match[1].toUpperCase();
  return location;
}

function buildTemplateParams(
  product: string,
  lead: OutreachLead,
  operatorName: string
): Array<{ type: "text"; text: string }> {
  const d = lead.details || {};
  const s = (v: string | number | undefined | null) =>
    String(v || "Not specified");

  switch (product) {
    case "van-hire":
      return [
        { type: "text", text: operatorName },
        { type: "text", text: extractOutwardCode(d.collectionLocation) },
        { type: "text", text: s(d.vanSize) },
        { type: "text", text: s(d.driveType) },
        { type: "text", text: s(d.startDate) },
      ];
    case "skip-hire":
      return [
        { type: "text", text: operatorName },
        { type: "text", text: extractOutwardCode(d.address) },
        { type: "text", text: s(d.skipSize) },
        { type: "text", text: s(d.duration || lead.date) },
      ];
    case "locksmith":
      return [
        { type: "text", text: operatorName },
        { type: "text", text: extractOutwardCode(d.location) },
        { type: "text", text: s(d.serviceType) },
      ];
    case "removal-companies":
      return [
        { type: "text", text: operatorName },
        { type: "text", text: extractOutwardCode(d.movingFrom) },
        { type: "text", text: extractOutwardCode(d.movingTo) },
        { type: "text", text: s(d.moveDate || lead.date) },
        {
          type: "text",
          text: d.bedrooms ? `${d.bedrooms} bed` : s(d.moveType),
        },
      ];
    case "bouncy-castle-hire":
      return [
        { type: "text", text: operatorName },
        { type: "text", text: extractOutwardCode(d.venue) },
        { type: "text", text: s(d.eventDate || lead.date) },
        { type: "text", text: s(d.eventType) },
      ];
    case "limo-hire":
      return [
        { type: "text", text: operatorName },
        { type: "text", text: s(d.pickupLocation || lead.pickup) },
        { type: "text", text: s(d.occasion) },
        { type: "text", text: s(d.eventDate || lead.date) },
        { type: "text", text: s(d.passengers || lead.passengers) },
      ];
    case "plant-hire":
      return [
        { type: "text", text: operatorName },
        { type: "text", text: extractOutwardCode(d.siteLocation) },
        { type: "text", text: s(d.equipmentType) },
        { type: "text", text: s(d.duration) },
      ];
    case "driving-lessons":
      return [
        { type: "text", text: operatorName },
        { type: "text", text: extractOutwardCode(d.area) },
        { type: "text", text: s(d.transmission) },
      ];
    default:
      // minibus
      return [
        { type: "text", text: operatorName },
        { type: "text", text: s(lead.pickup) },
        { type: "text", text: s(lead.destination) },
        { type: "text", text: s(lead.date) },
        { type: "text", text: s(lead.passengers) },
      ];
  }
}

async function sendWhatsAppTemplate(
  phone: string,
  product: string,
  lead: OutreachLead,
  operatorName: string
): Promise<string | null> {
  const token = process.env.WA_ACCESS_TOKEN;
  const phoneNumberId = process.env.WA_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) return null;

  const templateName = WA_TEMPLATES[product];
  if (!templateName) return null;

  let normalized = phone.replace(/[^\d+]/g, "");
  if (normalized.startsWith("+")) normalized = normalized.slice(1);
  if (normalized.startsWith("0")) normalized = "44" + normalized.slice(1);
  if (!normalized.startsWith("44")) normalized = "44" + normalized;

  const params = buildTemplateParams(product, lead, operatorName);

  const res = await fetch(
    `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: normalized,
        type: "template",
        template: {
          name: templateName,
          language: { code: "en_GB" },
          components: [{ type: "body", parameters: params }],
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error(`WhatsApp send failed for ${normalized}:`, err);
    return null;
  }

  const data = await res.json();
  return data?.messages?.[0]?.id || null;
}

async function sendOperatorEmail(
  email: string,
  product: string,
  lead: OutreachLead,
  operatorName: string,
  siteName: string,
  domain: string
): Promise<boolean> {
  const d = lead.details || {};
  const productLabels: Record<string, string> = {
    "minibus-hire": "Minibus Hire",
    "van-hire": "Van Hire",
    "skip-hire": "Skip Hire",
    locksmith: "Locksmith",
    "removal-companies": "Removal Companies",
    "bouncy-castle-hire": "Bouncy Castle Hire",
    "limo-hire": "Limo Hire",
    "plant-hire": "Plant Hire",
    "driving-lessons": "Driving Lessons",
  };
  const productLabel = productLabels[product] || "Service";

  let detailRows = "";
  switch (product) {
    case "van-hire":
      detailRows = `
        <tr><td style="padding:6px 12px;font-weight:600">Collection</td><td style="padding:6px 12px">${extractOutwardCode(d.collectionLocation)}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Van Size</td><td style="padding:6px 12px">${d.vanSize || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Drive Type</td><td style="padding:6px 12px">${d.driveType || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Start</td><td style="padding:6px 12px">${d.startDate || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">End</td><td style="padding:6px 12px">${d.endDate || "\u2014"}</td></tr>`;
      break;
    case "skip-hire":
      detailRows = `
        <tr><td style="padding:6px 12px;font-weight:600">Area</td><td style="padding:6px 12px">${extractOutwardCode(d.address)}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Skip Size</td><td style="padding:6px 12px">${d.skipSize || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Waste Type</td><td style="padding:6px 12px">${d.wasteType || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Duration</td><td style="padding:6px 12px">${d.duration || "\u2014"}</td></tr>`;
      break;
    case "locksmith":
      detailRows = `
        <tr><td style="padding:6px 12px;font-weight:600">Location</td><td style="padding:6px 12px">${extractOutwardCode(d.location)}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Service</td><td style="padding:6px 12px">${d.serviceType || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Urgency</td><td style="padding:6px 12px">${d.urgency || "\u2014"}</td></tr>`;
      break;
    case "removal-companies":
      detailRows = `
        <tr><td style="padding:6px 12px;font-weight:600">Moving From</td><td style="padding:6px 12px">${extractOutwardCode(d.movingFrom)}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Moving To</td><td style="padding:6px 12px">${extractOutwardCode(d.movingTo)}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Date</td><td style="padding:6px 12px">${d.moveDate || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Bedrooms</td><td style="padding:6px 12px">${d.bedrooms || "\u2014"}</td></tr>`;
      break;
    case "bouncy-castle-hire":
      detailRows = `
        <tr><td style="padding:6px 12px;font-weight:600">Venue Area</td><td style="padding:6px 12px">${extractOutwardCode(d.venue)}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Event Date</td><td style="padding:6px 12px">${d.eventDate || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Event Type</td><td style="padding:6px 12px">${d.eventType || "\u2014"}</td></tr>`;
      break;
    case "limo-hire":
      detailRows = `
        <tr><td style="padding:6px 12px;font-weight:600">Pickup</td><td style="padding:6px 12px">${d.pickupLocation || lead.pickup || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Occasion</td><td style="padding:6px 12px">${d.occasion || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Event Date</td><td style="padding:6px 12px">${d.eventDate || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Passengers</td><td style="padding:6px 12px">${d.passengers || lead.passengers || "\u2014"}</td></tr>`;
      break;
    case "plant-hire":
      detailRows = `
        <tr><td style="padding:6px 12px;font-weight:600">Site</td><td style="padding:6px 12px">${extractOutwardCode(d.siteLocation)}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Equipment</td><td style="padding:6px 12px">${d.equipmentType || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Duration</td><td style="padding:6px 12px">${d.duration || "\u2014"}</td></tr>`;
      break;
    case "driving-lessons":
      detailRows = `
        <tr><td style="padding:6px 12px;font-weight:600">Area</td><td style="padding:6px 12px">${extractOutwardCode(d.area)}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Transmission</td><td style="padding:6px 12px">${d.transmission || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Experience</td><td style="padding:6px 12px">${d.experience || "\u2014"}</td></tr>`;
      break;
    default:
      detailRows = `
        <tr><td style="padding:6px 12px;font-weight:600">Pickup</td><td style="padding:6px 12px">${lead.pickup || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Destination</td><td style="padding:6px 12px">${lead.destination || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Date</td><td style="padding:6px 12px">${lead.date || "\u2014"}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:600">Passengers</td><td style="padding:6px 12px">${lead.passengers || "\u2014"}</td></tr>`;
  }

  try {
    await sendEmail({
      from: `Hire UK <notify@hirenortheast.co.uk>`,
      to: email,
      replyTo: "mark@hirenortheast.co.uk",
      subject: `New ${productLabel} Quote Request \u2014 ${siteName}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
          <h2 style="margin:0 0 12px;color:#1a1a1a">New ${productLabel} Quote Request</h2>
          <p style="margin:0 0 16px;color:#444">Hi ${operatorName}, a customer in your area is looking for a quote.</p>
          <table style="border-collapse:collapse;width:100%;background:#f9fafb;border-radius:8px">
            ${detailRows}
          </table>
          <p style="margin:16px 0 8px;color:#444">To provide a quote, reply to this email with your price and availability.</p>
          <p style="margin:8px 0 0;color:#999;font-size:13px">\u2014 ${siteName} (${domain})</p>
        </div>
      `,
    });
    return true;
  } catch (err) {
    console.error(`Operator email failed for ${email}:`, err);
    return false;
  }
}

interface ContactableOperator {
  name: string;
  slug: string;
  phone: string | null;
  mobilePhone: string | null;
  email: string | null;
  score: number;
}

/** Wix sentry/tracking emails are scraping artifacts, not real contacts */
function isRealEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const lower = email.toLowerCase();
  if (lower.includes("@sentry.wixpress.com")) return false;
  if (lower.includes("@sentry-next.wixpress.com")) return false;
  if (lower.includes("noreply@")) return false;
  if (lower.includes("no-reply@")) return false;
  return true;
}

/**
 * Product-specific junk keyword blocklist.
 * Businesses matching these keywords in name+description are excluded from outreach.
 */
const JUNK_BLOCKLIST: Record<string, RegExp[]> = {
  "minibus-hire": [
    /\bballoon/i,
    /\bgaming\s*(van|bus|party|truck)/i,
    /\bmobile\s*gaming/i,
    /\bbouncy\s*castle/i,
    /\bsoft\s*play/i,
    /\btrampoline/i,
    /\broof\s*box/i,
    /\broofbox/i,
    /\broof\s*rack/i,
    /\bbreakdown\s*recovery/i,
    /\baccident\s*recovery/i,
    /\bvehicle\s*recovery/i,
    /\bcar\s*transport(?!ation)/i,
    /\bphotograph/i,
    /\bcatering\s+(?:compan|service|van|hire|business)/i,
    /\bmarquee\s*hire/i,
    /\bmagician/i,
    /\bface\s*paint/i,
    /\bmobile\s*disco/i,
    /\bdisc\s*jockey/i,
    /\bkaraoke/i,
    /\b(?:wedding|event)\s*(?:dj|entertainer)/i,
    /\bdj\s*(?:hire|entertainment|service)/i,
  ],
};

/**
 * Transport-related keywords. For minibus, at least one must appear
 * in the business name or description to be considered relevant.
 */
const TRANSPORT_SIGNALS =
  /\b(?:minibus|coach|bus(?:es)?|taxi|cab|travel|transport|transfer|chauffeur|limo(?:usine)?|shuttle|fleet|seater|driver|airport|passenger|tour[s]?|private\s*hire|executive\s*car|wedding\s*car|hire\b)/i;

function isRelevantBusiness(
  name: string,
  description: string | null,
  services: string[],
  product: string
): boolean {
  const text = `${name} ${description || ""}`;

  // Check junk blocklist
  const blocklist = JUNK_BLOCKLIST[product];
  if (blocklist) {
    for (const pattern of blocklist) {
      if (pattern.test(text)) return false;
    }
  }

  // For minibus, require at least one transport signal in name or description
  if (product === "minibus-hire") {
    const nameAndDesc = `${name} ${description || ""} ${services.join(" ")}`;
    if (!TRANSPORT_SIGNALS.test(nameAndDesc)) return false;
  }

  return true;
}

function findMatchingOperators(product: string): ContactableOperator[] {
  const businesses = getAllBusinesses(product as ProductId);
  const contactable: ContactableOperator[] = [];

  for (const b of businesses) {
    // Filter out irrelevant businesses (balloon companies, gaming vans, etc.)
    if (!isRelevantBusiness(b.name, b.description, b.services, product))
      continue;

    const realEmail = isRealEmail(b.email) ? b.email : null;
    const isMobile =
      b.mobilePhone &&
      /^07\d{9}$/.test(b.mobilePhone.replace(/\D/g, ""));
    if (!isMobile && !realEmail) continue;

    let score = 0;
    if (realEmail) score += 3;
    if (isMobile) score += 2;
    if (b.website) score += 1;
    if (b.description) score += 1;
    if (b.rating && b.rating > 4) score += 1;

    contactable.push({
      name: b.name,
      slug: b.slug,
      phone: b.phone,
      mobilePhone: isMobile ? b.mobilePhone : null,
      email: realEmail,
      score,
    });
  }

  contactable.sort((a, b) => b.score - a.score);
  return contactable.slice(0, 20);
}

/**
 * Contact matching operators about a new lead.
 * Called fire-and-forget from the leads API route.
 */
export async function processOperatorOutreach(
  lead: OutreachLead
): Promise<void> {
  await initTrackingTables();

  const operators = findMatchingOperators(lead.product);
  if (operators.length === 0) return;

  const site = getSiteConfig();
  let contacted = 0;

  for (const op of operators) {
    if (op.mobilePhone) {
      try {
        const messageId = await sendWhatsAppTemplate(
          op.mobilePhone,
          lead.product,
          lead,
          op.name
        );
        await pool.query(
          `INSERT INTO outreach_log (lead_id, channel, operator_phone, operator_name, product, message_id, metadata)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            lead.id || null,
            "whatsapp",
            op.mobilePhone,
            op.name,
            lead.product,
            messageId,
            JSON.stringify({
              slug: op.slug,
              template: WA_TEMPLATES[lead.product],
            }),
          ]
        );
        if (messageId) contacted++;
      } catch (err) {
        console.error(`WA outreach failed for ${op.name}:`, err);
        await pool
          .query(
            `INSERT INTO outreach_log (lead_id, channel, operator_phone, operator_name, product, error_message)
           VALUES ($1, $2, $3, $4, $5, $6)`,
            [
              lead.id || null,
              "whatsapp",
              op.mobilePhone,
              op.name,
              lead.product,
              String(err),
            ]
          )
          .catch(() => {});
      }
    }

    if (op.email) {
      try {
        const sent = await sendOperatorEmail(
          op.email,
          lead.product,
          lead,
          op.name,
          site.name,
          site.domain
        );
        await pool.query(
          `INSERT INTO outreach_log (lead_id, channel, operator_email, operator_name, product, metadata)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [
            lead.id || null,
            "email",
            op.email,
            op.name,
            lead.product,
            JSON.stringify({ slug: op.slug, sent }),
          ]
        );
        if (sent) contacted++;
      } catch (err) {
        console.error(`Email outreach failed for ${op.name}:`, err);
      }
    }
  }

  if (contacted > 0 && lead.id) {
    await pool.query(
      `UPDATE leads SET status = 'contacted' WHERE id = $1 AND status = 'new'`,
      [lead.id]
    );
    await pool.query(
      `INSERT INTO lead_events (lead_id, event_type, old_value, new_value, notes)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        lead.id,
        "status_change",
        "new",
        "contacted",
        `Auto-outreach: ${contacted} operators contacted`,
      ]
    );
  }
}
