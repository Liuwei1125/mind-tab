import Dexie, { type Table } from 'dexie';
import type { Widget, Settings, Session, MemoryItem } from '@mindtab/shared';

export interface CacheEntry {
  key: string;
  value: unknown;
  expiresAt: number;
}

export interface EmbeddingEntry {
  id: string;
  sessionId: string;
  vector: number[];
  createdAt: number;
}

export class MindTabDatabase extends Dexie {
  widgets!: Table<Widget, string>;
  sessions!: Table<Session, string>;
  memories!: Table<MemoryItem, string>;
  embeddings!: Table<EmbeddingEntry, string>;
  settings!: Table<{ key: string; value: Settings }, string>;
  cache!: Table<CacheEntry, string>;

  constructor() {
    super('MindTabDB');

    this.version(1).stores({
      widgets: 'id, manifestId, type, createdAt, updatedAt',
      sessions: 'id, url, startedAt, endedAt',
      memories: 'id, sessionId, type, createdAt',
      embeddings: 'id, sessionId, createdAt',
      settings: 'key',
      cache: 'key, expiresAt',
    });
  }
}

export const db = new MindTabDatabase();

export async function clearExpiredCache(): Promise<void> {
  const now = Date.now();
  await db.cache.where('expiresAt').below(now).delete();
}

export async function initializeDatabase(): Promise<void> {
  try {
    await db.open();
    await clearExpiredCache();
  } catch (error) {
    console.error('Failed to initialize database:', error);
    throw error;
  }
}

export async function closeDatabase(): Promise<void> {
  db.close();
}
