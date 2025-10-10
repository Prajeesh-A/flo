"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { api, useApiData } from "@/lib/api";
import { useState } from "react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  delay?: number;
}

interface HeroTestimonialProps {
  quote: string;
  name: string;
  role: string;
  caption: string;
  delay?: number;
}

const TestimonialCard = ({
  quote,
  name,
  role,
  avatar,
  delay = 0,
}: TestimonialCardProps) => {
  const [imageError, setImageError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.32,
        delay,
        ease: [0.2, 0.6, 0.2, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 30px rgba(0,0,0,0.22)",
        borderColor: "#00FF3C",
      }}
      className="bg-[#1E1E1E] rounded-[24px] p-6 shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-[rgba(255,255,255,0.06)] hover:border-[#00FF3C] transition-all duration-300 min-h-[180px] flex flex-col"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Stars */}
      <div className="flex gap-[2px] mb-3" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="text-[#F4B400] text-sm hover:opacity-100 opacity-90 transition-opacity"
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <p
        className="text-sm leading-[1.7] flex-1"
        style={{
          color: "rgba(240, 240, 240, 0.8)",
          fontWeight: 400,
        }}
      >
        "{quote}"
      </p>

      {/* Footer */}
      <div className="flex items-center gap-[10px] mt-4">
        <div className="w-8 h-8 rounded-full border-2 border-[rgba(255,255,255,0.12)] overflow-hidden bg-gray-600 flex items-center justify-center">
          {!imageError && avatar ? (
            <Image
              src={avatar}
              alt={`${name} avatar`}
              width={32}
              height={32}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold">
              {name.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <div
            className="text-[13px] font-medium text-white"
            style={{ fontWeight: 500 }}
          >
            {name}
          </div>
          <div
            className="text-xs text-[#3AAFFF]"
            style={{ letterSpacing: "0.04em" }}
          >
            {role}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const HeroTestimonial = ({
  quote,
  name,
  role,
  caption,
  delay = 0,
}: HeroTestimonialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.32,
        delay,
        ease: [0.2, 0.6, 0.2, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow: "0 12px 30px rgba(0,0,0,0.22)",
        borderColor: "#00FF3C",
      }}
      className="bg-[#1E1E1E] rounded-[24px] p-8 shadow-[0_8px_24px_rgba(0,0,0,0.18)] border border-[rgba(255,255,255,0.06)] hover:border-[#00FF3C] transition-all duration-300"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Video with overlapping caption */}
      <div className="relative mb-4">
        <div className="w-full h-[300px] rounded-[18px] overflow-hidden">
          <video
            src="/testimonial.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
            style={{ objectPosition: "center" }}
            onLoadStart={() => console.log("Video loading started")}
            onCanPlay={() => console.log("Video can play")}
          >
            <source src="/testimonial.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div
          className="absolute bottom-0 left-4 right-4 bg-[#2A2A2A] rounded-[16px] px-4 py-[10px] text-xs text-[#F0F0F0]"
          style={{ transform: "translateY(12px)" }}
        >
          {caption}
        </div>
      </div>

      {/* Quote */}
      <p
        className="text-base leading-[1.7] mt-4"
        style={{
          color: "rgba(240, 240, 240, 0.8)",
          fontWeight: 400,
        }}
      >
        "{quote}"
      </p>

      {/* Name and Role */}
      <div className="mt-3 pb-7">
        <h4
          className="text-xl font-semibold text-white"
          style={{ fontWeight: 600 }}
        >
          {name}
        </h4>
        <p
          className="text-xs text-[#F4B400] mt-1"
          style={{ letterSpacing: "0.04em" }}
        >
          {role}
        </p>
      </div>
    </motion.div>
  );
};

export default function Testimonials() {
  // Fetch testimonials from API
  const {
    data: apiTestimonials,
    loading,
    error,
  } = useApiData(api.getTestimonials);

  // Fallback testimonials if API fails
  const fallbackTestimonials = [
    {
      quote:
        " floneo has transformed the way I manage money. It's easy to use, tracks my spending, and helps me make smarter financial decisions.",
      author_name: "Amara Nzeka",
      author_title: "Freelancer",
      author_company: "",
    },
    {
      quote:
        " floneo is the most intuitive budgeting app I've used. From the clean design to the easy setup, it's a game changer.",
      author_name: "Elijah Grove",
      author_title: "Small Biz Owner",
      author_company: "",
    },
    {
      quote:
        "I'm new to budgeting, and  floneo makes it easy to get started. The tips and insights have helped me save money.",
      author_name: "Tristan Hoke",
      author_title: "College Student",
      author_company: "",
    },
  ];

  // Use API data or fallback
  const testimonials = apiTestimonials || fallbackTestimonials;

  // Transform API data to component format
  const transformedTestimonials = testimonials.map((testimonial) => ({
    quote: testimonial.quote,
    name: testimonial.author_name,
    role: `${testimonial.author_title}${
      testimonial.author_company ? ` at ${testimonial.author_company}` : ""
    }`,
    avatar: "", // No avatar in API, will show initials
  }));

  return (
    <section className="bg-white py-[72px]">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Gold Panel Container */}
        <div
          className="bg-[#F4B400] rounded-[28px] px-12 py-14"
          style={{
            boxShadow: "inset 0 2px 0 rgba(0,0,0,0.08)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-12 items-start mb-12">
            {/* Left Block */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-xs mb-2"
                style={{
                  letterSpacing: "0.16em",
                  color: "rgba(30, 30, 30, 0.6)",
                  fontWeight: 400,
                }}
              >
                US TESTIMONIALS
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl leading-[1.1] text-[#1E1E1E]"
                style={{ fontWeight: 600 }}
              >
                Customer
                <br />
                Experiences
              </motion.h2>
            </div>

            {/* Right Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-[320px]"
            >
              <p
                className="text-sm leading-[1.6]"
                style={{
                  color: "rgba(30, 30, 30, 0.8)",
                  fontWeight: 400,
                }}
              >
                See how our customers are achieving their goals with floneo.
                Read their experiences and success stories.
              </p>
            </motion.div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr_1fr] gap-8 lg:gap-8 items-stretch">
            {/* Left Column */}
            <div className="flex flex-col gap-6">
              <TestimonialCard {...transformedTestimonials[0]} delay={0} />
              {transformedTestimonials[1] && (
                <TestimonialCard {...transformedTestimonials[1]} delay={0.1} />
              )}
            </div>

            {/* Center Column - Hero */}
            <HeroTestimonial
              quote=" floneo makes managing your finances simple and smart. With insights, we empower you to take control of your money - whether it's budgeting, saving, or investing."
              name="Leo Donovan"
              role=" floneo CEO, Founder"
              caption=" floneo CEO, Founder"
              delay={0.2}
            />

            {/* Right Column */}
            <div className="flex flex-col gap-6">
              {transformedTestimonials[2] && (
                <TestimonialCard {...transformedTestimonials[2]} delay={0.3} />
              )}
              {transformedTestimonials[3] && (
                <TestimonialCard {...transformedTestimonials[3]} delay={0.4} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
