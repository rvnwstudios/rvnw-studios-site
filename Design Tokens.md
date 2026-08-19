# RVNW Studios — Design Tokens

Status: color values are a working recommendation pending final sign-off. Typography, spacing, and radius reflect decisions made in this rebrand.

## Color

### Structural roles

| Role | Value | Usage |
|---|---|---|
| Hero (primary) | `#FF5A1F` | Dominant fields, large color blocks — not a decorative accent. This is the brand's signature color. |
| Structure — black | `#0A0A0A` | Primary dark surface, body backgrounds, text on light |
| Structure — white | `#F7F5F0` | Primary light surface, body backgrounds, text on dark |
| Grid lines / neutral | `#8C8C88` | Dividers, grid lines, secondary text, disabled states |
| Signal (rare, secondary) | `#FF2D2D` | Reserved for a genuinely rare second moment — not a co-equal brand color. Hover states, single callouts, never large fields. |

### Why these values
- Hero orange was chosen specifically to avoid two roster collisions: it doesn't overlap with Cooper Concrete's Blueprint blue (`#2D5EF9`) or the red family already claimed by THI's crimson and Royal Peacock's blood red.
- One hero color, not two — commitment to a single saturated hue against black/white is what makes a mark memorable (see: Linear/purple, Cash App/green), not stacking multiple vivid colors.
- Signal red is optional depth, not a requirement. If the system feels complete with just hero + structure, it's fine to drop it.

### Grey scale (structure, needs full 100–900 ramp before Figma variables are built)
Base neutral: `#8C8C88` at 500. Full tint/shade ramp (100–900) to be generated off this base — not yet built out.

## Typography

| Role | Family | Weight |
|---|---|---|
| Headings / display / hero | Public Sans | Semi Bold (600) |
| Buttons / menus / UI labels | Public Sans | Semi Bold (600) |
| Body copy | Instrument Sans | Regular (400) |
| Technical accents — stats, tags, meta labels, timestamps | JetBrains Mono | Regular / Medium |

### Type scale (proposed — needs your review)

| Token | Size | Line height | Weight | Use |
|---|---|---|---|---|
| Display / Hero | 120px (clamp down to ~64px mobile) | 0.95 | Public Sans 600 | Full-page hero headlines |
| H1 | 64px | 1.0 | Public Sans 600 | Section headers |
| H2 | 40px | 1.1 | Public Sans 600 | Sub-section headers |
| H3 | 28px | 1.2 | Public Sans 600 | Card/component headers |
| Body Large | 20px | 1.6 | Instrument Sans 400 | Lead paragraphs |
| Body | 16px | 1.6 | Instrument Sans 400 | Standard body copy |
| Small | 14px | 1.5 | Instrument Sans 400 | Captions, footnotes |
| Mono accent | 13px | 1.4 | JetBrains Mono 500 | Tags, stats, labels — uppercase, tracked out |

## Spacing scale
`4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128` — numeric scale, not arbitrary px. Full-page hero sections should lean into the upper end (96/128) for section separation; component-internal spacing stays in the 4–24 range.

## Corner radius
Sharp / minimal — `0–4px` for structural surfaces: cards, inputs, tags, panels, containers. This isn't a default, it's a deliberate match to the logo mark's chamfered-corner language.

**Buttons and tags are the exception (updated 2026-08-19):** fully rounded / pill-shaped (`border-radius: 9999px`), chosen deliberately for a more tech-forward, cutting-edge feel that reads against the sharp structural surfaces around it. Tags — the category/discipline badges on project cards (`/projects`, homepage Work section) — now carry the same pill treatment as buttons, so every discrete, self-contained chip on the site reads as one family. Cards, inputs, and other containers (photo frames, form fields, panels) stay sharp — the pill treatment marks something as an interactive or label-like chip, not a structural surface.

## Grid
12-column grid, collapsing to a single-column stack below the `md` breakpoint. Breakpoints (Tailwind defaults — no reason to deviate from a well-tested scale):

| Token | Width | Notes |
|---|---|---|
| `sm` | 640px | Large phones, landscape |
| `md` | 768px | Tablets — grid starts recovering multi-column layout |
| `lg` | 1024px | Small laptops — full 12-column grid active |
| `xl` | 1280px | Standard desktop |
| `2xl` | 1536px | Large desktop — hero display type can scale toward its full 120px |

Mobile-first: build the base styles for `<640px` and scale up, not the reverse.
