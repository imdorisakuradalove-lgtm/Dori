# QA & Verification

## Principle

A feature is not done because code exists. It is done when it is
implemented, compiles, type-checks, passes relevant checks, the critical UI
flow works, failure behavior is handled, and it has actually been verified
— not assumed. Every phase report states plainly what was verified and what
was not, in this environment or otherwise. Never write "it should work";
write "verified" or "not verified" and why.

## Acceptance test plan (carried forward from `AUDIT.md` §10)

1. **3-second rule** — cold launch to a tap on the primary Translate action
   in under 3 seconds, no blocking onboarding.
2. **2-tap scene access** — Home to a specific scene's phrase list in ≤2
   taps.
3. **No-login utility** — fresh install, no account, Emergency/Scenes/
   Favorites fully usable, no blocking modal.
4. **Airplane-mode checklist** — airplane mode on → force-quit → relaunch →
   Home loads (no blank/infinite spinner) → Emergency opens instantly and
   its phrases display/copy → Scenes are browsable and phrases display/copy
   → Favorites display → Translate shows an explicit "no connection" state,
   never a fabricated result.
5. **Source labeling** — repeated identical Translate queries visibly
   distinguish live vs. cache vs. offline results.
6. **Error recovery** — a dropped network mid-request shows a plain-language
   message + Retry + a path to offline phrases within 2 seconds; no raw
   error code, no crash.
7. **Emergency independence** — a fresh install done entirely in airplane
   mode (never online) still has fully working Emergency phrases.
8. **TTS on physical device** — every scene/emergency Play control produces
   correct audible Japanese on one physical iPhone and one physical Android
   device (Phase 3+).
9. **Rapid-tap resilience** — 10 rapid taps on any action button in under 2
   seconds causes no duplicate state, no overlapping audio, no crash.
10. **Large-font mode** — the largest font setting keeps Home hero actions
    and Emergency phrases legible without truncation on the smallest
    supported screen.
11. **Permission denial** — denying microphone permission (Phase 5) keeps
    Voice Talk usable via a manual-text fallback, never a dead end.
12. **No fake completion** — code review confirms no UI path presents a
    mocked/stubbed result as a real translation, TTS, or STT outcome; any
    mock is confined to test files.

## What "verified" means per phase

Each phase report must state, explicitly:

- What was implemented (with file paths).
- What was verified, and how (build passed, `tsc` passed, lint passed,
  manual navigation walkthrough, physical-device test, etc.).
- What could **not** be verified in the current environment (e.g., no
  physical device, no simulator with a display, no network egress to a
  given vendor) and why.
- Any warnings, TODOs, or technical debt knowingly introduced.
- The exact next phase's scope, so nothing is silently started early.

## QA mindset

Actively try to break the product, not just confirm the happy path: no
network, slow network, empty input, very long input, rapid tapping,
permission denied, translation failure, TTS failure, app restart, offline
restart, airplane mode, empty favorites, largest font size.
