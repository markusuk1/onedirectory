import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/siteConfig";
import { getAllBusinesses } from "@/lib/data";
import { PRODUCT_CONFIGS, ALL_PRODUCTS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";

export const alt = "Product preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ product: p.slug }));
}

export default function OGImage({ params }: { params: { product: string } }) {
  const site = getSiteConfig();
  const productId = params.product as ProductId;
  const product = PRODUCT_CONFIGS[productId];

  if (!product) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#1e40af",
            color: "white",
            fontSize: 48,
            fontFamily: "sans-serif",
          }}
        >
          {site.genericName}
        </div>
      ),
      { ...size }
    );
  }

  const businesses = getAllBusinesses(productId);

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
        <div style={{ fontSize: 64, display: "flex", marginBottom: 16 }}>
          {product.icon}
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: "white",
            marginBottom: 12,
            display: "flex",
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "rgba(255,255,255,0.9)",
            marginBottom: 8,
            display: "flex",
          }}
        >
          {`in ${site.region}`}
        </div>
        <div
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            marginBottom: 32,
            display: "flex",
          }}
        >
          {`Compare ${businesses.length}+ companies`}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 10,
              background: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#1e3a8a",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            {site.logoPrefix}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "white",
              display: "flex",
            }}
          >
            {site.genericName}
          </div>
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
