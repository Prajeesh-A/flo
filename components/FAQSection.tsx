"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
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
          {faq.answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function FAQSection() {
  const faqs: FAQItem[] = [
    {
      question: "What is  floneo?",
      answer:
        " floneo is a comprehensive financial analytics platform that helps businesses track, analyze, and optimize their financial performance with AI-powered insights and real-time data visualization.",
    },
    {
      question: "How do I track my expenses?",
      answer:
        "You can track expenses through our intuitive dashboard by connecting your bank accounts, uploading receipts, or manually entering transactions. Our AI automatically categorizes expenses for better organization.",
    },
    {
      question: "How do I create an account?",
      answer:
        "Creating an account is simple! Click the 'Get Started' button, enter your email and basic information, verify your email address, and you'll be ready to start using  floneo's powerful features.",
    },
    {
      question: "How do I set up a budget?",
      answer:
        "Navigate to the Budget section in your dashboard, set spending limits for different categories, and our system will automatically track your progress and send alerts when you're approaching your limits.",
    },
    {
      question: "Is my data safe?",
      answer:
        "Absolutely! We use bank-level encryption, secure data centers, and comply with industry standards like SOC 2 and GDPR. Your financial data is protected with multiple layers of security.",
    },
    {
      question: "Can I set up bill reminders?",
      answer:
        "Yes! You can set up automated bill reminders for recurring payments. Our system will notify you before due dates and can even help you schedule automatic payments for better financial management.",
    },
  ];

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
              HELP CENTER
            </span>
          </div>
          <h2
            className="text-[#1E1E1E] text-5xl  mb-6"
            style={{ fontFamily: "'Poppins', semibold" }}
          >
            Architecting
            <br />
            Excellence
          </h2>
          <p
            className="text-gray-600 text-lg max-w-[500px] mx-auto leading-relaxed"
            style={{ fontFamily: "'Poppins'," }}
          >
            Together, we're creating a seamless experience that puts you in
            charge of your operations without bottlenecks.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-[900px] mx-auto">
          {faqs.map((faq, index) => (
            <FAQCard key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
