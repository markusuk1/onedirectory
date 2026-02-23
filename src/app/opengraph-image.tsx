import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/siteConfig";
import { getAllBusinesses } from "@/lib/data";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";

export const alt = "Site preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const site = getSiteConfig();
  const totalBusinesses = ALL_PRODUCTS.reduce(
    (sum, p) => sum + getAllBusinesses(p.id as ProductId).length,
    0
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1e3a8a",
              fontSize: 32,
              fontWeight: 800,
              marginRight: 20,
            }}
          >
            {site.logoPrefix}
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "white",
              display: "flex",
            }}
          >
            {site.genericName}
          </div>
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.9)",
            marginBottom: 32,
            display: "flex",
          }}
        >
          {`Compare ${totalBusinesses}+ hire companies in ${site.region}`}
        </div>
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {ALL_PRODUCTS.map((p) => (
            <div
              key={p.id}
              style={{
                background: "rgba(255,255,255,0.15)",
                borderRadius: 12,
                padding: "12px 24px",
                color: "white",
                fontSize: 20,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ display: "flex" }}>{p.icon}</span>
              <span style={{ display: "flex" }}>{p.shortName}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 20,
            color: "rgba(255,255,255,0.6)",
            display: "flex",
          }}
        >
          {site.domain}
        </div>
      </div>
    ),
    { ...size }
  );
}
