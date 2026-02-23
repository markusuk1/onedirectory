import Link from "next/link";
import { getSiteConfig } from "@/lib/siteConfig";
import { ALL_PRODUCTS } from "@/lib/productConfig";

export default function NotFound() {
  const site = getSiteConfig();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
      <p className="text-6xl font-bold text-primary mb-4">404</p>
      <h1 className="text-2xl md:text-3xl font-bold text-text mb-3">
        Page Not Found
      </h1>
      <p className="text-text-light mb-8">
        Sorry, the page you&apos;re looking for doesn&apos;t exist or has been
        moved.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-md mx-auto">
        <Link
          href="/"
          className="bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Go to Homepage
        </Link>
        <Link
          href="/get-quotes"
          className="bg-surface border border-border text-text font-medium py-3 px-6 rounded-lg hover:bg-surface-dark transition-colors"
        >
          Get Quotes
        </Link>
      </div>

      <div className="border-t border-border pt-8">
        <p className="text-sm font-medium text-text mb-4">Browse by category</p>
        <div className="flex flex-wrap justify-center gap-3">
          {ALL_PRODUCTS.map((p) => (
            <Link
              key={p.id}
              href={`/${p.slug}`}
              className="inline-flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2 text-sm font-medium text-text hover:border-primary-light transition-colors"
            >
              <span>{p.icon}</span>
              {p.name}
            </Link>
          ))}
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 bg-surface border border-border rounded-lg px-4 py-2 text-sm font-medium text-text hover:border-primary-light transition-colors"
          >
            Guides
          </Link>
        </div>
      </div>
    </div>
  );
}
