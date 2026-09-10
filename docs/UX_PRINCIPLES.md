# UX Principles

## Who we're designing for, at the moment of use

The user may be lost, tired, in pain, carrying luggage, standing in a noisy
station, unable to read Japanese, and unfamiliar with Japanese navigation
conventions. Every screen is designed for that person, not for a relaxed
person browsing an app store screenshot.

## Rules

- **Primary actions must be obvious** — one unmistakable next step per
  screen, expressed with size and position, not just color.
- **Large tap targets** — no control smaller than 44×44pt; primary actions
  are large enough to hit accurately while walking or one-handed.
- **Minimal text** — every label earns its place; no paragraphs where a
  phrase works, no instructions where an icon + word works.
- **Minimal decision-making** — do not present more than 3–4 primary choices
  on any one screen. Prefer a single hero action over a grid of equal
  options.
- **Strong visual hierarchy** — size, contrast, and position communicate
  importance before the user reads a single word.
- **Emergency is never hidden** — reachable from every screen, never behind
  a menu, never requiring more than one tap from anywhere in the app.
- **Thumb reachability** — primary actions sit in the lower two-thirds of
  the screen where a thumb naturally rests, not the top corners.
- **Avoid unnecessary backtracking** — a user should rarely need to go back
  more than one level to reach another useful action; cross-links (e.g.,
  Translate → relevant Scene) beat forcing a return to Home.

## The 3-second rule (primary acceptance principle)

A first-time user, from a cold app launch with no prior state, must be able
to identify and tap the primary Translate action within 3 seconds, with no
onboarding, login, or blocking dialog in the way. This is tested, not
assumed — see `QA.md`.

## Honesty over polish

A screen that looks finished but does nothing is worse than a screen that
plainly says "not available yet." Every not-yet-implemented capability is
labeled as such in the UI itself, not hidden behind a broken control. See
`ARCHITECTURE.md` for the three offline/online capability levels this
applies to most directly.
