import type * as SQLiteTypes from 'expo-sqlite';

/**
 * Web platform stub.
 *
 * expo-sqlite's web backend (wa-sqlite/wasm) doesn't resolve under this
 * project's static web export (Metro can't find the .wasm asset it
 * imports) — a known bundling gap, not something this app's code can fix.
 * Since this product's actual targets are iOS and Android phones (see
 * AUDIT.md — "must eventually work on a physical iPhone and Android
 * device"; web is only a side effect of expo-router's default static web
 * output), Phase 1 scopes local persistence to native platforms and lets
 * web honestly report storage as unavailable rather than fighting wasm
 * bundling for a non-target platform. The existing "local storage
 * unavailable" UI fallback (Favorites, Me) covers this correctly.
 */
const initError = new Error('Local database is not available on web in this build.');

export function getDatabase(): SQLiteTypes.SQLiteDatabase {
  throw initError;
}

export function isDatabaseAvailable(): boolean {
  return false;
}

export function getDatabaseInitError(): Error | null {
  return initError;
}
