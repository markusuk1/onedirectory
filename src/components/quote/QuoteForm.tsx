"use client";

import { useState } from "react";
import posthog from "posthog-js";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";
import DynamicFormFields from "@/components/form/DynamicFormFields";
import ContactConsent from "@/components/form/ContactConsent";

interface QuoteFormProps {
  productId?: ProductId;
}

const MESSAGE_PLACEHOLDERS: Partial<Record<ProductId, string>> = {
  "skip-hire": "Any access issues, heavy items, specific requirements...",
  "van-hire": "What you're moving, any special requirements...",
  locksmith: "Describe the issue, e.g. locked out, broken lock, key snapped...",
  "removal-companies": "Large or specialist items, access issues, floors/lifts, storage needs...",
  "driving-lessons": "Preferred days/times, any specific requirements, test date if booked...",
  "pest-control": "Type of pest, severity, any access issues, commercial or domestic...",
};

export default function QuoteForm({ productId = "minibus-hire" }: QuoteFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string | number>>({});
  const [allowDirectContact, setAllowDirectContact] = useState(false);
  const [contactMethods, setContactMethods] = useState<string[]>([]);

  const config = PRODUCT_CONFIGS[productId];
  const quoteFields = config.quoteFields ?? [];

  // Inject minDate for date fields that don't specify their own min
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  const fieldsWithMinDate = quoteFields.map((f) =>
    f.type === "date" && !f.min ? { ...f, min: minDate } : f
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
      type: "quote_request",
      product: productId,
      name: getValue("name"),
      email: getValue("email"),
      phone: getValue("phone"),
      message: getValue("message"),
    };

    // Build details from config fields
    const details: Record<string, string | number | null> = {};
    for (const field of quoteFields) {
      const val = fieldValues[field.name];
      details[field.name] = val !== undefined && val !== "" ? val : null;
    }

    // Backward compat: derive serviceType from the primary field for products that need it
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
      // Minibus sends fields at top level for backward compatibility with API route
      data = {
        ...base,
        ...consent,
        date: fieldValues.date || "",
        passengers: fieldValues.passengers ? parseInt(String(fieldValues.passengers)) : null,
        pickup: fieldValues.pickup || "",
        destination: fieldValues.destination || "",
        journeyType: fieldValues.journeyType || "",
      };
    } else {
      data = { ...base, ...consent, details };
    }

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-POSTHOG-DISTINCT-ID": posthog.get_distinct_id() ?? "",
          "X-POSTHOG-SESSION-ID": posthog.get_session_id() ?? "",
        },
        body: JSON.stringify(data),
      });
      posthog.capture("quote_requested", {
        product: productId,
        type: "quote_request",
      });
      setSubmitted(true);
    } catch (err) {
      posthog.captureException(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
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
          Quote Request Sent!
        </h3>
        <p className="text-green-700">
          We&apos;ll be in touch shortly with {config.shortName.toLowerCase()} quotes from local operators.
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
        {submitting ? "Sending..." : "Get Free Quotes"}
      </button>

      <p className="text-xs text-text-light text-center">
        Your details will be shared with relevant operators to provide quotes. No spam, ever.
      </p>
    </form>
  );
}
