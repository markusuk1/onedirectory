import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getLocations, getAllBusinesses } from "@/lib/data";
import { getSiteConfig } from "@/lib/siteConfig";
import {
  getProductConfig,
  isValidProductSlug,
} from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import { getServicePages, getServicePage } from "@/lib/servicePages";

type Params = { product: string; service: string };

export async function generateStaticParams() {
  const params: Params[] = [];
  const { getAllServiceSlugs } = await import("@/lib/servicePages");
  for (const { product, service } of getAllServiceSlugs()) {
    params.push({ product, service });
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { product, service: serviceSlug } = await params;
  if (!isValidProductSlug(product)) return {};
  const productId = product as ProductId;
  const servicePage = getServicePage(productId, serviceSlug);
  if (!servicePage) return {};
  const site = getSiteConfig();
  return {
    title: servicePage.metaTitle(site.region),
    description: servicePage.metaDescription(site.region),
    alternates: {
      canonical: `https://${site.domain}/${product}/services/${serviceSlug}`,
    },
  };
}

export default async function ProductServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { product, service: serviceSlug } = await params;
  if (!isValidProductSlug(product)) notFound();

  const productId = product as ProductId;
  const productConfig = getProductConfig(product)!;
  const servicePage = getServicePage(productId, serviceSlug);
  if (!servicePage) notFound();

  const site = getSiteConfig();
  const locations = getLocations(productId);
  const allBusinesses = getAllBusinesses(productId);
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
      "@type": "WebPage",
      name: servicePage.h1(site.region),
      description: servicePage.metaDescription(site.region),
      url: `https://${site.domain}/${product}/services/${serviceSlug}`,
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
          name: servicePage.name,
          item: `https://${site.domain}/${product}/services/${serviceSlug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: servicePage.faq.map((f) => ({
        "@type": "Question",
        name: resolve(f.question, site.region),
        acceptedAnswer: {
          "@type": "Answer",
          text: resolve(f.answer, site.region),
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
          <span className="text-text font-medium">{servicePage.name}</span>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white border-b border-border py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
            {servicePage.h1(site.region)}
          </h1>
          <p className="text-text-light max-w-3xl leading-relaxed">
            {servicePage.intro(site.region, site.shortName)}
          </p>
          <div className="flex items-center gap-6 mt-4 text-sm text-text-light">
            <span>
              <strong className="text-text">{allBusinesses.length}</strong>{" "}
              companies across{" "}
              <strong className="text-text">{locations.length}</strong>{" "}
              locations
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
                  {resolve(section.heading, site.region)}
                </h2>
                <p className="text-text-light leading-relaxed">
                  {resolve(section.content, site.region, site.shortName)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by location */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-text mb-6">
            Find {servicePage.name} by Location
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {locations
              .sort((a, b) => b.businessCount - a.businessCount)
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
                  {resolve(f.question, site.region)}
                </summary>
                <p className="px-4 pb-4 text-text-light leading-relaxed">
                  {resolve(f.answer, site.region)}
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
              Other {productConfig.name} Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {otherServices.map((svc) => (
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

      {/* CTA */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            {productConfig.ctaText(site.region)}
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
