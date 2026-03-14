import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";
import { getQuotaStatus, type QuotaStatus } from "@/lib/quota";
import { getPurchasedLeadCount } from "@/lib/lead-report";
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

  // Fetch quota status for each approved claim
  const quotas = new Map<string, QuotaStatus>();
  for (const claim of approvedClaims) {
    const key = `${claim.business_slug}-${claim.product}-${claim.site}`;
    quotas.set(
      key,
      await getQuotaStatus(claim.business_slug, claim.product, claim.site)
    );
  }

  // Fetch purchased lead count (operator-level, not per-business)
  const leadCount = session.user.email
    ? await getPurchasedLeadCount(session.user.email).catch(() => 0)
    : 0;

  return (
    <div>
      <div className="bg-gradient-to-br from-primary-dark via-primary to-primary-light rounded-2xl p-8 mb-8 shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-1">
          Welcome back, {session.user.name}
        </h1>
        <p className="text-white/70">
          Manage your business profiles, configure auto-quotes, and track performance
        </p>
      </div>

      {/* My Purchased Leads — operator-level */}
      {leadCount > 0 && (
        <Link
          href="/operator/leads"
          className="flex items-center justify-between bg-white border border-border rounded-2xl p-5 mb-6 hover:shadow-lg hover:border-primary/20 transition-all duration-200"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent-dark rounded-xl flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-text text-lg">My Purchased Leads</h3>
              <p className="text-sm text-text-light">
                {leadCount} lead{leadCount !== 1 ? "s" : ""} purchased
              </p>
            </div>
          </div>
          <svg className="w-5 h-5 text-text-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {approvedClaims.map(
            (claim: {
              business_slug: string;
              product: string;
              site: string;
              tagline: string | null;
            }) => (
              <div
                key={`${claim.business_slug}-${claim.product}-${claim.site}`}
                className="bg-white border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-200"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-text text-lg capitalize">
                      {claim.business_slug.replace(/-/g, " ")}
                    </h3>
                    <p className="text-sm text-text-light capitalize">
                      {claim.product.replace(/-/g, " ")} &middot; {claim.site}
                    </p>
                    {claim.tagline && (
                      <p className="text-sm text-text-light italic mt-1 truncate">
                        {claim.tagline}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <Link
                    href={`/operator/profile/${claim.business_slug}?product=${claim.product}&site=${claim.site}`}
                    className="flex items-center justify-center gap-1.5 text-sm bg-primary text-white px-3 py-2.5 rounded-xl hover:bg-primary-dark transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Profile
                  </Link>
                  <Link
                    href={`/operator/auto-quotes/${claim.business_slug}?product=${claim.product}&site=${claim.site}`}
                    className="flex items-center justify-center gap-1.5 text-sm bg-surface text-text px-3 py-2.5 rounded-xl hover:bg-surface-dark transition-colors border border-border font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Quotes
                  </Link>
                  <Link
                    href={`/operator/adverts/${claim.business_slug}?product=${claim.product}&site=${claim.site}`}
                    className="flex items-center justify-center gap-1.5 text-sm bg-surface text-text px-3 py-2.5 rounded-xl hover:bg-surface-dark transition-colors border border-border font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Adverts
                  </Link>
                  <Link
                    href={`/operator/metrics/${claim.business_slug}?product=${claim.product}&site=${claim.site}`}
                    className="flex items-center justify-center gap-1.5 text-sm bg-surface text-text px-3 py-2.5 rounded-xl hover:bg-surface-dark transition-colors border border-border font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Metrics
                  </Link>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Free Quotes Bonus — per business */}
      {approvedClaims.map(
        (claim: {
          business_slug: string;
          product: string;
          site: string;
        }) => {
          const key = `${claim.business_slug}-${claim.product}-${claim.site}`;
          const q = quotas.get(key);
          if (!q) return null;
          const pct = q.total > 0 ? Math.min(100, Math.round((q.used / q.total) * 100)) : 0;
          return (
            <div key={`quota-${key}`} className="mt-8 max-w-3xl">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-lg font-bold text-text">
                    Free Quote Allowance
                  </h2>
                  <span className="text-sm font-medium text-text capitalize">
                    {claim.business_slug.replace(/-/g, " ")}
                  </span>
                </div>
                {/* Progress bar */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex-1 h-2.5 bg-green-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        q.remaining === 0 ? "bg-red-400" : "bg-green-500"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-text whitespace-nowrap">
                    {q.used} / {q.total} used
                  </span>
                </div>
                {q.remaining > 0 ? (
                  <p className="text-sm text-green-700 mb-4">
                    <strong>{q.remaining} quotes remaining</strong>
                    {q.purchasedCredits > 0 && (
                      <span className="text-text-light"> ({q.freeTotal - Math.min(q.used, q.freeTotal)} free + {Math.max(0, q.purchasedCredits - Math.max(0, q.used - q.freeTotal))} purchased)</span>
                    )}
                  </p>
                ) : (
                  <p className="text-sm text-amber-600 mb-4">
                    <strong>Free allowance used.</strong> Claim your profile and add our badge to your website to unlock more.
                  </p>
                )}
                <div className="space-y-3">
                  {/* Step 1: Base 5 — always done */}
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-green-100">
                    <span className="shrink-0 w-8 h-8 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">
                      ✓
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">
                        5 free quotes — no sign-up required
                      </p>
                      <p className="text-xs text-text-light">
                        Every business gets their first 5 quotes free automatically
                      </p>
                    </div>
                    <span className="text-green-600 text-xs font-semibold">
                      Earned
                    </span>
                  </div>
                  {/* Step 2: Claim profile */}
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-green-100">
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center ${
                        q.claimed ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {q.claimed ? "✓" : "+5"}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">
                        Claim your business profile
                      </p>
                      <p className="text-xs text-text-light">
                        {q.claimed
                          ? "Profile claimed — 5 bonus quotes earned"
                          : "Verify ownership and get 5 bonus quotes"}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold ${
                        q.claimed ? "text-green-600" : "text-blue-600"
                      }`}
                    >
                      {q.claimed ? "Earned" : "+5 FREE"}
                    </span>
                  </div>
                  {/* Step 3: Add our badge to their website */}
                  <div className="flex items-center gap-3 bg-white rounded-lg p-3 border border-green-100">
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full text-white text-xs font-bold flex items-center justify-center ${
                        q.hasBacklink ? "bg-green-500" : "bg-purple-500"
                      }`}
                    >
                      {q.hasBacklink ? "✓" : "+5"}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-text">
                        Add our badge to your website
                      </p>
                      <p className="text-xs text-text-light">
                        {q.hasBacklink
                          ? "Badge added — 5 bonus quotes earned"
                          : "Add a \"Listed on\" badge to your site and earn 5 more"}
                      </p>
                    </div>
                    {q.hasBacklink ? (
                      <span className="text-green-600 text-xs font-semibold">
                        Earned
                      </span>
                    ) : (
                      <Link
                        href={`/operator/profile/${claim.business_slug}?product=${claim.product}&site=${claim.site}#badge`}
                        className="text-purple-600 text-xs font-semibold hover:underline"
                      >
                        Get Badge
                      </Link>
                    )}
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-green-200">
                  <p className="text-sm text-text">
                    <strong>Up to 15 free quotes</strong> — claim your profile and add our badge to unlock the full allowance
                  </p>
                </div>
              </div>
            </div>
          );
        }
      )}

      {/* How It Works guide */}
      <div className="mt-10 max-w-3xl">
        <h2 className="text-xl font-bold text-text mb-4">
          How Our Quote System Works
        </h2>
        <div className="bg-white border border-border rounded-2xl shadow-sm divide-y divide-border">
          <div className="p-5">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                1
              </span>
              <div>
                <h3 className="font-semibold text-text mb-1">
                  Customers request quotes through our site
                </h3>
                <p className="text-sm text-text-light leading-relaxed">
                  Local customers searching for services in your area submit
                  their job details. We send you the job requirements — the
                  customer&apos;s contact info stays private until they accept a
                  quote.
                </p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                2
              </span>
              <div>
                <h3 className="font-semibold text-text mb-1">
                  You set your prices — we present them to the customer
                </h3>
                <p className="text-sm text-text-light leading-relaxed">
                  Configure auto-quotes to respond instantly, or reply manually.
                  Your quote goes directly to the customer alongside other local
                  operators. You set the price — we never change it.
                </p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                3
              </span>
              <div>
                <h3 className="font-semibold text-text mb-1">
                  Completely free to use
                </h3>
                <p className="text-sm text-text-light leading-relaxed">
                  Every business automatically gets 5 free quotes with no
                  sign-up or card required. Claim your profile for 5 more, and
                  add our badge to your website for another 5 — up to 15 free.
                  We&apos;re growing the platform and want to help operators win
                  more business.
                </p>
              </div>
            </div>
          </div>
          <div className="p-5">
            <div className="flex items-start gap-3">
              <span className="shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                ✓
              </span>
              <div>
                <h3 className="font-semibold text-text mb-1">
                  The customer contacts you directly
                </h3>
                <p className="text-sm text-text-light leading-relaxed">
                  If the customer likes your quote, they get in touch with you
                  directly. You deal with them on your own terms — we just make
                  the introduction.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-xl font-bold text-text mt-8 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          <details className="bg-white border border-border rounded-2xl shadow-sm group">
            <summary className="p-4 cursor-pointer font-medium text-text hover:text-primary transition-colors">
              Is there any cost to claim my business profile?
            </summary>
            <p className="px-4 pb-4 text-sm text-text-light leading-relaxed">
              No. Claiming and managing your business profile is completely
              free. You can update your logo, description, contact details, and
              opening hours at no charge. Plus, claiming your profile earns you
              5 bonus free quotes.
            </p>
          </details>
          <details className="bg-white border border-border rounded-2xl shadow-sm group">
            <summary className="p-4 cursor-pointer font-medium text-text hover:text-primary transition-colors">
              How many free quotes do I get?
            </summary>
            <p className="px-4 pb-4 text-sm text-text-light leading-relaxed">
              Every business automatically gets 5 free quotes — no sign-up or
              payment card needed. We track this for you behind the scenes.
              Claim your business profile to earn 5 more, and add our badge to
              your website for another 5 — up to 15 free quotes in total.
            </p>
          </details>
          <details className="bg-white border border-border rounded-2xl shadow-sm group">
            <summary className="p-4 cursor-pointer font-medium text-text hover:text-primary transition-colors">
              Is there a cost to receive quotes?
            </summary>
            <p className="px-4 pb-4 text-sm text-text-light leading-relaxed">
              No — auto-quotes are completely free. We&apos;re growing the
              platform and want to help operators win more business at no cost.
            </p>
          </details>
          <details className="bg-white border border-border rounded-2xl shadow-sm group">
            <summary className="p-4 cursor-pointer font-medium text-text hover:text-primary transition-colors">
              How do auto-quotes work?
            </summary>
            <p className="px-4 pb-4 text-sm text-text-light leading-relaxed">
              You set your pricing rules (e.g. base rate, per-mile charge,
              minimum fee) and we automatically generate quotes on your behalf
              when a matching job comes in. This means you never miss a lead,
              even outside business hours.
            </p>
          </details>
          <details className="bg-white border border-border rounded-2xl shadow-sm group">
            <summary className="p-4 cursor-pointer font-medium text-text hover:text-primary transition-colors">
              Can I advertise my business on the site?
            </summary>
            <p className="px-4 pb-4 text-sm text-text-light leading-relaxed">
              Yes. Once your profile is claimed, you can upload banner adverts
              that appear on landing pages and alongside competitor listings.
              Visit the Adverts section in your dashboard to get started.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
