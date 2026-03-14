import { notFound } from "next/navigation";
import { getBuyTokenDetails, getLeadPrice, isInBacklinkFreePeriod } from "@/lib/lead-buy";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BuyLeadPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ op?: string }>;
}) {
  const { token } = await params;
  const { op } = await searchParams;

  const lead = await getBuyTokenDetails(token);
  if (!lead || !lead.allow_direct_contact) notFound();
  if (!op) notFound();

  const config = PRODUCT_CONFIGS[lead.product as ProductId];
  const productName = config?.shortName ?? lead.product;
  const { priceFormatted } = getLeadPrice(lead.product);

  // Check if this operator's business has an active backlink free period
  // We need the business slug from the lead to check — if it's a general lead, no free period applies
  let isFree = false;
  if (lead.product) {
    // Check all profiles for this operator hash — the lead may be from any business
    // For simplicity, check the specific business if the lead was for one
    const slug = lead.business_slug;
    if (slug) {
      isFree = await isInBacklinkFreePeriod(slug, lead.product, lead.site || "northeast");
    }
  }

  // Build job summary (no PII — just job details)
  const details: { label: string; value: string }[] = [];
  if (lead.date) details.push({ label: "Date", value: new Date(lead.date).toLocaleDateString("en-GB") });
  if (lead.passengers) details.push({ label: "Passengers", value: String(lead.passengers) });
  if (lead.pickup) details.push({ label: "Area", value: sanitiseForPreview(lead.pickup) });
  if (lead.destination) details.push({ label: "Destination Area", value: sanitiseForPreview(lead.destination) });
  if (lead.journey_type) details.push({ label: "Journey", value: lead.journey_type === "return" ? "Return" : "One way" });

  if (lead.details && typeof lead.details === "object") {
    const d = lead.details as Record<string, string>;
    for (const [key, val] of Object.entries(d)) {
      if (val && key !== "serviceType") {
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
        // Sanitise location fields to area only
        const locationKeys = ["pickup", "destination", "address", "location", "venue", "movingFrom", "movingTo", "siteLocation", "pickupLocation", "collectionLocation", "area"];
        const value = locationKeys.includes(key) ? sanitiseForPreview(val) : val;
        details.push({ label, value: String(value) });
      }
    }
  }

  if (lead.message) details.push({ label: "Notes", value: lead.message });

  const revealUrl = `/leads/reveal/${token}?op=${op}`;
  const checkoutUrl = `/api/leads/checkout?token=${token}&op=${op}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <div>
              <h1 className="text-xl font-bold">New {productName} Lead</h1>
              <p className="text-blue-100 text-sm">View customer details to provide a quote</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Job Details */}
          <div>
            <h2 className="text-sm font-semibold text-text-light uppercase tracking-wider mb-3">
              Job Summary
            </h2>
            <div className="space-y-2">
              {details.map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-text-light">{label}</span>
                  <span className="text-text font-medium text-right max-w-[60%]">{value}</span>
                </div>
              ))}
              {details.length === 0 && (
                <p className="text-sm text-text-light italic">Job details available after viewing.</p>
              )}
            </div>
          </div>

          {/* Customer Name Preview */}
          <div className="text-center py-3 bg-gray-50 rounded-xl border border-gray-200">
            <p className="text-sm text-text-light mb-1">Customer</p>
            <p className="text-lg font-bold text-text">
              {lead.customer_name?.split(" ")[0] || "Customer"}
              <span className="text-text-light"> ****</span>
            </p>
            <p className="text-xs text-text-light mt-1">Full name and contact details hidden</p>
          </div>

          {/* CTA */}
          {isFree ? (
            <div className="space-y-3">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-sm font-semibold text-green-800 mb-1">Badge Active — Free Lead</p>
                <p className="text-xs text-green-700">Your backlink badge gives you free access to leads</p>
              </div>
              <Link
                href={revealUrl}
                className="block w-full text-center py-3 px-6 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
              >
                View Customer Details — FREE
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <a
                href={checkoutUrl}
                className="block w-full text-center py-3 px-6 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              >
                View Customer Details — {priceFormatted}
              </a>
              <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-purple-800 mb-1">Want free leads?</p>
                <p className="text-xs text-purple-700 mb-3">
                  Add our badge to your website and get <strong>3 months of free leads</strong>.
                  No payment needed — just a small badge linking back to your listing.
                </p>
                <p className="text-xs text-purple-600">
                  Already have a profile? Visit your dashboard to set up the badge.
                </p>
              </div>
            </div>
          )}

          {/* Security note */}
          <p className="text-xs text-text-light text-center">
            Payments processed securely by SumUp. Customer details shown immediately after payment.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Strip a location to just the area/town (no house numbers or full addresses).
 * Shows enough for the operator to know if the job is in their area.
 */
function sanitiseForPreview(location: string): string {
  if (!location) return "Not specified";
  // If it contains a postcode, show just the outward code (first part)
  const postcodeMatch = location.match(/\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s*\d[A-Z]{2}\b/i);
  if (postcodeMatch) {
    return `${postcodeMatch[1].toUpperCase()} area`;
  }
  // Otherwise return as-is (usually a town name)
  return location;
}
