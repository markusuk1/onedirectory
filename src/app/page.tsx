import Link from "next/link";
import { getLocations } from "@/lib/data";
import { getSiteConfig } from "@/lib/siteConfig";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import ManagedQuoteCTA from "@/components/quote/ManagedQuoteCTA";

export default function HomePage() {
  const site = getSiteConfig();

  const productStats = ALL_PRODUCTS.map((product) => {
    const locations = getLocations(product.id as ProductId);
    const totalBusinesses = locations.reduce(
      (sum, loc) => sum + loc.businessCount,
      0
    );
    return { ...product, totalBusinesses, locationCount: locations.length };
  });

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.genericName,
      url: `https://${site.domain}`,
      description: site.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.genericName,
      url: `https://${site.domain}`,
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Find Hire Services
            <br />
            in {site.region}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Compare trusted operators across multiple hire categories. Get free
            quotes in minutes.
          </p>
          <Link
            href="/get-quotes"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
          >
            Get Quotes For Me
          </Link>
        </div>
      </section>

      {/* Product categories */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-2 text-center">
            Browse by Category
          </h2>
          <p className="text-text-light mb-8 text-center">
            Choose a hire category to find operators near you
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {productStats.map((product) => (
              <Link
                key={product.id}
                href={`/${product.slug}`}
                className="bg-white border border-border rounded-xl p-8 hover:shadow-lg hover:border-primary-light transition-all duration-200 group text-center"
              >
                <span className="text-4xl mb-4 block">{product.icon}</span>
                <h3 className="font-bold text-xl text-text group-hover:text-primary transition-colors mb-2">
                  {product.name}
                </h3>
                <p className="text-text-light text-sm">
                  {product.totalBusinesses}+ companies across{" "}
                  {product.locationCount} locations
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Managed Quote CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ManagedQuoteCTA />
        </div>
      </section>
    </>
  );
}
