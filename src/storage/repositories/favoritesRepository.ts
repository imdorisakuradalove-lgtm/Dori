import { getDatabase } from '../db';

export type FavoriteRecord = {
  phraseKey: string;
  sceneId?: string;
  sceneTitle?: string;
  zh: string;
  ja: string;
  romaji: string;
  english?: string;
  tel?: string;
  createdAt: number;
};

export type NewFavorite = Omit<FavoriteRecord, 'createdAt'>;

type FavoriteRow = {
  phrase_key: string;
  scene_id: string | null;
  scene_title: string | null;
  zh: string;
  ja: string;
  romaji: string;
  english: string | null;
  tel: string | null;
  created_at: number;
};

function rowToRecord(row: FavoriteRow): FavoriteRecord {
  return {
    phraseKey: row.phrase_key,
    sceneId: row.scene_id ?? undefined,
    sceneTitle: row.scene_title ?? undefined,
    zh: row.zh,
    ja: row.ja,
    romaji: row.romaji,
    english: row.english ?? undefined,
    tel: row.tel ?? undefined,
    createdAt: row.created_at,
  };
}

export function listFavorites(): FavoriteRecord[] {
  const db = getDatabase();
  const rows = db.getAllSync<FavoriteRow>('SELECT * FROM favorites ORDER BY created_at DESC', []);
  return rows.map(rowToRecord);
}

/**
 * Insert-or-ignore keyed on phrase_key — the PRIMARY KEY constraint makes a
 * duplicate favorite impossible at the database level, independent of
 * whatever the UI already checked.
 */
export function addFavorite(record: NewFavorite): FavoriteRecord {
  const db = getDatabase();
  const createdAt = Date.now();
  db.runSync(
    `INSERT INTO favorites (phrase_key, scene_id, scene_title, zh, ja, romaji, english, tel, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(phrase_key) DO NOTHING`,
    [
      record.phraseKey,
      record.sceneId ?? null,
      record.sceneTitle ?? null,
      record.zh,
      record.ja,
      record.romaji,
      record.english ?? null,
      record.tel ?? null,
      createdAt,
    ]
  );
  return { ...record, createdAt };
}

export function removeFavorite(phraseKey: string): void {
  const db = getDatabase();
  db.runSync('DELETE FROM favorites WHERE phrase_key = ?', [phraseKey]);
}
