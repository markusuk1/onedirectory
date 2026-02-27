import Link from "next/link";
import type { Business } from "@/types";
import StarRating from "./StarRating";

export default function BusinessCard({
  business,
  productSlug = "minibus-hire",
}: {
  business: Business;
  productSlug?: string;
}) {
  return (
    <Link
      href={`/${productSlug}/${business.locationSlug}/${business.slug}`}
      className={`block bg-white border rounded-xl p-5 hover:shadow-lg transition-all duration-200 ${
        business.isFeatured
          ? "border-accent/50 ring-1 ring-accent/20 hover:border-accent"
          : "border-border hover:border-primary-light"
      }`}
    >
      {(business.isFeatured || business.isRecommended) && (
        <div className="flex gap-1.5 mb-2">
          {business.isFeatured && (
            <span className="bg-accent/10 text-accent-dark text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured
            </span>
          )}
          {business.isRecommended && (
            <span className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Recommended
            </span>
          )}
        </div>
      )}

      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-text leading-tight">
          {business.name}
        </h3>
        {business.businessStatus === "OPERATIONAL" && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ml-2">
            Open
          </span>
        )}
      </div>

      <StarRating rating={business.rating} reviews={business.totalReviews} />

      <p className="text-sm text-text-light mt-3 flex items-start gap-1.5">
        <svg
          className="w-4 h-4 text-text-light shrink-0 mt-0.5"
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
        <span className="line-clamp-1">{business.address}</span>
      </p>

      {business.description && (
        <p className="text-sm text-text-light mt-2 line-clamp-2">
          {business.description}
        </p>
      )}

      {business.phone && (
        <p className="text-sm text-text-light mt-1.5 flex items-center gap-1.5">
          <svg
            className="w-4 h-4 text-text-light shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
          <span>Call for quote</span>
        </p>
      )}

      {business.services.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {business.services.slice(0, 3).map((service) => (
            <span
              key={service}
              className="bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full"
            >
              {service}
            </span>
          ))}
          {business.services.length > 3 && (
            <span className="text-xs text-text-light py-0.5">
              +{business.services.length - 3} more
            </span>
          )}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-text-light bg-surface rounded-full px-2.5 py-1">
          {business.locationName}
        </span>
        <span className="text-sm font-medium text-primary">
          View details &rarr;
        </span>
      </div>
    </Link>
  );
}
