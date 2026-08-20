import type { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <>
      <Nav />
      <main className="bg-ink px-6 pt-[104px] pb-20 sm:px-8 sm:pt-[128px] md:px-12 lg:px-20">
        <div className="mx-auto max-w-[720px]">
          <div className="mb-12 border-b border-[#1c1c1c] pb-10 sm:mb-16">
            <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
              {eyebrow}
            </span>
            <h1 className="mb-4 font-display text-[clamp(28px,5vw,44px)] leading-[1.05] font-semibold text-paper">
              {title}
            </h1>
            <p className="font-mono text-xs tracking-[0.1em] text-grid uppercase">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="legal-content flex flex-col gap-10">{children}</div>
        </div>
      </main>
      <Footer showAvailableBadge={false} />
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-xl font-semibold text-paper sm:text-2xl">{heading}</h2>
      <div className="flex flex-col gap-4 font-body text-[15px] leading-relaxed text-grid">
        {children}
      </div>
    </section>
  );
}
