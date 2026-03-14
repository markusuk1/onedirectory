/**
 * SumUp Checkout API wrapper.
 * Used by both lead purchases (Model A) and credit purchases (Model B).
 *
 * Requires env vars:
 *   SUMUP_API_KEY       — merchant API key
 *   SUMUP_MERCHANT_EMAIL — merchant email registered with SumUp
 *
 * If SUMUP_API_KEY is missing, functions return null (graceful skip).
 */

const SUMUP_BASE = "https://api.sumup.com/v0.1";

interface CreateCheckoutParams {
  amountPence: number;
  currency?: string;
  reference: string;
  description: string;
  redirectUrl: string;
}

interface CheckoutResult {
  checkoutId: string;
  paymentUrl: string;
}

interface VerifyResult {
  status: "PENDING" | "PAID" | "FAILED";
  amount: number;
  reference: string;
}

export async function createCheckout(
  params: CreateCheckoutParams
): Promise<CheckoutResult | null> {
  const apiKey = process.env.SUMUP_API_KEY;
  const merchantEmail = process.env.SUMUP_MERCHANT_EMAIL;

  if (!apiKey || !merchantEmail) {
    console.warn("SumUp API key or merchant email not configured — skipping checkout creation");
    return null;
  }

  const body = {
    checkout_reference: params.reference,
    amount: params.amountPence / 100,
    currency: params.currency || "GBP",
    pay_to_email: merchantEmail,
    description: params.description,
    redirect_url: params.redirectUrl,
  };

  const res = await fetch(`${SUMUP_BASE}/checkouts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`SumUp createCheckout failed (${res.status}):`, text);
    return null;
  }

  const data = await res.json();

  return {
    checkoutId: data.id,
    paymentUrl: `https://pay.sumup.com/b2c/${data.id}`,
  };
}

export async function verifyCheckout(
  checkoutId: string
): Promise<VerifyResult | null> {
  const apiKey = process.env.SUMUP_API_KEY;

  if (!apiKey) {
    console.warn("SumUp API key not configured — skipping verification");
    return null;
  }

  const res = await fetch(`${SUMUP_BASE}/checkouts/${checkoutId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`SumUp verifyCheckout failed (${res.status}):`, text);
    return null;
  }

  const data = await res.json();

  return {
    status: data.status as VerifyResult["status"],
    amount: data.amount,
    reference: data.checkout_reference,
  };
}
