"use client";

import { useState, useEffect, useCallback } from "react";
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
  placement: string;
  product?: string;
}

export default function AdBanner({ site, placement, product }: Props) {
  const [ads, setAds] = useState<AdData[]>([]);
  const [currentAd, setCurrentAd] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({ site, placement });
    if (product) params.set("product", product);

    fetch(`/api/adverts?${params}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.adverts?.length > 0) setAds(data.adverts);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [site, placement, product]);

  // Image rotation within current ad (5s)
  useEffect(() => {
    if (ads.length === 0) return;
    const ad = ads[currentAd];
    if (!ad || ad.imageUrls.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % ad.imageUrls.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [ads, currentAd]);

  // Ad rotation between businesses (15s)
  useEffect(() => {
    if (ads.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
      setCurrentImage(0);
    }, 15000);

    return () => clearInterval(timer);
  }, [ads.length]);

  const handleDotClick = useCallback((index: number) => {
    setCurrentImage(index);
  }, []);

  // Show house ad if no paid ads
  if (loaded && ads.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <a
          href="/operator/register"
          className="block rounded-xl overflow-hidden border border-primary/20 bg-gradient-to-r from-primary to-blue-700 hover:shadow-lg transition-shadow"
        >
          <div className="px-6 py-8 md:py-10 flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex-1 text-center md:text-left">
              <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-2">
                Your Ad Here
              </p>
              <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                Own a business? Advertise here
              </h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Claim your free business profile, then promote your services to
                thousands of local customers searching for quotes.
              </p>
            </div>
            <div className="shrink-0">
              <span className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors">
                Claim Your Profile
              </span>
            </div>
          </div>
        </a>
      </div>
    );
  }

  if (!loaded) return null;

  const ad = ads[currentAd];
  if (!ad || ad.imageUrls.length === 0) return null;

  const content = (
    <div className="relative rounded-xl overflow-hidden border border-border bg-white">
      {/* Sponsored label */}
      <div className="absolute top-2.5 right-3 z-10">
        <span className="text-[10px] font-medium text-text-light/70 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded">
          Sponsored
        </span>
      </div>

      {/* Image area */}
      <div className="relative w-full h-48 md:h-64">
        {ad.imageUrls.map((url, i) => (
          <Image
            key={url}
            src={url}
            alt={ad.altText || `${ad.businessName} advert`}
            fill
            className={`object-cover transition-opacity duration-700 ${
              i === currentImage ? "opacity-100" : "opacity-0"
            }`}
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        ))}
      </div>

      {/* Bottom bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-surface/50">
        <span className="text-sm text-text capitalize font-medium">
          {ad.businessName}
        </span>

        {/* Dot indicators */}
        {ad.imageUrls.length > 1 && (
          <div className="flex gap-1.5">
            {ad.imageUrls.map((_, i) => (
              <button
                key={i}
                onClick={() => handleDotClick(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentImage ? "bg-primary" : "bg-border"
                }`}
                aria-label={`Show image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Business count indicator */}
        {ads.length > 1 && (
          <span className="text-[10px] text-text-light">
            {currentAd + 1}/{ads.length}
          </span>
        )}
      </div>
    </div>
  );

  if (ad.linkUrl) {
    return (
      <div className="max-w-4xl mx-auto">
        <a
          href={ad.linkUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="block hover:shadow-lg transition-shadow rounded-xl"
        >
          {content}
        </a>
      </div>
    );
  }

  return <div className="max-w-4xl mx-auto">{content}</div>;
}
