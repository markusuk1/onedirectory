import { notFound } from "next/navigation";
import { getBuyTokenDetails, recordPurchase } from "@/lib/lead-buy";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";

export const dynamic = "force-dynamic";

export default async function RevealLeadPage({
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

  // Record the view (idempotent)
  await recordPurchase(
    lead.token_id,
    lead.lead_id,
    op,
    lead.price_pence
  );

  const contactMethods = (lead.contact_methods || []) as string[];
  const phone = lead.customer_phone || "";
  const email = lead.customer_email || "";

  // Build contact info filtered by customer preferences
  const contacts: { method: string; label: string; value: string; href: string }[] = [];

  if (contactMethods.includes("phone") && phone) {
    contacts.push({ method: "phone", label: "Phone", value: phone, href: `tel:${phone}` });
  }
  if (contactMethods.includes("email") && email) {
    contacts.push({ method: "email", label: "Email", value: email, href: `mailto:${email}` });
  }
  if (contactMethods.includes("whatsapp") && phone) {
    const waNumber = phone.replace(/[^0-9+]/g, "").replace(/^0/, "44");
    contacts.push({ method: "whatsapp", label: "WhatsApp", value: phone, href: `https://wa.me/${waNumber}` });
  }
  if (contactMethods.includes("sms") && phone) {
    contacts.push({ method: "sms", label: "SMS", value: phone, href: `sms:${phone}` });
  }

  // Job details
  const details: { label: string; value: string }[] = [];
  if (lead.date) details.push({ label: "Date", value: new Date(lead.date).toLocaleDateString("en-GB") });
  if (lead.passengers) details.push({ label: "Passengers", value: String(lead.passengers) });
  if (lead.pickup) details.push({ label: "Pickup", value: lead.pickup });
  if (lead.destination) details.push({ label: "Destination", value: lead.destination });
  if (lead.journey_type) details.push({ label: "Journey", value: lead.journey_type === "return" ? "Return" : "One way" });

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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-green-600 px-6 py-5 text-white">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h1 className="text-xl font-bold">Lead Details</h1>
              <p className="text-green-100 text-sm">{productName} lead</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Customer Name */}
          <div className="text-center">
            <p className="text-sm text-text-light">Customer</p>
            <p className="text-2xl font-bold text-text">{lead.customer_name}</p>
          </div>

          {/* Contact Methods */}
          <div>
            <h2 className="text-sm font-semibold text-text-light uppercase tracking-wider mb-3">
              Contact Details
            </h2>
            <div className="space-y-2">
              {contacts.map(({ method, label, value, href }) => (
                <a
                  key={method}
                  href={href}
                  target={method === "whatsapp" ? "_blank" : undefined}
                  rel={method === "whatsapp" ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <span className="text-sm font-medium text-green-800">{label}</span>
                  <span className="text-sm text-green-700 font-mono">{value}</span>
                </a>
              ))}
              {contactMethods.length === 1 && (
                <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  This customer has requested <strong>{contactMethods[0]} only</strong> &mdash; please respect their preference.
                </p>
              )}
              {contacts.length === 0 && (
                <p className="text-sm text-text-light italic">
                  No contact details available for the selected methods.
                </p>
              )}
            </div>
          </div>

          {/* Job Details */}
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

          {/* Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Tips for a great first contact</h3>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Introduce yourself and your company</li>
              <li>Reference the specific job details above</li>
              <li>Provide a clear quote or next steps</li>
              <li>Be responsive &mdash; speed wins</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
