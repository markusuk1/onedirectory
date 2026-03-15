import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogArticle, getAllBlogSlugs } from "@/lib/blog";
import { getSiteConfig } from "@/lib/siteConfig";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) return {};
  const site = getSiteConfig();
  return {
    title: article.title,
    description: article.metaDescription,
    alternates: {
      canonical: `https://${site.domain}/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogArticle(slug);
  if (!article) notFound();

  const site = getSiteConfig();

  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">{article.title}</span>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-4xl font-bold text-text mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-text-light mb-8">
          <span>By {article.author}</span>
          <span>·</span>
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt + "T00:00:00").toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </time>
        </div>

        <div
          className="prose prose-lg max-w-none text-text-light leading-relaxed"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {article.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-surface text-text-light rounded-full px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          <Link
            href="/blog"
            className="text-primary text-sm font-medium hover:underline"
          >
            ← Back to all articles
          </Link>
        </div>
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Article",
              headline: article.title,
              description: article.metaDescription,
              datePublished: article.publishedAt,
              author: {
                "@type": "Person",
                name: article.author,
              },
              publisher: {
                "@type": "Organization",
                name: site.genericName,
                url: `https://${site.domain}`,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://${site.domain}/blog/${slug}`,
              },
              keywords: article.tags.join(", "),
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
                  name: "Blog",
                  item: `https://${site.domain}/blog`,
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: article.title,
                  item: `https://${site.domain}/blog/${slug}`,
                },
              ],
            },
          ]),
        }}
      />
    </>
  );
}
