import Image from "next/image";
import { IMAGE_DIMENSIONS } from "@/lib/imageDimensions";

/**
 * A case study image at its natural aspect ratio — full container width,
 * height derived from the file itself. Deliberately not PhotoPlaceholder:
 * that component fixes a height and `object-cover`s into it, which crops
 * off the top and bottom of anything that isn't the ratio it assumed. Fine
 * for uniform grid thumbnails, wrong for the body of a case study where the
 * work itself is the content.
 *
 * Dimensions come from the generated manifest so the browser reserves the
 * right space before the file loads and the page doesn't reflow.
 */
export function ProjectImage({
  src,
  alt,
  sizes = "(min-width: 1280px) 1280px, 100vw",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  const dimensions = IMAGE_DIMENSIONS[src];

  // An unlisted path means the manifest is stale (a new image landed without
  // a re-run of scripts/gen-image-dimensions.mjs). Fall back to an intrinsic
  // sizing that still can't crop, rather than rendering nothing.
  if (!dimensions) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`block h-auto w-full ${className}`} />;
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      sizes={sizes}
      priority={priority}
      className={`block h-auto w-full ${className}`}
    />
  );
}
