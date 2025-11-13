"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface CTAModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CTAModal({ isOpen, onClose }: CTAModalProps) {
  const router = useRouter();
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-500" />
              </button>

              {/* Content */}
              <div className="text-center">
                {/* Logo */}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 p-3"
                  style={{ backgroundColor: "#1A2332" }}
                >
                  <img
                    src="/logo.png"
                    alt="FloNeo Logo"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Title */}
                <h2
                  className="text-2xl font-bold text-gray-900 mb-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Exciting News!
                </h2>

                {/* Message */}
                <p
                  className="text-gray-600 text-lg leading-relaxed mb-8"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  <span className="font-semibold text-blue-600">floneo</span>{" "}
                  will be ready for demo on{" "}
                  <span className="font-semibold text-blue-600">
                    November 30th
                  </span>
                  .
                  <br />
                  Reserve your spot today!
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      router.push("/contact");
                      onClose();
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Reserve My Spot
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-semibold transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Maybe Later
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
