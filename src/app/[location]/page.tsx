import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getBusinessesByLocation,
  getLocations,
  getLocationBySlugWithCount,
} from "@/lib/data";
import { getAllLocationSlugs } from "@/lib/locations";
import { getSiteConfig } from "@/lib/siteConfig";
import BusinessCard from "@/components/business/BusinessCard";

export async function generateStaticParams() {
  return getAllLocationSlugs().map((location) => ({ location }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location: locationSlug } = await params;
  const location = getLocationBySlugWithCount(locationSlug);
  if (!location) return {};
  return {
    title: `Minibus & Coach Hire ${location.name} | Compare ${location.businessCount} Companies`,
    description: location.description,
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location: locationSlug } = await params;
  const location = getLocationBySlugWithCount(locationSlug);
  if (!location) notFound();

  const businesses = getBusinessesByLocation(locationSlug);
  const allLocations = getLocations().filter((l) => l.slug !== locationSlug);

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">{location.name}</span>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white border-b border-border py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
            Minibus & Coach Hire in {location.name}
          </h1>
          <p className="text-text-light max-w-2xl">{location.description}</p>
          <div className="flex items-center gap-6 mt-4 text-sm text-text-light">
            <span>
              <strong className="text-text">{location.businessCount}</strong>{" "}
              {location.businessCount === 1 ? "company" : "companies"}
            </span>
          </div>
        </div>
      </section>

      {/* Business listings */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {businesses
              .sort((a, b) => {
                const ratingDiff = (b.rating || 0) - (a.rating || 0);
                if (ratingDiff !== 0) return ratingDiff;
                return b.totalReviews - a.totalReviews;
              })
              .map((business) => (
                <BusinessCard key={business.slug} business={business} />
              ))}
          </div>

          {businesses.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-light">
                No operators found in this location yet.
              </p>
              <Link href="/get-quotes" className="text-primary hover:underline mt-2 inline-block">
                Request a quote and we&apos;ll find operators for you
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Related locations */}
      <section className="bg-surface py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-text mb-6">
            Other Locations in the {getSiteConfig().shortName}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {allLocations
              .sort((a, b) => b.businessCount - a.businessCount)
              .slice(0, 8)
              .map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/${loc.slug}`}
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

      {/* CTA */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Need a minibus in {location.name}?
          </h2>
          <p className="text-blue-100 mb-5">
            Get free quotes from local operators
          </p>
          <Link
            href="/get-quotes"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get Quotes For Me
          </Link>
        </div>
      </section>
    </>
  );
}
