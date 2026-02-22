import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllBusinesses,
  getBusinessBySlug,
  getBusinessesByLocation,
  getLocationBySlugWithCount,
} from "@/lib/data";
import StarRating from "@/components/business/StarRating";
import ClickToReveal from "@/components/business/ClickToReveal";
import OpeningHours from "@/components/business/OpeningHours";
import BusinessCard from "@/components/business/BusinessCard";
import ManagedQuoteCTA from "@/components/quote/ManagedQuoteCTA";
import { getSiteConfig } from "@/lib/siteConfig";
import {
  PRODUCT_SLUGS,
  getProductConfig,
  isValidProductSlug,
} from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";

export async function generateStaticParams() {
  const params: { product: string; location: string; business: string }[] = [];
  for (const product of PRODUCT_SLUGS) {
    const businesses = getAllBusinesses(product as ProductId);
    for (const b of businesses) {
      params.push({
        product,
        location: b.locationSlug,
        business: b.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string; location: string; business: string }>;
}): Promise<Metadata> {
  const { product, location, business: businessSlug } = await params;
  if (!isValidProductSlug(product)) return {};
  const productConfig = getProductConfig(product)!;
  const biz = getBusinessBySlug(location, businessSlug, product as ProductId);
  if (!biz) return {};
  const ratingStr = biz.rating
    ? ` | ${biz.rating}/5 (${biz.totalReviews} reviews)`
    : "";
  return {
    title: `${biz.name} - ${biz.locationName}${ratingStr}`,
    description: productConfig.metaDescriptionTemplate(biz.name, biz.locationName),
  };
}

export default async function ProductBusinessPage({
  params,
}: {
  params: Promise<{ product: string; location: string; business: string }>;
}) {
  const { product, location: locationSlug, business: businessSlug } =
    await params;
  if (!isValidProductSlug(product)) notFound();

  const productId = product as ProductId;
  const productConfig = getProductConfig(product)!;
  const business = getBusinessBySlug(locationSlug, businessSlug, productId);
  if (!business) notFound();

  const location = getLocationBySlugWithCount(locationSlug, productId);
  const nearbyBusinesses = getBusinessesByLocation(locationSlug, productId)
    .filter((b) => b.slug !== business.slug)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  const site = getSiteConfig();

  // Schema.org JSON-LD
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: business.name,
      address: business.address,
      telephone: business.internationalPhone || business.phone,
      url: business.website,
      geo: {
        "@type": "GeoCoordinates",
        latitude: business.lat,
        longitude: business.lng,
      },
      ...(business.rating && {
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: business.rating,
          reviewCount: business.totalReviews,
        },
      }),
      ...(business.openingHours.length > 0 && {
        openingHours: business.openingHours,
      }),
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
          name: business.locationName,
          item: `https://${site.domain}/${product}/${locationSlug}`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: business.name,
          item: `https://${site.domain}/${product}/${locationSlug}/${business.slug}`,
        },
      ],
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
            {location?.name || locationSlug}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">{business.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">
                  {business.name}
                </h1>
                <StarRating
                  rating={business.rating}
                  reviews={business.totalReviews}
                />
              </div>
              {business.businessStatus === "OPERATIONAL" && (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Open
                </span>
              )}
            </div>

            {/* Details */}
            <div className="bg-white border border-border rounded-xl p-6 mt-6 space-y-4">
              <h2 className="font-semibold text-lg text-text">
                Business Details
              </h2>

              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-text-light shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-text">Address</p>
                  <p className="text-sm text-text-light">{business.address}</p>
                </div>
              </div>

              {business.website && (
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-text-light shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-text">Website</p>
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Visit website
                    </a>
                  </div>
                </div>
              )}

              {business.googleMapsUrl && (
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-text-light shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-text">Google Maps</p>
                    <a
                      href={business.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Opening hours */}
            {business.openingHours.length > 0 && (
              <div className="bg-white border border-border rounded-xl p-6 mt-4">
                <OpeningHours hours={business.openingHours} />
              </div>
            )}

            {/* Map embed */}
            <div className="bg-white border border-border rounded-xl overflow-hidden mt-4">
              <iframe
                title={`Map showing ${business.name}`}
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${business.lng - 0.01}%2C${business.lat - 0.01}%2C${business.lng + 0.01}%2C${business.lat + 0.01}&layer=mapnik&marker=${business.lat}%2C${business.lng}`}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Contact CTA */}
              <div className="bg-white border border-border rounded-xl p-6 space-y-3">
                <h2 className="font-semibold text-lg text-text">
                  Contact {business.name}
                </h2>

                {business.phone && (
                  <ClickToReveal
                    phone={business.phone}
                    internationalPhone={business.internationalPhone}
                    businessSlug={business.slug}
                  />
                )}

                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-surface hover:bg-surface-dark text-text font-semibold py-3 px-6 rounded-lg transition-colors w-full border border-border"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    Visit Website
                  </a>
                )}

                <Link
                  href="/get-quotes"
                  className="flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full"
                >
                  Get Quotes For Me
                </Link>
              </div>

              {/* Managed Quote CTA */}
              <ManagedQuoteCTA compact />

              {/* Location info */}
              <div className="bg-surface border border-border rounded-xl p-5">
                <p className="text-sm text-text-light">
                  This business is listed in our{" "}
                  <Link
                    href={`/${product}/${locationSlug}`}
                    className="text-primary hover:underline"
                  >
                    {location?.name} directory
                  </Link>
                  , which has {location?.businessCount}{" "}
                  {productConfig.name.toLowerCase()} companies.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby businesses */}
        {nearbyBusinesses.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-text mb-6">
              Other operators in {location?.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {nearbyBusinesses.map((b) => (
                <BusinessCard
                  key={b.slug}
                  business={b}
                  productSlug={product}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
