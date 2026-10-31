import type { MetadataRoute } from "next";
import { projects, person } from "@/data/content";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: person.domain, priority: 1 },
    { url: `${person.domain}/resume`, priority: 0.9 },
    ...projects.map((p) => ({
      url: `${person.domain}/projects/${p.slug}`,
      priority: 0.8,
    })),
  ];
}
