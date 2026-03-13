import { notFound } from "next/navigation";
import { getBuyTokenDetails, getLeadPrice } from "@/lib/lead-buy";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";

export const dynamic = "force-dynamic";

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

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

  const config = PRODUCT_CONFIGS[lead.product as ProductId];
  const { priceFormatted, sumupUrl } = getLeadPrice(lead.product);
  const productName = config?.shortName ?? lead.product;

  // Build job summary (no PII)
  const details: { label: string; value: string }[] = [];

  if (lead.date) details.push({ label: "Date", value: new Date(lead.date).toLocaleDateString("en-GB") });
  if (lead.passengers) details.push({ label: "Passengers", value: String(lead.passengers) });
  if (lead.pickup) details.push({ label: "Pickup Area", value: lead.pickup });
  if (lead.destination) details.push({ label: "Destination Area", value: lead.destination });
  if (lead.journey_type) details.push({ label: "Journey", value: lead.journey_type === "return" ? "Return" : "One way" });

  // Generic product details from JSONB
  if (lead.details && typeof lead.details === "object") {
    const d = lead.details as Record<string, string>;
    for (const [key, val] of Object.entries(d)) {
      if (val && key !== "serviceType") {
        const label = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
        details.push({ label, value: String(val) });
      }
    }
  }

  if (lead.message) details.push({ label: "Notes", value: lead.message });

  const contactMethods = (lead.contact_methods || []) as string[];
  const leadAge = timeAgo(new Date(lead.lead_created_at));

  const revealUrl = `/leads/reveal/${token}${op ? `?op=${op}` : ""}`;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-5 text-white">
          <h1 className="text-xl font-bold">Buy This Lead</h1>
          <p className="text-primary-light text-sm mt-1">
            {productName} &middot; Posted {leadAge}
          </p>
        </div>

        {/* Job Details */}
        <div className="px-6 py-5 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-text-light uppercase tracking-wider mb-3">
              Job Details
            </h2>
            <div className="space-y-2">
              {details.map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm">
                  <span className="text-text-light">{label}</span>
                  <span className="text-text font-medium text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Methods */}
          <div>
            <h2 className="text-sm font-semibold text-text-light uppercase tracking-wider mb-2">
              Customer Wants Contact Via
            </h2>
            <div className="flex flex-wrap gap-2">
              {contactMethods.map((method) => (
                <span
                  key={method}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium capitalize"
                >
                  {method}
                </span>
              ))}
            </div>
            {contactMethods.length === 1 && (
              <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-2">
                This customer has requested <strong>{contactMethods[0]} only</strong> &mdash; please respect their preference.
              </p>
            )}
          </div>

          {/* Price */}
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center">
            <p className="text-sm text-text-light mb-1">Lead Price</p>
            <p className="text-3xl font-bold text-accent">{priceFormatted}</p>
            <p className="text-xs text-text-light mt-1">
              This customer wants to hear from you &middot; Be first to respond
            </p>
          </div>

          {/* Pay Button */}
          <a
            href={sumupUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg text-center"
          >
            Pay {priceFormatted} Now
          </a>

          {/* Already Paid */}
          <a
            href={revealUrl}
            className="block text-center text-sm text-primary hover:text-primary-dark underline"
          >
            I&apos;ve already paid &mdash; show me the details
          </a>

          <p className="text-xs text-text-light text-center">
            After payment, click the link above to see the customer&apos;s contact details.
            Payment is verified on the honour system for now.
          </p>

          {/* Lead Guarantee */}
          <details className="group">
            <summary className="text-xs text-text-light text-center cursor-pointer hover:text-primary transition-colors">
              Our Lead Guarantee
            </summary>
            <div className="mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-xs text-blue-800 space-y-1">
              <p><strong>Refund</strong> issued if we verify the contact details are broken (wrong number, bounced email, disconnected line).</p>
              <p><strong>No refund</strong> if the customer simply doesn&apos;t respond &mdash; a working lead is a valid lead.</p>
              <p>Report any issue within <strong>7 days</strong> of purchase.</p>
              <p>We verify and resolve within <strong>48 hours</strong>.</p>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
