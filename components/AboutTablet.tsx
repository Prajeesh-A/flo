"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { api } from "@/lib/api";
import { useClientApiData } from "@/lib/useClientApiData";
import { RichTextRenderer } from "@/components/SafeHTMLRenderer";

// Helper function to extract YouTube video ID
function getYouTubeVideoId(url: string): string {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : "";
}

/**
 * AboutTablet - Smooth Scroll-Triggered Reveal Animation
 *
 * Simple, intuitive tablet reveal animation:
 * - Starts flat/horizontal at bottom of section
 * - Smoothly rotates upward as user scrolls down
 * - Rotation tied to scroll progress for smooth experience
 * - Once revealed, stays in upright position (no reverse animation)
 * - Single-direction animation for better UX
 */
export default function AboutTablet() {
  // Fetch section data from API - only on client side
  const {
    data: sectionData,
    loading,
    error,
    isClient,
  } = useClientApiData(api.getAboutTabletSection);

  // Fallback data
  const fallbackData = {
    title: "Experience the Future",
    subtitle: "3D Interactive Demo",
    description: "Discover our platform through an immersive 3D experience",
    enable_3d_animation: true,
    animation_duration: 1.0,
    background_color: "#FFFFFF",
    text_color: "#000000",
    video_url: "https://youtu.be/9pNIZ0hx7VE?si=g8zn45IbQRXx04fS",
    video_file_url: "",
    poster_image_url: "",
    // Video player settings - unmuted by default as requested
    video_autoplay: true,
    video_muted: false,
    video_loop: true,
    video_controls: false,
  };

  // Debug logging
  console.log("AboutTablet Debug:", {
    isClient,
    sectionData,
    loading,
    error,
    hasApiData: !!sectionData,
    apiVideoUrl: sectionData?.video_url,
    fallbackVideoUrl: fallbackData.video_url,
  });

  // Use API data or fallback
  const data = sectionData || fallbackData;

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string>("");

  // Track if the section is in view for auto-pause functionality
  const isInView = useInView(containerRef, {
    margin: "-10% 0px -10% 0px", // Add some margin for better UX
  });

  // Set up scroll-based animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform scroll progress to rotation values
  // rotateX goes from 90deg (flat) to 0deg (upright) during first half of scroll
  // Then stays at 0deg for the rest
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [85, 0, 0] // Slightly less dramatic rotation for mobile
  );

  // Opacity fades in during the reveal
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.6], [0.4, 0.8, 1]);

  // Scale slightly grows during reveal - more subtle on mobile
  const scale = useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 1, 1]);

  // Y position moves up during reveal - reduced distance for mobile
  const y = useTransform(scrollYProgress, [0, 0.4, 1], [60, 0, 0]);

  // Extract YouTube video ID when data changes
  useEffect(() => {
    if (
      data.video_url &&
      (data.video_url.includes("youtube.com") ||
        data.video_url.includes("youtu.be"))
    ) {
      const videoId = getYouTubeVideoId(data.video_url);
      setYoutubeVideoId(videoId);
    }
  }, [data.video_url]);

  // Auto-pause/play video based on section visibility
  useEffect(() => {
    const video = videoRef.current;
    const iframe = iframeRef.current;

    if (isInView) {
      // Section is in view - play/unmute video
      if (video && data.video_autoplay) {
        video.play().catch(() => {
          // Ignore autoplay errors (browser restrictions)
        });
      }

      // For YouTube iframes, we can't control play/pause directly
      // But we can reload the iframe with mute=0 to unmute it
      if (iframe && youtubeVideoId) {
        const currentSrc = iframe.src;
        if (currentSrc.includes("mute=1")) {
          iframe.src = currentSrc.replace("mute=1", "mute=0");
        }
      }
    } else {
      // Section is out of view - pause/mute video
      if (video) {
        video.pause();
      }

      // For YouTube iframes, mute the video by reloading with mute=1
      if (iframe && youtubeVideoId) {
        const currentSrc = iframe.src;
        if (currentSrc.includes("mute=0")) {
          iframe.src = currentSrc.replace("mute=0", "mute=1");
        }
      }
    }
  }, [isInView, data.video_autoplay, youtubeVideoId]);

  return (
    <section id="about">
      <div
        ref={containerRef}
        className="w-full min-h-[60vh] sm:min-h-[80vh] lg:min-h-screen flex items-center justify-center py-8 sm:py-12 lg:py-20"
        style={{ perspective: "1200px" }}
      >
        {/* Tablet container with scroll-based 3D transform */}
        <motion.div
          className="relative w-[min(320px,90vw)] sm:w-[min(480px,85vw)] md:w-[min(640px,80vw)] lg:w-[min(980px,75vw)] aspect-[4/3]"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform",
            rotateX,
            opacity,
            scale,
            y,
          }}
          aria-label="About Us tablet demonstration"
        >
          {/* Simple shadow that appears with the tablet */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[5%] right-[5%] -bottom-[8%] h-[20%] pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 0%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(20px)",
              opacity,
            }}
          />

          {/* Tablet bezel - responsive design */}
          <div className="relative w-full h-full bg-[#0f1115] rounded-[clamp(18px,4vw,36px)] p-[clamp(6px,1.8vw,24px)] shadow-[0_10px_30px_rgba(0,0,0,0.3)] sm:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
            {/* Camera / sensor bar */}
            <div className="absolute top-[clamp(4px,1.2vw,14px)] left-1/2 -translate-x-1/2 w-[clamp(32px,8vw,48px)] h-[clamp(6px,1.5vw,8px)] rounded-full bg-[#14171c] shadow-inner" />

            {/* Screen area */}
            <div className="relative w-full h-full bg-black rounded-[clamp(12px,3vw,24px)] overflow-hidden">
              {/* Video content from API */}
              {data.video_file_url ? (
                // Direct video file
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted={data.video_muted}
                  loop={data.video_loop}
                  playsInline
                  autoPlay={data.video_autoplay}
                  controls={data.video_controls}
                  poster={data.poster_image_url}
                >
                  <source src={data.video_file_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : data.video_url &&
                (data.video_url.includes("youtube.com") ||
                  data.video_url.includes("youtu.be")) ? (
                // YouTube embed
                <div className="w-full h-full">
                  <iframe
                    ref={iframeRef}
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      data.video_url
                    )}?autoplay=${data.video_autoplay ? 1 : 0}&mute=${
                      data.video_muted ? 1 : 0
                    }&loop=${
                      data.video_loop ? 1 : 0
                    }&playlist=${getYouTubeVideoId(data.video_url)}&controls=${
                      data.video_controls ? 1 : 0
                    }&showinfo=0&rel=0&modestbranding=1`}
                    title="About Video"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : data.video_url ? (
                // Other video URL
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  muted={data.video_muted}
                  loop={data.video_loop}
                  playsInline
                  autoPlay={data.video_autoplay}
                  controls={data.video_controls}
                  poster={data.poster_image_url}
                >
                  <source src={data.video_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                /* Fallback placeholder when no video is set */
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
                  <div className="text-center text-white">
                    <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-4">
                      🚀
                    </div>
                    <h3 className="text-sm sm:text-lg lg:text-xl font-semibold mb-1 sm:mb-2">
                      {data.title}
                    </h3>
                    <div className="text-xs sm:text-sm opacity-90">
                      <RichTextRenderer
                        content={data.subtitle}
                        fallback="3D Interactive Demo"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
