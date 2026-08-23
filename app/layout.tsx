import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ScrollProgress from "@/components/ScrollProgress";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "DEPLOY — forward-deployed AI engineers who ship to production",
    template: "%s · DEPLOY",
  },
  description: site.description,
  keywords: [
    "forward deployed engineer",
    "FDE",
    "AI consulting India",
    "AI agents production",
    "POC to production",
    "Build Fast with AI",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: `${site.name} by ${site.parent}`,
    title: "DEPLOY — deployed, not demoed",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "DEPLOY — deployed, not demoed",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable} ${jetbrains.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ScrollProgress />
        <RevealObserver />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
