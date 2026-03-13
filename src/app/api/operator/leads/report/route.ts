import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { submitLeadReport, REPORT_REASONS, type ReportReason } from "@/lib/lead-report";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { purchaseId, reason, notes } = body;

    if (!purchaseId || !reason) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    if (!(reason in REPORT_REASONS)) {
      return NextResponse.json({ error: "Invalid reason" }, { status: 400 });
    }

    const result = await submitLeadReport(
      purchaseId,
      session.user.email,
      reason as ReportReason,
      notes
    );

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead report error:", error);
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
  }
}
