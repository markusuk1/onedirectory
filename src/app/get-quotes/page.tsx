import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/siteConfig";
import { isValidProductSlug } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import GetQuotesClient from "./GetQuotesClient";

const site = getSiteConfig();

export const metadata: Metadata = {
  title: "Get Instant Quotes | Compare Prices in Seconds",
  description:
    "Tell us what you need and get instant price estimates from local operators. Compare quotes, accept the best price, and get matched — free, no obligation.",
};

export default async function GetQuotesPage({
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
          <span className="text-text font-medium">Get Quotes</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            Instant prices, no waiting
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
            Get Instant Quotes in Seconds
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Tell us what you need and see prices instantly. Accept a quote
            and we&apos;ll match you with a local operator — free, no obligation.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
              1
            </div>
            <p className="text-sm font-medium text-text">Tell us what you need</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
              2
            </div>
            <p className="text-sm font-medium text-text">See instant prices</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
              3
            </div>
            <p className="text-sm font-medium text-text">Accept & get matched</p>
          </div>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 md:p-8">
          <GetQuotesClient defaultProductId={productId} />
        </div>

        {/* Why use us */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-1">Instant prices</h3>
            <p className="text-sm text-text-light">
              See up to 10 price estimates in seconds — no waiting around for callbacks.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-1">Compare & choose</h3>
            <p className="text-sm text-text-light">
              Compare prices side by side and accept the one that suits your budget.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-1">Completely free</h3>
            <p className="text-sm text-text-light">
              Our quote service is 100% free with no obligation to book.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-1">Matched locally</h3>
            <p className="text-sm text-text-light">
              We match you with vetted {site.shortName} operators who can do the job at your price.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
