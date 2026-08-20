"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import { CategoryPills } from "./CategoryPills";
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
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <motion.div key={project.slug} variants={item}>
          <Link href={`/projects/${project.slug}`} className="block">
            <motion.div
              className="rounded-sm border-2 border-transparent"
              whileHover={
                reducedMotion
                  ? undefined
                  : { borderColor: "#FF5A1F", transition: { duration: DURATION.base } }
              }
            >
              <PhotoPlaceholder
                height={280}
                src={project.heroImage.url}
                blurDataURL={project.heroImage.lqip}
                alt={project.title}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </motion.div>
            <div className="mt-5">
              <h3 className="font-display text-[20px] leading-tight font-semibold text-paper">
                {project.title}
              </h3>
              <div className="mt-2.5">
                <CategoryPills disciplines={project.disciplines} />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
