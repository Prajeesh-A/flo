"use client";

import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";

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
            AI-Powered Analytics
          </h2>

          <p
            className="text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: "#444444",
              lineHeight: "1.5",
            }}
          >
            floneo's AI engine identifies inefficiencies, predicts risks, and
            surfaces real-time insights empowering teams to make faster,
            smarter, and data-driven decisions without the guesswork.
          </p>
        </motion.div>

        {/* 2x2 Grid Layout for Circles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-6 sm:gap-y-8 items-center max-w-4xl mx-auto mb-16">
          {/* Top Left - 85% Pink Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              type: "spring",
              stiffness: 100,
            }}
          >
            <CircularMetric
              percentage="85%"
              description="gain budget control in 2 weeks."
              color="bg-pink-400"
            />
          </motion.div>

          {/* Top Right - 90% Green Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            <CircularMetric
              percentage="90%"
              description="of leaders use floneo to cut hours and speed decisions."
              color="bg-green-400"
            />
          </motion.div>

          {/* Bottom Left - 70% Yellow Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              type: "spring",
              stiffness: 100,
            }}
          >
            <CircularMetric
              percentage="70%"
              description="of teams accelerate process adoption in under 6 weeks."
              color="bg-yellow-400"
            />
          </motion.div>

          {/* Bottom Right - 84% Blue Circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: 0.4,
              type: "spring",
              stiffness: 100,
            }}
          >
            <CircularMetric
              percentage="84%"
              description="of users improve savings in 3 months."
              color="bg-blue-400"
            />
          </motion.div>
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
            Predict Financial Trends
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: "#555555",
              lineHeight: "1.5",
            }}
          >
            Utilize advanced AI analytics to predict upcoming financial trends,
            helping you stay ahead of the curve and make proactive decisions
            that safeguard and grow your wealth.
          </p>
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
            Enhance Operational Strategy
          </h3>
          <p
            className="text-sm md:text-base leading-relaxed"
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 400,
              color: "#555555",
              lineHeight: "1.5",
            }}
          >
            floneo empowers enterprises to design, deploy, and scale workflows
            without IT bottlenecks. With drag-and-drop simplicity and AI
            insights, teams automate faster and smarter.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
