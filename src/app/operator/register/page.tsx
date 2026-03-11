import Link from "next/link";

export default function OperatorRegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface px-4">
      <div className="bg-white border border-border rounded-xl p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-text mb-3">
          Register or Claim Your Business Profile
        </h1>
        <p className="text-text-light leading-relaxed mb-6">
          Operator accounts are normally created from a claim invitation. If
          you have received a claim link, open that link to finish setup. If
          you already have an account, sign in below. If you want to advertise
          or claim a profile and do not yet have an invitation, contact us and
          we will verify your business first.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/operator/login"
            className="bg-primary text-white font-semibold px-4 py-3 rounded-lg text-center hover:bg-primary-dark transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/contact"
            className="bg-surface border border-border text-text font-semibold px-4 py-3 rounded-lg text-center hover:bg-surface/70 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            href="/"
            className="bg-surface border border-border text-text font-semibold px-4 py-3 rounded-lg text-center hover:bg-surface/70 transition-colors"
          >
            Back to Site
          </Link>
        </div>
      </div>
    </div>
  );
}
