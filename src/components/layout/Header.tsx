import Link from "next/link";
import { getSiteConfig } from "@/lib/siteConfig";

export default function Header() {
  const site = getSiteConfig();

  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {site.logoPrefix}
              </span>
            </div>
            <span className="font-bold text-lg text-text hidden sm:block">
              {site.name}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#browse"
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              Find Operators
            </Link>
            <Link
              href="/guides"
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/about"
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>

          <Link
            href="/get-quotes"
            className="bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Get Quotes For Me
          </Link>
        </div>
      </div>
    </header>
  );
}
