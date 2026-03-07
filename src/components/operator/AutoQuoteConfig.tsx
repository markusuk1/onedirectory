"use client";

import { useState } from "react";

interface Props {
  slug: string;
  product: string;
  site: string;
  initialEnabled: boolean;
  initialConfig: Record<string, unknown>;
}

export default function AutoQuoteConfig({
  slug,
  product,
  site,
  initialEnabled,
  initialConfig,
}: Props) {
  const [enabled, setEnabled] = useState(initialEnabled);
  const [config, setConfig] = useState(initialConfig);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function updateConfig(key: string, value: unknown) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError("");

    const res = await fetch("/api/operator/auto-quotes", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, product, site, enabled, config }),
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
          {product === "minibus-hire" && (
            <MinibusConfig config={config} onChange={updateConfig} />
          )}
          {product === "skip-hire" && (
            <SkipConfig config={config} onChange={updateConfig} />
          )}
          {product === "van-hire" && (
            <VanConfig config={config} onChange={updateConfig} />
          )}
          {product === "locksmith" && (
            <LocksmithConfig config={config} onChange={updateConfig} />
          )}

          {/* Response template */}
          <div>
            <label className="block text-sm font-medium text-text mb-1">
              Response Template
            </label>
            <textarea
              value={(config.responseTemplate as string) || ""}
              onChange={(e) => updateConfig("responseTemplate", e.target.value)}
              rows={3}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="Thanks for your enquiry! We can provide..."
            />
            <p className="text-xs text-text-light mt-1">
              Use placeholders like {"{price}"}, {"{date}"}, {"{passengers}"} etc.
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

function NumberField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
}: {
  label: string;
  value: number | undefined;
  onChange: (v: number) => void;
  placeholder?: string;
  prefix?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text mb-1">
        {label}
      </label>
      <div className="flex items-center">
        {prefix && (
          <span className="text-text-light mr-1 text-sm">{prefix}</span>
        )}
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full border border-border rounded-lg px-4 py-2 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function MinibusConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <NumberField
        label="Max Passengers"
        value={config.maxPassengers as number}
        onChange={(v) => onChange("maxPassengers", v)}
        placeholder="16"
      />
      <NumberField
        label="Minimum Price"
        value={config.minPrice as number}
        onChange={(v) => onChange("minPrice", v)}
        placeholder="50"
        prefix="£"
      />
    </div>
  );
}

function SkipConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}) {
  const prices = (config.prices as Record<string, number>) || {};
  function setPrice(size: string, value: number) {
    onChange("prices", { ...prices, [size]: value });
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-text mb-2">Skip Prices</h4>
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="Mini Skip" value={prices.mini} onChange={(v) => setPrice("mini", v)} prefix="£" />
        <NumberField label="Midi Skip" value={prices.midi} onChange={(v) => setPrice("midi", v)} prefix="£" />
        <NumberField label="Builders Skip" value={prices.builders} onChange={(v) => setPrice("builders", v)} prefix="£" />
        <NumberField label="Large Skip" value={prices.large} onChange={(v) => setPrice("large", v)} prefix="£" />
      </div>
    </div>
  );
}

function VanConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}) {
  const rates = (config.dailyRates as Record<string, number>) || {};
  function setRate(size: string, value: number) {
    onChange("dailyRates", { ...rates, [size]: value });
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-text mb-2">
        Daily Rates
      </h4>
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="SWB Van" value={rates.swb} onChange={(v) => setRate("swb", v)} prefix="£" />
        <NumberField label="LWB Van" value={rates.lwb} onChange={(v) => setRate("lwb", v)} prefix="£" />
        <NumberField label="Luton Van" value={rates.luton} onChange={(v) => setRate("luton", v)} prefix="£" />
        <NumberField label="Tipper Van" value={rates.tipper} onChange={(v) => setRate("tipper", v)} prefix="£" />
      </div>
    </div>
  );
}

function LocksmithConfig({
  config,
  onChange,
}: {
  config: Record<string, unknown>;
  onChange: (key: string, value: unknown) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <NumberField
        label="Standard Callout Fee"
        value={config.calloutFee as number}
        onChange={(v) => onChange("calloutFee", v)}
        placeholder="60"
        prefix="£"
      />
      <NumberField
        label="Emergency Callout Fee"
        value={config.emergencyCalloutFee as number}
        onChange={(v) => onChange("emergencyCalloutFee", v)}
        placeholder="85"
        prefix="£"
      />
    </div>
  );
}
