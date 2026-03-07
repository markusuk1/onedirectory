"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface Props {
  slug: string;
  product: string;
  site: string;
  currentUrl: string;
  onUploaded: (url: string) => void;
}

export default function LogoUpload({
  slug,
  product,
  site,
  currentUrl,
  onUploaded,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be under 2MB");
      return;
    }

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", slug);
    formData.append("product", product);
    formData.append("site", site);

    const res = await fetch("/api/operator/logo", {
      method: "POST",
      body: formData,
    });

    setUploading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Upload failed");
    } else {
      const data = await res.json();
      onUploaded(data.url);
    }

    // Reset input
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      {currentUrl ? (
        <Image
          src={currentUrl}
          alt="Business logo"
          width={80}
          height={80}
          className="rounded-lg object-cover border border-border"
        />
      ) : (
        <div className="w-20 h-20 bg-surface border border-border rounded-lg flex items-center justify-center text-text-light text-xs">
          No logo
        </div>
      )}

      <div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFile}
          className="hidden"
          id="logo-upload"
        />
        <label
          htmlFor="logo-upload"
          className={`inline-block text-sm px-4 py-2 rounded-lg border border-border cursor-pointer transition-colors ${
            uploading
              ? "bg-surface text-text-light"
              : "bg-white text-text hover:bg-surface"
          }`}
        >
          {uploading ? "Uploading..." : currentUrl ? "Change Logo" : "Upload Logo"}
        </label>
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        <p className="text-xs text-text-light mt-1">
          Max 2MB. PNG, JPG or SVG.
        </p>
      </div>
    </div>
  );
}
