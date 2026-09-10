# DoriGo — Product & Technical Audit

Status: Pre-implementation audit per master brief §33. No application code has been
written. This document is the required deliverable before any scaffolding begins.

## 1. Executive Product Assessment

DoriGo is fundamentally sound as a utility-first travel-communication tool for
Chinese travelers in Japan. The specification is unusually mature for a
pre-code brief — it correctly identifies the core risk (feature creep into a
"fan app" or "language learning app") and pre-commits guardrails against it.
The biggest structural issue is that the brief bundles three products in one
spec: (1) a translation/phrase utility, (2) an emotional/motivational
"Dori-inspired" layer, and (3) an event-companion mode for concerts/fan
meetings. These have very different legal risk profiles, engineering
complexity, and value to a lost traveler at a train station. This audit
sequences them so the utility ships first and is never blocked by the other
two.

## 2. Biggest Product Problems

1. **Brand ambiguity/legal risk.** "Dori" association is unresolved rights-wise
   but is baked into the product name, mascot concept, motivation layer, and
   event mode. Risk of App Store rejection for implied celebrity endorsement,
   right-of-publicity issues, or a trademark dispute.
2. **Contradiction: "no login required" vs. a data model implying accounts.**
   Resolved below: local-first storage only in MVP, no accounts at all.
3. **Three translation paths (live AI, cached, offline canned phrases)** are
   specified but the reconciliation UX (how the user always knows the source)
   is underspecified. Addressed via an explicit provider abstraction and a
   visible source badge.
4. **Voice Talk is positioned as a Home hero action in the IA, but is flagged
   as technically difficult and realistically a Phase 5 feature.** Shipping a
   prominent button for a non-existent feature in MVP would violate the "never
   make a feature look functional when it is not" rule. Resolved: omitted from
   MVP Home entirely.
5. **Emergency actions ("call police/ambulance") need real tel: links** to
   Japan's 110/119, not just phrase cards — brief doesn't specify this but it's
   a near-free addition with high value.
6. **Constellation/gamification vs. the "no gamification" non-goal** is a
   mild self-contradiction; brief already resolves it by deferring — audit
   makes that explicit and gated.
7. **27 scenes at MVP scope is too much content** (phrases × tones × audio ×
   native-speaker review) for a first ship. Pruned to 8 highest-frequency
   scenes for MVP.
8. **4-language content pipeline (Chinese/Japanese/romaji/English) has real
   ops cost** not addressed in the brief — flagged as an open question.
9. **Audio ducking (TTS vs. music vs. recording) is real iOS/Android audio-
   session engineering**, correctly deferred to Phase 4/6.
10. **No mention of App Store metadata risk** — the app name/bundle ID/
    screenshots must not reference "Dori" until rights are confirmed,
    independent of in-app asset choices.
11. **No LLM cost/rate-limiting strategy** — addressed via caching + backend
    proxy rate limits.
12. **API keys must never ship in the client** — requires a minimal backend
    proxy, which the brief gestures at ("simple backend/service abstraction")
    but doesn't make explicit as a hard requirement.
13. **Privacy for voice/text sent to a third-party AI vendor, potentially
    across borders (Chinese traveler, Japan location, US-based vendor)**
    needs explicit minimal-retention design, not just a settings toggle.
14. **No backend was defined but the data model implies one** (`feedback`,
    `translation_records`) — resolved: no server-side database in MVP; a
    single stateless proxy function only.

## 3. Recommended MVP

Ship the smallest app that fulfills "TAP. SPEAK. SHOW. UNDERSTAND. KEEP
MOVING." with real backend translation for text, real offline emergency, and
zero faked features.

- Expo + React Native + TypeScript app shell; navigation: Home / Translate /
  Scenes / Favorites / Me, with Emergency globally reachable (not buried in a
  tab).
- Dark cosmic design system (original, no Dori-specific mascot required —
  can be re-skinned later if rights are secured).
- **Home:** One-Tap Translate hero, Emergency hero, 6–8 quick scenes,
  recents, favorites preview. No Voice Talk button yet.
- **Translate:** Chinese input → real LLM-backed provider abstraction →
  Japanese + romaji + optional English; 3 tones (Polite/Simple/Urgent);
  Play/Copy/Favorite/Regenerate; explicit live/cache/offline source badge.
- **Scenes:** 8 curated scenes (Airport, Train, Hotel, Restaurant,
  Convenience Store, Directions, Payment, Emergency) with human-reviewed,
  bundled offline phrases — this is also the offline library.
- **Favorites:** pinned/recent, local persistence, fully offline.
- **Emergency:** fully offline, no login, no network dependency, `tel:` links
  for 110/119, bundled (not live) audio.
- **TTS:** real device TTS for live translations; pre-rendered bundled audio
  for scene/emergency phrases.
- **Settings:** font size, theme (dark only for v1), volume, feedback link,
  version.
- **Backend:** one minimal stateless proxy (e.g., a single Cloudflare
  Worker) holding the provider API key and rate-limiting requests — no
  database, no accounts.

## 4. Features to Cut from MVP

**V1.5** (still utility-first):
- Voice Talk (STT) with manual-entry fallback
- Full 27-scene catalog (expand from 8)
- Generic Event Mode with custom labels
- Additional tones (Friendly, Casual, Official)
- Persisted full history screen
- Accounts + cloud sync
- Music/ambient sound with ducking
- Broader accessibility (VoiceOver/TalkBack) audit

**V2** (gated on legal clearance and validated demand):
- Motivation layer (original text only)
- Cosmic Constellation visualization
- Dori-inspired skin — only if rights are secured via signed license
- Original mascot/character IP investment
- Sharing/export of favorite phrase sets
- Additional traveler languages

## 5. Technical Architecture

- **Stack:** Expo (managed workflow), React Native, TypeScript (strict).
- **Navigation:** expo-router, file-based; tab navigator for the 5 top-level
  screens; Emergency as a globally-reachable modal/overlay route, not nested
  in a tab.
- **State:** Zustand for local UI/app state; TanStack Query for the one real
  server interaction (translation), giving retry/cache/loading handling and
  the live/cache source signal for free. No Redux/MobX.
- **Storage:** expo-sqlite for favorites/history/scene library (relational
  shape fits categories→phrases and gives real offline query guarantees);
  MMKV/AsyncStorage only for lightweight settings KV. Offline phrase library
  is bundled at build time, not populated by a first network call.
- **Translation provider abstraction:**
  `TranslationProvider.translate(input, {tone, scene}) → {japanese, romaji,
  english?, source: 'live'|'cache'|'offline'}` with `LLMTranslationProvider`,
  `OfflinePhraseProvider`, and a `CachingProvider` decorator. The app never
  talks to the LLM vendor directly — only to the backend proxy.
- **TTS:** expo-speech for live translations; pre-generated bundled audio
  files for scene/emergency phrases (guarantees zero runtime dependency for
  the phrases the brief says must never depend on network or AI).
- **STT (Phase 5, not MVP):** native speech recognition wrapped in a
  permission-gated hook with explicit idle/recording/processing/error states
  and a manual-text fallback.
- **Offline architecture:** one `useNetworkStatus` hook driving a global
  `isOnline` flag; only Translate reads it. Emergency/Scenes/Favorites never
  check network — they only ever read local SQLite, by construction.
- **Backend:** one serverless function (`POST /translate`) holding the LLM
  API key, doing basic rate-limiting/abuse protection. No server-side
  database or accounts in MVP.

## 6. Folder Structure

```
dorigo/
  app/                          # expo-router routes
    (tabs)/
      home/index.tsx
      translate/index.tsx
      scenes/index.tsx
      scenes/[sceneId].tsx
      favorites/index.tsx
      me/index.tsx
    emergency/index.tsx
    _layout.tsx
  src/
    features/
      translate/{components,hooks,providers}/
      scenes/{components,data}/
      favorites/
      emergency/
      settings/
    audio/ (tts.ts, playback.ts)
    storage/ (db.ts, schema.ts, repositories/)
    state/ (settingsStore.ts, networkStore.ts, appStore.ts)
    design-system/ (tokens.ts, components/)
    lib/ (queryClient.ts, analytics.ts)
  backend/
    worker/ (translate proxy, rate limiting)
  assets/
    audio/ (bundled emergency + scene audio)
    images/
  content/
    scenes/*.json (source-of-truth phrase content)
```

## 7. Data Architecture

Trimmed to what MVP needs, normalized, local-only (no server-side DB):

- `scene_categories(id, name, icon, sort_order)`
- `scene_phrases(id, category_id, zh_text, ja_text, romaji, tone,
  is_emergency, audio_asset_key)`
- `favorites(id, phrase_id?, custom_zh?, custom_ja?, custom_romaji?, note,
  pinned, category, created_at)`
- `history(id, zh_text, ja_text, romaji, tone, source, created_at)` — capped
  rotation (e.g. last 100)
- `user_settings(key, value)` — single flexible KV table instead of separate
  sound/music/theme tables

`translation_records` folds into `history`; `sound_preferences` /
`music_preferences` / `themes` fold into `user_settings`; `feedback` is not a
local table (sent directly to the backend, not stored on-device);
`motivation_events` deferred to V2.

## 8. Implementation Phases

**Phase 0 — Scaffolding & design system.** Bootable Expo/TS app, nav shell,
dark cosmic tokens, no real features. Verify: builds on iOS/Android
simulator, typecheck/lint pass.

**Phase 1 — Offline content (Scenes/Favorites/Emergency).** 8 human-reviewed
scenes, SQLite storage, `tel:` links for 110/119. Verify: full airplane-mode
checklist passes on simulator and one physical device.

**Phase 2 — Real translation.** Backend proxy + provider abstraction +
Translate screen. Verify: online and airplane-mode manual tests; no
infinite spinner on dropped network.

**Phase 3 — TTS playback.** Live-TTS + bundled audio wired everywhere.
Verify: required real-device test on iOS and Android.

**Phase 4 — Polish & accessibility.** Large-font mode, contrast audit, error
copy, rapid-tap guards. Verify: full acceptance test plan (§10).

**Phase 5 (V1.5) — Voice Talk (STT).** Verify: required physical-device test
in a genuinely noisy environment; permission-denied fallback confirmed.

**Phase 6 (V1.5) — Full scene catalog + Event Mode.**

**Phase 7 (V2, gated)** — Motivation layer, constellation, Dori-skin. Not
started without explicit legal clearance and go-ahead.

## 9. Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Dori Sakurada rights/likeness/trademark exposure | Medium | Critical | Ship MVP under an original name/mascot; treat Dori assets as gated V2 pending a signed license; no Dori reference in store metadata |
| Translation naturalness ("textbook Japanese") | High | High | Native-speaker review of seed content; prompt engineering for short/natural output; feedback loop |
| Politeness/tone mismatch causing offense | Medium | High | Default to polite tone; emergency phrases pre-fixed, never LLM-generated |
| TTS latency / missing ja-JP voice on device | Medium | Medium | Detect voice availability; bundle pre-rendered audio for critical phrases |
| STT accuracy in noisy environments | High | Medium | Always offer manual-text fallback; never block core flow on STT |
| Network unavailable / roaming abroad | High | Critical | Full offline-first architecture for Scenes/Favorites/Emergency; explicit "needs network" messaging for Translate |
| LLM API cost at scale | Medium | Medium | Caching layer + backend rate limiting; offline library absorbs repeat requests |
| API key leakage in client | Low (if avoided) | Critical | All LLM calls proxied through backend; no keys shipped in-app |
| Privacy: voice/text to third-party AI vendor, cross-border | Medium | High | Minimal retention, no persistent server logs by default, clear disclosure |
| China distribution licensing (ICP, content review) | Low–Medium | Medium–High | Flagged as open question; revisit if targeting China App Store |
| Performance/battery drain (audio + LLM calls) | Low | Medium | No background polling; audio sessions closed after use |
| Outdoor/sunlight readability of dark UI | Medium | Medium | Enforce high-contrast tokens (WCAG AA+) from day one |
| App Store rejection (implied endorsement, permissions) | Medium | High | No Dori assets in submission; clear mic permission strings |
| Scope creep into "fan app"/gamification | Medium | Medium | This MVP cut is the enforcement mechanism; V2 requires explicit approval |
| Content pipeline cost (4 languages × N phrases) | Medium | Medium | Start with 8 scenes only; treat expansion as a content-ops task |

## 10. Acceptance Test Plan

1. **3-second rule:** From cold launch, a first-time user taps the primary
   Translate action within 3 seconds; no onboarding blocks it.
2. **2-tap scene access:** Home → a specific scene phrase takes ≤2 taps.
3. **No-login utility:** Fresh install, no account, Emergency/Scenes/
   Favorites are fully usable with no blocking modal.
4. **Airplane-mode checklist:** enable airplane mode → force-quit → relaunch
   → Home loads, no blank/infinite spinner → Emergency opens instantly and
   plays/copies its 8 phrases → Scenes are searchable and playable →
   Favorites display and play → Translate shows an explicit "no connection"
   state, never a fake result.
5. **Source labeling:** 3 identical repeated queries show live, then cache,
   then cache/offline correctly, visible in the UI badge.
6. **Error recovery:** killing network mid-request shows a friendly message
   + Retry + "browse offline phrases" within 2 seconds, no raw error code,
   no crash.
7. **Emergency independence:** a fresh install done entirely in airplane
   mode (never online) still has working Emergency phrases and audio.
8. **TTS on physical device:** every scene/emergency Play button produces
   correct audible Japanese on one physical iPhone and one physical Android
   device.
9. **Rapid-tap resilience:** 10 rapid taps on Play/Translate/Favorite in <2s
   causes no duplicate favorites, no overlapping audio, no crash.
10. **Large-font mode:** largest font setting keeps Home hero actions and
    Emergency phrases legible without truncation on the smallest supported
    screen.
11. **Permission denial:** denying mic permission (Phase 5) keeps Voice Talk
    usable via a "type instead" fallback, never a dead end.
12. **No fake completion:** code review confirms no UI path presents a mocked
    result as a real translation; mocks are isolated to test files only.

## 11. Open Questions Requiring Your Decision

1. **Public brand name for store submission.** Assumed: ship MVP under a
   fully original name to eliminate legal risk until Dori rights are
   confirmed. Confirm, or say you want to keep "DoriGo" as an internal name
   while pursuing licensing separately.
2. **LLM/translation provider and budget.** Need to know which vendor to
   wire up first and whether there's a cost ceiling that should drive the
   backend proxy's default rate limits.
3. **Backend hosting preference.** Recommended a single Cloudflare Worker.
   If you already have AWS/GCP/Vercel infra or a preference, say so now.
4. **Distribution markets at launch.** Global Apple/Google stores only, or
   also Chinese Android stores / a China App Store presence? The latter
   carries distinct licensing requirements that would change scope.
5. **Content ops for the phrase library.** Someone needs to human-review the
   ~50–100 seed phrases (Japanese + romaji) for naturalness and politeness
   before bundling. Will you provide that review, or should an LLM first
   pass be generated for you to spot-check?

---

Per master brief §33/34, this concludes the audit. No application code has
been written and none will be until this plan is explicitly approved.
