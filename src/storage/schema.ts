/**
 * Phase 1 schema. Only user-generated/local state lives in SQLite —
 * bundled scene/emergency phrase content stays in static TypeScript data
 * under src/features (see docs/ARCHITECTURE.md).
 *
 * `history` is created now so the persistence architecture doesn't change
 * shape in Phase 2, but nothing writes to it yet — see
 * src/storage/repositories/historyRepository.ts.
 */
export const MIGRATIONS = `
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS favorites (
  phrase_key TEXT PRIMARY KEY NOT NULL,
  scene_id TEXT,
  scene_title TEXT,
  zh TEXT NOT NULL,
  ja TEXT NOT NULL,
  romaji TEXT NOT NULL,
  english TEXT,
  tel TEXT,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS history (
  id TEXT PRIMARY KEY NOT NULL,
  zh TEXT NOT NULL,
  ja TEXT NOT NULL,
  romaji TEXT NOT NULL,
  english TEXT,
  tone TEXT NOT NULL,
  source TEXT NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS user_settings (
  key TEXT PRIMARY KEY NOT NULL,
  value TEXT NOT NULL
);
`;
