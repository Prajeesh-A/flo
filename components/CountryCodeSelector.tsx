"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { useCountryData } from "@/lib/api-swr";
import type { CountryData } from "@/lib/api";

export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

// Popular countries with their dial codes and flags
const countries: Country[] = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰" },
  { code: "FI", name: "Finland", dialCode: "+358", flag: "🇫🇮" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭" },
  { code: "AT", name: "Austria", dialCode: "+43", flag: "🇦🇹" },
  { code: "BE", name: "Belgium", dialCode: "+32", flag: "🇧🇪" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬" },
  { code: "HK", name: "Hong Kong", dialCode: "+852", flag: "🇭🇰" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦" },
  { code: "IL", name: "Israel", dialCode: "+972", flag: "🇮🇱" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷" },
  { code: "PL", name: "Poland", dialCode: "+48", flag: "🇵🇱" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420", flag: "🇨🇿" },
  { code: "HU", name: "Hungary", dialCode: "+36", flag: "🇭🇺" },
  { code: "GR", name: "Greece", dialCode: "+30", flag: "🇬🇷" },
  { code: "PT", name: "Portugal", dialCode: "+351", flag: "🇵🇹" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳" },
];

interface CountryCodeSelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  className?: string;
  disabled?: boolean;
  theme?: "light" | "dark";
  variant?: "default" | "contact-section" | "contact-page";
}

export default function CountryCodeSelector({
  selectedCountry,
  onCountryChange,
  className = "",
  disabled = false,
  theme = "light",
  variant = "default",
}: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Fetch country data from API
  const { data: apiCountryData, error: countryError } = useCountryData();

  // Create a mapping function to get dial code from country code
  const getDialCodeForCountry = (countryCode: string): string => {
    const hardcodedCountry = countries.find((c) => c.code === countryCode);
    return hardcodedCountry?.dialCode || `+${countryCode}`;
  };

  // Transform API data to match our Country interface, merging with hardcoded dial codes
  const apiCountries: Country[] =
    apiCountryData?.map((country: CountryData) => ({
      code: country.country_code,
      name: country.name,
      dialCode: getDialCodeForCountry(country.country_code),
      flag: country.flag_emoji,
    })) || [];

  // Use API data if available, otherwise fallback to hardcoded data
  const availableCountries = apiCountries.length > 0 ? apiCountries : countries;

  // Filter countries based on search term
  const filteredCountries = availableCountries.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside (handle both mouse and touch events)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Detect mobile viewport
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Focus search input when dropdown opens (but not on mobile to prevent keyboard issues)
  useEffect(() => {
    if (isOpen && searchInputRef.current && !isMobile) {
      searchInputRef.current.focus();
    }
  }, [isOpen, isMobile]);

  // Update dropdown position on scroll (mobile only)
  useEffect(() => {
    if (!isMobile || !isOpen) return;

    const handleScroll = () => {
      calculateDropdownPosition();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile, isOpen]);

  const handleCountrySelect = (country: Country) => {
    onCountryChange(country);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Calculate dropdown position for mobile
  const calculateDropdownPosition = () => {
    if (!buttonRef.current || !isMobile) return;

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const dropdownHeight = 300; // Approximate dropdown height

    let top = buttonRect.bottom + window.scrollY + 4;

    // If dropdown would go below viewport, position it above the button
    if (buttonRect.bottom + dropdownHeight > viewportHeight) {
      top = buttonRect.top + window.scrollY - dropdownHeight - 4;
    }

    setDropdownPosition({
      top,
      left: 16, // 1rem padding from screen edge
    });
  };

  // Update dropdown position when opening
  const handleToggleDropdown = () => {
    if (!disabled) {
      if (!isOpen && isMobile) {
        calculateDropdownPosition();
      }
      setIsOpen(!isOpen);
    }
  };

  // Get theme-specific styles
  const getButtonStyles = () => {
    const baseStyles =
      "flex items-center gap-2 px-3 py-3 border transition-colors duration-200 h-12 min-h-[3rem]";

    if (variant === "contact-section") {
      return `${baseStyles} bg-black/20 border-white/10 rounded-l-lg text-white hover:bg-black/30 ${
        isOpen ? "border-white/30" : ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`;
    }

    if (variant === "contact-page") {
      return `${baseStyles} bg-gray-700/50 border-gray-600/50 rounded-l-xl text-white hover:bg-gray-600/50 ${
        isOpen ? "border-[#2ECC71] ring-1 ring-[#2ECC71]" : ""
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`;
    }

    // Default light theme
    return `${baseStyles} bg-white border-gray-300 rounded-l-lg hover:bg-gray-50 ${
      isOpen ? "border-blue-500 ring-1 ring-blue-500" : ""
    } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`;
  };

  const getTextStyles = () => {
    if (variant === "contact-section" || variant === "contact-page") {
      return "text-white/90";
    }
    return "text-gray-700";
  };

  const getIconStyles = () => {
    if (variant === "contact-section" || variant === "contact-page") {
      return "text-white/60";
    }
    return "text-gray-400";
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Selected Country Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggleDropdown}
        disabled={disabled}
        className={getButtonStyles()}
      >
        <div className="text-sm font-medium flex items-center space-x-2 truncate">
          <span className="mr-2">{selectedCountry.flag}</span>
          <span>{selectedCountry.name}</span>
        </div>

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${getIconStyles()} ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Mobile Backdrop */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-[9999]"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full left-0 z-[9999] ${
              isMobile ? "w-[280px] max-w-[90vw]" : "w-80 sm:w-80 max-w-[95vw]"
            } mt-1 rounded-lg shadow-2xl ${
              variant === "contact-section" || variant === "contact-page"
                ? "bg-gray-800 border border-gray-600"
                : "bg-white border border-gray-300"
            }`}
            style={{
              // Ensure dropdown doesn't go off-screen on mobile
              ...(isMobile && {
                position: "fixed",
                top: `${dropdownPosition.top}px`,
                left: `${dropdownPosition.left}px`,
                right: "1rem",
                width: "auto",
                maxWidth: "none",
                transform: "none",
                zIndex: 10001,
              }),
            }}
          >
            {/* Search Input */}
            <div
              className={`p-3 ${
                variant === "contact-section" || variant === "contact-page"
                  ? "border-b border-gray-600"
                  : "border-b border-gray-200"
              }`}
            >
              <div className="relative">
                <Search
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    variant === "contact-section" || variant === "contact-page"
                      ? "text-gray-400"
                      : "text-gray-400"
                  }`}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                    variant === "contact-section" || variant === "contact-page"
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-[#2ECC71] focus:border-[#2ECC71]"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"
                  }`}
                />
              </div>
            </div>

            {/* Countries List */}
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors duration-150 min-h-[44px] touch-manipulation ${
                      variant === "contact-section" ||
                      variant === "contact-page"
                        ? `hover:bg-gray-700 active:bg-gray-600 ${
                            selectedCountry.code === country.code
                              ? "bg-[#2ECC71]/20 text-[#2ECC71]"
                              : "text-gray-300"
                          }`
                        : `hover:bg-gray-50 active:bg-gray-100 ${
                            selectedCountry.code === country.code
                              ? "bg-blue-50 text-blue-700"
                              : "text-gray-700"
                          }`
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium flex items-center space-x-2 truncate">
                        <span className="mr-2">{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        variant === "contact-section" ||
                        variant === "contact-page"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      {country.dialCode}
                    </span>
                  </button>
                ))
              ) : (
                <div
                  className={`px-4 py-6 text-center ${
                    variant === "contact-section" || variant === "contact-page"
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  No countries found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Export the default country (US) for convenience
export const defaultCountry: Country = countries[0];

// Export countries array for external use
export { countries };
