"use client";

import { useState } from "react";
import type { PurchasedLead } from "@/lib/lead-report";

const REPORT_REASONS = {
  wrong_number: "Wrong number",
  number_disconnected: "Number disconnected",
  email_bounced: "Email bounced",
  fake_details: "Fake/invalid details",
} as const;

type ReportReason = keyof typeof REPORT_REASONS;

function StatusBadge({ lead }: { lead: PurchasedLead }) {
  if (lead.report_status === "refunded") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        Refunded
      </span>
    );
  }
  if (lead.report_status === "verified_broken") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
        Verified Broken
      </span>
    );
  }
  if (lead.report_status === "verified_ok") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
        Verified OK
      </span>
    );
  }
  if (lead.report_id) {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
        Reported &mdash; {REPORT_REASONS[lead.report_reason as ReportReason] || lead.report_reason}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
      Active
    </span>
  );
}

function daysLeft(purchasedAt: string): number {
  const purchased = new Date(purchasedAt);
  const deadline = new Date(purchased.getTime() + 7 * 24 * 60 * 60 * 1000);
  const remaining = (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  return Math.max(0, Math.ceil(remaining));
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function ContactLink({ method, phone, email }: { method: string; phone: string | null; email: string | null }) {
  if (method === "phone" && phone) {
    return (
      <a href={`tel:${phone}`} className="text-primary hover:underline text-sm">
        {phone}
      </a>
    );
  }
  if (method === "email" && email) {
    return (
      <a href={`mailto:${email}`} className="text-primary hover:underline text-sm">
        {email}
      </a>
    );
  }
  if (method === "whatsapp" && phone) {
    const waNumber = phone.replace(/[^0-9+]/g, "").replace(/^0/, "44");
    return (
      <a href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
        WhatsApp {phone}
      </a>
    );
  }
  if (method === "sms" && phone) {
    return (
      <a href={`sms:${phone}`} className="text-primary hover:underline text-sm">
        SMS {phone}
      </a>
    );
  }
  return null;
}

export default function PurchasedLeads({ leads }: { leads: PurchasedLead[] }) {
  const [localLeads, setLocalLeads] = useState(leads);
  const [reportingId, setReportingId] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(null);
  const [reportNotes, setReportNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [reportError, setReportError] = useState("");

  async function handleReport() {
    if (!reportingId || !selectedReason) return;
    setSubmitting(true);
    setReportError("");

    try {
      const res = await fetch("/api/operator/leads/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purchaseId: reportingId,
          reason: selectedReason,
          notes: reportNotes || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setReportError(data.error || "Failed to submit report");
        return;
      }

      // Optimistically update local state
      setLocalLeads((prev) =>
        prev.map((l) =>
          l.purchase_id === reportingId
            ? { ...l, report_id: "pending", report_reason: selectedReason, report_status: "pending", report_reported_at: new Date().toISOString() }
            : l
        )
      );
      setReportingId(null);
      setSelectedReason(null);
      setReportNotes("");
    } catch {
      setReportError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (localLeads.length === 0) {
    return (
      <div className="bg-white border border-border rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-text-light/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-semibold text-text mb-2">No purchased leads yet</h3>
        <p className="text-sm text-text-light max-w-md mx-auto">
          When you purchase leads through our buy links, they&apos;ll appear here with full contact details and reporting options.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {localLeads.map((lead) => {
          const methods = (lead.contact_methods || []) as string[];
          const remaining = daysLeft(lead.purchased_at);
          const canReport = !lead.report_id && remaining > 0;

          return (
            <div key={lead.purchase_id} className="bg-white border border-border rounded-xl p-5 hover:shadow-sm transition-shadow">
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-text text-lg">{lead.customer_name || "Unknown"}</h3>
                    <StatusBadge lead={lead} />
                  </div>
                  <p className="text-sm text-text-light mt-0.5">
                    <span className="capitalize">{(lead.product || "").replace(/-/g, " ")}</span>
                    {" · "}Purchased {formatDate(lead.purchased_at)}
                    {" · "}£{(lead.paid_amount_pence / 100).toFixed(2)}
                  </p>
                </div>
                {canReport && (
                  <button
                    onClick={() => {
                      setReportingId(lead.purchase_id);
                      setSelectedReason(null);
                      setReportNotes("");
                      setReportError("");
                    }}
                    className="shrink-0 text-sm text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300 bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Report Issue
                  </button>
                )}
                {!lead.report_id && remaining === 0 && (
                  <span className="shrink-0 text-xs text-text-light">Report window closed</span>
                )}
              </div>

              {/* Contact details */}
              <div className="flex flex-wrap gap-x-6 gap-y-1 mb-3">
                {methods.map((method) => (
                  <div key={method} className="flex items-center gap-1.5">
                    <span className="text-xs text-text-light capitalize">{method}:</span>
                    <ContactLink method={method} phone={lead.customer_phone} email={lead.customer_email} />
                  </div>
                ))}
              </div>

              {/* Job details */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-text-light">
                {lead.date && <span>Date: {formatDate(lead.date)}</span>}
                {lead.passengers && <span>Passengers: {lead.passengers}</span>}
                {lead.pickup && <span>From: {lead.pickup}</span>}
                {lead.destination && <span>To: {lead.destination}</span>}
                {lead.journey_type && <span className="capitalize">{lead.journey_type.replace(/-/g, " ")}</span>}
                {lead.details && typeof lead.details === "object" &&
                  Object.entries(lead.details).map(([key, val]) =>
                    val && key !== "serviceType" ? (
                      <span key={key}>
                        {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}: {String(val)}
                      </span>
                    ) : null
                  )}
              </div>
              {lead.message && (
                <p className="text-sm text-text-light mt-2 italic">&ldquo;{lead.message}&rdquo;</p>
              )}

              {/* Report window hint */}
              {canReport && remaining <= 3 && (
                <p className="text-xs text-amber-600 mt-2">
                  {remaining} day{remaining !== 1 ? "s" : ""} left to report an issue
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Report Modal */}
      {reportingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setReportingId(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-lg font-bold text-text mb-1">Report an Issue</h2>
            <p className="text-sm text-text-light mb-4">
              Select the reason for your report. We&apos;ll verify within 48 hours.
            </p>

            <div className="space-y-2 mb-4">
              {(Object.entries(REPORT_REASONS) as [ReportReason, string][]).map(([key, label]) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedReason === key
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="reason"
                    value={key}
                    checked={selectedReason === key}
                    onChange={() => setSelectedReason(key)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text">{label}</span>
                </label>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-text mb-1">
                Additional details (optional)
              </label>
              <textarea
                value={reportNotes}
                onChange={(e) => setReportNotes(e.target.value)}
                rows={2}
                placeholder="Any extra info that might help us verify..."
                className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {reportError && (
              <p className="text-sm text-red-600 mb-3">{reportError}</p>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setReportingId(null)}
                className="flex-1 text-sm border border-border text-text px-4 py-2.5 rounded-lg hover:bg-surface transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReport}
                disabled={!selectedReason || submitting}
                className="flex-1 text-sm bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
              >
                {submitting ? "Submitting..." : "Submit Report"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
