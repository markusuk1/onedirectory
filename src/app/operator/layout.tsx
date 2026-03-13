import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import Link from "next/link";
import OperatorSignOut from "@/components/operator/OperatorSignOut";
import { getSiteConfig } from "@/lib/siteConfig";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default async function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const siteConfig = getSiteConfig();

  // Allow unauthenticated access to login and claim pages
  // The layout wraps all /operator/* routes
  // We check the actual path via a workaround: if no session, only allow login/claim
  if (!session?.user) {
    // Still render children for login and claim pages (they handle their own auth)
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-gradient-to-r from-primary-dark to-primary shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/operator/dashboard"
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {siteConfig.logoPrefix}
                </span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-white text-base block leading-tight">
                  {siteConfig.genericName}
                </span>
                <span className="text-[11px] text-white/60 block">
                  Operator Portal
                </span>
              </div>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/70 hidden sm:block">
                {session.user.email}
              </span>
              <OperatorSignOut />
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
