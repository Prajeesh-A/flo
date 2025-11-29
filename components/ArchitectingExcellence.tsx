"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { api, useApiData } from "@/lib/api";
import { useCTAModal } from "@/contexts/CTAModalContext";
import { RichTextRenderer } from "@/components/SafeHTMLRenderer";

// Hook to detect mobile viewport
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      // ✅ Changed from 768px to 1280px
      setIsMobile(window.innerWidth < 1280);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
};

/**
 * ArchitectingExcellence - Feature showcase section
 *
 * Features:
 * - Poppins font throughout
 * - Animated counter for percentages
 * - Glassmorphism team card
 * - Interactive 4-step carousel
 * - Design system with CSS variables
 */

// Design System - CSS Variables
const designSystem = {
  fonts: {
    primary: "'Poppins', sans-serif",
    heading: "var(--font-surgena), sans-serif",
  },
  colors: {
    flowBlue: "#0066ff",
    growthGreen: "#2ecc71",
    clarityYellow: "#FFC107",
    creativePink: "#ff4fcb",
    deepNavy: "#1a1a2e",
  },
  typography: {
    h1: { size: "text-5xl lg:text-6xl", weight: "font-semibold" },
    h2: { size: "text-4xl lg:text-5xl", weight: "font-semibold" },
    h3: { size: "text-2xl lg:text-3xl", weight: "font-semibold" },
    h4: { size: "text-xl lg:text-2xl", weight: "font-semibold" },
    p: { size: "text-base", weight: "font-normal" },
    small: { size: "text-sm", weight: "font-normal" },
  },
};

// Counter Animation Hook
function useCounter(
  end: number,
  duration: number = 2000,
  shouldStart: boolean = false
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
}

// This will be moved inside the component to use API data

// Dark Gradient Card Component with Animated Counters
function DarkGradientCard({
  isInView,
  counter1Value,
  counter1Label,
  counter2Value,
  counter2Label,
  isMobile,
}: {
  isInView: boolean;
  counter1Value: number;
  counter1Label: string;
  counter2Value: number;
  counter2Label: string;
  isMobile: boolean;
}) {
  const count1 = useCounter(counter1Value, 2000, isInView);
  const count2 = useCounter(counter2Value, 2500, isInView);

  // Mobile static styles - no animations
  const mobileStaticProps = {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0 },
  };

  // Desktop animated styles
  const desktopAnimatedProps = {
    initial: { opacity: 0, y: 40 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  };

  return (
    <motion.div
      {...(isMobile ? mobileStaticProps : desktopAnimatedProps)}
      className="bg-gradient-to-br from-[#0a1f1f] via-[#0d3d3d] to-[#2ecc71] rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-between min-h-[420px] sm:min-h-[450px] lg:min-h-[450px] relative overflow-hidden group"
    >
      {/* Animated decorative circles with floating effect - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-8 left-8 w-20 h-20 bg-white/30 rounded-full blur-xl"
        />
      )}
      {!isMobile && (
        <motion.div
          animate={{
            y: [0, 20, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 right-12 w-32 h-32 bg-[#2ecc71]/50 rounded-full blur-2xl"
        />
      )}
      {!isMobile && (
        <motion.div
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-12 left-1/4 w-24 h-24 bg-white/20 rounded-full blur-xl"
        />
      )}
      {!isMobile && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"
        />
      )}

      {/* Blue percentage badge - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.6,
            delay: 0.3,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ scale: 1.1 }}
          className="absolute top-10 right-10 bg-[#0066ff]/80 backdrop-blur-md rounded-full px-7 py-5 border border-[#0066ff]/50 cursor-pointer"
          style={{
            boxShadow:
              "0 0 30px rgba(0, 102, 255, 0.6), 0 0 60px rgba(0, 102, 255, 0.3), inset 0 0 20px rgba(0, 102, 255, 0.2)",
          }}
        >
          <span className="text-white font-semibold text-2xl">{count1}%</span>
        </motion.div>
      )}
      <motion.div
        initial={isMobile ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        animate={
          isMobile
            ? { scale: 1, opacity: 1 }
            : isInView
            ? { scale: 1, opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={
          isMobile
            ? {}
            : {
                duration: 0.6,
                delay: 0.5,
                type: "spring",
                stiffness: 200,
              }
        }
        whileHover={isMobile ? {} : { scale: 1.05 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#2ecc71]/40 backdrop-blur-md rounded-full border border-[#2ecc71]/60 cursor-pointer flex items-center justify-center"
        style={{
          width: "280px",
          height: "280px",
          boxShadow:
            "0 0 40px rgba(46, 204, 113, 0.7), 0 0 80px rgba(46, 204, 113, 0.3), inset 0 0 25px rgba(46, 204, 113, 0.3)",
        }}
      >
        <span className="text-white font-semibold text-5xl">{count2}%</span>
      </motion.div>

      {/* Decorative white circles around the main circle - Hidden on mobile */}
      {!isMobile && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.6,
            delay: 0.6,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute top-[15%] left-[30%] bg-white/90 rounded-full"
          style={{
            width: "80px",
            height: "80px",
            boxShadow:
              "0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)",
          }}
        />
      )}
      {!isMobile && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.6,
            delay: 0.65,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute bottom-[25%] right-[20%] bg-white/90 rounded-full"
          style={{
            width: "100px",
            height: "100px",
            boxShadow:
              "0 0 30px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.3)",
          }}
        />
      )}
      {!isMobile && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={
            isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
          }
          transition={{
            duration: 0.6,
            delay: 0.7,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute bottom-[30%] right-[15%] bg-white/70 rounded-full"
          style={{
            width: "40px",
            height: "40px",
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          }}
        />
      )}

      <motion.div
        initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={
          isMobile
            ? { opacity: 1, y: 0 }
            : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 20 }
        }
        transition={isMobile ? {} : { duration: 0.8, delay: 0.7 }}
        className="relative z-10 mt-auto"
      >
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-2">
          Faster
        </h3>
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-normal text-[#FFC107]">
          Process Cycles
        </h3>
      </motion.div>
    </motion.div>
  );
}

// Phone Mockup Card Component with Glassmorphism Team Card
function PhoneMockupCard({
  isInView,
  teamName,
  teamRole,
  teamImage,
  isMobile,
}: {
  isInView: boolean;
  teamName: string;
  teamRole: string;
  teamImage: string | null;
  isMobile: boolean;
}) {
  // Mobile static styles - no animations
  const mobileStaticProps = {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0 },
  };

  // Desktop animated styles
  const desktopAnimatedProps = {
    initial: { opacity: 0, y: 40 },
    animate: isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    transition: { duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  };

  return (
    <motion.div
      {...(isMobile ? mobileStaticProps : desktopAnimatedProps)}
      className="bg-gradient-to-br from-[#1a1a2e] via-[#2d2d44] to-[#16213e] rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-between min-h-[600px] sm:min-h-[700px] md:min-h-[760px] lg:min-h-[900px] relative overflow-hidden group "
    >
      {/* Animated background gradient overlay - Static on mobile */}
      <motion.div
        animate={
          isMobile
            ? {}
            : {
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.1, 1],
              }
        }
        transition={
          isMobile
            ? {}
            : {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
        className="absolute inset-0 bg-gradient-to-br from-[#0066ff]/20 to-transparent rounded-3xl"
      />

      {/* Mobile Holding Background - Static on mobile */}
      <motion.div
        initial={
          isMobile ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }
        }
        animate={
          isMobile
            ? { scale: 1, opacity: 1 }
            : isInView
            ? { scale: 1, opacity: 1 }
            : { scale: 0.8, opacity: 0 }
        }
        transition={
          isMobile
            ? {}
            : {
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }
        }
        whileHover={isMobile ? {} : { scale: 1.02 }}
        className="flex-1 relative z-10 rounded-3xl overflow-hidden"
        style={{
          backgroundImage: "url('/mobile-holding.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          minHeight: "500px",
          filter:
            "drop-shadow(0 20px 60px rgba(0, 0, 0, 0.3)) drop-shadow(0 0 40px rgba(0, 102, 255, 0.2))",
        }}
      >
        {/* Optional overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/10 rounded-3xl" />

        {/* Enhanced Glassmorphism Team Card Overlay - Static on mobile */}
        <motion.div
          initial={
            isMobile
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 30, scale: 0.9 }
          }
          animate={
            isMobile
              ? { opacity: 1, y: 0, scale: 1 }
              : isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 30, scale: 0.9 }
          }
          transition={
            isMobile
              ? {}
              : {
                  duration: 0.8,
                  delay: 0.8,
                  type: "spring",
                  stiffness: 100,
                }
          }
          whileHover={isMobile ? {} : { scale: 1.02, y: -5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[85%] max-w-[320px] rounded-3xl p-6 border border-white/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(36, 36, 36, 0.8), rgba(36, 36, 36, 0.6))",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            boxShadow:
              "0 8px 32px 0 rgba(0, 0, 0, 0.5), 0 16px 64px 0 rgba(0, 0, 0, 0.3), 0 0 40px rgba(36, 36, 36, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(255, 255, 255, 0.05)",
          }}
        >
          {/* Top section - Description */}
          <p
            className="text-white text-sm sm:text-base font-normal mb-5 leading-relaxed drop-shadow-lg"
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)" }}
          >
            floneo is co-created on the front lines with ops, business, delivery
            leaders who live with these bottlenecks, ensuring our{" "}
            <span
              className="text-[#FFC107] font-semibold drop-shadow-lg"
              style={{ textShadow: "0 2px 10px rgba(255, 193, 7, 0.6)" }}
            >
              tools launch in weeks, not months
            </span>
            .
          </p>

          {/* Bottom section - Team info */}
          <div className="flex items-center justify-between">
            {/* Team icon */}
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={isMobile ? {} : { rotate: 360, scale: 1.1 }}
                transition={isMobile ? {} : { duration: 0.6 }}
                className="w-12 h-12 bg-gradient-to-br from-[#242424] to-[#242424] rounded-full flex items-center justify-center shadow-lg"
                style={{
                  boxShadow:
                    "0 4px 20px rgba(0, 0, 0, 0.6), 0 8px 40px rgba(255, 0, 183, 0.4)",
                }}
              >
                <img
                  src="/logo.png"
                  alt="Team  floneo Logo"
                  className="w-10 h-10 object-contain"
                />
              </motion.div>
              <div>
                <span
                  className="text-white text-sm font-semibold block drop-shadow-lg"
                  style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.5)" }}
                >
                  {teamName}
                </span>
                <span
                  className="text-white/80 text-xs font-normal drop-shadow-md"
                  style={{ textShadow: "0 1px 4px rgba(0, 0, 0, 0.4)" }}
                >
                  {teamRole}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Interactive Step Carousel Component
function StepCarousel({
  currentStep,
  onStepClick,
  isInView,
  steps,
  isMobile,
}: {
  currentStep: number;
  onStepClick: (index: number) => void;
  isInView: boolean;
  steps: Array<{ number: string; title: string; subtitle: string; description: string }>;
  isMobile: boolean;
}) {
  const step = steps[currentStep];

  // ✅ Mobile/Tablet Layout (< 1280px) - Clean, responsive layout
  if (isMobile) {
    return (
      <div className="bg-[#0066ff] rounded-2xl xl:rounded-3xl p-5 sm:p-6 md:p-7 lg:p-10 xl:p-16 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

        {/* Step indicators - Responsive sizing */}
        <div className="flex gap-2 sm:gap-2.5 md:gap-3 mb-5 sm:mb-6 md:mb-8 justify-center relative z-10">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => onStepClick(index)}
              className={`h-2 sm:h-2.5 md:h-3 lg:h-4 rounded-full transition-all duration-500 ${
                index === currentStep 
                  ? "bg-[#FFC107] w-6 sm:w-7 md:w-8 lg:w-10" 
                  : "bg-white/30 hover:bg-white/50 w-2 sm:w-2.5 md:w-3 lg:w-4"
              }`}
              style={{ boxShadow: index === currentStep ? "0 0 20px rgba(255, 193, 7, 0.6)" : "none" }}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>

        {/* Content - Single column, vertically stacked */}
        <div key={currentStep} className="relative z-10 space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8">
          {/* Step number + Details in a flex row */}
          <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4 lg:gap-6">
            {/* Step Number - Flex-shrink-0 to prevent squishing */}
            <div
              className="text-[#FFC107] font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl flex-shrink-0 leading-none"
              style={{ textShadow: "0 0 30px rgba(255, 193, 7, 0.5)" }}
            >
              {step.number}
            </div>

            {/* Step Details - Flex-1 to take remaining space */}
            <div className="flex-1 min-w-0">
              <div className="text-white/80 text-[9px] sm:text-[10px] md:text-xs lg:text-sm uppercase tracking-wider mb-1 sm:mb-1.5 md:mb-2 font-normal">
                STEP {step.number}
              </div>
              <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-1.5 sm:mb-2 md:mb-3 leading-tight">
                {step.title}
              </h3>
              <div className="text-white/90 text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-base leading-relaxed font-normal">
                {step.description
                  .split("•")
                  .filter((point) => point.trim() !== "")
                  .map((point, index) => (
                    <div key={index} className="mb-1 sm:mb-1.5 md:mb-2">
                      • {point.trim()}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Subtitle + CTA Button section */}
          <div className="text-left space-y-2.5 sm:space-y-3 md:space-y-4">
            <h3 className="text-white font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight">
              {step.subtitle}
            </h3>
            <button
              onClick={() => onStepClick((currentStep + 1) % steps.length)}
              className="bg-white text-[#0066ff] px-3.5 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 xl:px-8 xl:py-4 rounded-full font-semibold text-[10px] sm:text-[11px] md:text-xs lg:text-sm xl:text-base hover:bg-gray-100 transition-colors inline-block"
            >
              Operational Freedom Starts Here →
            </button>
          </div>
        </div>

        {/* Decorative SVG - Responsive sizing */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <svg 
            width="100" 
            height="100" 
            viewBox="0 0 100 100" 
            fill="none" 
            className="sm:w-[120px] sm:h-[120px] md:w-[140px] md:h-[140px] lg:w-[160px] lg:h-[160px] xl:w-[180px] xl:h-[180px]"
          >
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" />
            <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1" />
            <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="1" />
          </svg>
        </div>
      </div>
    );
  }

  // ✅ Desktop Layout (>= 1280px) - Original two-column layout
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-[#0066ff] rounded-3xl p-10 md:p-12 lg:p-16 relative overflow-hidden group"
    >
      <motion.div
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"
      />

      <div className="flex gap-3 mb-10 justify-center md:justify-start relative z-10">
        {steps.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => onStepClick(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`h-4 rounded-full transition-all duration-500 ${
              index === currentStep ? "bg-[#FFC107] w-10" : "bg-white/30 hover:bg-white/50 w-4"
            }`}
            style={{ boxShadow: index === currentStep ? "0 0 20px rgba(255, 193, 7, 0.6)" : "none" }}
            aria-label={`Go to step ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10"
      >
        <div className="flex items-center gap-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            className="text-[#FFC107] font-semibold text-7xl md:text-8xl lg:text-9xl"
            style={{ textShadow: "0 0 30px rgba(255, 193, 7, 0.5)" }}
          >
            {step.number}
          </motion.div>
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/80 text-base uppercase tracking-wider mb-3 font-normal"
            >
              STEP {step.number}
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-white font-semibold text-2xl md:text-3xl mb-5"
            >
              {step.title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-white/90 text-base md:text-lg leading-relaxed font-normal flex flex-wrap gap-x-4"
            >
              {step.description
                .split("•")
                .filter((point) => point.trim() !== "")
                .map((point, index) => (
                  <div key={index} className="whitespace-nowrap">
                    • {point.trim()}
                  </div>
                ))}
            </motion.div>
          </div>
        </div>

        <div className="text-left md:text-right">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-white font-semibold text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight"
          >
            {step.subtitle}
          </motion.h3>
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            onClick={() => onStepClick((currentStep + 1) % steps.length)}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#0066ff] px-8 py-4 rounded-full font-semibold text-base hover:bg-gray-100 transition-colors"
          >
            Operational Freedom Starts Here →
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none"
      >
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" stroke="white" strokeWidth="1" />
          <circle cx="50" cy="50" r="20" stroke="white" strokeWidth="1" />
        </svg>
      </motion.div>
    </motion.div>
  );
}


export default function ArchitectingExcellence() {
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isMobile = useIsMobile();
  const { openModal } = useCTAModal();

  // Fetch section data from API
  const {
    data: sectionData,
    loading,
    error,
  } = useApiData(api.getArchitectingExcellenceSection);

  // Fallback data
  const fallbackData = {
    badge_text: "ABOUT US",
    main_title_line1: "Architecting",
    main_title_line2: "Excellence",
    subtitle: "Together, we're creating a seamless experience that puts you in charge of your operations without IT bottlenecks.",
    philosophy_title: "At FloNeo, we've redefined workflow creation. We believe it should be as simple as stacking blocks—visual, instant, and accessible to everyone. FloNeo turns every user into a builder.",
    philosophy_button_text: "View Services",
    philosophy_button_url: "#",
    counter_1_value: 70,
    counter_1_label: "Process Efficiency",
    counter_2_value: 85,
    counter_2_label: "Automation Success",
    team_name: "Team floneo",
    team_role: "CCO & Co-Founder",
    team_image: null,
    step_1_title: "Define requirements.",
    step_1_description: "Define application scope, goal, users type, data strategy in scope.",
    step_2_title: "Design Prototype (floneo builder)",
    step_2_description: "• Configure templates, select pre built templates & modify them. • Design user interfaces by drag and drop in Visual builder. • Data Modeling with Databases or connect to existing data . • Set the functional properties by FloNeo Workflow Blocks.",
    step_3_title: "Test the newly built app.",
    step_3_description: "• Functional Testing • Integration Testing • Performance Testing (In case of users & transactions count is high) • Security & Compliance Review",
    step_4_title: "Deploy and manage.",
    step_4_description: "• One click Deployment (Publish app in the web for users access) • Define user access & roles • Live Monitoring (Production)",
    background_color: "#FFFFFF",
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  // Step data for the carousel using API data
  const steps = [
    {
      number: "01",
      title: data.step_1_title,
      subtitle: "Step 1",
      description: data.step_1_description,
    },
    {
      number: "02",
      title: data.step_2_title,
      subtitle: "Step 2",
      description: data.step_2_description,
    },
    {
      number: "03",
      title: data.step_3_title,
      subtitle: "Step 3",
      description: data.step_3_description,
    },
    {
      number: "04",
      title: data.step_4_title,
      subtitle: "Step 4",
      description: data.step_4_description,
    },
  ];

  // Auto-advance carousel every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <section
      id="about-us"
      ref={sectionRef}
      className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white"
      style={{ fontFamily: "'Poppins',  " }}
    >
      <div className="container mx-auto max-w-[1400px] px-2 sm:px-0">
        {/* Header with Staggered Animations - No animations on mobile */}
        <div className="text-center mb-16 lg:mb-20">
          {isMobile ? (
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-3 h-3 bg-[#FFC107] rounded-full" />
              <span className="text-base font-normal text-gray-600 uppercase tracking-wider">
                {data.badge_text}
              </span>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(255, 193, 7, 0.4)",
                    "0 0 0 10px rgba(255, 193, 7, 0)",
                    "0 0 0 0 rgba(255, 193, 7, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-3 h-3 bg-[#FFC107] rounded-full"
              />
              <span className="text-base font-normal text-gray-600 uppercase tracking-wider">
                {data.badge_text}
              </span>
            </motion.div>
          )}
          {isMobile ? (
            <>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-black mb-6 font-surgena">
                {data.main_title_line1}
                <br />
                {data.main_title_line2}
              </h2>
              <div className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
                <RichTextRenderer
                  content={data.subtitle}
                  fallback="Together, we're creating a seamless experience that puts you in charge of your operations without IT bottlenecks."
                />
              </div>
            </>
          ) : (
            <>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-semibold text-black mb-6 font-surgena"
              >
                {data.main_title_line1}
                <br />
                {data.main_title_line2}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-normal"
              >
                <RichTextRenderer
                  content={data.subtitle}
                  fallback="Together, we're creating a seamless experience that puts you in charge of your operations without IT bottlenecks."
                />
              </motion.p>
            </>
          )}
        </div>

        {/* Main Grid - 3 Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-6 mb-6 px-2 sm:px-0">
          {/* Left Column - 2 Stacked Cards */}
          <div className="flex flex-col gap-8 sm:gap-8 md:gap-6 w-full">
            {/* Yellow Philosophy Card with Enhanced Animations - No animations on mobile */}
            {isMobile ? (
              <div className="bg-[#FFC107] rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-between min-h-[420px] sm:min-h-[450px] lg:min-h-[450px] relative overflow-hidden group">
                {/* Static background gradient on mobile */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />

                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-white mb-6 sm:mb-8 leading-tight">
                    {data.philosophy_title.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index <
                          data.philosophy_title.split("\n").length - 1 && (
                          <br />
                        )}
                      </React.Fragment>
                    ))}
                  </h3>
                </div>

                <button
                  className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-900 transition-colors self-start relative z-10"
                  onClick={openModal}
                >
                  {data.philosophy_button_text}
                </button>
              </div>
            ) : (
              <motion.div
  initial={{ opacity: 0, x: -32 }}
  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -32 }}
  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
  whileHover={{ scale: 1.02 }}
  className="
    bg-[#FFC107]
    rounded-3xl
    px-5 py-7 
    sm:px-10 sm:py-10 md:px-12 md:py-12
    flex flex-col
    justify-between
    min-h-[260px]
    max-w-full
    w-full
    relative
    overflow-hidden
    group
    shadow-xl
  "
>
  {/* Animated background gradient */}
  <motion.div
    animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.04, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
  />

  <div className="flex flex-col flex-1 justify-center relative z-10 gap-4">
    <h3 className="
      font-normal
      text-white
      text-xl
      sm:text-2xl
      md:text-3xl
      lg:text-4xl
      leading-normal
      mb-2
      max-w-[640px]
      "
    >
      {/* Split title lines for balanced layout */}
      {data.philosophy_title
        .split("\n")
        .map((line, idx) => (
          <div key={idx} className="mb-1">{line}</div>
        ))}
    </h3>
  </div>

  <motion.button
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
    transition={{ duration: 0.7, delay: 0.3 }}
    whileHover={{
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    }}
    whileTap={{ scale: 0.98 }}
    className="
      bg-black
      text-white
      px-6
      py-3
      rounded-full
      font-semibold
      text-sm
      sm:text-base
      hover:bg-gray-900
      transition-colors
      w-full sm:w-auto
      mt-4
      mb-2
      self-start
      relative
      z-10
      "
    onClick={openModal}
  >
    {data.philosophy_button_text}
  </motion.button>
</motion.div>

            )}
            <div className="mb-3 mt-3">
            </div>
            {/* Dark Gradient Card - Faster Process Cycles */}
            <DarkGradientCard
              isInView={isInView}
              counter1Value={data.counter_1_value}
              counter1Label={data.counter_1_label}
              counter2Value={data.counter_2_value}
              counter2Label={data.counter_2_label}
              isMobile={isMobile}
            />
          </div>

          {/* Right Column - Tall Phone Mockup Card */}
          <PhoneMockupCard
            isInView={isInView}
            teamName={data.team_name}
            teamRole={data.team_role}
            teamImage={data.team_image}
            isMobile={isMobile}
          />
        </div>

        {/* Bottom Blue Card - Interactive Step Carousel */}
        <StepCarousel
          currentStep={currentStep}
          onStepClick={handleStepClick}
          isInView={isInView}
          steps={steps}
          isMobile={isMobile}
        />
      </div>
    </section>
  );
}
