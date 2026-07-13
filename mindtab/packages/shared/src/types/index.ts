export type WidgetType =
  | 'clock'
  | 'weather'
  | 'search'
  | 'todo'
  | 'quick-note'
  | 'bookmarks'
  | 'ai-chat'
  | 'custom';

export interface Position {
  x: number;
  y: number;
  row?: number;
  col?: number;
}

export interface Size {
  width: number;
  height: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export interface WidgetConfig {
  [key: string]: unknown;
}

export interface WidgetManifest {
  id: string;
  name: string;
  version: string;
  description: string;
  icon: string;
  defaultSize: Size;
  minSize: Size;
  maxSize: Size;
  permissions?: string[];
  component: string;
}

export interface Widget {
  id: string;
  manifestId: string;
  type: WidgetType;
  title: string;
  config: WidgetConfig;
  position: Position;
  size: Size;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface WidgetPlacement {
  widgetId: string;
  position: Position;
  size: Size;
}

export interface Layout {
  id: string;
  name: string;
  type: 'grid' | 'free' | 'masonry';
  columns: number;
  rows: number;
  gap: number;
  widgets: WidgetPlacement[];
}

export interface TabInfo {
  id: number;
  url: string;
  title: string;
  favIconUrl?: string;
  active: boolean;
  windowId: number;
}

export interface Session {
  id: string;
  url: string;
  title: string;
  startedAt: number;
  endedAt?: number;
  duration?: number;
  keywords: string[];
  summary?: string;
}

export interface MemoryItem {
  id: string;
  sessionId: string;
  type: 'page' | 'interaction' | 'bookmark' | 'note';
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: number;
}

export interface Recommendation {
  id: string;
  type: 'tab' | 'bookmark' | 'note' | 'search';
  title: string;
  description?: string;
  url?: string;
  score: number;
  createdAt: number;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: number;
}

export interface Settings {
  theme: 'light' | 'dark' | 'auto';
  layout: Layout;
  aiProvider: 'openai' | 'deepseek' | 'local';
  aiModel?: string;
  aiApiKey?: string;
  memoryEnabled: boolean;
  syncEnabled: boolean;
  autoCleanup: boolean;
  cleanupDays: number;
}

export interface EventPayload {
  type: string;
  data?: unknown;
}

export type ChromeMessageType =
  | 'GET_TABS'
  | 'GET_ACTIVE_TAB'
  | 'GET_HISTORY'
  | 'GET_BOOKMARKS'
  | 'GET_MEMORY_SUMMARY'
  | 'SAVE_WIDGET_CONFIG'
  | 'SYNC_DATA'
  | 'TAB_UPDATED'
  | 'TAB_REMOVED';

export interface ChromeMessage {
  type: ChromeMessageType;
  payload?: unknown;
}
