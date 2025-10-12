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

  // Fetch social media links from API
  const { data: socialLinks } = useApiData(api.getSocialMediaLinks);

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
      // Use the same API client as other components
      await api.submitContactForm(formData);

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

              {/* Social Media Links */}
              {socialLinks && socialLinks.length > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-600/30">
                  <h3
                    className="text-gray-400 text-sm mb-4"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Follow Us
                  </h3>
                  <div className="flex gap-3">
                    {socialLinks
                      .filter((link) => link.is_active)
                      .sort((a, b) => a.order - b.order)
                      .map((link) => (
                        <motion.a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-10 h-10 bg-gray-700/50 hover:bg-gray-600/50 rounded-xl flex items-center justify-center transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50"
                          title={link.platform_name || link.platform}
                        >
                          {link.platform === "linkedin" && (
                            <svg
                              className="w-5 h-5 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          )}
                          {link.platform === "twitter" && (
                            <svg
                              className="w-5 h-5 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          )}
                          {link.platform === "facebook" && (
                            <svg
                              className="w-5 h-5 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                          )}
                          {link.platform === "instagram" && (
                            <svg
                              className="w-5 h-5 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12.017 0C8.396 0 7.989.013 7.041.048 6.094.082 5.52.204 5.02.43c-.537.233-.99.542-1.44.992-.45.45-.76.903-.992 1.44-.226.5-.348 1.074-.382 2.021C2.175 6.99 2.162 7.397 2.162 11.017c0 3.621.013 4.028.048 4.976.034.947.156 1.521.382 2.021.233.537.542.99.992 1.44.45.45.903.76 1.44.992.5.226 1.074.348 2.021.382.948.035 1.355.048 4.976.048 3.621 0 4.028-.013 4.976-.048.947-.034 1.521-.156 2.021-.382.537-.233.99-.542 1.44-.992.45-.45.76-.903.992-1.44.226-.5.348-1.074.382-2.021.035-.948.048-1.355.048-4.976 0-3.621-.013-4.028-.048-4.976-.034-.947-.156-1.521-.382-2.021-.233-.537-.542-.99-.992-1.44-.45-.45-.903-.76-1.44-.992-.5-.226-1.074-.348-2.021-.382C16.045.013 15.638 0 12.017 0zM12.017 2.162c3.557 0 3.98.013 5.385.048.3.014.611.071.918.166.39.12.74.295 1.065.62.325.324.5.674.62 1.065.095.307.152.618.166.918.035 1.405.048 1.828.048 5.385 0 3.557-.013 3.98-.048 5.385-.014.3-.071.611-.166.918-.12.39-.295.74-.62 1.065-.324.325-.674.5-1.065.62-.307.095-.618.152-.918.166-1.405.035-1.828.048-5.385.048-3.557 0-3.98-.013-5.385-.048-.3-.014-.611-.071-.918-.166-.39-.12-.74-.295-1.065-.62-.325-.324-.5-.674-.62-1.065-.095-.307-.152-.618-.166-.918C2.175 15.997 2.162 15.574 2.162 12.017c0-3.557.013-3.98.048-5.385.014-.3.071-.611.166-.918.12-.39.295-.74.62-1.065.324-.325.674-.5 1.065-.62.307-.095.618-.152.918-.166 1.405-.035 1.828-.048 5.385-.048z" />
                              <path d="M12.017 5.838a6.179 6.179 0 1 0 0 12.358 6.179 6.179 0 0 0 0-12.358zM12.017 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                              <path d="M19.846 5.595a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
                            </svg>
                          )}
                          {link.platform === "youtube" && (
                            <svg
                              className="w-5 h-5 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                          )}
                          {![
                            "linkedin",
                            "twitter",
                            "facebook",
                            "instagram",
                            "youtube",
                          ].includes(link.platform) && (
                            <svg
                              className="w-5 h-5 text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          )}
                        </motion.a>
                      ))}
                  </div>
                </div>
              )}
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
