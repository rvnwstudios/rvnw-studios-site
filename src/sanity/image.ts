import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import {dataset, projectId} from "./client";

const builder = createImageUrlBuilder({projectId, dataset});

/**
 * On-demand image transforms (crop, resize, format). Case study imagery
 * already arrives render-ready from GROQ, so this is for one-off needs —
 * OG images, fixed-ratio crops — rather than the main render path.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
