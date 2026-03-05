import type { Metadata } from "next";
import { getSiteConfig } from "@/lib/siteConfig";

const site = getSiteConfig();

export const metadata: Metadata = {
  title: `Terms of Use`,
  description: `Terms of use for ${site.genericName}.`,
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-text mb-6">Terms of Use</h1>
      <div className="space-y-6 text-text-light leading-relaxed">
        <p>
          These terms govern your use of {site.genericName}. By using this website, you agree to these terms.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Service description</h2>
          <p>
            We provide a comparison and lead-introduction service to help users request quotes from relevant operators.
            We are not the transport operator and do not directly provide transport services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Accuracy of information</h2>
          <p>
            We aim to keep listings and information accurate, but operator details, availability, and prices may
            change. Users should confirm final terms directly with the operator.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">User responsibilities</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate information when requesting quotes</li>
            <li>Do not misuse forms or submit unlawful content</li>
            <li>Do not attempt to interfere with platform operation</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Liability</h2>
          <p>
            We are not liable for the services delivered by third-party operators. Any contract for transport is
            between the customer and the chosen operator.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Site owner</h2>
          <p>
            This website is created and owned by Mark McCormick.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Changes to terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the site indicates acceptance of the
            latest version.
          </p>
        </section>
      </div>
    </div>
  );
}
