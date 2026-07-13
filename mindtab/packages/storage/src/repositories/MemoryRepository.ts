import type { MemoryItem, Session } from '@mindtab/shared';
import { db } from '../database';
import { generateId } from '@mindtab/shared';

export class MemoryRepository {
  async getAllSessions(): Promise<Session[]> {
    return db.sessions.orderBy('startedAt').reverse().toArray();
  }

  async getSession(id: string): Promise<Session | undefined> {
    return db.sessions.get(id);
  }

  async saveSession(session: Session): Promise<void> {
    await db.sessions.put(session);
  }

  async createSession(url: string, title: string): Promise<Session> {
    const session: Session = {
      id: generateId(),
      url,
      title,
      startedAt: Date.now(),
      keywords: [],
    };
    await this.saveSession(session);
    return session;
  }

  async endSession(id: string): Promise<void> {
    const session = await this.getSession(id);
    if (session) {
      session.endedAt = Date.now();
      session.duration = session.endedAt - session.startedAt;
      await this.saveSession(session);
    }
  }

  async deleteSession(id: string): Promise<void> {
    await db.transaction('rw', [db.sessions, db.memories, db.embeddings], async () => {
      await db.memories.where('sessionId').equals(id).delete();
      await db.embeddings.where('sessionId').equals(id).delete();
      await db.sessions.delete(id);
    });
  }

  async getAllMemories(): Promise<MemoryItem[]> {
    return db.memories.orderBy('createdAt').reverse().toArray();
  }

  async getMemoriesBySession(sessionId: string): Promise<MemoryItem[]> {
    return db.memories.where('sessionId').equals(sessionId).toArray();
  }

  async saveMemory(memory: MemoryItem): Promise<void> {
    await db.memories.put(memory);
  }

  async createMemory(
    sessionId: string,
    type: MemoryItem['type'],
    content: string,
    metadata?: Record<string, unknown>
  ): Promise<MemoryItem> {
    const memory: MemoryItem = {
      id: generateId(),
      sessionId,
      type,
      content,
      metadata,
      createdAt: Date.now(),
    };
    await this.saveMemory(memory);
    return memory;
  }

  async deleteMemory(id: string): Promise<void> {
    await db.memories.delete(id);
  }

  async getRecentSessions(days: number): Promise<Session[]> {
    const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
    return db.sessions.where('startedAt').above(cutoff).reverse().toArray();
  }

  async searchMemories(query: string): Promise<MemoryItem[]> {
    const allMemories = await this.getAllMemories();
    const lowerQuery = query.toLowerCase();
    return allMemories.filter(
      (m) =>
        m.content.toLowerCase().includes(lowerQuery) ||
        (m.metadata && JSON.stringify(m.metadata).toLowerCase().includes(lowerQuery))
    );
  }
}
