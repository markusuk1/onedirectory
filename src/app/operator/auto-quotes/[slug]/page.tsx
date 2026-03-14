import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";
import Link from "next/link";
import AutoQuoteConfig from "@/components/operator/AutoQuoteConfig";

export default async function AutoQuotesPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ product?: string; site?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/operator/login");

  const { slug } = await params;
  const { product = "minibus-hire", site = "northeast" } = await searchParams;

  await initOperatorTables();

  // Verify ownership
  const claim = await pool.query(
    `SELECT id FROM operator_claims
     WHERE operator_id = $1 AND business_slug = $2 AND product = $3 AND site = $4 AND status = 'approved'`,
    [session.user.id, slug, product, site]
  );

  if (claim.rows.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-xl font-bold text-text mb-2">Access Denied</h1>
        <p className="text-text-light">
          You don&apos;t have permission to configure auto-quotes for this business.
        </p>
        <Link
          href="/operator/dashboard"
          className="text-primary hover:underline mt-4 inline-block"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Get current auto-quote config and operator services
  const configResult = await pool.query(
    `SELECT aqc.enabled, aqc.config, opr.services
     FROM auto_quote_configs aqc
     LEFT JOIN operator_profiles opr ON opr.business_slug = aqc.business_slug
       AND opr.product = aqc.product AND opr.site = aqc.site
     WHERE aqc.business_slug = $1 AND aqc.product = $2 AND aqc.site = $3`,
    [slug, product, site]
  );

  const existing = configResult.rows[0] || { enabled: false, config: {}, services: null };
  const businessName = slug.replace(/-/g, " ");

  return (
    <div>
      <div className="flex items-center gap-1.5 text-sm text-text-light mb-6">
        <Link href="/operator/dashboard" className="hover:text-primary transition-colors">
          Dashboard
        </Link>
        <svg className="w-4 h-4 text-text-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        <span className="text-text font-medium capitalize">{businessName}</span>
        <svg className="w-4 h-4 text-text-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        <span className="text-text font-medium">Auto-Quotes</span>
      </div>

      <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden max-w-2xl">
        <div className="bg-gradient-to-r from-primary-dark to-primary px-6 md:px-8 py-5">
          <h1 className="text-xl font-bold text-white capitalize">
            Auto-Quote Configuration
          </h1>
          <p className="text-white/70 text-sm capitalize">
            {businessName} &middot; {product.replace(/-/g, " ")}
          </p>
        </div>
        <div className="p-6 md:p-8">

        {/* How it works callout */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-text text-sm mb-2">
            How auto-quotes work
          </h3>
          <ul className="text-sm text-text-light space-y-1.5">
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">•</span>
              Customers in your area submit a quote request through our site
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">•</span>
              Your auto-quote responds instantly — even outside business hours
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">•</span>
              If the customer likes your quote, they contact you directly
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">•</span>
              <strong>Completely free to use</strong> — we&apos;re building the
              UK&apos;s best hire directory and want great operators like you on board
            </li>
          </ul>
        </div>

        <AutoQuoteConfig
          slug={slug}
          product={product}
          site={site}
          initialEnabled={existing.enabled}
          initialConfig={existing.config}
          initialServices={existing.services || []}
        />
        </div>
      </div>
    </div>
  );
}
