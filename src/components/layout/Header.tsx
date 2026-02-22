import Link from "next/link";
import { getSiteConfig, ALL_REGIONS } from "@/lib/siteConfig";
import { ALL_PRODUCTS } from "@/lib/productConfig";

export default function Header() {
  const site = getSiteConfig();

  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {site.logoPrefix}
              </span>
            </div>
            <span className="font-bold text-lg text-text hidden sm:block">
              {site.genericName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              Home
            </Link>
            {ALL_PRODUCTS.map((product) => (
              <Link
                key={product.id}
                href={`/${product.slug}`}
                className="text-sm text-text-light hover:text-primary transition-colors"
              >
                {product.shortName}
              </Link>
            ))}
            <Link
              href="/guides"
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/about"
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              About
            </Link>
            <div className="relative group">
              <button className="text-sm text-text-light hover:text-primary transition-colors flex items-center gap-1">
                {site.shortName}
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white border border-border rounded-lg shadow-lg py-1 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {ALL_REGIONS.map((region) => (
                  <a
                    key={region.id}
                    href={`https://${region.domain}`}
                    className={`block px-4 py-2 text-sm transition-colors ${
                      region.id === site.id
                        ? "text-primary font-medium bg-blue-50"
                        : "text-text-light hover:text-primary hover:bg-surface"
                    }`}
                  >
                    {region.shortName}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <Link
            href="/get-quotes"
            className="bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Get Quotes For Me
          </Link>
        </div>
      </div>
    </header>
  );
}
