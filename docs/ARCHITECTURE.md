# Architecture

## Stack (approved baseline)

- Expo (managed workflow), current SDK, current architecture (no legacy RN
  patterns).
- React Native + TypeScript, strict mode.
- expo-router for navigation (file-based).
- expo-sqlite for local relational data (favorites, history, scene phrase
  library) — introduced when Phase 1 wires real persistence.
- Zustand for local UI/app state, used only where it's actually needed
  (not a global store for everything).
- TanStack Query only for real remote/server state — i.e., translation
  requests to the backend proxy, once Phase 2 wires it. Not introduced in
  Phase 0, since there is no remote state yet.

Explicitly not used in MVP: PostgreSQL, Redis, authentication/user
accounts, microservices, Redux/MobX, any backend beyond the one stateless
proxy described below.

## Offline capability levels

The product must never let the user (or the UI) confuse these:

- **Level 1 — Bundled Offline Core Phrases.** Scene and Emergency phrase
  content shipped inside the app binary. Works with airplane mode enabled,
  from first launch, forever. No network call is ever made to display or
  read these phrases.
- **Level 2 — Local User Data.** Favorites, settings, and locally stored
  history. Read and written entirely on-device (expo-sqlite / local KV).
  Works offline because it never leaves the device.
- **Level 3 — Online Translation.** Free-text Chinese input translated via
  the backend proxy. Requires connectivity. When unavailable, the UI states
  this plainly (e.g., "No connection — showing offline phrases instead")
  and never presents a stale or fabricated result as a fresh translation.

Every screen belongs to exactly one of these levels in the user's mental
model, and the UI must make that level visible (e.g., a small "offline
ready" vs. "needs connection" indicator on Translate).

## Translation provider abstraction

The mobile app never calls a translation vendor directly. It calls an
internal interface:

```ts
interface TranslationProvider {
  translate(input: {
    text: string;
    tone: 'polite' | 'simple' | 'urgent';
    scene?: SceneId;
  }): Promise<{
    japanese: string;
    romaji: string;
    english?: string;
    source: 'live' | 'cache' | 'offline';
  }>;
}
```

Implementations (introduced in Phase 2, not Phase 0):
- `LlmTranslationProvider` — calls the backend proxy.
- `OfflinePhraseProvider` — matches against the bundled scene library.
- `CachingProvider` — decorator that returns a prior identical result with
  `source: 'cache'` instead of re-calling the live provider.

See `PROVIDER_DECISION.md` for the vendor comparison and MVP default.

## Backend

One lightweight, stateless serverless function (Cloudflare Worker,
preferred initial option) exposing `POST /translate`. Requirements:

- Provider API keys live only as Worker secrets — never in the mobile app,
  never committed to the repository.
- Separate `dev` and `production` environments/secrets from day one (e.g.,
  `wrangler.toml` environments), so a development key is never the
  production key.
- No database. No user accounts. Basic abuse/rate limiting only.
- The Worker itself implements the provider abstraction server-side too, so
  swapping vendors never requires a mobile app release.

The backend is not part of Phase 0 (Phase 0 has no network calls at all);
it is introduced in Phase 2.

## Folder structure

```
dorigo/
  app/                          # expo-router routes
    (tabs)/
      home.tsx
      translate.tsx
      scenes/
        index.tsx
        [sceneId].tsx
      favorites.tsx
      me.tsx
    emergency.tsx                # globally reachable modal route
    _layout.tsx
  src/
    features/
      translate/{components,hooks,providers}/
      scenes/{components,data}/
      favorites/
      emergency/
      settings/
    audio/                       # tts.ts, playback.ts (Phase 3+)
    storage/                     # db.ts, schema.ts, repositories/ (Phase 1+)
    state/                       # zustand stores
    design-system/               # tokens.ts, components/
    lib/                         # queryClient.ts (Phase 2+)
  backend/
    worker/                      # translate proxy (Phase 2+)
  assets/
    audio/                       # bundled audio (Phase 3+)
    images/
  content/
    scenes/*.json                # seed phrase content, see PROVIDER_DECISION.md / MVP_SCOPE.md
docs/
AUDIT.md
CLAUDE.md
```

Phase 0 creates the `app/`, `src/design-system/`, and top-level project
foundation only; directories marked with a later phase are created when
that phase actually starts, to avoid empty scaffolding that implies
unbuilt functionality is further along than it is.
