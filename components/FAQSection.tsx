"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useApiData } from "../lib/api-swr";
import { api } from "../lib/api";
import { RichTextRenderer } from "./SafeHTMLRenderer";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
  is_active: boolean;
}

interface FAQSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  background_color: string;
}

const PlusIcon = ({
  isOpen,
  isHovered,
}: {
  isOpen: boolean;
  isHovered: boolean;
}) => (
  <motion.svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    animate={{ rotate: isOpen ? 45 : 0 }}
    transition={{ duration: 0.2 }}
  >
    <path
      d="M12 5V19M5 12H19"
      stroke={isHovered ? "black" : "white"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
);

const FAQCard = ({ faq, index }: { faq: FAQItem; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.2, 0.6, 0.2, 1],
      }}
      className="w-full"
    >
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full bg-[#2C2C2E] hover:bg-[#FFC107] rounded-[32px] px-8 py-6 text-left transition-colors duration-200 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <span
            className="text-white group-hover:text-black text-lg font-medium transition-colors duration-200"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {faq.question}
          </span>
          <PlusIcon isOpen={isOpen} isHovered={isHovered} />
        </div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="overflow-hidden"
      >
        <div className="px-8 py-5 text-[#666666] text-base leading-relaxed">
          <RichTextRenderer
            content={faq.answer}
            fallback="Answer not available"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function FAQSection() {
  // Fetch FAQ section data from API
  const {
    data: faqSectionData,
    loading: faqSectionLoading,
    error: faqSectionError,
  } = useApiData(api.getFAQSection);

  // Fetch FAQ items from API
  const {
    data: faqItems,
    loading: faqItemsLoading,
    error: faqItemsError,
  } = useApiData(api.getFAQItems);

  // Fallback data for FAQ section
  const defaultFaqSection = {
    title: "Frequently Asked Questions",
    subtitle: "Help Center",
    description: "Find answers to common questions",
    is_visible: true,
  };

  // Fallback data for FAQ items
  const defaultFaqItems: FAQItem[] = [
    {
      id: 1,
      question: "What is FloNeo?",
      answer:
        "FloNeo is a comprehensive Low-Code/No-Code platform that helps businesses turn manual processes into instant, powerful applications.",
      order: 1,
      is_active: true,
    },
    {
      id: 2,
      question: "How do I get started?",
      answer:
        "Getting started is simple! Click the 'Get Started' button, create your account, and you'll be ready to start building applications in minutes.",
      order: 2,
      is_active: true,
    },
    {
      id: 3,
      question: "Is my data secure?",
      answer:
        "Absolutely! We use enterprise-grade security, encryption, and comply with industry standards to keep your data safe and secure.",
      order: 3,
      is_active: true,
    },
  ];

  // URGENT FIX: Force API data only - no fallbacks
  const sectionData = faqSectionData;
  const faqs = faqItems;

  // Show if we're using fallback data
  const usingFallbackSection = !faqSectionData || faqSectionError;
  const usingFallbackItems = !faqItems || faqItemsError;

  // URGENT: Don't render if no API data
  if (!sectionData || !faqs) {
    return (
      <section
        id="help"
        className="relative bg-white py-[100px] overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>🚨 URGENT:</strong> FAQ Section API not working!
            <br />
            Section Error: {faqSectionError || "No data"}
            <br />
            Items Error: {faqItemsError || "No data"}
            <br />
            Check Django admin and API connectivity immediately!
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="help" className="relative bg-white py-[100px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Debug indicator for fallback data */}
        {(usingFallbackSection || usingFallbackItems) && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 text-sm">
            <strong>Debug:</strong> Using fallback data -
            {usingFallbackSection && " FAQ section"}
            {usingFallbackSection && usingFallbackItems && ","}
            {usingFallbackItems && " FAQ items"} not loaded from API
          </div>
        )}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.2, 0.6, 0.2, 1] }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full border-2 border-gray-400 flex items-center justify-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
            <span
              className="text-gray-600 text-sm font-medium tracking-wider uppercase"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              {faqSectionLoading ? "LOADING..." : sectionData.subtitle}
            </span>
          </div>
          <h2 className="text-[#1E1E1E] text-5xl mb-6 font-surgena font-semibold">
            {faqSectionLoading ? "Loading..." : sectionData.title}
          </h2>
          <div className="text-gray-600 text-lg max-w-[500px] mx-auto leading-relaxed">
            <RichTextRenderer
              content={
                faqSectionLoading
                  ? "Loading description..."
                  : sectionData.description
              }
              fallback="Find answers to common questions"
            />
          </div>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {faqItemsLoading ? (
            // Loading state
            <div className="col-span-full text-center py-12">
              <div className="text-gray-600 text-lg">Loading FAQ items...</div>
            </div>
          ) : faqItemsError ? (
            // Error state
            <div className="col-span-full text-center py-12">
              <div className="text-red-600 text-lg">
                Failed to load FAQ items. Using default content.
              </div>
            </div>
          ) : faqs.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <div className="text-gray-600 text-lg">
                No FAQ items available.
              </div>
            </div>
          ) : (
            // FAQ items
            faqs.map((faq, index) => (
              <FAQCard key={faq.id || index} faq={faq} index={index} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
