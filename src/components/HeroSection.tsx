"use client";

import { motion, type Variants } from "framer-motion";
import { RMark } from "./RMark";
import { HeroGrid } from "./HeroGrid";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";

const disciplines = [
  "Strategy",
  "Creative & Design",
  "Dev/Engineering",
  "Advertising",
  "Digital Experience",
  "Growth & Retention",
];

const HEADLINE_LINES = [
  ["Built", "to", "Move."],
  ["Priced", "to", "Match."],
];

export function HeroSection() {
  const reducedMotion = usePrefersReducedMotion();

  // Load sequence, not scroll-triggered — this is the first thing painted.
  const lineContainer: Variants = {
    hidden: {},
    visible: {
      transition: reducedMotion ? {} : { staggerChildren: STAGGER.heroWords },
    },
  };

  const word: Variants = {
    hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion ? { duration: 0 } : { duration: DURATION.hero, ease: EASE_OUT },
    },
  };

  const supporting: Variants = {
    hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion
        ? { duration: 0 }
        : { duration: DURATION.reveal, ease: EASE_OUT, delay: 0.45 },
    },
  };

  return (
    <section className="relative flex min-h-[calc(100vh-64px)] flex-col overflow-hidden bg-ink px-6 pb-10 sm:px-8 sm:pb-16 md:min-h-[calc(100vh-68px)] md:px-12 lg:px-20 lg:pb-20">
      <HeroGrid />

      <div
        className="pointer-events-none absolute -right-[60px] -bottom-[90px] z-0 h-[320px] w-[320px] select-none opacity-[0.22] sm:-right-[80px] sm:-bottom-[120px] sm:h-[440px] sm:w-[440px] lg:-right-[100px] lg:-bottom-[140px] lg:h-[640px] lg:w-[640px]"
        aria-hidden="true"
      >
        <RMark color="#F7F5F0" className="h-full w-full" />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, #0A0A0A 28%, rgba(10,10,10,0.85) 48%, rgba(10,10,10,0.3) 70%, transparent 90%)",
        }}
      />

      <div className="relative z-[2] flex items-center justify-between gap-4 border-b border-[#1c1c1c] pt-[76px] pb-5 sm:pt-[92px] sm:pb-6">
        <span className="font-mono text-[10px] tracking-[0.15em] text-grid uppercase sm:text-[11px] sm:tracking-[0.2em]">
          Digital Studio
        </span>
        <span className="hidden font-mono text-[11px] tracking-[0.2em] text-grid uppercase sm:block">
          Brand & Product
        </span>
        <span className="hidden font-mono text-[11px] tracking-[0.2em] text-grid uppercase md:block">
          Built By Hand
        </span>
        <span className="font-mono text-[10px] tracking-[0.15em] text-grid uppercase sm:text-[11px] sm:tracking-[0.2em]">
          rvnwstudios.com
        </span>
      </div>

      <div className="relative z-[2] flex flex-1 flex-col justify-center py-10 sm:py-16">
        <div className="mb-5 flex items-center gap-3 sm:mb-7">
          <span className="font-mono text-[11px] tracking-[0.25em] text-grid uppercase">
            RVNW Studios
          </span>
          <span className="h-px w-12 bg-[#2a2a28] sm:w-16" aria-hidden="true" />
        </div>
        <motion.h1
          className="max-w-[900px] font-display text-[clamp(48px,12vw,116px)] leading-[0.95] font-semibold text-paper sm:leading-[0.93]"
          initial="hidden"
          animate="visible"
          variants={lineContainer}
        >
          {HEADLINE_LINES.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.map((w, wi) => (
                <span key={wi} className="mr-[0.28em] inline-block overflow-hidden">
                  <motion.span className="inline-block" variants={word}>
                    {w}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </motion.h1>
        <motion.div
          className="mt-8 flex max-w-[500px] flex-col items-start gap-5 sm:mt-10"
          initial="hidden"
          animate="visible"
          variants={supporting}
        >
          <p className="font-body text-lg leading-relaxed text-grid text-pretty sm:text-xl">
            No tiers, no templates. We scope the work in front of us and price it the same way.
          </p>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#2a2a28] px-5 py-2.5">
            <span className="available-dot" />
            <span className="font-mono text-[11px] tracking-[0.12em] text-grid uppercase">
              Available for Select Projects
            </span>
          </div>
        </motion.div>
      </div>

      <div className="relative z-[2] flex flex-wrap items-center justify-between gap-4 border-t border-[#1c1c1c] pt-6">
        <span className="font-mono text-[10px] tracking-[0.15em] text-grid uppercase">↓</span>
        <div className="flex flex-wrap gap-6 sm:gap-10">
          {disciplines.map((d) => (
            <span
              key={d}
              className="font-mono text-[10px] tracking-[0.12em] text-grid uppercase"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
