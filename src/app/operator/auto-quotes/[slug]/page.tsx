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

  // Get current auto-quote config
  const configResult = await pool.query(
    `SELECT enabled, config FROM auto_quote_configs
     WHERE business_slug = $1 AND product = $2 AND site = $3`,
    [slug, product, site]
  );

  const existing = configResult.rows[0] || { enabled: false, config: {} };
  const businessName = slug.replace(/-/g, " ");

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-text-light mb-6">
        <Link href="/operator/dashboard" className="hover:text-primary">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-text font-medium capitalize">{businessName}</span>
        <span>/</span>
        <span className="text-text font-medium">Auto-Quotes</span>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 md:p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-text mb-1 capitalize">
          Auto-Quote Configuration
        </h1>
        <p className="text-text-light mb-6 capitalize">
          {businessName} &middot; {product.replace(/-/g, " ")}
        </p>

        {/* How it works callout */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-text text-sm mb-2">
            How auto-quotes earn you money
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
              If the customer accepts your quote and pays, you get the job
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">•</span>
              <strong>Your first 5 quotes are free</strong> — no sign-up
              needed. Earn up to 15 by claiming your profile and adding our
              badge to your website
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary font-bold mt-0.5">•</span>
              After your free allowance, our small service fee applies only on
              accepted quotes — you never pay for leads that don&apos;t convert
            </li>
          </ul>
          <p className="text-xs text-text-light mt-3">
            You receive exactly what you quote. Our fee is added on top and paid
            by the customer — it never comes out of your pocket.
          </p>
        </div>

        <AutoQuoteConfig
          slug={slug}
          product={product}
          site={site}
          initialEnabled={existing.enabled}
          initialConfig={existing.config}
        />
      </div>
    </div>
  );
}
