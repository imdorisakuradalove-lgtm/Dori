# Handoff — DoriGo / Pocket Talk

Written for a fresh Claude Code session with zero memory of prior
conversations. Read **`docs/PROJECT_INDEX.md` first** (the permanent
high-level map — purpose, phases, architecture, constraints), then this
file for the exact current state, then `CLAUDE.md` and `AUDIT.md` for
full context. This file changes every session; `PROJECT_INDEX.md` should
rarely need to.

## 1. Project goal and product purpose

A real-world communication survival tool for Chinese travelers in Japan
who do not speak Japanese. It answers: what should I say, how do I say it
naturally, how do I show/play it immediately, and how do I keep moving
without studying Japanese. It is explicitly **not** a language-learning
app, dictionary, generic AI chatbot, or celebrity fan app. Full product
reasoning is in `AUDIT.md` and `docs/PRODUCT.md`.

"Dori" (as in "DoriGo") is an internal codename only, inspired by a real
person (Dori Sakurada) whose name/likeness/assets this project has no
rights to use. Public-facing branding must stay fully original — see
`docs/LEGAL_BRAND_SAFETY.md`. This is a hard rule, not a suggestion.

## 2. Current development phase

**Phase 1 is code-complete and committed. Phase 1.1 (real-device
acceptance testing) is IN PROGRESS, NOT COMPLETE.**

The user is a non-programmer testing on their own iPhone via Expo Go. The
most recent session walked them through Step 1 of a sequential,
one-step-at-a-time device bring-up (`npm install`) and was waiting on
their reported result when this handoff was requested. **No test result
was ever received — Phase 1.1 device testing has not actually started
running yet, let alone passed.**

Phase 2 (real translation backend) has explicitly **not** been started and
must not be started next. See §13.

## 3. What has been completed

- **Phase 0:** Expo/TypeScript/expo-router app foundation, original dark
  cosmic design system, 5-tab navigation (Home/Translate/Scenes/
  Favorites/Me) plus a globally-reachable Emergency modal route, honest
  screen shells (no faked AI/TTS/STT anywhere).
- **Phase 1:** Real offline persistence via expo-sqlite — favorites (with
  duplicate-proof schema), settings (font size), and a ready-but-empty
  history table for Phase 2. Zustand stores with optimistic updates and
  rollback on failure. Web platform explicitly stubbed as
  storage-unavailable (see §11).
- **Phase 1.1:** Repository inspected for real-device (Expo Go)
  readiness; concluded no custom dev build is needed; wrote
  `docs/DEVICE_TESTING.md` and walked the user through the first step of
  bringing the app up on their iPhone.
- All seven product/architecture docs required by the approved brief
  exist in `docs/`, plus `AUDIT.md` and `CLAUDE.md` at the repo root, plus
  `docs/DEVICE_TESTING.md` (Phase 1.1) and now `docs/PROJECT_INDEX.md` +
  this file for cross-session continuity. Full list with descriptions:
  `docs/PROJECT_INDEX.md`'s documentation map.

## 4. What was changed in this (repository organization) session

Documentation-only reorganization for cross-session continuity. No
application code, configuration, or product scope was touched — this
session ran `git status`/`git log`/file inspection, then created
`docs/PROJECT_INDEX.md` (the permanent high-level map) and refreshed this
file. No device testing happened in this session — the Phase 1.1 device
test state described below is unchanged from before this session started.

## 5. Files created or modified in this session

- **Created:** `docs/PROJECT_INDEX.md`.
- **Modified:** `docs/HANDOFF.md` (this file — refreshed pointers and
  session-specific sections; the substantive Phase 1.1 state in §2, §9,
  §10, §13 is carried over unchanged because nothing about it changed).

(For the full history of what earlier sessions changed, see the commit
log in §7 — each commit message describes that commit's own scope.)

## 6. Git status (at time of writing this handoff)

Before this session's documentation commit, the tree was clean at
`d8d6183`. This session adds `docs/PROJECT_INDEX.md` and modifies
`docs/HANDOFF.md`, then commits and pushes them together as one
documentation-only commit. Run `git status` and `git log --oneline -3` to
see the actual current state — do not trust a hash written here over the
live output of those commands.

## 7. Current branch and latest commit

- Branch: `claude/dorigo-audit-r055nk`
- Commit history (oldest → newest) as of this session:
  1. `c2fa843` — Product/technical audit (`AUDIT.md`)
  2. `118d6ff` — Phase 0: project docs and app foundation
  3. `5900bfb` — Phase 1: real offline persistence for favorites and settings
  4. `b1050e4` — Phase 1.1: device testing guide (docs only)
  5. `d8d6183` — First handoff document (docs only)
  6. *(this session)* — repository continuity docs: adds
     `docs/PROJECT_INDEX.md`, refreshes this file (docs only)

Run `git log --oneline -3` for the exact current hash — this list is a
summary, not a substitute for checking live state.

## 8. What has been verified

- TypeScript (`npx tsc --noEmit`) — clean, no errors, as of the Phase 1
  commit.
- ESLint (`npx eslint .`, `eslint-config-expo` flat config) — clean.
- `npx expo export` for **web, iOS, and Android** — all three bundle
  successfully as of the Phase 1 commit.
- SQL logic (schema constraints, duplicate-prevention, upsert, simulated
  restart, corrupted-file handling) — verified via a one-off Node script
  using Node's **built-in `node:sqlite`** module (same underlying SQLite
  engine, **different JS binding** from the actual `expo-sqlite` runtime
  this app uses). All 11 scripted checks passed. This is a proxy for the
  real thing, not the real thing.
- Repo configuration for Expo Go compatibility (SDK version, no
  `ios/`/`android/` folders, no `eas.json`, no `expo-dev-client`, no
  native config plugins beyond `expo-router`/`expo-splash-screen`) —
  inspected directly, confirmed clean.

## 9. What has NOT been verified

- **Nothing in this app has ever been run on a real device, a simulator,
  or even inside Expo Go once.** No human has tapped a single screen.
- The actual `expo-sqlite` native binding's behavior on iOS/Android
  (favorites persisting across restart, no duplicates, no init-failure
  crash) — only proxy-tested via a different SQLite binding, see §8.
- Real airplane-mode behavior, real `tel:` dialing, real clipboard copy,
  real font-size rendering, actual tap targets, the "3-second rule."
- Whether Expo Go on SDK 57 actually loads this project without error —
  the most recent session got the user as far as being told to run
  `npm install` and was waiting for their result. **That result was never
  reported.** Do not assume it succeeded or failed — ask.

## 10. Known bugs, risks, technical debt, and limitations

No known bugs — nothing has failed yet, because nothing has been run for
real. Known risks/limitations, most significant first:

1. **expo-sqlite on a real device is entirely unverified.** This is the
   single biggest open risk carried into Phase 1.1.
2. **Web platform has no real persistence at all.** `src/storage/db.web.ts`
   is a deliberate stub — expo-sqlite's web (wasm) backend doesn't
   bundle under this project's static web export (a Metro/asset
   resolution gap, not something fixable in app code). Favorites/Settings
   correctly show "storage unavailable" on web. This is a documented,
   deliberate scope decision (web is not this product's target platform),
   not a bug to fix.
3. **`react-native-reanimated` is imported in `app/_layout.tsx` but not
   actually used for any animation.** Harmless template leftover, flagged
   for awareness, not urgent to remove.
4. **Emergency phrases are not favoritable** — deliberate scope decision
   to keep that screen minimal, not an oversight.
5. **Font size setting only affects one preview label** (in the Me
   screen) — it is not applied app-wide. Deliberate, to avoid a visual
   redesign outside Phase 1 scope.
6. **History table exists but nothing writes to it yet** — correct and
   intentional; Phase 2 will populate it from real translations.
7. **Zustand store rollback-on-write-failure logic verified only by code
   review**, not by an executable test.
8. As of Expo SDK 57, Expo Go requires logging into the **same Expo
   account** on both the CLI and the Expo Go app before it will load any
   project at all. This is an Expo platform change, not specific to this
   app, but it is a real step in the device-testing flow — see
   `docs/DEVICE_TESTING.md`.

## 11. Important architectural decisions already made

- **Stack:** Expo (managed workflow, no prebuild/`ios`/`android` folders),
  React Native, TypeScript strict, expo-router (file-based nav),
  expo-sqlite (local persistence), Zustand (local UI/app state). TanStack
  Query is planned for Phase 2's real server state only — not installed
  yet.
- **No accounts, no login, no registration, no cloud sync anywhere in
  MVP.** All user data (favorites, settings, history) is local-only.
- **Three explicit offline capability levels** (see
  `docs/ARCHITECTURE.md`): Level 1 bundled phrases (Scenes, Emergency,
  works offline from first launch), Level 2 local user data (Favorites,
  Settings — SQLite), Level 3 online translation (Phase 2, requires
  network, must never be faked as working offline).
- **Translation provider abstraction is designed but not implemented.**
  See `docs/PROVIDER_DECISION.md` — Claude API recommended as the MVP
  default, called only from a future backend proxy, never directly from
  the mobile app.
- **Exactly 8 MVP scenes**, fixed set, see `docs/MVP_SCOPE.md`: Train/
  Station, Airport, Hotel, Restaurant/Food (with an Allergy category),
  Lost/Help/Directions, Shopping/Payment, Emergency/Medical, Event
  (generic, no celebrity/fandom content).
- **No Dori Sakurada branding anywhere user-facing.** Public app name is
  currently the placeholder "Pocket Talk" (`app.json`).
- **Never fake a feature.** Every not-yet-implemented capability
  (Translate, TTS, STT) says so plainly in the UI rather than simulating
  success. This has been followed strictly through Phase 1 — verify any
  new work continues to follow it.
- **Seed phrase content is DRAFT**, explicitly labeled as such in the UI,
  pending a real native/professional Japanese review that has not
  happened yet.

## 12. Decisions that must NOT be reversed without discussion

- Do not add the Dori Sakurada name, likeness, voice, or any official
  asset to any user-facing surface.
- Do not add accounts, login, registration, or cloud sync without the
  user's explicit sign-off — this has been stated as a hard MVP rule
  multiple times.
- Do not claim a feature works (translation, TTS, STT, persistence) if it
  doesn't — this project has a strong, repeatedly-stated aversion to
  faked functionality.
- Do not start Phase 2 (translation/backend/TTS/STT) — the user has
  explicitly gated this behind a passed real-device acceptance test for
  Phase 1, which has not happened yet.
- Do not add `expo-dev-client`, run `expo prebuild`, or configure EAS
  unless a concrete, reproduced blocking bug proves Expo Go is
  insufficient (none has been found — this has not been needed so far).
- Do not change the 8 fixed MVP scenes or the "no gamification/no
  celebrity Event content" rule without the user's sign-off.

## 13. Exact recommended next step

**Resume the real-device acceptance test exactly where it left off.**

Ask the user for the result of Step 1 (`npm install` in their project
folder). Do not re-explain the whole setup from scratch and do not skip
ahead — the user explicitly asked for one step at a time, waiting for
their reported result before giving the next step, and asked that any
error be pasted verbatim rather than guessed at or fixed blindly.

The full planned step sequence (from the user's own instructions) is:
1. dependency installation (`npm install`) — **in progress, awaiting result**
2. Expo authentication if required (`npx expo login`)
3. Expo dev server (`npx expo start`)
4. opening the app in Expo Go
5. fresh launch test
6. favorite persistence test
7. force-close/reopen persistence test
8. font-size persistence test
9. airplane-mode offline tests
10. emergency call-link test
11. online/offline indicator recovery test
12. rapid favorite-tap integrity test

At the end, the user wants a concise PASS/FAIL report: each test result,
any discovered bug with severity, whether Phase 1 should be accepted, and
whether it's safe to begin Phase 2. **Do not implement fixes
automatically** if a bug is found during acceptance testing — explain the
bug and ask before touching code.

## 14. Numbered plan for the next session

1. Read `docs/PROJECT_INDEX.md`, then this file, then `CLAUDE.md` and
   `AUDIT.md` — do not assume prior context.
2. Confirm current repo state (`git status`, `git log -5`) matches what's
   documented here before touching anything.
3. Ask the user for the Step 1 (`npm install`) result if not already
   provided in their next message.
4. Continue the 12-step device test sequence above, one step at a time,
   waiting for the user's reported result after each step — this is a
   non-programmer, be extremely literal and concrete per
   `docs/DEVICE_TESTING.md`'s instruction style.
5. If any step fails: ask for the exact error text/screenshot, classify
   it (account/login, network/LAN, SDK mismatch, JS bundling, native
   module, SQLite runtime, or app logic/UI — categories already given to
   the user previously), and propose a fix rather than applying one
   silently. Wait for explicit approval before editing code.
6. Once all 12 steps are done, produce the PASS/FAIL report described in
   §13.
7. Only if Phase 1 is explicitly accepted by the user should Phase 2
   scoping begin — and only after asking, not assuming.

## 15. Commands the next session should run first

```
git status
git log --oneline -5
cat docs/HANDOFF.md   # this file — already read if you're here
```

No build, install, or test commands need to run automatically — the next
session should ask the user for their actual device-test result before
running anything on their behalf, since they are executing commands on
their own computer, not this environment.
