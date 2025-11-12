// API client for Django backend
import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://flo-do2v.onrender.com/api";

// Types for API responses
export interface HeroSection {
  id: number;
  is_visible: boolean;
  order: number;
  tagline: string;
  title: string;
  description: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string;
  cta_secondary_url: string;
  background_image?: string;
  background_color: string;
  text_color: string;
  created_at: string;
  updated_at: string;
}

export interface AboutSection {
  id: number;
  title: string;
  description: string;
  content: string;
}

export interface ServiceCard {
  id: number;
  title: string;
  description: string;
  image?: string;
  image_url?: string;
  color: string;
  order: number;
}

export interface MetricBox {
  id: number;
  value: string;
  suffix: string;
  label: string;
  description: string;
  color: string;
  order: number;
}

export interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  order: number;
}

export interface AnalyticsSection {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  savings_amount: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author_name: string;
  author_title: string;
  author_company: string;
  order: number;
}

export interface FooterSection {
  id: number;
  tagline: string;
  copyright_text: string;
}

export interface NavigationItem {
  id: number;
  label: string;
  href: string;
  order: number;
  is_active: boolean;
}

// New types for enhanced models
export interface PricingSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  background_color: string;
}

export interface PricingPlan {
  id: number;
  name: string;
  plan_type: string;
  price: string;
  price_period: string;
  description: string;
  is_popular: boolean;
  cta_text: string;
  cta_url: string;
  order: number;
  features: PricingFeature[];
}

export interface PricingFeature {
  feature_text: string;
  is_included: boolean;
  order: number;
}

export interface FAQSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  background_color: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  order: number;
  is_active: boolean;
}

export interface ContactSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  form_title: string;
  form_submit_text: string;
  form_success_message: string;
  background_color: string;
}

export interface PrivacyPolicy {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  last_updated: string;
  effective_date: string;
  meta_title: string;
  meta_description: string;
}

export interface SocialMediaSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  background_color: string;
}

export interface SocialMediaLink {
  id: number;
  platform: string;
  platform_name: string;
  url: string;
  icon_class: string;
  is_active: boolean;
  order: number;
}

export interface EnhancedFooterSection {
  id: number;
  is_visible: boolean;
  order: number;
  company_name: string;
  tagline: string;
  description: string;
  privacy_policy_text: string;
  privacy_policy_url: string;
  terms_conditions_text: string;
  terms_conditions_url: string;
  copyright_text: string;
  show_made_in_framer: boolean;
  background_color: string;
  text_color: string;
}

export interface SiteSettings {
  id: number;
  site_name: string;
  site_description: string;
  site_logo?: string;
  favicon?: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  primary_email: string;
  primary_phone: string;
  google_analytics_id: string;
  facebook_pixel_id: string;
  maintenance_mode: boolean;
  maintenance_message: string;
}

// New interfaces for additional sections

export interface AboutTabletSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  video_url?: string;
  video_file?: string;
  video_file_url?: string;
  poster_image?: string;
  poster_image_url?: string;
  enable_3d_animation: boolean;
  animation_duration: number;
  background_color: string;
  text_color: string;
  // Video player settings
  video_autoplay: boolean;
  video_muted: boolean;
  video_loop: boolean;
  video_controls: boolean;
  created_at: string;
  updated_at: string;
}

export interface AIPoweredAnalyticsSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  feature_1_title: string;
  feature_1_description: string;
  feature_2_title: string;
  feature_2_description: string;
  feature_3_title: string;
  feature_3_description: string;
  background_color: string;
  accent_color: string;
  created_at: string;
  updated_at: string;
}

export interface ArchitectingExcellenceSection {
  id: number;
  is_visible: boolean;
  order: number;
  badge_text: string;
  main_title_line1: string;
  main_title_line2: string;
  subtitle: string;
  philosophy_title: string;
  philosophy_button_text: string;
  philosophy_button_url: string;
  counter_1_value: number;
  counter_1_label: string;
  counter_2_value: number;
  counter_2_label: string;
  team_name: string;
  team_role: string;
  team_image: string | null;
  step_1_title: string;
  step_1_description: string;
  step_2_title: string;
  step_2_description: string;
  step_3_title: string;
  step_3_description: string;
  step_4_title: string;
  step_4_description: string;
  background_color: string;
  created_at: string;
  updated_at: string;
}

export interface WhyChooseUsSection {
  id: number;
  is_visible: boolean;
  order: number;
  badge_text: string;
  title: string;
  subtitle: string;
  description: string;
  stat_1_value: string;
  stat_1_label: string;
  stat_2_value: string;
  stat_2_label: string;
  stat_3_value: string;
  stat_3_label: string;
  global_title: string;
  global_description: string;
  background_color: string;
  created_at: string;
  updated_at: string;
}

export interface HumanTouchSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  benefit_1_title: string;
  benefit_1_description: string;
  benefit_2_title: string;
  benefit_2_description: string;
  benefit_3_title: string;
  benefit_3_description: string;
  cta_text: string;
  cta_url: string;
  background_color: string;
  created_at: string;
  updated_at: string;
}

export interface VideoTab {
  id: number;
  tab_title: string;
  tab_description: string;
  video_url?: string;
  video_file?: string;
  video_file_url?: string;
  poster_image?: string;
  poster_image_url?: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface VideoTabsSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  background_color: string;
  tabs: VideoTab[];
  created_at: string;
  updated_at: string;
}

export interface CountryData {
  id: number;
  name: string;
  flag_emoji: string;
  country_code: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface MetricsDisplaySection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  background_color: string;
  enable_animation: boolean;
  created_at: string;
  updated_at: string;
}

export interface PricingFeaturesSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  background_color: string;
  created_at: string;
  updated_at: string;
}

export interface DemoTab {
  id: number;
  tab_title: string;
  tab_description: string;
  tab_icon: string;
  demo_url?: string;
  demo_video?: string;
  demo_video_url?: string;
  demo_image?: string;
  demo_image_url?: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface VideoTabsDemoSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  enable_autoplay: boolean;
  demo_duration: number;
  background_color: string;
  demo_tabs: DemoTab[];
  created_at: string;
  updated_at: string;
}

export interface BenefitItem {
  id: number;
  title: string;
  icon: string;
  position: string;
  is_active: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface BenefitsSection {
  id: number;
  is_visible: boolean;
  order: number;
  title: string;
  subtitle: string;
  description: string;
  cta_primary_text: string;
  cta_primary_url: string;
  cta_secondary_text: string;
  cta_secondary_url: string;
  background_color: string;
  benefits: BenefitItem[];
  created_at: string;
  updated_at: string;
}

export interface WebsiteData {
  hero_section: HeroSection;
  about_section: AboutSection;
  service_cards: ServiceCard[];
  metric_boxes: MetricBox[];
  feature_cards: FeatureCard[];
  analytics_section: AnalyticsSection;
  testimonials: Testimonial[];
  pricing_section: PricingSection;
  pricing_plans: PricingPlan[];
  faq_section: FAQSection;
  faq_items: FAQItem[];
  contact_section: ContactSection;
  social_media_section: SocialMediaSection;
  social_media_links: SocialMediaLink[];
  footer_section: FooterSection;
  enhanced_footer_section: EnhancedFooterSection;
  navigation_items: NavigationItem[];
  site_settings: SiteSettings;
}

// Generic API fetch function with improved error handling and timeout
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(
        `API Error: ${response.status} ${response.statusText} - ${errorText}`
      );
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new Error("API request timed out");
      }
      throw error;
    }
    throw new Error("Unknown API error occurred");
  }
}

// API functions
export const api = {
  // Single instance endpoints
  getHeroSection: (): Promise<HeroSection> => apiFetch<HeroSection>("/hero/"),

  getAboutSection: (): Promise<AboutSection> =>
    apiFetch<AboutSection>("/about/"),

  getAnalyticsSection: (): Promise<AnalyticsSection> =>
    apiFetch<AnalyticsSection>("/analytics/"),

  getFooterSection: (): Promise<FooterSection> =>
    apiFetch<FooterSection>("/footer/"),

  getPricingSection: (): Promise<PricingSection> =>
    apiFetch<PricingSection>("/pricing/"),

  getFAQSection: (): Promise<FAQSection> => apiFetch<FAQSection>("/faq/"),

  getContactSection: (): Promise<ContactSection> =>
    apiFetch<ContactSection>("/contact/"),

  getPrivacyPolicy: (): Promise<PrivacyPolicy> =>
    apiFetch<PrivacyPolicy>("/privacy-policy/"),

  getSocialMediaSection: (): Promise<SocialMediaSection> =>
    apiFetch<SocialMediaSection>("/social/"),

  getEnhancedFooterSection: (): Promise<EnhancedFooterSection> =>
    apiFetch<EnhancedFooterSection>("/enhanced-footer/"),

  getSiteSettings: (): Promise<SiteSettings> =>
    apiFetch<SiteSettings>("/site-settings/"),

  // Multiple instance endpoints
  getServiceCards: async (): Promise<ServiceCard[]> => {
    const response = await apiFetch<{ results: ServiceCard[] }>("/services/");
    return response.results;
  },

  getMetricBoxes: async (): Promise<MetricBox[]> => {
    const response = await apiFetch<{ results: MetricBox[] }>("/metrics/");
    return response.results;
  },

  getFeatureCards: async (): Promise<FeatureCard[]> => {
    const response = await apiFetch<{ results: FeatureCard[] }>("/features/");
    return response.results;
  },

  getTestimonials: async (): Promise<Testimonial[]> => {
    const response = await apiFetch<{ results: Testimonial[] }>(
      "/testimonials/"
    );
    return response.results;
  },

  getNavigationItems: async (): Promise<NavigationItem[]> => {
    const response = await apiFetch<{ results: NavigationItem[] }>(
      "/navigation/"
    );
    return response.results;
  },

  getPricingPlans: async (): Promise<PricingPlan[]> => {
    const response = await apiFetch<{ results: PricingPlan[] }>(
      "/pricing-plans/"
    );
    return response.results;
  },

  getFAQItems: async (): Promise<FAQItem[]> => {
    const response = await apiFetch<{ results: FAQItem[] }>("/faq-items/");
    return response.results;
  },

  getSocialMediaLinks: async (): Promise<SocialMediaLink[]> => {
    const response = await apiFetch<{ results: SocialMediaLink[] }>(
      "/social-links/"
    );
    return response.results;
  },

  // New section endpoints
  getAboutTabletSection: (): Promise<AboutTabletSection> =>
    apiFetch<AboutTabletSection>("/about-tablet/"),

  getAIPoweredAnalyticsSection: (): Promise<AIPoweredAnalyticsSection> =>
    apiFetch<AIPoweredAnalyticsSection>("/ai-analytics/"),

  getArchitectingExcellenceSection:
    (): Promise<ArchitectingExcellenceSection> =>
      apiFetch<ArchitectingExcellenceSection>("/architecting-excellence/"),

  getWhyChooseUsSection: (): Promise<WhyChooseUsSection> =>
    apiFetch<WhyChooseUsSection>("/why-choose-us/"),

  getHumanTouchSection: (): Promise<HumanTouchSection> =>
    apiFetch<HumanTouchSection>("/human-touch/"),

  getVideoTabsSection: (): Promise<VideoTabsSection> =>
    apiFetch<VideoTabsSection>("/video-tabs-section/"),

  getMetricsDisplaySection: (): Promise<MetricsDisplaySection> =>
    apiFetch<MetricsDisplaySection>("/metrics-display/"),

  // URGENT FIX: Add metrics endpoint that actually exists
  getMetrics: (): Promise<{ count: number; results: MetricBox[] }> =>
    apiFetch<{ count: number; results: MetricBox[] }>("/metrics/"),

  getPricingFeaturesSection: (): Promise<PricingFeaturesSection> =>
    apiFetch<PricingFeaturesSection>("/pricing-features/"),

  getVideoTabsDemoSection: (): Promise<VideoTabsDemoSection> =>
    apiFetch<VideoTabsDemoSection>("/video-tabs-demo/"),

  getBenefitsSection: (): Promise<BenefitsSection> =>
    apiFetch<BenefitsSection>("/benefits/"),

  // New multiple instance endpoints
  getVideoTabs: async (): Promise<VideoTab[]> => {
    const response = await apiFetch<{ results: VideoTab[] }>("/video-tabs/");
    return response.results;
  },

  getCountryData: async (): Promise<CountryData[]> => {
    const response = await apiFetch<{ results: CountryData[] }>(
      "/country-data/"
    );
    return response.results;
  },

  getDemoTabs: async (): Promise<DemoTab[]> => {
    const response = await apiFetch<{ results: DemoTab[] }>("/demo-tabs/");
    return response.results;
  },

  // Combined endpoint for all website data
  getWebsiteData: (): Promise<WebsiteData> =>
    apiFetch<WebsiteData>("/website-data/"),

  // Contact form submission
  submitContactForm: async (formData: {
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
  }): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/contact-submissions/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
  },
};

// Hook for loading states and error handling
export function useApiData<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiCall();

        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An error occurred");
          console.error("API Error:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}
