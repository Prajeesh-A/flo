"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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

// Helper function to get mobile-optimized animation duration
const getMobileDuration = (
  desktopDuration: number,
  isMobile: boolean
): number => {
  return isMobile ? Math.max(0.3, desktopDuration * 0.4) : desktopDuration;
};

interface MetricBox {
  id: number;
  value: string;
  suffix: string;
  label: string;
  description: string;
  color: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

const fallbackMetricsData: MetricBox[] = [
  {
    id: 1,
    value: "3.5",
    suffix: "M",
    label: "trusted users",
    description:
      "Our users healthily people take control of their financial and make smarter financial decisions.",
    color: "#FFC107", // Yellow
    position: {
      top: "8%",
      left: "5%",
    },
  },
  {
    id: 2,
    value: "85",
    suffix: "%",
    label: "retention rate",
    description:
      "85% of our users stay engaged with the app, relying on its features to track spending.",
    color: "#00D084", // Green
    position: {
      top: "30%",
      right: "8%",
    },
  },
  {
    id: 3,
    value: "4.8",
    suffix: "+",
    label: "average rating",
    description:
      "Our users consistently rate our app highly for its ease of use and powerful financial insights.",
    color: "#FF1493", // Pink/Magenta
    position: {
      bottom: "11%",
      left: "12%",
    },
  },
];

// Inject simple client-side CSS override to increase card sizes (runs only in browser)
if (typeof window !== "undefined") {
  if (!document.getElementById("metrics-card-size-override")) {
    const style = document.createElement("style");
    style.id = "metrics-card-size-override";
    style.textContent = `
      /* target the metric cards and override inline width/minHeight using !important */
      .rounded-3xl.backdrop-blur-md.cursor-pointer {
        width: 420px !important;
        min-height: 340px !important;
        padding: 36px 44px !important;
      }
      /* increase main number font size inside the card */
      .rounded-3xl.backdrop-blur-md.cursor-pointer .text-6xl {
        font-size: 4.5rem !important;
      }
      /* adjust label and description a bit */
      .rounded-3xl.backdrop-blur-md.cursor-pointer .text-base,
      .rounded-3xl.backdrop-blur-md.cursor-pointer .text-xs {
        font-size: 1.05rem !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// Counter animation hook
const useCounter = (
  end: number,
  duration: number = 2000,
  shouldStart: boolean = false
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = startValue + (end - startValue) * easeOutQuart;

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, shouldStart]);

  return count;
};

const MetricCard = ({
  metric,
  index,
  isMobile,
}: {
  metric: MetricBox;
  index: number;
  isMobile: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });

  const numericValue = parseFloat(metric.value);
  const counter = useCounter(
    numericValue,
    getMobileDuration(2000, isMobile),
    isInView
  );

  // Format the counter value
  const formattedValue =
    metric.suffix === "+" || metric.suffix === "M"
      ? counter.toFixed(1)
      : Math.round(counter);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0 }
          : { opacity: 0, scale: 0.8, y: 20 }
      }
      transition={{
        duration: getMobileDuration(0.6, isMobile),
        delay: getMobileDuration(index * 0.2, isMobile),
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.05,
        y: -10,
        transition: { duration: getMobileDuration(0.3, isMobile) },
      }}
      className="absolute rounded-3xl backdrop-blur-md cursor-pointer md:absolute sm:relative sm:mx-auto sm:mb-6"
      style={{
        ...metric.position,
        backgroundColor: `${metric.color}dd`, // Add transparency for glass effect
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        padding: "28px 32px",
        width: "300px",
        minHeight: "220px",
      }}
    >
      {/* Counter Value */}
      <div className="mb-1">
        <span
          className="text-6xl md:text-7xl text-white"
          style={{
            fontFamily: "'Poppins',  ",
            fontWeight: 300,
          }}
        >
          {formattedValue}
          {metric.suffix}
        </span>
      </div>

      {/* Label */}
      <h3
        className="text-base md:text-lg text-white mb-3 text-right"
        style={{
          fontFamily: "'Poppins',  ",
          fontWeight: 300,
        }}
      >
        {metric.label}
      </h3>

      {/* Description */}
      <p
        className="text-xs md:text-sm text-white/90 leading-relaxed"
        style={{
          fontFamily: "'Poppins',  ",
          fontWeight: 300,
        }}
      >
        {metric.description}
      </p>
    </motion.div>
  );
};

export default function MetricsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();

  // Fetch metrics from API
  const {
    data: metricsData,
    loading: metricsLoading,
    error: metricsError,
  } = useApiData(api.getMetrics);

  // Use API data or fallback to hardcoded data
  const finalMetricsData = metricsData?.results || fallbackMetricsData;

  return (
    <section
      id="metrics"
      ref={sectionRef}
      className="relative w-full h-[140vh] min-h-[1800px] md:h-[140vh] md:min-h-[1800px] sm:h-auto sm:min-h-[1200px] overflow-hidden"
      style={{
        fontFamily: "'Poppins',  ",
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src="/girl.jpg"
          alt="Background"
          className="w-full h-full"
          style={{
            objectFit: "cover",
            objectPosition: "center 40%",
          }}
        />
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
      </div>

      {/* Metric Cards */}
      <div className="relative w-full h-full">
        {finalMetricsData.map((metric: any, index: number) => (
          <MetricCard
            key={metric.id}
            metric={metric}
            index={index}
            isMobile={isMobile}
          />
        ))}
      </div>
    </section>
  );
}
