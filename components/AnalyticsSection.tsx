"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { api, useApiData } from "@/lib/api";

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

// Floating element icons (using simple SVG icons)
const FloatingIcon = ({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) => {
  const iconMap: { [key: string]: JSX.Element } = {
    chart: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
      </svg>
    ),
    analytics: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
      </svg>
    ),
    target: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-8c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z" />
      </svg>
    ),
    growth: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
      </svg>
    ),
  };

  return (
    <div className={`p-3 rounded-full ${className}`}>
      {iconMap[icon] || iconMap.chart}
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <div ref={ref}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
};

// Donut Chart Component with FloNeo Brand Colors
const DonutChart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // FloNeo brand colors
  const segments = [
    { color: "#2ECC71", percentage: 35, delay: 0 }, // Growth Green
    { color: "#FFC107", percentage: 30, delay: 0.3 }, // Clarity Yellow
    { color: "#1A1F3A", percentage: 25, delay: 0.6 }, // Deep Navy
    { color: "#2C2C2E", percentage: 10, delay: 0.9 }, // Charcoal Gray
  ];

  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <div ref={ref} className="relative w-48 h-48 mx-auto mb-6">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="8"
          fill="transparent"
        />

        {/* Animated segments */}
        {segments.map((segment, index) => {
          const offset = segments
            .slice(0, index)
            .reduce((acc, seg) => acc + seg.percentage, 0);
          const strokeDasharray = `${
            (segment.percentage / 100) * circumference
          } ${circumference}`;
          const strokeDashoffset = -((offset / 100) * circumference);

          return (
            <motion.circle
              key={index}
              cx="60"
              cy="60"
              r={radius}
              stroke={segment.color}
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              initial={{ strokeDasharray: `0 ${circumference}` }}
              animate={isVisible ? { strokeDasharray } : {}}
              transition={{
                duration: 1.5,
                delay: segment.delay,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Center content with animated counter */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className="text-4xl font-bold text-white"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
        >
          <AnimatedCounter target={500} prefix="$" suffix="+" />
        </div>
      </div>
    </div>
  );
};

export default function AnalyticsSection() {
  // Fetch section data from API
  const {
    data: sectionData,
    loading,
    error,
  } = useApiData(api.getAnalyticsSection);

  // Fallback data
  const fallbackData = {
    title: "AI-Powered Analytics",
    subtitle: "Smart Insights",
    description:
      "Transform your data into actionable insights with our advanced analytics platform",
    content:
      "Leverage machine learning algorithms to discover patterns and optimize your business operations",
    savings_amount: "$2.4M",
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const isMobile = useIsMobile();

  const leftTextControls = useAnimation();
  const rightTextControls = useAnimation();
  const cardControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Animate "Our Analytics" from right
      leftTextControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut" },
      });

      // Animate "Feature" from right (same direction)
      rightTextControls.start({
        x: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
      });

      // Animate card
      cardControls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 1, ease: "easeOut", delay: 0.4 },
      });
    }
  }, [isInView, leftTextControls, rightTextControls, cardControls]);

  const floatingElements = [
    {
      icon: "analytics",
      position: "-top-12 -right-12",
      color: "bg-gradient-to-br from-yellow-400 to-yellow-500",
      zIndex: isMobile ? "z-10" : "z-30", // Behind main card on mobile
      delay: 0.8,
      size: "w-40 h-40",
    },
    {
      icon: "chart",
      position: "-bottom-8 -left-16",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      zIndex: isMobile ? "z-10" : "z-10", // Already behind main card
      delay: 0.9,
      size: "w-36 h-36",
    },
  ];

  return (
    <section
      id="analytics"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden"
      style={{ fontFamily: "'Surgena','semibold', " }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Top - Centered Animated Heading */}
        <div
          className="text-center mb-20"
          style={{
            fontFamily: "'Surgena','semibold'",
            fontWeight: 600,
          }}
        >
          <motion.h2
            initial={{ x: 100, opacity: 0 }}
            animate={leftTextControls}
            className="text-6xl md:text-7xl lg:text-8xl text-gray-900 leading-tight"
          >
            {data.title}
          </motion.h2>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={rightTextControls}
            className="text-6xl md:text-7xl lg:text-8xl text-blue-600 leading-tight"
          >
            {data.subtitle}
          </motion.div>
        </div>

        {/* Bottom - Chart Card with Floating Elements */}
        <div className="flex justify-center">
          <div className="relative max-w-md w-full">
            {/* Floating Elements */}
            {floatingElements.map((element, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={isInView ? { scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: element.delay,
                  type: "spring",
                  stiffness: 100,
                }}
                className={`absolute ${element.position} ${element.zIndex}`}
              >
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: element.delay,
                  }}
                  className={`${element.color} ${element.size} rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm border-2 border-white border-opacity-30`}
                >
                  <FloatingIcon icon={element.icon} className="text-white" />
                </motion.div>
              </motion.div>
            ))}

            {/* Main Chart Card - Smaller and Cleaner */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={cardControls}
              className="relative z-20 bg-gradient-to-br from-black via-gray-900 to-green-900 rounded-3xl p-8 shadow-2xl overflow-hidden w-full"
              style={{ minHeight: "500px" }}
            >
              {/* Glassmorphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-3xl border border-white/10"></div>

              {/* Green gradient effect on bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-500/20 to-transparent"></div>

              {/* Glassy Popup - Top Right Corner (Square Shape) - Hidden on mobile */}
              {!isMobile && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="absolute top-40 right-4 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/20 shadow-xl"
                  style={{ width: "160px", height: "160px" }}
                >
                  {/* Inner glassmorphism overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl"></div>

                  <div className="relative z-10 text-center">
                    <div className="text-white text-sm font-medium mb-1">
                      Turn Insights
                    </div>
                    <div className="text-white text-sm font-medium mb-2">
                      Into Savings
                    </div>
                    <div className="text-gray-300 text-xs leading-tight">
                      helping you make informed decisions and avoid overspending
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="relative z-10">
                {/* Title */}
                <div className="text-left mb-8">
                  <h3
                    className="text-3xl md:text-4xl font-normal text-white"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    Cost reductions
                  </h3>
                </div>

                {/* Donut Chart */}
                <div className="flex justify-center mb-6">
                  <DonutChart />
                </div>

                {/* Description - Below Chart */}
                <div className="text-center px-4">
                  <p
                    className="text-base text-gray-300 leading-relaxed"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    FloNeo helps enterprises save an average of $500+ per
                    employee, every month — by cutting inefficiencies and
                    automating manual tasks.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
