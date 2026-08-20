import Image from "next/image";
import type { ProjectImageSource } from "@/lib/projects";

/**
 * A case study image at its natural aspect ratio — full container width,
 * height derived from the file itself. Deliberately not PhotoPlaceholder:
 * that component fixes a height and `object-cover`s into it, which crops
 * off the top and bottom of anything that isn't the ratio it assumed. Fine
 * for uniform grid thumbnails, wrong for the body of a case study where the
 * work itself is the content.
 *
 * Dimensions and the blur placeholder come from Sanity asset metadata, which
 * travels with the image itself. That replaced the generated
 * IMAGE_DIMENSIONS manifest, whose failure mode was silent: a new image
 * landing without a re-run of the generator fell back to unsized <img> and
 * reflowed the page.
 */
export function ProjectImage({
  image,
  alt,
  sizes = "(min-width: 1280px) 1280px, 100vw",
  priority = false,
  className = "",
}: {
  image: ProjectImageSource;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={image.url}
      alt={image.alt ?? alt}
      width={image.width}
      height={image.height}
      sizes={sizes}
      priority={priority}
      {...(image.lqip ? { placeholder: "blur" as const, blurDataURL: image.lqip } : {})}
      className={`block h-auto w-full ${className}`}
    />
  );
}
