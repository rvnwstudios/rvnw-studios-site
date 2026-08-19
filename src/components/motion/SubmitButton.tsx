"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { DURATION, EASE_OUT, PRESS_SPRING } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Same hover/press micro-interaction as CtaButton, for a real <button> element. */
export function SubmitButton({ children, ...props }: HTMLMotionProps<"button">) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.button
      whileHover={
        reducedMotion || props.disabled
          ? undefined
          : { scale: 1.02, transition: { duration: DURATION.micro, ease: EASE_OUT } }
      }
      whileTap={reducedMotion || props.disabled ? undefined : { scale: 0.98, transition: PRESS_SPRING }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
