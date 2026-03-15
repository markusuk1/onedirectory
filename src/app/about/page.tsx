import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/siteConfig";
import { getAllBusinesses, getLocations } from "@/lib/data";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteConfig();
  return {
    title: `About Us | ${site.genericName}`,
    description: site.aboutDescription,
    alternates: {
      canonical: `https://${site.domain}/about`,
    },
  };
}

export default function AboutPage() {
  const site = getSiteConfig();
  const totalBusinesses = ALL_PRODUCTS.reduce(
    (sum, p) => sum + getAllBusinesses(p.id as ProductId).length,
    0
  );
  const totalLocations = getLocations().length;
  const { aboutContent } = site;

  const schema = {
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
        name: "About",
        item: `https://${site.domain}/about`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">About</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-6">
          About {site.genericName}
        </h1>

        <div className="space-y-4 text-text-light leading-relaxed">
          <p>{aboutContent.intro}</p>

          <h2 className="text-xl font-bold text-text mt-8 mb-3">
            Our Mission
          </h2>
          <p>{aboutContent.mission}</p>

          <div className="bg-surface border border-border rounded-lg p-5 my-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">
                  {totalBusinesses.toLocaleString()}+
                </p>
                <p className="text-sm text-text-light">Verified Companies</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {totalLocations}
                </p>
                <p className="text-sm text-text-light">Locations</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">
                  {ALL_PRODUCTS.length}
                </p>
                <p className="text-sm text-text-light">Service Categories</p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-text mt-8 mb-3">
            Areas We Cover
          </h2>
          <p>{aboutContent.coverage}</p>
          <p className="text-sm text-text-light mt-2">
            Key locations: {site.locationsList}.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-3">
            For Operators
          </h2>
          <p>{aboutContent.forOperators}</p>
          <p className="mt-2">
            <Link
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              Get in touch
            </Link>{" "}
            to claim your listing or discuss how we can help grow your business.
          </p>

          <hr className="border-border my-8" />
          <p className="text-sm">
            {site.genericName} is created and owned by Mark McCormick.
          </p>
        </div>
      </div>
    </>
  );
}
