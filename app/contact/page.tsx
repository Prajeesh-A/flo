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
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Contact <span className="text-[#2ECC71]">Sales</span>
            </motion.h1>
            <p
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {data.description}
            </p>
          </motion.div>

          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            {/* Email Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#2ECC71] rounded-full flex items-center justify-center mb-6">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-xl font-bold text-black mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Email Us
                </h3>
                <p className="text-gray-600 mb-4">Get in touch via email</p>
                <a
                  href="mailto:admin@floneo.co"
                  className="text-[#2ECC71] hover:text-[#27AE60] font-semibold transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  admin@floneo.co
                </a>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#0066FF] rounded-full flex items-center justify-center mb-6">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-xl font-bold text-black mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Call Us
                </h3>
                <p className="text-gray-600 mb-4">Speak with our team</p>
                <a
                  href="tel:+1-555-123-4567"
                  className="text-[#0066FF] hover:text-[#0052CC] font-semibold transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  +1 (555) 123-4567
                </a>
              </div>
            </motion.div>

            {/* Location Card */}
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-[#FF4FCB] rounded-full flex items-center justify-center mb-6">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-xl font-bold text-black mb-3"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Visit Us
                </h3>
                <p className="text-gray-600 mb-4">Our headquarters</p>
                <p
                  className="text-[#FF4FCB] font-semibold text-center leading-relaxed"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  San Francisco, CA
                  <br />
                  United States
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100"
          >
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-white" />
                </div>
                <h2
                  className="text-4xl md:text-5xl font-bold text-black mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Get Started Today
                </h2>
                <p
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Ready to transform your business? Fill out the form below and
                  our team will get back to you within 24 hours.
                </p>
              </div>

              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 px-8 py-6 rounded-3xl mb-8 text-center shadow-lg"
                >
                  <div className="flex items-center justify-center mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                    <p
                      className="font-bold text-lg"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Thank you for your message!
                    </p>
                  </div>
                  <p
                    className="text-green-700"
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
                  className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-800 px-8 py-6 rounded-3xl mb-8 text-center shadow-lg"
                >
                  <div className="flex items-center justify-center mb-3">
                    <AlertCircle className="w-8 h-8 text-red-600 mr-3" />
                    <p
                      className="font-bold text-lg"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Something went wrong.
                    </p>
                  </div>
                  <p
                    className="text-red-700"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Please try again or contact us directly at admin@floneo.co
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-lg font-semibold text-gray-800 mb-3"
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
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#2ECC71]/20 focus:border-[#2ECC71] transition-all duration-300 text-lg shadow-sm hover:shadow-md"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-lg font-semibold text-gray-800 mb-3"
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
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#2ECC71]/20 focus:border-[#2ECC71] transition-all duration-300 text-lg shadow-sm hover:shadow-md"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                  </div>
                </div>

                {/* Company Field */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-lg font-semibold text-gray-800 mb-3"
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
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#2ECC71]/20 focus:border-[#2ECC71] transition-all duration-300 text-lg shadow-sm hover:shadow-md"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg font-semibold text-gray-800 mb-3"
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
                    rows={6}
                    placeholder={data.form_message_placeholder}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#2ECC71]/20 focus:border-[#2ECC71] transition-all duration-300 text-lg resize-none shadow-sm hover:shadow-md"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white shadow-xl hover:shadow-2xl"
                  }`}
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-6 h-6" />
                      {data.form_submit_text}
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
