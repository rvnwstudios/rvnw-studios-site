"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { DURATION, EASE_OUT, PRESS_SPRING } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Shared CTA button/link. Hover: Micro-speed (150ms) scale to 1.02.
 * Press: slight scale-down via a low-stiffness spring — the one approved
 * spring use case in the Motion Guide. No-op under reduced motion.
 */
export function CtaButton({ children, ...props }: HTMLMotionProps<"a">) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.a
      whileHover={
        reducedMotion ? undefined : { scale: 1.02, transition: { duration: DURATION.micro, ease: EASE_OUT } }
      }
      whileTap={reducedMotion ? undefined : { scale: 0.98, transition: PRESS_SPRING }}
      {...props}
    >
      {children}
    </motion.a>
  );
}
