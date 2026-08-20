import {defineQuery} from "next-sanity";

/**
 * Array members additionally carry their Sanity `_key` as `key`. That is the
 * only stable identity an array item has: two entries can legitimately point
 * at the same asset (Sanity dedupes byte-identical uploads to one asset), so
 * keying React off the URL collides. `_key` is also what Visual Editing
 * overlays bind to.
 *
 * Every image is projected into a flat, render-ready shape: a CDN url plus
 * the intrinsic dimensions and LQIP that Sanity already stores as asset
 * metadata. This is what replaced the generated IMAGE_DIMENSIONS manifest —
 * the numbers now travel with the image instead of living in a parallel file
 * that could go stale.
 */
const IMAGE_FRAGMENT = /* groq */ `{
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  alt
}`;

const PROJECT_FIELDS = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  disciplines,
  metaLocation,
  siteUrl,
  displayOrder,
  "vertical": vertical->{"slug": slug.current, title},
  heroHeadline,
  heroDescription,
  "heroImage": heroImage${IMAGE_FRAGMENT},
  solutionHeadline,
  solutionDescription,
  "solutionImage": solutionImage${IMAGE_FRAGMENT},
  resultHeadline,
  resultDescription,
  "additionalImages": additionalImages[]{"key": _key, ...${IMAGE_FRAGMENT}}
`;

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)] | order(displayOrder asc) {${PROJECT_FIELDS}}
`);

export const PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug][0] {${PROJECT_FIELDS}}
`);

export const PROJECT_SLUGS_QUERY = defineQuery(`
  *[_type == "caseStudy" && defined(slug.current)].slug.current
`);
