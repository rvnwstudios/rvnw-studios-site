"use client";

import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/lib/projects";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
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
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
          height={420}
          variants={item}
          sizes="(min-width: 640px) 50vw, 100vw"
        />
      ))}
    </motion.div>
  );
}
