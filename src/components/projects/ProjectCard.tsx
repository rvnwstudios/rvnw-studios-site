"use client";

import { useRef, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT } from "@/lib/motion";
import { PhotoPlaceholder } from "../PhotoPlaceholder";
import type { Project } from "@/lib/projects";

/** Frosted-glass pill treatment shared by the tag label and the hover CTA. */
const glassPill =
  "rounded-full border border-paper/15 bg-ink/40 text-paper backdrop-blur-lg";

/** Softer/slower than PRESS_SPRING (reserved for press feedback) — this one
 * needs to visibly lag behind the cursor, not snap to it. */
const TRAILER_SPRING = { stiffness: 200, damping: 24, mass: 0.5 };

export function ProjectCard({
  project,
  height,
  sizes = "100vw",
  priority = false,
  variants,
  className,
}: {
  project: Project;
  height: number;
  sizes?: string;
  priority?: boolean;
  variants?: Variants;
  className?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const trailerX = useSpring(mouseX, TRAILER_SPRING);
  const trailerY = useSpring(mouseY, TRAILER_SPRING);
  const rectRef = useRef<DOMRect | null>(null);

  function trackCursor(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (reducedMotion) return;
    // Cached on enter rather than re-measured on every move — getBoundingClientRect
    // forces a layout read, and this handler fires on every pixel of travel.
    const rect = rectRef.current ?? e.currentTarget.getBoundingClientRect();
    rectRef.current = rect;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  return (
    <motion.div
      variants={variants}
      className={className}
      whileHover={
        reducedMotion ? undefined : { y: -4, transition: { duration: DURATION.base, ease: EASE_OUT } }
      }
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative block overflow-hidden rounded-sm"
        onMouseEnter={(e) => {
          rectRef.current = e.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={trackCursor}
        onMouseLeave={() => {
          rectRef.current = null;
        }}
      >
        <PhotoPlaceholder
          height={height}
          src={project.heroImage.url}
          blurDataURL={project.heroImage.lqip}
          alt={project.title}
          sizes={sizes}
          priority={priority}
        />

        {/* Corner-localized darken so the tag pill and title stay legible
            over any photo — a full-image scrim would mute the work itself,
            which is the opposite of the point of a photo-first card. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 55% at 100% 0%, rgba(0,0,0,0.5), transparent 60%), radial-gradient(ellipse 70% 60% at 0% 100%, rgba(0,0,0,0.55), transparent 60%)",
          }}
        />

        <span
          className={`absolute top-4 right-4 max-w-[70%] truncate px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] uppercase ${glassPill}`}
        >
          {project.disciplines.join(" · ")}
        </span>

        <h3 className="absolute bottom-4 left-4 max-w-[75%] font-display text-[20px] leading-tight font-semibold text-paper sm:text-[22px]">
          {project.title}
        </h3>

        {/* Hover CTA's fade/scale is CSS-driven (group-hover), not JS
            touch-detected: on touch devices a tap fires :hover before the
            click (Safari/Chrome mobile both do this), so it still appears
            rather than silently never showing — and either way the whole
            card is the tap target, so navigation never depends on this
            label having appeared first. Position is the one part that IS
            JS-driven (it has to be, to follow the cursor) and is skipped
            under reduced motion in favor of a plain centered pill. */}
        {reducedMotion ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
          >
            <span className={`px-6 py-3 font-mono text-[12px] tracking-[0.12em] uppercase ${glassPill}`}>
              View Project
            </span>
          </span>
        ) : (
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0"
            style={{ x: trailerX, y: trailerY }}
          >
            <span
              className={`block -translate-x-1/2 -translate-y-1/2 scale-90 px-6 py-3 font-mono text-[12px] tracking-[0.12em] whitespace-nowrap uppercase opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 ${glassPill}`}
            >
              View Project
            </span>
          </motion.span>
        )}
      </Link>
    </motion.div>
  );
}
