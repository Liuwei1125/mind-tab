import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Layout, WidgetPlacement, Position, Size } from '@mindtab/shared';
import { DEFAULT_LAYOUT } from '@mindtab/shared';

interface LayoutState {
  layout: Layout;
  isEditing: boolean;
  draggedWidgetId: string | null;
  selectedWidgetId: string | null;
}

interface LayoutActions {
  updateLayout: (updates: Partial<Layout>) => void;
  updateLayoutType: (type: Layout['type']) => void;
  updateColumns: (columns: number) => void;
  updateRows: (rows: number) => void;
  updateGap: (gap: number) => void;
  addWidgetToLayout: (widgetId: string, position?: Partial<Position>, size?: Partial<Size>) => void;
  removeWidgetFromLayout: (widgetId: string) => void;
  updateWidgetPlacement: (widgetId: string, placement: Partial<WidgetPlacement>) => void;
  setEditing: (isEditing: boolean) => void;
  setDraggedWidget: (widgetId: string | null) => void;
  setSelectedWidget: (widgetId: string | null) => void;
  resetLayout: () => void;
}

type LayoutStore = LayoutState & LayoutActions;

const initialState: LayoutState = {
  layout: DEFAULT_LAYOUT as Layout,
  isEditing: false,
  draggedWidgetId: null,
  selectedWidgetId: null,
};

export const useLayoutStore = create<LayoutStore>()(
  persist(
    (set) => ({
      ...initialState,

      updateLayout: (updates) => {
        set((state) => ({
          layout: { ...state.layout, ...updates },
        }));
      },

      updateLayoutType: (type) => {
        set((state) => ({
          layout: { ...state.layout, type },
        }));
      },

      updateColumns: (columns) => {
        set((state) => ({
          layout: { ...state.layout, columns },
        }));
      },

      updateRows: (rows) => {
        set((state) => ({
          layout: { ...state.layout, rows },
        }));
      },

      updateGap: (gap) => {
        set((state) => ({
          layout: { ...state.layout, gap },
        }));
      },

      addWidgetToLayout: (widgetId, position = {}, size = {}) => {
        set((state) => {
          const existingWidget = state.layout.widgets.find((w) => w.widgetId === widgetId);
          if (existingWidget) return state;

          const newPlacement: WidgetPlacement = {
            widgetId,
            position: { x: 0, y: 0, ...position },
            size: {
              width: 1,
              height: 1,
              ...size,
            },
          };

          return {
            layout: {
              ...state.layout,
              widgets: [...state.layout.widgets, newPlacement],
            },
          };
        });
      },

      removeWidgetFromLayout: (widgetId) => {
        set((state) => ({
          layout: {
            ...state.layout,
            widgets: state.layout.widgets.filter((w) => w.widgetId !== widgetId),
          },
        }));
      },

      updateWidgetPlacement: (widgetId, placement) => {
        set((state) => ({
          layout: {
            ...state.layout,
            widgets: state.layout.widgets.map((w) =>
              w.widgetId === widgetId ? { ...w, ...placement } : w
            ),
          },
        }));
      },

      setEditing: (isEditing) => {
        set({ isEditing });
      },

      setDraggedWidget: (widgetId) => {
        set({ draggedWidgetId: widgetId });
      },

      setSelectedWidget: (widgetId) => {
        set({ selectedWidgetId: widgetId });
      },

      resetLayout: () => {
        set(initialState);
      },
    }),
    {
      name: 'mindtab-layout',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
