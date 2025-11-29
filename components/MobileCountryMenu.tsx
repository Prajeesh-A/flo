"use client";

import React from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Country } from "./CountryCodeSelector";

interface MobileCountryMenuProps {
  isOpen: boolean;
  countries: Country[];
  selectedCountry: Country;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onCountrySelect: (country: Country) => void;
  onClose: () => void;
  theme?: "light" | "dark";
}

export default function MobileCountryMenu({
  isOpen,
  countries,
  selectedCountry,
  searchTerm,
  onSearchChange,
  onCountrySelect,
  onClose,
  theme = "light",
}: MobileCountryMenuProps) {
  const isDark = theme === "dark";

  if (!isOpen) return null;

  const content = (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-[99998]"
        onClick={onClose}
        style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Menu */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`fixed left-4 right-4 bottom-4 z-[99999] max-h-[70vh] rounded-xl shadow-2xl border ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
        style={{ position: "fixed" }}
      >
        {/* Search */}
        <div
          className={`p-4 ${
            isDark ? "border-b border-gray-700" : "border-b border-gray-100"
          }`}
        >
          <div className="relative">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              autoFocus
              className={`w-full pl-11 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                isDark
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500"
                  : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-blue-500"
              }`}
            />
          </div>
        </div>

        {/* Countries list */}
        <div className="max-h-60 overflow-y-auto overscroll-contain">
          {countries.length > 0 ? (
            countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => onCountrySelect(country)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors min-h-[52px] touch-manipulation ${
                  isDark
                    ? `hover:bg-gray-700 active:bg-gray-600 ${
                        selectedCountry.code === country.code
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-gray-300"
                      }`
                    : `hover:bg-gray-50 active:bg-gray-100 ${
                        selectedCountry.code === country.code
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-700"
                      }`
                }`}
              >
                <div className="flex items-center">
                  <span className="text-2xl w-8 flex items-center justify-center flex-shrink-0 mr-3">
                    {country.flag}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate leading-tight">
                      {country.name}
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium min-w-[3rem] text-right flex-shrink-0 ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {country.dialCode}
                  </span>
                </div>
              </button>
            ))
          ) : (
            <div
              className={`px-4 py-8 text-center text-sm ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No countries found
            </div>
          )}
        </div>
      </motion.div>
    </>
  );

  return createPortal(content, document.body);
}
