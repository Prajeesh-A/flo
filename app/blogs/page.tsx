import React from "react";
import BlogsClient from "./BlogsClient";

// Force dynamic rendering - fetch data at request time, not build time
export const dynamic = "force-dynamic";

// ✅ Server Component - Fetches data at request time
export default async function BlogsPage() {
  let blogs = [];

  try {
    // Fetch blogs from backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://floneo-backend-production.up.railway.app/api";
    const res = await fetch(`${apiUrl}/blogs/`, {
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      const results = data.results || data; // Handle paginated response
      blogs = results.map((blog: any) => ({
        id: blog.id.toString(),
        slug: blog.slug,
        title: blog.title,
        content: blog.content,
        excerpt:
          blog.excerpt_text || blog.content?.substring(0, 150) + "..." || "",
        createdBy: blog.author_name || blog.author_username || "Floneo Team",
        date: blog.published_at || blog.created_at || blog.date,
        readTime: blog.reading_time
          ? `${blog.reading_time} min read`
          : `${Math.ceil(
            (blog.content?.split(" ").length || 0) / 200
          )} min read`,
        category: blog.category_name || blog.category || "Technology",
        featuredImage: blog.featured_image_url,
        tags: blog.tags || [],
        viewCount: blog.view_count || 0,
        isFeatured: blog.is_featured || false,
      }));
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return <BlogsClient initialBlogs={blogs} />;
}
