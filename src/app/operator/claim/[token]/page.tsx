"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface ClaimInfo {
  businessSlug: string;
  product: string;
  site: string;
  status: string;
}

export default function ClaimPage() {
  const { token } = useParams<{ token: string }>();
  const router = useRouter();
  const [claim, setClaim] = useState<ClaimInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(`/api/operator/claim?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setClaim(data);
          if (data.status === "approved") {
            setError("This profile has already been claimed.");
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to validate claim token");
        setLoading(false);
      });
  }, [token]);

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

    // Auto sign-in
    const signInResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (signInResult?.ok) {
      router.push("/operator/dashboard");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-text-light">Validating claim...</p>
      </div>
    );
  }

  if (error && !claim) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-border rounded-xl p-8 max-w-md text-center">
          <h1 className="text-xl font-bold text-text mb-2">
            Invalid Claim Link
          </h1>
          <p className="text-text-light">{error}</p>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white border border-border rounded-xl p-8 max-w-md text-center">
          <div className="text-green-500 text-4xl mb-4">&#10003;</div>
          <h1 className="text-xl font-bold text-text mb-2">
            Profile Claimed!
          </h1>
          <p className="text-text-light">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const businessName = claim?.businessSlug.replace(/-/g, " ") || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="bg-white border border-border rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-text mb-2">
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
