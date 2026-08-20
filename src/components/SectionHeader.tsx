import type { ReactNode } from "react";

/**
 * Shared "01 — Services" / "What We Do" header used by every numbered
 * homepage section. The heading anchors left (natural reading start); the
 * numbered eyebrow sits right, like a page marker. DOM order stays
 * eyebrow-then-heading (so mobile's flex-col stack still reads eyebrow
 * above heading) — `sm:flex-row-reverse` + `justify-between` is what flips
 * the two to opposite edges at sm+ without reordering the markup.
 */
export function SectionHeader({
  eyebrow,
  heading,
  className = "",
}: {
  eyebrow: string;
  heading: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-col gap-3 border-b-2 border-paper pb-6 sm:flex-row-reverse sm:items-end sm:justify-between sm:gap-8 sm:pb-8 ${className}`}
    >
      <span className="font-mono text-xs tracking-[0.15em] text-grid uppercase">{eyebrow}</span>
      <h2 className="font-display text-[clamp(32px,9vw,72px)] leading-none font-semibold text-paper">
        {heading}
      </h2>
    </div>
  );
}
