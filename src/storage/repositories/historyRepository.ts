import { getDatabase } from '../db';

export type HistorySource = 'live' | 'cache' | 'offline';

export type HistoryRecord = {
  id: string;
  zh: string;
  ja: string;
  romaji: string;
  english?: string;
  tone: string;
  source: HistorySource;
  createdAt: number;
};

type HistoryRow = {
  id: string;
  zh: string;
  ja: string;
  romaji: string;
  english: string | null;
  tone: string;
  source: HistorySource;
  created_at: number;
};

function rowToRecord(row: HistoryRow): HistoryRecord {
  return {
    id: row.id,
    zh: row.zh,
    ja: row.ja,
    romaji: row.romaji,
    english: row.english ?? undefined,
    tone: row.tone,
    source: row.source,
    createdAt: row.created_at,
  };
}

/**
 * The history table exists from Phase 1 onward so the persistence
 * architecture doesn't change shape when Phase 2 adds live translation.
 * Nothing in the app calls recordHistoryEntry yet — see
 * docs/MVP_SCOPE.md. Do not call it with fabricated data.
 */
export function listHistory(): HistoryRecord[] {
  const db = getDatabase();
  const rows = db.getAllSync<HistoryRow>('SELECT * FROM history ORDER BY created_at DESC', []);
  return rows.map(rowToRecord);
}

export function recordHistoryEntry(entry: Omit<HistoryRecord, 'id' | 'createdAt'>): HistoryRecord {
  const db = getDatabase();
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const createdAt = Date.now();
  db.runSync(
    `INSERT INTO history (id, zh, ja, romaji, english, tone, source, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, entry.zh, entry.ja, entry.romaji, entry.english ?? null, entry.tone, entry.source, createdAt]
  );
  return { ...entry, id, createdAt };
}
