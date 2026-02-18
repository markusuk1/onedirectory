import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "About Minibus Hire North East - the largest directory of minibus and coach hire companies in North East England.",
};

export default function AboutPage() {
  return (
    <>
      <nav className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-text-light">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-text font-medium">About</span>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-text mb-6">
          About Minibus Hire North East
        </h1>

        <div className="space-y-4 text-text-light leading-relaxed">
          <p>
            We are the North East&apos;s most comprehensive directory of
            minibus and coach hire companies. Our mission is to make it easy
            for you to find trusted, reliable operators in your area.
          </p>
          <p>
            Whether you need a minibus for a night out, a coach for a school
            trip, a party bus for a celebration, or an airport transfer, we
            list over 183 verified companies across 16 locations in the North
            East of England.
          </p>
          <p>
            Every listing includes verified contact details, Google ratings
            and reviews, opening hours and location information. You can
            compare operators side by side and request free, no-obligation
            quotes.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-3">
            Areas We Cover
          </h2>
          <p>
            Newcastle upon Tyne, Sunderland, Durham, Middlesbrough, Gateshead,
            Darlington, Hartlepool, Northumberland, Stockton-on-Tees, Redcar,
            Whitley Bay, Washington, Tynemouth, South Shields, Cramlington and
            Morpeth.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-3">
            For Operators
          </h2>
          <p>
            If you run a minibus or coach hire company in the North East and
            would like to update your listing or discuss premium placement,
            please get in touch.
          </p>
        </div>
      </div>
    </>
  );
}
