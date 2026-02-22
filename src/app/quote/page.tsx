import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/quote/QuoteForm";
import ManagedQuoteCTA from "@/components/quote/ManagedQuoteCTA";
import { getSiteConfig } from "@/lib/siteConfig";
import { isValidProductSlug } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";

const site = getSiteConfig();

export const metadata: Metadata = {
  title: "Get a Free Hire Quote",
  description: `Request free, no-obligation quotes from trusted operators across the ${site.region}.`,
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product } = await searchParams;
  const productId: ProductId = product && isValidProductSlug(product)
    ? product
    : "minibus-hire";

  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">Get a Quote</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">
          Get a Free Quote
        </h1>
        <p className="text-text-light mb-8">
          Fill in your details below and we&apos;ll connect you with
          trusted operators in your area. Free, no-obligation quotes.
        </p>

        <div className="bg-white border border-border rounded-xl p-6 md:p-8">
          <QuoteForm productId={productId} />
        </div>

        <div className="mt-8">
          <p className="text-center text-text-light text-sm mb-4">
            Or save time and let us do the work...
          </p>
          <ManagedQuoteCTA productId={productId} />
        </div>
      </div>
    </>
  );
}
