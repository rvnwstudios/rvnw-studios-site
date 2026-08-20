import Link from "next/link";
import { RMark } from "./RMark";
import { getProjects } from "@/lib/projects";

const serviceLinks = ["Strategy", "Creative & Design", "Dev/Engineering", "Advertising", "Digital Experience", "Growth & Retention"];

export async function Footer({ showAvailableBadge = true }: { showAvailableBadge?: boolean }) {
  const projects = await getProjects();
  const workLinks = projects.slice(0, 4);

  return (
    <footer className="border-t border-[#1c1c1c] bg-ink px-6 pt-16 pb-10 sm:px-8 md:px-12 md:pt-20 lg:px-20">
      <div className="mb-10 grid grid-cols-1 items-start gap-8 sm:mb-12 sm:grid-cols-[2fr_1fr_1fr_1fr] sm:gap-20 md:mb-20">
        <div>
          <Link href="/" className="mb-5 flex items-center gap-3">
            <RMark size={24} />
            <span className="font-display text-[11px] font-semibold tracking-[0.18em] text-paper uppercase">
              RVNW Studios
            </span>
          </Link>
          <p className="max-w-[260px] font-body text-[15px] leading-relaxed text-grid">
            Brand and product, built by hand.
          </p>
        </div>

        <div>
          <span className="mb-5 block font-mono text-[10px] tracking-[0.15em] text-grid uppercase">
            Work
          </span>
          <div className="flex flex-col gap-3">
            {workLinks.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug}`}
                className="footer-link font-body text-[15px]"
              >
                {project.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <span className="mb-5 block font-mono text-[10px] tracking-[0.15em] text-grid uppercase">
            Services
          </span>
          <div className="flex flex-col gap-3">
            {serviceLinks.map((label) => (
              <Link key={label} href="/#services" className="footer-link font-body text-[15px]">
                {label}
              </Link>
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
        <div className="mb-8 flex justify-center sm:mb-10">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-[#2a2a28] px-5 py-2.5">
            <span className="available-dot" />
            <span className="font-mono text-[11px] tracking-[0.12em] text-grid uppercase">
              Available for Select Projects
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-[#1c1c1c] pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="flex items-center justify-between sm:contents">
          <span className="font-mono text-[11px] tracking-[0.12em] text-grid uppercase">
            © 2026 RVNW Studios
          </span>
          <span className="font-mono text-[11px] tracking-[0.12em] text-grid uppercase sm:hidden">
            All rights reserved
          </span>
        </div>

        {/* Two links, edge to edge on mobile (justify-between) instead of
            stacking — at sm+ they sit tight together on the right, matching
            the original desktop grouping, via gap instead of spread. */}
        <div className="flex items-center justify-between gap-6 sm:justify-start">
          <Link
            href="/privacy-policy"
            className="footer-link inline-block py-1 font-mono text-[11px] tracking-[0.12em] uppercase"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="footer-link inline-block py-1 font-mono text-[11px] tracking-[0.12em] uppercase"
          >
            Terms of Service
          </Link>
          <span className="hidden font-mono text-[11px] tracking-[0.12em] text-grid uppercase sm:inline">
            All rights reserved
          </span>
        </div>
      </div>
    </footer>
  );
}
