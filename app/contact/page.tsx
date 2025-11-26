"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Send, Mail, MessageSquare } from "lucide-react";
import { api } from "@/lib/api";
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [selectedCountry, setSelectedCountry] =
    useState<Country>(defaultCountry);

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
      const submissionData = {
        ...formData,
        phone: formData.phone
          ? `${selectedCountry.dialCode} ${formData.phone}`
          : "",
      };

      await api.submitContactForm(submissionData);

      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      });
      setSubmitStatus("success");
      
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0,0,0,0.02) 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      {/* Back Button */}
      <Link
        href="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 group"
      >
        <div className="flex items-center gap-2 bg-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-full shadow-sm border border-gray-200 group-hover:shadow-md group-hover:border-gray-300 transition-all duration-200">
          <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600 group-hover:text-gray-900" />
          <span className="font-medium text-sm sm:text-base text-gray-600 group-hover:text-gray-900">Back</span>
        </div>
      </Link>

      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Top Section - Logo, Title & Contact Info (Mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 sm:mb-12 lg:hidden text-center"
        >
          {/* Logo & Brand */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 mb-4 mx-auto">
            <Image
              src="/logo.png"
              alt="Floneo Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Let's talk
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed px-4">
            Ready to transform your business? Our team is here to help you get started.
          </p>

          {/* Contact Info Cards - Mobile (Top) */}
          <div className="flex flex-col space-y-3 mt-6 px-2">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">Email us</h3>
                <p className="text-gray-600 text-xs">hello@floneo.com</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div className="w-9 h-9 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-0.5 text-sm">Response time</h3>
                <p className="text-gray-600 text-xs">Within 24 hours</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
          {/* Left Column - Content (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block lg:sticky lg:top-24"
          >
            {/* Logo & Brand */}
            <div className="mb-8 sm:mb-10">
              <div className="w-14 h-14 mb-6">
                <Image
                  src="/logo.png"
                  alt="Floneo Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Let's talk
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                Ready to transform your business? Our team is here to help you get started.
              </p>
            </div>

            {/* Contact Info Cards - Desktop */}
            <div className="flex flex-col space-y-4 mt-12">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Email us</h3>
                  <p className="text-gray-600 text-sm">hello@floneo.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Response time</h3>
                  <p className="text-gray-600 text-sm">Within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 shadow-xl border border-gray-200 mx-auto" style={{ maxWidth: '600px' }}>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              {/* Success/Error Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-2 sm:gap-3"
                >
                  <div className="text-green-600 mt-0.5">✓</div>
                  <div>
                    <p className="font-semibold text-green-900 mb-1 text-sm sm:text-base">Message sent!</p>
                    <p className="text-green-700 text-xs sm:text-sm">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-red-900 font-medium mb-1 text-sm sm:text-base">Something went wrong</p>
                  <p className="text-red-700 text-xs sm:text-sm">
                    Please try again or email us directly at hello@floneo.com
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* Name - NO ICON */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                  >
                    Full name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none"
                  />
                </div>

                {/* Email - NO ICON */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                  >
                    Work email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@company.com"
                    className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none"
                  />
                </div>

                {/* Company - NO ICON */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                  >
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                    className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                  >
                    Phone number
                  </label>
                  <div className="flex gap-2">
                    <CountryCodeSelector
                      selectedCountry={selectedCountry}
                      onCountryChange={setSelectedCountry}
                      variant="contact-page"
                      className="flex-shrink-0"
                      theme="light"
                    />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="123-456-7890"
                      className="flex-1 px-3 sm:px-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none min-w-0"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Tell us about your project and how we can help..."
                    className="w-full px-4 py-3 sm:py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 outline-none resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3.5 sm:py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Send message</span>
                    </>
                  )}
                </button>

                <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                  By submitting this form, you agree to our{" "}
                  <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    privacy policy
                  </a>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
