import crypto from "crypto";
import bcrypt from "bcryptjs";
import pool from "./db";
import { initOperatorTables } from "./db-schema";

export function generateClaimToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * Create a claim record for a business. Called when we want to invite
 * an operator to claim their profile (e.g. after a lead comes in).
 */
export async function createClaim(
  businessSlug: string,
  product: string,
  site: string
): Promise<string | null> {
  await initOperatorTables();

  // Check if already claimed
  const existing = await pool.query(
    `SELECT id, status FROM operator_claims
     WHERE business_slug = $1 AND product = $2 AND site = $3`,
    [businessSlug, product, site]
  );

  if (existing.rows.length > 0) {
    // Already claimed or pending — return existing token if pending
    if (existing.rows[0].status === "pending") {
      const row = await pool.query(
        "SELECT claim_token FROM operator_claims WHERE id = $1",
        [existing.rows[0].id]
      );
      return row.rows[0]?.claim_token || null;
    }
    return null; // Already approved
  }

  const token = generateClaimToken();
  await pool.query(
    `INSERT INTO operator_claims (business_slug, product, site, claim_token, status)
     VALUES ($1, $2, $3, $4, 'pending')`,
    [businessSlug, product, site, token]
  );

  return token;
}

/**
 * Validate a claim token and return the claim details.
 */
export async function getClaimByToken(token: string) {
  await initOperatorTables();

  const result = await pool.query(
    `SELECT id, business_slug, product, site, status, operator_id
     FROM operator_claims WHERE claim_token = $1`,
    [token]
  );

  return result.rows[0] || null;
}

/**
 * Complete the claim: create operator account (or link existing),
 * approve the claim, and return the operator ID.
 */
export async function completeClaim(
  token: string,
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  await initOperatorTables();

  const claim = await getClaimByToken(token);
  if (!claim) return { success: false, error: "Invalid or expired claim token" };
  if (claim.status === "approved")
    return { success: false, error: "This profile has already been claimed" };

  // Check if operator account already exists
  let operatorId: string;
  const existingOp = await pool.query(
    "SELECT id FROM operators WHERE email = $1",
    [email]
  );

  if (existingOp.rows.length > 0) {
    operatorId = existingOp.rows[0].id;
  } else {
    // Create new operator account
    const hash = await bcrypt.hash(password, 12);
    const newOp = await pool.query(
      `INSERT INTO operators (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id`,
      [email, hash, name]
    );
    operatorId = newOp.rows[0].id;
  }

  // Approve the claim
  await pool.query(
    `UPDATE operator_claims
     SET operator_id = $1, status = 'approved', approved_at = NOW()
     WHERE id = $2`,
    [operatorId, claim.id]
  );

  // Create empty profile override entry
  await pool.query(
    `INSERT INTO operator_profiles (operator_id, business_slug, product, site)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (business_slug, product, site) DO NOTHING`,
    [operatorId, claim.business_slug, claim.product, claim.site]
  );

  return { success: true };
}
