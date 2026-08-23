import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/process`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/proof`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/engage`, lastModified: now, priority: 0.8 },
    { url: `${site.url}/masterclass`, lastModified: now, priority: 0.6 },
  ];
}
