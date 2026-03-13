import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getPurchasedLeads } from "@/lib/lead-report";
import PurchasedLeads from "@/components/operator/PurchasedLeads";

export const dynamic = "force-dynamic";

export default async function PurchasedLeadsPage() {
  const session = await auth();
  if (!session?.user?.email) redirect("/operator/login");

  const leads = await getPurchasedLeads(session.user.email);

  return (
    <div>
      <div className="flex items-center gap-1.5 text-sm text-text-light mb-6">
        <Link href="/operator/dashboard" className="hover:text-primary transition-colors">
          Dashboard
        </Link>
        <svg className="w-4 h-4 text-text-light/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-text font-medium">My Leads</span>
      </div>

      <div className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl px-6 py-5 mb-6 shadow-sm">
        <h1 className="text-xl font-bold text-white">My Purchased Leads</h1>
        <p className="text-white/70 text-sm">
          {leads.length} lead{leads.length !== 1 ? "s" : ""} purchased
        </p>
      </div>

      <PurchasedLeads leads={leads} />
    </div>
  );
}
