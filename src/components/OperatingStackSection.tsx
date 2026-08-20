"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import { SectionHeader } from "./SectionHeader";

const groups = [
  {
    category: "Commerce",
    tools: [
      { name: "Shopify", description: "Commerce platform" },
      { name: "TikTok Shop", description: "Social commerce" },
    ],
  },
  {
    category: "Marketing",
    tools: [
      { name: "Klaviyo", description: "Email & SMS lifecycle" },
      { name: "Postscript", description: "SMS marketing" },
      { name: "Meta", description: "Paid social" },
      { name: "Google", description: "Search & paid media" },
    ],
  },
  {
    category: "AI & Creative",
    tools: [
      { name: "OpenAI", description: "Model provider" },
      { name: "Anthropic", description: "Model provider" },
      { name: "Nano Banana 2", description: "Creative generation" },
    ],
  },
  {
    category: "Operations",
    tools: [
      { name: "Redo", description: "Returns & exchanges" },
      { name: "Cusrich.AI", description: "Customer intelligence" },
      { name: "Overflo", description: "Inventory & ops" },
    ],
  },
];

export function OperatingStackSection() {
  const reducedMotion = usePrefersReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: reducedMotion ? {} : { staggerChildren: STAGGER.verticals },
    },
  };

  const row: Variants = {
    hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion ? { duration: 0 } : { duration: DURATION.reveal, ease: EASE_OUT },
    },
  };

  return (
    <section className="bg-ink px-6 py-16 sm:px-8 sm:py-24 md:px-12 lg:px-20 lg:py-32">
      <SectionHeader eyebrow="04 — Operating Stack" heading="How We Run It" className="mb-10 sm:mb-16" />

      <p className="mb-14 max-w-[620px] font-body text-lg leading-relaxed text-grid text-pretty sm:mb-20">
        Every engagement runs on the same core stack — connected across commerce, marketing, and
        support, so nothing lives in a spreadsheet somewhere.
      </p>

      <div className="grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2">
        {groups.map((g) => (
          <div key={g.category}>
            <span className="mb-5 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
              {g.category}
            </span>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={container}
            >
              {g.tools.map((tool) => (
                <motion.div
                  key={tool.name}
                  variants={row}
                  className="group relative flex items-center justify-between gap-4 overflow-hidden border-b border-[#1c1c1c] py-4 pl-4 transition-colors hover:border-[#3a3a2f]"
                >
                  <span
                    className="absolute inset-y-0 left-0 w-[2px] scale-y-0 bg-hero transition-transform duration-300 ease-out group-hover:scale-y-100"
                    aria-hidden="true"
                  />
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-base font-semibold text-paper">
                      {tool.name}
                    </span>
                    <span className="font-body text-sm text-grid">{tool.description}</span>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#2a2a28] px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-grid uppercase transition-colors group-hover:border-[#2ecc71]/40 group-hover:text-paper">
                    <span className="status-dot" />
                    Active
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
