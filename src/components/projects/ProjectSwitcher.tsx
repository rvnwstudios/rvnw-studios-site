"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT } from "@/lib/motion";
import type { Project } from "@/lib/projects";

/**
 * Next/last case study nav. Deliberately built as a small pair of work
 * cards rather than a "‹ Prev / Next ›" pagination bar — it reuses the
 * exact hover mechanics (lift + border-to-hero) already established for
 * clickable project cards in WorkSection/ProjectsGrid, so a visitor who's
 * scrolled a case study recognizes it as "more work," not site chrome.
 */
function SwitchCard({
  direction,
  project,
}: {
  direction: "prev" | "next";
  project: Project;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const isNext = direction === "next";

  return (
    <motion.div
      whileHover={reducedMotion ? undefined : { y: -4, transition: { duration: DURATION.base, ease: EASE_OUT } }}
    >
      <Link href={`/projects/${project.slug}`} className="group block">
        <motion.div
          className="rounded-sm border-2 border-transparent"
          whileHover={
            reducedMotion ? undefined : { borderColor: "#FF5A1F", transition: { duration: DURATION.base } }
          }
        >
          <PhotoPlaceholder
            height={220}
            src={project.heroImage}
            alt={project.title}
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        </motion.div>
        <div className={`mt-5 flex items-center gap-2 ${isNext ? "" : "flex-row-reverse justify-end"}`}>
          <span
            aria-hidden="true"
            className={`font-mono text-xs text-grid transition-transform duration-300 ${
              isNext ? "group-hover:translate-x-1" : "-scale-x-100 group-hover:-translate-x-1"
            }`}
          >
            →
          </span>
          <span
            className={`font-mono text-[10px] tracking-[0.15em] text-grid uppercase ${isNext ? "" : "text-right"}`}
          >
            {isNext ? "Next Project" : "Previous Project"}
          </span>
        </div>
        <h3
          className={`mt-1.5 font-display text-[22px] leading-tight font-semibold text-paper transition-colors group-hover:text-hero ${
            isNext ? "" : "text-right"
          }`}
        >
          {project.title}
        </h3>
      </Link>
    </motion.div>
  );
}

export function ProjectSwitcher({ prev, next }: { prev: Project; next: Project }) {
  const reducedMotion = usePrefersReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: reducedMotion ? {} : { staggerChildren: 0.08 } },
  };

  const item: Variants = {
    hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion ? { duration: 0 } : { duration: DURATION.reveal, ease: EASE_OUT },
    },
  };

  return (
    <nav
      aria-label="More projects"
      className="mt-20 border-t-2 border-paper pt-10 sm:mt-24 sm:pt-12"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-12"
      >
        <motion.div variants={item}>
          <SwitchCard direction="prev" project={prev} />
        </motion.div>
        <motion.div variants={item}>
          <SwitchCard direction="next" project={next} />
        </motion.div>
      </motion.div>
    </nav>
  );
}
