import crypto from "crypto";
import pool from "./db";
import { initLeadBuyTables } from "./db-schema";
import { PRODUCT_CONFIGS, type ProductId } from "./productConfig";
import { createCheckout, verifyCheckout } from "./sumup";

let tablesReady = false;

async function ensureTables() {
  if (!tablesReady) {
    await initLeadBuyTables();
    tablesReady = true;
  }
}

export function generateBuyToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function generateOperatorHash(email: string): string {
  return crypto
    .createHash("sha256")
    .update(email.toLowerCase().trim())
    .digest("hex")
    .slice(0, 12);
}

export function getLeadPrice(product: string): { pricePence: number; priceFormatted: string; sumupUrl: string } {
  const config = PRODUCT_CONFIGS[product as ProductId];
  const pricePence = config?.leadPricePence ?? 100;
  const sumupUrl = config?.sumupBuyLink ?? "https://pay.sumup.com/b2c/QQF710VC";
  const priceFormatted = `£${(pricePence / 100).toFixed(2)}`;
  return { pricePence, priceFormatted, sumupUrl };
}

/**
 * Create a SumUp checkout for a lead purchase (verified payment flow).
 * Returns the SumUp payment URL, or null if SumUp is not configured.
 */
export async function createLeadCheckout(
  tokenId: string,
  operatorHash: string,
  product: string,
  redirectUrl: string
): Promise<string | null> {
  await ensureTables();

  const { pricePence } = getLeadPrice(product);
  const config = PRODUCT_CONFIGS[product as ProductId];
  const productName = config?.shortName ?? product;

  const result = await createCheckout({
    amountPence: pricePence,
    reference: `lead_${tokenId.slice(0, 8)}_${operatorHash}`,
    description: `Lead purchase — ${productName}`,
    redirectUrl,
  });

  if (!result) return null;

  // Upsert checkout record (operator might retry payment)
  await pool.query(
    `INSERT INTO lead_checkouts (token_id, operator_hash, sumup_checkout_id, amount_pence)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (token_id, operator_hash)
     DO UPDATE SET sumup_checkout_id = $3, status = 'pending', created_at = NOW()`,
    [tokenId, operatorHash, result.checkoutId, pricePence]
  );

  return result.paymentUrl;
}

/**
 * Verify a SumUp checkout for a lead purchase.
 * Returns { verified: true } if the payment was confirmed, false otherwise.
 */
export async function verifyLeadCheckout(
  tokenId: string,
  operatorHash: string
): Promise<{ verified: boolean }> {
  await ensureTables();

  const row = await pool.query(
    `SELECT sumup_checkout_id, status FROM lead_checkouts
     WHERE token_id = $1 AND operator_hash = $2`,
    [tokenId, operatorHash]
  );

  if (row.rows.length === 0) return { verified: false };

  // Already verified in a previous call
  if (row.rows[0].status === "paid") return { verified: true };

  const checkoutId = row.rows[0].sumup_checkout_id;
  const verification = await verifyCheckout(checkoutId);

  if (!verification) return { verified: false };

  if (verification.status === "PAID") {
    await pool.query(
      `UPDATE lead_checkouts SET status = 'paid', verified_at = NOW()
       WHERE token_id = $1 AND operator_hash = $2`,
      [tokenId, operatorHash]
    );
    return { verified: true };
  }

  return { verified: false };
}

/**
 * Create a buy token for a lead. Called after lead insertion when customer opts in.
 */
export async function createBuyToken(leadId: string, product: string): Promise<string> {
  await ensureTables();
  const token = generateBuyToken();
  const { pricePence } = getLeadPrice(product);

  await pool.query(
    `INSERT INTO lead_buy_tokens (lead_id, token, product, price_pence)
     VALUES ($1, $2, $3, $4)`,
    [leadId, token, product, pricePence]
  );

  return token;
}

/**
 * Look up a buy token and return the associated lead details.
 * Includes customer PII — only expose after payment verification.
 */
export async function getBuyTokenDetails(token: string) {
  await ensureTables();

  const result = await pool.query(
    `SELECT
       lbt.id as token_id,
       lbt.lead_id,
       lbt.product,
       lbt.price_pence,
       lbt.created_at as token_created_at,
       l.site,
       l.business_slug,
       l.allow_direct_contact,
       l.contact_methods,
       l.name as customer_name,
       l.email as customer_email,
       l.phone as customer_phone,
       l.date,
       l.passengers,
       l.pickup,
       l.destination,
       l.journey_type,
       l.message,
       l.details,
       l.created_at as lead_created_at
     FROM lead_buy_tokens lbt
     JOIN leads l ON l.id = lbt.lead_id
     WHERE lbt.token = $1`,
    [token]
  );

  return result.rows[0] || null;
}

/** Number of days the backlink free period lasts */
const BACKLINK_FREE_DAYS = 90;

/**
 * Check if a business has an active backlink free period.
 * Returns true if the operator added our badge within the last 90 days.
 */
export async function isInBacklinkFreePeriod(
  businessSlug: string,
  product: string,
  site: string
): Promise<boolean> {
  await ensureTables();

  const result = await pool.query(
    `SELECT backlink_verified_at FROM operator_profiles
     WHERE business_slug = $1 AND product = $2 AND site = $3
       AND backlink_added = true AND backlink_verified_at IS NOT NULL`,
    [businessSlug, product, site]
  );

  if (result.rows.length === 0) return false;

  const verifiedAt = new Date(result.rows[0].backlink_verified_at);
  const daysSince = (Date.now() - verifiedAt.getTime()) / (1000 * 60 * 60 * 24);
  return daysSince <= BACKLINK_FREE_DAYS;
}

/**
 * Get remaining days in the backlink free period, or null if not active.
 */
export async function getBacklinkFreeDaysRemaining(
  businessSlug: string,
  product: string,
  site: string
): Promise<number | null> {
  await ensureTables();

  const result = await pool.query(
    `SELECT backlink_verified_at FROM operator_profiles
     WHERE business_slug = $1 AND product = $2 AND site = $3
       AND backlink_added = true AND backlink_verified_at IS NOT NULL`,
    [businessSlug, product, site]
  );

  if (result.rows.length === 0) return null;

  const verifiedAt = new Date(result.rows[0].backlink_verified_at);
  const daysSince = (Date.now() - verifiedAt.getTime()) / (1000 * 60 * 60 * 24);
  const remaining = BACKLINK_FREE_DAYS - daysSince;
  return remaining > 0 ? Math.ceil(remaining) : null;
}

/**
 * Record a lead purchase. Idempotent — skips if this operator already purchased this lead.
 */
export async function recordPurchase(
  tokenId: string,
  leadId: string,
  operatorHash: string,
  pricePence: number,
  operatorEmail?: string,
  operatorName?: string
): Promise<{ alreadyPurchased: boolean }> {
  await ensureTables();

  // Check for existing purchase by this operator
  const existing = await pool.query(
    `SELECT id FROM lead_purchases WHERE lead_id = $1 AND operator_hash = $2`,
    [leadId, operatorHash]
  );

  if (existing.rows.length > 0) {
    return { alreadyPurchased: true };
  }

  await pool.query(
    `INSERT INTO lead_purchases (lead_id, token_id, operator_hash, operator_email, operator_name, paid_amount_pence)
     VALUES ($1, $2, $3, $4, $5, $6)`,
    [leadId, tokenId, operatorHash, operatorEmail || null, operatorName || null, pricePence]
  );

  // Audit trail
  await pool.query(
    `INSERT INTO lead_events (lead_id, event_type, new_value, notes)
     VALUES ($1, 'lead_purchased', $2, $3)`,
    [leadId, `${pricePence}p`, `Purchased by operator ${operatorHash}${operatorEmail ? ` (${operatorEmail})` : ""}`]
  );

  return { alreadyPurchased: false };
}
