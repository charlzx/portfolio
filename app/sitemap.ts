import { MetadataRoute } from "next";
import { PROJECTS } from "@/lib/projects";

const SITE_LAST_MODIFIED = new Date("2026-03-30T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const projectDetailPages: MetadataRoute.Sitemap = PROJECTS.map(p => ({
    url: `https://charlz.dev/projects/${p.id}`,
    lastModified: SITE_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://charlz.dev",
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://charlz.dev/projects",
      lastModified: SITE_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectDetailPages,
  ];
}
