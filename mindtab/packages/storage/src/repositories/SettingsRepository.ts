import type { Settings } from '@mindtab/shared';
import { db } from '../database';
import { DEFAULT_LAYOUT } from '@mindtab/shared';

const DEFAULT_SETTINGS: Settings = {
  theme: 'light',
  layout: DEFAULT_LAYOUT as Settings['layout'],
  aiProvider: 'openai',
  memoryEnabled: true,
  syncEnabled: false,
  autoCleanup: false,
  cleanupDays: 30,
};

export class SettingsRepository {
  private readonly SETTINGS_KEY = 'default';

  async get(): Promise<Settings> {
    const entry = await db.settings.get(this.SETTINGS_KEY);
    return entry?.value || { ...DEFAULT_SETTINGS };
  }

  async save(settings: Settings): Promise<void> {
    await db.settings.put({ key: this.SETTINGS_KEY, value: settings });
  }

  async update(partial: Partial<Settings>): Promise<void> {
    const current = await this.get();
    const updated = { ...current, ...partial };
    await this.save(updated);
  }

  async reset(): Promise<void> {
    await this.save(DEFAULT_SETTINGS as Settings);
  }

  async getByKey<K extends keyof Settings>(key: K): Promise<Settings[K] | undefined> {
    const settings = await this.get();
    return settings[key];
  }

  async setByKey<K extends keyof Settings>(key: K, value: Settings[K]): Promise<void> {
    await this.update({ [key]: value });
  }
}
