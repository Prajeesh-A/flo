"use client";

import React, { createContext, useContext, useState } from "react";
import CTAModal from "@/components/ui/cta-modal";

interface CTAModalContextType {
  openModal: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const CTAModalContext = createContext<CTAModalContextType | undefined>(undefined);

export function CTAModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <CTAModalContext.Provider value={{ openModal, closeModal, isOpen }}>
      {children}
      <CTAModal isOpen={isOpen} onClose={closeModal} />
    </CTAModalContext.Provider>
  );
}

export function useCTAModal() {
  const context = useContext(CTAModalContext);
  if (context === undefined) {
    throw new Error("useCTAModal must be used within a CTAModalProvider");
  }
  return context;
}
