"use client";

import { useState } from "react";
import AdvertImageUpload from "./AdvertImageUpload";

interface AdvertData {
  id: string;
  image_urls: string[];
  link_url: string | null;
  alt_text: string | null;
  placement: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
}

interface Props {
  slug: string;
  product: string;
  site: string;
  adverts: AdvertData[];
}

const PLACEMENTS = [
  { id: "homepage", label: "Homepage Ad", description: "Shown on the main landing page for your region" },
  { id: "product_page", label: "Product Page Ad", description: "Shown on the product category page" },
  { id: "location_page", label: "Location Page Ad", description: "Shown on the location listing page" },
  { id: "business_sidebar", label: "Business Sidebar Ad", description: "Shown in the sidebar on other business profiles" },
];

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-yellow-50", text: "text-yellow-700", label: "Pending Review" },
  active: { bg: "bg-green-50", text: "text-green-700", label: "Active" },
  paused: { bg: "bg-gray-100", text: "text-gray-600", label: "Paused" },
  expired: { bg: "bg-red-50", text: "text-red-600", label: "Expired" },
};

function PlacementCard({
  placement,
  slug,
  product,
  site,
  existing,
}: {
  placement: { id: string; label: string; description: string };
  slug: string;
  product: string;
  site: string;
  existing: AdvertData | null;
}) {
  const [linkUrl, setLinkUrl] = useState(existing?.link_url || "");
  const [altText, setAltText] = useState(existing?.alt_text || "");
  const [imageUrls, setImageUrls] = useState<string[]>(existing?.image_urls || []);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pausing, setPausing] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(existing?.status || "");

  const statusStyle = STATUS_STYLES[status] || null;
  const hasImages = imageUrls.some((url) => url !== "");

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setError("");

    const res = await fetch("/api/operator/adverts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        product,
        site,
        placement: placement.id,
        link_url: linkUrl,
        alt_text: altText,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save");
    } else {
      setSaved(true);
      if (!status) setStatus("pending");
      setTimeout(() => setSaved(false), 3000);
    }
  }

  async function handlePause() {
    setPausing(true);
    const res = await fetch("/api/operator/adverts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        product,
        site,
        placement: placement.id,
        action: "pause",
      }),
    });
    setPausing(false);
    if (res.ok) setStatus("paused");
  }

  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <div className="flex items-start justify-between gap-3 mb-1">
        <h3 className="font-semibold text-text">{placement.label}</h3>
        {statusStyle && (
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
            {statusStyle.label}
          </span>
        )}
      </div>
      <p className="text-sm text-text-light mb-4">{placement.description}</p>

      {/* Image upload grid */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text mb-2">
          Ad Images (up to 4)
        </label>
        <AdvertImageUpload
          slug={slug}
          product={product}
          site={site}
          placement={placement.id}
          currentUrls={imageUrls}
          onUploaded={setImageUrls}
        />
      </div>

      {/* Link URL */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text mb-1">
          Click-through URL
        </label>
        <input
          type="url"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          className="w-full border border-border rounded-lg px-4 py-2.5 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="https://www.yourbusiness.co.uk"
        />
      </div>

      {/* Alt text */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-text mb-1">
          Caption / Alt Text
        </label>
        <input
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          maxLength={255}
          className="w-full border border-border rounded-lg px-4 py-2.5 text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="e.g. Special offer: 10% off weekend hire"
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-2.5 rounded-lg mb-3">
          {error}
        </div>
      )}

      {saved && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-2.5 rounded-lg mb-3">
          Advert saved successfully
        </div>
      )}

      {status === "pending" && hasImages && (
        <div className="bg-yellow-50 text-yellow-700 text-sm px-4 py-2.5 rounded-lg mb-3">
          Your advert is under review and will be activated shortly.
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-primary hover:bg-primary-dark text-white font-semibold py-2.5 px-5 rounded-lg transition-colors disabled:opacity-50 text-sm"
        >
          {saving ? "Saving..." : "Save Advert"}
        </button>

        {status === "active" && (
          <button
            type="button"
            onClick={handlePause}
            disabled={pausing}
            className="bg-surface hover:bg-surface-dark text-text font-medium py-2.5 px-5 rounded-lg border border-border transition-colors disabled:opacity-50 text-sm"
          >
            {pausing ? "Pausing..." : "Pause Ad"}
          </button>
        )}
      </div>
    </div>
  );
}

export default function AdvertForm({ slug, product, site, adverts }: Props) {
  const advertsByPlacement = new Map(adverts.map((a) => [a.placement, a]));

  return (
    <div className="space-y-6">
      {PLACEMENTS.map((placement) => (
        <PlacementCard
          key={placement.id}
          placement={placement}
          slug={slug}
          product={product}
          site={site}
          existing={advertsByPlacement.get(placement.id) || null}
        />
      ))}
    </div>
  );
}
