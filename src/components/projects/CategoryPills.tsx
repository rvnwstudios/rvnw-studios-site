import { Fragment } from "react";

/**
 * One pill per discipline, with a mono "*" glyph between them.
 *
 * The list arrives already split from Sanity, where each discipline is its
 * own entry. This component previously split a "+"-joined string itself —
 * which meant the separator was a convention the render layer had to assume,
 * and any value authored without it silently collapsed into a single pill
 * holding several disciplines.
 */
export function CategoryPills({ disciplines }: { disciplines: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {disciplines.map((discipline, i) => (
        <Fragment key={discipline}>
          {i > 0 && (
            <span aria-hidden="true" className="font-mono text-[10px] text-grid">
              *
            </span>
          )}
          <span className="shrink-0 rounded-full border border-[#2a2a28] px-3.5 py-1.5 font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-grid uppercase">
            {discipline}
          </span>
        </Fragment>
      ))}
    </div>
  );
}
