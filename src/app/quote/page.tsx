import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/quote/QuoteForm";

export const metadata: Metadata = {
  title: "Get a Free Minibus Hire Quote",
  description:
    "Request free, no-obligation quotes from trusted minibus and coach hire operators across the North East of England.",
};

export default function QuotePage() {
  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">Get a Quote</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-2">
          Get a Free Minibus Hire Quote
        </h1>
        <p className="text-text-light mb-8">
          Fill in your journey details below and we&apos;ll connect you with
          trusted operators in your area. Free, no-obligation quotes.
        </p>

        <div className="bg-white border border-border rounded-xl p-6 md:p-8">
          <QuoteForm />
        </div>
      </div>
    </>
  );
}
