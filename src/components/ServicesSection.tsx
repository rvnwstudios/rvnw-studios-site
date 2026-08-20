"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import { SectionHeader } from "./SectionHeader";

const services = [
  {
    index: "01",
    title: "Strategy",
    copy: "Business strategy and brand positioning built from how the market actually moves.",
  },
  {
    index: "02",
    title: "Creative & Design",
    copy: "Visual identity, UI/UX, and production design. From concept to shipped.",
  },
  {
    index: "03",
    title: "Dev/Engineering",
    copy: "Full-stack engineering. From design system to deployed product.",
  },
  {
    index: "04",
    title: "Advertising",
    copy: "Paid media strategy, creative production, and performance analysis across channels.",
  },
  {
    index: "05",
    title: "Digital Experience",
    copy: "Web experiences, apps, and interactive builds that hold attention.",
  },
  {
    index: "06",
    title: "Growth & Retention",
    copy: "Email, lifecycle, and CRM programs that earn more from every customer you've already won.",
  },
];

const CYCLE_INTERVAL_MS = 1800;

export function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cyclingRef = useRef(true);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const interval = setInterval(() => {
      if (cyclingRef.current) {
        setActiveIndex((i) => (i + 1) % services.length);
      }
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const container: Variants = {
    hidden: {},
    visible: {
      transition: reducedMotion ? {} : { staggerChildren: STAGGER.services },
    },
  };

  const card: Variants = {
    hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion ? { duration: 0 } : { duration: DURATION.reveal, ease: EASE_OUT },
    },
  };

  return (
    <section id="services" className="bg-ink px-6 py-16 sm:px-8 sm:py-24 md:px-12 lg:px-20 lg:py-32">
      <SectionHeader eyebrow="01 — Services" heading="What We Do" className="mb-10 sm:mb-20" />
      <motion.div
        className="grid grid-cols-1 border-t border-l border-[#1c1c1c] sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            variants={card}
            className={`service-card border-r border-b border-[#1c1c1c] p-8 sm:p-10 lg:p-12 ${
              i === activeIndex ? "sc-active" : ""
            }`}
            onMouseEnter={() => {
              cyclingRef.current = false;
              setActiveIndex(i);
            }}
            onMouseLeave={() => {
              cyclingRef.current = true;
              setActiveIndex((i + 1) % services.length);
            }}
          >
            <span className="sc-index mb-7 block font-mono text-[11px] tracking-[0.15em] text-grid uppercase">
              {s.index}
            </span>
            <h3 className="mb-4 font-display text-[28px] leading-tight font-semibold text-paper">
              {s.title}
            </h3>
            <p className="font-body text-base leading-relaxed text-grid text-pretty">
              {s.copy}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
