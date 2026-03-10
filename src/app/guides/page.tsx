import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";
import { getSiteConfig } from "@/lib/siteConfig";
import { PRODUCT_CONFIGS, type ProductId } from "@/lib/productConfig";

const site = getSiteConfig();

export const metadata: Metadata = {
  title: "Hire Guides | Tips, Prices & Advice",
  description: `Expert guides covering minibus hire, van hire, skip hire and locksmiths in the ${site.shortName}. Prices, tips and advice.`,
};

export default function GuidesPage() {
  const grouped = GUIDES.reduce<Record<string, typeof GUIDES>>((acc, guide) => {
    const product = guide.product || "minibus-hire";
    if (!acc[product]) acc[product] = [];
    acc[product].push(guide);
    return acc;
  }, {});

  const productOrder: ProductId[] = ["minibus-hire", "van-hire", "skip-hire", "locksmith", "removal-companies", "bouncy-castle-hire", "limo-hire", "plant-hire"];
  const sections = productOrder.filter((p) => grouped[p]?.length);

  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">Guides</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-3">
          Guides &amp; Advice
        </h1>
        <p className="text-text-light mb-8">
          Expert tips, prices and advice across all our services in the{" "}
          {site.shortName}.
        </p>

        <div className="space-y-4">
          {sections.map((productId, i) => {
            const config = PRODUCT_CONFIGS[productId];
            const guides = grouped[productId];
            return (
              <details
                key={productId}
                className="bg-white border border-border rounded-xl group"
              >
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 list-none">
                  <h2 className="text-lg md:text-xl font-bold text-text flex items-center gap-2">
                    <span>{config.icon}</span> {config.name} Guides
                    <span className="text-sm font-normal text-text-light">
                      ({guides.length})
                    </span>
                  </h2>
                  <span className="text-text-light transition-transform rotate-[-90deg] group-open:rotate-0">
                    ▼
                  </span>
                </summary>
                <div className="grid gap-4 px-6 pb-6">
                  {guides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="bg-surface border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all group/card"
                    >
                      <h3 className="text-lg font-bold text-text group-hover/card:text-primary transition-colors mb-2">
                        {guide.title}
                      </h3>
                      <p className="text-text-light text-sm line-clamp-2">
                        {guide.intro}
                      </p>
                      <span className="inline-block mt-3 text-primary text-sm font-medium">
                        Read guide →
                      </span>
                    </Link>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </>
  );
}
