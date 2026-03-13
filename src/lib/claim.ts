import crypto from "crypto";
import bcrypt from "bcryptjs";
import pool from "./db";
import { initOperatorTables } from "./db-schema";
import { sendEmail } from "./email";

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

/**
 * Send a claim email directly to the operator/business.
 * Called automatically when a claim is created for a business with a known email.
 */
export async function sendClaimEmail(
  email: string,
  businessName: string,
  claimUrl: string,
  siteName: string,
  domain: string
): Promise<void> {
  await sendEmail({
    from: `${siteName} <notify@hirenortheast.co.uk>`,
    to: email,
    replyTo: "mark@hirenortheast.co.uk",
    subject: `Claim your business profile on ${siteName}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <h2 style="margin:0 0 12px;color:#1a1a1a">Hi ${businessName},</h2>
        <p style="margin:0 0 12px;color:#444;line-height:1.6">
          Your business is listed on <strong>${siteName}</strong> (${domain}) and a customer has requested a quote from you.
        </p>
        <p style="margin:0 0 16px;color:#444;line-height:1.6">
          Claim your free profile to receive leads directly, manage your listing, and start getting more customers.
        </p>
        <div style="text-align:center;margin:24px 0">
          <a href="${claimUrl}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:600;font-size:16px">
            Claim My Profile
          </a>
        </div>
        <p style="margin:0 0 8px;color:#666;font-size:13px">Or copy and paste this link:</p>
        <p style="margin:0 0 16px;font-size:13px;color:#2563eb;word-break:break-all">${claimUrl}</p>
        <div style="border-top:1px solid #e5e7eb;padding-top:16px;margin-top:16px">
          <p style="margin:0 0 4px;color:#666;font-size:13px"><strong>What you get:</strong></p>
          <ul style="margin:0;padding-left:20px;color:#666;font-size:13px;line-height:1.8">
            <li>Receive customer quote requests directly</li>
            <li>Manage your business listing and description</li>
            <li>Buy exclusive leads from customers who want to hear from you</li>
          </ul>
        </div>
        <p style="margin:16px 0 0;color:#999;font-size:12px">
          If you didn't expect this email, you can safely ignore it. No account will be created unless you click the link above.
        </p>
        <p style="margin:8px 0 0;color:#999;font-size:12px">&mdash; ${siteName}</p>
      </div>
    `,
  });
}
