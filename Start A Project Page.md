# RVNW Studios — "Start A Project" Page

## Purpose
The primary conversion destination for the homepage CTA. Two paths, presented as equals — submit project details now, or book a call first. Neither should read as the "fallback" option.

## Structure

### Intro
Short headline + subhead, not a full hero treatment — this page's job is action, not another authority-building moment. Something like: a direct line acknowledging value-based pricing ("Every project's scoped to what it actually needs — tell us about yours") — pulls from the locked positioning thesis rather than introducing new language.

### Two paths, side by side (stack on mobile)

**Path 1 — Inquiry form** (primary)
**Path 2 — Book a call** — single button linking to `https://cal.com/rvnwstudios/intro-meeting-call`, opens in a new tab. Short supporting line: something like "Prefer to talk it through first?" Keep this path visually equal in weight to the form, not a smaller afterthought — some people want to talk before they'll write anything down, and that's not a lesser lead.

## Form fields

Required (minimum friction — don't gate submission behind more than this):
- Name
- Email
- Project details (textarea — what are you building, what's the goal)

Optional but presented (helps scope the custom proposal without blocking submission):
- Company / brand name
- Vertical — dropdown matching the six locked verticals (DTC, e-commerce, startups, restaurants & hospitality, sports & fitness, service-based), plus an "Other" catch-all (added 2026-08-18) so inquiries outside the roster aren't forced into a bad fit
- Disciplines needed — multi-select matching the six locked disciplines (Strategy, Creative & Design, Dev/Engineering, Advertising, Digital Experience, Growth & Retention)
- Budget range — dropdown with real ranges, not open text. This matters more here than on a typical form: the whole pricing model is value-based custom proposals, so a budget signal is what lets a proposal actually match the work instead of guessing
- Timeline

Validation: inline, on blur or submit — clear error text, not a red border with no explanation. Don't block submission on the optional fields under any circumstance.

## Visual system
Same tokens as the rest of the site — sharp/minimal radius on inputs (matches the chamfered-corner language, no rounded pill-shaped form fields), Public Sans for labels/buttons, Instrument Sans for input text and helper copy, hero orange for the primary submit button and focus states.

## Submission flow
On submit: form data forwards via Resend to Marcos's inbox (see Inquiry Email Template.md for the styled notification), plus a confirmation email to the submitter. Show an inline success state on the page itself — don't just redirect silently. Something brief, on-brand, confirming it was received and roughly when to expect a reply.

## Copy
Follows Copy Voice Guide.md — no "we'll be in touch soon!" filler, no exclamation-point enthusiasm. State what happens next plainly.
