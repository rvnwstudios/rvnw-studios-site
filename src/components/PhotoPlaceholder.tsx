import Image from "next/image";

const placeholderBg = {
  background:
    "repeating-linear-gradient(-45deg, #E0DDD7 0px, #E0DDD7 1px, #ECEAE4 1px, #ECEAE4 14px)",
};

/**
 * Renders real project photography when `src` is given; falls back to a
 * striped placeholder otherwise, so a missing image degrades instead of
 * breaking the layout.
 *
 * `sizes` should describe the slot the image actually occupies — the old
 * blanket "100vw" made Next serve full-viewport-width files to cards that
 * render two- or three-across.
 */
export function PhotoPlaceholder({
  height,
  src,
  alt = "",
  sizes = "100vw",
  priority = false,
}: {
  height: number;
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const style = { height: `clamp(180px, 55vw, ${height}px)` };

  if (src) {
    return (
      <div className="relative overflow-hidden" style={style}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center" style={{ ...placeholderBg, ...style }}>
      <span className="font-mono text-[11px] tracking-[0.15em] text-grid uppercase">
        — Project photography
      </span>
    </div>
  );
}
