"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { api, Client } from "@/lib/api";

/* ─────────────────────────────────────────────
   Fallback: shown when API returns 0 clients
   (only real clients — remove when not needed)
───────────────────────────────────────────── */
const FALLBACK_CLIENTS: Client[] = [
  {
    id: 1,
    name: "Centech Global",
    website: "https://centechglobal.com",
    industry: "Technology Solutions",
    description:
      "A global technology firm delivering cutting-edge IT solutions, digital transformation strategies, and enterprise-grade services.",
    logo: null,
    logo_url:
      "https://www.google.com/s2/favicons?sz=128&domain=centechglobal.com",
    accent_color: "#0066FF",
    is_active: true,
    order: 0,
  },
];

/* ─────────────────────────────────────────────
   Single client card
───────────────────────────────────────────── */
function ClientCard({
  client,
  index,
}: {
  client: Client;
  index: number;
}) {
  const [imgError, setImgError] = useState(false);
  const logoSrc = client.logo_url || client.logo;
  const initials = client.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const bgGradient = `linear-gradient(135deg, ${client.accent_color}12 0%, ${client.accent_color}28 100%)`;

  return (
    <motion.a
      href={client.website}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="group relative block rounded-3xl overflow-hidden"
      style={{
        width: "clamp(240px, 28vw, 320px)",
        background: `linear-gradient(135deg, #0a1628 0%, #0d2035 100%)`,
        border: `1px solid ${client.accent_color}22`,
        boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
        padding: "36px 28px 28px",
        textDecoration: "none",
        cursor: "pointer",
      }}
      title={`Visit ${client.name}`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${client.accent_color}28 0%, transparent 65%)`,
        }}
      />

      {/* Top accent bar */}
      <div
        className="absolute top-0 left-8 right-8 h-[2px] rounded-b-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${client.accent_color}, transparent)`,
          opacity: 0.7,
        }}
      />

      {/* Arrow — visible on hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0">
        <svg width="18" height="18" viewBox="0 0 12 12" fill="none">
          <path
            d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
            stroke={client.accent_color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110"
          style={{
            background: `${client.accent_color}18`,
            border: `1.5px solid ${client.accent_color}45`,
          }}
        >
          {logoSrc && !imgError ? (
            <img
              src={logoSrc}
              alt={`${client.name} logo`}
              className="w-12 h-12 object-contain"
              onError={() => setImgError(true)}
            />
          ) : (
            <span
              style={{
                color: client.accent_color,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "1.3rem",
                letterSpacing: "-0.03em",
              }}
            >
              {initials}
            </span>
          )}
        </div>
      </div>

      {/* Name */}
      <h3
        className="text-white text-center text-xl font-semibold leading-tight mb-1"
        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
      >
        {client.name}
      </h3>

      {/* Industry */}
      <p
        className="text-center text-xs mb-4 tracking-wider uppercase"
        style={{
          color: `${client.accent_color}cc`,
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 500,
          letterSpacing: "0.1em",
        }}
      >
        {client.industry}
      </p>

      {/* Divider */}
      <div
        className="mx-auto mb-4"
        style={{
          width: "40px",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${client.accent_color}55, transparent)`,
        }}
      />

      {/* Description */}
      {client.description && (
        <p
          className="text-center text-sm leading-relaxed"
          style={{
            color: "rgba(180,200,220,0.72)",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 400,
          }}
        >
          {client.description}
        </p>
      )}

      {/* Visit pill */}
      <div className="flex justify-center mt-6">
        <span
          className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full transition-all duration-300"
          style={{
            background: `${client.accent_color}18`,
            color: client.accent_color,
            border: `1px solid ${client.accent_color}40`,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
          }}
        >
          Visit website
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   Main section
───────────────────────────────────────────── */
export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getClients()
      .then((data) => {
        setClients(data && data.length > 0 ? data : FALLBACK_CLIENTS);
      })
      .catch(() => {
        setClients(FALLBACK_CLIENTS);
      })
      .finally(() => setLoading(false));
  }, []);

  const displayClients = loading ? [] : clients;

  return (
    <section
      id="clients"
      className="relative bg-[#050c18] py-24 overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Decorative glows */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,102,255,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[350px] h-[250px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,193,7,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#FFC107]" />
            <span
              className="text-[#FFC107] text-xs font-medium tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our Clients
            </span>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#FFC107]" />
          </div>

          {/* Heading */}
          <h2
            className="text-white font-surgena font-semibold mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", lineHeight: 1.15 }}
          >
            Trusted by{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #0066ff, #FFC107)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Industry Leaders
            </span>
          </h2>

          <p
            className="text-gray-400 text-base max-w-[500px] mx-auto leading-relaxed"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
          >
            Businesses rely on floneo to automate workflows, reduce overhead,
            and launch powerful solutions that scale.
          </p>
        </motion.div>

        {/* Client cards */}
        {loading ? (
          /* Skeleton shimmer */
          <div className="flex flex-wrap gap-8 justify-center">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="rounded-3xl animate-pulse"
                style={{
                  width: "clamp(240px, 28vw, 320px)",
                  height: "300px",
                  background: "rgba(255,255,255,0.04)",
                }}
              />
            ))}
          </div>
        ) : (
          <div
            className={`flex flex-wrap gap-8 ${
              displayClients.length === 1 ? "justify-center" : "justify-center lg:justify-start"
            }`}
          >
            {displayClients.map((client, i) => (
              <ClientCard key={client.id} client={client} index={i} />
            ))}
          </div>
        )}

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          <div className="h-[1px] flex-1 max-w-[140px] bg-gradient-to-r from-transparent to-white/10" />
          <p
            className="text-gray-500 text-sm text-center"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Click a card to visit their website
          </p>
          <div className="h-[1px] flex-1 max-w-[140px] bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
