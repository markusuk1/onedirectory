import type { Metadata } from "next";
import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Hire Guides | Tips, Prices & Advice",
  description:
    "Expert guides on minibus and coach hire in the North East. Party buses, self-drive hire, airport transfers, wedding transport and more.",
};

export default function GuidesPage() {
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
          Minibus &amp; Coach Hire Guides
        </h1>
        <p className="text-text-light mb-8">
          Everything you need to know about hiring minibuses and coaches in the
          North East. Prices, tips, and expert advice.
        </p>

        <div className="grid gap-4">
          {GUIDES.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="bg-white border border-border rounded-xl p-6 hover:border-primary hover:shadow-md transition-all group"
            >
              <h2 className="text-lg font-bold text-text group-hover:text-primary transition-colors mb-2">
                {guide.title}
              </h2>
              <p className="text-text-light text-sm line-clamp-2">
                {guide.intro}
              </p>
              <span className="inline-block mt-3 text-primary text-sm font-medium">
                Read guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
