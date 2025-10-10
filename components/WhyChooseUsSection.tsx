"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useRef, useEffect } from "react";
import { api, useApiData } from "@/lib/api";

// Country data for ticker (includes emoji + flag image URL)
const countries: {
  name: string;
  flag: string;
  code: string;
  flagUrl: string;
}[] = [
  {
    name: "France",
    flag: "🇫🇷",
    code: "fr",
    // PNG version from FlagCDN (width 80)
    flagUrl: "https://flagcdn.com/w80/fr.png",
  },
  {
    name: "Ukraine",
    flag: "🇺🇦",
    code: "ua",
    flagUrl: "https://flagcdn.com/w80/ua.png",
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    code: "nl",
    flagUrl: "https://flagcdn.com/w80/nl.png",
  },
  {
    name: "USA",
    flag: "🇺🇸",
    code: "us",
    flagUrl: "https://flagcdn.com/w80/us.png",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    code: "ca",
    flagUrl: "https://flagcdn.com/w80/ca.png",
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    code: "jp",
    flagUrl: "https://flagcdn.com/w80/jp.png",
  },
  {
    name: "Denmark",
    flag: "🇩🇰",
    code: "dk",
    flagUrl: "https://flagcdn.com/w80/dk.png",
  },
];

// Duplicate for seamless loop
const duplicatedCountries = [...countries, ...countries, ...countries];

export default function WhyChooseUsSection() {
  // Fetch section data from API
  const {
    data: sectionData,
    loading,
    error,
  } = useApiData(api.getWhyChooseUsSection);

  // Fetch country data from API
  const {
    data: countryData,
    loading: countryLoading,
    error: countryError,
  } = useApiData(api.getCountryData);

  // Fallback data
  const fallbackData = {
    badge_text: "WHY CHOOSE US",
    title: "Architecting Excellence",
    subtitle:
      "that puts you in charge of your operations without IT bottlenecks",
    stat_1_value: "75",
    stat_1_label: "spending habits",
    stat_2_value: "60",
    stat_2_label: "cost reductions",
    stat_3_value: "45",
    stat_3_label: "efficiency gains",
    global_title: "Global Reach",
    global_description:
      "Our app supports users in over 140 countries, offering global tools to manage and optimize your finances.",
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;
  const countries = countryData || duplicatedCountries;

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Counter animation
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, 140, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, count]);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
      style={{
        fontFamily: "'Poppins',  ",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Tag */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p
            className="text-sm text-gray-500 uppercase tracking-wider"
            style={{ fontWeight: 500 }}
          >
            {data.badge_text}
          </p>
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl text-black mb-4 leading-tight"
            style={{ fontFamily: "'Poppins',  ", fontWeight: 400 }}
          >
            {data.title}
          </h2>
        </motion.div>

        {/* Paragraph */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p
            className="text-base text-gray-700 leading-relaxed max-w-2xl mx-auto"
            style={{ fontWeight: 400 }}
          >
            {data.subtitle}
          </p>
        </motion.div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start relative">
          {/* Left Column - AI-Powered Analytics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="z-10 bg-white"
          >
            <div className="space-y-6">
              {/* Tag */}
              <p
                className="text-xs text-yellow-600 uppercase tracking-wider flex items-center gap-2"
                style={{ fontWeight: 600 }}
              >
                <span className="text-base">⚡</span> AI-Powered Analytics
              </p>

              {/* Subheading */}
              <h3
                className="text-2xl sm:text-3xl font-semibold text-black leading-tight"
                style={{ fontWeight: 600 }}
              >
                Spot inefficiencies, predict risks, surface insights — instantly
                with floneo.
              </h3>

              {/* Paragraph with space */}
              <div className="pt-4">
                <p
                  className="text-sm text-gray-700 mb-6"
                  style={{ fontWeight: 400 }}
                >
                  Turn raw data into clear, actionable decisions with floneo AI.
                </p>
              </div>

              {/* Button */}
              <motion.button
                className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium text-sm"
                whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
                whileTap={{ scale: 0.95 }}
                style={{ fontWeight: 500 }}
              >
                Explore
              </motion.button>
            </div>
          </motion.div>

          {/* Middle Column - 140+ with Two-Way Scrolling Tickers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative overflow-hidden"
          >
            {/* Counter */}
            <div className="text-center mb-4">
              <motion.h2
                className="text-7xl sm:text-8xl lg:text-9xl font-semibold text-black"
                style={{ fontWeight: 600 }}
              >
                <motion.span>{rounded}</motion.span>+
              </motion.h2>
            </div>

            {/* Paragraph */}
            <p
              className="text-sm text-gray-700 leading-relaxed text-center mb-8 px-4"
              style={{ fontWeight: 400 }}
            >
              {data.global_description}
            </p>

            {/* Two-Line Country Ticker */}
            <div className="relative overflow-hidden">
              {/* Gradient Overlays */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

              {/* First Row - Left to Right */}
              <div className="mb-3 overflow-hidden">
                <motion.div
                  className="flex gap-3"
                  animate={{
                    x: [0, -1000],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 25,
                      ease: "linear",
                    },
                  }}
                >
                  {duplicatedCountries.map((country, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span
                        className="text-xs font-medium"
                        style={{ fontWeight: 500 }}
                      >
                        {country.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Second Row - Right to Left */}
              <div className="overflow-hidden">
                <motion.div
                  className="flex gap-3"
                  animate={{
                    x: [-1000, 0],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 25,
                      ease: "linear",
                    },
                  }}
                >
                  {duplicatedCountries.map((country, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white whitespace-nowrap flex-shrink-0"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span
                        className="text-xs font-medium"
                        style={{ fontWeight: 500 }}
                      >
                        {country.name}
                      </span>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Key Statistics with Gradient Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="z-10 bg-white"
          >
            <div className="space-y-6">
              <h3
                className="text-2xl font-semibold text-black mb-2"
                style={{ fontWeight: 600 }}
              >
                Key Statistics
              </h3>
              <p
                className="text-sm text-gray-600 mb-8"
                style={{ fontWeight: 400 }}
              >
                The Impact You Can Measure
              </p>

              {/* Statistics with Gradient Bars */}
              <div className="space-y-8">
                {/* Spending Habits */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className="text-sm text-gray-700"
                      style={{ fontWeight: 400 }}
                    >
                      {data.stat_1_label}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #10b981 0%, #34d399 100%)",
                      }}
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? { width: `${data.stat_1_value}%` }
                          : { width: 0 }
                      }
                      transition={{
                        duration: 1.2,
                        delay: 0.7,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>

                {/* Cost Reductions */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className="text-sm text-gray-700"
                      style={{ fontWeight: 400 }}
                    >
                      {data.stat_2_label}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #10b981 0%, #34d399 100%)",
                      }}
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? { width: `${data.stat_2_value}%` }
                          : { width: 0 }
                      }
                      transition={{
                        duration: 1.2,
                        delay: 0.9,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>

                {/* Budget Optimization */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className="text-sm text-gray-700"
                      style={{ fontWeight: 400 }}
                    >
                      {data.stat_3_label}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #fbbf24 0%, #fcd34d 100%)",
                      }}
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? { width: `${data.stat_3_value}%` }
                          : { width: 0 }
                      }
                      transition={{
                        duration: 1.2,
                        delay: 1.1,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
