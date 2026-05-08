import type { Widget } from '@mindtab/shared';
import { db } from '../database';

export class WidgetRepository {
  async getAll(): Promise<Widget[]> {
    return db.widgets.toArray();
  }

  async get(id: string): Promise<Widget | undefined> {
    return db.widgets.get(id);
  }

  async save(widget: Widget): Promise<void> {
    widget.updatedAt = Date.now();
    await db.widgets.put(widget);
  }

  async saveMany(widgets: Widget[]): Promise<void> {
    const now = Date.now();
    const updatedWidgets = widgets.map((w) => ({ ...w, updatedAt: now }));
    await db.widgets.bulkPut(updatedWidgets);
  }

  async delete(id: string): Promise<void> {
    await db.widgets.delete(id);
  }

  async deleteAll(): Promise<void> {
    await db.widgets.clear();
  }

  async getByType(type: string): Promise<Widget[]> {
    return db.widgets.where('type').equals(type).toArray();
  }

  async getActiveWidgets(): Promise<Widget[]> {
    return db.widgets.where('isActive').equals(1).toArray();
  }

  async count(): Promise<number> {
    return db.widgets.count();
  }
}
