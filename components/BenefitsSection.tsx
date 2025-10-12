"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { api, useApiData } from "@/lib/api";
import { useCTAModal } from "@/contexts/CTAModalContext";
import { useToast } from "@/components/ui/notification-toast";
import { RichTextRenderer } from "@/components/SafeHTMLRenderer";

// Hook to detect mobile viewport
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

// Helper function to get mobile-optimized animation duration
const getMobileDuration = (
  desktopDuration: number,
  isMobile: boolean
): number => {
  return isMobile ? Math.max(0.3, desktopDuration * 0.4) : desktopDuration;
};

export default function BenefitsSection() {
  // Fetch section data from API
  const {
    data: sectionData,
    loading,
    error,
  } = useApiData(api.getBenefitsSection);

  // Fallback data
  const fallbackData = {
    badge_text: "BENEFITS",
    title: "More than",
    subtitle: "Automation",
    description:
      "floneo isn't just about managing processes — it builds, automates, and scales the workflows that fuel your business.",
    cta_primary_text: "Get Started",
    cta_primary_url: "/contact",
    cta_secondary_text: "Learn More",
    cta_secondary_url: "/about",
    background_color:
      "radial-gradient(circle at center, #2ECC71 0%, #2ECC71 40%, #ffffffff 100%, #ffffffff 100%)",
    benefits: [
      { id: 1, title: "Cloud Sync", icon: "cloud", position: "top-center" },
      { id: 2, title: "Top Security", icon: "shield", position: "top-left" },
      { id: 3, title: "Top Security", icon: "shield", position: "top-right" },
      { id: 4, title: "Cloud Sync", icon: "cloud", position: "middle-left" },
      {
        id: 5,
        title: "Top Security",
        icon: "shield",
        position: "middle-right",
      },
      { id: 6, title: "Top Security", icon: "shield", position: "bottom-left" },
      { id: 7, title: "Cloud Sync", icon: "cloud", position: "bottom-right" },
      {
        id: 8,
        title: "Customizable Dashboards",
        icon: "dashboard",
        position: "bottom-center",
      },
    ],
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isMobile = useIsMobile();
  const { openModal } = useCTAModal();
  const { showDemoToast } = useToast();

  // Position mapping for floating benefits - matching reference image
  const getPositionClasses = (position: string) => {
    switch (position) {
      case "top-center":
        return "top-10 left-1/2 transform -translate-x-1/2";
      case "top-left":
        return "top-40 left-32";
      case "top-right":
        return "top-40 right-32";
      case "middle-left":
        return "top-1/2 left-20 transform -translate-y-1/2";
      case "middle-right":
        return "top-1/2 right-20 transform -translate-y-1/2";
      case "bottom-left":
        return "bottom-40 left-32";
      case "bottom-right":
        return "bottom-40 right-32";
      case "bottom-center":
        return "bottom-10 left-1/2 transform -translate-x-1/2";
      default:
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
    }
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden py-12 sm:py-20 px-4 sm:px-12 lg:px-24"
      style={{
        background:
          data.background_color ||
          "radial-gradient(circle at center, #2ECC71 0%, #2ECC71 0%, #e8f8ed 100%, #f8fdf9 100%)",
      }}
    >
      {/* Desktop Layout - Floating Benefits Pills */}
      <div className="hidden md:flex items-center justify-center min-h-screen">
        {data.benefits?.map((benefit, index) => (
          <motion.div
            key={benefit.id}
            initial={{ opacity: 0, scale: 0.8, y: 0 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    scale: 1,
                    y: [0, -12, 0], // Floating animation: up and down
                  }
                : { opacity: 0, scale: 0.8, y: 0 }
            }
            transition={{
              opacity: {
                duration: getMobileDuration(0.5, isMobile),
                delay: getMobileDuration(index * 0.1, isMobile),
                ease: "easeOut",
              },
              scale: {
                duration: getMobileDuration(0.5, isMobile),
                delay: getMobileDuration(index * 0.1, isMobile),
                ease: "easeOut",
              },
              y: {
                duration: getMobileDuration(3 + index * 0.2, isMobile), // Staggered timing: 3-4.6 seconds
                repeat: Infinity,
                ease: "easeInOut",
                delay: getMobileDuration(index * 0.3 + 1, isMobile), // Start floating after initial animation + staggered delay
              },
            }}
            className={`absolute ${getPositionClasses(benefit.position)} z-10`}
          >
            <div className="relative rounded-full h-16 px-8 flex items-center gap-4 shadow-lg border border-white/10 overflow-hidden bg-black/80 backdrop-blur-sm min-w-[180px]">
              {/* Icon container */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1">
                    <Image
                      src="/favicon-32x32.png"
                      alt="FloNeo Logo"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Text content */}
              <span className="text-white text-sm font-medium whitespace-nowrap flex-1 text-center">
                {benefit.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Layout - Stacked Benefits Pills */}
      <div className="md:hidden flex flex-col items-center justify-start min-h-screen pt-16 gap-6">
        {data.benefits?.map((benefit, index) => (
          <motion.div
            key={`mobile-${benefit.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{
              duration: getMobileDuration(0.5, isMobile),
              delay: getMobileDuration(index * 0.1, isMobile),
              ease: "easeOut",
            }}
            className="w-full max-w-sm mx-auto px-4"
          >
            <div className="relative rounded-full h-16 px-6 flex items-center gap-4 shadow-lg border border-white/10 overflow-hidden bg-black/80 backdrop-blur-sm w-full">
              {/* Icon container */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center p-1">
                    <Image
                      src="/favicon-32x32.png"
                      alt="FloNeo Logo"
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Text content */}
              <span className="text-white text-sm font-medium flex-1 text-center">
                {benefit.title}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Central Content */}
      <div className="text-center z-20 max-w-screen-xl w-full mx-auto px-8 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 mt-8 md:mt-0">
        {/* Benefits Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: getMobileDuration(0.6, isMobile),
            ease: "easeOut",
          }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,16.5L6.5,12L7.91,10.59L11,13.67L16.59,8.09L18,9.5L11,16.5Z" />
            </svg>
            <span className="text-white text-sm font-light tracking-wider uppercase">
              {(data as any).badge_text || "BENEFITS"}
            </span>
          </div>
        </motion.div>

        {/* Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: getMobileDuration(0.6, isMobile),
            delay: getMobileDuration(0.2, isMobile),
            ease: "easeOut",
          }}
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight font-surgena"
        >
          {data.title}
        </motion.h2>

        {/* Subtitle */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: getMobileDuration(0.6, isMobile),
            delay: getMobileDuration(0.3, isMobile),
            ease: "easeOut",
          }}
          className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-tight font-surgena"
        >
          {data.subtitle}
        </motion.h3>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: getMobileDuration(0.6, isMobile),
            delay: getMobileDuration(0.4, isMobile),
            ease: "easeOut",
          }}
          className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
        >
          <RichTextRenderer
            content={data.description}
            fallback="Experience unparalleled quality and innovation"
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: getMobileDuration(0.6, isMobile),
            delay: getMobileDuration(0.5, isMobile),
            ease: "easeOut",
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {data.cta_primary_text}
          </motion.button>

          <motion.button
            onClick={() => showDemoToast("Learn More")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black/60 hover:bg-black/80 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg backdrop-blur-sm"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            {data.cta_secondary_text}
          </motion.button>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-40 h-60 bg-white/20 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 right-1/4 w-56 h-56 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-white/15 rounded-full blur-lg"></div>
      </div>
    </section>
  );
}
