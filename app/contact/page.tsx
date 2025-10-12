"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Send } from "lucide-react";
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
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 sm:p-6 relative contact-page-container">
      <Link
        href="/"
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-gray-800/50 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full border border-gray-700/50 text-sm sm:text-base"
      >
        <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
        <span className="hidden sm:inline">Back to Home</span>
        <span className="sm:hidden">Back</span>
      </Link>

      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-screen py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <Image
              src="/logo.png"
              alt="Floneo Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-5xl font-bold text-white mb-2">floneo</h1>
          <p className="text-gray-400 text-lg">Get in touch with us</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full bg-gray-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-700/50 contact-form-mobile"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gray-600/50 rounded-full flex items-center justify-center">
              <Send className="w-4 h-4 text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Contact our sales team
            </h2>
          </div>

          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl"
            >
              <p className="text-green-400 text-center">
                Thank you for your message! We'll get back to you soon.
              </p>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl"
            >
              <p className="text-red-400 text-center">
                Sorry, there was an error sending your message. Please try
                again.
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your name"
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Phone
                </label>
                <div className="flex">
                  <CountryCodeSelector
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                    variant="contact-page"
                    className="flex-shrink-0 country-selector-mobile"
                  />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="123-456-7890"
                    className="flex-1 px-3 sm:px-4 py-3 bg-gray-700/50 border border-gray-600/50 border-l-0 rounded-r-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200 phone-input-mobile"
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Tell us about your project..."
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-[#2ECC71] focus:ring-1 focus:ring-[#2ECC71] transition-all duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#229954] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
