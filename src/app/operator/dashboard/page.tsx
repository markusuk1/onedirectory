import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";
import Link from "next/link";

export default async function OperatorDashboard() {
  const session = await auth();
  if (!session?.user) redirect("/operator/login");

  await initOperatorTables();

  // Get claimed businesses for this operator
  const claims = await pool.query(
    `SELECT oc.business_slug, oc.product, oc.site, oc.status, oc.created_at,
            op.logo_url, op.tagline
     FROM operator_claims oc
     LEFT JOIN operator_profiles op ON op.business_slug = oc.business_slug
       AND op.product = oc.product AND op.site = oc.site
     WHERE oc.operator_id = $1
     ORDER BY oc.created_at DESC`,
    [session.user.id]
  );

  const approvedClaims = claims.rows.filter(
    (c: { status: string }) => c.status === "approved"
  );
  const pendingClaims = claims.rows.filter(
    (c: { status: string }) => c.status === "pending"
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-text mb-6">
        Welcome, {session.user.name}
      </h1>

      {pendingClaims.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
          <p className="text-yellow-800 font-medium">
            You have {pendingClaims.length} pending claim
            {pendingClaims.length > 1 ? "s" : ""} awaiting approval.
          </p>
        </div>
      )}

      {approvedClaims.length === 0 && pendingClaims.length === 0 && (
        <div className="bg-white border border-border rounded-xl p-8 text-center">
          <p className="text-text-light">
            You haven&apos;t claimed any business profiles yet.
          </p>
        </div>
      )}

      {approvedClaims.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {approvedClaims.map(
            (claim: {
              business_slug: string;
              product: string;
              site: string;
              tagline: string | null;
            }) => (
              <div
                key={`${claim.business_slug}-${claim.product}-${claim.site}`}
                className="bg-white border border-border rounded-xl p-6"
              >
                <h3 className="font-semibold text-text mb-1">
                  {claim.business_slug.replace(/-/g, " ")}
                </h3>
                <p className="text-sm text-text-light mb-1 capitalize">
                  {claim.product.replace(/-/g, " ")} &middot; {claim.site}
                </p>
                {claim.tagline && (
                  <p className="text-sm text-text-light italic mb-3">
                    {claim.tagline}
                  </p>
                )}
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/operator/profile/${claim.business_slug}?product=${claim.product}&site=${claim.site}`}
                    className="text-sm bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Edit Profile
                  </Link>
                  <Link
                    href={`/operator/auto-quotes/${claim.business_slug}?product=${claim.product}&site=${claim.site}`}
                    className="text-sm bg-surface text-text px-3 py-1.5 rounded-lg hover:bg-surface-dark transition-colors border border-border"
                  >
                    Auto-Quotes
                  </Link>
                  <Link
                    href={`/operator/adverts/${claim.business_slug}?product=${claim.product}&site=${claim.site}`}
                    className="text-sm bg-surface text-text px-3 py-1.5 rounded-lg hover:bg-surface-dark transition-colors border border-border"
                  >
                    Adverts
                  </Link>
                  <Link
                    href={`/operator/metrics/${claim.business_slug}?product=${claim.product}&site=${claim.site}`}
                    className="text-sm bg-surface text-text px-3 py-1.5 rounded-lg hover:bg-surface-dark transition-colors border border-border"
                  >
                    Metrics
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
