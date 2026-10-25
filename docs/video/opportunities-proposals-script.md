# Opportunities & proposals: animated short (script for Claude Science)

Source: Sathi's Opportunities & proposals flow notes and the PM's lifecycle notes (public-safe wording:
no client names, no colleague names, no internal codenames). Words and icons only, no product screens.

---

## Global style (paste this first)

- **Format:** 16:9, 1920 × 1080, 30 fps, about 60 seconds, 9 scenes. No voice-over needed; every idea is on screen.
- **Background (every scene):** flat warm cream `#F9F4ED`, the same as the case study page. Optional: a very faint
  dot grid (`#02594E` at 6% opacity, 28 px spacing). No gradients, no photos, no device frames.
- **Colours:**
  - Text: ink `#344054`, soft `#6B7F7C`
  - Brand green `#02594E`, deep green `#1F392D`
  - Lavender `#B79CEC`, deep purple `#4A307D`, warm yellow `#F2D98B`
  - Tints: mint `#E4F1EB`, lilac `#F1EBFC`, cream yellow `#FBF1D3`
- **Type:**
  - Headlines: Bricolage Grotesque, 600 weight, 88–110 px, tight tracking.
  - One accent word per headline: Instrument Serif italic, grey `#6B7F7C` (like the page titles, "Every stage, *every version*").
  - Labels: Figtree, 600 weight, 28–34 px. Small caps eyebrows: Figtree, 22 px, letter-spacing 0.12em, brand green.
- **Icons:** Lucide line icons, 2 px stroke, inside round "discs" 120–160 px wide, filled with a tint and the icon
  in the matching deep colour (mint/green, lilac/purple, cream yellow/brown `#8A6514`).
- **Motion (SaaS explainer feel):**
  - Words rise 24 px and fade in, staggered 80 ms per word; icons pop in with a soft overshoot (scale 0.9 → 1).
  - Connectors draw left to right; nothing loops or bounces repeatedly.
  - Scene changes: a 400 ms soft slide up plus fade on the same cream background, so it feels like one continuous canvas.
  - Calm pacing: hold each finished scene about 1.5 s before moving on.
- **Don't:** show UI screens, fake numbers, people's faces, logos of clients, or a repeating loop diagram.

---

## Scene 1 · Title (0:00–0:05)
- **On screen:** eyebrow "SCINODE · SHARED BY ALL SUPPLIERS". Headline "Opportunities & *proposals*".
  Subline: "From a matched project to a purchase order."
- **Icons:** none; a short brand-green underline draws in under the headline.
- **Motion:** eyebrow fades in, headline words rise, underline draws.

## Scene 2 · Who it's for (0:05–0:11)
- **On screen:** "One flow. *Three* kinds of supplier."
- **Icons (three discs in a row, labels below):**
  - `FlaskConical` (mint) "CROs"
  - `Microscope` (lilac) "Scientists"
  - `Factory` (cream yellow) "Manufacturers"
- **Motion:** discs pop in left to right, then a thin green line draws under all three and joins them.

## Scene 3 · The rule (0:11–0:18)
- **On screen:** "Suppliers never talk to the customer *directly*."
  Below: "Scimplify sits in the middle."
- **Icons:** three discs in a line, `Building2` "Supplier" · `ShieldCheck` (deep green fill, white icon) "Scimplify" · `UserRound` "Customer".
  Two connectors draw from the centre outwards; the centre disc gets a soft green glow.
- **Motion:** the centre disc appears first, then both sides.

## Scene 4 · How opportunities arrive (0:18–0:26)
- **On screen:** "Two ways in."
- **Two cards (white, rounded 28 px, thin `#ECE4D8` border), side by side:**
  - `Package` icon, "Catalogue": "From the products in your profile"
  - `Sparkles` icon, "Capability": "From what your lab or plant can do"
- **Then a row of two pills underneath:** `Globe2` "Open: every onboarded supplier" · `Lock` "Exclusive: invited suppliers only"
- **Motion:** cards slide in from left and right, then the pills fade in below.

## Scene 5 · Find the right one (0:26–0:31)
- **On screen:** "Filter by what *matters*."
- **Five chips** (white, green outline) appear one by one with `Filter` icon first:
  "Project type" · "Industry" · "Geography" · "Certifications" · "Deadline"
- **Motion:** chips drop in like tags, 100 ms apart.

## Scene 6 · One question, one form (0:31–0:39)
- **On screen:** "One question instead of *three forms*."
- **Left:** three stacked form icons `FileText` fade to 30% and slide together.
- **Centre:** a lilac disc with `HelpCircle` and the question in a speech bubble:
  "Do you already have the capability to manufacture it?"
- **Right:** two arrows: "Yes" → `FileText` "RFQ" · "No" → `FlaskConical` "Co-development"
- **Motion:** the three forms collapse into the question disc, then the two answer arrows draw.

## Scene 7 · Every stage visible (0:39–0:48)
- **On screen:** "Every stage, *every version*."
- **A horizontal track of 5 numbered dots** (mint fill, last dot deep green), labels underneath:
  1 "Submitted" · 2 "Talk to an expert" · 3 "Submit quote" · 4 "Quote accepted" · 5 "PO issued"
- **At stage 3:** a lavender ring pulses once. A small lilac card lifts out above it with `RotateCcw`
  "Quotes go back and forth, every version stays visible." Use a single pulse, not a loop.
- **Motion:** the line draws left to right, dots pop in on the line in order, then the stage 3 card.

## Scene 8 · A human when it matters (0:48–0:53)
- **On screen:** "A specialist, *in the loop*."
- **Icon:** `Headset` (lilac disc) with the label "Talk to an expert", and a small `CalendarCheck` badge: "Book a call, or Scimplify books it for you."
- **Motion:** disc pops, badge slides in from the right.

## Scene 9 · Close (0:53–1:00)
- **On screen:** "From intent to *purchase order*."
- **Icon row (small, connected by a thin green line):** `Search` "Find" → `Send` "Propose" → `Handshake` "Agree" → `FileCheck2` "PO"
- **Last line (fades in last):** "Scinode for Researchers & Manufacturers" in brand green, Figtree 600.
- **Motion:** the line draws through the four icons; hold the final frame for 2 s.

---

## One-paragraph prompt (if Claude Science wants a single brief)

Create a 60-second, 1920×1080 animated explainer in a clean SaaS style on a flat cream background (#F9F4ED, the same as
the case study page) using only words and Lucide line icons in round tinted discs, with no product screens. Headlines in
Bricolage Grotesque with one italic serif accent word in grey; labels in Figtree; colours brand green #02594E, deep green
#1F392D, lavender #B79CEC, deep purple #4A307D, warm yellow #F2D98B. Nine scenes: (1) title "Opportunities & proposals",
(2) one flow for CROs, scientists and manufacturers, (3) suppliers never talk to the customer directly, Scimplify sits in
the middle, (4) two ways in, catalogue and capability, open or exclusive, (5) filters: project type, industry, geography,
certifications, deadline, (6) one question instead of three forms, routing to RFQ or co-development, (7) a five-stage
track: submitted, talk to an expert, submit quote, quote accepted, PO issued, with quote versions kept at stage 3, (8) a
specialist in the loop, (9) close: from intent to purchase order. Words rise and fade in, icons pop with a soft overshoot,
connectors draw left to right, scene changes slide up gently on the same background, nothing loops.
