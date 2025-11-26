"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { api, useApiData } from "@/lib/api";
import { useCTAModal } from "@/contexts/CTAModalContext";
import { RichTextRenderer } from "@/components/SafeHTMLRenderer";
import { 
  Shield, 
  Cloud, 
  Zap, 
  Monitor, 
  AlertTriangle, 
  Lightbulb, 
  BarChart3, 
  LayoutDashboard,
  Plus
} from "lucide-react";
import { Urbanist, Poppins } from "next/font/google";

// Font configurations
const urbanist = Urbanist({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

export default function BenefitsSection() {
  const { data: sectionData } = useApiData(api.getBenefitsSection);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const fallbackData = {
    badge_text: "BENEFITS",
    title: "More than",
    subtitle: "Automation",
    description:
      "Floneo isn't just about managing processes — it builds, automates, and scales the workflows that fuel your business.",
    cta_primary_text: "Get Started",
    cta_secondary_text: "Learn More",
    benefits: [
      {
        id: 1,
        title: "Top Security",
        color: "green",
        position: "top-left",
      },
      {
        id: 2,
        title: "Cloud Sync",
        color: "yellow",
        position: "top-center",
      },
      {
        id: 3,
        title: "Fast Transactions",
        color: "green",
        position: "top-right",
      },
      {
        id: 4,
        title: "Cloud Sync",
        color: "yellow",
        position: "middle-left",
      },
      {
        id: 5,
        title: "Top Security",
        color: "green",
        position: "middle-right",
      },
      {
        id: 6,
        title: "Top Security",
        color: "green",
        position: "bottom-left",
      },
      {
        id: 7,
        title: "Cloud Sync",
        color: "yellow",
        position: "bottom-right",
      },
      {
        id: 8,
        title: "Customizable Dashboards",
        color: "blue",
        position: "bottom-center",
      },
    ],
  };

  const data = sectionData || fallbackData;

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isMobile = useIsMobile();
  const { openModal } = useCTAModal();

  const { data: socialLinks } = useApiData(api.getSocialMediaLinks);

  const linkedInLink = socialLinks?.find(
    (link) =>
      link.platform.toLowerCase() === "linkedin" ||
      link.platform_name?.toLowerCase().includes("linkedin")
  );
  const linkedInUrl = linkedInLink?.url || "#";

  // Icon mapping by index
  const getIconByIndex = (index: number) => {
    const icons = [
      Shield,        // 0 - Top Security
      Cloud,         // 1 - Cloud Sync
      Monitor,       // 2 - Fast Transactions
      Cloud,         // 3 - Cloud Sync
      Shield,        // 4 - Top Security
      Monitor,       // 5 - Top Security
      Cloud,         // 6 - Cloud Sync
      LayoutDashboard, // 7 - Customizable Dashboards
    ];
    
    return icons[index] || Cloud;
  };

  const getIconColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      yellow: "bg-yellow-400",
      green: "bg-green-400",
      blue: "bg-blue-500",
      orange: "bg-orange-400",
    };
    
    return colorMap[color?.toLowerCase()] || "bg-yellow-400";
  };

  const getPositionClasses = (position: string) => {
    const positionMap: Record<string, string> = {
      "top-left": "top-24 md:top-32 lg:top-40 left-8 md:left-12 lg:left-24",
      "top-center": "top-16 md:top-20 lg:top-24 left-1/2 -translate-x-1/2",
      "top-right": "top-24 md:top-32 lg:top-40 right-8 md:right-12 lg:right-24",
      "middle-left": "top-1/2 left-8 md:left-12 lg:left-20 -translate-y-1/2",
      "middle-right": "top-1/2 right-8 md:right-12 lg:right-20 -translate-y-1/2",
      "bottom-left": "bottom-24 md:bottom-32 lg:bottom-40 left-8 md:left-12 lg:left-24",
      "bottom-right": "bottom-24 md:bottom-32 lg:bottom-40 right-8 md:right-12 lg:right-24",
      "bottom-center": "bottom-16 md:bottom-20 lg:bottom-24 left-1/2 -translate-x-1/2",
    };
    
    return positionMap[position] || "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  };

  // Determine which features to show
  const displayedFeatures = showAllFeatures ? data.benefits : data.benefits?.slice(0, 3);
  const hasMoreFeatures = data.benefits && data.benefits.length > 3;

  return (
    <>
      {/* Benefits Section with Floating Pills */}
      <section
        id="services"
        ref={sectionRef}
        className="relative min-h-screen overflow-hidden flex items-center justify-center py-16 md:py-20 lg:py-24 px-4"
        style={{
          background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 50%, #a5d6a7 100%)",
        }}
      >
        {/* Desktop & Tablet - Floating Pills */}
        <div className="hidden md:block absolute inset-0">
          {data.benefits?.map((benefit: any, index: number) => {
            const IconComponent = getIconByIndex(index);
            
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        y: [0, -10, 0],
                      }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  scale: { duration: 0.5, delay: index * 0.1 },
                  y: {
                    duration: 2.5 + index * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3 + 0.5,
                  },
                }}
                className={`absolute ${getPositionClasses(benefit.position)} z-10`}
              >
                <div className="flex items-center gap-2 md:gap-3 bg-gray-900 rounded-full px-4 md:px-5 py-2.5 md:py-3 shadow-xl">
                  <div
                    className={`w-9 h-9 md:w-10 md:h-10 rounded-full ${getIconColorClass(
                      benefit.color
                    )} flex items-center justify-center flex-shrink-0`}
                  >
                    <IconComponent size={20} className="text-gray-900" strokeWidth={2.5} />
                  </div>
                  <span className="text-white font-medium text-sm pr-2 whitespace-nowrap">
                    {benefit.title}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Central Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/30 backdrop-blur-sm rounded-full">
              <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L15.09,8.26L22,9.27L17,14.14L18.18,21.02L12,17.77L5.82,21.02L7,14.14L2,9.27L8.91,8.26L12,2Z" />
              </svg>
              <span className={`text-gray-800 text-xs font-semibold tracking-wider uppercase ${urbanist.className}`}>
                {data.badge_text}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-2 ${urbanist.className}`}
            style={{
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {data.title}
          </motion.h2>

          {/* Subtitle */}
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 ${urbanist.className}`}
            style={{
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            {data.subtitle}
          </motion.h3>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-gray-800 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${poppins.className}`}
          >
            <RichTextRenderer
              content={data.description}
              fallback="Experience unparalleled quality"
            />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={openModal}
              className={`w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${poppins.className}`}
            >
              {data.cta_primary_text}
            </button>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full sm:w-auto bg-gray-900 hover:bg-black text-white px-10 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${poppins.className}`}
            >
              {data.cta_secondary_text}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Mobile Features Section - Shows only on mobile */}
      <section className="md:hidden bg-white py-12 px-4">
        <div className="max-w-md mx-auto">
          {/* Features Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-6">
              <svg className="w-4 h-4 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z" />
              </svg>
              <span className={`text-gray-800 text-xs font-semibold tracking-wider uppercase ${urbanist.className}`}>
                FEATURES
              </span>
            </div>

            <p className={`text-gray-700 text-sm leading-relaxed max-w-xs mx-auto ${poppins.className}`}>
              Together, we're creating a seamless experience that puts you in charge of your operations without IT bottlenecks.
            </p>
          </div>

          {/* Floneo Features Title */}
          <h3 className={`text-4xl font-black text-gray-900 text-center mb-8 ${urbanist.className}`}>
            Floneo<br />Features
          </h3>

          {/* Feature Items - Smooth Minimal Animation */}
          <motion.div 
            className="space-y-3"
            layout
          >
            {displayedFeatures?.map((benefit: any, index: number) => {
              const IconComponent = getIconByIndex(index);
              
              return (
                <motion.div
                  key={`feature-${benefit.id}`}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex items-center justify-between bg-gray-900 rounded-full px-5 py-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-full ${getIconColorClass(
                          benefit.color
                        )} flex items-center justify-center flex-shrink-0`}
                      >
                        <IconComponent size={20} className="text-gray-900" strokeWidth={2.5} />
                      </div>
                      <span className="text-white font-medium text-base">{benefit.title}</span>
                    </div>
                    <Plus size={24} className="text-green-400" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Show More / Show Less Button */}
          {hasMoreFeatures && (
            <div className="text-center mt-8">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                className={`bg-gray-900 hover:bg-black text-white px-12 py-3.5 rounded-full font-semibold transition-all duration-200 shadow-lg ${poppins.className}`}
              >
                {showAllFeatures ? "Show Less" : "Show More"}
              </motion.button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
