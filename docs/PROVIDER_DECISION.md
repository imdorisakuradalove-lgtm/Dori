# Translation Provider Decision

## Constraint

The mobile app must never call a translation vendor directly — it calls the
internal `TranslationProvider` interface defined in `ARCHITECTURE.md`,
implemented server-side in the backend proxy. This document decides only
which vendor sits behind that interface for MVP; it is not an architectural
lock-in, and swapping vendors later requires no mobile app change.

This comparison is a reasoned engineering judgment based on each vendor's
known product characteristics and public documentation, not a benchmarked
study run against this app's actual traffic. Real-world quality/latency
should be spot-checked against the seed phrases in `content/scenes/` once
Phase 2 wires the backend, and this document updated with actual findings.

## Candidates considered

- **Anthropic Claude API** (general-purpose LLM, used as a translation/
  rewriting task)
- **OpenAI GPT-4o / GPT-4o-mini** (general-purpose LLM, same usage pattern)
- **Google Cloud Translation API (NMT)** and/or **Gemini**
- **DeepL API** (dedicated translation engine, Japanese supported)
- **Baidu Translate API** (China-based dedicated translation engine)

## Comparison

| Criterion | Claude | GPT-4o(-mini) | Google (NMT/Gemini) | DeepL | Baidu Translate |
|---|---|---|---|---|---|
| Natural, non-literal Japanese | Strong — LLMs handle register/politeness/rewriting well | Strong, comparable to Claude | NMT: weaker at politeness nuance; Gemini: comparable to LLM peers | Strong for general fluency, less situational-tone control | Weaker for natural/polite JP phrasing; optimized for literal accuracy |
| Contextual/scene understanding (tone, intent, urgency) | Strong — can be given scene/tone in the prompt and reason about it | Strong, same mechanism | NMT: none (pure MT, no context input); Gemini: strong | Limited — formality parameter exists but no free-form scene reasoning | Limited, similar to NMT |
| Latency | Moderate (structured JSON output adds a small a nount of overhead) | Comparable to Claude | NMT: very fast; Gemini: comparable to LLM peers | Fast (purpose-built MT) | Fast (purpose-built MT) |
| API cost at this scale (short phrases, per-request) | Moderate, usage-based | Comparable; -mini tier cheaper | NMT: very cheap per character; Gemini: comparable to LLM peers | Moderate, per-character | Cheap |
| Reliability / uptime track record | Good | Good | Good | Good | Unverified for this team's traffic; less operational history internationally |
| Operational complexity | Low — one HTTP call, prompt-controlled output shape | Low, same shape | NMT: very low, but two-step (needs a separate LLM pass for politeness/tone if used alone); Gemini: low | Low | Low, but requires separate account/region setup |
| China/Japan accessibility | Reachable from Japan; not guaranteed reachable from mainland China without a VPN | Same as Claude | Reachable from Japan; Google services are often restricted inside mainland China | Reachable from Japan; DeepL is also often restricted inside mainland China | Reachable from both mainland China and Japan without a VPN |

Note on the China-accessibility row: this app's actual usage happens while
the traveler is physically in Japan (using Japanese mobile networks or
Japan-based Wi-Fi), so mainland-China network restrictions are not expected
to be the primary constraint for MVP. It becomes materially relevant only
if the app is also meant to be usable for trip-planning before departure
from mainland China, which is out of MVP scope. Revisit if that changes.

## Recommendation

1. **MVP default: Anthropic Claude API**, called from the backend proxy.
   Rationale: this product's core differentiator is natural, contextually
   appropriate, appropriately-polite Japanese for a specific real-world
   scene and urgency — not literal machine translation. That is exactly
   the task general-purpose LLMs are strong at and dedicated MT engines
   (Google NMT, DeepL, Baidu) are weak at, since they don't reason about
   scene/tone, only translate text. Claude is a reasonable first choice
   given the team's existing tooling; GPT-4o is an equally valid
   alternative and can be swapped in behind the same interface without
   any mobile-app change if cost, latency, or quality testing favors it.

2. **Future fallback strategy:** if the live LLM provider is unavailable or
   over quota, the backend/app falls back to the bundled
   `OfflinePhraseProvider` (Level 1 content) rather than to a second live
   vendor. A second-vendor failover is explicitly **not** built in Phase 2
   — it is unnecessary operational complexity for MVP scale, and the
   product already has an honest, offline-capable fallback path by design.
   If live-provider outages become a measured problem post-launch, the
   provider abstraction already supports adding a secondary live vendor
   without further architectural change.

## What is explicitly not done in Phase 0 or Phase 2

- No multi-provider routing/voting logic.
- No client-side provider selection.
- No hard dependency on any one vendor's SDK inside `src/features/translate`
  — only the internal `TranslationProvider` interface is imported there.
