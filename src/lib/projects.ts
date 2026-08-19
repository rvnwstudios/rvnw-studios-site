// Single source of truth for case studies — read by the homepage Work
// section, the /projects index, and the /projects/[slug] template.
//
// Image paths are written out in full rather than derived from `slug`,
// because the folders under /public/projects don't consistently match
// their slugs (Hitters Quarters lives in `andy-lopez/`, Roxy's Tacos in
// `roxys/`) and filenames follow a different convention in every folder.
// Explicit paths mean renaming a folder is a visible break at the data
// layer instead of a silent 404 at render time.

export interface Project {
  title: string;
  slug: string;
  /** Discipline line for the hero meta block, e.g. "Branding + Website". */
  metaCategory: string;
  /**
   * Optional for the same reason as `siteUrl`: brand-identity engagements
   * don't all have a location on record. Carter's Essentials has none, so
   * the meta block has to drop the segment rather than print an empty one.
   */
  metaLocation?: string;
  /** Absent on branding-only engagements — the template hides the CTA. */
  siteUrl?: string;

  heroHeadline: string;
  heroDescription: string;
  heroImage: string;

  solutionHeadline: string;
  solutionDescription: string;
  solutionImage: string;

  resultHeadline: string;
  resultDescription: string;

  /**
   * Supporting imagery beyond the hero and solution shots. Length varies
   * widely by engagement (2 for the web builds, 14 for Carter's packaging
   * line), so the template renders this conditionally off `.length` and
   * never assumes a fixed count. Always an array — empty, never undefined.
   */
  additionalImages: string[];
}

// Array order is display order: the first entry is treated as the featured
// project by the homepage Work section, so reordering here reorders the site.
export const PROJECTS: Project[] = [
  {
    title: "Thread House Ink",
    slug: "thread-house-ink",
    metaCategory: "Website + CRM + Order Management",
    metaLocation: "Lincoln, CA",
    siteUrl: "https://threadhouseink.com",
    heroHeadline: "A custom apparel shop that needed quoting and production out of spreadsheets and group texts.",
    heroDescription:
      "Thread House Ink runs embroidery, DTF, and screen printing for brands, crews, and teams. Quotes, art approval, and order status were living across phone calls and email threads before a job ever hit production. We built the site and the platform behind it: a public site that sells the capability, and a CRM and order management system clients log into directly.",
    heroImage: "/projects/thread-house-ink/thi_img_01.jpg",
    solutionHeadline: "One platform, quote to delivery.",
    solutionDescription:
      "The public site sells what the shop actually does: embroidery, DTF, screen printing, full brand programs. Behind it, clients submit a quote with specs and artwork, get confirmed pricing back fast, and sign off on a real proof before anything gets printed or stitched. Once a job's approved, they log in and track it through production instead of calling to ask where it's at.",
    solutionImage: "/projects/thread-house-ink/thi_img_02.jpg",
    resultHeadline: "A quote process people actually trust.",
    resultDescription:
      "Clients get real pricing back fast, approve the actual proof before production starts, and check order status without picking up the phone. No line items that show up for the first time at billing. That's the difference between this and a print shop that quotes loose and hopes you don't ask questions.",
    additionalImages: [
      "/projects/thread-house-ink/thi_img_03.jpg",
      "/projects/thread-house-ink/thi.jpeg",
    ],
  },
  {
    title: "Staxx Extreme",
    slug: "staxx-extreme",
    metaCategory: "Branding + Website",
    metaLocation: "Greater Sacramento, CA",
    siteUrl: "https://staxxextreme.framer.website",
    heroHeadline: "A carpet and emergency cleanup company that finally looked like the work they do.",
    heroDescription:
      "Staxx Extreme runs carpet, tile, grout, and emergency water/fire cleanup across the Sacramento area. Their brand hadn't kept pace with the business. We rebuilt it top to bottom: new logo, new palette, brand guidelines, marketing collateral, and a booking site that could actually convert an emergency call into a scheduled job.",
    heroImage: "/projects/staxx-extreme/staxx_extreme_macbook.jpg",
    solutionHeadline: "Built for the call that can't wait.",
    solutionDescription:
      "Emergency cleanup customers aren't browsing. They're searching in a panic with water on the floor. We designed the site around that: fast load, clear phone number, a booking path that doesn't make someone read three paragraphs before they can act. The rebrand gave the business a visual identity sharp enough to compete with bigger regional players, and we built it on Framer so the team can update service pages without touching code.",
    solutionImage: "/projects/staxx-extreme/staxx_extreme_iphone.jpg",
    resultHeadline: "A brand that reads as bigger than it is.",
    resultDescription:
      "Staxx Extreme now has a consistent identity across the site, trucks, and print collateral, plus a booking flow built for urgency instead of a generic contact form. The brand guidelines mean every future asset stays on system instead of drifting a little more each time someone new touches it.",
    additionalImages: [
      "/projects/staxx-extreme/staxx-extreme_logo.jpg",
      "/projects/staxx-extreme/staxx_extreme_a_frame.jpg",
    ],
  },
  {
    title: "Push Play",
    slug: "push-play",
    metaCategory: "Branding + Booking Website",
    metaLocation: "Bay Area, CA",
    siteUrl: "https://wordpress-782852-4354455.cloudwaysapps.com/",
    heroHeadline: "A recording studio that needed booking to run itself.",
    heroDescription:
      "Push Play is a podcast and music recording studio in the Bay Area. Before this build, booking a session meant back-and-forth messages to confirm availability. We built them a WordPress site running WP Amelia to handle the entire client booking flow: real-time availability, session types, and confirmations, without the studio manually managing a calendar.",
    heroImage: "/projects/push-play/push-play-01.jpg",
    solutionHeadline: "Availability that doesn't need a human to check it.",
    solutionDescription:
      "The core problem wasn't the site's look, it was the booking bottleneck. WP Amelia gave Push Play a system where clients pick a session type and time slot directly, and the studio just shows up to run it. We built the site around that flow first and the brand presentation second.",
    solutionImage: "/projects/push-play/push-play-02.jpg",
    resultHeadline: "Bookings without the back-and-forth.",
    resultDescription:
      "Clients now book their own session time instead of waiting on a reply, and the studio isn't fielding scheduling messages between sessions. That's time back for the people actually running the room.",
    additionalImages: [
      "/projects/push-play/push-play-03.jpg",
      "/projects/push-play/push-play-04.jpg",
    ],
  },
  {
    // Branding-only engagement: no siteUrl, no location on record. Both
    // omissions are load-bearing tests of the template's conditionals.
    title: "Carter's Essentials",
    slug: "carters-essentials",
    metaCategory: "Branding + Packaging",
    heroHeadline: "A wellness brand's identity, rebuilt for the shelf.",
    heroDescription:
      "Carter's Essentials makes aromatherapy and wellness products, candles included, and needed a brand that matched the quality of what's inside the packaging. We built a new identity from the ground up: logo, icon mark, color palette, and a full candle packaging line.",
    heroImage: "/projects/carters-essentials/hero.jpg",
    solutionHeadline: "Identity first, packaging second, in that order.",
    solutionDescription:
      "We didn't start with the candle boxes. We started with the mark and the palette, then built the packaging system off that foundation so every product line stays visually consistent as the catalog grows. The icon mark gives them a shorthand identity for social and smaller applications where the full logo doesn't fit.",
    solutionImage: "/projects/carters-essentials/ce_02.jpg",
    resultHeadline: "A brand that reads premium at retail.",
    resultDescription:
      "Carter's Essentials went from an identity that didn't match its price point to packaging that holds its own next to established wellness brands on a shelf or a storefront table.",
    additionalImages: [
      "/projects/carters-essentials/ce_03.jpg",
      "/projects/carters-essentials/ce_04.jpg",
      "/projects/carters-essentials/ce_05.jpg",
      "/projects/carters-essentials/ce_06.jpg",
      "/projects/carters-essentials/ce_07.jpg",
      "/projects/carters-essentials/ce_08.jpg",
      "/projects/carters-essentials/ce_09.jpg",
      "/projects/carters-essentials/ce_10.jpg",
      "/projects/carters-essentials/ce_11.jpg",
      "/projects/carters-essentials/ce_12.jpg",
      "/projects/carters-essentials/ce_13.jpg",
      "/projects/carters-essentials/ce_01.jpg",
      "/projects/carters-essentials/ce_15.jpg",
      "/projects/carters-essentials/ce_16.jpg",
    ],
  },
  {
    title: "Hitters Quarters",
    slug: "hitters-quarters",
    metaCategory: "Branding + Booking Website",
    metaLocation: "Elk Grove, CA",
    siteUrl: "https://alc916.com",
    heroHeadline: "A hitting facility's brand and booking system, built from scratch.",
    heroDescription:
      "Andy Lopez runs a training business and hitting facility in Elk Grove. We built the Hitters Quarters brand from the ground up and paired it with a booking website that lets clients schedule sessions directly instead of calling or texting Andy to check his availability.",
    heroImage: "/projects/andy-lopez/andy_lopez_macbook_01.jpg",
    solutionHeadline: "A brand that looks like the level of training it delivers.",
    solutionDescription:
      "Youth and competitive baseball/softball families are evaluating a facility on first impression before they ever step inside. We gave Hitters Quarters an identity built for that: a mark and system that reads serious and athletic, not like a personal trainer's side hustle. The booking site removes Andy from the scheduling loop entirely so he's coaching, not managing a calendar between sessions.",
    solutionImage: "/projects/andy-lopez/andy_lopez_iphone_01.jpg",
    resultHeadline: "More hours coaching, fewer hours scheduling.",
    resultDescription:
      "Hitters Quarters now runs bookings without Andy touching a phone between clients, and the brand gives the business a real identity to market against other facilities in the area instead of competing purely on word of mouth.",
    additionalImages: [
      "/projects/andy-lopez/andy_lopez_iphone_02.jpg",
      "/projects/andy-lopez/andy_lopez_mac_studio_01.jpg",
    ],
  },
  {
    // Branding/packaging/environmental engagement: no siteUrl.
    title: "Roxy's Tacos",
    slug: "roxys-tacos",
    metaCategory: "Branding + Packaging + Environmental Design",
    metaLocation: "Downtown San Diego, CA",
    heroHeadline: "A taco shop's identity, built for the neighborhood it's in.",
    heroDescription:
      "Roxy's Tacos is a taco shop in Downtown San Diego. We built their brand identity from the ground up, plus packaging, menus, and environmental design for the physical space itself, so the shop's look carries from the sign on the door to the bag someone walks out with.",
    heroImage: "/projects/roxys/roxys-1.jpg",
    solutionHeadline: "One identity, every touchpoint.",
    solutionDescription:
      "A taco shop lives or dies on repeat foot traffic in a dense neighborhood with real competition on the same block. We built an identity system that covers the full physical footprint: signage and environmental elements inside the shop, menus customers read while ordering, and packaging that keeps the brand visible after they've left. Nothing here was a one-off asset. Everything ties back to the same system.",
    solutionImage: "/projects/roxys/roxys-2.jpg",
    resultHeadline: "A shop that looks like a destination, not a stand.",
    resultDescription:
      "Roxy's Tacos now has a cohesive identity across every physical touchpoint a customer sees, from walking up to the counter to unwrapping their order at home.",
    additionalImages: [
      "/projects/roxys/roxys-3.jpg",
      "/projects/roxys/roxys-4.jpg",
      "/projects/roxys/roxys-5.jpg",
      "/projects/roxys/roxys-6.jpg",
      "/projects/roxys/roxys-7.jpg",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/**
 * Previous/next neighbours for the case study footer switcher, wrapping at
 * both ends so every project has two — no dead-end pages at the edges.
 */
export function getProjectNeighbors(slug: string): { prev: Project; next: Project } | undefined {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return {
    prev: PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length],
    next: PROJECTS[(i + 1) % PROJECTS.length],
  };
}
