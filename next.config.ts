import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/ads.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain",
          },
        ],
      },
      {
        source: "/operator/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Consolidate per-location service pages to per-product
      {
        source: "/:product/:location/services/:service",
        destination: "/:product/services/:service",
        permanent: true,
      },
      {
        source: "/skip-hire/newcastle/annfield-plain-hwrc-tip",
        destination: "/skip-hire/newcastle",
        permanent: true,
      },
      {
        source: "/stockton-on-tees/leisure-time-north-east",
        destination: "/minibus-hire/stockton-on-tees",
        permanent: true,
      },
      // wehirescotland.co.uk
      {
        source: "/fort-william/off-beat-bikes",
        destination: "/",
        permanent: true,
      },
      {
        source: "/east-kilbride/miles-away-campers-ltd",
        destination: "/van-hire/east-kilbride",
        permanent: true,
      },
      // hiremidlands.co.uk
      {
        source: "/derby/eco-express-hire-derby",
        destination: "/minibus-hire/derby",
        permanent: true,
      },
      // hire-yorkshire.co.uk
      {
        source: "/minibus-hire/wetherby/walton-village-hall-wetherby",
        destination: "/minibus-hire/wetherby",
        permanent: true,
      },
      // hireeast.co.uk
      {
        source: "/minibus-hire/colchester/greenstead-community-centre",
        destination: "/minibus-hire/colchester",
        permanent: true,
      },
      {
        source: "/minibus-hire/lowestoft/uplands-community-centre",
        destination: "/minibus-hire/lowestoft",
        permanent: true,
      },
      // wehirelondon.co.uk
      {
        source: "/van-hire/kingston/household-reuse-and-recycling-centre",
        destination: "/van-hire/kingston",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
