# RVNW Studios — Inquiry Email Template

## Stack
React Email (Resend's own component library) + Resend's send API. First-party pairing, renders reliably across email clients, and keeps the templates as actual React components instead of hand-written HTML strings.

## Important constraint: this isn't the site's dark theme
Email client dark-mode support is inconsistent — a full black background with white text can render broken or unreadable depending on the client (Outlook especially). Build these on a **light background** with black text and the hero orange as the accent color, not a transplant of the site's black-dominant surface hierarchy. This is a deliberate, necessary departure from Design Tokens.md's surface roles for technical reasons, not a drift from the system — the brand still reads clearly through typography and the orange accent even on white.

## Two emails

### 1. Internal notification (to Marcos)
Raw and functional — this is closer to a systems ticket than a polished brand moment, which actually fits the "AI-native operations" positioning well. Structure:
- Header: RVNW mark (small, monochrome), "New inquiry" in Public Sans Semi Bold
- Data fields laid out like a technical readout — JetBrains Mono for labels (`NAME`, `EMAIL`, `VERTICAL`, `DISCIPLINES`, `BUDGET`, `TIMELINE`), Instrument Sans for the values
- Project details in a clearly separated block below the field list
- A direct `mailto:` reply link

### 2. Confirmation (to the submitter)
This one needs the full brand treatment — it's the first real touchpoint after they've committed to reaching out.
- RVNW mark, Public Sans Semi Bold headline confirming receipt
- Short body copy (Instrument Sans) — what happens next, rough response-time expectation, follows Copy Voice Guide.md exactly (no "we're so excited to work with you!" filler)
- A secondary line offering the Cal.com link as a backup if they'd rather talk sooner: `https://cal.com/rvnwstudios/intro-meeting-call`
- Footer: RVNW contact info, no dense legal boilerplate

## Copy
Both emails follow Copy Voice Guide.md. The confirmation email in particular is a place people will actually read closely right after submitting — this is not the place for generic auto-responder tone.

## Technical notes
- Use Resend's React Email render pipeline server-side (API route or Sanity/Netlify function handling the form submission) — the client never talks to Resend directly.
- Validate and sanitize all form fields server-side before they reach either email template, regardless of client-side validation on the form itself.
