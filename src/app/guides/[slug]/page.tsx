import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/guides";
import { getLocationBySlug } from "@/lib/locations";
import { getSiteConfig } from "@/lib/siteConfig";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import ManagedQuoteCTA from "@/components/quote/ManagedQuoteCTA";

function linkifyText(text: string) {
  const urlRegex = /(https?:\/\/[^\s|]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, idx) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a key={`u-${idx}`} href={part} target="_blank" rel="noopener noreferrer" className="text-primary underline">
          {part}
        </a>
      );
    }
    return <span key={`t-${idx}`}>{part}</span>;
  });
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const site = getSiteConfig();
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `https://${site.domain}/guides/${slug}`,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const locations = guide.relatedLocations
    .map((s) => getLocationBySlug(s))
    .filter(Boolean);

  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-primary">
            Guides
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">{guide.title}</span>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {(() => {
          const GUIDE_KEYWORDS: Record<string, string[]> = {
            "skip-hire": ["skip"],
            "van-hire": ["van", "luton", "tipper"],
            "minibus-hire": ["minibus", "coach", "party-bus", "airport-transfer", "seater", "wedding-coach", "corporate"],
            locksmith: ["locksmith", "lock-change", "home-security"],
            "removal-companies": ["removals", "man-and-van", "office-removal", "house-removal"],
            "bouncy-castle-hire": ["bouncy", "soft-play", "party-entertainment"],
            "limo-hire": ["limo", "wedding-car", "prom-car"],
            "plant-hire": ["plant", "digger", "cherry-picker"],
            "pest-control": ["pest", "rat", "mouse", "wasp"],
            "driving-lessons": ["driving", "instructor", "test", "intensive"],
          };
          const matchedProduct = ALL_PRODUCTS.find((p) =>
            GUIDE_KEYWORDS[p.id]?.some((kw) => slug.includes(kw))
          ) || ALL_PRODUCTS.find((p) => p.id === "minibus-hire");
          return matchedProduct ? (
            <div className="flex items-start gap-5 mb-4">
              <img
                src={matchedProduct.image}
                alt={matchedProduct.imageAlt}
                className="hidden sm:block w-20 h-auto flex-shrink-0"
              />
              <h1 className="text-2xl md:text-4xl font-bold text-text">
                {guide.h1}
              </h1>
            </div>
          ) : (
            <h1 className="text-2xl md:text-4xl font-bold text-text mb-4">
              {guide.h1}
            </h1>
          );
        })()}
        <p className="text-xs text-text-light mb-4">
          Last updated:{" "}
          {guide.lastUpdated
            ? new Date(guide.lastUpdated + "T00:00:00").toLocaleDateString("en-GB", { month: "long", year: "numeric" })
            : new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
        </p>
        <p className="text-lg text-text-light leading-relaxed mb-8">
          {guide.intro}
        </p>

        {/* CTA */}
        <div className="mb-10">
          <ManagedQuoteCTA compact />
        </div>

        {/* Main content sections */}
        <div className="space-y-8">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-bold text-text mb-3">
                {section.heading}
              </h2>
              <p className="text-text-light leading-relaxed">
                {linkifyText(section.content)}
              </p>
            </section>
          ))}
        </div>

        {/* Related locations */}
        {locations.length > 0 && (
          <div className="mt-12 bg-surface rounded-xl p-6">
            <h2 className="text-xl font-bold text-text mb-4">
              Find Operators by Location
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {locations.map((loc) =>
                loc ? (
                  <Link
                    key={loc.slug}
                    href={`/${guide.product || "minibus-hire"}/${loc.slug}`}
                    className="bg-white border border-border rounded-lg px-4 py-3 hover:border-primary hover:shadow-sm transition-all text-text font-medium text-sm"
                  >
                    {loc.name}
                  </Link>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* FAQ */}
        {guide.faq.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl md:text-2xl font-bold text-text mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {guide.faq.map((item) => (
                <details
                  key={item.question}
                  className="bg-white border border-border rounded-xl p-5 group"
                >
                  <summary className="font-semibold text-text cursor-pointer list-none flex justify-between items-center">
                    {item.question}
                    <span className="text-text-light ml-2 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <p className="text-text-light mt-3 leading-relaxed">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12">
          <ManagedQuoteCTA />
        </div>
      </article>

      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            (() => {
              const s = getSiteConfig();
              const matchedProd = ALL_PRODUCTS.find((p) => p.id === guide.product);
              return {
                "@context": "https://schema.org",
                "@type": "Article",
                headline: guide.h1,
                description: guide.metaDescription,
                datePublished: "2025-06-01",
                dateModified: guide.lastUpdated || "2026-03-01",
                inLanguage: "en-GB",
                ...(matchedProd && {
                  image: `https://${s.domain}${matchedProd.image}`,
                }),
                author: {
                  "@type": "Organization",
                  name: s.genericName,
                  url: `https://${s.domain}`,
                },
                publisher: {
                  "@type": "Organization",
                  name: s.genericName,
                  url: `https://${s.domain}`,
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://${s.domain}/guides/${slug}`,
                },
                articleSection: guide.sections.map((sec) => sec.heading),
                keywords: guide.keywords.join(", "),
              };
            })(),
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: guide.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.answer,
                },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: `https://${getSiteConfig().domain}`,
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Guides",
                  item: `https://${getSiteConfig().domain}/guides`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: guide.title,
                  item: `https://${getSiteConfig().domain}/guides/${slug}`,
                },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
