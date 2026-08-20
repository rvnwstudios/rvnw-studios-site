"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ProjectImage } from "./ProjectImage";
import { ImageLightbox, type LightboxImage } from "./ImageLightbox";
import { CtaButton } from "../motion/CtaButton";
import { CategoryPills } from "./CategoryPills";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT, STAGGER } from "@/lib/motion";
import type { Project, ProjectImageSource } from "@/lib/projects";

/**
 * Wraps a ProjectImage in a click target that opens the lightbox, with a
 * small expand glyph that appears on hover as the affordance — nothing
 * about a plain image otherwise signals it's enlargeable.
 */
function ClickableImage({
  image,
  alt,
  sizes,
  priority,
  onClick,
}: {
  image: ProjectImageSource;
  alt: string;
  sizes?: string;
  priority?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`View larger: ${alt}`}
      className="group relative block w-full cursor-zoom-in text-left"
    >
      <ProjectImage image={image} alt={alt} sizes={sizes} priority={priority} />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#2a2a28] bg-[rgba(10,10,10,0.7)] text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <span className="font-mono text-sm">⤢</span>
      </span>
    </button>
  );
}

/** Mono label over its value — the spec-sheet treatment used for meta. */
function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <span className="mb-2 block font-mono text-[10px] tracking-[0.15em] text-grid uppercase">
        {label}
      </span>
      {/* div, not span: children may be block-level (CategoryPills renders a
          flex container), and a div inside a span is invalid nesting. */}
      <div className="font-body text-[15px] leading-snug text-paper">{children}</div>
    </div>
  );
}

export function CaseStudyContent({ project }: { project: Project }) {
  const reducedMotion = usePrefersReducedMotion();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flat list in reading order — hero, solution, then gallery — so the
  // lightbox's prev/next can walk every case-study image as one sequence
  // instead of being scoped to whichever grid the click came from.
  const images: LightboxImage[] = [
    { image: project.heroImage, alt: project.title },
    { image: project.solutionImage, alt: `${project.title} — solution` },
    ...project.additionalImages.map((image, i) => ({
      image,
      alt: `${project.title} — image ${i + 1} of ${project.additionalImages.length}`,
    })),
  ];

  // Hero is a load sequence, not scroll-triggered — it's the first paint.
  const heroFade: Variants = {
    hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion ? { duration: 0 } : { duration: DURATION.reveal, ease: EASE_OUT },
    },
  };

  const reveal: Variants = {
    hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reducedMotion ? { duration: 0 } : { duration: DURATION.reveal, ease: EASE_OUT },
    },
  };

  const galleryContainer: Variants = {
    hidden: {},
    visible: { transition: reducedMotion ? {} : { staggerChildren: STAGGER.work } },
  };

  // `amount: "some"` rather than a fraction: gallery images render at their
  // natural aspect ratio, so a tall one can exceed the viewport and would
  // never satisfy a 0.3 threshold — it'd sit at opacity 0 forever.
  const viewportOnce = { once: true, amount: "some" } as const;

  return (
    <article>
      {/* ---- Hero: meta → headline → description ---- */}
      <motion.header initial="hidden" animate="visible" variants={heroFade}>
        <Link
          href="/projects"
          className="mb-10 inline-block font-mono text-xs tracking-[0.12em] text-grid uppercase transition-colors hover:text-paper"
        >
          ← All Projects
        </Link>

        <div className="flex flex-col gap-6 border-y border-[#1c1c1c] py-6 sm:flex-row sm:items-end sm:justify-between sm:gap-10">
          <div className="flex flex-wrap gap-x-14 gap-y-6">
            <MetaItem label={project.disciplines.length > 1 ? "Disciplines" : "Discipline"}>
              <CategoryPills disciplines={project.disciplines} />
            </MetaItem>
            {/* Branding-only engagements have no location on record. */}
            {project.metaLocation && <MetaItem label="Location">{project.metaLocation}</MetaItem>}
          </div>

          {/* Rendered only when a live site exists — no dead link, no
              disabled-looking placeholder for branding-only work. */}
          {project.siteUrl && (
            <CtaButton
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[#2a2a28] px-6 py-3 font-mono text-[11px] tracking-[0.12em] text-paper uppercase transition-colors hover:border-hero hover:text-hero sm:self-auto"
            >
              Visit Site
              <span aria-hidden="true">↗</span>
            </CtaButton>
          )}
        </div>

        <h1 className="mt-12 max-w-[1000px] font-display text-[clamp(34px,6vw,68px)] leading-[1.03] font-semibold text-paper sm:mt-16">
          {project.heroHeadline}
        </h1>

        <p className="mt-8 max-w-[760px] font-body text-lg leading-relaxed text-grid text-pretty sm:text-xl">
          {project.heroDescription}
        </p>
      </motion.header>

      {/* ---- Hero image ---- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={reveal}
        className="mt-14 sm:mt-20"
      >
        <ClickableImage
          image={project.heroImage}
          alt={project.title}
          priority
          onClick={() => setLightboxIndex(0)}
        />
      </motion.div>

      {/* ---- Solution ---- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={reveal}
        className="mt-16 sm:mt-24"
      >
        <span className="mb-6 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
          01 — Solution
        </span>
        <h2 className="max-w-[900px] font-display text-[clamp(26px,4vw,44px)] leading-[1.1] font-semibold text-paper">
          {project.solutionHeadline}
        </h2>
        <p className="mt-6 max-w-[760px] font-body text-lg leading-relaxed text-grid text-pretty">
          {project.solutionDescription}
        </p>
      </motion.section>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={reveal}
        className="mt-12 sm:mt-16"
      >
        <ClickableImage
          image={project.solutionImage}
          alt={`${project.title} — solution`}
          onClick={() => setLightboxIndex(1)}
        />
      </motion.div>

      {/* ---- Result ---- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={reveal}
        className="mt-16 sm:mt-24"
      >
        <span className="mb-6 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
          02 — Result
        </span>
        <h2 className="max-w-[900px] font-display text-[clamp(26px,4vw,44px)] leading-[1.1] font-semibold text-paper">
          {project.resultHeadline}
        </h2>
        <p className="mt-6 max-w-[760px] font-body text-lg leading-relaxed text-grid text-pretty">
          {project.resultDescription}
        </p>
      </motion.section>

      {/* ---- Remaining images: 0..N, so the whole block drops out at zero
              rather than leaving an empty labelled section behind. ---- */}
      {project.additionalImages.length > 0 && (
        <section className="mt-16 sm:mt-24">
          <span className="mb-6 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
            03 — Gallery
          </span>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={galleryContainer}
            className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2"
          >
            {project.additionalImages.map((image, i) => (
              <motion.div key={image.key} variants={reveal}>
                <ClickableImage
                  image={image}
                  alt={`${project.title} — image ${i + 1} of ${project.additionalImages.length}`}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  onClick={() => setLightboxIndex(2 + i)}
                />
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      <AnimatePresence>
        {lightboxIndex !== null && (
          <ImageLightbox
            images={images}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </article>
  );
}
