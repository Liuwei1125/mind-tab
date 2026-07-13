export const CHROME_STORAGE_KEYS = {
  SETTINGS: 'mindtab_settings',
  WIDGETS: 'mindtab_widgets',
  LAYOUT: 'mindtab_layout',
  AI_CONFIG: 'mindtab_ai_config',
} as const;

export const INDEXED_DB_NAME = 'MindTabDB';
export const INDEXED_DB_VERSION = 1;

export const DEFAULT_LAYOUT = {
  id: 'default',
  name: '默认布局',
  type: 'grid' as const,
  columns: 3,
  rows: 3,
  gap: 16,
  widgets: [],
};

export const DEFAULT_WIDGET_SIZE = {
  clock: { width: 300, height: 150, minWidth: 200, minHeight: 100, maxWidth: 400, maxHeight: 200 },
  weather: { width: 350, height: 200, minWidth: 280, minHeight: 150, maxWidth: 500, maxHeight: 300 },
  search: { width: 400, height: 60, minWidth: 300, minHeight: 50, maxWidth: 600, maxHeight: 100 },
  todo: { width: 350, height: 400, minWidth: 280, minHeight: 200, maxWidth: 500, maxHeight: 600 },
  'quick-note': { width: 350, height: 300, minWidth: 280, minHeight: 150, maxWidth: 500, maxHeight: 500 },
  bookmarks: { width: 350, height: 350, minWidth: 280, minHeight: 200, maxWidth: 500, maxHeight: 500 },
  'ai-chat': { width: 400, height: 500, minWidth: 320, minHeight: 300, maxWidth: 600, maxHeight: 700 },
} as const;

export const EVENT_TYPES = {
  WIDGET_ADDED: 'widget:added',
  WIDGET_REMOVED: 'widget:removed',
  WIDGET_UPDATED: 'widget:updated',
  WIDGET_DRAG_START: 'widget:drag:start',
  WIDGET_DRAG_END: 'widget:drag:end',
  LAYOUT_CHANGED: 'layout:changed',
  AI_MESSAGE_RECEIVED: 'ai:message:received',
  AI_MESSAGE_SENT: 'ai:message:sent',
  AI_PROCESSING_START: 'ai:processing:start',
  AI_PROCESSING_END: 'ai:processing:end',
  MEMORY_UPDATED: 'memory:updated',
  TAB_ACTIVATED: 'tab:activated',
  TAB_CREATED: 'tab:created',
  TAB_REMOVED: 'tab:removed',
  SYNC_COMPLETE: 'sync:complete',
  SYNC_ERROR: 'sync:error',
  SETTINGS_UPDATED: 'settings:updated',
} as const;

export const AI_PROVIDERS = {
  OPENAI: 'openai',
  DEEPSEEK: 'deepseek',
  LOCAL: 'local',
} as const;

export const STORAGE_LIMITS = {
  MAX_WIDGETS: 50,
  MAX_SESSIONS: 1000,
  MAX_MEMORIES: 5000,
  MAX_AI_HISTORY: 100,
} as const;
