"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface Props {
  slug: string;
  product: string;
  site: string;
  placement: string;
  currentUrls: string[];
  onUploaded: (urls: string[]) => void;
}

export default function AdvertImageUpload({
  slug,
  product,
  site,
  placement,
  currentUrls,
  onUploaded,
}: Props) {
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null, null]);

  // Pad to 4 slots
  const urls = [...currentUrls];
  while (urls.length < 4) urls.push("");

  async function handleFile(position: number, e: React.ChangeEvent<HTMLInputElement>) {
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

    setUploading(position);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", slug);
    formData.append("product", product);
    formData.append("site", site);
    formData.append("placement", placement);
    formData.append("position", String(position));

    const res = await fetch("/api/operator/advert-images", {
      method: "POST",
      body: formData,
    });

    setUploading(null);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Upload failed");
    } else {
      const data = await res.json();
      const newUrls = [...urls];
      newUrls[data.position] = data.url;
      onUploaded(newUrls);
    }

    // Reset input
    const ref = inputRefs.current[position];
    if (ref) ref.value = "";
  }

  function handleRemove(position: number) {
    const newUrls = [...urls];
    newUrls[position] = "";
    onUploaded(newUrls);
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {urls.map((url, i) => (
          <div key={i} className="relative">
            {url ? (
              <div className="relative group">
                <Image
                  src={url}
                  alt={`Ad image ${i + 1}`}
                  width={280}
                  height={160}
                  className="rounded-lg object-cover border border-border w-full h-32"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(i)}
                  className="absolute top-1.5 right-1.5 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  x
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => inputRefs.current[i]?.click()}
                disabled={uploading !== null}
                className="w-full h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center text-text-light hover:border-primary hover:text-primary transition-colors disabled:opacity-50"
              >
                {uploading === i ? (
                  <span className="text-sm">Uploading...</span>
                ) : (
                  <>
                    <svg className="w-8 h-8 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="text-xs">Image {i + 1}</span>
                  </>
                )}
              </button>
            )}
            <input
              ref={(el) => { inputRefs.current[i] = el; }}
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(i, e)}
              className="hidden"
            />
          </div>
        ))}
      </div>
      {error && <p className="text-red-600 text-xs mt-2">{error}</p>}
      <p className="text-xs text-text-light mt-2">
        Upload up to 4 images. Max 2MB each. PNG, JPG or WebP.
      </p>
    </div>
  );
}
