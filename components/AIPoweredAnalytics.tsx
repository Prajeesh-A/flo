"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useApiData } from "@/lib/api";
import { api } from "@/lib/api";
import { RichTextRenderer } from "@/components/SafeHTMLRenderer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Define complete type for the data we need
interface MetricData {
  title?: string;
  description?: string;
  metric_1_value?: string;
  metric_1_description?: string;
  metric_2_value?: string;
  metric_2_description?: string;
  metric_3_value?: string;
  metric_3_description?: string;
  metric_4_value?: string;
  metric_4_description?: string;
  feature_1_title?: string;
  feature_1_description?: string;
  feature_2_title?: string;
  feature_2_description?: string;
  is_visible?: boolean;
  [key: string]: any; // Allow additional properties
}

// Circular Metric Card Component
const CircularMetric = ({
  percentage,
  description,
  color,
  delay = 0,
}: {
  percentage: string;
  description: string;
  color: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: delay,
        type: "spring",
        stiffness: 100,
      }}
      className="relative"
    >
      {/* Outer glow ring */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-30"
        style={{ backgroundColor: color }}
      />
      
      {/* Main Circle */}
      <div
        className="relative w-44 h-44 md:w-52 md:h-52 lg:w-56 lg:h-56 rounded-full flex flex-col items-center justify-center border-[6px] border-gray-900 shadow-2xl"
        style={{ backgroundColor: color }}
      >
        <div
          className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 ${poppins.className}`}
          style={{ fontWeight: 700 }}
        >
          {percentage}
        </div>
        <div
          className={`text-sm md:text-base text-white text-center leading-snug px-6 ${poppins.className}`}
          style={{ fontWeight: 500 }}
        >
          {description}
        </div>
      </div>
    </motion.div>
  );
};

export default function AIPoweredAnalytics() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Fetch AI Analytics section from API
  const {
    data: apiData,
    loading: aiAnalyticsLoading,
  } = useApiData(api.getAIPoweredAnalyticsSection);

  // Fallback data
  const fallbackData: MetricData = {
    title: "AI-Powered Analytics",
    description:
      "Harness the power of AI to transform your data into actionable insights",
    metric_1_value: "95%",
    metric_1_description: "Get instant insights from your data",
    metric_2_value: "2.3x",
    metric_2_description: "Forecast trends and outcomes",
    metric_3_value: "24/7",
    metric_3_description: "Always available",
    metric_4_value: "99.9%",
    metric_4_description: "Generate reports automatically",
    feature_1_title: "Real-time Analysis",
    feature_1_description:
      "Get instant insights from your data with real-time analytics and reporting",
    feature_2_title: "Predictive Modeling",
    feature_2_description:
      "Forecast trends and outcomes with advanced AI-powered predictive models",
    is_visible: true,
  };

  // Merge API data with fallback, ensuring all properties exist
  const data: MetricData = {
    ...fallbackData,
    ...(apiData as MetricData),
  };

  if (data.is_visible === false) return null;

  return (
    <section
      id="ai-analytics"
      ref={sectionRef}
      className={`py-20 md:py-24 bg-gradient-to-br from-gray-50 to-white ${poppins.className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-12 lg:items-center">
          {/* Row 1 - Title & Top Right Circle */}
          <div className="col-span-2">
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2
                className={`text-5xl md:text-6xl font-bold mb-6 leading-tight ${poppins.className}`}
                style={{ color: "#10b981", fontWeight: 700 }}
              >
                {data.title}
              </h2>
              <RichTextRenderer
                content={data.description || ""}
                fallback="Harness the power of AI to transform your data into actionable insights"
                className="text-lg leading-relaxed text-gray-600 max-w-xl"
              />
            </motion.div>
          </div>
          
          <div className="flex justify-center lg:justify-end">
            <CircularMetric
              percentage={data.metric_1_value || "95%"}
              description={data.metric_1_description || "Get instant insights"}
              color="#10b981"
              delay={0.2}
            />
          </div>

          {/* Row 2 - Left Circle, Center Text, Right Circle */}
          <div className="flex justify-center lg:justify-start">
            <CircularMetric
              percentage={data.metric_2_value || "2.3x"}
              description={data.metric_2_description || "Forecast trends"}
              color="#ec4899"
              delay={0.3}
            />
          </div>

          <div className="flex items-center justify-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center max-w-lg"
            >
              <h3
                className={`text-3xl font-semibold mb-4 ${poppins.className}`}
                style={{ color: "#1f2937", fontWeight: 600 }}
              >
                {data.feature_1_title || "Real-time Analysis"}
              </h3>
              <RichTextRenderer
                content={data.feature_1_description || ""}
                fallback="Get instant insights from your data"
                className="text-base leading-relaxed text-gray-600"
              />
            </motion.div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <CircularMetric
              percentage={data.metric_4_value || "99.9%"}
              description={data.metric_4_description || "Generate reports"}
              color="#60a5fa"
              delay={0.5}
            />
          </div>

          {/* Row 3 - Bottom Left Circle & Right Text */}
          <div className="flex justify-center lg:justify-start">
            <CircularMetric
              percentage={data.metric_3_value || "24/7"}
              description={data.metric_3_description || "Always available"}
              color="#facc15"
              delay={0.6}
            />
          </div>

          <div className="col-span-2 flex items-center justify-end">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-right max-w-xl"
            >
              <h3
                className={`text-3xl font-semibold mb-4 ${poppins.className}`}
                style={{ color: "#3b82f6", fontWeight: 600 }}
              >
                {data.feature_2_title || "Predictive Modeling"}
              </h3>
              <RichTextRenderer
                content={data.feature_2_description || ""}
                fallback="Forecast trends and outcomes"
                className="text-base leading-relaxed text-gray-600"
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-12">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <h2
              className={`text-4xl font-bold mb-6 leading-tight ${poppins.className}`}
              style={{ color: "#10b981", fontWeight: 700 }}
            >
              {data.title}
            </h2>
            <RichTextRenderer
              content={data.description || ""}
              fallback="Harness the power of AI to transform your data"
              className="text-base leading-relaxed text-gray-600"
            />
          </motion.div>

          <div className="space-y-10">
            <div className="flex justify-center">
              <CircularMetric
                percentage={data.metric_1_value || "95%"}
                description={data.metric_1_description || "Get instant insights"}
                color="#10b981"
                delay={0.2}
              />
            </div>

            <div className="flex justify-center">
              <CircularMetric
                percentage={data.metric_2_value || "2.3x"}
                description={data.metric_2_description || "Forecast trends"}
                color="#ec4899"
                delay={0.3}
              />
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center px-4"
            >
              <h3 className={`text-2xl font-semibold mb-4 ${poppins.className}`}>
                {data.feature_1_title || "Real-time Analysis"}
              </h3>
              <RichTextRenderer
                content={data.feature_1_description || ""}
                fallback="Get instant insights from your data"
                className="text-base leading-relaxed text-gray-600"
              />
            </motion.div>

            <div className="flex justify-center">
              <CircularMetric
                percentage={data.metric_3_value || "24/7"}
                description={data.metric_3_description || "Always available"}
                color="#facc15"
                delay={0.5}
              />
            </div>

            <div className="flex justify-center">
              <CircularMetric
                percentage={data.metric_4_value || "99.9%"}
                description={data.metric_4_description || "Generate reports"}
                color="#60a5fa"
                delay={0.6}
              />
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-center px-4"
            >
              <h3
                className={`text-2xl font-semibold mb-4 ${poppins.className}`}
                style={{ color: "#3b82f6", fontWeight: 600 }}
              >
                {data.feature_2_title || "Predictive Modeling"}
              </h3>
              <RichTextRenderer
                content={data.feature_2_description || ""}
                fallback="Forecast trends and outcomes"
                className="text-base leading-relaxed text-gray-600"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
