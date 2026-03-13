import type { Metadata } from "next";
import Link from "next/link";
import { getHostedSite, getSiteConfig } from "@/lib/siteConfig";
import { getAllBusinesses } from "@/lib/data";
import type { ProductId } from "@/lib/productConfig";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const hosted = getHostedSite(slug);
  if (!hosted) return { title: "Not Found" };

  const businesses = getAllBusinesses(hosted.product as ProductId);
  const business = businesses.find((b) => b.slug === hosted.businessSlug);
  const site = getSiteConfig();

  return {
    title: {
      default: `${business?.name || slug} | ${site.genericName}`,
      template: `%s | ${business?.name || slug}`,
    },
    description:
      business?.description ||
      `${business?.name || slug} — local services in ${site.region}`,
  };
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hosted = getHostedSite(slug);
  const businesses = hosted
    ? getAllBusinesses(hosted.product as ProductId)
    : [];
  const business = businesses.find((b) => b.slug === hosted?.businessSlug);
  const site = getSiteConfig();

  return (
    <div className="hosted-site">
      <header className="bg-white border-b border-border">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            {business?.name || slug}
          </Link>
          {business?.phone && (
            <a
              href={`tel:${business.internationalMobilePhone || business.internationalLandlinePhone || business.internationalPhone || business.mobilePhone || business.landlinePhone || business.phone}`}
              className="text-sm font-medium text-primary hover:text-primary-dark"
            >
              {business.mobilePhone || business.landlinePhone || business.phone}
            </a>
          )}
        </div>
      </header>
      {children}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm">
          <p>
            Powered by{" "}
            <a
              href={`https://${site.domain}`}
              className="text-white hover:underline"
            >
              {site.genericName}
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
