import Link from "next/link";
import { getLocations, getFeaturedBusinesses } from "@/lib/data";
import BusinessCard from "@/components/business/BusinessCard";

export default function HomePage() {
  const locations = getLocations();
  const featured = getFeaturedBusinesses(6);
  const totalBusinesses = locations.reduce(
    (sum, loc) => sum + loc.businessCount,
    0
  );

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Find Minibus & Coach Hire
            <br />
            in North East England
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Compare {totalBusinesses}+ trusted operators across{" "}
            {locations.length} locations. Get free quotes in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/search"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors border border-white/20"
            >
              Browse Operators
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-surface border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-8 text-sm text-text-light">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {totalBusinesses}+ Verified Companies
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Free Quotes
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {locations.length} Locations
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
            Top Rated Operators
          </h2>
          <p className="text-text-light mb-8">
            Highest rated minibus and coach hire companies in the North East
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((business) => (
              <BusinessCard key={business.slug} business={business} />
            ))}
          </div>
        </div>
      </section>

      {/* Locations grid */}
      <section className="bg-surface py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
            Browse by Location
          </h2>
          <p className="text-text-light mb-8">
            Find minibus and coach hire companies near you
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {locations
              .sort((a, b) => b.businessCount - a.businessCount)
              .map((location) => (
                <Link
                  key={location.slug}
                  href={`/${location.slug}`}
                  className="bg-white border border-border rounded-xl p-5 hover:shadow-md hover:border-primary-light transition-all duration-200 group"
                >
                  <h3 className="font-semibold text-text group-hover:text-primary transition-colors">
                    {location.name}
                  </h3>
                  <p className="text-sm text-text-light mt-1">
                    {location.businessCount}{" "}
                    {location.businessCount === 1 ? "company" : "companies"}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
            Services Available
          </h2>
          <p className="text-text-light mb-8">
            Whatever your group transport needs, we can help
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Minibus Hire", desc: "8-16 seater minibuses with driver for any occasion. Perfect for nights out, weddings and corporate events." },
              { title: "Coach Hire", desc: "Full-size coaches for larger groups. Ideal for school trips, tours and long-distance travel." },
              { title: "Party Bus", desc: "Party buses with sound systems and lighting for hen dos, stag dos and birthday celebrations." },
              { title: "Self-Drive Hire", desc: "Hire a minibus and drive it yourself. Flexible and cost-effective for groups up to 16." },
              { title: "Airport Transfers", desc: "Reliable minibus transfers to and from Newcastle, Durham Tees Valley and other airports." },
              { title: "Corporate Travel", desc: "Executive minibus and coach hire for business meetings, conferences and corporate events." },
            ].map((service) => (
              <div key={service.title} className="bg-white border border-border rounded-xl p-6">
                <h3 className="font-semibold text-lg text-text mb-2">{service.title}</h3>
                <p className="text-sm text-text-light leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-surface py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-text mb-4">
              Minibus & Coach Hire Across the North East
            </h2>
            <div className="text-text-light text-sm leading-relaxed space-y-3">
              <p>
                Whether you need a minibus for a night out in Newcastle, a coach
                for a school trip from Durham, or a party bus in Sunderland, our
                directory connects you with the best local operators across the
                North East of England.
              </p>
              <p>
                We list over {totalBusinesses} minibus and coach hire companies
                covering Newcastle upon Tyne, Sunderland, Durham,
                Middlesbrough, Gateshead, Darlington, Hartlepool,
                Northumberland and more. Each listing includes verified contact
                details, Google ratings and opening hours so you can make an
                informed choice.
              </p>
              <p>
                Get free, no-obligation quotes from multiple operators by using
                our quote request form. Simply tell us your journey details and
                we&apos;ll connect you with suitable companies in your area.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to book your minibus?
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Get free quotes from trusted operators in your area. No obligation, no hassle.
          </p>
          <Link
            href="/quote"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </>
  );
}
