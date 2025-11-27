"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  createdBy: string;
  date: string;
  readTime: string;
  category: string;
}

interface BlogsClientProps {
  initialBlogs: Blog[];
}

export default function BlogsClient({ initialBlogs }: BlogsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Technology", "Business", "Design", "Development"];

  const filteredBlogs = initialBlogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayBlogs =
    filteredBlogs.length === 0 ? initialBlogs : filteredBlogs;

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
        href="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6  z-50 group"
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

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center items-center mb-5">
              {/* Logo */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 mr-5">
                <Image
                  src="/logo.png"
                  alt="Floneo Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Main Heading */}
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                style={{
                  color: "#0a0e27",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Insights & Stories
              </h1>
            </div>

            {/* Subtitle */}
            <p
              className="text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto"
              style={{
                color: "#6b7280",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Discover the latest trends, tips, and stories from our team
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#0a0e27",
                  }}
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-4 rounded-xl font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? "bg-[#0a0e27] text-white shadow-lg"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                    }`}
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="pb-24 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBlogs.map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blogs/${blog.id}`}>
                  <div className="group h-full bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-blue-200 transition-all duration-300 cursor-pointer">
                    {/* Colored Header */}
                    <div
                      className="h-2"
                      style={{
                        background: `linear-gradient(90deg, ${
                          index % 3 === 0
                            ? "#0066ff, #00d4ff"
                            : index % 3 === 1
                            ? "#2ecc71, #00d4ff"
                            : "#ffc107, #ff6b6b"
                        })`,
                      }}
                    ></div>

                    <div className="p-8">
                      <span
                        className="inline-block px-3 py-1 bg-gray-50 rounded-full text-xs font-medium mb-4"
                        style={{
                          color: "#6b7280",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {blog.category}
                      </span>

                      <h3
                        className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors"
                        style={{
                          color: "#0a0e27",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {blog.title}
                      </h3>

                      <p
                        className="mb-6 line-clamp-3 text-sm leading-relaxed"
                        style={{
                          color: "#6b7280",
                          fontFamily: "'Poppins', sans-serif",
                        }}
                      >
                        {blog.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                            {blog.createdBy.charAt(0).toUpperCase()}
                          </div>
                          <span
                            className="text-xs font-medium"
                            style={{
                              color: "#6b7280",
                              fontFamily: "'Poppins', sans-serif",
                            }}
                          >
                            {blog.createdBy}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{blog.readTime}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(blog.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 text-blue-600 font-medium text-sm group-hover:gap-3 transition-all">
                        <span>Read Article</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2
              className="text-3xl sm:text-4xl font-bold mb-3"
              style={{
                color: "#0a0e27",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Never miss an update
            </h2>

            <p
              className="text-base sm:text-lg mb-10"
              style={{
                color: "#6b7280",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Subscribe to get our latest articles in your inbox
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-lg mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 bg-white border border-gray-200 rounded-xl text-base focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all shadow-sm"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#0a0e27",
                }}
              />
              <button
                className="px-7 py-3.5 bg-[#0a0e27] hover:bg-[#1a1f3a] text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Subscribe
              </button>
            </div>

            <p
              className="text-xs sm:text-sm mt-4"
              style={{
                color: "#9ca3af",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
