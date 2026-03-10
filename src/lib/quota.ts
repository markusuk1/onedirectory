import pool from "./db";
import { initOperatorTables } from "./db-schema";

const BASE_FREE_QUOTES = 5;
const CLAIM_BONUS = 5;
const BACKLINK_BONUS = 5;

export interface QuotaStatus {
  /** Total free quotes earned */
  total: number;
  /** Quotes already used */
  used: number;
  /** Remaining free quotes (0 = fee applies) */
  remaining: number;
  /** Whether the business profile has been claimed */
  claimed: boolean;
  /** Whether the operator has added our badge/link to their website */
  hasBacklink: boolean;
}

/**
 * Get the free quote allowance and usage for a business.
 * Works for both claimed and unclaimed businesses — unclaimed
 * businesses still get the base 5 free quotes.
 */
export async function getQuotaStatus(
  businessSlug: string,
  product: string,
  site: string
): Promise<QuotaStatus> {
  await initOperatorTables();

  // Check claim + profile in one query
  const profileResult = await pool.query(
    `SELECT oc.status, op.backlink_added
     FROM operator_claims oc
     LEFT JOIN operator_profiles op
       ON op.business_slug = oc.business_slug
       AND op.product = oc.product
       AND op.site = oc.site
     WHERE oc.business_slug = $1 AND oc.product = $2 AND oc.site = $3
     LIMIT 1`,
    [businessSlug, product, site]
  );

  const claimed = profileResult.rows[0]?.status === "approved";
  const hasBacklink = profileResult.rows[0]?.backlink_added === true;

  // Count quotes sent for this business
  const usedResult = await pool.query(
    `SELECT COUNT(*)::int AS count FROM auto_quotes_sent
     WHERE business_slug = $1`,
    [businessSlug]
  );
  const used = usedResult.rows[0]?.count || 0;

  // Calculate total allowance
  let total = BASE_FREE_QUOTES;
  if (claimed) total += CLAIM_BONUS;
  if (hasBacklink) total += BACKLINK_BONUS;

  return {
    total,
    used,
    remaining: Math.max(0, total - used),
    claimed,
    hasBacklink,
  };
}
