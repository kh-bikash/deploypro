import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, priority: 1 },
    { url: `${site.url}/case-studies`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/case-studies/sql-rag`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/case-studies/ai-interviewer`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/case-studies/agentic-learning`, lastModified: now, priority: 0.9 },
    { url: `${site.url}/proof`, lastModified: now, priority: 0.8 },
  ];
}
