import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Widget, Position, Size, WidgetConfig } from '@mindtab/shared';
import { generateId, createWidget } from '@mindtab/shared';

interface WidgetState {
  widgets: Widget[];
  isLoading: boolean;
  error: string | null;
}

interface WidgetActions {
  addWidget: (type: Widget['type']) => Widget;
  removeWidget: (id: string) => void;
  updateWidget: (id: string, updates: Partial<Widget>) => void;
  updateWidgetPosition: (id: string, position: Position) => void;
  updateWidgetSize: (id: string, size: Size) => void;
  updateWidgetConfig: (id: string, config: Partial<WidgetConfig>) => void;
  toggleWidgetActive: (id: string) => void;
  reorderWidgets: (fromIndex: number, toIndex: number) => void;
  resetWidgets: () => void;
  setWidgets: (widgets: Widget[]) => void;
  getWidget: (id: string) => Widget | undefined;
}

type WidgetStore = WidgetState & WidgetActions;

const initialState: WidgetState = {
  widgets: [],
  isLoading: false,
  error: null,
};

export const useWidgetStore = create<WidgetStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      addWidget: (type) => {
        const widget = createWidget(type);
        set((state) => ({
          widgets: [...state.widgets, widget],
        }));
        return widget;
      },

      removeWidget: (id) => {
        set((state) => ({
          widgets: state.widgets.filter((w) => w.id !== id),
        }));
      },

      updateWidget: (id, updates) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, ...updates, updatedAt: Date.now() } : w
          ),
        }));
      },

      updateWidgetPosition: (id, position) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, position, updatedAt: Date.now() } : w
          ),
        }));
      },

      updateWidgetSize: (id, size) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, size, updatedAt: Date.now() } : w
          ),
        }));
      },

      updateWidgetConfig: (id, config) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id
              ? { ...w, config: { ...w.config, ...config }, updatedAt: Date.now() }
              : w
          ),
        }));
      },

      toggleWidgetActive: (id) => {
        set((state) => ({
          widgets: state.widgets.map((w) =>
            w.id === id ? { ...w, isActive: !w.isActive, updatedAt: Date.now() } : w
          ),
        }));
      },

      reorderWidgets: (fromIndex, toIndex) => {
        set((state) => {
          const widgets = [...state.widgets];
          const [removed] = widgets.splice(fromIndex, 1);
          widgets.splice(toIndex, 0, removed);
          return { widgets };
        });
      },

      resetWidgets: () => {
        set(initialState);
      },

      setWidgets: (widgets) => {
        set({ widgets });
      },

      getWidget: (id) => {
        return get().widgets.find((w) => w.id === id);
      },
    }),
    {
      name: 'mindtab-widgets',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
