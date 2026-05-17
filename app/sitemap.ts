import type { MetadataRoute } from "next";

const SITE_URL = "https://floneo.co";
const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://floneo-backend-production.up.railway.app/api";

type BlogListResponse = {
  results?: Array<{
    slug?: string;
    updated_at?: string;
    published_at?: string;
    created_at?: string;
  }>;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];

  try {
    const response = await fetch(`${API_URL}/blogs/`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      return staticRoutes;
    }

    const data = (await response.json()) as BlogListResponse;
    const blogs = data.results || [];
    return [
      ...staticRoutes,
      ...blogs
        .filter((blog) => blog.slug)
        .map((blog) => ({
          url: `${SITE_URL}/blogs/${blog.slug}`,
          lastModified: blog.updated_at || blog.published_at || blog.created_at || now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
    ];
  } catch {
    return staticRoutes;
  }
}
