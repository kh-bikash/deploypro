import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, IBM_Plex_Mono, Inter } from "next/font/google";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

/* Display and body are the same face — Inter carries both, the way the
   reference does. --font-display stays as the name so nothing downstream
   has to change. */
const interDisplay = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-display",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-mono",
});

/** The italic accent face — used only for the emphasised word in a headline. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: "italic",
  display: "swap",
  variable: "--font-serif",
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
  themeColor: "#0b0b0d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${interDisplay.variable} ${plexMono.variable} ${cormorant.variable}`}
    >
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <ScrollProgress />
        <RevealObserver />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
