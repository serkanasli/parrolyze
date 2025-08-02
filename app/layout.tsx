import type { Metadata } from "next";
import "./globals.css";

// Metadata
export const metadata: Metadata = {
  title: "Parrolyze – Translate your app. Reach the world.",
  description:
    "Parrolyze is an open-source localization tool for App Store & Play Store listings. Translate, manage, and export your app metadata in minutes.",
  keywords: [
    "app translation",
    "localization",
    "play store translator",
    "app store metadata",
    "translate app description",
    "parrolyze",
    "open source localization",
  ],
  authors: [{ name: "Parrolyze Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://parrolyze.com"),
  openGraph: {
    title: "Parrolyze – Translate your app. Reach the world.",
    description:
      "Open-source tool for translating App Store and Play Store listings.",
    url: "https://parrolyze.com",
    siteName: "Parrolyze",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Parrolyze Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parrolyze",
    description: "Translate your app metadata in minutes.",
    creator: "@parrolyze",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
