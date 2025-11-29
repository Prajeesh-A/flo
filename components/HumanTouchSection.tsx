"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { RefreshCw, Users } from "lucide-react";

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

// Helper function to get mobile-optimized chat timing (slower for mobile)
const getMobileChatTiming = (
  desktopTiming: number,
  isMobile: boolean
): number => {
  return isMobile ? desktopTiming * 1.8 : desktopTiming; // 80% slower on mobile
};

/**
 * HumanTouchSection - Animated section with sliding text and chat mockup
 *
 * Features:
 * - Text slides in from left ("Human") and right ("Touch")
 * - Mobile phone mockup with animated chat conversation
 * - Scroll-triggered animations
 * - Responsive design
 */

// Default chat messages (fallback)
const defaultChatMessages = [
  { id: 1, text: "Yo, Michi!", sender: "user", order: 1, delay: 0 },
  {
    id: 2,
    text: "Have you heard of floneo?",
    sender: "user",
    order: 2,
    delay: 0.5,
  },
  { id: 3, text: "Hi, Michi", sender: "bot", order: 3, delay: 1.5 },
  {
    id: 4,
    text: "No, I haven't. What is it?",
    sender: "bot",
    order: 4,
    delay: 2,
  },
  {
    id: 5,
    text: "It's an app for managing your finances",
    sender: "user",
    order: 5,
    delay: 3,
  },
  { id: 6, text: "Check it out 😊", sender: "user", order: 6, delay: 3.5 },
  { id: 7, text: "Wow 😍😍😍", sender: "bot", order: 7, delay: 4.5 },
  {
    id: 8,
    text: "It looks very convenient and modern! I want to try it",
    sender: "bot",
    order: 8,
    delay: 5,
  },
  { id: 9, text: "Really cool App", sender: "user", order: 9, delay: 6 },
  { id: 10, text: "😍", sender: "user", order: 10, delay: 6.2 },
  {
    id: 11,
    text: "Already installed it! Thanks!",
    sender: "bot",
    order: 11,
    delay: 7,
  },
];

// Typing indicator component
function TypingIndicator({ isMobile }: { isMobile: boolean }) {
  return (
    <div className="flex items-center gap-1 px-4 py-3 bg-[#EDEDED] rounded-2xl rounded-bl-sm w-fit">
      <motion.div
        className="w-2 h-2 bg-gray-500 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: getMobileDuration(1, isMobile),
          repeat: Infinity,
          delay: 0,
        }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-500 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: getMobileDuration(1, isMobile),
          repeat: Infinity,
          delay: getMobileDuration(0.2, isMobile),
        }}
      />
      <motion.div
        className="w-2 h-2 bg-gray-500 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{
          duration: getMobileDuration(1, isMobile),
          repeat: Infinity,
          delay: getMobileDuration(0.4, isMobile),
        }}
      />
    </div>
  );
}

// Chat bubble component - Memoized for performance
const ChatBubble = React.memo(
  ({
    message,
    isVisible,
    isMobile,
  }: {
    message: any;
    isVisible: boolean;
    isMobile: boolean;
  }) => {
    const isUser = message.sender === "user";

    return (
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.95 }}
        animate={
          isVisible
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 0, y: 15, scale: 0.95 }
        }
        transition={{
          duration: getMobileDuration(0.6, isMobile),
          ease: "easeOut",
          type: isMobile ? "tween" : "spring", // Use tween on mobile for more stable animations
          stiffness: isMobile ? undefined : 100,
        }}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
        style={{ willChange: isVisible ? "transform, opacity" : "auto" }}
      >
        <div
          className={`max-w-[75%] ${isMobile ? "px-3 py-2" : "px-4 py-3"} ${
            isUser
              ? "bg-gradient-to-r from-[#0066FF] to-[#0099FF] text-white rounded-2xl rounded-br-sm"
              : "bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white rounded-2xl rounded-bl-sm"
          }`}
        >
          <p className={`leading-relaxed ${isMobile ? "text-xs" : "text-sm"}`}>
            {message.text}
          </p>
        </div>
      </motion.div>
    );
  }
);

ChatBubble.displayName = "ChatBubble";

// Phone mockup component
// Phone mockup component with FIXED realistic notch
function PhoneMockup({
  isInView,
  chatMessages,
  isMobile,
}: {
  isInView: boolean;
  chatMessages: any[];
  isMobile: boolean;
}) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // [Keep all your existing useEffect hooks and functions - scrollToBottom, animateNextMessage, etc.]
  const scrollToBottom = (delay = 0) => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        const container = chatContainerRef.current;
        const isNearBottom =
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
          100;
        if (isNearBottom || visibleMessages.length > 3) {
          requestAnimationFrame(() => {
            container.scrollTo({
              top: container.scrollHeight,
              behavior: isMobile ? "auto" : "smooth",
            });
          });
        }
      }
    }, delay);
  };

  useEffect(() => {
    if (visibleMessages.length > 0 && visibleMessages.length > 2) {
      scrollToBottom(isMobile ? 800 : 300);
    }
  }, [visibleMessages, isMobile]);

  useEffect(() => {
    if (showTyping) scrollToBottom(200);
  }, [showTyping]);

  useEffect(() => {
    if (!isInView || isMobile) return;
    const startDelay = setTimeout(() => {
      const autoScrollInterval = setInterval(() => {
        if (chatContainerRef.current) {
          const container = chatContainerRef.current;
          const isAtBottom =
            container.scrollHeight -
              container.scrollTop -
              container.clientHeight <
            20;
          if (isAtBottom) {
            container.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            container.scrollBy({ top: 30, behavior: "smooth" });
          }
        }
      }, 3000);
      return () => clearInterval(autoScrollInterval);
    }, 8000);
    return () => clearTimeout(startDelay);
  }, [isInView, isMobile]);

  useEffect(() => {
    if (!isInView) {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      setVisibleMessages([]);
      setShowTyping(false);
      return;
    }
    const startDelay = setTimeout(() => {
      animateNextMessage(0);
    }, 2000);
    timeoutsRef.current.push(startDelay);
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isInView]);

  const animateNextMessage = (index: number) => {
    if (index >= chatMessages.length) return;
    const message = chatMessages[index];
    if (message.sender === "bot") {
      setShowTyping(true);
      const typingDuration = getMobileChatTiming(
        1200 + Math.random() * 600,
        isMobile
      );
      const typingTimeout = setTimeout(() => {
        setShowTyping(false);
        setVisibleMessages((prev) => [...prev, message.id]);
        if (index + 1 < chatMessages.length) {
          const nextMessageDelay = getMobileChatTiming(
            1800 + Math.random() * 400,
            isMobile
          );
          const nextTimeout = setTimeout(
            () => animateNextMessage(index + 1),
            nextMessageDelay
          );
          timeoutsRef.current.push(nextTimeout);
        }
      }, typingDuration);
      timeoutsRef.current.push(typingTimeout);
    } else {
      setVisibleMessages((prev) => [...prev, message.id]);
      if (index + 1 < chatMessages.length) {
        const nextMessageDelay = getMobileChatTiming(
          1200 + Math.random() * 600,
          isMobile
        );
        const nextTimeout = setTimeout(
          () => animateNextMessage(index + 1),
          nextMessageDelay
        );
        timeoutsRef.current.push(nextTimeout);
      }
    }
  };

  return (
    <>
      <style jsx>{`
        .chat-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView
            ? { opacity: 1, scale: 1, y: [0, -8, 0] }
            : { opacity: 0, scale: 0.9 }
        }
        transition={{
          opacity: {
            duration: getMobileDuration(0.8, isMobile),
            delay: getMobileDuration(1.3, isMobile),
            ease: [0.25, 0.1, 0.25, 1],
          },
          scale: {
            duration: getMobileDuration(0.8, isMobile),
            delay: getMobileDuration(1.3, isMobile),
            ease: [0.25, 0.1, 0.25, 1],
          },
          y: {
            duration: getMobileDuration(3, isMobile),
            repeat: isMobile ? 0 : Infinity,
            ease: "easeInOut",
            delay: getMobileDuration(2.5, isMobile),
          },
        }}
        className={`relative mx-auto ${
          isMobile ? "phone-mockup-container" : "w-full max-w-[340px]"
        }`}
        style={{
          filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))",
          willChange: isInView ? "transform, opacity" : "auto",
          zIndex: isMobile ? 10 : "auto",
        }}
      >
        {/* Phone frame - iPhone style with proper notch */}
        <div
          className={`relative bg-black rounded-[2.5rem] p-2 ${
            isMobile ? "w-[280px] h-[560px]" : "w-full aspect-[9.5/19]"
          }`}
        >
          {/* FIXED Dynamic Island / Notch - Realistic iPhone style */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 bg-black rounded-full z-30 ${
              isMobile
                ? "w-[100px] h-[26px] top-[8px]"
                : "w-[120px] h-[30px] top-[10px]"
            }`}
            style={{
              boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            }}
          />

          {/* Status bar elements - FIXED positioning around notch */}
          <div className="absolute top-5 left-0 right-0 z-20 flex justify-between items-start pt-3 px-6">
            {/* Left side - Time */}
            <div
              className={`${
                isMobile ? "text-[11px]" : "text-sm"
              } text-white font-semibold`}
            >
              9:41
            </div>

            {/* Right side - Signal, WiFi, Battery */}
            <div className="flex items-center gap-1">
              {/* Signal bars */}
              <div className="flex gap-[2px] items-end">
                {[3, 5, 7, 9].map((h, i) => (
                  <div
                    key={i}
                    className={`w-[3px] bg-white rounded-sm`}
                    style={{ height: `${h}px` }}
                  ></div>
                ))}
              </div>

              {/* WiFi icon */}
              <svg
                className={`${
                  isMobile ? "w-4 h-4" : "w-[18px] h-[18px]"
                } text-white ml-1`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.166 9.75a.75.75 0 00-.584 1.032A10.943 10.943 0 015 14.608a.75.75 0 00.998.039 10.93 10.93 0 012.002-1.492.75.75 0 00-.423-1.273 9.423 9.423 0 00-5.411-2.132zm15.668 0a.75.75 0 01.584 1.032 10.943 10.943 0 01-3.418 3.826.75.75 0 01-.998.039 10.93 10.93 0 00-2.002-1.492.75.75 0 01.423-1.273 9.423 9.423 0 015.411-2.132zM10 6.188a12.954 12.954 0 00-7.489 2.37.75.75 0 00.004 1.238 11.45 11.45 0 017.485 2.826.75.75 0 001.008 0 11.45 11.45 0 017.485-2.826.75.75 0 00.004-1.238A12.954 12.954 0 0010 6.188z" />
              </svg>

              {/* Battery */}
              <div
                className={`${
                  isMobile ? "w-[22px] h-[11px]" : "w-6 h-3"
                } border-2 border-white rounded-[4px] ml-1 relative`}
              >
                <div
                  className={`${
                    isMobile ? "w-[14px] h-[5px]" : "w-4 h-[6px]"
                  } bg-white rounded-[2px] absolute top-[1px] left-[1px]`}
                ></div>
                <div className="w-[2px] h-[6px] bg-white rounded-r-sm absolute -right-[3px] top-1/2 transform -translate-y-1/2"></div>
              </div>
            </div>
          </div>

          {/* Screen content */}
          <div
            className={`bg-black rounded-[2.5rem] overflow-hidden relative ${
              isMobile ? "w-[264px] h-[544px] pt-12" : "w-full h-full pt-14"
            }`}
          >
            {/* Chat messages */}
            <div
              ref={chatContainerRef}
              className={`chat-container overflow-y-auto overflow-x-hidden ${
                isMobile
                  ? "w-full h-[500px] p-4 space-y-3"
                  : "h-full p-4 space-y-3"
              }`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {chatMessages.map((message: any) => (
                <ChatBubble
                  key={message.id}
                  message={message}
                  isVisible={visibleMessages.includes(message.id)}
                  isMobile={isMobile}
                />
              ))}
              {showTyping && <TypingIndicator isMobile={isMobile} />}

              {visibleMessages.includes(6) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: getMobileDuration(0.5, isMobile),
                    delay: getMobileDuration(0.3, isMobile),
                  }}
                  className="flex justify-start mb-3"
                >
                  <div className="bg-white rounded-2xl p-4 max-w-[220px] shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src="/logo.png"
                          alt="floneo logo"
                          className="w-full h-full object-contain"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-black text-lg">
                          floneo
                        </span>
                        <span className="text-xs text-gray-500">LCNC</span>
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-gray-700">
                      Manage your Business effortlessly — modern, secure, and
                      easy-to-use.
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Decorative circles remain the same */}
        <motion.div
          animate={{ y: [0, -25, 0], rotate: [0, 5, 0] }}
          transition={{
            duration: getMobileDuration(8, isMobile),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-12 hidden md:block"
          style={{ willChange: "transform" }}
        >
          <div className="relative">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg opacity-95"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
              <RefreshCw size={24} className="text-white" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: getMobileDuration(7, isMobile),
            repeat: Infinity,
            ease: "easeInOut",
            delay: getMobileDuration(1, isMobile),
          }}
          className="absolute -right-32 bottom-28 hidden md:block"
          style={{ willChange: "transform" }}
        >
          <div className="relative">
            <div className="w-36 h-36 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg opacity-95"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-sm">
              <Users size={20} className="text-white" strokeWidth={2} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default function HumanTouchSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();

  // Use default chat messages
  const chatMessages = defaultChatMessages;

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
      style={{ fontFamily: "'Poppins'" }}
    >
      <div className="container mx-auto max-w-[1400px]">
        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Text Stack - Top (Vertically Stacked) */}
          <div className="flex flex-col items-center mb-12 lg:mb-16">
            {/* First Line - "Easy Workflow" */}
            <motion.h2
              initial={{ opacity: 0, x: -100 }}
              animate={
                isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
              }
              transition={{
                duration: getMobileDuration(1.2, isMobile),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="font-surgena text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-tight"
              style={{ fontWeight: 700 }}
            >
              Easy Workflow
            </motion.h2>

            {/* Second Line - "Management" */}
            <motion.h2
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
              transition={{
                duration: getMobileDuration(1.2, isMobile),
                delay: getMobileDuration(0.1, isMobile),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-6xl lg:text-7xl xl:text-8xl font-bold text-[#2ecc71] leading-tight"
              style={{ fontWeight: 700 }}
            >
              Management
            </motion.h2>
          </div>

          {/* Phone Mockup - Center Below Text */}
          <div className="relative flex items-center justify-center">
            <PhoneMockup
              isInView={isInView}
              chatMessages={chatMessages}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex flex-col items-center gap-6">
            {/* Bottom Text - "Easy Workflow" (title after phone on mobile) */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: getMobileDuration(1.2, isMobile),
                delay: getMobileDuration(0.1, isMobile),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-5xl sm:text-6xl font-bold text-black text-center"
              style={{ fontWeight: 700 }}
            >
              Easy Workflow
            </motion.h2>
            {/* Top Text - "Management" (subtitle first on mobile) */}
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{
                duration: getMobileDuration(1.2, isMobile),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-5xl sm:text-6xl font-bold text-[#2ecc71] text-center"
              style={{ fontWeight: 700 }}
            >
              Management
            </motion.h2>

            {/* Phone Mockup - Fixed size for mobile */}
            <PhoneMockup
              isInView={isInView}
              chatMessages={chatMessages}
              isMobile={isMobile}
            />
          </div>
        </div>

        {/* Bottom description text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: getMobileDuration(0.8, isMobile),
            delay: getMobileDuration(1.5, isMobile),
          }}
          className="mt-20 max-w-6xl mx-auto px-4"
        >
          {/* Section header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full mb-4"
            >
              <div className="w-2 h-2 bg-[#2ecc71] rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-[#2ecc71]">
                Why FloNeo?
              </span>
            </motion.div>
          </div>

          {/* Feature grid - Modern card design */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* Feature 1 - Lightning fast */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 1.7 }}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:border-[#2ecc71] transition-all duration-300 hover:shadow-lg hover:shadow-green-100/50"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#2ecc71]/10 to-transparent rounded-bl-[3rem] rounded-tr-3xl" />

              <div className="relative">
                {/* Icon badge */}
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#2ecc71] to-[#27ae60] rounded-2xl mb-5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  Prototype in hours,
                  <br />
                  launch in weeks
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Skip months of development. Build production-ready apps at
                  lightning speed with our visual platform.
                </p>
              </div>
            </motion.div>

            {/* Feature 2 - No-code simplicity */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 1.85 }}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:border-[#0066FF] transition-all duration-300 hover:shadow-lg hover:shadow-blue-100/50"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#0066FF]/10 to-transparent rounded-bl-[3rem] rounded-tr-3xl" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#0066FF] to-[#0099FF] rounded-2xl mb-5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  Drag-and-drop UI,
                  <br />
                  zero coding required
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Empower your entire team to build. Intuitive visual builder
                  means no technical skills needed.
                </p>
              </div>
            </motion.div>

            {/* Feature 3 - Real-time monitoring */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 2.0 }}
              className="group relative bg-white border border-gray-100 rounded-3xl p-8 hover:border-[#FFC107] transition-all duration-300 hover:shadow-lg hover:shadow-yellow-100/50"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[#FFC107]/10 to-transparent rounded-bl-[3rem] rounded-tr-3xl" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#FFC107] to-[#FFB300] rounded-2xl mb-5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
                  Real-time monitoring
                  <br />& smart alerts
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Stay in control with live dashboards and instant notifications
                  when it matters most.
                </p>
              </div>
            </motion.div>

            {/* Feature 4 - AI assistant */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: 2.15 }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 overflow-hidden"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2ecc71]/20 via-transparent to-[#0066FF]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white to-gray-100 rounded-2xl mb-5 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 leading-tight">
                  AI assistant for
                  <br />
                  instant support
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Never get stuck. Ask questions and get intelligent help 24/7
                  from our AI-powered assistant.
                </p>

                {/* Decorative element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#2ecc71]/20 to-transparent rounded-tl-[4rem]" />
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 2.4 }}
            className="text-center mt-12"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white border border-gray-200 px-6 py-4 rounded-2xl shadow-sm">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2ecc71] to-[#27ae60] border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0099FF] border-2 border-white" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FFC107] to-[#FFB300] border-2 border-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">
                Join <span className="font-bold text-gray-900">2,500+</span>{" "}
                teams building with FloNeo
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


