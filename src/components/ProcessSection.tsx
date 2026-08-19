"use client";

import { useRef } from "react";
import { motion, useScroll, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { DURATION, EASE_OUT } from "@/lib/motion";

const phases = [
  {
    phase: "Phase 01",
    title: "MAP",
    copy: "Grounded, data-informed diagnosis of the business. Before we touch anything, we understand it.",
  },
  {
    phase: "Phase 02",
    title: "SHIP",
    copy: "Decisive execution across the relevant disciplines. We build what the analysis calls for. No more, no less.",
  },
  {
    phase: "Phase 03",
    title: "MULTIPLY",
    copy: "Long-term value. What shipped keeps working, and every dollar behind it works harder.",
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  // Continuous scroll-linked fill is untested on real touch-scroll behavior —
  // per Homepage Section Map.md, don't ship it on mobile. Below `xl` (where
  // the 3-column layout has room to breathe — see the grid-template note
  // below) this falls back to per-phase whileInView reveals instead.
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const scrollLinked = isDesktop && !reducedMotion;

  // Scrub across the section's entire time in the viewport (first pixel in
  // to last pixel out), not just the height of the phase list itself —
  // anchoring to the phase-list div alone maxed the fill out around the
  // second phase, well before "MULTIPLY" ever scrolled into view.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const phaseReveal: Variants = {
    hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion ? { duration: 0 } : { duration: DURATION.reveal, ease: EASE_OUT },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="process"
      className="flex flex-col bg-hero px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 xl:min-h-screen xl:px-20 xl:py-20"
    >
      <div className="flex flex-col gap-2 border-b border-[rgba(10,10,10,0.2)] pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pb-7">
        <span className="font-mono text-xs tracking-[0.15em] text-[rgba(10,10,10,0.75)] uppercase">
          03 — Process
        </span>
        <p className="font-body text-[15px] text-[rgba(10,10,10,0.8)] sm:text-[17px]">
          How the engagement works
        </p>
      </div>
      <div className="relative flex flex-1 flex-col justify-center xl:pl-8">
        <div className="absolute top-0 bottom-0 left-0 hidden w-[2px] bg-[rgba(10,10,10,0.15)] xl:block">
          {scrollLinked ? (
            <motion.div
              className="absolute inset-x-0 top-0 origin-top bg-ink"
              style={{ height: "100%", scaleY: scrollYProgress }}
            />
          ) : (
            <div className="absolute inset-0 bg-ink" />
          )}
        </div>
        {phases.map((p, i) => (
          <motion.div
            key={p.title}
            initial="hidden"
            animate={isDesktop ? "visible" : undefined}
            whileInView={isDesktop ? undefined : "visible"}
            viewport={isDesktop ? undefined : { once: true, amount: 0.4 }}
            variants={phaseReveal}
            className={`grid grid-cols-1 gap-3 py-8 sm:gap-4 xl:grid-cols-[180px_1fr_340px] xl:items-center xl:gap-12 xl:py-[52px] ${
              i < phases.length - 1 ? "border-b border-[rgba(10,10,10,0.15)]" : ""
            }`}
          >
            <span className="font-mono text-[13px] tracking-[0.15em] text-[rgba(10,10,10,0.82)] uppercase">
              {p.phase}
            </span>
            <h3 className="font-display text-[44px] leading-[0.9] font-semibold text-ink sm:text-[56px] md:text-[72px] xl:text-[80px] 2xl:text-[120px]">
              {p.title}
            </h3>
            <p className="font-body text-base leading-relaxed text-[rgba(10,10,10,0.85)] text-pretty sm:text-lg">
              {p.copy}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
