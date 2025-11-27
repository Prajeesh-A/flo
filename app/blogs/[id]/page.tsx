import React from "react";
import BlogDetailClient from "./BlogDetailClient";

// ✅ ISR: Revalidate every 1 hour
export const revalidate = 3600;

// Dummy blog for fallback
const dummyBlog = {
  id: "demo-blog-1",
  title: "Welcome to Our Blog - Getting Started with Floneo",
  content:
    "This is a sample blog post to demonstrate how our blog section works. Floneo is designed to help you build, automate, and scale your business without the IT bottleneck.\n\nIn this article, we'll explore the key features that make Floneo the perfect solution for modern businesses. We believe in making technology accessible to everyone, regardless of their technical expertise.\n\nOur platform is built with simplicity and power in mind, allowing you to create sophisticated workflows with just a few clicks. Whether you're a small startup or a large enterprise, Floneo adapts to your needs.\n\nKey Features:\n- Visual workflow builder\n- No-code automation\n- Real-time collaboration\n- Enterprise-grade security\n- Scalable infrastructure\n\nGet started today and transform the way you work!",
  createdBy: "Floneo Team",
  date: new Date().toISOString(),
  readTime: "3 min read",
  category: "Technology",
};

// ✅ Generate static params for all blogs
export async function generateStaticParams() {
  try {
    const res = await fetch('https://flo-do2v.onrender.com/api/blogs/');
    const blogs = await res.json();
    
    return blogs.map((blog: any) => ({
      id: blog.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [{ id: 'demo-blog-1' }];
  }
}

// ✅ Server Component - Fetches blog data
export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  let blog = null;

  try {
    const blogId = params.id;

    if (blogId === "demo-blog-1") {
      blog = dummyBlog;
    } else {
      const res = await fetch(`https://flo-do2v.onrender.com/api/blogs/${blogId}/`, {
        next: { revalidate: 3600 }, // ISR: Cache for 1 hour
      });

      if (res.ok) {
        const data = await res.json();
        blog = {
          id: data.id.toString(),
          title: data.title,
          content: data.content,
          createdBy: data.author || data.createdBy || "Floneo Team",
          date: data.created_at || data.date,
          readTime: `${Math.ceil(data.content.split(" ").length / 200)} min read`,
          category: data.category || "Technology",
        };
      } else {
        blog = dummyBlog;
      }
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    blog = dummyBlog;
  }

  return <BlogDetailClient initialBlog={blog} />;
}

// ✅ SEO Metadata
export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    if (params.id === "demo-blog-1") {
      return {
        title: dummyBlog.title,
        description: dummyBlog.content.substring(0, 160),
      };
    }

    const res = await fetch(`https://flo-do2v.onrender.com/api/blogs/${params.id}/`);
    if (res.ok) {
      const blog = await res.json();
      return {
        title: blog.title,
        description: blog.content.substring(0, 160),
        openGraph: {
          title: blog.title,
          description: blog.content.substring(0, 160),
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Blog | Floneo",
    description: "Read our latest blog posts",
  };
}
