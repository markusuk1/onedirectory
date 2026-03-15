import Link from "next/link";
import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/siteConfig";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import { getAllBusinesses } from "@/lib/data";
import type { ProductId } from "@/lib/productConfig";

export async function generateMetadata(): Promise<Metadata> {
  const site = getSiteConfig();
  return {
    title: `Frequently Asked Questions | ${site.genericName}`,
    description: `Common questions about hiring services in ${site.region}. Find answers about quotes, pricing, booking and how our directory works.`,
    alternates: {
      canonical: `https://${site.domain}/faq`,
    },
  };
}

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

function getRegionalFaqs(region: string, totalBusinesses: number, totalProducts: number): FaqSection[] {
  return [
    {
      title: "About Our Directory",
      items: [
        {
          question: `What is this directory?`,
          answer: `We are an independent directory of local service providers across ${region}. We list ${totalBusinesses.toLocaleString()}+ verified companies across ${totalProducts} different service categories, making it easy to compare ratings, read reviews and request quotes — all in one place and completely free for customers.`,
        },
        {
          question: "How do you verify the companies listed?",
          answer: "Every company in our directory has a verified Google Business listing. We display their genuine Google ratings and review counts. We also enrich listings with contact details, service descriptions and opening hours sourced from public business data. Companies can claim their profile to add additional details and respond to enquiries directly.",
        },
        {
          question: "Is it free to use?",
          answer: "Yes, completely free for customers. You can browse listings, compare companies and request quotes at no cost. There is no obligation to hire any company you contact through our directory.",
        },
        {
          question: "How do I request a quote?",
          answer: "Click the \"Get Quotes\" button on any page. Fill in your requirements — the form adapts based on the service you need. Your details are sent to relevant local operators who will contact you with quotes. You can also contact companies directly using the phone numbers and email addresses on their listing pages.",
        },
      ],
    },
    {
      title: "Pricing & Booking",
      items: [
        {
          question: "How much do services typically cost?",
          answer: "Prices vary significantly depending on the service, your location, the job size and the time of year. Our directory helps you compare multiple companies so you can find competitive pricing. We recommend getting at least three quotes before making a decision.",
        },
        {
          question: "Should I get multiple quotes?",
          answer: "Yes, always. Prices can vary by 30-50% between providers for the same job. Getting three or more quotes helps you understand the market rate and spot any unusually high or suspiciously low pricing. Our quote request form makes this easy by sending your requirements to multiple relevant operators.",
        },
        {
          question: "How far in advance should I book?",
          answer: "This depends on the service. For events like weddings or parties, book 2-4 weeks ahead. For skip hire or van hire, a few days is usually sufficient. During peak seasons (summer, school holidays, Christmas), book as early as possible — popular dates can fill up weeks in advance.",
        },
        {
          question: "What payment methods do companies accept?",
          answer: "Most companies accept bank transfers, debit/credit cards and cash. Some require a deposit at booking with the balance due on the day. Payment terms vary between providers, so confirm this when you get your quote.",
        },
      ],
    },
    {
      title: "Choosing a Provider",
      items: [
        {
          question: "How do I know if a company is reliable?",
          answer: "Check their Google reviews and rating — look for consistent positive feedback over time rather than just a high score. Verify they have the right licences and insurance for their trade. A company with 50+ reviews averaging 4+ stars is generally a safe choice. Be cautious of companies with very few reviews or no online presence.",
        },
        {
          question: "What licences and insurance should I check?",
          answer: "This varies by service. Minibus and coach hire companies need a PSV licence. Skip hire companies need a waste carrier licence. Locksmiths should be MLA-accredited or DBS-checked. Removal companies benefit from BAR membership. Driving instructors must display a valid ADI badge. Always ask to see relevant documentation before hiring.",
        },
        {
          question: "What if something goes wrong?",
          answer: "First, contact the company directly to resolve the issue. Keep records of all communications. If you cannot reach a resolution, check if the company belongs to a trade association (BAR, MLA, BPCA, etc.) which may offer dispute resolution. You can also leave a Google review to inform other customers of your experience.",
        },
      ],
    },
    {
      title: "For Business Operators",
      items: [
        {
          question: "How do I list my business?",
          answer: "If your business has a Google Business Profile in the service categories we cover, it may already be listed. Search for your company name on our site. To claim and enhance your listing with additional details, contact us through our contact page.",
        },
        {
          question: "Can I update my business information?",
          answer: "Yes. Claim your business profile to update your description, services, contact details and more. Claimed profiles appear as \"Verified\" in our directory, which increases trust with potential customers.",
        },
        {
          question: "How do I receive customer enquiries?",
          answer: "When customers request quotes through our site, their details are sent to relevant operators in the area. Make sure your listing has up-to-date contact details so customers can also reach you directly. Operators with claimed profiles receive priority placement.",
        },
      ],
    },
  ];
}

export default function FaqPage() {
  const site = getSiteConfig();
  let totalBusinesses = 0;
  let totalProducts = 0;
  for (const product of ALL_PRODUCTS) {
    const businesses = getAllBusinesses(product.id as ProductId);
    if (businesses.length > 0) {
      totalBusinesses += businesses.length;
      totalProducts++;
    }
  }

  const sections = getRegionalFaqs(site.region, totalBusinesses, totalProducts);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: sections.flatMap((s) =>
        s.items.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        }))
      ),
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
          name: "FAQ",
          item: `https://${site.domain}/faq`,
        },
      ],
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
          <span className="text-text font-medium">FAQ</span>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white border-b border-border py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-text-light max-w-2xl">
            Everything you need to know about finding and hiring local service
            providers in {site.region}. Can&apos;t find your answer?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-text mb-4">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-border rounded-lg bg-white"
                  >
                    <summary className="cursor-pointer px-5 py-4 font-medium text-text hover:text-primary transition-colors list-none flex items-center justify-between">
                      {faq.question}
                      <span className="ml-2 text-text-light group-open:rotate-180 transition-transform">
                        &#9662;
                      </span>
                    </summary>
                    <div className="px-5 pb-4 text-text-light text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-blue-100 mb-5">
            Compare local service providers and get free quotes
          </p>
          <Link
            href="/get-quotes"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Get Quotes For Me
          </Link>
        </div>
      </section>
    </>
  );
}
