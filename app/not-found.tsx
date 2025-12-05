"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <div className="mb-8">
          <h1
            className="text-8xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #0066ff, #00d4ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            404
          </h1>
        </div>

        {/* Error Message */}
        <h2
          className="text-2xl font-bold mb-4"
          style={{
            color: "#0a0e27",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Page Not Found
        </h2>

        <p
          className="text-gray-600 mb-8 leading-relaxed"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Sorry, we couldn't find the page you're looking for. It might have
          been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0e27] hover:bg-[#1a1f3a] text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
