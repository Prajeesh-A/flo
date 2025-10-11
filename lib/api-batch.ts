// Batched API loading for improved performance
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

// Batch loading interfaces
export interface CriticalPageData {
  heroSection: HeroSection | null
  navigationItems: NavigationItem[]
  footerSection: FooterSection | null
}

export interface HomePageData extends CriticalPageData {
  aboutSection: AboutSection | null
  serviceCards: ServiceCard[]
  featureCards: FeatureCard[]
  metricBoxes: MetricBox[]
  testimonials: Testimonial[]
  architectingExcellence: ArchitectingExcellenceSection | null
  humanTouch: HumanTouchSection | null
  whyChooseUs: WhyChooseUsSection | null
  aiAnalytics: AIPoweredAnalyticsSection | null
  benefits: BenefitsSection | null
}

export interface AnalyticsPageData {
  analyticsSection: AnalyticsSection | null
  videoTabsSection: VideoTabsSection | null
  metricsDisplay: MetricsDisplaySection | null
  videoTabs: VideoTab[]
  countryData: CountryData[]
}

export interface DemoPageData {
  aboutTablet: AboutTabletSection | null
  videoTabsDemo: VideoTabsDemoSection | null
  pricingFeatures: PricingFeaturesSection | null
  demoTabs: DemoTab[]
}

// Performance tracking
const trackBatchPerformance = (batchName: string, startTime: number, successCount: number, totalCount: number) => {
  const duration = performance.now() - startTime
  const successRate = (successCount / totalCount) * 100
  
  console.log(`Batch ${batchName}:`, {
    duration: `${duration.toFixed(2)}ms`,
    successRate: `${successRate.toFixed(1)}%`,
    successful: `${successCount}/${totalCount}`
  })
  
  // Send to analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'batch_api_complete', {
      batch_name: batchName,
      duration: Math.round(duration),
      success_rate: Math.round(successRate)
    })
  }
}

// Critical data needed for initial page load
export async function loadCriticalPageData(): Promise<CriticalPageData> {
  const startTime = performance.now()
  
  try {
    const [heroResult, navigationResult, footerResult] = await Promise.allSettled([
      api.getHeroSection(),
      api.getNavigationItems(),
      api.getFooterSection(),
    ])
    
    const successCount = [heroResult, navigationResult, footerResult]
      .filter(result => result.status === 'fulfilled').length
    
    trackBatchPerformance('Critical Page Data', startTime, successCount, 3)
    
    return {
      heroSection: heroResult.status === 'fulfilled' ? heroResult.value : null,
      navigationItems: navigationResult.status === 'fulfilled' ? navigationResult.value : [],
      footerSection: footerResult.status === 'fulfilled' ? footerResult.value : null,
    }
  } catch (error) {
    console.error('Failed to load critical page data:', error)
    trackBatchPerformance('Critical Page Data', startTime, 0, 3)
    
    return {
      heroSection: null,
      navigationItems: [],
      footerSection: null,
    }
  }
}

// Complete home page data
export async function loadHomePageData(): Promise<HomePageData> {
  const startTime = performance.now()
  
  try {
    // Load critical data first
    const criticalData = await loadCriticalPageData()
    
    // Load remaining home page data
    const [
      aboutResult,
      servicesResult,
      featuresResult,
      metricsResult,
      testimonialsResult,
      architectingResult,
      humanTouchResult,
      whyChooseResult,
      aiAnalyticsResult,
      benefitsResult,
    ] = await Promise.allSettled([
      api.getAboutSection(),
      api.getServiceCards(),
      api.getFeatureCards(),
      api.getMetricBoxes(),
      api.getTestimonials(),
      api.getArchitectingExcellenceSection(),
      api.getHumanTouchSection(),
      api.getWhyChooseUsSection(),
      api.getAIPoweredAnalyticsSection(),
      api.getBenefitsSection(),
    ])
    
    const additionalResults = [
      aboutResult, servicesResult, featuresResult, metricsResult, testimonialsResult,
      architectingResult, humanTouchResult, whyChooseResult, aiAnalyticsResult, benefitsResult
    ]
    
    const successCount = additionalResults.filter(result => result.status === 'fulfilled').length + 3 // +3 for critical data
    
    trackBatchPerformance('Home Page Data', startTime, successCount, 13)
    
    return {
      ...criticalData,
      aboutSection: aboutResult.status === 'fulfilled' ? aboutResult.value : null,
      serviceCards: servicesResult.status === 'fulfilled' ? servicesResult.value : [],
      featureCards: featuresResult.status === 'fulfilled' ? featuresResult.value : [],
      metricBoxes: metricsResult.status === 'fulfilled' ? metricsResult.value : [],
      testimonials: testimonialsResult.status === 'fulfilled' ? testimonialsResult.value : [],
      architectingExcellence: architectingResult.status === 'fulfilled' ? architectingResult.value : null,
      humanTouch: humanTouchResult.status === 'fulfilled' ? humanTouchResult.value : null,
      whyChooseUs: whyChooseResult.status === 'fulfilled' ? whyChooseResult.value : null,
      aiAnalytics: aiAnalyticsResult.status === 'fulfilled' ? aiAnalyticsResult.value : null,
      benefits: benefitsResult.status === 'fulfilled' ? benefitsResult.value : null,
    }
  } catch (error) {
    console.error('Failed to load home page data:', error)
    trackBatchPerformance('Home Page Data', startTime, 0, 13)
    
    // Return critical data with empty additional data
    const criticalData = await loadCriticalPageData()
    return {
      ...criticalData,
      aboutSection: null,
      serviceCards: [],
      featureCards: [],
      metricBoxes: [],
      testimonials: [],
      architectingExcellence: null,
      humanTouch: null,
      whyChooseUs: null,
      aiAnalytics: null,
      benefits: null,
    }
  }
}

// Analytics page specific data
export async function loadAnalyticsPageData(): Promise<AnalyticsPageData> {
  const startTime = performance.now()
  
  try {
    const [
      analyticsResult,
      videoTabsSectionResult,
      metricsDisplayResult,
      videoTabsResult,
      countryDataResult,
    ] = await Promise.allSettled([
      api.getAnalyticsSection(),
      api.getVideoTabsSection(),
      api.getMetricsDisplaySection(),
      api.getVideoTabs(),
      api.getCountryData(),
    ])
    
    const successCount = [
      analyticsResult, videoTabsSectionResult, metricsDisplayResult, 
      videoTabsResult, countryDataResult
    ].filter(result => result.status === 'fulfilled').length
    
    trackBatchPerformance('Analytics Page Data', startTime, successCount, 5)
    
    return {
      analyticsSection: analyticsResult.status === 'fulfilled' ? analyticsResult.value : null,
      videoTabsSection: videoTabsSectionResult.status === 'fulfilled' ? videoTabsSectionResult.value : null,
      metricsDisplay: metricsDisplayResult.status === 'fulfilled' ? metricsDisplayResult.value : null,
      videoTabs: videoTabsResult.status === 'fulfilled' ? videoTabsResult.value : [],
      countryData: countryDataResult.status === 'fulfilled' ? countryDataResult.value : [],
    }
  } catch (error) {
    console.error('Failed to load analytics page data:', error)
    trackBatchPerformance('Analytics Page Data', startTime, 0, 5)
    
    return {
      analyticsSection: null,
      videoTabsSection: null,
      metricsDisplay: null,
      videoTabs: [],
      countryData: [],
    }
  }
}

// Demo page specific data
export async function loadDemoPageData(): Promise<DemoPageData> {
  const startTime = performance.now()
  
  try {
    const [
      aboutTabletResult,
      videoTabsDemoResult,
      pricingFeaturesResult,
      demoTabsResult,
    ] = await Promise.allSettled([
      api.getAboutTabletSection(),
      api.getVideoTabsDemoSection(),
      api.getPricingFeaturesSection(),
      api.getDemoTabs(),
    ])
    
    const successCount = [
      aboutTabletResult, videoTabsDemoResult, pricingFeaturesResult, demoTabsResult
    ].filter(result => result.status === 'fulfilled').length
    
    trackBatchPerformance('Demo Page Data', startTime, successCount, 4)
    
    return {
      aboutTablet: aboutTabletResult.status === 'fulfilled' ? aboutTabletResult.value : null,
      videoTabsDemo: videoTabsDemoResult.status === 'fulfilled' ? videoTabsDemoResult.value : null,
      pricingFeatures: pricingFeaturesResult.status === 'fulfilled' ? pricingFeaturesResult.value : null,
      demoTabs: demoTabsResult.status === 'fulfilled' ? demoTabsResult.value : [],
    }
  } catch (error) {
    console.error('Failed to load demo page data:', error)
    trackBatchPerformance('Demo Page Data', startTime, 0, 4)
    
    return {
      aboutTablet: null,
      videoTabsDemo: null,
      pricingFeatures: null,
      demoTabs: [],
    }
  }
}

// Preload function for next page data
export function preloadPageData(pageType: 'home' | 'analytics' | 'demo') {
  switch (pageType) {
    case 'home':
      return loadHomePageData()
    case 'analytics':
      return loadAnalyticsPageData()
    case 'demo':
      return loadDemoPageData()
    default:
      return loadCriticalPageData()
  }
}

// Utility to check if data is stale and needs refresh
export function isDataStale(lastFetch: number, maxAge: number = 300000): boolean {
  return Date.now() - lastFetch > maxAge
}

// Cache warming function
export async function warmCache() {
  console.log('Warming cache with critical data...')
  const startTime = performance.now()
  
  try {
    await loadCriticalPageData()
    const duration = performance.now() - startTime
    console.log(`Cache warmed in ${duration.toFixed(2)}ms`)
  } catch (error) {
    console.error('Failed to warm cache:', error)
  }
}
