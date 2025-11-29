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
    description: "Transform your business with our innovative automation platform",
    copyright_text: "© 2025 floneo. All rights reserved.",
    privacy_policy_text: "Privacy Policy",
    privacy_policy_url: "/privacy",
    terms_conditions_text: "Terms & Conditions",
    terms_conditions_url: "/terms",
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  return (
    <section className="bg-gray-100 py-12 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-[120rem] mx-auto">
        {/* Large floneo Branding - Responsive sizes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
          className="text-center mb-12 sm:mb-16 md:mb-24 lg:mb-32 overflow-hidden"
        >
          <h1
            className="
              text-[8rem]
              xs:text-[10rem]
              sm:text-[12rem]
              md:text-[16rem]
              lg:text-[22rem]
              xl:text-[28rem]
              text-[#0D1B2A]
              leading-none
              font-surgena
              font-semibold
              break-words
              px-2
            "
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {data.company_name}
          </h1>
        </motion.div>

        {/* Footer Links - Responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.6, 0.2, 1] }}
          className="
            flex 
            flex-col 
            sm:flex-row 
            justify-center 
            sm:justify-end 
            items-center 
            gap-4 
            sm:gap-6 
            md:gap-8
          "
        >
          <motion.a
            href="/privacy-policy"
            className="
              text-sm 
              sm:text-base 
              md:text-lg 
              font-medium 
              text-[#FF4FCB] 
              hover:opacity-80 
              transition-opacity 
              duration-200
              text-center
            "
            style={{ fontFamily: "'Poppins', sans-serif" }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a
            href="/terms/"
            className="
              text-sm 
              sm:text-base 
              md:text-lg 
              font-medium 
              text-black 
              hover:opacity-80 
              transition-opacity 
              duration-200
              text-center
            "
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
