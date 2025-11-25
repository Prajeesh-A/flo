"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import AboutTablet from "@/components/AboutTablet";
import ArchitectingExcellence from "@/components/ArchitectingExcellence";
import HumanTouchSection from "@/components/HumanTouchSection";
import BenefitsSection from "@/components/BenefitsSection";

import ServicesScrollSection from "@/components/ServicesScrollSection";
import MetricsSection from "@/components/MetricsSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import AIPoweredAnalytics from "@/components/AIPoweredAnalytics";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import PricingFeaturesSection from "@/components/PricingFeaturesSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import SocialSection from "@/components/SocialSection";
import FooterSection from "@/components/FooterSection";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import { RichTextRenderer } from "@/components/SafeHTMLRenderer";
import { api, useApiData } from "@/lib/api";
import { useNavigationItems } from "@/lib/api-swr";
import { loadCriticalPageData } from "@/lib/api-batch";
import { CTAModalProvider, useCTAModal } from "@/contexts/CTAModalContext";
import Link from "next/link";

function HomePageContent() {
  const { openModal } = useCTAModal();
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingRotation, setLoadingRotation] = useState(0);

  // Fetch Hero Section data from Django API
  const {
    data: heroData,
    loading: heroLoading,
    error: heroError,
  } = useApiData(api.getHeroSection);

  // Debug logging removed for production

  // Fetch Navigation Items from Django API with SWR caching
  const {
    data: navigationItems,
    isLoading: navLoading,
    error: navError,
  } = useNavigationItems();

  // Fallback navigation items
  const fallbackNavItems = [
    { label: "Home", href: "#", is_active: true },
    { label: "About Us", href: "#about-us", is_active: true },
    { label: "Features", href: "#features", is_active: true },
    { label: "Blogs", href: "/blogs", is_active: true },
    { label: "Help", href: "#help", is_active: true },
    { label: "Contact", href: "#contact", is_active: true },
  ];

  // Use API data or fallback
  const navItems = navigationItems || fallbackNavItems;

  const [customCursor, setCustomCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
  });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Delay setting isVisible until after loading screen completes
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2100); // Slightly after loading screen (2000ms + 100ms buffer)

    // Logo rotation on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotation = scrollY * 0.5; // Adjust rotation speed
      setLogoRotation(rotation);
    };

    // Close mobile menu on outside click
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
      clearTimeout(visibilityTimer);
    };
  }, [isMobileMenuOpen]);

  // Loading animation effect
  useEffect(() => {
    let animationId: number;

    // Loading rotation animation using requestAnimationFrame for better performance
    const animate = () => {
      setLoadingRotation((prev) => (prev + 2) % 360);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Hide loading screen after minimum time and page load
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show for 2 seconds minimum

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(loadingTimer);
    };
  }, []);

  // Custom cursor effect for hero section
  useEffect(() => {
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) return; // Skip if animation frame is already scheduled

      rafId = requestAnimationFrame(() => {
        if (!heroRef.current) {
          rafId = 0;
          return;
        }

        // Only show cursor on desktop devices
        const isDesktop = window.innerWidth > 768;
        if (!isDesktop) {
          rafId = 0;
          return;
        }

        const heroRect = heroRef.current.getBoundingClientRect();
        const isInHero =
          e.clientX >= heroRect.left &&
          e.clientX <= heroRect.right &&
          e.clientY >= heroRect.top &&
          e.clientY <= heroRect.bottom;

        // Check if hovering over interactive elements
        const target = e.target as Element;
        const isInteractive =
          target.closest("button") ||
          target.closest("a") ||
          target.closest("nav") ||
          target.closest('[role="button"]') ||
          target.closest("input") ||
          target.closest("select") ||
          target.closest("textarea");

        setCustomCursor({
          x: e.clientX,
          y: e.clientY,
          visible: isInHero && !isInteractive && isDesktop,
        });

        rafId = 0;
      });
    };

    const handleMouseLeave = () => {
      setCustomCursor((prev) => ({ ...prev, visible: false }));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Loading Screen */}
      {isLoading && (
        <div className={`loading-overlay ${!isLoading ? "fade-out" : ""}`}>
          <div
            className="loading-logo"
            style={{ transform: `rotate(${loadingRotation}deg)` }}
          >
            <Image
              src="/logo.png"
              alt=" floneo Logo"
              width={100}
              height={100}
              className="w-full h-full object-contain"
              priority
            />
          </div>
          <div className="loading-text">
            Loading<span className="loading-dots">...</span>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation Bar */}
          <nav className="mx-auto mt-4 hidden lg:block rounded-full bg-gray-800/40 backdrop-blur-xl shadow-2xl border border-white/20 max-w-7xl">
            <div className="flex items-center justify-between h-[60px] px-6">
              {/* Logo */}
              <div className="flex items-center">
                <Link
                  href="/"
                  className="w-9 h-9 logo-rotate block"
                  style={{ transform: `rotate(${logoRotation}deg)` }}
                >
                  <Image
                    src="/logo.png"
                    alt="Floneo Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain cursor-pointer"
                  />
                </Link>
              </div>

              {/* Navigation Links - Centered */}
              <div className="flex-1 flex items-center justify-center gap-8">
                {navItems
                  .filter((item: any) => item.is_active)
                  .filter((item: any) => item.label.toLowerCase() !== "blog") // Remove blog from center
                  .map((item: any, index: number) => {
                    const isPageLink =
                      item.href.startsWith("/") && !item.href.startsWith("/#");

                    return isPageLink ? (
                      <Link
                        key={index}
                        href={item.href}
                        className="text-white/90 hover:text-white transition-all duration-300 text-[15px] font-normal"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        key={index}
                        href={item.href}
                        className="text-white/90 hover:text-white transition-all duration-300 text-[15px] font-normal"
                      >
                        {item.label}
                      </a>
                    );
                  })}
              </div>

              {/* Right Side Button Group - Blog + Contact Sales */}
              <div className="flex items-center gap-3">
                {/* Blog Button - Secondary */}
                {navItems
                  .filter((item: any) => item.is_active)
                  .filter((item: any) => item.label.toLowerCase() === "blog")
                  .map((item: any, index: number) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-white/90 hover:text-white bg-white/10 hover:bg-white/15 px-5 py-2.5 rounded-full transition-all duration-300 text-[14px] font-medium border border-white/20"
                    >
                      {item.label}
                    </Link>
                  ))}

                {/* Contact Sales Button - Primary CTA */}
                <button
                  className="bg-[#1a2332] hover:bg-[#0f1621] text-white px-6 py-2.5 rounded-full text-[14px] font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => router.push("/contact")}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Bar - Closed State */}
          <nav className="lg:hidden mx-auto mt-4 bg-gray-800/40 backdrop-blur-xl rounded-full px-4 py-2.5 shadow-2xl border border-white/20 max-w-[600px]">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/">
                  <div
                    className="w-9 h-9 logo-rotate"
                    style={{ transform: `rotate(${logoRotation}deg)` }}
                  >
                    <Image
                      src="/logo.png"
                      alt="Floneo Logo"
                      width={36}
                      height={36}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </Link>
              </div>

              {/* Contact Sales Button - Mobile */}
              <button
                className="bg-[#1a2332] text-white px-5 py-2 rounded-full text-[13px] font-medium hover:bg-[#0f1621] transition-all duration-300"
                onClick={() => router.push("/contact")}
              >
                Contact Sales
              </button>

              {/* Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-9 h-9 bg-[#FFC107] rounded-full flex flex-col items-center justify-center gap-1 hover:bg-[#FFB300] transition-all duration-300 shadow-md"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-4 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-4 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-4 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Menu - Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-3 mx-4 mobile-menu-enter mobile-menu-container">
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/40">
              <div className="flex flex-col gap-1">
                {navItems
                  .filter((item: any) => item.is_active)
                  .map((item: any, index: number) => (
                    <a
                      key={index}
                      href={item.href}
                      className="mobile-nav-link text-gray-800 hover:text-[#FFC107] transition-all duration-300 text-[15px] font-medium py-3 px-4 rounded-xl hover:bg-gray-50/80 active:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}

                {/* Additional Contact Button in Menu */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    className="w-full bg-[#FFC107] text-black py-3 px-4 rounded-xl font-semibold text-[15px] hover:bg-[#FFB300] transition-all duration-300 shadow-md"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      openModal();
                    }}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Custom Cursor */}
      {customCursor.visible && (
        <div
          className="custom-cursor pointer-events-none fixed z-[9999]"
          style={{
            left: customCursor.x,
            top: customCursor.y,
            opacity: customCursor.visible ? 1 : 0,
            transform: "translate(-50%, -50%)",
            transition: "opacity 0.2s ease-in-out",
            filter: "drop-shadow(0 0 8px rgba(0, 0, 0, 0.6))",
          }}
        >
          <div className="flex items-center gap-3">
            <svg
              width={28}
              height={28}
              viewBox="0 0 24 24"
              className="text-white drop-shadow-lg"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: "block",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
              }}
            >
              <path d="M3 2L21 12L13 14L11 22L3 2Z" fill="currentColor" />
            </svg>
            {/* dont uncomment this */}
            {/* <div className="custom-cursor-pill bg-[#2ECC71] text-white shadow-xl border border-gray-500 px-4 py-2 rounded-full font-poppins font-normal text-sm backdrop-blur-sm">
              Here we go!
            </div> */}
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="hero-section  pb-32 md:pb-40 px-6 sm:px-8 lg:px-12"
      >
        <div className="container mx-auto max-w-6xl">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Small tagline with emoji */}
            <div className="flex items-center justify-center gap-2 mb-0 mt-20 md:mt-24">
              <Image
                src="/favicon-32x32.png"
                alt="FloNeo Logo"
                width={20}
                height={20}
                className="flex-shrink-0"
              />
              <span className="text-lg font-light font-poppins text-gray-700">
                {heroLoading
                  ? "Loading..."
                  : heroError
                  ? "Build. Automate. Scale."
                  : heroData?.tagline || "Build. Automate. Scale."}
              </span>
              {!heroLoading && (
                <span className="text-lg font-medium font-poppins text-gray-900">
                  Without the IT bottleneck
                </span>
              )}
            </div>

            {/* Large  floneo brand name */}
            <h1
              className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[12rem] font-surgena font-semibold mb-6 sm:mb-10 leading-tight tracking-tight"
              style={{ color: "var(--deep-navy)", fontWeight: 600 }}
            >
              {heroLoading
                ? " floneo"
                : heroError
                ? " floneo"
                : heroData?.title || " floneo"}
            </h1>

            {/* Description */}
            <div className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-16 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              {heroLoading ? (
                <p>Loading...</p>
              ) : heroError ? (
                <p>
                  FloNeo's Low-Code/No-Code platform turns manual processes into
                  instant, powerful applications.It gives teams the agility to
                  build and deploy real business solutions in hours, not months.
                </p>
              ) : (
                <RichTextRenderer
                  content={
                    heroData?.description ||
                    "FloNeo's Low-Code/No-Code platform turns manual processes into instant, powerful applications.It gives teams the agility to build and deploy real business solutions in hours, not months."
                  }
                  fallback="FloNeo's Low-Code/No-Code platform turns manual processes into instant, powerful applications.It gives teams the agility to build and deploy real business solutions in hours, not months."
                />
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0">
              <button className="hero-cta-primary" onClick={openModal}>
                <span>
                  {heroLoading
                    ? "Get Started"
                    : heroError
                    ? "Get Started"
                    : heroData?.cta_primary_text || "Get Started"}
                </span>
              </button>
              <button className="hero-cta-secondary" onClick={openModal}>
                <span>
                  {heroLoading
                    ? "Schedule a Demo"
                    : heroError
                    ? "Schedule a Demo"
                    : heroData?.cta_secondary_text || "Schedule a Demo"}
                </span>
              </button>
            </div>

            {/* Star Rating */}
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-green-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-base ml-3">
                Trusted by 20+ forward thinking teams
              </span>
            </div>
          </div>

          {/* About Us (scroll-triggered tablet) */}
        </div>
      </section>
      <AboutTablet />
      {/* Architecting Excellence Section */}
      <ArchitectingExcellence />
      {/* Human Touch Section - Easy Workflow Management */}
      <HumanTouchSection />
      {/* Benefits Section - More than Automation */}
      <BenefitsSection />
      {/* Services Scroll Section - Stacking Card Animation */}
      <ServicesScrollSection />
      {/* Metrics Section - Animated Counter Boxes */}
      <MetricsSection />
      {/* Why Choose Us Section - AI Analytics & Country Flags Ticker */}
      <WhyChooseUsSection />
      {/* Analytics Section - Dynamic Donut Chart with Floating Elements */}
      <AnalyticsSection />
      {/* AI-Powered Analytics Section - Circular Metrics & AI Capabilities */}
      <AIPoweredAnalytics />
      {/* Testimonials Section */}
      {/* <Testimonials /> */}
      {/* Pricing Section */}
      {/* <PricingSection /> */}
      {/* Pricing Features Section */}
      {/* <PricingFeaturesSection /> */}
      {/* FAQ Section */}
      <FAQSection />
      {/* Contact Section */}
      <ContactSection />
      {/* Social Section */}
      <SocialSection />
      {/* Footer Section */}
      <FooterSection />

      {/* Performance Monitoring */}
      <PerformanceMonitor />
    </div>
  );
}

export default function HomePage() {
  return (
    <CTAModalProvider>
      <HomePageContent />
    </CTAModalProvider>
  );
}
