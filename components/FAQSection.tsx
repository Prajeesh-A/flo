"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
        className="w-full bg-[#2C2C2E] hover:bg-[#FFC107] rounded-3xl px-8 py-6 text-left transition-colors duration-200 group"
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
  // URGENT FIX: Use correct API endpoint that exists
  // FAQ Section metadata - using hardcoded for now since /api/faq/ doesn't exist
  const faqSectionData = {
    title: "Architecting Excellence",
    subtitle: "HELP CENTER",
    description:
      "Together, we're creating a seamless experience that puts you in charge of your operations without bottlenecks.",
    is_visible: true,
  };
  const faqSectionError = null;

  // DIRECT API FETCH - Simple solution that works
  const [faqItems, setFaqItems] = useState<any[]>([]);
  const [faqItemsLoading, setFaqItemsLoading] = useState(true);
  const [faqItemsError, setFaqItemsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setFaqItemsLoading(true);
        const API_BASE_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "https://flo-do2v.onrender.com/api";
        const response = await fetch(`${API_BASE_URL}/faq-items/`, {
          signal: AbortSignal.timeout(5000), // Add timeout
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🎯 DIRECT API RESPONSE:", data);
        setFaqItems(data.results || []);
        setFaqItemsError("");
      } catch (error) {
        console.error("❌ FAQ API Error:", error);
        setFaqItemsError(
          error instanceof Error ? error.message : "Unknown error"
        );
        setFaqItems([]); // This triggers fallback
      } finally {
        setFaqItemsLoading(false); // This MUST run
      }
    };

    fetchFAQs();
  }, []); // Empty dependency array

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
      question: "How to view the demo?",
      answer:
        "Demo will be ready by Nov 20'th 2025. Please reserve your slot in contact details.",
      order: 1,
      is_active: true,
    },
    {
      id: 2,
      question: "How AI assists floneo?",
      answer:
        "With floneo, the workflow includes AI blocks that empower users to build and integrate custom functionalities.",
      order: 2,
      is_active: true,
    },
    {
      id: 3,
      question: "Is floneo designed for a non-technical audience?",
      answer:
        "Floneo is exceptionally user-friendly, allowing users to create or manage applications without requiring any technical skills.",
      order: 3,
      is_active: true,
    },
    {
      id: 4,
      question: "Is floneo optimized for particular market sectors?",
      answer:
        "floneo is highly versatile, capable of building applications for any type of business, including Startups, FinTech, BFSI, Energy, Manufacturing, Retail, and more.",
      order: 4,
      is_active: true,
    },
    {
      id: 5,
      question: "What are the floneo licensing models?",
      answer:
        "Currently, we are offering floneo under three subscription based licensing models: Basic, Pro, and Enterprise.",
      order: 5,
      is_active: true,
    },
    {
      id: 6,
      question: "How about on-premise deployment?",
      answer:
        "Yes, floneo has the flexibility of deploying on premises, private cloud, and as service also.",
      order: 6,
      is_active: true,
    },
  ];

  // SIMPLE LOGIC - Use API data if available, otherwise fallback
  const sectionData = faqSectionData;
  const shouldUseApiData = faqItems && faqItems.length > 0;
  const finalFaqItems = shouldUseApiData ? faqItems : defaultFaqItems;

  // console.log("🎯 SIMPLE FAQ DEBUG:", {
  //   apiItemsCount: faqItems?.length || 0,
  //   shouldUseApiData,
  //   finalItemsCount: finalFaqItems.length,
  //   source: shouldUseApiData ? "✅ API" : "⚠️ FALLBACK",
  //   firstApiItem: faqItems?.[0]?.question,
  //   loading: faqItemsLoading,
  //   error: faqItemsError,
  // });

  return (
    <section id="help" className="relative bg-white py-[100px] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
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
              {faqItemsLoading ? "LOADING..." : sectionData.subtitle}
            </span>
          </div>
          <h2 className="text-[#1E1E1E] text-5xl mb-6 font-surgena font-semibold">
            {faqItemsLoading ? "Loading..." : sectionData.title}
          </h2>
          <div className="text-gray-600 text-lg max-w-[500px] mx-auto leading-relaxed">
            <RichTextRenderer
              content={
                faqItemsLoading
                  ? "Loading description..."
                  : sectionData.description
              }
              fallback="Find answers to common questions"
            />
          </div>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:items-start max-w-full mx-auto">
          {faqItemsLoading ? (
            // Loading state
            <div className="col-span-full text-center py-12">
              <div className="text-gray-600 text-lg">Loading FAQ items...</div>
            </div>
          ) : finalFaqItems.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <div className="text-gray-600 text-lg">
                No FAQ items available.
              </div>
            </div>
          ) : (
            <>
              {/* Left Column - Even indices (0, 2, 4, ...) */}
              <div className="flex flex-col gap-6">
                {finalFaqItems
                  .filter((_: any, index: number) => index % 2 === 0)
                  .map((faq: any, index: number) => (
                    <FAQCard
                      key={faq.id || index * 2}
                      faq={faq}
                      index={index * 2}
                    />
                  ))}
              </div>

              {/* Right Column - Odd indices (1, 3, 5, ...) */}
              <div className="flex flex-col gap-6">
                {finalFaqItems
                  .filter((_: any, index: number) => index % 2 === 1)
                  .map((faq: any, index: number) => (
                    <FAQCard
                      key={faq.id || index * 2 + 1}
                      faq={faq}
                      index={index * 2 + 1}
                    />
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
