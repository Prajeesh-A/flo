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

// Force dynamic rendering - fetch data at request time, not build time
export const dynamic = "force-dynamic";

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

    {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://floneo-backend-production.up.railway.app/api";

      // Try to fetch by slug first, then by ID
      let res = await fetch(`${apiUrl}/blogs/${blogId}/`, {
        cache: "no-store",
      });

      // If not found and blogId is not a number, it might be a slug
      // Try to find by slug in the blog list
      if (!res.ok && isNaN(Number(blogId))) {
        const listRes = await fetch(`${apiUrl}/blogs/`, {
          cache: "no-store",
        });
        if (listRes.ok) {
          const listData = await listRes.json();
          const blogs = listData.results || listData;
          const blogBySlug = blogs.find((b: any) => b.slug === blogId);
          if (blogBySlug) {
            res = await fetch(`${apiUrl}/blogs/${blogBySlug.id}/`, {
              cache: "no-store",
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
        blog = null;
      }
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    blog = null;
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
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://floneo-backend-production.up.railway.app/api";
    const blogId = resolvedParams.id;

    // Try to fetch by slug first, then by ID
    let res = await fetch(`${apiUrl}/blogs/${blogId}/`);

    // If not found and blogId is not a number, it might be a slug
    if (!res.ok && isNaN(Number(blogId))) {
      const listRes = await fetch(`${apiUrl}/blogs/`);
      if (listRes.ok) {
        const listData = await listRes.json();
        const blogs = listData.results || listData;
        const blogBySlug = blogs.find((b: any) => b.slug === blogId);
        if (blogBySlug) {
          res = await fetch(`${apiUrl}/blogs/${blogBySlug.id}/`);
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
