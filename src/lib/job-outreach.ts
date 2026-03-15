import crypto from "crypto";
import pool from "./db";
import { initInstantQuoteTables, initTrackingTables } from "./db-schema";
import { sendEmail } from "./email";
import { getSiteConfig } from "./siteConfig";
import { getAllBusinesses } from "./data";
import { generateOperatorHash } from "./lead-buy";
import type { ProductId } from "./productConfig";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface JobOfferParams {
  acceptanceId: string;
  quoteId: string;
  sessionId: string;
  product: string;          // ProductId
  site: string;             // SiteId
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerPricePence: number;
  operatorPricePence: number;
  platformFeePence: number;
  summary: string;          // e.g. "Builders Skip — 2 Weeks — NE1"
  details: Record<string, unknown>; // The original form details
}

interface MatchedOperator {
  name: string;
  slug: string;
  email: string;
  lat: number;
  lng: number;
  score: number;
  distanceMiles?: number;
}

// ---------------------------------------------------------------------------
// Product labels
// ---------------------------------------------------------------------------

const PRODUCT_LABELS: Record<string, string> = {
  "minibus-hire": "Minibus Hire",
  "van-hire": "Van Hire",
  "skip-hire": "Skip Hire",
  locksmith: "Locksmith",
  "removal-companies": "Removal Companies",
  "bouncy-castle-hire": "Bouncy Castle Hire",
  "limo-hire": "Limo Hire",
  "plant-hire": "Plant Hire",
  "driving-lessons": "Driving Lessons",
  "pest-control": "Pest Control",
};

// ---------------------------------------------------------------------------
// Location helpers (copied from operator-outreach.ts patterns)
// ---------------------------------------------------------------------------

/** Extract a UK postcode from a string. */
function extractPostcode(text: string | undefined | null): string | null {
  if (!text) return null;
  const match = text.match(
    /\b([A-Z]{1,2}\d{1,2}[A-Z]?\s*\d[A-Z]{2})\b/i
  );
  return match ? match[1].toUpperCase().replace(/\s+/g, " ") : null;
}

/** Extract just the postcode area (e.g. "NE1" from "NE1 4AG"). */
function postcodeArea(postcode: string): string {
  return postcode.replace(/\s*\d[A-Z]{2}$/i, "").trim();
}

/**
 * Geocode a UK postcode using postcodes.io (free, no key needed).
 */
async function geocodePostcode(
  postcode: string
): Promise<{ lat: number; lng: number } | null> {
  try {
    const encoded = encodeURIComponent(postcode.replace(/\s+/g, ""));
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encoded}`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.status === 200 && data.result) {
      return { lat: data.result.latitude, lng: data.result.longitude };
    }
    return null;
  } catch {
    return null;
  }
}

/** Haversine distance between two lat/lng points in miles. */
function haversineDistanceMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/** Wix sentry/tracking emails are scraping artifacts, not real contacts. */
function isRealEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const lower = email.toLowerCase();
  if (lower.includes("@sentry.wixpress.com")) return false;
  if (lower.includes("@sentry-next.wixpress.com")) return false;
  if (lower.includes("noreply@")) return false;
  if (lower.includes("no-reply@")) return false;
  return true;
}

// ---------------------------------------------------------------------------
// Extract customer location from details (product-specific field names)
// ---------------------------------------------------------------------------

function extractCustomerLocation(
  product: string,
  details: Record<string, unknown>
): string | undefined {
  const s = (v: unknown) => (typeof v === "string" ? v : undefined);

  switch (product) {
    case "van-hire":
      return s(details.collectionLocation);
    case "skip-hire":
      return s(details.address);
    case "locksmith":
    case "pest-control":
      return s(details.location);
    case "removal-companies":
      return s(details.movingFrom);
    case "bouncy-castle-hire":
      return s(details.venue);
    case "limo-hire":
      return s(details.pickupLocation) || s(details.pickup);
    case "plant-hire":
      return s(details.siteLocation);
    case "driving-lessons":
      return s(details.area);
    default:
      // minibus
      return s(details.pickup);
  }
}

// ---------------------------------------------------------------------------
// Operator matching (reuses logic from operator-outreach.ts)
// ---------------------------------------------------------------------------

const MAX_DISTANCE_MILES = 30;
const MAX_OPERATORS = 30;

function findMatchingOperators(
  product: string,
  customerCoords?: { lat: number; lng: number } | null
): MatchedOperator[] {
  const businesses = getAllBusinesses(product as ProductId);
  const contactable: MatchedOperator[] = [];

  for (const b of businesses) {
    if (!isRealEmail(b.email)) continue;

    let score = 3; // has email
    if (b.website) score += 1;
    if (b.description) score += 1;
    if (b.rating && b.rating > 4) score += 1;

    const op: MatchedOperator = {
      name: b.name,
      slug: b.slug,
      email: b.email!,
      lat: b.lat,
      lng: b.lng,
      score,
    };

    if (customerCoords && b.lat && b.lng) {
      op.distanceMiles = haversineDistanceMiles(
        customerCoords.lat,
        customerCoords.lng,
        b.lat,
        b.lng
      );
    }

    contactable.push(op);
  }

  // If we have customer coordinates, filter by distance and sort by proximity
  if (customerCoords) {
    const nearby = contactable.filter(
      (op) =>
        op.distanceMiles !== undefined &&
        op.distanceMiles <= MAX_DISTANCE_MILES
    );

    if (nearby.length >= 5) {
      nearby.sort(
        (a, b) => (a.distanceMiles! - b.distanceMiles!) || (b.score - a.score)
      );
      return nearby.slice(0, MAX_OPERATORS);
    }

    // Fewer than 5 nearby: fill from closest beyond radius
    const beyond = contactable
      .filter(
        (op) =>
          op.distanceMiles !== undefined &&
          op.distanceMiles > MAX_DISTANCE_MILES
      )
      .sort((a, b) => a.distanceMiles! - b.distanceMiles!);

    const combined = [...nearby, ...beyond.slice(0, 5 - nearby.length)];
    combined.sort(
      (a, b) => (a.distanceMiles! - b.distanceMiles!) || (b.score - a.score)
    );
    return combined.slice(0, MAX_OPERATORS);
  }

  // No coordinates — fall back to score-based ranking, cap at 20
  contactable.sort((a, b) => b.score - a.score);
  return contactable.slice(0, 20);
}

// ---------------------------------------------------------------------------
// Email builders
// ---------------------------------------------------------------------------

function formatPounds(pence: number): string {
  return `\u00a3${(pence / 100).toFixed(2)}`;
}

function buildJobOfferHtml(
  operatorName: string,
  productLabel: string,
  summary: string,
  customerPricePence: number,
  operatorPricePence: number,
  platformFeePence: number,
  postcodeAreaStr: string,
  claimUrl: string,
  siteName: string,
  domain: string
): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin:0 0 12px;color:#1a1a1a">Job Available: ${summary}</h2>
      <p style="margin:0 0 16px;color:#444">Hi ${operatorName},</p>
      <p style="margin:0 0 16px;color:#444">A customer in your area has accepted a quote and is ready to book.</p>

      <table style="border-collapse:collapse;width:100%;background:#f9fafb;border-radius:8px;margin:0 0 16px">
        <tr><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #e5e7eb">Service</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${productLabel}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #e5e7eb">Details</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${summary}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:600;border-bottom:1px solid #e5e7eb">Customer budget</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb">${formatPounds(customerPricePence)}</td></tr>
        <tr><td style="padding:8px 12px;font-weight:600">Location</td><td style="padding:8px 12px">${postcodeAreaStr}</td></tr>
      </table>

      <div style="margin:0 0 16px;padding:12px 16px;background:#fef3c7;border:1px solid #fcd34d;border-radius:8px">
        <p style="margin:0 0 4px;font-weight:600;color:#92400e">Platform fee: ${formatPounds(platformFeePence)}</p>
        <p style="margin:0;color:#92400e">You receive: ${formatPounds(operatorPricePence)}</p>
      </div>

      <div style="text-align:center;margin:0 0 16px">
        <a href="${claimUrl}" style="display:inline-block;padding:12px 32px;background:#16a34a;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:16px">Claim This Job</a>
      </div>

      <p style="margin:0 0 8px;color:#666;font-size:13px">First operator to claim gets the job. This offer expires in 24 hours.</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
      <p style="margin:0;color:#999;font-size:12px">${siteName} &middot; <a href="https://${domain}" style="color:#999">${domain}</a> &middot; <a href="https://${domain}/unsubscribe" style="color:#999">Unsubscribe</a></p>
    </div>
  `;
}

function buildCustomerConfirmationHtml(
  customerName: string,
  customerPricePence: number,
  summary: string,
  siteName: string,
  domain: string
): string {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
      <h2 style="margin:0 0 12px;color:#1a1a1a">Your quote has been accepted</h2>
      <p style="margin:0 0 16px;color:#444">Hi ${customerName},</p>
      <p style="margin:0 0 16px;color:#444">You accepted a quote for ${formatPounds(customerPricePence)} for ${summary}.</p>
      <p style="margin:0 0 16px;color:#444">We\u2019re now contacting local operators who can do this job at your price.</p>
      <p style="margin:0 0 16px;color:#444;font-weight:600">You\u2019ll hear from your matched operator shortly.</p>
      <p style="margin:0 0 16px;color:#999;font-size:13px">If you don\u2019t hear back within 24 hours, we\u2019ll send you more options.</p>
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
      <p style="margin:0;color:#999;font-size:12px">${siteName} &middot; <a href="https://${domain}" style="color:#999">${domain}</a></p>
    </div>
  `;
}

// ---------------------------------------------------------------------------
// Main function
// ---------------------------------------------------------------------------

/**
 * Send job offer emails to matching operators after a customer accepts a quote.
 * Called fire-and-forget from the quote acceptance API route.
 */
export async function sendJobOffers(params: JobOfferParams): Promise<void> {
  const {
    acceptanceId,
    product,
    customerName,
    customerEmail,
    customerPricePence,
    operatorPricePence,
    platformFeePence,
    summary,
    details,
  } = params;

  // Ensure tables exist
  await Promise.all([initInstantQuoteTables(), initTrackingTables()]);

  const site = getSiteConfig();
  const productLabel = PRODUCT_LABELS[product] || "Service";

  // Extract and geocode customer location
  const locationText = extractCustomerLocation(product, details);
  const postcode = extractPostcode(locationText);
  let customerCoords: { lat: number; lng: number } | null = null;
  let postcodeAreaStr = "Your area";

  if (postcode) {
    postcodeAreaStr = postcodeArea(postcode);
    customerCoords = await geocodePostcode(postcode);
  }

  // Find matching operators with email
  const operators = findMatchingOperators(product, customerCoords);
  if (operators.length === 0) {
    console.warn(
      `[job-outreach] No matching operators found for ${product} (acceptance ${acceptanceId})`
    );
  }

  // Generate claim tokens and send emails
  let contacted = 0;

  for (const op of operators) {
    try {
      // Generate unique claim token
      const claimToken = crypto.randomBytes(32).toString("hex");
      const opHash = generateOperatorHash(op.email);

      // Store claim token in job_claims table
      await pool.query(
        `INSERT INTO job_claims (acceptance_id, operator_hash, operator_email, operator_name, claim_token, customer_price_pence, operator_price_pence, platform_fee_pence, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pending')`,
        [
          acceptanceId,
          opHash,
          op.email,
          op.name,
          claimToken,
          customerPricePence,
          operatorPricePence,
          platformFeePence,
        ]
      );

      // Build claim URL
      const claimUrl = `https://${site.domain}/jobs/claim/${claimToken}`;

      // Send job offer email
      await sendEmail({
        from: `Hire UK <notify@hirenortheast.co.uk>`,
        to: op.email,
        replyTo: "mark@hirenortheast.co.uk",
        subject: `Job Available: ${summary} \u2014 ${site.name}`,
        html: buildJobOfferHtml(
          op.name,
          productLabel,
          summary,
          customerPricePence,
          operatorPricePence,
          platformFeePence,
          postcodeAreaStr,
          claimUrl,
          site.name,
          site.domain
        ),
      });

      // Log outreach
      await pool.query(
        `INSERT INTO outreach_log (lead_id, channel, operator_email, operator_name, product, sent_at, metadata)
         VALUES ($1, 'email', $2, $3, $4, NOW(), $5)`,
        [
          acceptanceId,
          op.email,
          op.name,
          product,
          JSON.stringify({
            type: "job_offer",
            slug: op.slug,
            claimToken,
            distanceMiles: op.distanceMiles
              ? Math.round(op.distanceMiles * 10) / 10
              : null,
          }),
        ]
      );

      contacted++;
    } catch (err) {
      console.error(
        `[job-outreach] Failed to send job offer to ${op.name} (${op.email}):`,
        err
      );

      // Log the error but don't stop processing other operators
      try {
        await pool.query(
          `INSERT INTO outreach_log (lead_id, channel, operator_email, operator_name, product, error_message, metadata)
           VALUES ($1, 'email', $2, $3, $4, $5, $6)`,
          [
            acceptanceId,
            op.email,
            op.name,
            product,
            String(err),
            JSON.stringify({ type: "job_offer", slug: op.slug }),
          ]
        );
      } catch {
        // Swallow logging errors — don't let them cascade
      }
    }
  }

  console.log(
    `[job-outreach] Contacted ${contacted}/${operators.length} operators for acceptance ${acceptanceId}`
  );

  // Send customer confirmation email
  try {
    await sendEmail({
      from: `${site.name} <notify@hirenortheast.co.uk>`,
      to: customerEmail,
      subject: `Your quote has been accepted \u2014 we're finding your operator`,
      html: buildCustomerConfirmationHtml(
        customerName,
        customerPricePence,
        summary,
        site.name,
        site.domain
      ),
    });
  } catch (err) {
    console.error(
      `[job-outreach] Failed to send customer confirmation to ${customerEmail}:`,
      err
    );
  }
}
