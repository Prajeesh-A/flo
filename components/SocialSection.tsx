"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApiData } from "../lib/api";
import { api } from "../lib/api";

const FooterLink = ({
  text,
  color = "#FF4FCB",
}: {
  text: string;
  color?: string;
}) => (
  <motion.div className="block">
    <motion.a
      href="#"
      className="text-lg font-medium transition-colors duration-200 hover:opacity-80 block"
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
      icon_class: "fab fa-linkedin",
      is_active: true,
      order: 1,
    },
    {
      id: 2,
      platform: "twitter",
      platform_name: "Twitter",
      url: "#",
      icon_class: "fab fa-twitter",
      is_active: true,
      order: 2,
    },
    {
      id: 3,
      platform: "discord",
      platform_name: "Discord",
      url: "#",
      icon_class: "fab fa-discord",
      is_active: true,
      order: 3,
    },
  ];

  // URGENT FIX: Force API data only - no fallbacks
  const section = sectionData;
  const links = socialLinks;

  // URGENT: Don't render if no API data
  if (!section || !links) {
    return (
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>🚨 URGENT:</strong> Social Media Section API not working!
            <br />
            Section Error: {sectionError || "No section data"}
            <br />
            Links Error: {linksError || "No links data"}
            <br />
            Check Django admin and API connectivity immediately!
          </div>
        </div>
      </section>
    );
  }

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
                    {/* Simple icon based on platform */}
                    {link.platform === "linkedin" && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {link.platform === "twitter" && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z" />
                      </svg>
                    )}
                    {link.platform === "discord" && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418Z" />
                      </svg>
                    )}
                    {/* Default icon for other platforms */}
                    {!["linkedin", "twitter", "discord"].includes(
                      link.platform
                    ) && (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    )}
                  </motion.div>
                </motion.div>
                <motion.span
                  className="text-sm font-medium transition-colors duration-200"
                  style={{ color: "#666666", fontFamily: "'Poppins',  " }}
                  whileHover={{ color: "#FFC108" }}
                >
                  {link.platform_name}
                </motion.span>
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
                <FooterLink text="About Us" />
                <FooterLink text="Features" />
                <FooterLink text="Services" />
                <FooterLink text="Analytics" />
                <FooterLink text="Pricing" />
                <FooterLink text="Help Center" />
              </div>
            </div>

            {/* Features section - now managed through navigation items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Resources
              </h3>
              <div className="flex flex-col space-y-5">
                <FooterLink text="Documentation" />
                <FooterLink text="API Reference" />
                <FooterLink text="Tutorials" />
                <FooterLink text="Community" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
