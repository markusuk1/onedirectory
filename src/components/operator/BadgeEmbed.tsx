"use client";

import { useState } from "react";

interface Props {
  slug: string;
  product: string;
  site: string;
  domain: string;
  siteName: string;
  backlinkAdded: boolean;
}

export default function BadgeEmbed({
  slug,
  product,
  site,
  domain,
  siteName,
  backlinkAdded: initialBacklinkAdded,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(initialBacklinkAdded);
  const [confirming, setConfirming] = useState(false);

  const listingUrl = `https://${domain}/${product}/${slug}`;
  const badgeUrl = `https://${domain}/api/badge`;

  const embedCode = `<a href="${listingUrl}" target="_blank" rel="noopener">\n  <img src="${badgeUrl}" alt="Listed on ${siteName}" width="200" height="48" />\n</a>`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirm = async () => {
    setConfirming(true);
    try {
      const res = await fetch("/api/operator/backlink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, product, site }),
      });
      if (res.ok) setConfirmed(true);
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Badge preview */}
      <div>
        <h3 className="font-semibold text-text text-sm mb-2">
          Your Badge Preview
        </h3>
        <div className="bg-surface rounded-lg p-4 flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={badgeUrl}
            alt={`Listed on ${siteName}`}
            width={200}
            height={48}
          />
          <p className="text-xs text-text-light">
            This is how the badge will look on your website
          </p>
        </div>
      </div>

      {/* Embed code */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-text text-sm">
            Embed Code
          </h3>
          <button
            onClick={handleCopy}
            className="text-xs bg-primary text-white px-3 py-1 rounded-md hover:bg-primary-dark transition-colors"
          >
            {copied ? "Copied!" : "Copy Code"}
          </button>
        </div>
        <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-lg overflow-x-auto">
          {embedCode}
        </pre>
      </div>

      {/* Platform-specific guides */}
      <div>
        <h3 className="font-semibold text-text text-sm mb-3">
          How to Add the Badge
        </h3>
        <div className="space-y-2">
          <details className="bg-white border border-border rounded-lg group">
            <summary className="p-3 cursor-pointer font-medium text-sm text-text hover:text-primary transition-colors">
              Wix
            </summary>
            <div className="px-3 pb-3 text-sm text-text-light space-y-2">
              <ol className="list-decimal list-inside space-y-1.5">
                <li>Open your Wix site editor</li>
                <li>
                  Click <strong>Add Elements</strong> (+) in the left panel
                </li>
                <li>
                  Select <strong>Embed Code</strong> &rarr;{" "}
                  <strong>Embed HTML</strong>
                </li>
                <li>Drag the element to your desired location (e.g. footer)</li>
                <li>
                  Click <strong>Enter Code</strong>, paste the embed code above,
                  and click <strong>Update</strong>
                </li>
                <li>
                  Click <strong>Publish</strong> to make it live
                </li>
              </ol>
            </div>
          </details>

          <details className="bg-white border border-border rounded-lg group">
            <summary className="p-3 cursor-pointer font-medium text-sm text-text hover:text-primary transition-colors">
              WordPress
            </summary>
            <div className="px-3 pb-3 text-sm text-text-light space-y-2">
              <ol className="list-decimal list-inside space-y-1.5">
                <li>
                  Go to <strong>Appearance</strong> &rarr;{" "}
                  <strong>Widgets</strong> in your WordPress dashboard
                </li>
                <li>
                  Add a <strong>Custom HTML</strong> widget to your footer or
                  sidebar
                </li>
                <li>Paste the embed code above into the widget</li>
                <li>
                  Click <strong>Save</strong>
                </li>
              </ol>
              <p className="text-xs mt-2">
                <strong>Block editor:</strong> You can also add it to any page
                using a Custom HTML block.
              </p>
            </div>
          </details>

          <details className="bg-white border border-border rounded-lg group">
            <summary className="p-3 cursor-pointer font-medium text-sm text-text hover:text-primary transition-colors">
              Squarespace
            </summary>
            <div className="px-3 pb-3 text-sm text-text-light space-y-2">
              <ol className="list-decimal list-inside space-y-1.5">
                <li>Open your site editor</li>
                <li>
                  Navigate to the page or footer where you want the badge
                </li>
                <li>
                  Click <strong>Add Block</strong> or <strong>Add Section</strong>
                </li>
                <li>
                  Choose <strong>Code</strong> block
                </li>
                <li>
                  Paste the embed code and toggle off{" "}
                  <strong>Display Source</strong>
                </li>
                <li>
                  Click <strong>Save</strong>
                </li>
              </ol>
            </div>
          </details>

          <details className="bg-white border border-border rounded-lg group">
            <summary className="p-3 cursor-pointer font-medium text-sm text-text hover:text-primary transition-colors">
              GoDaddy Website Builder
            </summary>
            <div className="px-3 pb-3 text-sm text-text-light space-y-2">
              <ol className="list-decimal list-inside space-y-1.5">
                <li>Open your GoDaddy website editor</li>
                <li>
                  Click <strong>Add Section</strong> where you want the badge
                </li>
                <li>
                  Select <strong>HTML</strong> from the content options
                </li>
                <li>
                  Paste the embed code and click <strong>Done</strong>
                </li>
                <li>
                  Click <strong>Publish</strong>
                </li>
              </ol>
            </div>
          </details>

          <details className="bg-white border border-border rounded-lg group">
            <summary className="p-3 cursor-pointer font-medium text-sm text-text hover:text-primary transition-colors">
              Shopify
            </summary>
            <div className="px-3 pb-3 text-sm text-text-light space-y-2">
              <ol className="list-decimal list-inside space-y-1.5">
                <li>
                  Go to <strong>Online Store</strong> &rarr;{" "}
                  <strong>Themes</strong> &rarr; <strong>Customize</strong>
                </li>
                <li>Navigate to your footer section</li>
                <li>
                  Add a <strong>Custom Liquid</strong> block
                </li>
                <li>Paste the embed code above</li>
                <li>
                  Click <strong>Save</strong>
                </li>
              </ol>
            </div>
          </details>

          <details className="bg-white border border-border rounded-lg group">
            <summary className="p-3 cursor-pointer font-medium text-sm text-text hover:text-primary transition-colors">
              Plain HTML Website
            </summary>
            <div className="px-3 pb-3 text-sm text-text-light space-y-2">
              <p>
                Simply paste the embed code directly into your HTML file,
                ideally in the footer section before the closing{" "}
                <code className="bg-surface px-1 rounded">&lt;/body&gt;</code>{" "}
                tag.
              </p>
            </div>
          </details>
        </div>
      </div>

      {/* Confirm button */}
      <div className="bg-surface rounded-lg p-4">
        {confirmed ? (
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
              ✓
            </span>
            <p className="text-sm font-medium text-green-700">
              Badge confirmed — 5 bonus quotes earned!
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm text-text-light mb-3">
              Once you&apos;ve added the badge to your website, click below to
              confirm and earn <strong>5 bonus free quotes</strong>.
            </p>
            <button
              onClick={handleConfirm}
              disabled={confirming}
              className="bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors disabled:opacity-50"
            >
              {confirming
                ? "Confirming..."
                : "I've Added the Badge — Claim 5 Free Quotes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
