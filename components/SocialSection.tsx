"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApiData } from "../lib/api";
import { api } from "../lib/api";

// Helper function to get social media icons
const getSocialIcon = (platform: string, iconClass?: string) => {
  const iconProps = {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    fill: "currentColor",
  };

  switch (platform.toLowerCase()) {
    case "linkedin":
      return (
        <svg {...iconProps}>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "x":
    case "twitter":
      return (
        <svg {...iconProps}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...iconProps}>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...iconProps}>
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...iconProps}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    case "discord":
      return (
        <svg {...iconProps}>
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
        </svg>
      );
    default:
      // Generic social media icon
      return (
        <svg {...iconProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
      );
  }
};

const FooterLink = ({
  text,
  color = "#FF4FCB",
  href = "#",
  onClick,
}: {
  text: string;
  color?: string;
  href?: string;
  onClick?: () => void;
}) => (
  <motion.div className="block">
    <motion.a
      href={href}
      target={href !== "#" && !onClick ? "_blank" : undefined}
      rel={href !== "#" && !onClick ? "noopener noreferrer" : undefined}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick();
        }
      }}
      className="text-lg font-medium transition-colors duration-200 hover:opacity-80 block cursor-pointer"
      style={{ color, fontFamily: "'Poppins',  " }}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.a>
  </motion.div>
);

export default function SocialSection() {
  // Fetch social media section data from API
  const {
    data: sectionData,
    loading: sectionLoading,
    error: sectionError,
  } = useApiData(api.getSocialMediaSection);

  // Fetch social media links from API
  const {
    data: socialLinks,
    loading: linksLoading,
    error: linksError,
  } = useApiData(api.getSocialMediaLinks);

  // Fallback data for section
  const fallbackSection = {
    title: "Connect With Us",
    subtitle: "Social Media",
    is_visible: true,
  };

  // Fallback data for social links
  const fallbackLinks = [
    {
      id: 1,
      platform: "linkedin",
      platform_name: "LinkedIn",
      url: "#",
      icon_class: "fab fa-linkedin-in",
      is_active: true,
      order: 1,
    },
    {
      id: 2,
      platform: "x",
      platform_name: "", // Optional platform name
      url: "#",
      icon_class: "fab fa-x-twitter",
      is_active: true,
      order: 2,
    },
    {
      id: 3,
      platform: "youtube",
      platform_name: "YouTube",
      url: "#",
      icon_class: "fab fa-youtube",
      is_active: true,
      order: 3,
    },
  ];

  // Use API data or fallback
  const section = sectionData || fallbackSection;
  const links = socialLinks || fallbackLinks;

  // Don't render if not visible
  if (!section.is_visible) {
    return null;
  }

  // Loading state
  if (sectionLoading || linksLoading) {
    return (
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="grid grid-cols-3 gap-8 max-w-md">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Debug indicator for fallback data */}
        {(!sectionData || !socialLinks || sectionError || linksError) && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6 text-sm">
            <strong>Debug:</strong> Using fallback data -
            {(!sectionData || sectionError) && " social section"}
            {(!sectionData || sectionError) &&
              (!socialLinks || linksError) &&
              ","}
            {(!socialLinks || linksError) && " social links"} not loaded from
            API
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.2, 0.6, 0.2, 1] }}
            className="grid grid-cols-3 gap-8 max-w-md"
          >
            {/* Dynamic Social Media Links */}
            {links.slice(0, 3).map((link) => (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center gap-2 cursor-pointer group"
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <motion.div
                  className="w-12 h-12 rounded-lg border border-gray-300 flex items-center justify-center transition-colors duration-200"
                  whileHover={{ borderColor: "#FFC108" }}
                  style={{ color: "#666666" }}
                >
                  <motion.div
                    whileHover={{ color: "#FFC108" }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Use helper function to get the correct icon */}
                    {getSocialIcon(link.platform, link.icon_class)}
                  </motion.div>
                </motion.div>
                {/* Only show platform name if it exists and is not empty */}
                {link.platform_name && link.platform_name.trim() !== "" && (
                  <motion.span
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: "#666666", fontFamily: "'Poppins',  " }}
                    whileHover={{ color: "#FFC108" }}
                  >
                    {link.platform_name}
                  </motion.span>
                )}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.6, 0.2, 1] }}
            className="grid grid-cols-2 gap-12"
          >
            <div>
              <h3
                className="text-2xl  text-black mb-8"
                style={{ fontFamily: "'Poppins'" }}
              >
                Company
              </h3>
              <div className="flex flex-col space-y-5">
                <FooterLink
                  text="About Us"
                  href="#about"
                  onClick={() => {
                    const aboutSection = document.getElementById("about");
                    if (aboutSection) {
                      aboutSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                />
                <FooterLink
                  text="Features"
                  href="#services"
                  onClick={() => {
                    const benefitsSection = document.getElementById("services");
                    if (benefitsSection) {
                      benefitsSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                />
                <FooterLink
                  text="Analytics"
                  href="#analytics"
                  onClick={() => {
                    const analyticsSection =
                      document.querySelector('[id*="analytics"]');
                    if (analyticsSection) {
                      analyticsSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                />
                <FooterLink
                  text="Help Center"
                  href="#help"
                  onClick={() => {
                    const faqSection = document.getElementById("help");
                    if (faqSection) {
                      faqSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                />
              </div>
            </div>

            {/* Features section - now managed through navigation items */}
            <div>
              <h3
                className="text-lg text-gray-900 mb-6 font-bold"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Resources
              </h3>
              <div className="flex flex-col space-y-5">
                <FooterLink text="Documentation" />
                <FooterLink text="API Reference" />
                <FooterLink text="Tutorials" />
                <FooterLink text="Community" />
                <FooterLink text="Privacy Policy" href="/privacy-policy" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
