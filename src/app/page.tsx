import Link from "next/link";
import { getLocations } from "@/lib/data";
import { getSiteConfig } from "@/lib/siteConfig";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import ManagedQuoteCTA from "@/components/quote/ManagedQuoteCTA";

export default function HomePage() {
  const site = getSiteConfig();

  const heroImageByRegion: Record<string, string> = {
    northeast: "/images/hero/northeast.png",
    northwest: "/images/hero/northwest.png",
    scotland: "/images/hero/scotland.png",
    midlands: "/images/hero/midlands.png",
    yorkshire: "/images/hero/yorkshire.png",
    east: "/images/hero/east.png",
    london: "/images/hero/london.png",
    southeast: "/images/hero/southeast.png",
    southwest: "/images/hero/southwest.png",
    wales: "/images/hero/wales.png",
  };

  const heroImage = heroImageByRegion[site.id] || "";

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
      <section className="bg-gradient-to-br from-primary via-primary to-primary-dark text-white py-16 md:py-24 relative overflow-hidden">
        {heroImage && (
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat opacity-50"
            style={{ backgroundImage: `url(${heroImage})` }}
            aria-hidden="true"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/55 via-primary/50 to-primary-dark/60" aria-hidden="true" />
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/20 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <span className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-sm mb-4">
            <span>⚡</span>
            <span>Local comparison platform</span>
          </span>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Find and Compare Trusted
            <br />
            Local Services in {site.region}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            From transport and logistics to home and trade services, compare
            providers in one place and request quotes with clear, structured
            requirements.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8 text-sm">
            <span className="bg-white/15 px-3 py-1 rounded-full">Multi-category</span>
            <span className="bg-white/15 px-3 py-1 rounded-full">Regional coverage</span>
            <span className="bg-white/15 px-3 py-1 rounded-full">Quote comparison</span>
            <span className="bg-white/15 px-3 py-1 rounded-full">No-obligation enquiries</span>
          </div>

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
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="h-24 md:h-28 mx-auto mb-4"
                />
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

      {/* What we do / why we do it */}
      <section className="py-12 md:py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-text mb-3">What we do</h2>
              <p className="text-text-light leading-relaxed">
                {site.genericName} is a multi-service local comparison platform.
                We connect customers with relevant providers across many service
                categories, locations and use cases — not just one vertical.
              </p>
              <ul className="mt-4 space-y-2 text-text-light list-disc pl-5">
                <li>One platform for many service types and regions</li>
                <li>Structured quote requests routed to suitable providers</li>
                <li>Clear side-by-side comparison before booking</li>
              </ul>
            </div>

            <div className="bg-white border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-2xl font-bold text-text mb-3">Why we do it</h2>
              <p className="text-text-light leading-relaxed">
                Finding reliable local providers is fragmented in most
                categories. We built this to standardise discovery, quote
                collection and comparison so customers get better decisions and
                providers receive clearer enquiries.
              </p>
              <ul className="mt-4 space-y-2 text-text-light list-disc pl-5">
                <li>Reduce friction in local service discovery</li>
                <li>Improve quality and consistency of incoming enquiries</li>
                <li>Scale cleanly as new categories are added</li>
              </ul>
            </div>
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
