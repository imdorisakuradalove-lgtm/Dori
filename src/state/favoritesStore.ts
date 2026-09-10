import { create } from 'zustand';

import { isDatabaseAvailable } from '@/src/storage/db';
import {
  addFavorite,
  type FavoriteRecord,
  listFavorites,
  type NewFavorite,
  removeFavorite,
} from '@/src/storage/repositories/favoritesRepository';

type FavoritesState = {
  favorites: FavoriteRecord[];
  /** False if the local database failed to initialize — favoriting is disabled honestly rather than pretending to work. */
  storageAvailable: boolean;
  toggleFavorite: (record: NewFavorite) => void;
  removeFavoriteByKey: (phraseKey: string) => void;
};

function loadInitialFavorites(): FavoriteRecord[] {
  if (!isDatabaseAvailable()) return [];
  try {
    return listFavorites();
  } catch {
    return [];
  }
}

/**
 * expo-sqlite's sync API means every operation here completes before the
 * calling event handler returns — there is no async gap for a rapid
 * double-tap to race against, so the store update and the database write
 * are effectively atomic from the UI's perspective. State updates are
 * still applied optimistically first and rolled back on failure so a
 * write error never leaves the UI showing something the database doesn't
 * have.
 */
export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: loadInitialFavorites(),
  storageAvailable: isDatabaseAvailable(),

  toggleFavorite: (record) => {
    if (!get().storageAvailable) return;

    const alreadyFavorited = get().favorites.some((f) => f.phraseKey === record.phraseKey);

    if (alreadyFavorited) {
      const previous = get().favorites;
      set({ favorites: previous.filter((f) => f.phraseKey !== record.phraseKey) });
      try {
        removeFavorite(record.phraseKey);
      } catch {
        set({ favorites: previous });
      }
      return;
    }

    const optimistic: FavoriteRecord = { ...record, createdAt: Date.now() };
    const previous = get().favorites;
    set({ favorites: [optimistic, ...previous] });
    try {
      const saved = addFavorite(record);
      set({
        favorites: [saved, ...previous].sort((a, b) => b.createdAt - a.createdAt),
      });
    } catch {
      set({ favorites: previous });
    }
  },

  removeFavoriteByKey: (phraseKey) => {
    if (!get().storageAvailable) return;
    const previous = get().favorites;
    set({ favorites: previous.filter((f) => f.phraseKey !== phraseKey) });
    try {
      removeFavorite(phraseKey);
    } catch {
      set({ favorites: previous });
    }
  },
}));
