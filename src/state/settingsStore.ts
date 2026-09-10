import { create } from 'zustand';

import { isDatabaseAvailable } from '@/src/storage/db';
import { getSetting, setSetting } from '@/src/storage/repositories/settingsRepository';

export type FontSize = 'default' | 'large';

const FONT_SIZE_KEY = 'font_size';

function loadInitialFontSize(): FontSize {
  if (!isDatabaseAvailable()) return 'default';
  try {
    return getSetting(FONT_SIZE_KEY) === 'large' ? 'large' : 'default';
  } catch {
    return 'default';
  }
}

type SettingsState = {
  fontSize: FontSize;
  /** False if the local database failed to initialize — settings changes still apply for this session but are not saved. */
  storageAvailable: boolean;
  /** True if the most recent write failed even though storage is otherwise available (e.g. disk full). */
  lastWriteFailed: boolean;
  setFontSize: (size: FontSize) => void;
};

export const useSettingsStore = create<SettingsState>((set, get) => ({
  fontSize: loadInitialFontSize(),
  storageAvailable: isDatabaseAvailable(),
  lastWriteFailed: false,

  setFontSize: (size) => {
    set({ fontSize: size });
    if (!get().storageAvailable) return;
    try {
      setSetting(FONT_SIZE_KEY, size);
      set({ lastWriteFailed: false });
    } catch {
      set({ lastWriteFailed: true });
    }
  },
}));
