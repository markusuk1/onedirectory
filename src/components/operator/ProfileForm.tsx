"use client";

import { useState } from "react";
import LogoUpload from "./LogoUpload";

interface ProfileData {
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  logo_url: string | null;
  tagline: string | null;
  services: string[] | null;
}

interface BaseData {
  description: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  services: string[];
}

interface Props {
  slug: string;
  product: string;
  site: string;
  profile: ProfileData | null;
  availableServices: string[];
  baseData: BaseData | null;
}

export default function ProfileForm({
  slug,
  product,
  site,
  profile,
  availableServices,
  baseData,
}: Props) {
  const [tagline, setTagline] = useState(profile?.tagline || "");
  const [description, setDescription] = useState(profile?.description || baseData?.description || "");
  const [phone, setPhone] = useState(profile?.phone || baseData?.phone || "");
  const [email, setEmail] = useState(profile?.email || baseData?.email || "");
  const [website, setWebsite] = useState(profile?.website || baseData?.website || "");
  const [services, setServices] = useState<string[]>(
    profile?.services || baseData?.services || []
  );
  const [logoUrl, setLogoUrl] = useState(profile?.logo_url || "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    setError("");

    const res = await fetch("/api/operator/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        product,
        site,
        tagline: tagline || null,
        description: description || null,
        phone: phone || null,
        email: email || null,
        website: website || null,
        services: services.length > 0 ? services : null,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to save");
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  }

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Logo */}
      <div>
        <label className="block text-sm font-medium text-text mb-2">
          Business Logo
        </label>
        <LogoUpload
          slug={slug}
          product={product}
          site={site}
          currentUrl={logoUrl}
          onUploaded={setLogoUrl}
        />
      </div>

      {/* Tagline */}
      <div>
        <label
          htmlFor="tagline"
          className="block text-sm font-medium text-text mb-1"
        >
          Tagline
        </label>
        <input
          id="tagline"
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          maxLength={255}
          className="w-full border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="e.g. Your trusted local minibus hire company"
        />
        <p className="text-xs text-text-light mt-1">
          Short tagline shown below your business name
        </p>
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-text mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="Tell customers about your business..."
        />
      </div>

      {/* Contact details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-text mb-1"
          >
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="01onal 234 5678"
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            placeholder="info@company.co.uk"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="website"
          className="block text-sm font-medium text-text mb-1"
        >
          Website
        </label>
        <input
          id="website"
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full border border-border rounded-lg px-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          placeholder="https://www.company.co.uk"
        />
      </div>

      {/* Services */}
      {availableServices.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-text mb-2">
            Services Offered
          </label>
          <div className="flex flex-wrap gap-2">
            {availableServices.map((service) => (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${
                  services.includes(service)
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-text border-border hover:border-primary"
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Save */}
      {error && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {saved && (
        <div className="bg-green-50 text-green-700 text-sm px-4 py-3 rounded-lg">
          Profile saved successfully
        </div>
      )}

      <button
        type="submit"
        disabled={saving}
        className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save Profile"}
      </button>
    </form>
  );
}
