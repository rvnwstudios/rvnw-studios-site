import Link from "next/link";
import { RMark } from "./RMark";

const workLinks = ["Thread House Ink", "Cooper Concrete", "Energy Exchange", "Hitters Quarters"];
const serviceLinks = [
  { label: "Strategy", href: "#services" },
  { label: "Creative & Design", href: "#services" },
  { label: "Dev/Engineering", href: "#services" },
  { label: "Advertising", href: "#services" },
  { label: "Digital Experience", href: "#services" },
  { label: "Growth & Retention", href: "#services" },
];

export function Footer({ showAvailableBadge = true }: { showAvailableBadge?: boolean }) {
  return (
    <footer className="border-t border-[#1c1c1c] bg-ink px-6 pt-16 pb-10 sm:px-8 md:px-12 md:pt-20 lg:px-20">
      <div className="mb-12 grid grid-cols-1 items-start gap-10 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:gap-20 md:mb-20">
        <div>
          <Link href="/" className="mb-5 flex items-center gap-3">
            <RMark size={24} />
            <span className="font-display text-[11px] font-semibold tracking-[0.18em] text-paper uppercase">
              RVNW Studios
            </span>
          </Link>
          <p className="max-w-[260px] font-body text-[15px] leading-relaxed text-grid">
            AI-native operations. Human-led execution.
          </p>
        </div>

        <div>
          <span className="mb-5 block font-mono text-[10px] tracking-[0.15em] text-grid uppercase">
            Work
          </span>
          <div className="flex flex-col gap-3">
            {workLinks.map((label) => (
              <a key={label} href="#work" className="footer-link font-body text-[15px]">
                {label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-5 block font-mono text-[10px] tracking-[0.15em] text-grid uppercase">
            Services
          </span>
          <div className="flex flex-col gap-3">
            {serviceLinks.map((s) => (
              <a key={s.label} href={s.href} className="footer-link font-body text-[15px]">
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-5 block font-mono text-[10px] tracking-[0.15em] text-grid uppercase">
            Connect
          </span>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@rvnwstudios.com"
              className="footer-link font-body text-[15px]"
            >
              hello@rvnwstudios.com
            </a>
            <a
              href="https://instagram.com/rvnwstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link font-body text-[15px]"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com/company/rvnwstudios"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link font-body text-[15px]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      {showAvailableBadge && (
        <div className="mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#2a2a28] px-5 py-2.5">
            <span className="available-dot" />
            <span className="font-mono text-[11px] tracking-[0.12em] text-grid uppercase">
              Available for Select Projects
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 border-t border-[#1c1c1c] pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <span className="font-mono text-[11px] tracking-[0.12em] text-grid uppercase">
          © 2026 RVNW Studios
        </span>
        <span className="font-mono text-[11px] tracking-[0.12em] text-grid uppercase">
          All rights reserved
        </span>
      </div>
    </footer>
  );
}
