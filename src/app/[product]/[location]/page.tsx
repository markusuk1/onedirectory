import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getBusinessesByLocation,
  getLocations,
  getLocationBySlugWithCount,
  enrichWithPromotions,
} from "@/lib/data";
import { getAllLocationSlugs } from "@/lib/locations";
import { getSiteConfig } from "@/lib/siteConfig";
import {
  PRODUCT_SLUGS,
  getProductConfig,
  isValidProductSlug,
} from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import BusinessCard from "@/components/business/BusinessCard";
import AdBanner from "@/components/ads/AdBanner";
import { getServicePages } from "@/lib/servicePages";

export async function generateStaticParams() {
  const params: { product: string; location: string }[] = [];
  for (const product of PRODUCT_SLUGS) {
    const locations = getLocations(product as ProductId);
    for (const loc of locations) {
      params.push({ product, location: loc.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string; location: string }>;
}): Promise<Metadata> {
  const { product, location: locationSlug } = await params;
  if (!isValidProductSlug(product)) return {};
  const productConfig = getProductConfig(product)!;
  const location = getLocationBySlugWithCount(locationSlug, product as ProductId);
  if (!location) return {};
  const site = getSiteConfig();
  const shouldIndex = location.businessCount >= 3;
  return {
    title: `${productConfig.name} ${location.name} | Compare ${location.businessCount} Companies`,
    description: productConfig.locationDescriptionTemplate(location.name),
    alternates: {
      canonical: `https://${site.domain}/${product}/${locationSlug}`,
    },
    ...(!shouldIndex && { robots: { index: false, follow: true } }),
  };
}

export default async function ProductLocationPage({
  params,
}: {
  params: Promise<{ product: string; location: string }>;
}) {
  const { product, location: locationSlug } = await params;
  if (!isValidProductSlug(product)) notFound();

  const productId = product as ProductId;
  const productConfig = getProductConfig(product)!;
  const location = getLocationBySlugWithCount(locationSlug, productId);
  if (!location) notFound();

  const site = getSiteConfig();
  const rawBusinesses = getBusinessesByLocation(locationSlug, productId);
  const businesses = await enrichWithPromotions(rawBusinesses, product, site.id);
  const servicePages = getServicePages(productId);
  const allLocations = getLocations(productId).filter(
    (l) => l.slug !== locationSlug
  );

  const faqItems = productConfig.locationFaq
    ? productConfig.locationFaq(location.name, location.businessCount)
    : [];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: `${productConfig.name} in ${location.name}`,
      description: productConfig.locationDescriptionTemplate(location.name),
      url: `https://${site.domain}/${product}/${locationSlug}`,
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
      ],
    },
    ...(faqItems.length > 0
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]
      : []),
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
          <span className="text-text font-medium">{location.name}</span>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white border-b border-border py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
            {productConfig.name} in {location.name}
          </h1>
          <p className="text-text-light max-w-2xl">
            {productConfig.locationDescriptionTemplate(location.name)}
          </p>
          <div className="flex items-center gap-6 mt-4 text-sm text-text-light">
            <span>
              <strong className="text-text">{location.businessCount}</strong>{" "}
              {location.businessCount === 1 ? "company" : "companies"}
            </span>
          </div>
        </div>
      </section>

      {/* Location editorial */}
      {productConfig.locationEditorial && (() => {
        const editorial = productConfig.locationEditorial!(location.name);
        return (
          <section className="py-8 md:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white border border-border rounded-xl p-6 md:p-8">
                <h2 className="text-xl font-bold text-text mb-4">
                  {editorial.heading}
                </h2>
                <div className="space-y-3 text-text-light text-sm leading-relaxed">
                  {editorial.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Sponsored ad */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdBanner site={site.id} placement="location_page" product={product} />
        </div>
      </section>

      {/* Business listings */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Service pages */}
      {servicePages.length > 0 && (
        <section className="bg-surface py-8 md:py-12 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text mb-4">
              {productConfig.name} Services in {location.name}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {servicePages.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/${product}/services/${svc.slug}`}
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

      {/* Related locations */}
      <section className="bg-surface py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-text mb-6">
            Other Locations in the {site.shortName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allLocations
              .sort((a, b) => b.businessCount - a.businessCount)
              .slice(0, 8)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${product}/${loc.slug}`}
                  className="bg-white border border-border rounded-lg p-4 hover:shadow-md hover:border-primary-light transition-all text-sm group"
                >
                  <span className="font-medium text-text group-hover:text-primary transition-colors">
                    {loc.name}
                  </span>
                  <span className="text-text-light ml-1">
                    ({loc.businessCount})
                  </span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="bg-white py-8 md:py-12 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-text mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl">
              {faqItems.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-border rounded-lg"
                >
                  <summary className="cursor-pointer px-5 py-4 font-medium text-text hover:text-primary transition-colors list-none flex items-center justify-between">
                    {faq.question}
                    <span className="ml-2 text-text-light group-open:rotate-180 transition-transform">
                      ▾
                    </span>
                  </summary>
                  <div className="px-5 pb-4 text-text-light text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
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
