import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getBusinessesByLocation,
  getLocations,
  getLocationBySlugWithCount,
  enrichWithPromotions,
} from "@/lib/data";
import { getSiteConfig } from "@/lib/siteConfig";
import {
  getProductConfig,
  isValidProductSlug,
} from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import { getServicePages, getServicePage } from "@/lib/servicePages";
import BusinessCard from "@/components/business/BusinessCard";

type Params = { product: string; location: string; service: string };

// Use ISR instead of full SSG to stay within Vercel build size limits
export const revalidate = 86400; // rebuild once per day
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { product, location: locationSlug, service: serviceSlug } = await params;
  if (!isValidProductSlug(product)) return {};
  const productId = product as ProductId;
  const location = getLocationBySlugWithCount(locationSlug, productId);
  if (!location) return {};
  const servicePage = getServicePage(productId, serviceSlug);
  if (!servicePage) return {};
  return {
    title: servicePage.metaTitle(location.name),
    description: servicePage.metaDescription(location.name),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { product, location: locationSlug, service: serviceSlug } = await params;
  if (!isValidProductSlug(product)) notFound();

  const productId = product as ProductId;
  const productConfig = getProductConfig(product)!;
  const location = getLocationBySlugWithCount(locationSlug, productId);
  if (!location) notFound();

  const servicePage = getServicePage(productId, serviceSlug);
  if (!servicePage) notFound();

  const site = getSiteConfig();
  const rawBusinesses = getBusinessesByLocation(locationSlug, productId);
  const businesses = await enrichWithPromotions(rawBusinesses, product, site.id);
  const otherServices = getServicePages(productId).filter(
    (s) => s.slug !== serviceSlug
  );

  const resolve = (
    fn: string | ((loc: string, region?: string) => string),
    loc: string,
    region?: string
  ) => (typeof fn === "function" ? fn(loc, region) : fn);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: servicePage.h1(location.name),
      description: servicePage.metaDescription(location.name),
      url: `https://${site.domain}/${product}/${locationSlug}/services/${serviceSlug}`,
      about: {
        "@type": "Place",
        name: location.name,
        geo: {
          "@type": "GeoCoordinates",
          latitude: location.lat,
          longitude: location.lng,
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `https://${site.domain}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: productConfig.name,
          item: `https://${site.domain}/${product}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: location.name,
          item: `https://${site.domain}/${product}/${locationSlug}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: servicePage.name,
          item: `https://${site.domain}/${product}/${locationSlug}/services/${serviceSlug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: servicePage.faq.map((f) => ({
        "@type": "Question",
        name: resolve(f.question, location.name),
        acceptedAnswer: {
          "@type": "Answer",
          text: resolve(f.answer, location.name),
        },
      })),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Breadcrumb */}
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/${product}`} className="hover:text-primary">
            {productConfig.name}
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/${product}/${locationSlug}`}
            className="hover:text-primary"
          >
            {location.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">{servicePage.name}</span>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white border-b border-border py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
            {servicePage.h1(location.name)}
          </h1>
          <p className="text-text-light max-w-3xl leading-relaxed">
            {servicePage.intro(location.name, site.shortName)}
          </p>
          <div className="flex items-center gap-6 mt-4 text-sm text-text-light">
            <span>
              <strong className="text-text">{businesses.length}</strong>{" "}
              {businesses.length === 1 ? "company" : "companies"} in{" "}
              {location.name}
            </span>
          </div>
        </div>
      </section>

      {/* SEO content sections */}
      <section className="py-8 md:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            {servicePage.sections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold text-text mb-3">
                  {resolve(section.heading, location.name)}
                </h2>
                <p className="text-text-light leading-relaxed">
                  {resolve(section.content, location.name, site.shortName)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business listings */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-text mb-6">
            {productConfig.name} Companies in {location.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {businesses
              .sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                if (a.isRecommended && !b.isRecommended) return -1;
                if (!a.isRecommended && b.isRecommended) return 1;
                const ratingDiff = (b.rating || 0) - (a.rating || 0);
                if (ratingDiff !== 0) return ratingDiff;
                return b.totalReviews - a.totalReviews;
              })
              .map((business) => (
                <BusinessCard
                  key={business.slug}
                  business={business}
                  productSlug={product}
                />
              ))}
          </div>

          {businesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-light">
                No operators found in this location yet.
              </p>
              <Link
                href={`/get-quotes?product=${product}`}
                className="text-primary hover:underline mt-2 inline-block"
              >
                Request a quote and we&apos;ll find operators for you
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-8 md:py-12 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-text mb-6">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl space-y-4">
            {servicePage.faq.map((f, i) => (
              <details
                key={i}
                className="bg-white border border-border rounded-lg group"
              >
                <summary className="p-4 cursor-pointer font-medium text-text hover:text-primary transition-colors">
                  {resolve(f.question, location.name)}
                </summary>
                <p className="px-4 pb-4 text-text-light leading-relaxed">
                  {resolve(f.answer, location.name)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      {otherServices.length > 0 && (
        <section className="py-8 md:py-12 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text mb-4">
              Other {productConfig.name} Services in {location.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {otherServices.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/${product}/${locationSlug}/services/${svc.slug}`}
                  className="bg-white border border-border rounded-lg p-4 hover:shadow-md hover:border-primary-light transition-all text-sm group"
                >
                  <span className="font-medium text-text group-hover:text-primary transition-colors">
                    {svc.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            {productConfig.ctaText(location.name)}
          </h2>
          <p className="text-blue-100 mb-5">
            Get free quotes from local operators
          </p>
          <Link
            href={`/get-quotes?product=${product}`}
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get Quotes For Me
          </Link>
        </div>
      </section>
    </>
  );
}
