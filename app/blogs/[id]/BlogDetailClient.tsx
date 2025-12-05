"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

interface BlogDetailClientProps {
  initialBlog: Blog | null;
}

export default function BlogDetailClient({
  initialBlog,
}: BlogDetailClientProps) {
  if (!initialBlog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ color: "#0a0e27", fontFamily: "'Poppins', sans-serif" }}
          >
            Blog not found
          </h2>
          <Link
            href="/blogs"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      {/* Back Button */}
      <Link
        href="/blogs"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 group"
      >
        <div className="flex items-center gap-2 bg-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-sm border border-gray-200 group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200">
          <ArrowLeft
            size={16}
            className="sm:w-[18px] sm:h-[18px] text-gray-600 group-hover:text-gray-900"
          />
          <span className="font-medium text-sm sm:text-base text-gray-600 group-hover:text-gray-900">
            Back
          </span>
        </div>
      </Link>

      {/* Blog Content */}
      <article className="relative pt-10 pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-6">
              {/* Logo */}
              <div className="w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Floneo Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Category Badge */}
              <div className="text-center">
                <span
                  className="inline-block px-4 py-2 bg-gray-50 rounded-full text-sm font-medium"
                  style={{
                    color: "#6b7280",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {initialBlog.category}
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 text-center leading-tight"
              style={{
                color: "#0a0e27",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {initialBlog.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-12 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {initialBlog.createdBy.charAt(0).toUpperCase()}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{
                    color: "#6b7280",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {initialBlog.createdBy}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(initialBlog.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>{initialBlog.readTime}</span>
              </div>
            </div>

            {/* Blog Content */}
            <div
              className="prose prose-lg max-w-none"
              style={{
                color: "#374151",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {initialBlog.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-6 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Share Section */}
            <div className="mt-16 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <p
                  className="text-sm font-medium"
                  style={{
                    color: "#6b7280",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  Share this article
                </p>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: initialBlog.title,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  <Share2 className="w-4 h-4 text-gray-600" />
                  <span
                    className="text-sm font-medium"
                    style={{
                      color: "#6b7280",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Share
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </article>

      {/* Back to Blogs CTA */}
      <section className="pb-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#0a0e27] hover:bg-[#1a1f3a] text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to all articles</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
