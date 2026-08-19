# RVNW Studios — Homepage Section Map

Locked structure: Hero → Services/Disciplines → Verticals → Process → Our Work → CTA → Footer.

## 1. Hero
Full-bleed, big type. Positioning line front and center, R mark present. Job: establish who this is and what it claims, in three seconds.

## 2. Services / Disciplines
Strategy, Creative & Design, Dev/Engineering, Advertising, Digital Experience, Growth & Retention. Answers "what do you do" immediately after the claim.

## 3. Verticals
All six shown as equal, per the generalist positioning decision — DTC, e-commerce, startups (SaaS/fintech/tech), restaurants & hospitality, sports & fitness, service-based businesses. Answers "who do you do it for," right after "what do you do." Case studies in the Our Work section below can tag back to these verticals — proof for fintech, restaurants, service-based, DTC, and sports/fitness exists; general SaaS/tech within startups doesn't yet, so don't let this section's copy imply a case study that isn't there.

## 4. Process — Map / Ship / Multiply
How engagement actually works, once the visitor knows what's on offer and who it's for. Verbs, parallel structure, in motion — don't soften into noun-phrase headlines ("Our Ship Phase").

## 5. Our Work
Case studies — Thread House Ink, Cooper Concrete, Royal Peacock, Energy Exchange, Hitters Quarters, the fintech client, the restaurant client. Tag each by vertical to connect back to section 3. Proof lands here, right before the ask, once claim, capability, audience, and mechanism are all already established.

## 6. CTA
Single, clear action — start a project / request a proposal. Copy here carries the pricing differentiator: project-based, priced to what the work needs, no fixed tiers.

## 7. Footer
Standard utility — contact, socials, secondary nav. Not a design-forward moment; keep it quiet relative to everything above it.

## Mobile behavior
- **Hero**: display type clamps down from 120px toward ~48–56px (see Design Tokens.md breakpoints). The grid overlay's node count and traveling-swarm paths should reduce on mobile — full density (117 intersections + 10 traveling nodes) is unnecessary DOM/animation load on a phone that's also running everything else. Halve the grid resolution and traveling paths below `md`.
- **Nav**: collapses to a menu drawer below `md`. Touch targets minimum 44×44px.
- **Grid sections** (Services/Disciplines, Verticals): 12-column grid stacks to single column below `md`, recovers multi-column starting at `md`/`lg`.
- **Process progress indicator**: the scroll-linked fill (see Motion Interaction Guide.md) should be tested on real touch-scroll behavior — if it reads as janky on mobile, fall back to per-phase `whileInView` reveals instead of continuous scroll-linking. Don't ship scroll-linked motion on mobile without checking it first.
- **Motion generally**: reduce ambient animation load on mobile beyond just `prefers-reduced-motion` — battery and thermal cost matter even when the user hasn't explicitly requested reduced motion.

## Rhythm notes
- Alternate section backgrounds (black/white/hero-orange) so no two adjacent sections share the same surface.
- Full-page hero-style treatment isn't only for section 1 — carry it into Process and CTA as well so the animation/separation technique reads as a system.
