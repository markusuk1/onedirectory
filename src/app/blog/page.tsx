import type { Metadata } from "next";
import Link from "next/link";
import { getBlogArticles } from "@/lib/blog";
import { getSiteConfig } from "@/lib/siteConfig";

const site = getSiteConfig();

export const metadata: Metadata = {
  title: `Blog | ${site.genericName}`,
  description: `Helpful guides, tips and articles about hiring services in ${site.region}. Expert advice on minibus hire, van hire, skip hire and more.`,
  alternates: {
    canonical: `https://${site.domain}/blog`,
  },
};

export default function BlogListingPage() {
  const articles = getBlogArticles();

  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">Blog</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-3">Blog</h1>
        <p className="text-text-light mb-8">
          Helpful articles, tips and guides about hiring services in{" "}
          {site.region}.
        </p>

        {articles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="bg-white border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all group"
              >
                <h2 className="text-lg font-bold text-text group-hover:text-primary transition-colors mb-2">
                  {article.title}
                </h2>
                <p className="text-xs text-text-light mb-3">
                  {new Date(article.publishedAt + "T00:00:00").toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p className="text-text-light text-sm line-clamp-3 mb-3">
                  {article.metaDescription}
                </p>
                {article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-surface text-text-light rounded-full px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <span className="inline-block mt-3 text-primary text-sm font-medium">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-surface border border-border rounded-xl p-8 text-center">
            <p className="text-text-light text-lg">
              New articles coming soon. Check back for helpful guides and tips
              about hiring services in {site.region}.
            </p>
          </div>
        )}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Blog",
                item: `https://${site.domain}/blog`,
              },
            ],
          }),
        }}
      />
    </>
  );
}
