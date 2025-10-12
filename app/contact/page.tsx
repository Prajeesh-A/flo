"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { api, useApiData } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Fetch contact section data from API
  const {
    data: sectionData,
    loading,
    error,
  } = useApiData(api.getContactSection);

  // Fallback data
  const fallbackData = {
    title: "Contact Our Sales Team",
    subtitle: "Get in Touch",
    description: "Talk with our sales team to see how floneo can fit your needs.",
    form_name_placeholder: "Your Name",
    form_email_placeholder: "Your Email",
    form_company_placeholder: "Company Name",
    form_message_placeholder: "Tell us about your project...",
    form_submit_text: "Send Message",
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      });
      setSubmitStatus("success");
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10">
                <Image
                  src="/logo.png"
                  alt="floneo Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <span 
                className="text-2xl font-bold text-black"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                floneo
              </span>
            </Link>

            {/* Back to Home */}
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft size={20} />
              <span style={{ fontFamily: "'Poppins', sans-serif" }}>
                Back to Home
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-black mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Contact <span className="text-[#2ECC71]">Sales</span>
            </motion.h1>
            <p 
              className="text-xl text-gray-600 max-w-2xl mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {data.description}
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="max-w-2xl mx-auto">
              <h2 
                className="text-3xl font-bold text-black mb-8 text-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Get Started Today
              </h2>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-2xl mb-8 text-center"
                >
                  <p className="font-semibold">Thank you for your message!</p>
                  <p className="text-sm">We'll get back to you within 24 hours.</p>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl mb-8 text-center"
                >
                  <p className="font-semibold">Something went wrong.</p>
                  <p className="text-sm">Please try again or contact us directly.</p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder={data.form_name_placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder={data.form_email_placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>

                {/* Company Field */}
                <div>
                  <label 
                    htmlFor="company" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={data.form_company_placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    placeholder={data.form_message_placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-[#2ECC71] focus:border-transparent transition-all duration-200 resize-none"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-200 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#2ECC71] hover:bg-[#27AE60] text-white shadow-lg hover:shadow-xl"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {isSubmitting ? "Sending..." : data.form_submit_text}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
