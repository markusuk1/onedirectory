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
  { id: "homepage", label: "Homepage Ad", price: "£29/mo", description: "Shown on the main landing page for your region", payLink: "https://pay.sumup.com/b2c/QO7X0DMX" },
  { id: "product_page", label: "Product Page Ad", price: "£19/mo", description: "Shown on the product category page", payLink: "https://pay.sumup.com/b2c/QE5PCN3V" },
  { id: "location_page", label: "Location Page Ad", price: "£9/mo", description: "Shown on the location listing page", payLink: "https://pay.sumup.com/b2c/QM4CB3TO" },
  { id: "business_sidebar", label: "Business Sidebar Ad", price: "£5/mo", description: "Shown in the sidebar on other business profiles", payLink: "https://pay.sumup.com/b2c/QC76K2T5" },
];

const BUNDLE_LINK = "https://pay.sumup.com/b2c/QHORWPPZ";

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
  placement: { id: string; label: string; price: string; description: string; payLink: string };
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
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-text">{placement.label}</h3>
          <span className="text-xs font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full">
            {placement.price}
          </span>
        </div>
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

      {/* Payment link */}
      {status !== "active" && hasImages && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-text-light mb-2">
            Ready to go live? Pay securely via SumUp to activate your ad.
          </p>
          <a
            href={placement.payLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Pay {placement.price}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <p className="text-xs text-text-light mt-2">
            Your ad will be activated within 24 hours of payment confirmation.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AdvertForm({ slug, product, site, adverts }: Props) {
  const advertsByPlacement = new Map(adverts.map((a) => [a.placement, a]));

  return (
    <div className="space-y-6">
      {/* Bundle deal banner */}
      <div className="bg-gradient-to-r from-primary to-blue-700 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold mb-1">All 4 Ad Placements — £49/mo</h2>
            <p className="text-blue-100 text-sm">
              Save £13/mo vs buying individually. Maximum visibility across every page.
            </p>
          </div>
          <a
            href={BUNDLE_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
          >
            Get the Bundle
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Advertiser perks */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h3 className="font-semibold text-text mb-3">Advertiser Perks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2">
            <span className="shrink-0 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mt-0.5">✓</span>
            <p className="text-sm text-text"><strong>Unlimited free quotes</strong> — no service fee while your ad is active</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="shrink-0 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mt-0.5">✓</span>
            <p className="text-sm text-text"><strong>Priority delivery</strong> — your quotes are shown to customers first</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="shrink-0 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mt-0.5">✓</span>
            <p className="text-sm text-text"><strong>Up to 4 rotating images</strong> per ad slot</p>
          </div>
          <div className="flex items-start gap-2">
            <span className="shrink-0 w-5 h-5 rounded-full bg-green-500 text-white text-xs flex items-center justify-center mt-0.5">✓</span>
            <p className="text-sm text-text"><strong>Link to any URL</strong> — your website, booking page, or special offers</p>
          </div>
        </div>
      </div>

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
