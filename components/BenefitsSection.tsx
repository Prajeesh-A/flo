"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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
  LayoutDashboard 
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

  const fallbackData = {
    badge_text: "BENEFITS",
    title: "More than",
    subtitle: "Automation",
    description:
      "FloNeo isn't just about workflows, it builds, automates, and scales the systems that fuel your business.",
    cta_primary_text: "Get Started",
    cta_secondary_text: "Learn More",
    benefits: [
      {
        id: 1,
        title: "Ironclad Compliance",
        color: "yellow",
        position: "top-center",
      },
      {
        id: 2,
        title: "Total Deployment Control",
        color: "yellow",
        position: "top-left",
      },
      {
        id: 3,
        title: "Accelerated Time-to-Value",
        color: "yellow",
        position: "top-right",
      },
      {
        id: 4,
        title: "Cross platform",
        color: "yellow",
        position: "middle-left",
      },
      {
        id: 5,
        title: "Risk Management",
        color: "yellow",
        position: "middle-right",
      },
      {
        id: 6,
        title: "Actionable Intelligence",
        color: "yellow",
        position: "bottom-left",
      },
      {
        id: 7,
        title: "Advanced Analytics",
        color: "yellow",
        position: "bottom-right",
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

  // FRONTEND HARDCODED ICONS - Map by index position
  const getIconByIndex = (index: number) => {
    const icons = [
      Shield,        // 0 - Ironclad Compliance
      Cloud,         // 1 - Total Deployment Control
      Zap,           // 2 - Accelerated Time-to-Value
      Monitor,       // 3 - Cross platform
      AlertTriangle, // 4 - Risk Management
      Lightbulb,     // 5 - Actionable Intelligence
      BarChart3,     // 6 - Advanced Analytics
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

  // UPDATED POSITIONS - Moved down to avoid navbar overlap
  const getPositionClasses = (position: string) => {
    const positionMap: Record<string, string> = {
      "top-center": "top-32 left-1/2 -translate-x-1/2",
      "top-left": "top-56 left-24",
      "top-right": "top-56 right-24",
      "middle-left": "top-1/2 left-20 -translate-y-1/2 mt-8",
      "middle-right": "top-1/2 right-20 -translate-y-1/2 mt-8",
      "bottom-left": "bottom-32 left-24",
      "bottom-right": "bottom-32 right-24",
      "bottom-center": "bottom-16 left-1/2 -translate-x-1/2",
    };
    
    return positionMap[position] || "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center pt-24 pb-20"
      style={{
        background: "linear-gradient(135deg, #7bed9f 0%, #2ed573 50%, #26de81 100%)",
      }}
    >
      {/* Desktop Layout - Floating Benefits Pills */}
      <div className="hidden lg:block absolute inset-0">
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
              <div className="flex items-center gap-3 bg-gray-900 rounded-full px-5 py-3 shadow-xl border border-white/10">
                <div
                  className={`w-10 h-10 rounded-full ${getIconColorClass(
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
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
            </svg>
            <span className={`text-white text-xs font-medium tracking-wider uppercase ${urbanist.className}`}>
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

        {/* Subtitle - FIXED: Removed font-normal, keeping font-black and proper className */}
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
          className={`text-white/95 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${poppins.className}`}
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
            className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${poppins.className}`}
          >
            {data.cta_primary_text}
          </button>

          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${poppins.className}`}
          >
            {data.cta_secondary_text}
          </a>
        </motion.div>
      </div>

      {/* Mobile Pills */}
      <div className="lg:hidden absolute bottom-8 left-0 right-0 px-4 flex flex-wrap gap-2 justify-center">
        {data.benefits?.slice(0, 4).map((benefit: any, index: number) => {
          const IconComponent = getIconByIndex(index);
          
          return (
            <motion.div
              key={`mobile-${benefit.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-2 bg-gray-900 rounded-full px-4 py-2 shadow-lg"
            >
              <div
                className={`w-8 h-8 rounded-full ${getIconColorClass(
                  benefit.color
                )} flex items-center justify-center flex-shrink-0`}
              >
                <IconComponent size={16} className="text-gray-900" strokeWidth={2.5} />
              </div>
              <span className="text-white font-medium text-xs">{benefit.title}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
