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
import CountryCodeSelector, {
  defaultCountry,
  Country,
} from "@/components/CountryCodeSelector";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);
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
      // Combine country code with phone number
      const fullPhoneNumber = formData.phone
        ? `${selectedCountry.dialCode} ${formData.phone}`
        : "";

      // Prepare form data with full phone number
      const submissionData = {
        ...formData,
        phone: fullPhoneNumber,
      };

      // Use the same API client as other components
      await api.submitContactForm(submissionData);

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
      setSelectedCountry(defaultCountry);
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

      {/* Simplified Layout - Logo, Brand Name, and Contact Form Only */}
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen py-20">
        {/* Logo and Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Logo placeholder - you can replace with actual logo */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <span className="text-white font-bold text-xl">F</span>
          </div>

          {/* Brand Name */}
          <h1
            className="text-5xl font-bold text-white mb-2"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            floneo
          </h1>
          <p className="text-gray-400 text-lg">Get in touch with us</p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-gray-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-gray-700/50"
        >
          {/* Contact Form Header */}
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
                  <div className="flex">
                    <CountryCodeSelector
                      selectedCountry={selectedCountry}
                      onCountryChange={setSelectedCountry}
                      className="flex-shrink-0"
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="123-456-7890"
                      className="flex-1 px-4 py-3 bg-gray-700/50 border border-gray-600/50 border-l-0 rounded-r-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
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
