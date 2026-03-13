import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getAllBusinesses,
  getBusinessBySlug,
  getBusinessesByLocation,
  getBusinessWithOverrides,
  getLocationBySlugWithCount,
  enrichWithPromotions,
} from "@/lib/data";
import StarRating from "@/components/business/StarRating";
import ClickToReveal from "@/components/business/ClickToReveal";
import OpeningHours from "@/components/business/OpeningHours";
import BusinessCard from "@/components/business/BusinessCard";
import ManagedQuoteCTA from "@/components/quote/ManagedQuoteCTA";
import AdSidebar from "@/components/ads/AdSidebar";
import { getSiteConfig } from "@/lib/siteConfig";
import {
  PRODUCT_SLUGS,
  getProductConfig,
  isValidProductSlug,
} from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";

export const revalidate = 3600; // ISR: revalidate every hour

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
  const site = getSiteConfig();
  const ratingStr = biz.rating
    ? ` | ${biz.rating}/5 (${biz.totalReviews} reviews)`
    : "";
  return {
    title: `${biz.name} - ${biz.locationName}${ratingStr}`,
    description: biz.description || productConfig.metaDescriptionTemplate(biz.name, biz.locationName),
    alternates: {
      canonical: `https://${site.domain}/${product}/${location}/${businessSlug}`,
    },
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
  const business = await getBusinessWithOverrides(locationSlug, businessSlug, productId);
  if (!business) notFound();

  const site = getSiteConfig();
  const location = getLocationBySlugWithCount(locationSlug, productId);
  const rawNearby = getBusinessesByLocation(locationSlug, productId)
    .filter((b) => b.slug !== business.slug)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);
  const nearbyBusinesses = await enrichWithPromotions(rawNearby, product, site.id);

  // Schema.org JSON-LD
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: business.name,
      address: business.address,
      telephone:
        business.internationalMobilePhone ||
        business.internationalLandlinePhone ||
        business.internationalPhone ||
        business.mobilePhone ||
        business.landlinePhone ||
        business.phone,
      ...(business.email && { email: business.email }),
      ...(business.description && { description: business.description }),
      ...(business.services.length > 0 && {
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: business.services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s },
          })),
        },
      }),
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
              <div className="flex items-start gap-4">
                {business.logoUrl && (
                  <Image
                    src={business.logoUrl}
                    alt={`${business.name} logo`}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover border border-border shrink-0"
                  />
                )}
                <div>
                <h1 className="text-2xl md:text-3xl font-bold text-text mb-1">
                  {business.name}
                </h1>
                {business.tagline && (
                  <p className="text-text-light mb-2">{business.tagline}</p>
                )}
                {(business.isFeatured || business.isRecommended || business.isClaimed) && (
                  <div className="flex gap-2 mb-2">
                    {business.isClaimed && (
                      <span className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    )}
                    {business.isFeatured && (
                      <span className="bg-accent/10 text-accent-dark text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Featured
                      </span>
                    )}
                    {business.isRecommended && (
                      <span className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Recommended
                      </span>
                    )}
                  </div>
                )}
                <StarRating
                  rating={business.rating}
                  reviews={business.totalReviews}
                />
                </div>
              </div>
              {business.businessStatus === "OPERATIONAL" && (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  Open
                </span>
              )}
            </div>

            {/* Description */}
            {business.description && (
              <p className="text-text-light mt-4 leading-relaxed">
                {business.description}
              </p>
            )}

            {/* Services & Vehicles */}
            {(business.services.length > 0 || business.vehicles.length > 0) && (
              <div className="bg-white border border-border rounded-xl p-6 mt-6">
                {business.services.length > 0 && (
                  <div>
                    <h2 className="font-semibold text-lg text-text mb-3">
                      Services Offered
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {business.services.map((service) => (
                        <span
                          key={service}
                          className="bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {business.vehicles.length > 0 && (
                  <div className={business.services.length > 0 ? "mt-5" : ""}>
                    <h2 className="font-semibold text-lg text-text mb-3">
                      Fleet
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {business.vehicles.map((vehicle) => (
                        <span
                          key={vehicle}
                          className="bg-surface text-text text-sm font-medium px-3 py-1 rounded-full border border-border"
                        >
                          {vehicle}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

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

                {business.landlinePhone && (
                  <ClickToReveal
                    label="Landline"
                    phone={business.landlinePhone}
                    internationalPhone={business.internationalLandlinePhone}
                    businessSlug={business.slug}
                  />
                )}

                {business.mobilePhone && (
                  <ClickToReveal
                    label="Mobile"
                    phone={business.mobilePhone}
                    internationalPhone={business.internationalMobilePhone}
                    businessSlug={business.slug}
                  />
                )}

                {!business.landlinePhone && !business.mobilePhone && business.phone && (
                  <ClickToReveal
                    phone={business.phone}
                    internationalPhone={business.internationalPhone}
                    businessSlug={business.slug}
                  />
                )}

                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Send Email
                  </a>
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
              <ManagedQuoteCTA compact productId={productId} />

              {/* Sponsored sidebar ad */}
              <AdSidebar site={site.id} product={productId} excludeSlug={business.slug} />

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
