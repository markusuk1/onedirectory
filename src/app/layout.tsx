import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getSiteConfig } from "@/lib/siteConfig";
import { getAllBusinesses } from "@/lib/data";
import { ALL_PRODUCTS } from "@/lib/productConfig";
import type { ProductId } from "@/lib/productConfig";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const site = getSiteConfig();
const totalBusinesses = ALL_PRODUCTS.reduce(
  (sum, p) => sum + getAllBusinesses(p.id as ProductId).length,
  0
);

export const metadata: Metadata = {
  title: {
    default: `${site.genericName} | Compare ${totalBusinesses}+ Companies`,
    template: `%s | ${site.genericName}`,
  },
  description: site.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-8691296183242940" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8691296183242940"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${geistSans.variable} antialiased bg-white`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
