import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://joflix-coral.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://joflix-coral.vercel.app/search",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
