// Case study data, sourced from Sanity. Read by the homepage Work section,
// the /projects index, and the /projects/[slug] template.
//
// This file used to be a hand-maintained array plus a generated image
// dimension manifest. Both are gone: content lives in the Studio at
// studio-rvnw-studios-site, and image dimensions travel with each image as
// Sanity asset metadata rather than in a parallel file that could go stale.
//
// The client uses Sanity's default "published" perspective, so drafts are
// invisible here by construction — an unfinished case study cannot leak onto
// the site by being in the dataset.
import { client } from "@/sanity/client";
import {
  PROJECTS_QUERY,
  PROJECT_BY_SLUG_QUERY,
  PROJECT_SLUGS_QUERY,
} from "@/sanity/queries";
import type { PROJECTS_QUERY_RESULT } from "../../sanity.types";

/**
 * The raw projection shape, straight from TypeGen. Every field is nullable
 * because GROQ can't prove otherwise — a projection over a document missing
 * a required field still type-checks. `toProject` is where that becomes a
 * guarantee instead of an assumption.
 */
type RawProject = PROJECTS_QUERY_RESULT[number];

/** A render-ready image: CDN url plus the metadata next/image needs. */
export interface ProjectImageSource {
  url: string;
  width: number;
  height: number;
  /** Base64 blur placeholder from Sanity asset metadata. Null if unavailable. */
  lqip: string | null;
  alt: string | null;
}

/**
 * A gallery image. Carries the array item's `_key`, which is its only stable
 * identity — two entries may reference the same asset, so the URL is not
 * unique within a document.
 */
export interface GalleryImage extends ProjectImageSource {
  key: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  /**
   * One entry per discipline, e.g. ["Branding", "Website"]. Authored as a
   * list rather than a "+"-joined string so the pills render straight from
   * the data — no delimiter for the render layer to guess at.
   */
  disciplines: string[];
  /**
   * Optional for the same reason as `siteUrl`: brand-identity engagements
   * don't all have a location on record. Carter's Essentials has none, so
   * the meta block has to drop the segment rather than print an empty one.
   */
  metaLocation: string | null;
  /** Absent on branding-only engagements — the template hides the CTA. */
  siteUrl: string | null;
  displayOrder: number;
  vertical: { slug: string; title: string } | null;

  heroHeadline: string;
  heroDescription: string;
  heroImage: ProjectImageSource;

  solutionHeadline: string;
  solutionDescription: string;
  solutionImage: ProjectImageSource;

  resultHeadline: string;
  resultDescription: string;

  /**
   * Supporting imagery beyond the hero and solution shots. Length varies
   * widely by engagement (2 for the web builds, 14 for Carter's packaging
   * line), so the template renders this conditionally off `.length` and
   * never assumes a fixed count. Coerced to an array — empty, never null.
   */
  additionalImages: GalleryImage[];
}

// ISR window. Content changes land within 30s without a redeploy.
const options = { next: { revalidate: 30 } };

function toImage(raw: RawProject["heroImage"]): ProjectImageSource | null {
  if (!raw?.url || !raw.width || !raw.height) return null;
  return {
    url: raw.url,
    width: raw.width,
    height: raw.height,
    lqip: raw.lqip ?? null,
    alt: raw.alt ?? null,
  };
}

/**
 * Narrows a raw projection into a Project, or returns null if anything the
 * render layer treats as guaranteed is actually missing. Schema validation
 * makes that unlikely, but "unlikely" isn't "impossible" — a document can be
 * created through the API without passing Studio validation, and a half-filled
 * one should drop out of the list rather than crash the page it lands on.
 */
function toProject(raw: RawProject): Project | null {
  const heroImage = toImage(raw.heroImage);
  const solutionImage = toImage(raw.solutionImage);

  if (
    !raw.title ||
    !raw.slug ||
    !raw.disciplines?.length ||
    !raw.heroHeadline ||
    !raw.heroDescription ||
    !heroImage ||
    !raw.solutionHeadline ||
    !raw.solutionDescription ||
    !solutionImage ||
    !raw.resultHeadline ||
    !raw.resultDescription
  ) {
    return null;
  }

  return {
    _id: raw._id,
    title: raw.title,
    slug: raw.slug,
    disciplines: raw.disciplines.filter((d): d is string => typeof d === "string"),
    metaLocation: raw.metaLocation ?? null,
    siteUrl: raw.siteUrl ?? null,
    displayOrder: raw.displayOrder ?? 0,
    vertical:
      raw.vertical?.slug && raw.vertical.title
        ? { slug: raw.vertical.slug, title: raw.vertical.title }
        : null,
    heroHeadline: raw.heroHeadline,
    heroDescription: raw.heroDescription,
    heroImage,
    solutionHeadline: raw.solutionHeadline,
    solutionDescription: raw.solutionDescription,
    solutionImage,
    resultHeadline: raw.resultHeadline,
    resultDescription: raw.resultDescription,
    additionalImages: (raw.additionalImages ?? [])
      .map((entry) => {
        const img = toImage(entry);
        return img && entry.key ? {...img, key: entry.key} : null;
      })
      .filter((img): img is GalleryImage => img !== null),
  };
}

/** Display order is `displayOrder` ascending; the first entry is featured. */
export async function getProjects(): Promise<Project[]> {
  const raw = await client.fetch(PROJECTS_QUERY, {}, options);
  return raw
    .map(toProject)
    .filter((p): p is Project => p !== null);
}

export async function getProjectSlugs(): Promise<string[]> {
  const slugs = await client.fetch(PROJECT_SLUGS_QUERY, {}, options);
  return slugs.filter((s): s is string => typeof s === "string");
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const raw = await client.fetch(PROJECT_BY_SLUG_QUERY, { slug }, options);
  if (!raw) return undefined;
  return toProject(raw) ?? undefined;
}

/**
 * Previous/next neighbours for the case study footer switcher, wrapping at
 * both ends so every project has two — no dead-end pages at the edges.
 */
export async function getProjectNeighbors(
  slug: string,
): Promise<{ prev: Project; next: Project } | undefined> {
  const projects = await getProjects();
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return {
    prev: projects[(i - 1 + projects.length) % projects.length],
    next: projects[(i + 1) % projects.length],
  };
}
