import pool from "./db";
import { initOperatorTables } from "./db-schema";
import { sendEmail } from "./email";
import { getSiteConfig } from "./siteConfig";

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
              opr.phone as profile_phone
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
              opr.phone as profile_phone
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

  const site = getSiteConfig();

  for (const config of configs) {
    try {
      const quote = generateQuote(lead, config);
      if (!quote) continue;

      // Send quote email to customer
      const businessName = config.business_slug.replace(/-/g, " ");
      const capitalizedName = businessName.replace(/\b\w/g, (c: string) => c.toUpperCase());

      await sendEmail({
        from: `${capitalizedName} via ${site.genericName} <notify@hirenortheast.co.uk>`,
        to: lead.email,
        replyTo: "mark@hirenortheast.co.uk",
        subject: `Quote from ${capitalizedName} — ${quote.summary}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
            <h2 style="margin:0 0 16px;color:#1a1a1a">Quote from ${capitalizedName}</h2>
            <p style="margin:0 0 12px;color:#444;line-height:1.5">${quote.message}</p>
            ${quote.price ? `<p style="margin:12px 0;font-size:20px;font-weight:bold;color:#1a1a1a">${quote.price}</p>` : ""}
            <p style="margin:16px 0 0;color:#666;font-size:14px">This is an automated quote. For questions, reply to this email.</p>
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
          JSON.stringify({ summary: quote.summary, message: quote.message }),
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
