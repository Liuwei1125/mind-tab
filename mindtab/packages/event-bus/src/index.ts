import { EventPayload } from '@mindtab/shared';

type EventHandler = (payload: EventPayload) => void;

class EventBusImpl {
  private listeners: Map<string, Set<EventHandler>> = new Map();

  subscribe(event: string, handler: EventHandler): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(handler);

    return () => this.unsubscribe(event, handler);
  }

  unsubscribe(event: string, handler: EventHandler): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.listeners.delete(event);
      }
    }
  }

  publish(event: string, data?: unknown): void {
    const handlers = this.listeners.get(event);
    if (handlers) {
      const payload: EventPayload = { type: event, data };
      handlers.forEach((handler) => {
        try {
          handler(payload);
        } catch (error) {
          console.error(`Error in event handler for "${event}":`, error);
        }
      });
    }
  }

  once(event: string, handler: EventHandler): () => void {
    const wrapper: EventHandler = (payload) => {
      handler(payload);
      this.unsubscribe(event, wrapper);
    };
    return this.subscribe(event, wrapper);
  }

  clear(event?: string): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }

  listenerCount(event: string): number {
    return this.listeners.get(event)?.size ?? 0;
  }
}

export const EventBus = new EventBusImpl();
