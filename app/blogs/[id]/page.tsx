import React from "react";
import BlogDetailClient from "./BlogDetailClient";

// Blog interface to match BlogDetailClient
interface Blog {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  date: string;
  readTime: string;
  category: string;
  featuredImage?: string;
  videoUrl?: string;
  videoFile?: string;
  tags?: any[];
  viewCount?: number;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

// ✅ ISR: Revalidate every 1 hour
export const revalidate = 3600;

// Dummy blog for fallback
const dummyBlog: Blog = {
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const res = await fetch(`${apiUrl}/api/blogs/`);
    const data = await res.json();
    const blogs = data.results || data; // Handle paginated response

    // Use slug if available, otherwise use ID
    const params = blogs.map((blog: any) => ({
      id: blog.slug || blog.id.toString(),
    }));

    // Always include the demo blog
    params.push({ id: "demo-blog-1" });

    return params;
  } catch (error) {
    console.error("Error generating static params:", error);
    // Return known blog slugs/IDs as fallback
    return [
      { id: "demo-blog-1" },
      { id: "demo" }, // Your current blog slug
      { id: "1" }, // Your current blog ID
    ];
  }
}

// ✅ Server Component - Fetches blog data
export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  let blog: Blog | null = null;

  try {
    const resolvedParams = await params;
    const blogId = resolvedParams.id;

    if (blogId === "demo-blog-1") {
      blog = dummyBlog;
    } else {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

      // Try to fetch by slug first, then by ID
      let res = await fetch(`${apiUrl}/api/blogs/${blogId}/`, {
        next: { revalidate: 3600 }, // ISR: Cache for 1 hour
      });

      // If not found and blogId is not a number, it might be a slug
      // Try to find by slug in the blog list
      if (!res.ok && isNaN(Number(blogId))) {
        const listRes = await fetch(`${apiUrl}/api/blogs/`, {
          next: { revalidate: 3600 },
        });
        if (listRes.ok) {
          const listData = await listRes.json();
          const blogs = listData.results || listData;
          const blogBySlug = blogs.find((b: any) => b.slug === blogId);
          if (blogBySlug) {
            res = await fetch(`${apiUrl}/api/blogs/${blogBySlug.id}/`, {
              next: { revalidate: 3600 },
            });
          }
        }
      }

      if (res.ok) {
        const data = await res.json();
        blog = {
          id: data.id.toString(),
          title: data.title,
          content: data.content,
          createdBy: data.author_name || data.author_username || "Floneo Team",
          date: data.published_at || data.created_at || data.date,
          readTime: data.reading_time
            ? `${data.reading_time} min read`
            : `${Math.ceil(
                (data.content?.split(" ").length || 0) / 200
              )} min read`,
          category: data.category?.name || data.category_name || "Technology",
          featuredImage: data.featured_image_url,
          videoUrl: data.video_url,
          videoFile: data.video_file_url,
          tags: data.tags || [],
          viewCount: data.view_count || 0,
          isFeatured: data.is_featured || false,
          metaTitle: data.meta_title,
          metaDescription: data.meta_description,
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
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const resolvedParams = await params;
    if (resolvedParams.id === "demo-blog-1") {
      return {
        title: dummyBlog.title,
        description: dummyBlog.content.substring(0, 160),
      };
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    const blogId = resolvedParams.id;

    // Try to fetch by slug first, then by ID
    let res = await fetch(`${apiUrl}/api/blogs/${blogId}/`);

    // If not found and blogId is not a number, it might be a slug
    if (!res.ok && isNaN(Number(blogId))) {
      const listRes = await fetch(`${apiUrl}/api/blogs/`);
      if (listRes.ok) {
        const listData = await listRes.json();
        const blogs = listData.results || listData;
        const blogBySlug = blogs.find((b: any) => b.slug === blogId);
        if (blogBySlug) {
          res = await fetch(`${apiUrl}/api/blogs/${blogBySlug.id}/`);
        }
      }
    }

    if (res.ok) {
      const blog = await res.json();
      return {
        title: blog.meta_title || blog.title,
        description:
          blog.meta_description ||
          blog.excerpt_text ||
          blog.content?.substring(0, 160),
        keywords: blog.meta_keywords,
        openGraph: {
          title: blog.meta_title || blog.title,
          description:
            blog.meta_description ||
            blog.excerpt_text ||
            blog.content?.substring(0, 160),
          images: blog.featured_image_url ? [blog.featured_image_url] : [],
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
