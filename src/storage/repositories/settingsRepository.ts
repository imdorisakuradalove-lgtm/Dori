import { getDatabase } from '../db';

export function getSetting(key: string): string | undefined {
  const db = getDatabase();
  const row = db.getFirstSync<{ value: string }>('SELECT value FROM user_settings WHERE key = ?', [key]);
  return row?.value;
}

export function setSetting(key: string, value: string): void {
  const db = getDatabase();
  db.runSync(
    `INSERT INTO user_settings (key, value) VALUES (?, ?)
     ON CONFLICT(key) DO UPDATE SET value = excluded.value`,
    [key, value]
  );
}
