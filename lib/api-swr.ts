// Optimized API client with SWR for better caching and performance
import useSWR from 'swr'
import { api } from './api'
import type {
  HeroSection,
  AboutSection,
  AnalyticsSection,
  FooterSection,
  ServiceCard,
  FeatureCard,
  MetricBox,
  Testimonial,
  NavigationItem,
  ArchitectingExcellenceSection,
  HumanTouchSection,
  WhyChooseUsSection,
  AIPoweredAnalyticsSection,
  BenefitsSection,
  VideoTabsSection,
  MetricsDisplaySection,
  AboutTabletSection,
  VideoTabsDemoSection,
  PricingFeaturesSection,
  VideoTab,
  CountryData,
  DemoTab,
} from './api'

// SWR Configuration
const swrConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60000, // 1 minute deduplication
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  refreshInterval: 0, // Disable automatic refresh by default
}

// Cache keys for consistent data fetching
export const CACHE_KEYS = {
  HERO_SECTION: 'hero-section',
  ABOUT_SECTION: 'about-section',
  ANALYTICS_SECTION: 'analytics-section',
  FOOTER_SECTION: 'footer-section',
  SERVICE_CARDS: 'service-cards',
  FEATURE_CARDS: 'feature-cards',
  METRIC_BOXES: 'metric-boxes',
  TESTIMONIALS: 'testimonials',
  NAVIGATION_ITEMS: 'navigation-items',
  ARCHITECTING_EXCELLENCE: 'architecting-excellence',
  HUMAN_TOUCH: 'human-touch',
  WHY_CHOOSE_US: 'why-choose-us',
  AI_ANALYTICS: 'ai-analytics',
  BENEFITS: 'benefits',
  VIDEO_TABS_SECTION: 'video-tabs-section',
  METRICS_DISPLAY: 'metrics-display',
  ABOUT_TABLET: 'about-tablet',
  VIDEO_TABS_DEMO: 'video-tabs-demo',
  PRICING_FEATURES: 'pricing-features',
  VIDEO_TABS: 'video-tabs',
  COUNTRY_DATA: 'country-data',
  DEMO_TABS: 'demo-tabs',
} as const

// Generic fetcher function
const fetcher = async (apiCall: () => Promise<any>) => {
  const startTime = performance.now()
  try {
    const result = await apiCall()
    const duration = performance.now() - startTime
    console.log(`API call completed in ${duration.toFixed(2)}ms`)
    return result
  } catch (error) {
    console.error('API call failed:', error)
    throw error
  }
}

// Optimized SWR hooks for single instance endpoints
export function useHeroSection() {
  return useSWR(CACHE_KEYS.HERO_SECTION, () => fetcher(api.getHeroSection), {
    ...swrConfig,
    refreshInterval: 300000, // 5 minutes for hero content
  })
}

export function useAboutSection() {
  return useSWR(CACHE_KEYS.ABOUT_SECTION, () => fetcher(api.getAboutSection), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes for about content
  })
}

export function useAnalyticsSection() {
  return useSWR(CACHE_KEYS.ANALYTICS_SECTION, () => fetcher(api.getAnalyticsSection), {
    ...swrConfig,
    refreshInterval: 300000, // 5 minutes for analytics
  })
}

export function useFooterSection() {
  return useSWR(CACHE_KEYS.FOOTER_SECTION, () => fetcher(api.getFooterSection), {
    ...swrConfig,
    refreshInterval: 3600000, // 1 hour for footer (rarely changes)
  })
}

export function useArchitectingExcellenceSection() {
  return useSWR(CACHE_KEYS.ARCHITECTING_EXCELLENCE, () => fetcher(api.getArchitectingExcellenceSection), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

export function useHumanTouchSection() {
  return useSWR(CACHE_KEYS.HUMAN_TOUCH, () => fetcher(api.getHumanTouchSection), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

export function useWhyChooseUsSection() {
  return useSWR(CACHE_KEYS.WHY_CHOOSE_US, () => fetcher(api.getWhyChooseUsSection), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

export function useAIPoweredAnalyticsSection() {
  return useSWR(CACHE_KEYS.AI_ANALYTICS, () => fetcher(api.getAIPoweredAnalyticsSection), {
    ...swrConfig,
    refreshInterval: 300000, // 5 minutes
  })
}

export function useBenefitsSection() {
  return useSWR(CACHE_KEYS.BENEFITS, () => fetcher(api.getBenefitsSection), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

export function useVideoTabsSection() {
  return useSWR(CACHE_KEYS.VIDEO_TABS_SECTION, () => fetcher(api.getVideoTabsSection), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

export function useMetricsDisplaySection() {
  return useSWR(CACHE_KEYS.METRICS_DISPLAY, () => fetcher(api.getMetricsDisplaySection), {
    ...swrConfig,
    refreshInterval: 300000, // 5 minutes for metrics
  })
}

export function useAboutTabletSection() {
  return useSWR(CACHE_KEYS.ABOUT_TABLET, () => fetcher(api.getAboutTabletSection), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

export function useVideoTabsDemoSection() {
  return useSWR(CACHE_KEYS.VIDEO_TABS_DEMO, () => fetcher(api.getVideoTabsDemoSection), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

export function usePricingFeaturesSection() {
  return useSWR(CACHE_KEYS.PRICING_FEATURES, () => fetcher(api.getPricingFeaturesSection), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

// Optimized SWR hooks for multiple instance endpoints
export function useServiceCards() {
  return useSWR(CACHE_KEYS.SERVICE_CARDS, () => fetcher(api.getServiceCards), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes for services
  })
}

export function useFeatureCards() {
  return useSWR(CACHE_KEYS.FEATURE_CARDS, () => fetcher(api.getFeatureCards), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes for features
  })
}

export function useMetricBoxes() {
  return useSWR(CACHE_KEYS.METRIC_BOXES, () => fetcher(api.getMetricBoxes), {
    ...swrConfig,
    refreshInterval: 300000, // 5 minutes for metrics
  })
}

export function useTestimonials() {
  return useSWR(CACHE_KEYS.TESTIMONIALS, () => fetcher(api.getTestimonials), {
    ...swrConfig,
    refreshInterval: 1800000, // 30 minutes for testimonials
  })
}

export function useNavigationItems() {
  return useSWR(CACHE_KEYS.NAVIGATION_ITEMS, () => fetcher(api.getNavigationItems), {
    ...swrConfig,
    refreshInterval: 3600000, // 1 hour for navigation (rarely changes)
  })
}

export function useVideoTabs() {
  return useSWR(CACHE_KEYS.VIDEO_TABS, () => fetcher(api.getVideoTabs), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

export function useCountryData() {
  return useSWR(CACHE_KEYS.COUNTRY_DATA, () => fetcher(api.getCountryData), {
    ...swrConfig,
    refreshInterval: 3600000, // 1 hour for country data (rarely changes)
  })
}

export function useDemoTabs() {
  return useSWR(CACHE_KEYS.DEMO_TABS, () => fetcher(api.getDemoTabs), {
    ...swrConfig,
    refreshInterval: 600000, // 10 minutes
  })
}

// Batch loading hook for critical page data
export function useCriticalPageData() {
  const hero = useHeroSection()
  const navigation = useNavigationItems()
  const footer = useFooterSection()
  
  return {
    hero,
    navigation,
    footer,
    isLoading: hero.isLoading || navigation.isLoading || footer.isLoading,
    error: hero.error || navigation.error || footer.error,
  }
}

// Preload function for critical data
export function preloadCriticalData() {
  // Preload critical data that's needed immediately
  const criticalEndpoints = [
    { key: CACHE_KEYS.HERO_SECTION, fetcher: () => fetcher(api.getHeroSection) },
    { key: CACHE_KEYS.NAVIGATION_ITEMS, fetcher: () => fetcher(api.getNavigationItems) },
    { key: CACHE_KEYS.FOOTER_SECTION, fetcher: () => fetcher(api.getFooterSection) },
  ]
  
  return Promise.allSettled(
    criticalEndpoints.map(endpoint => 
      endpoint.fetcher().catch(error => {
        console.warn(`Failed to preload ${endpoint.key}:`, error)
        return null
      })
    )
  )
}

// Performance tracking utility
export function trackAPIPerformance(operation: string, startTime: number) {
  const duration = performance.now() - startTime
  console.log(`${operation}: ${duration.toFixed(2)}ms`)
  
  // Send to analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name: operation,
      value: Math.round(duration)
    })
  }
}
