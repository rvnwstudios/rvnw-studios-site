"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import type { Project } from "@/lib/projects";
import { CtaButton } from "./motion/CtaButton";
import { ProjectCard } from "./projects/ProjectCard";
import { SectionHeader } from "./SectionHeader";

export function WorkSection({ projects }: { projects: Project[] }) {
  // Derived from list order rather than a hardcoded 3×2 row structure. The
  // previous version indexed a fixed six non-featured projects and threw the
  // moment the roster wasn't exactly seven.
  const [featured, ...rest] = projects;

  const reducedMotion = usePrefersReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: reducedMotion ? {} : { staggerChildren: STAGGER.work },
    },
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
    <section id="work" className="bg-ink px-6 py-16 sm:px-8 sm:py-24 md:px-12 lg:px-20 lg:py-32">
      <SectionHeader eyebrow="05 — Our Work" heading="Selected Work" className="mb-10 sm:mb-20" />

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={container}>
        <ProjectCard
          project={featured}
          height={480}
          variants={item}
          sizes="100vw"
          className="mb-6"
        />

        {/* Two-up grid over however many projects remain. An odd count leaves
            the last card spanning full width instead of a hole in the grid. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {rest.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              height={320}
              variants={item}
              sizes="(min-width: 640px) 50vw, 100vw"
              className={
                rest.length % 2 === 1 && i === rest.length - 1 ? "sm:col-span-2" : undefined
              }
            />
          ))}
        </div>

        <motion.div variants={item} className="mt-12 flex justify-center sm:mt-16">
          <CtaButton
            href="/projects"
            className="btn-hero inline-block rounded-full px-9 py-4 text-center font-mono text-[15px] font-semibold tracking-[0.03em] text-ink"
          >
            See All Projects
          </CtaButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
