import type { Metadata } from "next";
import Link from "next/link";
import { getSiteConfig } from "@/lib/siteConfig";

const site = getSiteConfig();

export const metadata: Metadata = {
  title: `Privacy Policy`,
  description: `Privacy policy for ${site.genericName}.`,
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-text mb-6">Privacy Policy</h1>
      <div className="space-y-6 text-text-light leading-relaxed">
        <p>
          {site.genericName} is committed to protecting your privacy. This policy explains what data we collect,
          why we collect it, and how we use it when you browse our website, request quotes, or contact us.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Data we collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Contact details you submit (name, email address, phone number)</li>
            <li>Journey or service details submitted via quote forms</li>
            <li>Technical data (IP address, browser type, device information)</li>
            <li>Usage data (pages visited, clicks, referral source)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">How we use your data</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>To process quote requests and share relevant details with suitable operators</li>
            <li>To communicate updates about your request</li>
            <li>To improve site content, usability and service quality</li>
            <li>To prevent abuse and maintain platform security</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Data sharing</h2>
          <p>
            We share only the details required to obtain quotes from relevant operators. We do not sell personal
            data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Cookies and analytics</h2>
          <p>
            We may use cookies and analytics tools to understand site usage and improve performance. You can control
            cookies through your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Your rights</h2>
          <p>
            You may request access, correction, or deletion of your personal data. You may also object to certain
            processing activities where applicable.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-text mb-2">Data controller and contact</h2>
          <p>
            Data controller: Mark McCormick. For privacy requests, contact us via the <Link className="text-primary underline" href="/contact">Contact page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
