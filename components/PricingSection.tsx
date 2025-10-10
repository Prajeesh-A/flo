"use client";

import { motion } from "framer-motion";
import { api, useApiData } from "@/lib/api";

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonStyle: "primary" | "secondary" | "success";
  isPopular?: boolean;
  delay?: number;
}

const PricingCard = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonStyle,
  isPopular = false,
  delay = 0,
}: PricingCardProps) => {
  const getButtonClasses = () => {
    switch (buttonStyle) {
      case "primary":
        return "bg-[#0066FF] hover:bg-[#0052CC] text-white";
      case "secondary":
        return "bg-[#0066FF] hover:bg-[#0052CC] text-white";
      case "success":
        return "bg-white hover:bg-gray-50 text-[#1E1E1E] border border-gray-200";
      default:
        return "bg-[#0066FF] hover:bg-[#0052CC] text-white";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.2, 0.6, 0.2, 1],
      }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      }}
      className={`relative bg-[#1E1E1E] rounded-[32px] p-8 shadow-[0_12px_32px_rgba(0,0,0,0.15)] transition-all duration-300 min-h-[480px] flex flex-col ${
        isPopular ? "ring-2 ring-[#00FF3C]" : ""
      }`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 right-6">
          <div className="bg-[#00FF3C] text-black px-3 py-1 rounded-full text-xs font-semibold">
            POPULAR
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          <div className="flex items-center gap-1">
            <span className="text-[#00FF3C] text-xs font-medium">YEARLY</span>
            <div className="w-2 h-2 bg-[#00FF3C] rounded-full"></div>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-3">
          <span className="text-white text-4xl font-bold">{price}</span>
          <span className="text-gray-400 text-sm">/{period}</span>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Features */}
      <div className="mb-8">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#00FF3C] flex items-center justify-center mt-0.5 flex-shrink-0">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 3L4.5 8.5L2 6"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-gray-300 text-sm leading-relaxed">
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button */}
      <div className="mt-auto">
        <button
          className={`w-full py-4 px-6 rounded-[16px] font-semibold text-sm transition-all duration-300 ${getButtonClasses()}`}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

export default function PricingSection() {
  // Fetch pricing data from API
  const { data: pricingSection, loading: sectionLoading } = useApiData(
    api.getPricingSection
  );
  const { data: pricingPlans, loading: plansLoading } = useApiData(
    api.getPricingPlans
  );

  // Fallback data for when API is loading or fails
  const fallbackPlans = [
    {
      title: "Mini",
      price: "5$",
      period: "month",
      description:
        "Perfect for individuals or small projects with essential features.",
      features: [
        "Up to 3 projects",
        "Basic analytics",
        "Email support",
        "5GB storage",
        "Standard templates",
      ],
      buttonText: "Buy Package",
      buttonStyle: "primary" as const,
      isPopular: false,
    },
    {
      title: "Basic",
      price: "10$",
      period: "month",
      description: "Ideal for growing teams with core tools and functionality.",
      features: [
        "Up to 10 projects",
        "Advanced analytics",
        "Priority support",
        "50GB storage",
        "Custom templates",
        "Team collaboration",
      ],
      buttonText: "Buy Package",
      buttonStyle: "secondary" as const,
      isPopular: false,
    },
    {
      title: "Pro",
      price: "20$",
      period: "month",
      description:
        "Advanced features and higher limits for scaling businesses.",
      features: [
        "Unlimited projects",
        "Premium analytics",
        "24/7 phone support",
        "500GB storage",
        "White-label options",
        "Advanced integrations",
        "Custom workflows",
      ],
      buttonText: "Buy Package",
      buttonStyle: "success" as const,
      isPopular: true,
    },
  ];

  // Transform API data to component format
  const transformedPlans =
    pricingPlans?.map((plan, index) => ({
      title: plan.name,
      price: `$${plan.price}`,
      period: plan.price_period,
      description: plan.description,
      features: plan.features?.map((f) => f.feature_text) || [],
      buttonText: plan.cta_text,
      buttonStyle: plan.is_popular
        ? "success"
        : ((index === 0 ? "primary" : "secondary") as const),
      isPopular: plan.is_popular,
    })) || fallbackPlans;

  return (
    <section className="bg-white py-[80px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
          className="text-center mb-16"
        >
          <div className="mb-4">
            <span
              className="text-[#0066FF] text-sm font-medium tracking-wider uppercase"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              PRICING
            </span>
          </div>
          <h2
            className="text-[#1E1E1E] text-5xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {sectionLoading
              ? "Loading..."
              : pricingSection?.title || "Architecting Excellence"}
          </h2>
          <p
            className="text-[#666666] text-lg max-w-[500px] mx-auto leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {sectionLoading
              ? "Loading..."
              : pricingSection?.description ||
                "Together, we're creating a seamless experience that puts you in charge of your operations without bottlenecks."}
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plansLoading
            ? // Loading state
              [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-[24px] p-8 animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6"></div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                  </div>
                </div>
              ))
            : transformedPlans.map((plan, index) => (
                <PricingCard key={plan.title} {...plan} delay={index * 0.1} />
              ))}
        </div>
      </div>
    </section>
  );
}
