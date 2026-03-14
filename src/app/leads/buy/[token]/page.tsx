import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * Buy page now redirects to reveal page — leads are free while we build trust.
 * Payment infrastructure kept in lib/lead-buy.ts for future re-enablement.
 */
export default async function BuyLeadPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ op?: string }>;
}) {
  const { token } = await params;
  const { op } = await searchParams;

  redirect(`/leads/reveal/${token}${op ? `?op=${op}` : ""}`);
}
