import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import Noise from "@/components/Noise";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const title = "Foundations. A free 5 day crypto masterclass";
const description =
  "Five short lessons on how digital assets actually work. No hype, no jargon, no coin shilling.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Foundations",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          Scroll revealed rows start at opacity 0 and are raised by
          framer-motion. Without JavaScript that content would stay invisible,
          so the no-JS branch forces it visible. The reveal is decoration; the
          copy behind it is not.
        */}
        <noscript>
          <style>{`
            ol li, figure { opacity: 1 !important; transform: none !important; }
          `}</style>
        </noscript>
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Noise />
        {children}

        {/*
          GA4. A Measurement ID is not a secret: it ships in the client HTML of
          every site that uses it, so it lives in source rather than an env var.
        */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0QXCCQYR17"
          strategy="afterInteractive"
        />
        <Script id="ga" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-0QXCCQYR17');
        `}</Script>

        {/* Meta Pixel would be initialized here in production:
        <Script id="meta-pixel">... fbq('init','PIXEL_ID'); fbq('track','PageView'); ...</Script>
        Left commented intentionally on this concept build. */}
      </body>
    </html>
  );
}
