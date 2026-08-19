# RVNW Studios — Motion & Interaction Guide

Motion should read as engineered and precise, not playful or bouncy. Every animation here answers "why does this move," same standard as every other system decision in this rebrand — decoration that doesn't serve clarity or the tech-forward positioning doesn't ship.

## Library stack
- **Lenis** — smooth scroll, applied globally. Configure it to preserve native scroll semantics (keyboard nav, anchor links, screen readers) — smooth scroll should feel refined, not hijacked.
- **Framer Motion** — component-level entrance animations, scroll-linked reveals (`whileInView`), hover/tap micro-interactions, and scroll-progress values (`useScroll`/`useTransform`).

No GSAP. Framer Motion's scroll hooks cover everything this build needs — a third animation library on top would be an unjustified dependency for what's actually required here (see: award-grade-builder Phase 8/9, no unnecessary abstraction layers).

## Timing tokens
| Token | Duration | Use |
|---|---|---|
| Micro | 150ms | Hover states, button feedback, small UI response |
| Base | 300ms | Standard transitions, link underlines, color shifts |
| Reveal | 600ms | Section/element entrance on scroll |
| Hero | 900ms | Initial hero load sequence only |

## Easing
Standard: `cubic-bezier(0.16, 1, 0.3, 1)` — a crisp ease-out. Used for all entrances and reveals.

No spring/bounce physics on entrances or reveals — overshoot reads as playful/consumer-app, which fights the senior-operator positioning. The one exception: a very subtle spring (low stiffness) is fine on tiny press-feedback (a button scaling down 2% on click) — nowhere else.

Persistent background motion (hero scan line, swarm nodes) stays on `linear` / `ease-in-out` as already built — don't convert these to the reveal easing, they're a different category of motion (ambient, not directional).

## Per-section animation spec

**Hero** — load sequence, not scroll-triggered (it's the first thing painted). Headline reveals in staggered word or line groups (~80ms stagger), supporting copy and CTA fade+rise in after, hero grid overlay's existing scan/swarm motion runs independently underneath. Total sequence lands under ~1.2s so the page doesn't feel like it's making the visitor wait.

**Services/Disciplines** — `whileInView` fade+rise per item, staggered ~60–80ms apart as the section enters viewport. Trigger once, don't replay on scroll-back-up.

**Verticals** — same fade+rise pattern, slight scale-in (0.96 → 1) alongside the fade so it reads distinct from the Services section rather than identical motion repeated.

**Process — Map / Ship / Multiply** — scroll-linked progress: a thin line or indicator fills as the visitor scrolls through the section, tracking which phase is active. This is the one section where scroll-linked (not just scroll-triggered) motion earns its place — the process is literally about sequence, so the motion should embody that instead of just fading in like everything else.

**Our Work** — case study cards fade+rise on scroll entry, staggered. On hover: subtle lift (translateY -4px), border shifts toward hero orange, transition at Base (300ms). If there's appetite for it, a single small node — echoing the hero grid's connection dots — could pulse near the card on hover, tying the "everything we build makes a connection" idea back into the work itself. Optional, not required.

**CTA** — understated. Button gets a Micro-speed (150ms) scale (1 → 1.02) and slight color shift on hover, not a big entrance animation. This section's job is clarity and action, not spectacle.

**Footer** — no animation beyond standard link hover states. Per the section map, this stays quiet.

## Micro-interactions
- Links/nav: underline or color transition at Base speed, no layout shift.
- Buttons: Micro-speed scale + color shift on hover, slight scale-down on press.
- No custom cursor. It's one of the most overused "cutting-edge" tropes right now and adds interaction risk (accessibility, trackpad/touch behavior) for a decorative payoff that doesn't serve this brand's positioning.

## Reduced motion
Every animation here must respect `prefers-reduced-motion`. Scroll-linked effects (Process progress, hero swarm) should fall back to a static or near-static state, not just play at a faster speed — reduced motion means reduced, not sped up.

## Performance
No scroll-hijacking — Lenis should feel like smoother native scroll, never replace it with custom scroll logic that breaks browser-native behavior (back/forward cache, anchor jumps, screen reader scroll). Stagger animations instead of animating many elements simultaneously — both looks more considered and costs less on lower-end devices.
