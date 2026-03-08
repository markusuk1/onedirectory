"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const HOUSE_AD_VARIATIONS = [
  {
    label: "Sponsored",
    heading: "Your Business Could Be Here",
    description:
      "Get your company in front of thousands of customers actively searching for quotes in your area.",
    cta: "Advertise Now",
    gradient: "from-primary to-blue-700",
    labelColor: "text-blue-200",
    descColor: "text-blue-100",
  },
  {
    label: "Featured Spot",
    heading: "Stand Out From The Competition",
    description:
      "Promoted listings get up to 5x more views. Claim your free profile and start getting noticed today.",
    cta: "Get Featured",
    gradient: "from-emerald-600 to-teal-700",
    labelColor: "text-emerald-200",
    descColor: "text-emerald-100",
  },
  {
    label: "Ad Space Available",
    heading: "Reach Local Customers Instantly",
    description:
      "Your ad banner appears right here — seen by hundreds of people looking for services near them every day.",
    cta: "Place Your Ad",
    gradient: "from-violet-600 to-purple-700",
    labelColor: "text-violet-200",
    descColor: "text-violet-100",
  },
  {
    label: "Promote Your Business",
    heading: "Fill Your Diary With New Enquiries",
    description:
      "Businesses advertising here receive quote requests directly to their inbox. No commission, no middleman.",
    cta: "Start Advertising",
    gradient: "from-orange-500 to-red-600",
    labelColor: "text-orange-200",
    descColor: "text-orange-100",
  },
];

function HouseAd() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % HOUSE_AD_VARIATIONS.length);
        setFading(false);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const v = HOUSE_AD_VARIATIONS[current];

  return (
    <div className="max-w-4xl mx-auto">
      <a
        href="/operator/register"
        className={`block rounded-xl overflow-hidden border border-white/10 bg-gradient-to-r ${v.gradient} hover:shadow-lg transition-shadow`}
      >
        <div
          className={`px-6 py-8 md:py-10 flex flex-col md:flex-row items-center gap-4 md:gap-8 transition-opacity duration-400 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="flex-1 text-center md:text-left">
            <p
              className={`${v.labelColor} text-xs font-semibold uppercase tracking-wider mb-2`}
            >
              {v.label}
            </p>
            <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
              {v.heading}
            </h3>
            <p className={`${v.descColor} text-sm leading-relaxed`}>
              {v.description}
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors backdrop-blur-sm border border-white/20">
              {v.cta}
            </span>
          </div>
        </div>
      </a>
      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {HOUSE_AD_VARIATIONS.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setFading(true);
              setTimeout(() => {
                setCurrent(i);
                setFading(false);
              }, 400);
            }}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-primary" : "bg-border"
            }`}
            aria-label={`Show ad variation ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

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

  // Show house ad if no paid ads — cycle through variations
  if (loaded && ads.length === 0) {
    return <HouseAd />;
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
