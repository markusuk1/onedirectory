import pool from "./db";
import { initOperatorTables } from "./db-schema";
import { sendEmail } from "./email";
import { getSiteConfig } from "./siteConfig";
// quota import kept for future re-enablement

interface LeadData {
  id?: string;
  product: string;
  site: string;
  businessSlug?: string;
  businessName?: string;
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  passengers?: number;
  pickup?: string;
  destination?: string;
  journeyType?: string;
  message?: string;
  details?: Record<string, string>;
}

interface AutoQuoteConfig {
  id: string;
  business_slug: string;
  config: Record<string, unknown>;
  operator_services: string[] | null;
}

/**
 * Process auto-quotes for a new lead.
 * Finds matching auto-quote configs and sends quote emails.
 */
export async function processAutoQuotes(lead: LeadData): Promise<void> {
  if (!lead.email) return;

  await initOperatorTables();

  // Find matching auto-quote configs
  let configs: AutoQuoteConfig[];

  if (lead.businessSlug) {
    // Direct quote for a specific business
    const result = await pool.query(
      `SELECT aqc.id, aqc.business_slug, aqc.config,
              op.email as operator_email, op.name as operator_name,
              opr.phone as profile_phone, opr.services as operator_services
       FROM auto_quote_configs aqc
       JOIN operators op ON op.id = aqc.operator_id
       LEFT JOIN operator_profiles opr ON opr.business_slug = aqc.business_slug
         AND opr.product = aqc.product AND opr.site = aqc.site
       WHERE aqc.business_slug = $1 AND aqc.product = $2 AND aqc.site = $3
         AND aqc.enabled = true`,
      [lead.businessSlug, lead.product, lead.site]
    );
    configs = result.rows;
  } else {
    // General quote — find all enabled configs for this product/site
    const result = await pool.query(
      `SELECT aqc.id, aqc.business_slug, aqc.config,
              op.email as operator_email, op.name as operator_name,
              opr.phone as profile_phone, opr.services as operator_services
       FROM auto_quote_configs aqc
       JOIN operators op ON op.id = aqc.operator_id
       LEFT JOIN operator_profiles opr ON opr.business_slug = aqc.business_slug
         AND opr.product = aqc.product AND opr.site = aqc.site
       WHERE aqc.product = $1 AND aqc.site = $2 AND aqc.enabled = true`,
      [lead.product, lead.site]
    );
    configs = result.rows;
  }

  if (configs.length === 0) return;

  // Filter by service match if the customer specified a service type.
  // Only excludes operators who have explicitly declared services that
  // don't include the requested one. Operators without declared services
  // (legacy) still receive all leads.
  const requestedService = lead.details?.serviceType || null;
  if (requestedService) {
    configs = configs.filter((c) => {
      if (!c.operator_services || c.operator_services.length === 0) return true;
      return c.operator_services.includes(requestedService);
    });
    if (configs.length === 0) return;
  }

  const site = getSiteConfig();

  for (const config of configs) {
    try {
      const quote = generateQuote(lead, config);
      if (!quote) continue;

      // Do not expose operator identity or contact details to customers.
      const sanitizedMessage = redactOperatorIdentifiers({
        text: quote.message,
        businessSlug: config.business_slug,
      });

      await sendEmail({
        from: `${site.genericName} Quotes <notify@hirenortheast.co.uk>`,
        to: lead.email,
        replyTo: "mark@hirenortheast.co.uk",
        subject: `New quote — ${quote.summary}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <h2 style="margin:0 0 16px;color:#1a1a1a">New quote received</h2>
            <p style="margin:0 0 12px;color:#444;line-height:1.5">${sanitizedMessage}</p>
            ${quote.price ? `<p style="margin:12px 0;font-size:20px;font-weight:bold;color:#1a1a1a">${quote.price}</p>` : ""}
            <p style="margin:16px 0 0;color:#666;font-size:14px">For questions or to proceed, reply to this email and we’ll coordinate everything for you.</p>
            <p style="margin:8px 0 0;color:#666;font-size:14px">— ${site.name}</p>
          </div>
        `,
      });

      // Record the auto-quote
      await pool.query(
        `INSERT INTO auto_quotes_sent (lead_id, config_id, business_slug, quote_amount, quote_details)
         VALUES ($1, $2, $3, $4, $5)`,
        [
          lead.id || null,
          config.id,
          config.business_slug,
          quote.amount || null,
          JSON.stringify({ summary: quote.summary, message: sanitizedMessage }),
        ]
      );
    } catch (err) {
      console.error(`Auto-quote failed for ${config.business_slug}:`, err);
    }
  }
}

interface QuoteResult {
  summary: string;
  message: string;
  price: string | null;
  amount: number | null;
}

function generateQuote(
  lead: LeadData,
  config: AutoQuoteConfig
): QuoteResult | null {
  const c = config.config;
  const template = (c.responseTemplate as string) || "";

  if (lead.product === "minibus-hire") {
    return generateMinibusQuote(lead, c, template);
  }
  if (lead.product === "skip-hire") {
    return generateSkipQuote(lead, c, template);
  }
  if (lead.product === "van-hire") {
    return generateVanQuote(lead, c, template);
  }
  if (lead.product === "locksmith") {
    return generateLocksmithQuote(lead, c, template);
  }
  if (lead.product === "removal-companies") {
    return generateRemovalsQuote(lead, c, template);
  }
  if (lead.product === "bouncy-castle-hire") {
    return generateBouncyCastleQuote(lead, c, template);
  }
  if (lead.product === "limo-hire") {
    return generateLimoQuote(lead, c, template);
  }
  if (lead.product === "plant-hire") {
    return generatePlantQuote(lead, c, template);
  }
  if (lead.product === "driving-lessons") {
    return generateDrivingQuote(lead, c, template);
  }

  return null;
}

function generateMinibusQuote(
  lead: LeadData,
  config: Record<string, unknown>,
  template: string
): QuoteResult | null {
  const passengers = lead.passengers || 0;
  const maxPassengers = (config.maxPassengers as number) || 50;
  if (passengers > maxPassengers) return null;

  const minPrice = (config.minPrice as number) || 50;
  const price = Math.max(minPrice, passengers * 5);

  const message =
    template
      .replace("{passengers}", String(passengers))
      .replace("{journeyType}", lead.journeyType || "trip")
      .replace("{date}", lead.date || "your requested date")
      .replace("{price}", `£${price}`) || `We can accommodate ${passengers} passengers. Estimated price from £${price}.`;

  return {
    summary: `${passengers}-seater from £${price}`,
    message,
    price: `From £${price}`,
    amount: price,
  };
}

function generateSkipQuote(
  lead: LeadData,
  config: Record<string, unknown>,
  template: string
): QuoteResult | null {
  const d = lead.details || {};
  const skipSize = d.skipSize || "builders";
  const prices = (config.prices as Record<string, number>) || {};
  const price = prices[skipSize] || prices.builders || 250;

  const message =
    template
      .replace("{skipSize}", skipSize)
      .replace("{wasteType}", d.wasteType || "general waste")
      .replace("{price}", `£${price}`)
      .replace("{duration}", d.duration || "up to 14 days") ||
    `We can deliver a ${skipSize} skip for £${price}.`;

  return {
    summary: `${skipSize} skip — £${price}`,
    message,
    price: `£${price}`,
    amount: price,
  };
}

function generateVanQuote(
  lead: LeadData,
  config: Record<string, unknown>,
  template: string
): QuoteResult | null {
  const d = lead.details || {};
  const vanSize = d.vanSize || "swb";
  const dailyRates = (config.dailyRates as Record<string, number>) || {};
  const rate = dailyRates[vanSize] || dailyRates.swb || 45;

  const message =
    template
      .replace("{vanSize}", vanSize)
      .replace("{startDate}", d.startDate || "your requested date")
      .replace("{rate}", `£${rate}`) ||
    `We have a ${vanSize} van available. Daily rate: £${rate}.`;

  return {
    summary: `${vanSize} van — £${rate}/day`,
    message,
    price: `£${rate}/day`,
    amount: rate,
  };
}

function generateLocksmithQuote(
  lead: LeadData,
  config: Record<string, unknown>,
  template: string
): QuoteResult | null {
  const d = lead.details || {};
  const serviceType = d.serviceType || "general";
  const urgency = d.urgency || "standard";
  const calloutFee = (config.calloutFee as number) || 60;
  const emergencyFee = (config.emergencyCalloutFee as number) || 85;
  const fee = urgency === "emergency" ? emergencyFee : calloutFee;

  const message =
    template
      .replace("{serviceType}", serviceType)
      .replace("{fee}", `£${fee}`) ||
    `We can help with your ${serviceType} request. Callout fee: £${fee}.`;

  return {
    summary: `${serviceType} — from £${fee}`,
    message,
    price: `From £${fee}`,
    amount: fee,
  };
}

function generateRemovalsQuote(
  lead: LeadData,
  config: Record<string, unknown>,
  template: string
): QuoteResult | null {
  const d = lead.details || {};
  const bedrooms = parseInt(d.bedrooms || "2", 10);
  const basePrice = (config.basePrice as number) || 300;
  const bedroomMultiplier = (config.bedroomMultiplier as number) || 100;
  const packingFee = (config.packingFee as number) || 150;
  const needsPacking = d.needPacking === "yes" || d.needPacking === "Yes";
  const price = basePrice + bedrooms * bedroomMultiplier + (needsPacking ? packingFee : 0);

  const message =
    template
      .replace("{moveType}", d.moveType || "house move")
      .replace("{bedrooms}", String(bedrooms))
      .replace("{movingFrom}", d.movingFrom || "origin")
      .replace("{movingTo}", d.movingTo || "destination")
      .replace("{date}", d.moveDate || "your requested date")
      .replace("{price}", `£${price}`) ||
    `We can help with your ${d.moveType || "house"} move (${bedrooms} bed). Estimated from £${price}.`;

  return {
    summary: `${bedrooms}-bed ${d.moveType || "house"} move — from £${price}`,
    message,
    price: `From £${price}`,
    amount: price,
  };
}

function generateBouncyCastleQuote(
  lead: LeadData,
  config: Record<string, unknown>,
  template: string
): QuoteResult | null {
  const d = lead.details || {};
  const basePrice = (config.basePrice as number) || 80;
  const setupFee = (config.setupFee as number) || 0;
  const price = basePrice + setupFee;

  const message =
    template
      .replace("{eventType}", d.eventType || "party")
      .replace("{eventDate}", d.eventDate || "your requested date")
      .replace("{venue}", d.venue || "your venue")
      .replace("{ageRange}", d.ageRange || "all ages")
      .replace("{price}", `£${price}`) ||
    `We can provide a bouncy castle for your ${d.eventType || "event"}. Price from £${price}.`;

  return {
    summary: `bouncy castle for ${d.eventType || "event"} — from £${price}`,
    message,
    price: `From £${price}`,
    amount: price,
  };
}

function generateLimoQuote(
  lead: LeadData,
  config: Record<string, unknown>,
  template: string
): QuoteResult | null {
  const d = lead.details || {};
  const hours = parseInt(d.hours || "3", 10);
  const hourlyRate = (config.hourlyRate as number) || 100;
  const minimumHours = (config.minimumHours as number) || 2;
  const price = Math.max(minimumHours, hours) * hourlyRate;

  const message =
    template
      .replace("{occasion}", d.occasion || "event")
      .replace("{eventDate}", d.eventDate || "your requested date")
      .replace("{pickupLocation}", d.pickupLocation || "pickup")
      .replace("{destination}", d.destination || "destination")
      .replace("{passengers}", d.passengers || "your group")
      .replace("{hours}", String(hours))
      .replace("{price}", `£${price}`) ||
    `We can provide a limo for your ${d.occasion || "event"} (${hours}hrs). Price from £${price}.`;

  return {
    summary: `limo hire (${hours}hrs) — from £${price}`,
    message,
    price: `From £${price}`,
    amount: price,
  };
}

function generatePlantQuote(
  lead: LeadData,
  config: Record<string, unknown>,
  template: string
): QuoteResult | null {
  const d = lead.details || {};
  const equipmentType = d.equipmentType || "general";
  const dailyRates = (config.dailyRates as Record<string, number>) || {};
  const rate = dailyRates[equipmentType] || dailyRates.general || 150;
  const operatedSurcharge = (config.operatedSurcharge as number) || 100;
  const isOperated = d.operatedOrSelfDrive === "operated";
  const price = rate + (isOperated ? operatedSurcharge : 0);

  const message =
    template
      .replace("{equipmentType}", equipmentType)
      .replace("{startDate}", d.startDate || "your requested date")
      .replace("{duration}", d.duration || "your required period")
      .replace("{siteLocation}", d.siteLocation || "your site")
      .replace("{price}", `£${price}`) ||
    `We have ${equipmentType} equipment available. Daily rate: £${price}${isOperated ? " (operated)" : ""}.`;

  return {
    summary: `${equipmentType} — £${price}/day`,
    message,
    price: `£${price}/day`,
    amount: price,
  };
}

function generateDrivingQuote(
  lead: LeadData,
  config: Record<string, unknown>,
  template: string
): QuoteResult | null {
  const d = lead.details || {};
  const lessonType = d.lessonType || "standard";
  const hourlyRate = (config.hourlyRate as number) || 35;
  const packageRates = (config.packageRates as Record<string, number>) || {};
  const price = packageRates[lessonType] || hourlyRate;

  const message =
    template
      .replace("{lessonType}", lessonType)
      .replace("{transmission}", d.transmission || "manual")
      .replace("{experience}", d.experience || "beginner")
      .replace("{area}", d.area || "your area")
      .replace("{price}", `£${price}`) ||
    `We offer ${lessonType} ${d.transmission || "manual"} driving lessons. Price from £${price}/hr.`;

  return {
    summary: `${d.transmission || "manual"} ${lessonType} lesson — £${price}/hr`,
    message,
    price: `£${price}/hr`,
    amount: price,
  };
}

function redactOperatorIdentifiers({
  text,
  businessSlug,
}: {
  text: string;
  businessSlug: string;
}): string {
  let out = String(text || "").trim();
  if (!out) return out;

  // URLs (http/https/www)
  out = out.replace(/\bhttps?:\/\/\S+/gi, "[link removed]");
  out = out.replace(/\bwww\.\S+/gi, "[link removed]");

  // Emails
  out = out.replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, "[email removed]");

  // UK-style phone numbers (best-effort; avoids stripping prices like "£250")
  out = out.replace(/\b(\+?44\s?7\d{3}|\(?0?7\d{3}\)?|\(?0\d{3,5}\)?)\s?\d{3}\s?\d{3,4}\b/g, "[phone removed]");

  // Remove business name if it appears (slug -> words)
  const guess = businessSlug.replace(/-/g, " ").trim();
  if (guess) {
    const escaped = guess.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    out = out.replace(new RegExp(`\\b${escaped}\\b`, "gi"), "[operator removed]");
  }

  return out;
}
