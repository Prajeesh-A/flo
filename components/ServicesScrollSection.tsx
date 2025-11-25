"use client";

import React, { useRef, useEffect, useState } from "react";

interface ServiceCard {
  id: number;
  title: string;
  description: string;
  image?: string;
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
  const [imageError, setImageError] = useState(false);

  // Calculate when this card should start and finish animating
  const cardStart = index / totalCards;
  const cardEnd = (index + 1) / totalCards;
  
  // Progress for this specific card (0 to 1)
  const cardProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - cardStart) / (cardEnd - cardStart))
  );

  // Calculate transformations
  const scale = 1 - (totalCards - 1 - index) * 0.05;
  const yOffset = 40 + index * 30;
  
  // Slide up animation
  const translateY = (1 - cardProgress) * 100;
  
  // Fade in
  const opacity = Math.min(1, cardProgress * 1.5);
  
  // When next card appears, scale down and dim this card
  const nextCardStart = (index + 1) / totalCards;
  const nextCardProgress = Math.max(
    0,
    Math.min(1, (scrollProgress - nextCardStart) / ((index + 2) / totalCards - nextCardStart))
  );
  
  const currentScale = index === totalCards - 1 
    ? scale 
    : scale - (scale - (scale - 0.05)) * nextCardProgress;
  
  const brightness = 1 - nextCardProgress * 0.3;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        transform: `translateY(${translateY}vh)`,
        opacity: opacity,
        zIndex: index,
        pointerEvents: cardProgress > 0 ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          transform: `scale(${currentScale})`,
          filter: `brightness(${brightness})`,
          transformOrigin: "center center",
          transition: "transform 0.2s ease-out, filter 0.2s ease-out",
        }}
        className="w-full max-w-4xl mx-auto px-4"
      >
        <div
          className="rounded-3xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: "#1a1a2e",
            height: "500px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* Image Side - Fixed Width */}
          <div
            className="relative flex-shrink-0"
            style={{
              width: "45%",
              backgroundColor: imageError ? card.color : "transparent",
            }}
          >
            {card.image && !imageError ? (
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: card.color }}
              >
                <div className="text-white text-8xl font-bold opacity-20">
                  {card.title.charAt(0)}
                </div>
              </div>
            )}
          </div>

          {/* Content Side - Fixed Width */}
          <div 
            className="flex flex-col justify-center"
            style={{
              width: "55%",
              padding: "3rem",
            }}
          >
            <h2
              className="mb-6"
              style={{
                color: "#ffffff",
                fontSize: "2.5rem",
                fontWeight: 300,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              {card.title}
            </h2>
            <p
              style={{
                color: "#b8b8b8",
                fontSize: "1.125rem",
                lineHeight: 1.7,
                fontWeight: 300,
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const servicesData: ServiceCard[] = [
    {
      id: 1,
      title: "Seamless Workflow Integration",
      description:
        "Effortlessly design, connect, and automate workflows across teams and systems. With our drag-and-drop builder and AI-powered recommendations, your operations run smoother without IT bottlenecks.",
      image:
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=800&fit=crop",
      color: "#0066ff",
    },
    {
      id: 2,
      title: "Data Analytics",
      description:
        "Transform your data into actionable insights with powerful analytics tools. Make data-driven decisions faster with real-time dashboards and intelligent reporting.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=800&fit=crop",
      color: "#2ecc71",
    },
    {
      id: 3,
      title: "Workflow Management",
      description:
        "Streamline your business processes with intelligent workflow automation. Reduce manual tasks and increase productivity across your organization.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=800&fit=crop",
      color: "#9b59b6",
    },
    {
      id: 4,
      title: "Integration Platform",
      description:
        "Connect all your tools and systems with seamless integrations. Build a unified ecosystem that works the way you do, without switching between apps.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop",
      color: "#e74c3c",
    },
  ];

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress based on section position
      const sectionHeight = rect.height;
      const scrollStart = rect.top;
      
      // Progress from 0 to 1 as section scrolls through viewport
      let progress = 0;
      
      if (scrollStart <= 0) {
        progress = Math.abs(scrollStart) / (sectionHeight - viewportHeight);
        progress = Math.max(0, Math.min(1, progress));
      }
      
      setScrollProgress(progress);
    };

    // Use requestAnimationFrame for smoother updates
    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation with multiple attempts
    const initScroll = () => {
      handleScroll();
    };

    // Try multiple times to ensure proper initialization
    initScroll();
    setTimeout(initScroll, 50);
    setTimeout(initScroll, 100);
    setTimeout(initScroll, 200);

    window.addEventListener("scroll", scrollHandler, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isMounted]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        backgroundColor: "#0f0f1e",
        minHeight: "400vh",
        paddingTop: "20vh",
        paddingBottom: "20vh",
      }}
    >
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Section Header */}
        <div 
          className="absolute top-20 left-0 right-0 text-center z-50"
          style={{
            opacity: isMounted ? Math.max(0, 1 - scrollProgress * 2) : 1,
          }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            All in One Place
          </h2>
          <p className="text-gray-400 text-xl font-light max-w-2xl mx-auto px-4">
            Discover how we help you build, automate, and scale your ideas
          </p>
        </div>

        {/* Stacking Cards */}
        <div className="relative w-full h-full">
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
    </section>
  );
}






