import {createClient} from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// Pinned, not derived from `new Date()` — a floating API version silently
// changes query behaviour on deploy. Bump it deliberately.
export const apiVersion = "2025-08-15";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});
