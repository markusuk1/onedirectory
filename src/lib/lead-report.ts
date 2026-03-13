import pool from "./db";
import { initLeadBuyTables } from "./db-schema";
import { initLeadReportTables } from "./db-schema";
import { generateOperatorHash } from "./lead-buy";
import { sendEmail } from "./email";

let tablesReady = false;

async function ensureTables() {
  if (!tablesReady) {
    await initLeadBuyTables();
    await initLeadReportTables();
    tablesReady = true;
  }
}

export const REPORT_REASONS = {
  wrong_number: "Wrong number",
  number_disconnected: "Number disconnected",
  email_bounced: "Email bounced",
  fake_details: "Fake/invalid details",
} as const;

export type ReportReason = keyof typeof REPORT_REASONS;

export interface PurchasedLead {
  purchase_id: string;
  lead_id: string;
  product: string;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string | null;
  contact_methods: string[];
  paid_amount_pence: number;
  purchased_at: string;
  date: string | null;
  passengers: number | null;
  pickup: string | null;
  destination: string | null;
  journey_type: string | null;
  message: string | null;
  details: Record<string, string> | null;
  report_id: string | null;
  report_reason: string | null;
  report_status: string | null;
  report_reported_at: string | null;
}

/**
 * Get all leads purchased by an operator, identified by email.
 */
export async function getPurchasedLeads(operatorEmail: string): Promise<PurchasedLead[]> {
  await ensureTables();
  const operatorHash = generateOperatorHash(operatorEmail);

  const result = await pool.query(
    `SELECT
       lp.id as purchase_id,
       lp.lead_id,
       lbt.product,
       l.name as customer_name,
       l.email as customer_email,
       l.phone as customer_phone,
       l.contact_methods,
       lp.paid_amount_pence,
       lp.purchased_at,
       l.date,
       l.passengers,
       l.pickup,
       l.destination,
       l.journey_type,
       l.message,
       l.details,
       lr.id as report_id,
       lr.reason as report_reason,
       lr.status as report_status,
       lr.reported_at as report_reported_at
     FROM lead_purchases lp
     JOIN leads l ON l.id = lp.lead_id
     LEFT JOIN lead_buy_tokens lbt ON lbt.id = lp.token_id
     LEFT JOIN lead_reports lr ON lr.purchase_id = lp.id
     WHERE lp.operator_hash = $1
     ORDER BY lp.purchased_at DESC`,
    [operatorHash]
  );

  return result.rows;
}

/**
 * Get count of purchased leads for dashboard badge.
 */
export async function getPurchasedLeadCount(operatorEmail: string): Promise<number> {
  await ensureTables();
  const operatorHash = generateOperatorHash(operatorEmail);

  const result = await pool.query(
    `SELECT COUNT(*) as count FROM lead_purchases WHERE operator_hash = $1`,
    [operatorHash]
  );

  return parseInt(result.rows[0].count);
}

/**
 * Submit a report for a purchased lead.
 * Enforces: one report per purchase, 7-day reporting window.
 */
export async function submitLeadReport(
  purchaseId: string,
  operatorEmail: string,
  reason: ReportReason,
  notes?: string
): Promise<{ success: boolean; error?: string }> {
  await ensureTables();
  const operatorHash = generateOperatorHash(operatorEmail);

  // Verify the purchase belongs to this operator
  const purchase = await pool.query(
    `SELECT lp.id, lp.lead_id, lp.purchased_at, lp.operator_hash, lbt.product
     FROM lead_purchases lp
     LEFT JOIN lead_buy_tokens lbt ON lbt.id = lp.token_id
     WHERE lp.id = $1`,
    [purchaseId]
  );

  if (purchase.rows.length === 0) {
    return { success: false, error: "Purchase not found" };
  }

  const row = purchase.rows[0];
  if (row.operator_hash !== operatorHash) {
    return { success: false, error: "Not your purchase" };
  }

  // Check 7-day reporting window
  const purchasedAt = new Date(row.purchased_at);
  const daysSincePurchase = (Date.now() - purchasedAt.getTime()) / (1000 * 60 * 60 * 24);
  if (daysSincePurchase > 7) {
    return { success: false, error: "Reporting window has closed (7 days)" };
  }

  // Check for existing report
  const existing = await pool.query(
    `SELECT id FROM lead_reports WHERE purchase_id = $1`,
    [purchaseId]
  );
  if (existing.rows.length > 0) {
    return { success: false, error: "Already reported" };
  }

  // Insert report
  await pool.query(
    `INSERT INTO lead_reports (purchase_id, lead_id, operator_hash, reason, notes)
     VALUES ($1, $2, $3, $4, $5)`,
    [purchaseId, row.lead_id, operatorHash, reason, notes || null]
  );

  // Audit trail
  await pool.query(
    `INSERT INTO lead_events (lead_id, event_type, new_value, notes)
     VALUES ($1, 'lead_reported', $2, $3)`,
    [row.lead_id, reason, `Reported by operator ${operatorHash} (${operatorEmail}): ${REPORT_REASONS[reason]}`]
  );

  // Admin notification
  const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "";
  if (NOTIFY_EMAIL) {
    await sendEmail({
      from: "Hire UK Alerts <notify@hirenortheast.co.uk>",
      to: NOTIFY_EMAIL,
      subject: `Lead Report — ${REPORT_REASONS[reason]} — ${row.product || "Unknown"}`,
      html: `
        <h2 style="margin:0 0 16px">Lead Issue Reported</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td style="padding:4px 8px;font-weight:600">Operator</td><td style="padding:4px 8px">${operatorEmail}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Product</td><td style="padding:4px 8px">${row.product || "—"}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Reason</td><td style="padding:4px 8px">${REPORT_REASONS[reason]}</td></tr>
          ${notes ? `<tr><td style="padding:4px 8px;font-weight:600">Notes</td><td style="padding:4px 8px">${notes}</td></tr>` : ""}
          <tr><td style="padding:4px 8px;font-weight:600">Purchase ID</td><td style="padding:4px 8px">${purchaseId}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Lead ID</td><td style="padding:4px 8px">${row.lead_id}</td></tr>
          <tr><td style="padding:4px 8px;font-weight:600">Purchased At</td><td style="padding:4px 8px">${row.purchased_at}</td></tr>
        </table>
      `,
    }).catch((err: unknown) => console.error("Lead report email failed:", err));
  }

  return { success: true };
}
