import * as SQLite from 'expo-sqlite';

import { MIGRATIONS } from './schema';

const DATABASE_NAME = 'dorigo.db';

let database: SQLite.SQLiteDatabase | null = null;
let initError: Error | null = null;

function initialize(): SQLite.SQLiteDatabase {
  const db = SQLite.openDatabaseSync(DATABASE_NAME);
  db.execSync(MIGRATIONS);
  return db;
}

try {
  database = initialize();
} catch (error) {
  // Local storage must degrade honestly, never crash the app or silently
  // pretend to work. Callers check isDatabaseAvailable() / catch getDatabase().
  initError = error instanceof Error ? error : new Error('Unknown database initialization error');
  database = null;
}

/** Throws if the database failed to initialize — callers must handle this, never assume success. */
export function getDatabase(): SQLite.SQLiteDatabase {
  if (!database) {
    throw initError ?? new Error('Local database is not available');
  }
  return database;
}

export function isDatabaseAvailable(): boolean {
  return database !== null;
}

export function getDatabaseInitError(): Error | null {
  return initError;
}
