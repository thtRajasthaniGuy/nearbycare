import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import { db } from "@/lib/firebase";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi-Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karuna Hub – Discover & Support Local NGOs",
  description:
    "Karuna Hub helps you find NGOs near you, view their needs, and support them. NGOs can register themselves and manage their pages. Totally free and open-source.",
  keywords: [
    "NGO",
    "volunteer",
    "donate",
    "charity",
    "community",
    "wishlist",
    "Karuna Hub",
  ],
  authors: [{ name: "Karuna Hub Team" }],
  openGraph: {
    title: "Karuna Hub – Discover & Support Local NGOs",
    description:
      "Find NGOs near you, help them fulfill their wishlist, and support your community. Free and open-source.",
    url: "https://www.karunahub.org",
    siteName: "Karuna Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karuna Hub – Discover & Support Local NGOs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Karuna Hub – Discover & Support Local NGOs",
    description:
      "Find NGOs near you, help them fulfill their wishlist, and support your community. Free and open-source.",
    images: ["/og-image.png"],
  },
};

if (typeof window !== "undefined") {
  void db;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} antialiased`}>
        <Providers>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </Providers>
      </body>
    </html>
  );
}
