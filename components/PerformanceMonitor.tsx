"use client";

import { useEffect } from "react";

interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: number;
}

export default function PerformanceMonitor() {
  useEffect(() => {
    // Track page load performance
    const trackPageLoad = () => {
      if (typeof window !== "undefined" && window.performance) {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;

        if (navigation) {
          const metrics = {
            // Core Web Vitals
            domContentLoaded:
              navigation.domContentLoadedEventEnd -
              navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,

            // Network timing
            dnsLookup:
              navigation.domainLookupEnd - navigation.domainLookupStart,
            tcpConnect: navigation.connectEnd - navigation.connectStart,
            serverResponse: navigation.responseEnd - navigation.requestStart,

            // Page timing
            domInteractive: navigation.domInteractive - navigation.fetchStart,
            domComplete: navigation.domComplete - navigation.fetchStart,

            // Total page load time
            totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
          };

          // Performance metrics tracked (console.log removed for production)

          // Send to analytics if available
          if ((window as any).gtag) {
            (window as any).gtag("event", "page_performance", {
              dom_content_loaded: Math.round(metrics.domContentLoaded),
              load_complete: Math.round(metrics.loadComplete),
              total_load_time: Math.round(metrics.totalLoadTime),
              server_response: Math.round(metrics.serverResponse),
            });
          }
        }
      }
    };

    // Track API call performance
    const trackAPIPerformance = () => {
      if (typeof window !== "undefined" && window.performance) {
        const apiCalls = performance
          .getEntriesByType("resource")
          .filter(
            (entry) =>
              entry.name.includes("/api/") ||
              entry.name.includes("flo-do2v.onrender.com")
          ) as PerformanceResourceTiming[];

        if (apiCalls.length > 0) {
          const apiMetrics = apiCalls.map(
            (call: PerformanceResourceTiming) => ({
              url: call.name,
              duration: call.responseEnd - call.requestStart,
              size: call.transferSize || 0,
              cached: call.transferSize === 0 && call.decodedBodySize > 0,
            })
          );

          const totalAPIDuration = apiMetrics.reduce(
            (sum, call) => sum + call.duration,
            0
          );
          const cachedCalls = apiMetrics.filter((call) => call.cached).length;
          const cacheHitRate = (cachedCalls / apiMetrics.length) * 100;

          // API performance metrics tracked (console.log removed for production)

          // Send to analytics
          if ((window as any).gtag) {
            (window as any).gtag("event", "api_performance", {
              total_calls: apiMetrics.length,
              total_duration: Math.round(totalAPIDuration),
              cache_hit_rate: Math.round(cacheHitRate),
              cached_calls: cachedCalls,
            });
          }
        }
      }
    };

    // Track Core Web Vitals
    const trackCoreWebVitals = () => {
      if (typeof window !== "undefined") {
        // Largest Contentful Paint (LCP)
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];

          // LCP tracked (console.log removed for production)

          if ((window as any).gtag) {
            (window as any).gtag("event", "web_vitals", {
              metric_name: "LCP",
              value: Math.round(lastEntry.startTime),
            });
          }
        });

        try {
          observer.observe({ entryTypes: ["largest-contentful-paint"] });
        } catch (e) {
          console.warn("LCP observation not supported");
        }

        // First Input Delay (FID) - approximation
        let firstInputDelay = 0;
        const handleFirstInput = (event: Event) => {
          firstInputDelay = performance.now() - (event as any).timeStamp;
          // FID tracked (console.log removed for production)

          if ((window as any).gtag) {
            (window as any).gtag("event", "web_vitals", {
              metric_name: "FID",
              value: Math.round(firstInputDelay),
            });
          }

          // Remove listener after first input
          document.removeEventListener("click", handleFirstInput);
          document.removeEventListener("keydown", handleFirstInput);
        };

        document.addEventListener("click", handleFirstInput, { once: true });
        document.addEventListener("keydown", handleFirstInput, { once: true });

        return () => {
          observer.disconnect();
          document.removeEventListener("click", handleFirstInput);
          document.removeEventListener("keydown", handleFirstInput);
        };
      }
    };

    // Run performance tracking after page load
    const timer = setTimeout(() => {
      trackPageLoad();
      trackAPIPerformance();
      trackCoreWebVitals();
    }, 2000); // Wait 2 seconds for page to settle

    return () => clearTimeout(timer);
  }, []);

  // Track SWR cache performance
  useEffect(() => {
    const trackSWRCache = () => {
      if (typeof window !== "undefined" && (window as any).__SWR_CACHE__) {
        const cache = (window as any).__SWR_CACHE__;
        const cacheKeys = Object.keys(cache);

        // SWR cache status tracked (console.log removed for production)

        if ((window as any).gtag) {
          (window as any).gtag("event", "swr_cache", {
            total_keys: cacheKeys.length,
            cache_size: JSON.stringify(cache).length,
          });
        }
      }
    };

    // Track cache status periodically
    const interval = setInterval(trackSWRCache, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything
}

// Utility function to manually track custom performance metrics
export function trackCustomMetric(
  name: string,
  value: number,
  unit: string = "ms"
) {
  // Custom metric tracked (console.log removed for production)

  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "custom_metric", {
      metric_name: name,
      value: Math.round(value),
      unit,
    });
  }
}

// Utility function to track user interactions
export function trackUserInteraction(
  action: string,
  element: string,
  value?: number
) {
  // User interaction tracked (console.log removed for production)

  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "user_interaction", {
      action,
      element,
      value: value ? Math.round(value) : undefined,
    });
  }
}
