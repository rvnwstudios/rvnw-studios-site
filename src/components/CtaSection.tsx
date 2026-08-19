import { CtaButton } from "./motion/CtaButton";

const disciplines = [
  "Strategy",
  "Creative & Design",
  "Dev/Engineering",
  "Advertising",
  "Digital Experience",
  "Growth & Retention",
];

export function CtaSection({ eyebrow = "06 — Get started" }: { eyebrow?: string }) {
  return (
    <section
      id="cta"
      className="flex flex-col bg-ink px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:min-h-screen lg:px-20 lg:py-20"
    >
      <div className="flex flex-col gap-2 border-b border-[#1c1c1c] pb-5 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:pb-7">
        <span className="font-mono text-xs tracking-[0.15em] text-grid uppercase">
          {eyebrow}
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-grid uppercase">
          No tiers. Custom scope every time.
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center">
        <h2 className="max-w-[1200px] font-display text-[32px] leading-[1.05] font-semibold text-paper sm:text-[44px] sm:leading-[1] md:text-[56px] lg:text-[72px] lg:leading-[0.97] xl:text-[92px] 2xl:text-[116px]">
          Work Scoped to What
          <br />
          You Need. Priced the
          <br />
          Same Way.
        </h2>
        <div className="mt-10 flex flex-col items-start gap-6 sm:mt-16 sm:flex-row sm:flex-wrap sm:items-center sm:gap-12">
          <CtaButton
            href="/start-a-project"
            className="btn-hero inline-block w-full rounded-full px-10 py-5 text-center font-mono text-base font-semibold tracking-[0.03em] text-ink sm:w-auto"
          >
            Start a Project
          </CtaButton>
          <p className="max-w-[380px] font-body text-lg leading-relaxed text-grid text-pretty">
            Tell us about your project. We&apos;ll scope it and price it from there.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 border-t border-[#1c1c1c] pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <span className="font-mono text-[11px] tracking-[0.12em] text-grid uppercase">
          hello@rvnwstudios.com
        </span>
        <div className="flex flex-wrap gap-4 sm:gap-8">
          {disciplines.map((d) => (
            <span
              key={d}
              className="font-mono text-[10px] tracking-[0.12em] text-grid uppercase"
            >
              {d}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
