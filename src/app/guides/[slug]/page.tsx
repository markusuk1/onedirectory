import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/guides";
import { getLocationBySlug } from "@/lib/locations";

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
  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
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
        <h1 className="text-2xl md:text-4xl font-bold text-text mb-4">
          {guide.h1}
        </h1>
        <p className="text-lg text-text-light leading-relaxed mb-8">
          {guide.intro}
        </p>

        {/* CTA */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10">
          <p className="text-text font-semibold mb-2">
            Need a quick quote?
          </p>
          <p className="text-text-light text-sm mb-4">
            Compare {guide.title.toLowerCase()} companies across the North
            East. Free, no-obligation quotes.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>

        {/* Main content sections */}
        <div className="space-y-8">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl md:text-2xl font-bold text-text mb-3">
                {section.heading}
              </h2>
              <p className="text-text-light leading-relaxed">
                {section.content}
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
                    href={`/${loc.slug}`}
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
        <div className="mt-12 bg-primary rounded-xl p-8 text-center text-white">
          <h2 className="text-xl md:text-2xl font-bold mb-3">
            Ready to Book?
          </h2>
          <p className="text-white/80 mb-5">
            Compare operators and get free quotes from verified companies
            across the North East.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/quote"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/newcastle"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Browse Operators
            </Link>
          </div>
        </div>
      </article>

      {/* Schema.org FAQ structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />
    </>
  );
}
