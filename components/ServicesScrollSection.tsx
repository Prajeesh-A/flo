"use client";

import React, { useRef, useEffect, useState } from "react";
import { api, useApiData } from "@/lib/api";

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  image?: string;
  image_url?: string;
  color: string;
}

const StackingCard = ({
  card,
  index,
  totalCards,
  scrollProgress,
}: {
  card: ServiceCard;
  index: number;
  totalCards: number;
  scrollProgress: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate padding top (20 + index * 20)
  const offsetTop = 20 + index * 20;

  // Calculate target scale for this card (1 - (totalCards - 1 - index) * 0.1)
  const targetScale = 1 - (totalCards - 1 - index) * 0.1;

  // Track scroll for the NEXT card (if not last card)
  const isLastCard = index === totalCards - 1;

  // Calculate the progress range for this card
  // Each card gets 1/totalCards of the total scroll progress
  const cardStartProgress = index / totalCards;
  const cardEndProgress = (index + 1) / totalCards;

  // Calculate the current card's visibility and scale based on scroll progress
  const cardProgress = Math.max(
    0,
    Math.min(
      1,
      (scrollProgress - cardStartProgress) /
        (cardEndProgress - cardStartProgress)
    )
  );

  // Calculate scale and brightness based on the NEXT card's progress
  let scale = 1;
  let brightness = 1;

  if (!isLastCard) {
    const nextCardStartProgress = (index + 1) / totalCards;
    const nextCardEndProgress = (index + 2) / totalCards;
    const nextCardProgress = Math.max(
      0,
      Math.min(
        1,
        (scrollProgress - nextCardStartProgress) /
          (nextCardEndProgress - nextCardStartProgress)
      )
    );

    scale = 1 - (1 - targetScale) * nextCardProgress;
    brightness = 1 - 0.4 * nextCardProgress;
  }

  // Calculate Y position - card slides up from below
  const yPosition = Math.max(0, (1 - cardProgress) * 100);

  // Calculate opacity - fade in as card appears
  const opacity = Math.min(1, cardProgress * 2);

  return (
    <div
      ref={cardRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        paddingTop: `${offsetTop}px`,
        transform: `translateY(${yPosition}vh)`,
        opacity: opacity,
        zIndex: index,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          filter: `brightness(${brightness})`,
          transformOrigin: "center top",
          willChange: "transform",
          transition: "transform 0.1s ease-out, filter 0.1s ease-out",
        }}
        className="w-full max-w-4xl mx-auto card-inner"
      >
        <div
          className="bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
          }}
        >
          {/* Image Container */}
          <div className="w-full md:w-2/5 flex-shrink-0">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover aspect-square md:aspect-auto"
            />
          </div>

          {/* Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4"
              style={{
                color: "#16263a",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 600,
              }}
            >
              {card.title}
            </h1>
            <p
              className="text-lg md:text-xl lg:text-2xl leading-relaxed"
              style={{
                color: "#16263a",
                fontFamily: "'Poppins', sans-serif",
                lineHeight: 1.4,
              }}
            >
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ServicesScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrollLocked, setIsScrollLocked] = useState(false);
  const [cardHeight, setCardHeight] = useState(500);

  // Fetch services from API
  const { data: apiServices, loading, error } = useApiData(api.getServiceCards);

  // Fallback services if API fails
  const fallbackServices: ServiceCard[] = [
    {
      id: 1,
      title: "Process Automation",
      description:
        "Automate repetitive tasks and workflows to increase efficiency and reduce errors.",
      color: "#0066ff",
    },
    {
      id: 2,
      title: "Data Analytics",
      description:
        "Transform your data into actionable insights with powerful analytics tools.",
      color: "#2ecc71",
    },
    {
      id: 3,
      title: "Workflow Management",
      description:
        "Streamline your business processes with intelligent workflow automation.",
      color: "#9b59b6",
    },
    {
      id: 4,
      title: "Integration Platform",
      description:
        "Connect all your tools and systems with seamless integrations.",
      color: "#FFC107",
    },
  ];

  // Use API data or fallback
  const servicesData = apiServices || fallbackServices;
  const scrollAccumulatorRef = useRef(0);

  useEffect(() => {
    if (cardsContainerRef.current) {
      const firstCard = cardsContainerRef.current.querySelector(".card-inner");
      if (firstCard) {
        const height = firstCard.clientHeight;
        setCardHeight(height);
      }
    }
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isInSection = rect.top <= 0 && rect.bottom >= window.innerHeight;

      // Calculate total scroll distance needed for all cards
      const scrollPerCard = 800;
      const totalScrollNeeded = scrollPerCard * servicesData.length;

      if (isInSection) {
        // Calculate progress (0 to 1)
        const currentProgress =
          scrollAccumulatorRef.current / totalScrollNeeded;

        // Only hijack scroll if animation is not complete
        if (currentProgress < 1) {
          // We're in the services section and animation not complete - hijack the scroll
          e.preventDefault();

          // Accumulate scroll delta
          scrollAccumulatorRef.current += e.deltaY;

          // Clamp the accumulator
          scrollAccumulatorRef.current = Math.max(
            0,
            Math.min(totalScrollNeeded, scrollAccumulatorRef.current)
          );

          // Calculate new progress
          const progress = scrollAccumulatorRef.current / totalScrollNeeded;
          setScrollProgress(progress);

          // Lock scroll
          setIsScrollLocked(true);
        } else {
          // Animation complete - allow normal scroll to pass through
          setIsScrollLocked(false);

          // If scrolling down, allow the page to scroll past this section
          if (e.deltaY > 0) {
            // Don't prevent default - let normal scroll happen
            // This allows scrolling to the next section
          }
        }
      } else if (rect.top > 0) {
        // Section is below viewport - reset
        scrollAccumulatorRef.current = 0;
        setScrollProgress(0);
        setIsScrollLocked(false);
      } else if (rect.bottom < 0) {
        // Section is above viewport - reset
        scrollAccumulatorRef.current = 0;
        setScrollProgress(0);
        setIsScrollLocked(false);
      }
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();

      // Reset when scrolling away from section
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        scrollAccumulatorRef.current = 0;
        setScrollProgress(0);
        setIsScrollLocked(false);
      }
    };

    // Add wheel listener with passive: false to allow preventDefault
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollProgress]);

  // Lock body scroll when in animation
  useEffect(() => {
    if (isScrollLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isScrollLocked]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white relative"
      style={{
        fontFamily: "'Poppins', sans-serif",
        minHeight: "120vh", // Further reduced from 200vh to 120vh for better integration
      }}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
            Our Services
          </h2>
          <p className="text-gray-600 text-lg">
            Discover how we help you build, automate, and scale
          </p>
        </div>

        {/* Scroll-jacking animation area */}
        <div className="relative" style={{ minHeight: "60vh" }}>
          {/* Stacking Cards Container - Fixed position during animation */}
          <div
            ref={cardsContainerRef}
            className="relative w-full max-w-4xl mx-auto"
            style={{
              height: `${cardHeight + 200}px`,
              position: isScrollLocked ? "fixed" : "relative",
              top: isScrollLocked ? "50%" : "auto",
              left: isScrollLocked ? "50%" : "auto",
              transform: isScrollLocked ? "translate(-50%, -50%)" : "none",
              zIndex: isScrollLocked ? 100 : 1,
            }}
          >
            {servicesData.map((card, index) => (
              <StackingCard
                key={card.id}
                card={card}
                index={index}
                totalCards={servicesData.length}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
