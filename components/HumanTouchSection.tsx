"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { RefreshCw, Users } from "lucide-react";
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
          type: "spring",
          stiffness: 100,
        }}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
        style={{ willChange: isVisible ? "transform, opacity" : "auto" }}
      >
        <div
          className={`px-4 py-3 max-w-[75%] ${
            isUser
              ? "bg-gradient-to-r from-[#0066FF] to-[#0099FF] text-white rounded-2xl rounded-br-sm"
              : "bg-gradient-to-r from-[#2ecc71] to-[#27ae60] text-white rounded-2xl rounded-bl-sm"
          }`}
        >
          <p className="text-sm leading-relaxed">{message.text}</p>
        </div>
      </motion.div>
    );
  }
);

ChatBubble.displayName = "ChatBubble";

// Phone mockup component
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

  // Function to smoothly scroll to bottom with delay
  const scrollToBottom = (delay = 0) => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        const container = chatContainerRef.current;
        const isNearBottom =
          container.scrollHeight -
            container.scrollTop -
            container.clientHeight <
          100;

        // Always scroll on mobile for better UX, or if near bottom, or if there are many messages
        if (isMobile || isNearBottom || visibleMessages.length > 2) {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: "smooth",
          });
        }
      }
    }, delay);
  };

  // Auto-scroll when new messages appear with slight delay for natural feel
  useEffect(() => {
    if (visibleMessages.length > 0) {
      // Faster scroll on mobile for better responsiveness
      const scrollDelay = isMobile ? 150 : 300;
      scrollToBottom(scrollDelay);
    }
  }, [visibleMessages, isMobile]);

  // Scroll when typing indicator appears/disappears
  useEffect(() => {
    if (showTyping) {
      // Faster scroll on mobile for typing indicator
      const scrollDelay = isMobile ? 100 : 200;
      scrollToBottom(scrollDelay);
    }
  }, [showTyping, isMobile]);

  useEffect(() => {
    if (!isInView) {
      // Clear all timeouts
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      setVisibleMessages([]);
      setShowTyping(false);
      return;
    }

    // Start chat animation after text settles (2s for more natural feel)
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

    // Show typing indicator for bot messages with realistic timing
    if (message.sender === "bot") {
      setShowTyping(true);

      // Typing indicator duration: 1.2-1.8 seconds (realistic typing time)
      const typingDuration = 1200 + Math.random() * 600; // 1.2-1.8s

      const typingTimeout = setTimeout(() => {
        setShowTyping(false);
        setVisibleMessages((prev) => [...prev, message.id]);

        // Force scroll after bot message appears (especially important on mobile)
        setTimeout(() => scrollToBottom(0), 100);

        // Wait for message to settle before next message
        if (index + 1 < chatMessages.length) {
          const nextMessageDelay = 1800 + Math.random() * 400; // 1.8-2.2s delay for bot messages
          const nextTimeout = setTimeout(
            () => animateNextMessage(index + 1),
            nextMessageDelay
          );
          timeoutsRef.current.push(nextTimeout);
        }
      }, typingDuration);
      timeoutsRef.current.push(typingTimeout);
    } else {
      // User messages appear immediately
      setVisibleMessages((prev) => [...prev, message.id]);

      // Force scroll after user message appears (especially important on mobile)
      setTimeout(() => scrollToBottom(0), 50);

      // Wait before next message for natural conversation flow
      if (index + 1 < chatMessages.length) {
        const nextMessageDelay = 1200 + Math.random() * 600; // 1.2-1.8s delay for user messages
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
      {/* CSS to hide scrollbar for WebKit browsers */}
      <style jsx>{`
        .chat-container::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          isInView
            ? {
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }
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
            repeat: Infinity,
            ease: "easeInOut",
            delay: getMobileDuration(2.5, isMobile),
          },
        }}
        className="relative w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[340px] mx-auto"
        style={{
          filter: "drop-shadow(0 8px 24px rgba(0, 0, 0, 0.15))",
          willChange: isInView ? "transform, opacity" : "auto",
        }}
      >
        {/* Phone frame - iPhone style */}
        <div className="relative w-full aspect-[9.5/19] bg-black rounded-[3rem] p-2">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20" />

          {/* Status bar elements */}
          <div className="absolute top-3 left-6 right-6 flex justify-between items-center z-10">
            <span className="text-white text-sm font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="w-6 h-3 border border-white rounded-sm">
                <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
              </div>
            </div>
          </div>

          {/* Screen */}
          <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative pt-8">
            {/* Chat messages */}
            <div
              ref={chatContainerRef}
              className="chat-container p-4 h-full overflow-y-auto space-y-3"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* Internet Explorer 10+ */,
              }}
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

              {/*  floneo App Card - Special message with logo */}
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
                      {/* Logo image — replace /images/floneo-logo.png with your real path */}
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

                    {/* Optional small preview / CTA */}
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

        {/* Floating Decorative Elements - Matching Design (INCREASED SIZE) */}

        {/* Top Left - Larger Blue Circle with Icon */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: getMobileDuration(8, isMobile),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-12"
          style={{
            willChange: "transform",
          }}
        >
          <div className="relative">
            {/* Blue gradient circle - increased */}
            <div className="w-40 h-40 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg opacity-95"></div>
            {/* Inner yellow circle with icon - increased */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-sm">
              <RefreshCw size={24} className="text-white" strokeWidth={2} />
            </div>
          </div>
        </motion.div>

        {/* Bottom Right - Larger Yellow Circle with Icon */}
        <motion.div
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: getMobileDuration(7, isMobile),
            repeat: Infinity,
            ease: "easeInOut",
            delay: getMobileDuration(1, isMobile),
          }}
          className="absolute -right-32 bottom-28"
          style={{
            willChange: "transform",
          }}
        >
          <div className="relative">
            {/* Yellow gradient circle - increased */}
            <div className="w-36 h-36 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full shadow-lg opacity-95"></div>
            {/* Inner green circle with icon - increased */}
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
  // Fetch section data from API
  const {
    data: sectionData,
    loading,
    error,
  } = useApiData(api.getHumanTouchSection);

  // Fallback data
  const fallbackData = {
    title: "Human Touch",
    subtitle: "Personal Support",
    description:
      "Experience personalized support with our dedicated team of experts",
    benefit_1_title: "24/7 Support",
    benefit_1_description: "Round-the-clock assistance when you need it most",
    benefit_2_title: "Expert Guidance",
    benefit_2_description: "Professional advice from industry specialists",
    benefit_3_title: "Custom Solutions",
    benefit_3_description: "Tailored approaches for your unique business needs",
    cta_text: "Get Started",
    cta_url: "/contact",
    chat_messages: defaultChatMessages,
  };

  // Use API data or fallback
  const data = sectionData || fallbackData;

  // Get chat messages from API data or fallback
  const chatMessages = (data as any).chat_messages || defaultChatMessages;

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const isMobile = useIsMobile();

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden"
      style={{ fontFamily: "'Poppins',  " }}
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
              className="text-6xl lg:text-7xl xl:text-8xl font-bold text-black leading-tight"
              style={{ fontWeight: 700 }}
            >
              {data.title}
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
              {data.subtitle}
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
          <div className="flex flex-col items-center gap-8">
            {/* Top Text - "Human" */}
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{
                duration: getMobileDuration(1.2, isMobile),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-6xl sm:text-7xl font-bold text-black text-center"
              style={{ fontWeight: 700 }}
            >
              {data.title}
            </motion.h2>

            {/* Phone Mockup */}
            <PhoneMockup
              isInView={isInView}
              chatMessages={chatMessages}
              isMobile={isMobile}
            />

            {/* Bottom Text - "Touch" */}
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: getMobileDuration(1.2, isMobile),
                delay: getMobileDuration(0.1, isMobile),
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-6xl sm:text-7xl font-bold text-[#2ecc71] text-center"
              style={{ fontWeight: 700 }}
            >
              {data.subtitle}
            </motion.h2>
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
          className="mt-16 text-center max-w-2xl mx-auto space-y-3"
        >
          <p className="text-lg text-black font-normal">
            Prototype in hours, launch in weeks.
          </p>
          <p className="text-lg text-black font-normal">
            Drag-and-drop UI, no steep learning curve.
          </p>
          <p className="text-lg text-black font-normal">
            Real-time monitoring and alerts.
          </p>
          <p className="text-lg text-black font-normal">
            AI assistant to answer questions instantly.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
