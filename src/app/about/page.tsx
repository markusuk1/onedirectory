import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/siteConfig";
import { getAllBusinesses, getLocations } from "@/lib/data";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";

const site = getSiteConfig();
const totalBusinesses = ALL_PRODUCTS.reduce(
  (sum, p) => sum + getAllBusinesses(p.id as ProductId).length,
  0
);
const totalLocations = getLocations().length;

export const metadata: Metadata = {
  title: "About Us",
  description: site.aboutDescription,
};

export default function AboutPage() {
  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">About</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-6">
          About {site.genericName}
        </h1>

        <div className="space-y-4 text-text-light leading-relaxed">
          <p>
            We are the {site.shortName}&apos;s most comprehensive directory of
            hire companies. Our mission is to make it easy for you to find
            trusted, reliable operators in your area.
          </p>
          <p>
            Whether you need a minibus for a night out, a van for moving house,
            a coach for a school trip, or a party bus for a celebration, we list
            over {totalBusinesses} verified companies across {totalLocations}{" "}
            locations in the {site.region}.
          </p>
          <p>
            Every listing includes verified contact details, Google ratings and
            reviews, opening hours and location information. You can compare
            operators side by side and request free, no-obligation quotes.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-3">
            Areas We Cover
          </h2>
          <p>{site.locationsList}.</p>

          <h2 className="text-xl font-bold text-text mt-8 mb-3">
            For Operators
          </h2>
          <p>
            If you run a hire company in the {site.shortName} and would like to
            update your listing or discuss premium placement, please get in
            touch.
          </p>
        </div>
      </div>
    </>
  );
}
