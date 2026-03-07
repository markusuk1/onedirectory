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
