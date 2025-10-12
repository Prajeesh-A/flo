"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Calendar, Clock } from "lucide-react";
import { api, useApiData } from "@/lib/api";

export default function PrivacyPolicyPage() {
  // Fetch privacy policy data from API
  const {
    data: privacyData,
    loading,
    error,
  } = useApiData(api.getPrivacyPolicy);

  // Fallback data
  const fallbackData = {
    title: "Privacy Policy",
    subtitle: "How we protect your information",
    content: `
      <h2>Information We Collect</h2>
      <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us.</p>
      
      <h2>How We Use Your Information</h2>
      <p>We use the information we collect to provide, maintain, and improve our services.</p>
      
      <h2>Information Sharing</h2>
      <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.</p>
      
      <h2>Data Security</h2>
      <p>We implement appropriate security measures to protect your personal information.</p>
      
      <h2>Contact Us</h2>
      <p>If you have any questions about this Privacy Policy, please contact us.</p>
    `,
    effective_date: new Date().toISOString().split("T")[0],
    last_updated: new Date().toISOString(),
    meta_title: "Privacy Policy - Floneo",
    meta_description:
      "Learn how Floneo protects your privacy and handles your personal information.",
  };

  // Use API data or fallback
  const data = privacyData || fallbackData;

  // Format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2ECC71] mx-auto mb-4"></div>
          <p className="text-gray-700">Loading Privacy Policy...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 mb-4">Failed to load Privacy Policy</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#2ECC71] hover:text-green-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-blue-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#2ECC71] hover:text-green-600 transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-[#2ECC71]" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              {data.title}
            </h1>
          </div>

          {data.subtitle && (
            <p className="text-xl text-gray-600 mb-6">{data.subtitle}</p>
          )}

          {/* Date Information */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Effective: {formatDate(data.effective_date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Last Updated: {formatDate(data.last_updated)}</span>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: data.content }}
              style={{
                color: "#374151",
              }}
            />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">
            Questions about our Privacy Policy?
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#2ECC71] hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
          >
            Contact Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
