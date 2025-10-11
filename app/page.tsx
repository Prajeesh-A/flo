"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
import { api, useApiData } from "@/lib/api";
import { CTAModalProvider, useCTAModal } from "@/contexts/CTAModalContext";

function HomePageContent() {
  const { openModal } = useCTAModal();
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

  // Debug logging
  useEffect(() => {
    console.log("API Debug Info:");
    console.log(
      "- API URL:",
      process.env.NEXT_PUBLIC_API_URL || "https://flo-do2v.onrender.com/api"
    );
    console.log("- Hero Loading:", heroLoading);
    console.log("- Hero Error:", heroError);
    console.log("- Hero Data:", heroData);
  }, [heroLoading, heroError, heroData]);

  // Fetch Navigation Items from Django API
  const {
    data: navigationItems,
    loading: navLoading,
    error: navError,
  } = useApiData(api.getNavigationItems);

  // Fallback navigation items
  const fallbackNavItems = [
    { label: "About Us", href: "#about-us", is_active: true },
    { label: "Features", href: "#features", is_active: true },
    { label: "Services", href: "#services", is_active: true },
    { label: "Analytics", href: "#analytics", is_active: true },
    { label: "Help Center", href: "#help", is_active: true },
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
    // Loading rotation animation
    const loadingInterval = setInterval(() => {
      setLoadingRotation((prev) => (prev + 2) % 360);
    }, 16); // ~60fps

    // Hide loading screen after minimum time and page load
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Show for 2 seconds minimum

    return () => {
      clearInterval(loadingInterval);
      clearTimeout(loadingTimer);
    };
  }, []);

  // Custom cursor effect for hero section
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      // Only show cursor on desktop devices
      const isDesktop = window.innerWidth > 768;
      if (!isDesktop) return;

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
    };

    const handleMouseLeave = () => {
      setCustomCursor((prev) => ({ ...prev, visible: false }));
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
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
          <nav className="nav-black-transparent mx-auto mt-4 hidden lg:block">
            <div className="flex items-center justify-between h-full px-8">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div
                  className="w-10 h-10 logo-rotate"
                  style={{ transform: `rotate(${logoRotation}deg)` }}
                >
                  <Image
                    src="/logo.png"
                    alt=" floneo Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex items-center gap-8">
                {navItems
                  .filter((item) => item.is_active)
                  .map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="nav-link text-white hover:text-[#FFC107] transition-colors text-sm font-medium"
                    >
                      {item.label}
                    </a>
                  ))}
              </div>

              {/* Contact Sales Button */}
              <button className="contact-sales-btn" onClick={openModal}>
                Contact Sales
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Bar */}
          <nav className="lg:hidden mx-auto mt-4 bg-white/90 backdrop-blur-md rounded-full px-4 py-3 shadow-lg max-w-md">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <div
                  className="w-10 h-10 logo-rotate"
                  style={{ transform: `rotate(${logoRotation}deg)` }}
                >
                  <Image
                    src="/logo.png"
                    alt=" floneo Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Contact Sales Button - Mobile */}
              <button
                className="bg-[#2C2C2E] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1C1C1E] transition-colors"
                onClick={openModal}
              >
                Contact Sales
              </button>

              {/* Yellow Hamburger Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-12 h-12 bg-[#FFC107] rounded-full flex flex-col items-center justify-center gap-1.5 hover:bg-[#FFB300] transition-colors active:scale-95"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-3 mx-4 mobile-menu-enter mobile-menu-container">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-200">
              <div className="flex flex-col gap-3">
                <a
                  href="#about"
                  className="mobile-nav-link text-gray-800 hover:text-[#FFC107] transition-colors text-base font-medium py-3 px-4 rounded-xl hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </a>
                <a
                  href="#features"
                  className="mobile-nav-link text-gray-800 hover:text-[#FFC107] transition-colors text-base font-medium py-3 px-4 rounded-xl hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#services"
                  className="mobile-nav-link text-gray-800 hover:text-[#FFC107] transition-colors text-base font-medium py-3 px-4 rounded-xl hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Services
                </a>
                <a
                  href="#analytics"
                  className="mobile-nav-link text-gray-800 hover:text-[#FFC107] transition-colors text-base font-medium py-3 px-4 rounded-xl hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Analytics
                </a>
                <a
                  href="#pricing"
                  className="mobile-nav-link text-gray-800 hover:text-[#FFC107] transition-colors text-base font-medium py-3 px-4 rounded-xl hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </a>
                <a
                  href="#help"
                  className="mobile-nav-link text-gray-800 hover:text-[#FFC107] transition-colors text-base font-medium py-3 px-4 rounded-xl hover:bg-gray-100"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Help Center
                </a>
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
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
              }}
            >
              <path d="M3 2L21 12L13 14L11 22L3 2Z" fill="currentColor" />
            </svg>
            <div className="custom-cursor-pill bg-white text-gray-900 shadow-xl border border-gray-200 px-4 py-2 rounded-full font-medium text-sm backdrop-blur-sm">
              Here we go!
            </div>
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="hero-section pt-40 pb-32 md:pt-48 md:pb-40 px-6 sm:px-8 lg:px-12"
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
            <div className="flex items-center justify-center gap-0 mb-0">
              <span
                className="text-black text-lg font-light font-poppins"
                style={{ minWidth: 290 }}
              >
                {heroLoading
                  ? "Loading..."
                  : heroError
                  ? "Build. Automate. Scale."
                  : heroData?.tagline || "Build. Automate. Scale."}
              </span>
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
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-8 sm:mb-16 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              {heroLoading
                ? "Loading..."
                : heroError
                ? " floneo's Low-Code/No-Code platform turns manual processes into instant, powerful applications."
                : heroData?.description ||
                  " floneo's Low-Code/No-Code platform turns manual processes into instant, powerful applications."}
            </p>

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
      {/* <ServicesScrollSection /> */}
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
