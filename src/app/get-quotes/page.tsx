import type { Metadata } from "next";
import Link from "next/link";
import ManagedQuoteForm from "@/components/quote/ManagedQuoteForm";
import { getSiteConfig } from "@/lib/siteConfig";

const site = getSiteConfig();

export const metadata: Metadata = {
  title: "Get Multiple Minibus Hire Quotes | We Do the Work For You",
  description:
    "Tell us your trip details and we'll contact operators on your behalf. Receive multiple minibus hire quotes by email — free, no obligation.",
};

export default function GetQuotesPage() {
  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">Get Quotes</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="text-center mb-8">
          <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mb-3">
            Save time, save money
          </span>
          <h1 className="text-2xl md:text-4xl font-bold text-text mb-3">
            Let Us Find You the Best Price
          </h1>
          <p className="text-text-light text-lg max-w-2xl mx-auto">
            Tell us about your trip and we&apos;ll contact multiple operators on
            your behalf. You&apos;ll receive quotes straight to your inbox.
          </p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
              1
            </div>
            <p className="text-sm font-medium text-text">Tell us your trip</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
              2
            </div>
            <p className="text-sm font-medium text-text">We contact operators</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
              3
            </div>
            <p className="text-sm font-medium text-text">Compare & choose</p>
          </div>
        </div>

        <div className="bg-white border border-border rounded-xl p-6 md:p-8">
          <ManagedQuoteForm />
        </div>

        {/* Why use us */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-1">No ringing around</h3>
            <p className="text-sm text-text-light">
              We contact suitable operators in your area so you don&apos;t have to.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-1">Compare prices</h3>
            <p className="text-sm text-text-light">
              Receive multiple quotes by email and pick the one that suits you best.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-1">Completely free</h3>
            <p className="text-sm text-text-light">
              Our quote service is 100% free with no obligation to book.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-5">
            <h3 className="font-semibold text-text mb-1">Local expertise</h3>
            <p className="text-sm text-text-light">
              We know the {site.shortName} operators and will match you with the
              right ones.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
