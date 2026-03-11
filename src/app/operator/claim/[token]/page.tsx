import { notFound } from "next/navigation";
import { getClaimByToken } from "@/lib/claim";
import ClaimPageClient from "./ClaimPageClient";

export const dynamic = "force-dynamic";

export default async function ClaimPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const claim = await getClaimByToken(token);

  if (!claim) notFound();

  return (
    <ClaimPageClient
      token={token}
      claim={{
        businessSlug: claim.business_slug,
        product: claim.product,
        site: claim.site,
        status: claim.status,
      }}
    />
  );
}
