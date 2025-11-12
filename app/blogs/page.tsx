"use client";
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  X,
  Calendar,
  User,
  Search,
} from "lucide-react";

interface Blog {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  date: string;
  gradient: string;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    createdBy: "",
  });

  const gradients = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  ];

  // Load blogs from storage
  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const blogKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("blog:")
      );
      const loadedBlogs = blogKeys
        .map((key) => {
          try {
            const blogData = localStorage.getItem(key);
            return blogData ? JSON.parse(blogData) : null;
          } catch (error) {
            console.error(`Error parsing blog data for key ${key}:`, error);
            return null;
          }
        })
        .filter(Boolean);
      setBlogs(
        loadedBlogs.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    } catch (error) {
      console.log("No blogs found yet");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const blogData: Blog = editingBlog
      ? { ...editingBlog, ...formData }
      : {
          id: `blog_${Date.now()}`,
          ...formData,
          date: new Date().toISOString(),
          gradient: gradients[Math.floor(Math.random() * gradients.length)],
        };

    try {
      localStorage.setItem(`blog:${blogData.id}`, JSON.stringify(blogData));
      await loadBlogs();
      setIsModalOpen(false);
      setEditingBlog(null);
      setFormData({ title: "", content: "", createdBy: "" });
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      createdBy: blog.createdBy,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      try {
        localStorage.removeItem(`blog:${id}`);
        await loadBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.createdBy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(to bottom, #0a0a0f 0%, #1a1a2e 100%)",
      }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-40 backdrop-blur-xl border-b"
        style={{
          background: "rgba(10, 10, 15, 0.8)",
          borderColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="p-2 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-white tracking-tight">
                  Company Blogs
                </h1>
                <p className="text-xs text-gray-400 font-light">
                  Internal team space
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setEditingBlog(null);
                setFormData({ title: "", content: "", createdBy: "" });
                setIsModalOpen(true);
              }}
              className="px-6 py-2.5 rounded-full font-light text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <Plus className="w-4 h-4" />
              New Blog
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl font-light text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            />
          </div>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div
              className="inline-flex p-6 rounded-full mb-4"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <Sparkles className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-light text-gray-300 mb-2">
              No blogs yet
            </h3>
            <p className="text-gray-500 font-light">
              Create your first blog to get started!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="group rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                style={{
                  background: "rgba(255, 255, 255, 0.03)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {/* Card Header with Gradient */}
                <div
                  className="h-32 relative overflow-hidden"
                  style={{ background: blog.gradient }}
                >
                  <div className="absolute inset-0 bg-black opacity-20"></div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="p-2 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                      style={{ background: "rgba(255, 255, 255, 0.2)" }}
                    >
                      <Edit2 className="w-4 h-4 text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="p-2 rounded-full backdrop-blur-sm hover:scale-110 transition-transform"
                      style={{ background: "rgba(255, 255, 255, 0.2)" }}
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-light text-white mb-3 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 font-light text-sm mb-4 line-clamp-3">
                    {blog.content}
                  </p>

                  <div
                    className="flex items-center justify-between pt-4 border-t"
                    style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
                  >
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-400 font-light">
                        {blog.createdBy}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-xs text-gray-400 font-light">
                        {new Date(blog.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            className="w-full max-w-2xl rounded-3xl overflow-hidden animate-in"
            style={{
              background:
                "linear-gradient(to bottom, #1a1a2e 0%, #0f0f1e 100%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              animation: "slideUp 0.3s ease-out",
            }}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between p-6 border-b"
              style={{ borderColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <h2 className="text-2xl font-light text-white">
                {editingBlog ? "Edit Blog" : "Create New Blog"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingBlog(null);
                  setFormData({ title: "", content: "", createdBy: "" });
                }}
                className="p-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-light text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl font-light text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  placeholder="Enter blog title..."
                />
              </div>

              <div>
                <label className="block text-sm font-light text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  rows={8}
                  className="w-full px-4 py-3 rounded-2xl font-light text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all resize-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  placeholder="Write your blog content..."
                />
              </div>

              <div>
                <label className="block text-sm font-light text-gray-300 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.createdBy}
                  onChange={(e) =>
                    setFormData({ ...formData, createdBy: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-2xl font-light text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                  placeholder="Your name..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingBlog(null);
                    setFormData({ title: "", content: "", createdBy: "" });
                  }}
                  className="flex-1 px-6 py-3 rounded-2xl font-light text-gray-300 hover:bg-white/5 transition-all"
                  style={{ border: "1px solid rgba(255, 255, 255, 0.1)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 rounded-2xl font-light text-white transition-all hover:scale-105"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
      `}</style>
    </div>
  );
}
