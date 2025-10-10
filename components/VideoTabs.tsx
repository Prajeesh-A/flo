"use client";

import React, {
  useMemo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api, useApiData } from "@/lib/api";

/**
 * VideoTabs – Animated pill tabs with glass highlight + per-tab video
 *
 * Features:
 * - Smooth animated highlight that morphs between tabs
 * - Per-tab video with autoplay/pause management
 * - Keyboard navigation (ArrowLeft/Right, Home/End)
 * - Full ARIA accessibility
 * - Preserves video playback position when switching tabs
 * - Loading shimmer until video is ready
 * - Spring physics animation (280-380ms)
 * -  floneo gradient glass effect
 *
 * @example
 * <VideoTabs tabs={[
 *   { id: "build", label: "Build", src: "/videos/build.mp4", poster: "/posters/build.jpg" },
 *   { id: "automate", label: "Automate", src: "/videos/automate.mp4", poster: "/posters/automate.jpg" },
 *   { id: "scale", label: "Scale", src: "/videos/scale.mp4", poster: "/posters/scale.jpg" }
 * ]} />
 */

export interface VideoTab {
  id: string;
  label: string;
  src: string;
  poster?: string;
}

interface VideoTabsProps {
  tabs?: VideoTab[];
  initialId?: string;
}

export default function VideoTabs({ tabs = [], initialId }: VideoTabsProps) {
  // Fetch section and tabs data from API
  const {
    data: sectionData,
    loading: sectionLoading,
    error: sectionError,
  } = useApiData(api.getVideoTabsSection);

  const {
    data: tabsData,
    loading: tabsLoading,
    error: tabsError,
  } = useApiData(api.getVideoTabs);

  // Fallback data
  const fallbackTabs = [
    {
      id: "build",
      tab_title: "Build",
      tab_description: "Create powerful applications",
      video_url: "",
      video_file_url: "",
      poster_image_url: "",
      is_active: true,
      order: 1,
    },
    {
      id: "automate",
      tab_title: "Automate",
      tab_description: "Streamline your workflows",
      video_url: "",
      video_file_url: "",
      poster_image_url: "",
      is_active: true,
      order: 2,
    },
    {
      id: "scale",
      tab_title: "Scale",
      tab_description: "Grow your business",
      video_url: "",
      video_file_url: "",
      poster_image_url: "",
      is_active: true,
      order: 3,
    },
  ];

  // Use API data or fallback, convert to expected format
  const apiTabs = tabsData || fallbackTabs;
  const convertedTabs = apiTabs
    .filter((tab) => tab.is_active)
    .sort((a, b) => a.order - b.order)
    .map((tab) => ({
      id: tab.id.toString(),
      label: tab.tab_title,
      src: tab.video_file_url || tab.video_url || "",
      poster: tab.poster_image_url || "",
    }));

  const safeTabs = tabs.length > 0 ? tabs : convertedTabs;
  const [activeId, setActiveId] = useState(initialId || safeTabs[0]?.id);
  const railRef = useRef<HTMLDivElement>(null);
  const btnRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
  const positions = useRef<Record<string, number>>({});

  // Pause non-active videos, resume active; keep time per tab
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([id, vid]) => {
      if (!vid) return;
      if (id === activeId) {
        // Restore time if saved
        const t = positions.current[id];
        if (typeof t === "number" && !Number.isNaN(t)) vid.currentTime = t;
        vid.play().catch(() => {});
      } else {
        try {
          positions.current[id] = vid.currentTime;
          vid.pause();
        } catch {}
      }
    });
  }, [activeId]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const ids = safeTabs.map((t) => t.id);
      const idx = ids.findIndex((id) => id === activeId);
      let nextIdx = idx;
      if (e.key === "ArrowRight") nextIdx = (idx + 1) % ids.length;
      if (e.key === "ArrowLeft") nextIdx = (idx - 1 + ids.length) % ids.length;
      if (e.key === "Home") nextIdx = 0;
      if (e.key === "End") nextIdx = ids.length - 1;
      const nextId = ids[nextIdx];
      setActiveId(nextId);
      btnRefs.current[nextId]?.focus();
    },
    [activeId, safeTabs]
  );

  // Motion spring config - custom easing for smooth morph
  const spring = {
    type: "spring" as const,
    stiffness: 420,
    damping: 38,
    mass: 0.6,
  };

  const activeIndex = useMemo(
    () => safeTabs.findIndex((t) => t.id === activeId),
    [activeId, safeTabs]
  );

  if (safeTabs.length === 0) {
    return null;
  }

  return (
    <div className="vt-root">
      <div
        className="vt-rail"
        role="tablist"
        aria-label="Video tabs"
        ref={railRef}
        onKeyDown={onKeyDown}
      >
        {safeTabs.map((t, i) => {
          const selected = t.id === activeId;
          return (
            <button
              key={t.id}
              role="tab"
              ref={(el) => (btnRefs.current[t.id] = el)}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              id={`tab-${t.id}`}
              tabIndex={selected ? 0 : -1}
              className={`vt-tab ${selected ? "is-active" : ""}`}
              onClick={() => setActiveId(t.id)}
            >
              <span className="vt-label">{t.label}</span>
              {selected && (
                <motion.span
                  layoutId="vt-highlight"
                  className="vt-highlight"
                  transition={spring}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="vt-panelWrap">
        <AnimatePresence mode="wait">
          {safeTabs.map((t) =>
            t.id === activeId ? (
              <motion.section
                key={t.id}
                role="tabpanel"
                id={`panel-${t.id}`}
                aria-labelledby={`tab-${t.id}`}
                className="vt-panel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12 }}
              >
                <VideoPlayer
                  tabId={t.id}
                  src={t.src}
                  poster={t.poster}
                  videoRef={(el) => (videoRefs.current[t.id] = el)}
                />
              </motion.section>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface VideoPlayerProps {
  tabId: string;
  src: string;
  poster?: string;
  videoRef: (el: HTMLVideoElement | null) => void;
}

function VideoPlayer({ tabId, src, poster, videoRef }: VideoPlayerProps) {
  const [ready, setReady] = useState(false);
  return (
    <div className="vt-videoBox">
      {!ready && <div className="vt-shimmer" aria-hidden="true" />}
      <video
        ref={videoRef}
        className="vt-video"
        src={src}
        poster={poster}
        muted
        playsInline
        loop
        preload="metadata"
        onCanPlay={() => setReady(true)}
      />
    </div>
  );
}
