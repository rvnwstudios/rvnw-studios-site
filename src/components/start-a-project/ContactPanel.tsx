// Same three contact points as the Footer's "Connect" column — kept in
// sync manually since this panel is a much larger, page-specific
// presentation of the same info rather than a shared component.
const CONTACT_LINKS = [
  { label: "hello@rvnwstudios.com", href: "mailto:hello@rvnwstudios.com" },
  { label: "Instagram", href: "https://instagram.com/rvnwstudios" },
  { label: "LinkedIn", href: "https://linkedin.com/company/rvnwstudios" },
];

export function ContactPanel() {
  return (
    <div className="border border-[#2A2A28] bg-[#111110] p-8 sm:p-10 lg:sticky lg:top-[96px]">
      <span className="mb-4 block font-mono text-xs tracking-[0.15em] text-grid uppercase">
        Contact
      </span>
      <h3 className="mb-3 font-display text-2xl font-semibold text-paper sm:text-[28px]">
        Reach Us Directly
      </h3>
      <p className="mb-6 font-body text-base leading-relaxed text-grid">
        Prefer email or social? We&apos;re just as reachable there.
      </p>
      <div className="flex flex-col gap-4">
        {CONTACT_LINKS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="footer-link font-body text-[15px]"
          >
            {c.label}
          </a>
        ))}
      </div>
    </div>
  );
}
