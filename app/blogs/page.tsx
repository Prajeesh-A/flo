import React from "react";
import BlogsClient from "./BlogsClient";

// ✅ ISR: Revalidate every 1 hour (3600 seconds)
export const revalidate = 3600;

// Dummy blog for fallback
const dummyBlog = {
  id: "demo-blog-1",
  title: "Welcome to Our Blog - Getting Started with Floneo",
  content:
    "This is a sample blog post to demonstrate how our blog section works. Floneo is designed to help you build, automate, and scale your business without the IT bottleneck. In this article, we'll explore the key features that make Floneo the perfect solution for modern businesses.",
  excerpt:
    "This is a sample blog post to demonstrate how our blog section works. Floneo is designed to help you build, automate, and scale your business...",
  createdBy: "Floneo Team",
  date: new Date().toISOString(),
  readTime: "3 min read",
  category: "Technology",
};

// ✅ Server Component - Fetches data at build time + ISR
export default async function BlogsPage() {
  let blogs = [];

  try {
    // Fetch blogs from backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const res = await fetch(`${apiUrl}/api/blogs/`, {
      next: { revalidate: 3600 }, // ISR: Cache for 1 hour
    });

    if (res.ok) {
      const data = await res.json();
      const results = data.results || data; // Handle paginated response
      blogs = results.map((blog: any) => ({
        id: blog.id.toString(),
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

  // If no blogs from API, show dummy blog
  if (blogs.length === 0) {
    blogs = [dummyBlog];
  }

  return <BlogsClient initialBlogs={blogs} />;
}
