"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { RMark } from "./RMark";
import { CtaButton } from "./motion/CtaButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { DURATION, EASE_OUT } from "@/lib/motion";

export function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const links = [
    { href: isHome ? "#work" : "/projects", label: "Work" },
    { href: isHome ? "#services" : "/#services", label: "Services" },
    { href: isHome ? "#process" : "/#process", label: "Process" },
  ];

  useEffect(() => {
    const onScroll = () => {
      navRef.current?.classList.toggle("nav-scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="nav fixed inset-x-0 top-0 z-[100] flex h-[64px] items-center justify-between border-b border-[#1c1c1c] bg-ink px-6 sm:px-8 md:grid md:h-[68px] md:grid-cols-[1fr_auto_1fr] md:px-12 lg:px-20"
      >
        <Link href="/" aria-label="RVNW Studios home" className="flex items-center">
          <RMark size={26} />
        </Link>

        <div className="hidden items-center justify-center gap-12 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav-link font-mono text-[11px] tracking-[0.12em] uppercase"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center justify-end gap-4 md:flex md:justify-self-end">
          <Link
            href="/login"
            className="rounded-full border border-[#2a2a28] px-5 py-3 font-mono text-[11px] tracking-[0.12em] text-grid uppercase transition-colors hover:border-grid hover:text-paper"
          >
            Sign In
          </Link>
          <CtaButton
            href="/start-a-project"
            className="btn-hero inline-block rounded-full px-6 py-3 font-mono text-[13px] font-semibold tracking-[0.04em] text-ink"
          >
            Start a Project
          </CtaButton>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 h-[1.5px] w-6 bg-paper transition-transform ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`}
              style={{ transitionDuration: `${DURATION.base * 1000}ms` }}
            />
            <span
              className={`absolute left-0 top-1/2 h-[1.5px] w-6 -translate-y-1/2 bg-paper transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
              style={{ transitionDuration: `${DURATION.base * 1000}ms` }}
            />
            <span
              className={`absolute left-0 h-[1.5px] w-6 bg-paper transition-transform ${
                menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`}
              style={{ transitionDuration: `${DURATION.base * 1000}ms` }}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col bg-ink px-6 pt-[88px] pb-10 md:hidden"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : DURATION.base, ease: EASE_OUT }}
          >
            <div className="flex flex-1 flex-col justify-center gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="nav-link flex min-h-[44px] items-center border-b border-[#1c1c1c] py-5 font-display text-5xl font-semibold text-paper"
                >
                  {l.label}
                </a>
              ))}
            </div>
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="mb-4 flex min-h-[44px] items-center justify-center rounded-full border border-[#2a2a28] py-3 text-center font-mono text-xs tracking-[0.12em] text-grid uppercase"
            >
              Sign In
            </Link>
            <CtaButton
              href="/start-a-project"
              onClick={() => setMenuOpen(false)}
              className="btn-hero flex min-h-[44px] items-center justify-center rounded-full px-6 py-4 text-center font-mono text-[15px] font-semibold tracking-[0.04em] text-ink"
            >
              Start a Project
            </CtaButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
