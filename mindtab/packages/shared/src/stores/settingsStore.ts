import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Settings, Layout } from '@mindtab/shared';
import { DEFAULT_LAYOUT } from '@mindtab/shared';

interface SettingsState {
  settings: Settings;
}

interface SettingsActions {
  updateSettings: (updates: Partial<Settings>) => void;
  setTheme: (theme: Settings['theme']) => void;
  setLayout: (layout: Layout) => void;
  setAIProvider: (provider: Settings['aiProvider']) => void;
  setAIModel: (model: string) => void;
  setAIApiKey: (apiKey: string) => void;
  toggleMemory: () => void;
  toggleSync: () => void;
  setAutoCleanup: (enabled: boolean) => void;
  setCleanupDays: (days: number) => void;
  resetSettings: () => void;
}

type SettingsStore = SettingsState & SettingsActions;

const initialSettings: Settings = {
  theme: 'light',
  layout: DEFAULT_LAYOUT as Layout,
  aiProvider: 'openai',
  memoryEnabled: true,
  syncEnabled: false,
  autoCleanup: false,
  cleanupDays: 30,
};

const initialState: SettingsState = {
  settings: initialSettings,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...initialState,

      updateSettings: (updates) => {
        set((state) => ({
          settings: { ...state.settings, ...updates },
        }));
      },

      setTheme: (theme) => {
        set((state) => ({
          settings: { ...state.settings, theme },
        }));
      },

      setLayout: (layout) => {
        set((state) => ({
          settings: { ...state.settings, layout },
        }));
      },

      setAIProvider: (aiProvider) => {
        set((state) => ({
          settings: { ...state.settings, aiProvider },
        }));
      },

      setAIModel: (model) => {
        set((state) => ({
          settings: { ...state.settings, aiModel: model },
        }));
      },

      setAIApiKey: (apiKey) => {
        set((state) => ({
          settings: { ...state.settings, aiApiKey: apiKey },
        }));
      },

      toggleMemory: () => {
        set((state) => ({
          settings: { ...state.settings, memoryEnabled: !state.settings.memoryEnabled },
        }));
      },

      toggleSync: () => {
        set((state) => ({
          settings: { ...state.settings, syncEnabled: !state.settings.syncEnabled },
        }));
      },

      setAutoCleanup: (autoCleanup) => {
        set((state) => ({
          settings: { ...state.settings, autoCleanup },
        }));
      },

      setCleanupDays: (cleanupDays) => {
        set((state) => ({
          settings: { ...state.settings, cleanupDays },
        }));
      },

      resetSettings: () => {
        set(initialState);
      },
    }),
    {
      name: 'mindtab-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
