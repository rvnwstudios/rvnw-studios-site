import { Fragment } from "react";

/**
 * Splits "Branding + Website + Packaging" into one pill per discipline,
 * with a mono "*" glyph between them, instead of one pill holding the
 * whole joined string. Every metaCategory in the data is authored with
 * " + " as the separator (see src/lib/projects.ts), so that's the split
 * point — not a delimiter the component invents on its own.
 */
export function CategoryPills({ category }: { category: string }) {
  const parts = category.split(" + ");

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {parts.map((part, i) => (
        <Fragment key={part}>
          {i > 0 && (
            <span aria-hidden="true" className="font-mono text-[10px] text-grid">
              *
            </span>
          )}
          <span className="shrink-0 rounded-full border border-[#2a2a28] px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-grid uppercase">
            {part}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
