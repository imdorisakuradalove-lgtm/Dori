# Project Index — DoriGo / Pocket Talk

The permanent high-level map of this project. This file describes what is
generally true across sessions; it does not change often. For "what
happened most recently and what to do next," read `docs/HANDOFF.md`
instead — that file changes every session, this one shouldn't need to.

## Project purpose

A real-world communication survival tool for Chinese travelers in Japan
who do not speak Japanese. Core promise: **tap, speak, show, understand,
keep moving** — never "study Japanese first." It is explicitly not a
language-learning app, dictionary, generic AI chatbot, or celebrity fan
app. Full reasoning: `AUDIT.md`, `docs/PRODUCT.md`.

"DoriGo" is an internal codename only, inspired by a real person (Dori
Sakurada) whose name/likeness/assets this project has no rights to use.
The current public-facing placeholder name is **"Pocket Talk"**
(`app.json`). See `docs/LEGAL_BRAND_SAFETY.md` — this is a hard
constraint, not a style choice.

## Target users

Primary: Chinese travelers visiting Japan with little or no Japanese,
often under time pressure, possibly tired, stressed, or lost, wanting to
solve one concrete situation right now (station, hotel, restaurant,
shopping, an event, an emergency) without any learning curve. Secondary:
other first-time Japan travelers, solo travelers, event/concert
attendees, older travelers, and people who become overwhelmed under
navigation pressure. Full detail: `AUDIT.md` §4.

## Current MVP definition

Fixed at 8 curated scenes, no accounts, no cloud sync, local-first
persistence, real (not faked) translation planned but not yet built. Full
authoritative scope: **`docs/MVP_SCOPE.md`** — treat that file as the
source of truth for what is and isn't in MVP; do not infer scope from
code alone.

Explicitly out of MVP: Voice Talk (STT), the full 27-scene catalog,
extra translation tones beyond Polite/Simple/Urgent, accounts/sync,
music/ducking, motivation layer, cosmic constellation, any Dori-branded
skin.

## Current development phase

**Phase 1 (offline persistence) is code-complete and committed. Phase 1.1
(real-device acceptance testing on the user's own iPhone via Expo Go) is
IN PROGRESS, NOT COMPLETE — no test result has been received yet.**
Phase 2 (real translation) has not been started. See `docs/HANDOFF.md`
for the exact current state and next step.

## Completed phases

- **Phase 0** — Expo/TypeScript/expo-router foundation, original dark
  cosmic design system, 5-tab navigation + globally-reachable Emergency
  route, honest screen shells with no faked functionality anywhere.
- **Phase 1** — Real local persistence via expo-sqlite: favorites
  (duplicate-proof schema), settings (font size), and a ready-but-empty
  history table reserved for Phase 2. Zustand stores with optimistic
  updates and rollback on write failure.
- **Phase 1.1 (in progress)** — Repository verified as Expo-Go-ready (no
  custom dev build needed); device-testing guide written; user walked
  through the first step of a 12-step manual device acceptance test,
  awaiting their result.

## Upcoming phases (not started, do not begin without explicit approval)

1. **Phase 2 — Real translation.** Backend proxy (`backend/worker`,
   not yet created) + `TranslationProvider` abstraction + wiring the
   Translate screen to a live Chinese→Japanese call + writing real
   entries to the already-ready `history` table.
2. **Phase 3 — TTS playback**, real-device verified.
3. **Phase 5 — Voice Talk (STT)**, with mandatory manual-entry fallback.
4. **Phase 6 — Full scene catalog + generic Event Mode expansion.**
5. **Phase 7 (gated)** — Motivation layer, cosmic constellation, any
   Dori-inspired skin — gated on legal clearance and validated demand,
   never started unilaterally.

Full phase roadmap and acceptance criteria: `AUDIT.md` §8, §10.

## Key architecture decisions

- **Stack:** Expo (managed workflow — no `ios/`/`android/` folders, no
  prebuild has ever run), React Native, TypeScript (strict), expo-router
  (file-based nav), expo-sqlite (local persistence), Zustand (local
  UI/app state). TanStack Query is reserved for Phase 2's real
  server/network state only — not installed yet, do not add it early.
- **No backend exists yet.** When Phase 2 adds one, it must be a single
  lightweight stateless serverless proxy (Cloudflare Worker preferred) —
  no database, no accounts, no microservices. Provider API keys must
  never be embedded in the mobile app.
- **Translation provider abstraction is designed but not implemented.**
  See `docs/PROVIDER_DECISION.md` — Claude API is the recommended MVP
  default, called only from the future backend proxy.
- **Three explicit offline capability levels** (`docs/ARCHITECTURE.md`):
  Level 1 bundled phrases (Scenes, Emergency — work offline from first
  launch), Level 2 local user data (Favorites, Settings — SQLite), Level
  3 online translation (Phase 2, requires network, must never be
  presented as available offline).
- **Web platform has no real persistence** — `src/storage/db.web.ts` is a
  deliberate stub because expo-sqlite's web/wasm backend doesn't bundle
  under this project's static web export. Web is not a target platform
  for this product; this is accepted, not a bug to fix.

## Important product constraints

- No accounts, no login, no registration, no phone number, no cloud sync
  anywhere in MVP. Everything (favorites, settings, history) is
  on-device only.
- Never fake a feature. If translation, TTS, or STT isn't wired up, the
  UI says so plainly — this has been followed strictly and must continue.
- Emergency must always work fully offline, with no login, reachable from
  anywhere in the app in one tap.
- Exactly 8 fixed MVP scenes (Train/Station, Airport, Hotel, Restaurant/
  Food incl. an Allergy category, Lost/Help/Directions, Shopping/
  Payment, Emergency/Medical, generic Event) — do not add, remove, or
  reshape this list without the user's sign-off.
- Seed phrase content is DRAFT, labeled as such in the UI, pending a
  native/professional Japanese review that has not happened.
- No gamification, no celebrity- or fandom-specific Event content.

## Important legal/brand constraints

- No Dori Sakurada name, likeness, photos, voice, music, trademarks, or
  wording implying endorsement/affiliation anywhere user-facing — UI
  copy, asset filenames, app store metadata, code comments included.
  "DoriGo" stays an internal codename only. Full detail:
  `docs/LEGAL_BRAND_SAFETY.md`.
- Any Dori-inspired emotional register (freedom, cosmic atmosphere, stage
  energy, etc.) may only be expressed through fully original visual
  design and copy — never through a celebrity-resembling mascot.
- Distribution-market legal requirements (e.g. a China app store
  presence) are an open question requiring a human legal decision — not
  an engineering call. See `AUDIT.md` §11.

## Documentation map

| File | Purpose |
|---|---|
| `AUDIT.md` | Original pre-implementation product & technical audit — MVP cut, architecture, phased roadmap, risk register, acceptance tests |
| `CLAUDE.md` | Hard rules and working process for anyone (human or Claude) coding in this repo |
| `docs/PROJECT_INDEX.md` | This file — the permanent high-level map |
| `docs/HANDOFF.md` | Exact current state and next step — read this every session, it changes often |
| `docs/PRODUCT.md` | Product positioning, what this is/isn't, priority order |
| `docs/MVP_SCOPE.md` | Authoritative MVP feature scope, the 8 fixed scenes, what's deferred |
| `docs/UX_PRINCIPLES.md` | Design rules for a stressed/lost traveler, the 3-second rule |
| `docs/ARCHITECTURE.md` | Stack, offline capability levels, folder structure, provider interface |
| `docs/PROVIDER_DECISION.md` | Translation vendor comparison and MVP recommendation (Phase 2) |
| `docs/QA.md` | Acceptance test plan and verification standard ("verified" vs "not verified") |
| `docs/LEGAL_BRAND_SAFETY.md` | Brand/IP rules — what must never ship |
| `docs/DEVICE_TESTING.md` | Step-by-step Expo Go real-device testing guide for a non-programmer |

## Current branch

`claude/dorigo-audit-r055nk` — all work to date lives here. See
`docs/HANDOFF.md` for the latest commit hash and exact git status.

## How a new Claude Code session should orient itself

1. Read this file first, then `docs/HANDOFF.md` for the current state.
2. Skim `CLAUDE.md` for hard rules and `AUDIT.md` for full product/
   technical context if anything here is unclear.
3. Run `git status` and `git log --oneline -5` and confirm they match
   what `docs/HANDOFF.md` says before changing anything.
4. Do not assume any phase beyond what `docs/HANDOFF.md` states as
   complete has actually been done, and do not assume anything has been
   verified on a real device unless `docs/HANDOFF.md` explicitly says so.
5. Do not start a new phase or expand scope without the user's explicit
   sign-off — this project has been developed under strict phase gating
   the whole way through, and that pattern should continue.
