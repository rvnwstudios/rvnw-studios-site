"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT } from "@/lib/motion";
import type { ProjectImageSource } from "@/lib/projects";

export interface LightboxImage {
  image: ProjectImageSource;
  alt: string;
}

const ICON_BUTTON =
  "flex h-11 w-11 items-center justify-center rounded-full border border-[#2a2a28] bg-ink text-paper transition-colors hover:border-hero hover:text-hero";

/**
 * Full-viewport image viewer for case study photography. Mounted only
 * while an image is open (see CaseStudyContent) — parent wraps this in
 * AnimatePresence so the fade-out exit animation runs on unmount, same
 * pattern as the mobile nav menu.
 */
export function ImageLightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const current = images[index];
  const hasMultiple = images.length > 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (hasMultiple && e.key === "ArrowRight") onNavigate((index + 1) % images.length);
      if (hasMultiple && e.key === "ArrowLeft") onNavigate((index - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [index, images.length, hasMultiple, onClose, onNavigate]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(10,10,10,0.96)] p-6 backdrop-blur-sm sm:p-10"
      initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: reducedMotion ? 0 : DURATION.base, ease: EASE_OUT }}
      onClick={onClose}
    >
      <button type="button" aria-label="Close" onClick={onClose} className={`absolute top-6 right-6 sm:top-10 sm:right-10 ${ICON_BUTTON}`}>
        <span aria-hidden="true" className="font-mono text-base">
          ✕
        </span>
      </button>

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index - 1 + images.length) % images.length);
            }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 sm:left-8 ${ICON_BUTTON}`}
          >
            <span aria-hidden="true" className="font-mono text-base">
              ←
            </span>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index + 1) % images.length);
            }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 sm:right-8 ${ICON_BUTTON}`}
          >
            <span aria-hidden="true" className="font-mono text-base">
              →
            </span>
          </button>
        </>
      )}

      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-full max-w-full flex-col items-center"
      >
        <Image
          key={current.image.url}
          src={current.image.url}
          alt={current.alt}
          width={current.image.width}
          height={current.image.height}
          sizes="90vw"
          priority
          className="max-h-[78vh] w-auto max-w-[90vw] object-contain sm:max-h-[84vh]"
        />

        {hasMultiple && (
          <span className="mt-5 font-mono text-xs tracking-[0.15em] text-grid uppercase">
            {index + 1} / {images.length}
          </span>
        )}
      </div>
    </motion.div>
  );
}
