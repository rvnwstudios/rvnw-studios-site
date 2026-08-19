/**
 * Motion tokens — see "Motion Interaction Guide.md" for the spec these implement.
 * Durations are seconds (Framer Motion's unit); EASE_OUT is the one approved
 * easing curve for entrances/reveals. Ambient/persistent motion is exempt and
 * uses linear/ease-in-out instead — do not route it through these tokens.
 */

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  micro: 0.15,
  base: 0.3,
  reveal: 0.6,
  hero: 0.9,
} as const;

/** Low-stiffness spring reserved for tiny press-feedback only (e.g. button tap scale). */
export const PRESS_SPRING = { type: "spring" as const, stiffness: 300, damping: 20 };

export const STAGGER = {
  services: 0.07,
  verticals: 0.07,
  work: 0.08,
  heroWords: 0.08,
} as const;
