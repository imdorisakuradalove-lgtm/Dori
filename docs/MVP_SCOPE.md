# MVP Scope

This supersedes the scope discussion in `AUDIT.md` §3–4 with the finalized
decisions from the approved product review.

## In scope for MVP

- Expo/React Native/TypeScript app, expo-router navigation.
- 5 top-level destinations: Home, Translate, Scenes, Favorites, Me.
- A globally reachable Emergency entry point (not nested inside a tab).
- Original dark cosmic design system (no celebrity assets, no mascot
  resembling a real person).
- Real Chinese→Japanese translation for free-text input, via a
  provider-abstracted backend proxy (see `PROVIDER_DECISION.md`).
- Exactly 8 curated MVP scenes (below), offline-bundled.
- Local-only Favorites and Settings (no accounts, no sync).
- Real device TTS for translated text; bundled audio for emergency/scene
  phrases once recorded/generated (Phase 3+, not Phase 0).
- Three explicit offline capability levels (see `ARCHITECTURE.md`).

## Final MVP scene set (exactly these 8)

1. **Train / Station**
2. **Airport**
3. **Hotel**
4. **Restaurant / Food** — includes a dedicated **allergy communication**
   category as a high-priority subset (e.g., "I have a peanut allergy",
   "Does this contain egg?", "I cannot eat pork").
5. **Lost / Help / Directions**
6. **Shopping / Payment**
7. **Emergency / Medical**
8. **Event** — generic (concerts, live events, fan meetings, exhibitions,
   stage events, conventions). No celebrity- or fandom-specific content.
   Examples: "Where is the entrance?", "Where should I line up?", "Is this
   the correct line?", "Where can I buy merchandise?", "Can I take
   photos?", "Please help me contact staff."

Phrase quantity is intentionally minimized in favor of high-frequency,
genuinely useful phrases per scene. Full catalog expansion is V1.5.

## Explicitly deferred

**V1.5:** Voice Talk (STT), expanded scene catalog beyond the 8 above,
additional translation tones beyond Polite/Simple/Urgent, persisted full
history screen, music/audio ducking, deeper accessibility audit.

**V2 (gated on legal clearance + validated demand):** motivation/quote
layer, cosmic constellation visualization, any celebrity-inspired skin,
sharing/export, additional traveler languages.

## Accounts

None. No login, no registration, no phone number, no cloud sync anywhere in
MVP. The app must be fully usable on first launch with zero setup. Favorites,
settings, and history are stored on-device only.

## Phase 0 scope

See `AUDIT.md` §8 Phase 0 and the Phase 0 implementation report in the repo
history for exactly what was built. Phase 0 is UI foundation and navigation
only — no real translation, TTS, STT, or persistence wiring yet, and the UI
must never imply otherwise.
