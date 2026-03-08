import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { initOperatorTables } from "@/lib/db-schema";
import Link from "next/link";
import ProfileForm from "@/components/operator/ProfileForm";
import BadgeEmbed from "@/components/operator/BadgeEmbed";
import { PRODUCT_CONFIGS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import { getAllBusinesses } from "@/lib/data";
import { getSiteConfig } from "@/lib/siteConfig";

export default async function EditProfilePage({
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
          You don&apos;t have permission to edit this profile.
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

  // Get current profile overrides
  const profileResult = await pool.query(
    `SELECT description, phone, email, website, logo_url, tagline, services, backlink_added
     FROM operator_profiles
     WHERE business_slug = $1 AND product = $2 AND site = $3`,
    [slug, product, site]
  );

  const profile = profileResult.rows[0] || null;
  const siteConfig = getSiteConfig();

  // Get base business data from JSON
  const allBusinesses = getAllBusinesses(product as ProductId);
  const baseBusiness = allBusinesses.find((b) => b.slug === slug) || null;

  // Get available services for this product
  const productConfig = PRODUCT_CONFIGS[product as ProductId];
  const availableServices = productConfig
    ? productConfig.services.map((s) => s.title)
    : [];

  const businessName = baseBusiness?.name || slug.replace(/-/g, " ");

  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-text-light mb-6">
        <Link href="/operator/dashboard" className="hover:text-primary">
          Dashboard
        </Link>
        <span>/</span>
        <span className="text-text font-medium capitalize">{businessName}</span>
      </div>

      <div className="bg-white border border-border rounded-xl p-6 md:p-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-text mb-1 capitalize">
          {businessName}
        </h1>
        <p className="text-text-light mb-6 capitalize">
          {product.replace(/-/g, " ")} &middot; {site}
        </p>

        <ProfileForm
          slug={slug}
          product={product}
          site={site}
          profile={profile}
          availableServices={availableServices}
          baseData={baseBusiness ? {
            description: baseBusiness.description,
            phone: baseBusiness.phone,
            email: baseBusiness.email,
            website: baseBusiness.website,
            services: baseBusiness.services,
          } : null}
        />
      </div>

      {/* Badge / Backlink section */}
      <div
        id="badge"
        className="bg-white border border-border rounded-xl p-6 md:p-8 max-w-2xl mt-6"
      >
        <h2 className="text-xl font-bold text-text mb-1">
          Add Our Badge to Your Website
        </h2>
        <p className="text-text-light text-sm mb-5">
          Display a &quot;Listed on {siteConfig.genericName}&quot; badge on your
          website and earn <strong>5 bonus free quotes</strong>. It takes 2
          minutes and works on any website platform.
        </p>
        <BadgeEmbed
          slug={slug}
          product={product}
          site={site}
          domain={siteConfig.domain}
          siteName={siteConfig.genericName}
          backlinkAdded={profile?.backlink_added === true}
        />
      </div>
    </div>
  );
}
