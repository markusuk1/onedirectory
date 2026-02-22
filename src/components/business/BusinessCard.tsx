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
      className="block bg-white border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary-light transition-all duration-200"
    >
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
