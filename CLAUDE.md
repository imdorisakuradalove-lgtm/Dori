# CLAUDE.md

Guidance for Claude Code (and any engineer) working in this repository.

## What this is

A real-world communication survival tool for Chinese travelers in Japan who
do not speak Japanese. It answers: what should I say, how do I say it
naturally, how do I show/play it immediately, and how do I keep moving
without studying Japanese. It is **not** a language-learning app, dictionary,
generic AI chat app, or celebrity fan app. See `docs/PRODUCT.md`.

Full context lives in `AUDIT.md` (pre-implementation audit) and `docs/`. Read
`docs/MVP_SCOPE.md` and `docs/ARCHITECTURE.md` before adding any feature —
if it's not in MVP scope, it does not belong in this phase of the code.

## Hard rules (do not violate)

1. **No Dori Sakurada branding.** No name, likeness, photos, voice, music,
   trademarks, or wording implying endorsement/affiliation anywhere
   user-facing (UI copy, asset filenames, app store metadata, code comments).
   "DoriGo" is an internal codename only. See `docs/LEGAL_BRAND_SAFETY.md`.
2. **No accounts, no login, no registration, no cloud sync in MVP.** All
   user data (favorites, settings, history) is local-only.
3. **Never fake a feature.** If translation, TTS, or STT isn't wired up yet,
   the UI must say so plainly, not simulate success. Mocks are isolated to
   test files, never shipped in a user-facing path.
4. **Never embed a translation-provider API key in the mobile app.** All
   provider calls go through the backend proxy in `backend/worker`.
5. **Emergency must always work fully offline**, with no login and no
   network dependency, and must remain reachable from anywhere in the app.
6. **Offline capability levels must be visually honest.** See
   `docs/ARCHITECTURE.md` §Offline Levels — never claim online-only
   translation is available while offline.

## Stack

Expo (managed) + React Native + TypeScript (strict) + expo-router +
expo-sqlite + Zustand. TanStack Query only where real remote/server state
exists (translation calls) — do not add it mechanically. No Redux, no
PostgreSQL, no Redis, no microservices, no auth system in MVP.

## Repo layout

See `docs/ARCHITECTURE.md` for the full folder structure and rationale.

## Working process

- Follow the phase roadmap in `AUDIT.md` §8 / `docs/MVP_SCOPE.md`. Do not
  jump ahead to a later phase's feature without explicit approval.
- Before ending a phase, report what was implemented, what was verified,
  and what could not be verified in this environment (see `docs/QA.md`).
- Seed phrase content is DRAFT until a native/professional Japanese review
  has actually happened — never claim verification that didn't occur.
