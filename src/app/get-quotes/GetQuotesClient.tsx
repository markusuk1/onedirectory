"use client";

import { useState } from "react";
import posthog from "posthog-js";
import ManagedQuoteForm from "@/components/quote/ManagedQuoteForm";
import type { ProductId } from "@/lib/productConfig";

interface GetQuotesClientProps {
  defaultProductId: ProductId;
}

const PRODUCTS: { id: ProductId; label: string; icon: string }[] = [
  { id: "minibus-hire", label: "Minibus & Coach", icon: "🚐" },
  { id: "van-hire", label: "Van Hire", icon: "🚚" },
  { id: "skip-hire", label: "Skip Hire", icon: "🗑️" },
  { id: "locksmith", label: "Locksmith", icon: "🔑" },
  { id: "removal-companies", label: "Removals", icon: "📦" },
];

export default function GetQuotesClient({ defaultProductId }: GetQuotesClientProps) {
  const [productId, setProductId] = useState<ProductId>(defaultProductId);

  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-text mb-2">
          What do you need?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setProductId(p.id);
                posthog.capture("product_selected", {
                  product_id: p.id,
                  product_label: p.label,
                  previous_product_id: productId,
                });
              }}
              className={`py-3 px-4 rounded-lg border-2 text-sm font-medium transition-all cursor-pointer ${
                productId === p.id
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-border bg-white text-text-light hover:border-primary-light"
              }`}
            >
              <span className="block text-lg mb-1">{p.icon}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <ManagedQuoteForm productId={productId} />
    </>
  );
}
