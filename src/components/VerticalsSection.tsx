"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";

const verticals = [
  { index: "01", title: "DTC", meta: "Cannabis / CBD / Health & Wellness" },
  { index: "02", title: "E-commerce", meta: "Direct-to-consumer brands" },
  { index: "03", title: "Startups", meta: "SaaS / Fintech / Tech" },
  {
    index: "04",
    title: "Restaurants & Hospitality",
    meta: "Restaurants / Bars / Hospitality groups",
  },
  { index: "05", title: "Sports & Fitness", meta: "Training / Performance / Sports brands" },
  {
    index: "06",
    title: "Service Businesses",
    meta: "Contractors / Trades / Professional services",
  },
];

export function VerticalsSection() {
  const reducedMotion = usePrefersReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: reducedMotion ? {} : { staggerChildren: STAGGER.verticals },
    },
  };

  // Fade+rise with a scale-in, distinct from the Services section's plain fade+rise.
  const row: Variants = {
    hidden: reducedMotion ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: reducedMotion ? { duration: 0 } : { duration: DURATION.reveal, ease: EASE_OUT },
    },
  };

  return (
    <section className="bg-ink px-6 py-16 sm:px-8 sm:py-24 md:px-12 lg:px-20 lg:py-32">
      <div className="flex flex-col gap-3 border-b-2 border-paper pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-0 sm:pb-8">
        <span className="font-mono text-xs tracking-[0.15em] text-grid uppercase">
          02 — Verticals
        </span>
        <h2 className="font-display text-[clamp(32px,9vw,72px)] leading-none font-semibold text-paper">
          Who We Work With
        </h2>
      </div>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={container}>
        {verticals.map((v) => (
          <motion.div
            key={v.title}
            variants={row}
            className="vertical-row grid grid-cols-1 gap-1 border-b border-[#1c1c1c] py-6 md:grid-cols-[80px_1fr_auto] md:items-center md:gap-10 md:py-9"
          >
            <span className="v-index font-mono text-xs tracking-[0.15em] text-grid uppercase">
              {v.index}
            </span>
            <h3 className="font-display text-[clamp(28px,8vw,52px)] leading-[1.1] font-semibold text-paper">
              {v.title}
            </h3>
            <span className="v-meta font-mono text-[11px] tracking-[0.1em] text-grid uppercase">
              {v.meta}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
