"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { api, useApiData } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

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
    description:
      "Talk with our sales team to see how floneo can fit your needs.",
    form_name_placeholder: "Your Name",
    form_email_placeholder: "Your Email",
    form_company_placeholder: "Company Name",
    form_message_placeholder: "Tell us about your project...",
    form_submit_text: "Send Message",
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact-submissions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Reset form on success
        setFormData({
          name: "",
          email: "",
          company: "",
          message: "",
        });
        setSubmitStatus("success");
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 relative">
      {/* Back to Home Button - Floating */}
      <Link
        href="/"
        className="fixed top-6 left-6 z-50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/50"
      >
        <ArrowLeft size={20} />
        <span style={{ fontFamily: "'Poppins', sans-serif" }}>
          Back to Home
        </span>
      </Link>

      {/* Main Content - Two Column Layout */}
      <div className="max-w-6xl mx-auto flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* Left Column - Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-600/50 rounded-full flex items-center justify-center">
                <Mail className="w-4 h-4 text-gray-300" />
              </div>
              <h2
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Get in touch with us
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/30">
                <div className="flex justify-between items-center">
                  <span
                    className="text-gray-400 text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Email
                  </span>
                  <span
                    className="text-white text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    admin@floneo.co
                  </span>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/30">
                <div className="flex justify-between items-center">
                  <span
                    className="text-gray-400 text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Phone
                  </span>
                  <span
                    className="text-white text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    +1-234-567-890
                  </span>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-2xl p-4 border border-gray-600/30">
                <div className="flex justify-between items-center">
                  <span
                    className="text-gray-400 text-sm"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Address
                  </span>
                  <span
                    className="text-white text-sm text-right"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    San Francisco, CA USA
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50"
          >
            {/* Header with Icon */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gray-600/50 rounded-full flex items-center justify-center">
                <Send className="w-4 h-4 text-gray-300" />
              </div>
              <div>
                <h2
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Contact our sales team
                </h2>
                <p
                  className="text-gray-400 text-sm mt-1"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Talk with our sales team to see how floneo can fit your needs.
                </p>
              </div>
            </div>

            {/* Status Messages */}

            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-green-900/50 border border-green-700/50 text-green-300 px-6 py-4 rounded-2xl mb-6 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                  <p
                    className="font-semibold"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Thank you for your message!
                  </p>
                </div>
                <p
                  className="text-green-400 text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  We'll get back to you within 24 hours.
                </p>
              </motion.div>
            )}

            {submitStatus === "error" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-red-900/50 border border-red-700/50 text-red-300 px-6 py-4 rounded-2xl mb-6 text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <AlertCircle className="w-6 h-6 text-red-400 mr-2" />
                  <p
                    className="font-semibold"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Something went wrong.
                  </p>
                </div>
                <p
                  className="text-red-400 text-sm"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Please try again or contact us directly.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name and Last Name Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.name.split(" ")[0] || ""}
                    onChange={(e) => {
                      const lastName =
                        formData.name.split(" ").slice(1).join(" ") || "";
                      setFormData((prev) => ({
                        ...prev,
                        name: `${e.target.value} ${lastName}`.trim(),
                      }));
                    }}
                    required
                    placeholder="Jane"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.name.split(" ").slice(1).join(" ") || ""}
                    onChange={(e) => {
                      const firstName = formData.name.split(" ")[0] || "";
                      setFormData((prev) => ({
                        ...prev,
                        name: `${firstName} ${e.target.value}`.trim(),
                      }));
                    }}
                    required
                    placeholder="Smith"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="jane@floneo.co"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.company} // Using company field for phone
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        company: e.target.value,
                      }))
                    }
                    placeholder="+62-456-789"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>
              </div>

              {/* Pricing Package Dropdown */}
              <div>
                <label
                  htmlFor="package"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Pricing Package
                </label>
                <select
                  id="package"
                  name="package"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200 appearance-none cursor-pointer"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-400">
                    Select...
                  </option>
                  <option value="starter" className="text-white">
                    Starter Plan
                  </option>
                  <option value="professional" className="text-white">
                    Professional Plan
                  </option>
                  <option value="enterprise" className="text-white">
                    Enterprise Plan
                  </option>
                  <option value="custom" className="text-white">
                    Custom Solution
                  </option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-2"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Your message here
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder="Tell us about your project and requirements..."
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200 resize-none"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? "bg-gray-600 cursor-not-allowed text-gray-300"
                    : "bg-[#2ECC71] hover:bg-[#27AE60] text-white"
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  "Submit"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
