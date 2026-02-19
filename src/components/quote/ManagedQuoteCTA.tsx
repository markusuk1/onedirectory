import Link from "next/link";

interface ManagedQuoteCTAProps {
  compact?: boolean;
}

export default function ManagedQuoteCTA({ compact = false }: ManagedQuoteCTAProps) {
  if (compact) {
    return (
      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl p-5 text-white">
        <h3 className="font-semibold text-base mb-2">
          Let Us Find You the Best Price
        </h3>
        <p className="text-blue-100 text-sm mb-3 leading-relaxed">
          We contact multiple operators and send you quotes — completely free.
        </p>
        <ul className="space-y-1.5 text-sm text-blue-100 mb-4">
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Multiple quotes, one form
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            We do the legwork for you
          </li>
          <li className="flex items-center gap-2">
            <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free, no obligation
          </li>
        </ul>
        <Link
          href="/get-quotes"
          className="block text-center bg-accent hover:bg-accent-dark text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-sm w-full"
        >
          Get Quotes For Me
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-8 md:p-10 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block bg-white/15 text-sm font-medium px-3 py-1 rounded-full mb-4">
          Save time, save money
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Let Us Find You the Best Price
        </h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Why spend hours ringing around? Tell us what you need and we&apos;ll
          contact operators on your behalf. You&apos;ll receive quotes straight
          to your inbox — completely free.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">1. Tell us your trip</h3>
            <p className="text-blue-100 text-sm">Fill in one simple form with your journey details</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">2. We contact operators</h3>
            <p className="text-blue-100 text-sm">We reach out to suitable companies in your area</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/15 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">3. Compare & choose</h3>
            <p className="text-blue-100 text-sm">Receive quotes by email and pick the best one</p>
          </div>
        </div>

        <Link
          href="/get-quotes"
          className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
        >
          Get Quotes For Me
        </Link>
        <p className="text-blue-200 text-sm mt-3">Free, no obligation — takes 2 minutes</p>
      </div>
    </div>
  );
}
