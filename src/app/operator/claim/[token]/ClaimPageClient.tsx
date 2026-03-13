"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface ClaimInfo {
  businessSlug: string;
  product: string;
  site: string;
  status: string;
}

export default function ClaimPageClient({
  token,
  claim,
}: {
  token: string;
  claim: ClaimInfo;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const res = await fetch("/api/operator/claim", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "complete",
        token,
        name,
        email,
        password,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Failed to complete claim");
      setSubmitting(false);
      return;
    }

    setDone(true);

    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.ok) {
      router.push("/operator/dashboard");
      return;
    }

    setSubmitting(false);
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-border rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-text mb-2">
            Profile Claimed
          </h1>
          <p className="text-text-light">
            Your account has been created. If you are not redirected
            automatically, you can sign in below.
          </p>
          <Link
            href="/operator/login"
            className="inline-flex mt-5 bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (claim.status === "approved") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-border rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-text mb-2">
            Profile Already Claimed
          </h1>
          <p className="text-text-light">
            This claim link has already been used. Sign in to manage the
            profile, or contact us if you need help accessing the account.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-5">
            <Link
              href="/operator/login"
              className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/contact"
              className="bg-surface border border-border text-text font-semibold px-5 py-2.5 rounded-lg hover:bg-surface/70 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const businessName = claim.businessSlug.replace(/-/g, " ");

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="bg-white border border-border rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-text mb-2 text-center">
          Claim Your Profile
        </h1>
        <p className="text-text-light mb-6">
          Set up your account to manage{" "}
          <strong className="text-text capitalize">{businessName}</strong>
        </p>

        {error && (
          <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-text mb-1"
            >
              Your Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="John Smith"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-text mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="you@company.co.uk"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-text mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              placeholder="At least 8 characters"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
          >
            {submitting ? "Creating Account..." : "Claim Profile & Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
