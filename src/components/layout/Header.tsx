import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NE</span>
            </div>
            <span className="font-bold text-lg text-text hidden sm:block">
              Minibus Hire North East
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
              href="/search"
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              Find Operators
            </Link>
            <Link
              href="/about"
              className="text-sm text-text-light hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>

          <Link
            href="/quote"
            className="bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </header>
  );
}
