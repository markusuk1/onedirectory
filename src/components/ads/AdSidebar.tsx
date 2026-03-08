"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface AdData {
  businessSlug: string;
  businessName: string;
  imageUrls: string[];
  linkUrl: string | null;
  altText: string | null;
}

interface Props {
  site: string;
  product: string;
  excludeSlug?: string;
}

export default function AdSidebar({ site, product, excludeSlug }: Props) {
  const [ads, setAds] = useState<AdData[]>([]);
  const [currentAd, setCurrentAd] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({
      site,
      placement: "business_sidebar",
      product,
    });

    fetch(`/api/adverts?${params}`)
      .then((r) => r.json())
      .then((data) => {
        const filtered = (data.adverts || []).filter(
          (a: AdData) => a.businessSlug !== excludeSlug
        );
        if (filtered.length > 0) setAds(filtered);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [site, product, excludeSlug]);

  // Image rotation (5s)
  useEffect(() => {
    if (ads.length === 0) return;
    const ad = ads[currentAd];
    if (!ad || ad.imageUrls.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % ad.imageUrls.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [ads, currentAd]);

  // Ad rotation (15s)
  useEffect(() => {
    if (ads.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
      setCurrentImage(0);
    }, 15000);

    return () => clearInterval(timer);
  }, [ads.length]);

  // Show house ad if no paid ads
  if (loaded && ads.length === 0) {
    return (
      <a
        href="/operator/register"
        className="block rounded-xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary to-blue-700 hover:shadow-md transition-shadow"
      >
        <div className="px-4 py-6 text-center">
          <p className="text-blue-200 text-[10px] font-semibold uppercase tracking-wider mb-2">
            Advertise Here
          </p>
          <h3 className="text-white text-base font-bold mb-1.5">
            Is this your business?
          </h3>
          <p className="text-blue-100 text-xs leading-relaxed mb-3">
            Claim your free profile and promote your services to local customers.
          </p>
          <span className="inline-block bg-accent text-white font-semibold text-xs px-4 py-2 rounded-lg">
            Claim Profile
          </span>
        </div>
      </a>
    );
  }

  if (!loaded) return null;

  const ad = ads[currentAd];
  if (!ad || ad.imageUrls.length === 0) return null;

  const content = (
    <div className="bg-white border border-border rounded-xl overflow-hidden">
      {/* Sponsored label */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <span className="text-[10px] font-medium text-text-light/70">Sponsored</span>
        {ads.length > 1 && (
          <span className="text-[10px] text-text-light">
            {currentAd + 1}/{ads.length}
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative w-full h-40 mx-4 mt-2" style={{ width: "calc(100% - 2rem)" }}>
        {ad.imageUrls.map((url, i) => (
          <Image
            key={url}
            src={url}
            alt={ad.altText || `${ad.businessName} advert`}
            fill
            className={`object-cover rounded-lg transition-opacity duration-700 ${
              i === currentImage ? "opacity-100" : "opacity-0"
            }`}
            sizes="400px"
          />
        ))}
      </div>

      {/* Info */}
      <div className="px-4 py-3">
        <p className="text-sm font-medium text-text capitalize">{ad.businessName}</p>
        {ad.imageUrls.length > 1 && (
          <div className="flex gap-1.5 mt-2">
            {ad.imageUrls.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  i === currentImage ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (ad.linkUrl) {
    return (
      <a
        href={ad.linkUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="block hover:shadow-md transition-shadow rounded-xl"
      >
        {content}
      </a>
    );
  }

  return content;
}
