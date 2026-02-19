import Link from "next/link";
import { getLocations } from "@/lib/data";
import { getSiteConfig } from "@/lib/siteConfig";

export default function Footer() {
  const locations = getLocations();
  const site = getSiteConfig();

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{site.name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {site.footerDescription}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Locations</h3>
            <ul className="grid grid-cols-2 gap-1">
              {locations.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/${loc.slug}`}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/get-quotes"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Get Quotes For Me
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Quick Quote
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  Find Operators
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
