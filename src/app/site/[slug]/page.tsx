import { notFound } from "next/navigation";
import { getHostedSite, getSiteConfig } from "@/lib/siteConfig";
import { getAllBusinesses } from "@/lib/data";
import type { ProductId } from "@/lib/productConfig";
import ManagedQuoteForm from "@/components/quote/ManagedQuoteForm";

export default async function SitePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hosted = getHostedSite(slug);
  if (!hosted) notFound();

  const businesses = getAllBusinesses(hosted.product as ProductId);
  const business = businesses.find((b) => b.slug === hosted.businessSlug);
  if (!business) notFound();

  const site = getSiteConfig();

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary-dark text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {business.name}
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Reliable minibus hire across {business.locationName} and the wider{" "}
            {site.region}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#quote"
              className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              Get a Free Quote
            </a>
            <a
              href={`tel:${business.internationalMobilePhone || business.internationalLandlinePhone || business.internationalPhone || business.mobilePhone || business.landlinePhone || business.phone || ""}`}
              className="inline-block bg-white/15 hover:bg-white/25 text-white font-semibold px-8 py-3.5 rounded-lg text-lg transition-colors"
            >
              Call {business.mobilePhone || business.landlinePhone || business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      {business.description && (
        <section className="py-12 md:py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-text mb-4">About Us</h2>
            <p className="text-text-light leading-relaxed text-lg">
              {business.description}
            </p>
          </div>
        </section>
      )}

      {/* Services */}
      {business.services.length > 0 && (
        <section className="bg-surface py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">
              Our Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {business.services.map((service) => (
                <div
                  key={service}
                  className="bg-white rounded-xl p-6 border border-border"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-text">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Vehicles */}
      {business.vehicles.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-text mb-8 text-center">
              Our Fleet
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              {business.vehicles.map((vehicle) => (
                <div
                  key={vehicle}
                  className="bg-surface rounded-xl px-6 py-4 border border-border"
                >
                  <span className="font-medium text-text">{vehicle}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact */}
      <section className="bg-surface py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-text mb-8 text-center">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {(business.mobilePhone || business.landlinePhone || business.phone) && (
              <a
                href={`tel:${business.internationalMobilePhone || business.internationalLandlinePhone || business.internationalPhone || business.mobilePhone || business.landlinePhone || business.phone}`}
                className="bg-white rounded-xl p-6 border border-border text-center hover:border-primary transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="font-semibold text-text">
                  {business.landlinePhone ? <p>Landline: {business.landlinePhone}</p> : null}
                  {business.mobilePhone ? <p>Mobile: {business.mobilePhone}</p> : null}
                  {!business.landlinePhone && !business.mobilePhone ? <p>{business.phone}</p> : null}
                </div>
                <p className="text-sm text-text-light mt-1">Call us</p>
              </a>
            )}
            {business.email && (
              <a
                href={`mailto:${business.email}`}
                className="bg-white rounded-xl p-6 border border-border text-center hover:border-primary transition-colors"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="font-semibold text-text">{business.email}</p>
                <p className="text-sm text-text-light mt-1">Email us</p>
              </a>
            )}
            <div className="bg-white rounded-xl p-6 border border-border text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="font-semibold text-text">
                {business.locationName}
              </p>
              <p className="text-sm text-text-light mt-1">Service area</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote" className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-text mb-2 text-center">
            Get a Free Quote
          </h2>
          <p className="text-text-light text-center mb-8">
            Tell us what you need and we&apos;ll get back to you with a price.
          </p>
          <ManagedQuoteForm productId={hosted.product as ProductId} />
        </div>
      </section>
    </>
  );
}
