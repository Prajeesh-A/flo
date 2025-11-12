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

  // Fetch AI Analytics section from API
  const {
    data: aiAnalyticsData,
    loading: aiAnalyticsLoading,
    error: aiAnalyticsError,
  } = useApiData(api.getAIPoweredAnalyticsSection);

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
      "Utilize advanced AI analytics to predict upcoming financial trends, helping you stay ahead of the curve.",
    feature_2_title: "Enhance Operational Strategy",
    feature_2_description:
      "floneo empowers enterprises to design, deploy, and scale workflows without IT bottlenecks.",
    feature_3_title: "Real-time Monitoring",
    feature_3_description:
      "Monitor your systems and processes in real-time with advanced analytics",
    is_visible: true,
  };

  // Use AI Analytics data or fallback
  const data = aiAnalyticsData || fallbackData;

  // Create metrics from AI Analytics features
  const metrics = {
    results: [
      {
        id: 1,
        value: "95",
        suffix: "%",
        label: data.feature_1_title || "Accuracy",
        description: data.feature_1_description || "AI prediction accuracy",
        color: "bg-pink-400",
      },
      {
        id: 2,
        value: "2.3",
        suffix: "x",
        label: data.feature_2_title || "Faster",
        description:
          data.feature_2_description || "Processing speed improvement",
        color: "bg-green-400",
      },
      {
        id: 3,
        value: "99.9",
        suffix: "%",
        label: data.feature_3_title || "Uptime",
        description: data.feature_3_description || "System reliability",
        color: "bg-blue-400",
      },
      {
        id: 4,
        value: "24/7",
        suffix: "",
        label: "Support",
        description: "Always available",
        color: "bg-purple-400",
      },
    ],
  };

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
        {/* Desktop Layout - Hidden on Mobile */}
        <div className="hidden lg:block">
          {/* First row */}
          <div className="flex ">
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                initial={{ y: -30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-left mb-16"
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
            </div>
            <div className="flex-1 flex items-center justify-center">
            </div>
            <div className="flex-1 flex items-center justify-center pb-4 mb-6">
              <motion.div
                key={metrics.results[0].id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + 0 * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <CircularMetric
                  percentage={`${metrics.results[0].value}${metrics.results[0].suffix || ""}`}
                  description={metrics.results[0].description}
                  color={"bg-green-400"}
                />
              </motion.div>
            </div>
          </div>
          {/* Second Row */}
          <div className="flex ">
            <div className="flex-1 flex items-center justify-center mb-4 pb-4">
              <motion.div
                key={metrics.results[1].id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + 1 * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <CircularMetric
                  percentage={`${metrics.results[1].value}${metrics.results[1].suffix || ""}`}
                  description={metrics.results[1].description}
                  color={"bg-pink-400"}
                />
              </motion.div>
            </div>
            <div className="flex-1 flex items-center justify-center ">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center max-w-2xl mx-auto mb-16"
              >
                <h3
                  className="text-xl md:text-2xl font-semibold mt-8"
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
                  className="text-sm md:text-base leading-relaxed mt-4"
                  style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 400,
                    color: "#555555",
                    lineHeight: "1.5",
                  }}
                />
              </motion.div>
            </div>
            <div className="flex-1 flex items-center justify-center mb-4 pb-4">
              <motion.div
                key={metrics.results[2].id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + 1 * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <CircularMetric
                  percentage={`${metrics.results[2].value}${metrics.results[2].suffix || ""}`}
                  description={metrics.results[2].description}
                  color={"bg-blue-400"}
                />
              </motion.div>
            </div>
          </div>
          {/* Third Row */}
          <div className="flex ">
            <div className="flex-1 flex items-center justify-center mt-4 pt-4">
              <motion.div
                key={metrics.results[3].id}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + 2 * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                <CircularMetric
                  percentage={`${metrics.results[3].value}${metrics.results[3].suffix || ""}`}
                  description={metrics.results[3].description}
                  color={"bg-yellow-400"}
                />
              </motion.div>
            </div>
            <div className="flex-1 flex items-center justify-center">
            </div>
            <div className="flex-1 flex items-center justify-center ">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-right max-w-2xl mx-auto "
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
          </div>
        </div>

        {/* Mobile Layout - Hidden on Desktop */}
        <div className="lg:hidden space-y-8">
          {/* Text 1 */}
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h2
              className="text-3xl font-bold mb-4"
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
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: "#444444",
                lineHeight: "1.5",
              }}
            />
          </motion.div>

          {/* Circle 1 */}
          <motion.div
            key={metrics.results[0].id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              type: "spring",
              stiffness: 100,
            }}
            className="flex justify-center"
          >
            <CircularMetric
              percentage={`${metrics.results[0].value}${metrics.results[0].suffix || ""}`}
              description={metrics.results[0].description}
              color={"bg-green-400"}
            />
          </motion.div>

          {/* Circle 2 */}
          <motion.div
            key={metrics.results[1].id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
            className="flex justify-center"
          >
            <CircularMetric
              percentage={`${metrics.results[1].value}${metrics.results[1].suffix || ""}`}
              description={metrics.results[1].description}
              color={"bg-pink-400"}
            />
          </motion.div>

          {/* Text 2 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <h3
              className="text-xl font-semibold mb-4"
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
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: "#555555",
                lineHeight: "1.5",
              }}
            />
          </motion.div>

          {/* Circle 3 */}
          <motion.div
            key={metrics.results[3].id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.5,
              type: "spring",
              stiffness: 100,
            }}
            className="flex justify-center"
          >
            <CircularMetric
              percentage={`${metrics.results[3].value}${metrics.results[3].suffix || ""}`}
              description={metrics.results[3].description}
              color={"bg-yellow-400"}
            />
          </motion.div>

          {/* Circle 4 */}
          <motion.div
            key={metrics.results[2].id}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              type: "spring",
              stiffness: 100,
            }}
            className="flex justify-center"
          >
            <CircularMetric
              percentage={`${metrics.results[2].value}${metrics.results[2].suffix || ""}`}
              description={metrics.results[2].description}
              color={"bg-blue-400"}
            />
          </motion.div>

          {/* Text 3 */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <h3
              className="text-xl font-semibold mb-4"
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
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 400,
                color: "#555555",
                lineHeight: "1.5",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
