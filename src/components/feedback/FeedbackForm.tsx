"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send");

      setDone(true);
      form.reset();
    } catch {
      setError("Could not send feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-border rounded-xl p-6 md:p-8">
      <h3 className="text-xl font-bold text-text mb-2">Suggestions & feedback</h3>
      <p className="text-text-light mb-6">
        Tell us what to improve, what feels unclear, or what worked well.
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            required
            placeholder="Your name"
            className="border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Your email"
            className="border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Your feedback"
          className="w-full border border-border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send suggestion"}
        </button>

        {done && <p className="text-green-700 text-sm">Thanks — feedback sent.</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </form>
    </div>
  );
}
