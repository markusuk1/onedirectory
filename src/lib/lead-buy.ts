import crypto from "crypto";
import pool from "./db";
import { initLeadBuyTables } from "./db-schema";
import { PRODUCT_CONFIGS, type ProductId } from "./productConfig";

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
