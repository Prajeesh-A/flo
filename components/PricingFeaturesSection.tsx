"use client";

import { motion } from "framer-motion";
import { api, useApiData } from "@/lib/api";

interface FeatureItem {
  name: string;
  mini: string | boolean;
  basic: string | boolean;
  pro: string | boolean;
}

interface FeatureCategory {
  title: string;
  icon: string;
  features: FeatureItem[];
}

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13.5 4.5L6 12L2.5 8.5"
      stroke="#00FF3C"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="#FF4444"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FeatureRow = ({
  feature,
  index,
}: {
  feature: FeatureItem;
  index: number;
}) => {
  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === "boolean") {
      return value ? <CheckIcon /> : <CrossIcon />;
    }
    return (
      <div className="flex items-center gap-2">
        <CheckIcon />
        <span className="text-[#333333] text-sm">{value}</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.2, 0.6, 0.2, 1],
      }}
      className="py-4 border-b border-gray-100 last:border-b-0"
    >
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-4 gap-6">
        <div className="text-[#333333] text-sm font-medium">{feature.name}</div>
        <div className="flex justify-center">
          {renderFeatureValue(feature.mini)}
        </div>
        <div className="flex justify-center">
          {renderFeatureValue(feature.basic)}
        </div>
        <div className="flex justify-center">
          {renderFeatureValue(feature.pro)}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="text-[#333333] text-sm font-medium mb-3">
          {feature.name}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Mini</div>
            {renderFeatureValue(feature.mini)}
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Basic</div>
            {renderFeatureValue(feature.basic)}
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-1">Pro</div>
            {renderFeatureValue(feature.pro)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCategorySection = ({
  category,
  index,
}: {
  category: FeatureCategory;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.2, 0.6, 0.2, 1],
      }}
      className="mb-12"
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-6 h-6 text-[#0066FF]">
          <span className="text-xl">{category.icon}</span>
        </div>
        <h3
          className="text-[#1E1E1E] text-xl font-semibold"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          {category.title}
        </h3>
      </div>

      {/* Features List */}
      <div className="bg-white rounded-[16px] border border-gray-200 p-6">
        {category.features.map((feature, featureIndex) => (
          <FeatureRow
            key={feature.name}
            feature={feature}
            index={featureIndex}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function PricingFeaturesSection() {
  // Fetch section data from API
  const {
    data: sectionData,
    loading,
    error,
  } = useApiData(api.getPricingFeaturesSection);

  // Fallback data
  const fallbackData = {
    title: "Feature Comparison",
    subtitle: "Choose Your Plan",
    description:
      "Compare features across all our pricing plans to find the perfect fit for your business",
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  const featureCategories: FeatureCategory[] = [
    {
      title: "General",
      icon: "",
      features: [
        {
          name: "Transactions",
          mini: "20 transactions",
          basic: "100 transactions",
          pro: "Unlimited transactions",
        },
        {
          name: "Authentication",
          mini: "Basic authentication",
          basic: "Basic authentication",
          pro: "Two-factor authentication",
        },
        {
          name: "Notifications",
          mini: "Default notifications",
          basic: "Custom notifications",
          pro: "Custom notifications",
        },
      ],
    },
    {
      title: "Features",
      icon: "",
      features: [
        {
          name: "Cloud sync",
          mini: "Daily cloud sync",
          basic: "Per transaction cloud sync",
          pro: "Per transaction cloud sync",
        },
        {
          name: "Dashboard",
          mini: "Default dashboard",
          basic: "Default dashboard",
          pro: "Custom dashboard",
        },
        {
          name: "Analytics",
          mini: "Monthly analytics",
          basic: "Weekly analytics",
          pro: "Custom analytics",
        },
        {
          name: "API integration",
          mini: false,
          basic: false,
          pro: true,
        },
      ],
    },
    {
      title: "Support",
      icon: "",
      features: [
        {
          name: "Support type",
          mini: "Community support",
          basic: "Community support",
          pro: "Community support",
        },
      ],
    },
  ];

  return (
    <section className="bg-[#F8F9FA] py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
          className="text-center mb-16"
        >
          <h2
            className="text-[#1E1E1E] text-4xl font-bold mb-6"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {data.title}
          </h2>
          <p
            className="text-[#666666] text-lg max-w-[600px] mx-auto leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Compare all features across our pricing plans to find the perfect
            fit for your needs.
          </p>
        </motion.div>

        {/* Column Headers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.6, 0.2, 1] }}
          className="hidden md:grid grid-cols-4 gap-6 mb-8 pb-4 border-b-2 border-gray-300"
        >
          <div></div>
          <div className="text-center">
            <h3
              className="text-[#1E1E1E] text-lg font-semibold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Mini
            </h3>
            <p className="text-[#666666] text-sm">$5/month</p>
          </div>
          <div className="text-center">
            <h3
              className="text-[#1E1E1E] text-lg font-semibold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Basic
            </h3>
            <p className="text-[#666666] text-sm">$10/month</p>
          </div>
          <div className="text-center">
            <h3
              className="text-[#1E1E1E] text-lg font-semibold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Pro
            </h3>
            <p className="text-[#666666] text-sm">$20/month</p>
          </div>
        </motion.div>

        {/* Feature Categories */}
        {featureCategories.map((category, index) => (
          <FeatureCategorySection
            key={category.title}
            category={category}
            index={index}
          />
        ))}

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.2, 0.6, 0.2, 1],
          }}
          className="mb-12"
        >
          {/* Support Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-6 text-[#0066FF]">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="#0066FF"
                />
              </svg>
            </div>
            <h3
              className="text-[#1E1E1E] text-xl font-semibold"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Support
            </h3>
          </div>

          {/* Support Grid */}
          <div className="bg-white rounded-[16px] border border-gray-200 p-6">
            <div className="grid md:grid-cols-4 gap-6">
              <div></div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon />
                  <span className="text-[#333333] text-sm">
                    Community support
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon />
                  <span className="text-[#333333] text-sm">
                    Community support
                  </span>
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <CheckIcon />
                  <span className="text-[#333333] text-sm">
                    Community support
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Custom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.2, 0.6, 0.2, 1],
          }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-[#1E90FF] to-[#FF1493] rounded-[24px] p-8 text-white">
            <div className="max-w-[600px]">
              <h3
                className="text-2xl font-bold mb-4 text-white"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Need something special?
              </h3>
              <p
                className="text-white text-base mb-6 leading-relaxed"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Our new custom plans unlock advanced features and expanded
                limits, making them ideal for startups, growing teams, and
                businesses with unique requirements.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#1E90FF] px-8 py-3 rounded-full font-semibold text-sm hover:bg-gray-50 transition-colors duration-200"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
