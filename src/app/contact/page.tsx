import type { Metadata } from "next";
import { getSiteConfig, getRegionalAlternates } from "@/lib/siteConfig";
import FeedbackForm from "@/components/feedback/FeedbackForm";

const site = getSiteConfig();

export const metadata: Metadata = {
  title: `Contact`,
  description: `Contact ${site.genericName}. For customer support, quote assistance, operator updates, or business enquiries.`,
  alternates: {
    canonical: "/contact",
    languages: getRegionalAlternates("/contact"),
  },
  openGraph: {
    title: `Contact ${site.genericName}`,
    description: `Contact ${site.genericName}. For customer support, quote assistance, operator updates, or business enquiries.`,
    url: `https://${site.domain}/contact`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Contact ${site.genericName}`,
    description: `Contact ${site.genericName}. For customer support, quote assistance, operator updates, or business enquiries.`,
  },
};

export default function ContactPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: `Contact ${site.genericName}`,
      url: `https://${site.domain}/contact`,
      mainEntity: {
        "@type": "Organization",
        name: site.genericName,
        url: `https://${site.domain}`,
        email: "quotes@hirenortheast.co.uk",
        founder: {
          "@type": "Person",
          name: "Mark McCormick",
        },
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `https://${site.domain}` },
        { "@type": "ListItem", position: 2, name: "Contact", item: `https://${site.domain}/contact` },
      ],
    },
  ];

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-text mb-6">Contact</h1>
      <div className="bg-surface border border-border rounded-xl p-6 space-y-4 text-text-light leading-relaxed">
        <p>
          For customer support, quote assistance, operator updates, or business enquiries, please contact us by email.
        </p>
        <p>
          <span className="font-semibold text-text">Owner:</span> Mark McCormick
        </p>
        <p>
          <span className="font-semibold text-text">Email:</span>{" "}
          <a className="text-primary underline" href="mailto:quotes@hirenortheast.co.uk">
            quotes@hirenortheast.co.uk
          </a>
        </p>
        <p>
          We aim to respond as quickly as possible and route your request to the relevant team.
        </p>
      </div>

      <div className="mt-8">
        <FeedbackForm />
      </div>
    </div>
    </>
  );
}
