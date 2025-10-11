"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useApiData } from "../lib/api";
import { api } from "../lib/api";
import { RichTextRenderer } from "./SafeHTMLRenderer";

// Circular Metric Card Component
const CircularMetric = ({
  percentage,
  description,
  color,
}: {
  percentage: string;
  description: string;
  color: string;
}) => {
  return (
    <div className="relative place-self-center">
      {/* Main Circle */}
      <div
        className={`w-40 h-40 md:w-48 md:h-48 rounded-full ${color} flex flex-col items-center justify-center border-4 border-black shadow-lg relative`}
      >
        <div
          className="text-2xl md:text-3xl font-bold text-white mb-1"
          style={{ fontFamily: "'Poppins', ", fontWeight: 700 }}
        >
          {percentage}
        </div>
        <div
          className="text-xs md:text-sm text-white text-center leading-tight px-2"
          style={{ fontFamily: "'Poppins', ", fontWeight: 500 }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default function AIPoweredAnalytics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // URGENT FIX: Use correct API endpoint that exists
  // Section metadata - using hardcoded for now since /api/ai-analytics/ doesn't exist
  const sectionData = {
    title: "AI-Powered Analytics",
    subtitle: "Intelligent Insights",
    description:
      "floneo's AI engine identifies inefficiencies, predicts bottlenecks, and suggests optimizations — turning your operations into a competitive advantage.",
    is_visible: true,
  };
  const loading = false;
  const error = null;

  // Fetch metrics from API (this endpoint works!)
  const {
    data: metricsData,
    loading: metricsLoading,
    error: metricsError,
  } = useApiData(api.getMetrics);

  // Fallback data
  const fallbackData = {
    title: "AI-Powered Analytics",
    subtitle: "Intelligent Insights",
    description:
      "floneo's AI engine identifies inefficiencies, predicts risks, and surfaces real-time insights empowering teams to make faster, smarter, and data-driven decisions without the guesswork.",
    metric_1_value: "85%",
    metric_1_description: "gain budget control in 2 weeks.",
    metric_1_color: "#EC4899", // pink-400
    metric_2_value: "90%",
    metric_2_description:
      "of leaders use floneo to cut hours and speed decisions.",
    metric_2_color: "#4ADE80", // green-400
    metric_3_value: "70%",
    metric_3_description:
      "of teams accelerate process adoption in under 6 weeks.",
    metric_3_color: "#FACC15", // yellow-400
    metric_4_value: "84%",
    metric_4_description: "of users improve savings in 3 months.",
    metric_4_color: "#60A5FA", // blue-400
    feature_1_title: "Predict Financial Trends",
    feature_1_description:
      "Utilize advanced AI analytics to predict upcoming financial trends, helping you stay ahead of the curve and make proactive decisions that safeguard and grow your wealth.",
    feature_2_title: "Enhance Operational Strategy",
    feature_2_description:
      "floneo empowers enterprises to design, deploy, and scale workflows without IT bottlenecks. With drag-and-drop simplicity and AI insights, teams automate faster and smarter.",
    is_visible: true,
  };

  // URGENT FIX: Use working API data
  const data = sectionData; // This is now hardcoded since endpoint doesn't exist
  const metrics = metricsData; // This comes from working API

  // URGENT: Don't render if no metrics from API
  if (!metrics) {
    return (
      <section id="ai-analytics" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>🚨 URGENT:</strong> Metrics API not working!
            <br />
            Error: {metricsError || "No data from /api/metrics/"}
            <br />
            Check Django admin Metrics and API connectivity immediately!
          </div>
        </div>
      </section>
    );
  }

  // Don't render if not visible
  if (!data.is_visible) {
    return null;
  }

  // Loading state
  if (loading) {
    return (
      <section id="ai-analytics" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="ai-analytics" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center text-red-600">
            <p>Failed to load AI Analytics section. Using default content.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="ai-analytics" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: "#00FF3C",
              letterSpacing: "0.5px",
            }}
          >
            {loading ? "Loading..." : data.title}
          </h2>

          <RichTextRenderer
            content={loading ? "Loading description..." : data.description}
            fallback="floneo's AI engine identifies inefficiencies, predicts risks, and surfaces real-time insights empowering teams to make faster, smarter, and data-driven decisions without the guesswork."
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: "#444444",
              lineHeight: "1.5",
            }}
          />
        </motion.div>

        {/* 2x2 Grid Layout for Circles - Using API Data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-6 sm:gap-y-8 items-center max-w-4xl mx-auto mb-16">
          {metrics.results &&
            metrics.results.slice(0, 4).map((metric, index) => {
              const colors = [
                "bg-pink-400",
                "bg-green-400",
                "bg-yellow-400",
                "bg-blue-400",
              ];
              return (
                <motion.div
                  key={metric.id}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <CircularMetric
                    percentage={`${metric.value}${metric.suffix || ""}`}
                    description={metric.description}
                    color={colors[index] || "bg-gray-400"}
                  />
                </motion.div>
              );
            })}
        </div>

        {/* Center Content - Predict Financial Trends */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h3
            className="text-xl md:text-2xl font-semibold mb-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              color: "#333333",
            }}
          >
            {data.feature_1_title}
          </h3>
          <RichTextRenderer
            content={data.feature_1_description}
            fallback="Utilize advanced AI analytics to predict upcoming financial trends, helping you stay ahead of the curve and make proactive decisions that safeguard and grow your wealth."
            className="text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: "#555555",
              lineHeight: "1.5",
            }}
          />
        </motion.div>

        {/* Bottom Content - Enhance Operational Strategy */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h3
            className="text-xl md:text-2xl font-semibold mb-4"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600,
              color: "#3AAFFF",
            }}
          >
            {data.feature_2_title}
          </h3>
          <RichTextRenderer
            content={data.feature_2_description}
            fallback="floneo empowers enterprises to design, deploy, and scale workflows without IT bottlenecks. With drag-and-drop simplicity and AI insights, teams automate faster and smarter."
            className="text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: "#555555",
              lineHeight: "1.5",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
