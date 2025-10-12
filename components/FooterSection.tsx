"use client";

import React from "react";
import { motion } from "framer-motion";
import { api, useApiData } from "@/lib/api";

export default function FooterSection() {
  // Fetch section data from API
  const {
    data: sectionData,
    loading,
    error,
  } = useApiData(api.getEnhancedFooterSection);

  // Fallback data
  const fallbackData = {
    company_name: "floneo",
    tagline: "Build. Automate. Scale.",
    description:
      "Transform your business with our innovative automation platform",
    copyright_text: "© 2025  floneo. All rights reserved.",
    privacy_policy_text: "Privacy Policy",
    privacy_policy_url: "/privacy",
    terms_conditions_text: "Terms & Conditions",
    terms_conditions_url: "/terms",
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  return (
    <section className="bg-gray-100 py-16 sm:py-32 px-4 sm:px-12">
      <div className="max-w-[120rem] mx-auto">
        {/* Large  floneo Branding */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
          className="text-center mb-16 sm:mb-32"
        >
          <h1 className="text-[22rem] sm:text-[14rem] md:text-[22rem] lg:text-[28rem] text-[#0D1B2A] leading-none font-surgena font-semibold">
            {data.company_name}
          </h1>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.6, 0.2, 1] }}
          className="flex justify-end items-center gap-8"
        >
          <motion.a
            href="/privacy-policy"
            className="text-lg font-medium text-[#FF4FCB] hover:opacity-80 transition-opacity duration-200"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a
            href="#"
            className="text-lg font-medium text-black hover:opacity-80 transition-opacity duration-200"
            style={{ fontFamily: "'Poppins', sans-serif" }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Terms and Condition
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
