import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getLocations, getFeaturedBusinesses } from "@/lib/data";
import { getSiteConfig } from "@/lib/siteConfig";
import {
  PRODUCT_SLUGS,
  getProductConfig,
  isValidProductSlug,
} from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import BusinessCard from "@/components/business/BusinessCard";
import ManagedQuoteCTA from "@/components/quote/ManagedQuoteCTA";

export async function generateStaticParams() {
  return PRODUCT_SLUGS.map((product) => ({ product }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const { product } = await params;
  if (!isValidProductSlug(product)) return {};
  const productConfig = getProductConfig(product)!;
  const site = getSiteConfig();
  const locations = getLocations(product as ProductId);
  const totalBusinesses = locations.reduce(
    (sum, loc) => sum + loc.businessCount,
    0
  );
  return {
    title: `${productConfig.name} ${site.shortName} | Compare ${totalBusinesses}+ Companies`,
    description: `Compare ${productConfig.name.toLowerCase()} companies across ${site.region}. Get free quotes from trusted operators.`,
  };
}

export default async function ProductHomePage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  if (!isValidProductSlug(product)) notFound();

  const productId = product as ProductId;
  const productConfig = getProductConfig(product)!;
  const locations = getLocations(productId);
  const featured = getFeaturedBusinesses(6, productId);
  const totalBusinesses = locations.reduce(
    (sum, loc) => sum + loc.businessCount,
    0
  );
  const site = getSiteConfig();

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${productConfig.name} ${site.shortName}`,
      url: `https://${site.domain}/${product}`,
      description: `Compare ${productConfig.name.toLowerCase()} companies across ${site.region}.`,
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
            {productConfig.heroTitle(site.region)}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {productConfig.heroSubtitle(totalBusinesses, locations.length)}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-quotes"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              Get Quotes For Me
            </Link>
            <Link
              href={`/${product}#browse`}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors border border-white/20"
            >
              Browse Operators
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-surface border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8 text-sm text-text-light">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {totalBusinesses}+ Verified Companies
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free Quotes
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {locations.length} Locations
          </div>
        </div>
      </section>

      {/* Featured listings */}
      {featured.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
              Top Rated Operators
            </h2>
            <p className="text-text-light mb-8">
              {productConfig.featuredSubtitle(site.shortName)}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featured.map((business) => (
                <BusinessCard
                  key={business.slug}
                  business={business}
                  productSlug={product}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Locations grid */}
      <section id="browse" className="bg-surface py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
            Browse by Location
          </h2>
          <p className="text-text-light mb-8">
            {productConfig.browseSubtitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations
              .sort((a, b) => b.businessCount - a.businessCount)
              .map((location) => (
                <Link
                  key={location.slug}
                  href={`/${product}/${location.slug}`}
                  className="bg-white border border-border rounded-xl p-5 hover:shadow-md hover:border-primary-light transition-all duration-200 group"
                >
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                    {location.name}
                  </h3>
                  <p className="text-sm text-text-light mt-1">
                    {location.businessCount}{" "}
                    {location.businessCount === 1 ? "company" : "companies"}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
            Services Available
          </h2>
          <p className="text-text-light mb-8">
            {productConfig.servicesSubtitle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {productConfig.services.map((service) => (
              <div key={service.title} className="bg-white border border-border rounded-xl p-6">
                <h3 className="font-semibold text-lg text-text mb-2">{service.title}</h3>
                <p className="text-sm text-text-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-surface py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-text mb-4">
              {productConfig.seoHeading(site.shortName)}
            </h2>
            <div className="text-text-light text-sm leading-relaxed space-y-3">
              {productConfig
                .seoParagraphs(site.region, totalBusinesses, site.locationsList)
                .map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
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
