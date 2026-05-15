"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

/* ─────────────────────────────────────────────
   Data extracted 1-to-1 from the supplied image
   ───────────────────────────────────────────── */
const rows = [
  {
    id: 1,
    feature: "UI Builder Canvas",
    traditional:
      "Complex, sometimes rigid interface that limits design flexibility",
    floneo: "Simple, smooth UI builder elements & canvas for effortless design",
  },
  {
    id: 2,
    feature: "Backend Functions",
    traditional:
      "Requires coding beyond low-code and creates developer dependency",
    floneo:
      "100% Visual Drag & Drop · 24,000+ combinations of backend functions",
  },
  {
    id: 3,
    feature: "DB Management",
    traditional: "95% of platforms require SQL skills to manage databases",
    floneo: "Zero SQL skills needed · Fully visual DB management interface",
  },
  {
    id: 4,
    feature: "Learning Curve",
    traditional: "98% steep learning curve — not citizen-developer friendly",
    floneo:
      "Minimal learning curve · 100% citizen developer-focused platform",
  },
  {
    id: 5,
    feature: "Vendor Lock-in (Apps)",
    traditional: "CEOs worry about exit compliance and app ownership",
    floneo:
      "Zero vendor lock-in · Customer owns all apps · Freedom to exit & move on",
  },
  {
    id: 6,
    feature: "App & Code Portability",
    traditional: "99% of platforms offer no app or code portability",
    floneo:
      "Customer-built apps come with full code portability facility",
  },
  {
    id: 7,
    feature: "License Lock-in",
    traditional:
      "Locked-in on users, screens, API integrators & app complexity — complex licensing models",
    floneo:
      "Simple flat licensing · No user, app, or API integrator bounds · 100% business growth freedom",
  },
  {
    id: 8,
    feature: "Multilingual Support",
    traditional: "Not available",
    floneo: "Supports English, French, German, Spanish & Arabic",
  },
  {
    id: 9,
    feature: "Infrastructure",
    traditional: "Limited infrastructure flexibility",
    floneo: "On-Premise, Private Cloud & Floneo Cloud — your choice",
  },
];

/* ── Icons ── */
const XIcon = () => (
  <svg
    className="w-5 h-5 text-red-500 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-emerald-500 flex-shrink-0"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

/* ────────────────────────────────────────────────────────── */
export default function ComparisonTableSection() {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      id="comparison"
      ref={sectionRef}
      aria-label="Floneo vs Traditional LCNC Platforms Comparison"
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ fontFamily: "'Poppins', system-ui, sans-serif" }}
    >
      {/* ── Subtle background layer ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #f8faff 0%, #ffffff 50%, #f0f7ff 100%)",
        }}
      />

      {/* Decorative blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl -z-10"
        style={{ background: "radial-gradient(circle, #0066ff 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 blur-3xl -z-10"
        style={{ background: "radial-gradient(circle, #2fcc71 0%, transparent 70%)" }}
      />

      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ── */}
        <motion.div {...fadeUp(0)} className="text-center mb-4">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
            style={{
              background: "rgba(0,102,255,0.08)",
              color: "#0066ff",
              border: "1px solid rgba(0,102,255,0.18)",
            }}
          >
            Platform Comparison
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.06)}
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 leading-tight mb-4"
        >
          Why Choose{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #0066ff 0%, #2fcc71 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Floneo
          </span>{" "}
          Over Other LCNC Platforms?
        </motion.h2>

        <motion.p
          {...fadeUp(0.12)}
          className="text-center text-gray-500 text-base sm:text-lg max-w-2xl mx-auto mb-14"
        >
          A side-by-side look at how Floneo outperforms traditional low-code /
          no-code platforms across every critical dimension.
        </motion.p>

        {/* ══════════════════════════════════════════
            DESKTOP TABLE  (md and above)
        ══════════════════════════════════════════ */}
        <motion.div
          {...fadeUp(0.18)}
          className="hidden md:block overflow-hidden rounded-3xl shadow-2xl"
          style={{ border: "1px solid rgba(0,0,0,0.07)" }}
        >
          <table className="w-full border-collapse" role="table">
            {/* ── Table Head ── */}
            <thead>
              <tr>
                {/* # */}
                <th
                  scope="col"
                  className="w-14 text-center py-5 px-4 text-sm font-semibold text-gray-500 bg-gray-50"
                  style={{ borderBottom: "2px solid rgba(0,0,0,0.06)" }}
                >
                  #
                </th>

                {/* Feature */}
                <th
                  scope="col"
                  className="py-5 px-6 text-left text-sm font-semibold text-gray-700 bg-gray-50"
                  style={{ borderBottom: "2px solid rgba(0,0,0,0.06)" }}
                >
                  Feature
                </th>

                {/* Traditional LCNC */}
                <th
                  scope="col"
                  className="py-5 px-6 text-left text-sm font-semibold text-gray-500 bg-gray-50"
                  style={{ borderBottom: "2px solid rgba(0,0,0,0.06)" }}
                >
                  Traditional LCNC
                </th>

                {/* Floneo LCNC — highlighted */}
                <th
                  scope="col"
                  className="py-5 px-6 text-left text-sm font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #0a0e27 0%, #1a2255 100%)",
                    borderBottom: "2px solid rgba(255,255,255,0.12)",
                    minWidth: "280px",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span>Floneo LCNC</span>
                    <span
                      className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: "#ffc107",
                        color: "#0a0e27",
                      }}
                    >
                      Best Choice
                    </span>
                  </div>
                </th>
              </tr>
            </thead>

            {/* ── Table Body ── */}
            <tbody>
              {rows.map((row, idx) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.22 + idx * 0.05, duration: 0.4 }}
                  className="group transition-colors duration-200"
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,0.05)",
                  }}
                >
                  {/* # */}
                  <td
                    className="text-center py-4 px-4 text-sm font-semibold text-gray-400 bg-white group-hover:bg-blue-50/40 transition-colors"
                  >
                    {row.id}
                  </td>

                  {/* Feature name */}
                  <td
                    className="py-4 px-6 bg-white group-hover:bg-blue-50/40 transition-colors"
                    style={{ borderRight: "1px solid rgba(0,0,0,0.05)" }}
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      {row.feature}
                    </span>
                  </td>

                  {/* Traditional */}
                  <td
                    className="py-4 px-6 bg-white group-hover:bg-blue-50/40 transition-colors"
                    style={{ borderRight: "1px solid rgba(0,0,0,0.05)" }}
                  >
                    <div className="flex items-start gap-3">
                      <XIcon />
                      <span className="text-sm text-gray-500 leading-relaxed">
                        {row.traditional}
                      </span>
                    </div>
                  </td>

                  {/* Floneo */}
                  <td
                    className="py-4 px-6 transition-colors duration-200"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(10,14,39,0.97) 0%, rgba(26,34,85,0.97) 100%)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="text-sm text-emerald-100 leading-relaxed">
                        {row.floneo}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* ══════════════════════════════════════════
            MOBILE CARDS  (below md)
        ══════════════════════════════════════════ */}
        <div className="md:hidden space-y-5">
          {rows.map((row, idx) => (
            <motion.article
              key={row.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.12 + idx * 0.06, duration: 0.45 }}
              className="rounded-2xl overflow-hidden shadow-md"
              style={{ border: "1px solid rgba(0,0,0,0.07)" }}
              aria-label={`Comparison: ${row.feature}`}
            >
              {/* Card header: feature name */}
              <div
                className="px-5 py-3"
                style={{
                  background: "linear-gradient(135deg, #0a0e27 0%, #1a2255 100%)",
                }}
              >
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-widest">
                  {String(row.id).padStart(2, "0")}
                </span>
                <h3 className="text-white font-semibold text-base mt-0.5">
                  {row.feature}
                </h3>
              </div>

              {/* Traditional row */}
              <div
                className="px-5 py-4 bg-white"
                style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Traditional LCNC
                </p>
                <div className="flex items-start gap-2.5">
                  <XIcon />
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {row.traditional}
                  </p>
                </div>
              </div>

              {/* Floneo row */}
              <div
                className="px-5 py-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(10,14,39,0.95) 0%, rgba(26,34,85,0.95) 100%)",
                }}
              >
                <p className="text-xs font-semibold text-blue-300 uppercase tracking-wide mb-2 flex items-center gap-2">
                  Floneo LCNC
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "#ffc107", color: "#0a0e27" }}
                  >
                    Best Choice
                  </span>
                </p>
                <div className="flex items-start gap-2.5">
                  <CheckIcon />
                  <p className="text-sm text-emerald-100 leading-relaxed">
                    {row.floneo}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          {...fadeUp(0.3)}
          className="mt-16 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-gray-500 text-sm max-w-md">
            Ready to leave complexity behind? Join teams already building faster
            with Floneo.
          </p>
          <button
            id="comparison-cta-btn"
            aria-label="Start Building with Floneo"
            onClick={() => router.push("/contact")}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-400"
            style={{
              background: "linear-gradient(135deg, #0066ff 0%, #0052cc 100%)",
              boxShadow: "0 8px 28px rgba(0,102,255,0.35)",
            }}
          >
            {/* Hover shimmer */}
            <span
              aria-hidden="true"
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
              style={{
                background:
                  "linear-gradient(135deg, #2fcc71 0%, #27ae60 100%)",
              }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Start Building with Floneo
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
