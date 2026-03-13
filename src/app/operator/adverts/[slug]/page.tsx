import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";
import Link from "next/link";
import AdvertForm from "@/components/operator/AdvertForm";

export default async function AdvertsPage({
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
        <Link
          href="/operator/dashboard"
          className="text-primary hover:underline mt-4 inline-block"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  // Get existing adverts
  const advertsResult = await pool.query(
    `SELECT id, image_urls, link_url, alt_text, placement, status, start_date, end_date
     FROM adverts
     WHERE business_slug = $1 AND product = $2 AND site = $3
     ORDER BY placement`,
    [slug, product, site]
  );

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
        <span className="text-text font-medium">Adverts</span>
      </div>

      <div className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl px-6 py-5 mb-6 shadow-sm">
        <h1 className="text-xl font-bold text-white capitalize">
          {businessName}
        </h1>
        <p className="text-white/70 text-sm capitalize">
          {product.replace(/-/g, " ")} &middot; {site}
        </p>
      </div>

      <AdvertForm
        slug={slug}
        product={product}
        site={site}
        adverts={advertsResult.rows}
      />
    </div>
  );
}
