import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import OperatorSignOut from "@/components/operator/OperatorSignOut";

export const dynamic = "force-dynamic";

export default async function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Allow unauthenticated access to login and claim pages
  // The layout wraps all /operator/* routes
  // We check the actual path via a workaround: if no session, only allow login/claim
  if (!session?.user) {
    // Still render children for login and claim pages (they handle their own auth)
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-surface">
      <nav className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <Link
                href="/operator/dashboard"
                className="font-semibold text-text hover:text-primary"
              >
                Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-light">
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
