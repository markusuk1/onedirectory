"use client";

import { useState } from "react";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";
import DynamicFormFields from "@/components/form/DynamicFormFields";

interface Props {
  slug: string;
  product: string;
  site: string;
  initialEnabled: boolean;
  initialConfig: Record<string, unknown>;
  initialServices?: string[];
}

/** Flatten nested object to dot-notation: { prices: { mini: 120 } } → { "prices.mini": 120 } */
function flatten(obj: Record<string, unknown>, prefix = ""): Record<string, string | number> {
  const result: Record<string, string | number> = {};
  for (const [key, val] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (val && typeof val === "object" && !Array.isArray(val)) {
      Object.assign(result, flatten(val as Record<string, unknown>, path));
    } else if (typeof val === "string" || typeof val === "number") {
      result[path] = val;
    }
  }
  return result;
}

/** Unflatten dot-notation to nested: { "prices.mini": 120 } → { prices: { mini: 120 } } */
function unflatten(flat: Record<string, string | number>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [path, val] of Object.entries(flat)) {
    const parts = path.split(".");
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!(parts[i] in current) || typeof current[parts[i]] !== "object") {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = val === "" ? undefined : val;
  }
  return result;
}

export default function AutoQuoteConfig({
  slug,
  product,
  site,
  initialEnabled,
  initialConfig,
  initialServices = [],
}: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [configValues, setConfigValues] = useState<Record<string, string | number>>(
    flatten(initialConfig)
  );
  const [responseTemplate, setResponseTemplate] = useState(
    (initialConfig.responseTemplate as string) || ""
  );
  const [services, setServices] = useState<string[]>(initialServices);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const productConfig = PRODUCT_CONFIGS[product as ProductId];
  const autoQuoteFields = productConfig?.autoQuoteFields ?? [];

  function handleFieldChange(name: string, value: string | number) {
    setConfigValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError("");

    // Unflatten dot-notation values back to nested config
    const config = unflatten(configValues);
    config.responseTemplate = responseTemplate;

    const res = await fetch("/api/operator/auto-quotes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, product, site, enabled, config, services }),
    });

    setSaving(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  return (
    <div className="space-y-6">
      {/* Enable/disable toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-text">Auto-Quotes</h3>
          <p className="text-sm text-text-light">
            Automatically send quotes to customers when they request one
          </p>
        </div>
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            enabled ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {enabled && (
        <div className="border-t border-border pt-6 space-y-4">
          {/* Services offered */}
          <ServicesCheckboxes
            product={product}
            selected={services}
            onChange={setServices}
          />

          {/* Product-specific config fields */}
          {autoQuoteFields.length > 0 && (
            <DynamicFormFields
              fields={autoQuoteFields}
              values={configValues}
              onChange={handleFieldChange}
            />
          )}

          {/* Response template */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Response Template
            </label>
            <textarea
              value={responseTemplate}
              onChange={(e) => setResponseTemplate(e.target.value)}
              rows={3}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Thanks for your enquiry! We can provide..."
            />
            <p className="text-xs text-text-light mt-1">
              Use placeholders like {"{price}"}, {"{date}"}, {"{passengers}"} etc. Don&apos;t include phone numbers, email addresses, or website links — customers must reply to us to proceed.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {saved && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg">
          Configuration saved
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Configuration"}
      </button>
    </div>
  );
}

function ServicesCheckboxes({
  product,
  selected,
  onChange,
}: {
  product: string;
  selected: string[];
  onChange: (services: string[]) => void;
}) {
  const productConfig = PRODUCT_CONFIGS[product as ProductId];
  if (!productConfig?.services?.length) return null;

  function toggleService(serviceId: string) {
    if (selected.includes(serviceId)) {
      onChange(selected.filter((s) => s !== serviceId));
    } else {
      onChange([...selected, serviceId]);
    }
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-text mb-1">Services Offered</h4>
      <p className="text-xs text-text-light mb-3">
        Select the services you provide. You&apos;ll only receive leads matching your services.
        Leave all unchecked to receive all leads.
      </p>
      <div className="grid grid-cols-2 gap-2">
        {productConfig.services.map((service) => (
          <label
            key={service.id}
            className="flex items-center gap-2 text-sm text-text cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selected.includes(service.id)}
              onChange={() => toggleService(service.id)}
              className="rounded border-border text-primary focus:ring-primary/50"
            />
            {service.title}
          </label>
        ))}
      </div>
    </div>
  );
}
