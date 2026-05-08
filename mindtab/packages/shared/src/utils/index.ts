import type { Widget, WidgetType } from '../types';
import { DEFAULT_WIDGET_SIZE } from '../constants';

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function createWidget(type: WidgetType, overrides?: Partial<Widget>): Widget {
  const defaultSize = DEFAULT_WIDGET_SIZE[type] || { width: 300, height: 200 };

  return {
    id: generateId(),
    manifestId: type,
    type,
    title: getWidgetTitle(type),
    config: {},
    position: { x: 0, y: 0 },
    size: { ...defaultSize },
    isActive: true,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    ...overrides,
  };
}

function getWidgetTitle(type: WidgetType): string {
  const titles: Record<WidgetType, string> = {
    clock: '时钟',
    weather: '天气',
    search: '搜索',
    todo: '待办事项',
    'quick-note': '快捷笔记',
    bookmarks: '书签',
    'ai-chat': 'AI 助手',
    custom: '自定义组件',
  };
  return titles[type] || type;
}

export function debounce<T extends (...args: unknown[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: unknown[]) => void>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

export function formatDate(date: Date | number, format: 'full' | 'date' | 'time' = 'full'): string {
  const d = typeof date === 'number' ? new Date(date) : date;

  if (format === 'time') {
    return d.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
  }

  if (format === 'date') {
    return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
