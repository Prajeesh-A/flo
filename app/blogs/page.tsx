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
    const res = await fetch('https://flo-do2v.onrender.com/api/blogs/', {
      next: { revalidate: 3600 }, // ISR: Cache for 1 hour
    });

    if (res.ok) {
      const data = await res.json();
      blogs = data.map((blog: any) => ({
        id: blog.id.toString(),
        title: blog.title,
        content: blog.content,
        excerpt: blog.content.substring(0, 150) + "...",
        createdBy: blog.author || blog.createdBy || "Floneo Team",
        date: blog.created_at || blog.date,
        readTime: `${Math.ceil(blog.content.split(" ").length / 200)} min read`,
        category: blog.category || "Technology",
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
