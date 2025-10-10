"use client";

import React from "react";
import VideoTabs, { VideoTab } from "./VideoTabs";
import "./VideoTabs.css";

/**
 * VideoTabsDemo - Example usage of the VideoTabs component
 *
 * This demonstrates how to integrate the VideoTabs component
 * into your  floneo website with sample video content.
 *
 * Usage:
 * 1. Import this component into your page
 * 2. Replace the sample video URLs with your actual content
 * 3. Customize the tabs array with your own data
 */

export default function VideoTabsDemo() {
  // Define your tabs with video content
  const tabs: VideoTab[] = [
    {
      id: "build",
      label: "Build",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      poster: "/logo.png",
    },
    {
      id: "automate",
      label: "Automate",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      poster: "/logo.png",
    },
    {
      id: "scale",
      label: "Scale",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      poster: "/logo.png",
    },
    {
      id: "deploy",
      label: "Deploy",
      src: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      poster: "/logo.png",
    },
  ];

  return (
    <section className="video-tabs-section">
      <div className="container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See floneo in Action
          </h2>
          <p className="text-gray-400 text-lg">
            Watch how floneo transforms your workflow
          </p>
        </div>

        <VideoTabs tabs={tabs} initialId="build" />
      </div>

      <style jsx>{`
        .video-tabs-section {
          background: #0c0f14;
          padding: 60px 20px;
          min-height: 600px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .video-tabs-section {
            padding: 40px 16px;
          }
        }
      `}</style>
    </section>
  );
}

/**
 * Alternative: Inline usage example
 *
 * You can also use VideoTabs directly in any component:
 *
 * import VideoTabs from "@/components/VideoTabs";
 * import "@/components/VideoTabs.css";
 *
 * const myTabs = [
 *   { id: "demo1", label: "Demo 1", src: "/videos/demo1.mp4", poster: "/posters/demo1.jpg" },
 *   { id: "demo2", label: "Demo 2", src: "/videos/demo2.mp4", poster: "/posters/demo2.jpg" },
 * ];
 *
 * <div style={{ background: "#0c0f14", padding: "28px", borderRadius: 20 }}>
 *   <VideoTabs tabs={myTabs} />
 * </div>
 */
