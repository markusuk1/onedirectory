import type { ProductId } from "./productConfig";

export interface Promotion {
  featured?: boolean;
  recommended?: boolean;
}

// Keyed by productId, then by business slug.
// Edit this file and redeploy to manage promotions.
// Slugs apply across all regions for that product.
const PROMOTIONS: Partial<Record<ProductId, Record<string, Promotion>>> = {
  "minibus-hire": {},
  "van-hire": {},
  "skip-hire": {},
  locksmith: {},
};

export function getPromotion(
  productId: ProductId,
  businessSlug: string
): Promotion {
  return PROMOTIONS[productId]?.[businessSlug] ?? {};
}
