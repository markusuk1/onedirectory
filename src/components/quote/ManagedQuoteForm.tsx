"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";
import type { FormFieldConfig } from "@/lib/formFieldTypes";
import DynamicFormFields from "@/components/form/DynamicFormFields";
import ContactConsent from "@/components/form/ContactConsent";
import InstantQuotes from "@/components/quote/InstantQuotes";

interface ManagedQuoteFormProps {
  productId?: ProductId;
}

const MESSAGE_PLACEHOLDERS: Partial<Record<ProductId, string>> = {
  "skip-hire": "Any access issues, heavy items, specific requirements...",
  "van-hire": "What you're moving, any special requirements...",
  locksmith: "Describe the issue, e.g. locked out, broken lock, key snapped...",
  "removal-companies": "Large or specialist items, access issues, floors/lifts, storage needs...",
  "bouncy-castle-hire": "Number of children, garden size, power supply available...",
  "limo-hire": "Any special requests, decorations, drinks packages...",
  "plant-hire": "Project type, ground conditions, access to site...",
  "driving-lessons": "Preferred days/times, any specific requirements, test date if booked...",
  "pest-control": "Type of pest, severity, any access issues, commercial or domestic...",
};

// Extra fields for minibus in managed form (time + conditional returnDate)
const MINIBUS_EXTRA_FIELDS: FormFieldConfig[] = [
  { name: "time", label: "Pickup Time", type: "time", required: true, half: true },
  {
    name: "returnDate",
    label: "Return Date",
    type: "date",
    half: true,
    conditionalOn: { field: "journeyType", value: "return" },
  },
];

interface QuoteData {
  id: string;
  pricePence: number;
  summary: string;
  tier: string;
}

export default function ManagedQuoteForm({ productId = "minibus-hire" }: ManagedQuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string | number>>({});
  const [allowDirectContact, setAllowDirectContact] = useState(false);
  const [contactMethods, setContactMethods] = useState<string[]>([]);
  // Instant quotes state
  const [instantQuotes, setInstantQuotes] = useState<QuoteData[] | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const config = PRODUCT_CONFIGS[productId];
  const baseQuoteFields = config.quoteFields ?? [];

  // For minibus, insert time + returnDate after the date field
  let quoteFields = baseQuoteFields;
  if (productId === "minibus-hire") {
    const dateIdx = baseQuoteFields.findIndex((f) => f.name === "date");
    quoteFields = [...baseQuoteFields];
    quoteFields.splice(dateIdx + 1, 0, ...MINIBUS_EXTRA_FIELDS);
  }

  // Inject minDate for date fields
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  const fieldsWithMinDate = quoteFields.map((f) =>
    (f.type === "date") && !f.min ? { ...f, min: minDate } : f
  );

  function handleFieldChange(name: string, value: string | number) {
    setFieldValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value || "";

    const base = {
      type: "managed_quote",
      product: productId,
      name: getValue("name"),
      email: getValue("email"),
      phone: getValue("phone"),
      budget: getValue("budget"),
      message: getValue("message"),
    };

    // Build details from config fields
    const details: Record<string, string | number | null> = {};
    for (const field of quoteFields) {
      const val = fieldValues[field.name];
      details[field.name] = val !== undefined && val !== "" ? val : null;
    }

    // Backward compat: derive serviceType
    if (productId === "van-hire") {
      details.serviceType = details.vanSize || null;
    } else if (productId === "plant-hire") {
      details.serviceType = details.equipmentType || null;
    } else if (productId === "driving-lessons") {
      details.serviceType = details.transmission || null;
    } else if (productId === "removal-companies") {
      details.serviceType = details.moveType || null;
    } else if (productId === "pest-control") {
      details.serviceType = details.pestType || null;
    }

    const consent = {
      allowDirectContact,
      contactMethods: allowDirectContact ? contactMethods : [],
    };

    let data;
    if (productId === "minibus-hire") {
      // Minibus sends fields at top level for backward compatibility
      const journeyType = fieldValues.journeyType || "";
      data = {
        ...base,
        ...consent,
        date: fieldValues.date || "",
        time: fieldValues.time || "",
        passengers: fieldValues.passengers ? parseInt(String(fieldValues.passengers)) : null,
        pickup: fieldValues.pickup || "",
        destination: fieldValues.destination || "",
        journeyType,
        returnDate: journeyType === "return" ? fieldValues.returnDate || "" : undefined,
      };
    } else {
      data = { ...base, ...consent, details };
    }

    try {
      // Try instant quotes first
      const quoteRes = await fetch("/api/quotes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productId, details, tier: "premium" }),
      });
      const quoteData = await quoteRes.json();

      if (quoteRes.ok && quoteData.quotes?.length > 0) {
        setInstantQuotes(quoteData.quotes);
        setSessionId(quoteData.sessionId);
        posthog.capture("instant_quotes_shown", {
          product: productId,
          count: quoteData.quotes.length,
        });
        setSubmitted(true);
      } else {
        // Fallback to legacy lead flow
        await fetch("/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-POSTHOG-DISTINCT-ID": posthog.get_distinct_id() ?? "",
            "X-POSTHOG-SESSION-ID": posthog.get_session_id() ?? "",
          },
          body: JSON.stringify(data),
        });
        posthog.capture("managed_quote_requested", {
          product: productId,
          type: "managed_quote",
          budget: base.budget || null,
        });
        setSubmitted(true);
      }
    } catch (err) {
      posthog.captureException(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    // Show instant quotes if available
    if (instantQuotes && sessionId) {
      return (
        <InstantQuotes
          quotes={instantQuotes}
          sessionId={sessionId}
          product={productId}
        />
      );
    }

    // Legacy fallback success state
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg
          className="w-12 h-12 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          We&apos;re On It!
        </h3>
        <p className="text-green-700 mb-1">
          We&apos;ll contact {config.shortName.toLowerCase()} operators in your area and send you quotes by email.
        </p>
        <p className="text-green-600 text-sm">
          You should start receiving quotes within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent";
  const messagePlaceholder =
    MESSAGE_PLACEHOLDERS[productId] || "Any special requirements, luggage, accessibility needs...";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Common: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text mb-1">
            Full Name *
          </label>
          <input type="text" id="name" name="name" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text mb-1">
            Email Address *
          </label>
          <input type="email" id="email" name="email" required className={inputClass} />
        </div>
      </div>

      {/* Common: Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-text mb-1">
          Phone Number *
        </label>
        <input type="tel" id="phone" name="phone" required className={inputClass} />
      </div>

      {/* Product-specific fields from config */}
      <DynamicFormFields
        fields={fieldsWithMinDate}
        values={fieldValues}
        onChange={handleFieldChange}
      />

      {/* Common: Budget */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-text mb-1">
          Budget Range
        </label>
        <select id="budget" name="budget" className={inputClass}>
          <option value="">No preference</option>
          <option value="under-100">Under &pound;100</option>
          <option value="100-250">&pound;100 - &pound;250</option>
          <option value="250-500">&pound;250 - &pound;500</option>
          <option value="500-1000">&pound;500 - &pound;1,000</option>
          <option value="over-1000">&pound;1,000+</option>
        </select>
      </div>

      {/* Common: Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-text mb-1">
          Additional Details
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder={messagePlaceholder}
          className={inputClass}
        />
      </div>

      {/* Direct contact consent */}
      <ContactConsent
        allowed={allowDirectContact}
        methods={contactMethods}
        onAllowedChange={setAllowDirectContact}
        onMethodsChange={setContactMethods}
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-accent hover:bg-accent-dark disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-lg cursor-pointer"
      >
        {submitting ? "Sending..." : "Get Quotes For Me"}
      </button>

      <p className="text-xs text-text-light text-center">
        See instant price estimates from local operators. Free, no obligation.
      </p>
    </form>
  );
}
