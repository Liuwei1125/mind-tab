import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TodoStore {
  todos: TodoItem[];
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string) => void;
  clearCompleted: () => void;
}

const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      addTodo: (text) => {
        const newTodo: TodoItem = {
          id: `todo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          text,
          completed: false,
          createdAt: Date.now(),
        };
        set((state) => ({ todos: [newTodo, ...state.todos] }));
      },
      toggleTodo: (id) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          ),
        }));
      },
      deleteTodo: (id) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      editTodo: (id, text) => {
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id ? { ...todo, text } : todo
          ),
        }));
      },
      clearCompleted: () => {
        set((state) => ({
          todos: state.todos.filter((todo) => !todo.completed),
        }));
      },
    }),
    {
      name: 'mindtab-todos',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface NoteItem {
  id: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

interface NoteStore {
  notes: NoteItem[];
  addNote: (content: string) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  clearAll: () => void;
}

const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      notes: [],
      addNote: (content) => {
        const newNote: NoteItem = {
          id: `note-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          content,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
      },
      updateNote: (id, content) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, content, updatedAt: Date.now() } : note
          ),
        }));
      },
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
      clearAll: () => {
        set({ notes: [] });
      },
    }),
    {
      name: 'mindtab-notes',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export function NewTabPage() {
  return (
    <div className="h-screen w-screen bg-canvas flex flex-col overflow-hidden">
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <MainContent />
        <RightPanel />
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <header className="h-14 px-6 flex items-center justify-between border-b border-hairline bg-canvas/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
            <span className="text-on-primary text-xs font-bold">M</span>
          </div>
          <span className="font-serif text-xl text-ink tracking-tight">MindTab</span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-soft"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            placeholder="搜索..."
            className="w-full h-8 pl-10 pr-4 bg-surface-card text-sm rounded-full border border-hairline focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded flex items-center justify-center text-muted-soft hover:text-ink hover:bg-surface-soft transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button className="w-8 h-8 rounded flex items-center justify-center text-muted-soft hover:text-ink hover:bg-surface-soft transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span className="text-xs font-medium">M</span>
        </button>
      </div>
    </header>
  );
}

function LeftSidebar() {
  const [activeItem, setActiveItem] = useState('home');

  const menuItems = [
    { id: 'home', icon: 'home', label: '主页' },
    { id: 'memory', icon: 'brain', label: '记忆' },
    { id: 'search', icon: 'search', label: '搜索' },
    { id: 'settings', icon: 'settings', label: '设置' },
  ];

  return (
    <aside className="w-16 border-r border-hairline p-2 flex flex-col">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveItem(item.id)}
          className={`w-full aspect-square rounded-lg flex flex-col items-center justify-center gap-1 transition-colors ${
            activeItem === item.id
              ? 'bg-primary/10 text-primary'
              : 'text-muted-soft hover:text-ink hover:bg-surface-soft'
          }`}
        >
          <Icon icon={item.icon} />
          <span className="text-[10px]">{item.label}</span>
        </button>
      ))}
    </aside>
  );
}

function Icon({ icon }: { icon: string }) {
  switch (icon) {
    case 'home':
      return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>;
    case 'brain':
      return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0 1.45 4.01 2.5 2.5 0 0 0-1.32 4.23 2.5 2.5 0 0 0 3.59 2.01 2.5 2.5 0 0 0 2.96-.46 2.5 2.5 0 0 0 2.96.46 2.5 2.5 0 0 0 3.59-2.01 2.5 2.5 0 0 0-1.32-4.23 2.5 2.5 0 0 0 1.98-3A2.5 2.5 0 0 0 16.96 4.04 2.5 2.5 0 0 0 12 4.5z" /></svg>;
    case 'search':
      return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>;
    case 'settings':
      return <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
    default:
      return null;
  }
}

function MainContent() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <WidgetCanvas />
    </main>
  );
}

interface WidgetLayoutItem {
  id: string;
  type: string;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface WidgetLayoutStore {
  widgets: WidgetLayoutItem[];
  isEditMode: boolean;
  toggleEditMode: () => void;
  reorderWidgets: (activeId: string, overId: string) => void;
  setWidgets: (widgets: WidgetLayoutItem[]) => void;
}

const useWidgetLayoutStore = create<WidgetLayoutStore>()(
  persist(
    (set) => ({
      widgets: [
        { id: '1', type: 'clock', title: '时钟', x: 0, y: 0, w: 1, h: 1 },
        { id: '2', type: 'weather', title: '天气', x: 1, y: 0, w: 1, h: 1 },
        { id: '3', type: 'todo', title: '待办', x: 2, y: 0, w: 1, h: 2 },
        { id: '4', type: 'search', title: '搜索', x: 0, y: 1, w: 2, h: 1 },
        { id: '5', type: 'quick-note', title: '快捷笔记', x: 0, y: 2, w: 2, h: 2 },
        { id: '6', type: 'ai-chat', title: 'AI 助手', x: 2, y: 2, w: 1, h: 2 },
      ],
      isEditMode: false,
      toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
      reorderWidgets: (activeId, overId) => {
        set((state) => {
          const oldIndex = state.widgets.findIndex((w) => w.id === activeId);
          const newIndex = state.widgets.findIndex((w) => w.id === overId);
          if (oldIndex !== -1 && newIndex !== -1) {
            return {
              widgets: arrayMove(state.widgets, oldIndex, newIndex),
            };
          }
          return state;
        });
      },
      setWidgets: (widgets) => set({ widgets }),
    }),
    {
      name: 'mindtab-widget-layout',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function WidgetCanvas() {
  const { widgets, isEditMode, toggleEditMode, reorderWidgets } = useWidgetLayoutStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      reorderWidgets(active.id as string, over.id as string);
    }
  };

  const widgetIds = widgets.map((w) => w.id);

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">我的工作台</h2>
        <button
          onClick={toggleEditMode}
          className={`text-sm px-3 py-1 rounded-md transition-colors ${
            isEditMode
              ? 'bg-primary text-on-primary'
              : 'text-muted hover:text-primary hover:bg-surface-soft'
          }`}
        >
          {isEditMode ? '完成编辑' : '编辑布局'}
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgetIds} strategy={rectSortingStrategy}>
          <div
            className="grid grid-cols-3 gap-4"
            style={{ gridAutoRows: 'minmax(180px, auto)' }}
          >
            {widgets.map((widget) => (
              <SortableWidgetCard
                key={widget.id}
                widget={widget}
                isEditMode={isEditMode}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

interface WidgetCardProps {
  widget: {
    id: string;
    type: string;
    title: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  isEditMode?: boolean;
}

function SortableWidgetCard({ widget, isEditMode }: WidgetCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-surface-card rounded-lg p-4 border transition-all cursor-default ${
        widget.h > 1 ? 'row-span-2' : ''
      } ${widget.w > 1 ? 'col-span-2' : ''} ${
        isEditMode
          ? 'border-dashed border-primary/50 cursor-grab active:cursor-grabbing hover:border-primary hover:shadow-md'
          : 'border-hairline/50 hover:shadow-card'
      }`}
      {...(isEditMode ? { ...attributes, ...listeners } : {})}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted">{widget.title}</h3>
        {isEditMode && (
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="5" r="1" fill="currentColor" />
              <circle cx="9" cy="12" r="1" fill="currentColor" />
              <circle cx="9" cy="19" r="1" fill="currentColor" />
              <circle cx="15" cy="5" r="1" fill="currentColor" />
              <circle cx="15" cy="12" r="1" fill="currentColor" />
              <circle cx="15" cy="19" r="1" fill="currentColor" />
            </svg>
          </div>
        )}
      </div>

      <WidgetContent type={widget.type} />
    </div>
  );
}

function WidgetContent({ type }: { type: string }) {
  switch (type) {
    case 'clock':
      return <ClockWidget />;
    case 'weather':
      return <WeatherWidget />;
    case 'todo':
      return <TodoWidget />;
    case 'search':
      return <SearchWidget />;
    case 'quick-note':
      return <QuickNoteWidget />;
    case 'ai-chat':
      return <AIChatWidget />;
    default:
      return <div className="text-muted-soft text-sm">组件加载中...</div>;
  }
}

function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="font-serif text-4xl text-ink font-light">
        {time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-sm text-muted mt-1">
        {time.toLocaleDateString('zh-CN', { weekday: 'long', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
}

interface WeatherData {
  temperature: number;
  weathercode: number;
  isDay: boolean;
  city: string;
}

interface WeatherStore {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: number | null;
  fetchWeather: () => Promise<void>;
}

const useWeatherStore = create<WeatherStore>((set, get) => ({
  weather: null,
  isLoading: false,
  error: null,
  lastUpdated: null,
  fetchWeather: async () => {
    set({ isLoading: true, error: null });
    try {
      const position = await new Promise<{ lat: number; lon: number }>((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
          () => resolve({ lat: 39.9042, lon: 116.4074 })
        );
      });

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${position.lat}&longitude=${position.lon}&current=temperature_2m,is_day,weather_code&timezone=auto`
      );
      const data = await response.json();

      const cityResponse = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lon}&format=json`
      ).catch(() => null);
      const cityData = cityResponse ? await cityResponse.json() : null;
      const city = cityData?.address?.city || cityData?.address?.town || cityData?.address?.village || '未知';

      set({
        weather: {
          temperature: Math.round(data.current.temperature_2m),
          weathercode: data.current.weather_code,
          isDay: data.current.is_day === 1,
          city,
        },
        lastUpdated: Date.now(),
        isLoading: false,
      });
    } catch {
      set({ error: '获取天气失败', isLoading: false });
    }
  },
}));

function getWeatherEmoji(code: number, isDay: boolean): string {
  if (code === 0) return isDay ? '☀️' : '🌙';
  if (code <= 3) return isDay ? '⛅' : '☁️';
  if (code <= 48) return '🌫️';
  if (code <= 57) return '🌧️';
  if (code <= 67) return '🌨️';
  if (code <= 77) return '❄️';
  if (code <= 82) return '🌧️';
  if (code <= 86) return '🌨️';
  if (code >= 95) return '⛈️';
  return '🌤️';
}

function getWeatherText(code: number): string {
  if (code === 0) return '晴';
  if (code <= 3) return '多云';
  if (code <= 48) return '雾';
  if (code <= 57) return '毛毛雨';
  if (code <= 67) return '降雨';
  if (code <= 77) return '降雪';
  if (code <= 82) return '阵雨';
  if (code <= 86) return '大雪';
  if (code >= 95) return '雷暴';
  return '阴';
}

function WeatherWidget() {
  const { weather, isLoading, error, lastUpdated, fetchWeather } = useWeatherStore();

  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUpdateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `更新于 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  };

  if (isLoading && !weather) {
    return (
      <div className="text-center py-4">
        <div className="animate-pulse">
          <div className="h-10 w-10 bg-surface-soft rounded-full mx-auto mb-2"></div>
          <div className="h-8 w-16 bg-surface-soft rounded mx-auto mb-1"></div>
          <div className="h-4 w-20 bg-surface-soft rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="text-center">
        <div className="text-2xl mb-2">🌧️</div>
        <div className="text-sm text-muted">{error}</div>
        <button
          onClick={fetchWeather}
          className="mt-2 text-xs text-primary hover:underline"
        >
          重试
        </button>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="text-center">
      <div className="text-5xl mb-2">{getWeatherEmoji(weather.weathercode, weather.isDay)}</div>
      <div className="font-serif text-3xl text-ink">{weather.temperature}°C</div>
      <div className="text-sm text-muted mt-1">{getWeatherText(weather.weathercode)} · {weather.city}</div>
      {lastUpdated && (
        <div className="text-xs text-muted-soft mt-2">{formatUpdateTime(lastUpdated)}</div>
      )}
    </div>
  );
}

function TodoWidget() {
  const { todos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodoStore();
  const [inputValue, setInputValue] = useState('');
  const [showAll, setShowAll] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const completedCount = todos.filter(t => t.completed).length;
  const uncompletedCount = todos.length - completedCount;

  const displayTodos = showAll ? todos : todos.filter(t => !t.completed);

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加新任务..."
          className="w-full h-8 px-3 text-sm bg-canvas border border-hairline rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </form>

      <div className="flex-1 overflow-auto space-y-1.5">
        {displayTodos.length === 0 ? (
          <div className="text-center text-muted-soft text-sm py-4">
            {showAll ? '暂无任务' : '所有任务已完成！'}
          </div>
        ) : (
          displayTodos.map((todo) => (
            <div
              key={todo.id}
              className="group flex items-start gap-2 p-2 rounded-md hover:bg-surface-soft/50 transition-colors"
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`mt-0.5 w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors ${
                  todo.completed
                    ? 'bg-primary border-primary'
                    : 'border-hairline hover:border-primary'
                }`}
              >
                {todo.completed && (
                  <svg className="w-3 h-3 text-on-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
              <span className={`flex-1 text-sm break-words ${
                todo.completed ? 'text-muted-soft line-through' : 'text-body'
              }`}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded flex items-center justify-center text-muted-soft hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-3 pt-2 border-t border-hairline/50 flex items-center justify-between text-xs text-muted-soft">
          <div className="flex gap-2">
            <button
              onClick={() => setShowAll(false)}
              className={`px-2 py-0.5 rounded ${!showAll ? 'bg-primary/10 text-primary' : 'hover:bg-surface-soft'}`}
            >
              未完成 ({uncompletedCount})
            </button>
            <button
              onClick={() => setShowAll(true)}
              className={`px-2 py-0.5 rounded ${showAll ? 'bg-primary/10 text-primary' : 'hover:bg-surface-soft'}`}
            >
              全部 ({todos.length})
            </button>
          </div>
          {completedCount > 0 && (
            <button
              onClick={clearCompleted}
              className="text-muted hover:text-red-500 transition-colors"
            >
              清除已完成
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function SearchWidget() {
  const [query, setQuery] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('google');
  const [isFocused, setIsFocused] = useState(false);

  const searchEngines = {
    google: { name: 'Google', icon: '🔍', url: 'https://www.google.com/search?q=' },
    bing: { name: 'Bing', icon: '🌐', url: 'https://www.bing.com/search?q=' },
    baidu: { name: '百度', icon: '🌏', url: 'https://www.baidu.com/s?wd=' },
    github: { name: 'GitHub', icon: '🐙', url: 'https://github.com/search?q=' },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const engine = searchEngines[selectedEngine as keyof typeof searchEngines];
      window.open(`${engine.url}${encodeURIComponent(query)}`, '_blank');
    }
  };

  const quickSuggestions = [
    'JavaScript 教程',
    'React Hooks',
    'TypeScript 入门',
  ];

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-soft"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="搜索或选择引擎..."
          className="w-full h-9 pl-10 pr-20 bg-canvas text-sm rounded-full border border-hairline focus:outline-none focus:border-primary transition-colors"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
          <select
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="h-6 px-1 text-xs bg-transparent border-none text-muted focus:outline-none cursor-pointer"
          >
            {Object.entries(searchEngines).map(([key, engine]) => (
              <option key={key} value={key}>
                {engine.icon}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-on-primary transition-colors"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </form>

      {isFocused && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-surface-card border border-hairline rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="px-3 py-2 text-xs text-muted border-b border-hairline/50">
            快捷搜索
          </div>
          <div className="p-2">
            {quickSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setQuery(suggestion);
                  window.open(`${searchEngines[selectedEngine as keyof typeof searchEngines].url}${encodeURIComponent(suggestion)}`, '_blank');
                }}
                className="w-full text-left px-2 py-1.5 text-sm text-body hover:bg-surface-soft rounded transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuickNoteWidget() {
  const { notes, addNote, deleteNote, clearAll } = useNoteStore();
  const [inputValue, setInputValue] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addNote(inputValue.trim());
      setInputValue('');
    }
  };

  const startEdit = (id: string, content: string) => {
    setEditingId(id);
    setEditValue(content);
  };

  const saveEdit = () => {
    if (editingId && editValue.trim()) {
      const { updateNote } = useNoteStore.getState();
      updateNote(editingId, editValue.trim());
    }
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;

    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} 分钟前`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小时前`;
    if (date.toDateString() === now.toDateString()) return '今天';

    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full">
      <form onSubmit={handleSubmit} className="mb-3">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="写下你的想法..."
          rows={2}
          className="w-full px-3 py-2 text-sm bg-canvas border border-hairline rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors resize-none"
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-3 py-1 text-xs bg-primary text-on-primary rounded-md hover:bg-primary-active disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            保存笔记
          </button>
        </div>
      </form>

      <div className="flex-1 overflow-auto space-y-2">
        {notes.length === 0 ? (
          <div className="text-center text-muted-soft text-sm py-4">
            暂无笔记，记录你的想法吧
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="group p-2 rounded-md bg-surface-soft/30 border border-hairline/30 hover:border-hairline transition-colors"
            >
              {editingId === note.id ? (
                <div className="space-y-2">
                  <textarea
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    rows={2}
                    className="w-full px-2 py-1 text-sm bg-canvas border border-primary rounded focus:outline-none resize-none"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={cancelEdit}
                      className="px-2 py-0.5 text-xs text-muted hover:text-ink transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={saveEdit}
                      className="px-2 py-0.5 text-xs bg-primary text-on-primary rounded hover:bg-primary-active transition-colors"
                    >
                      保存
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-body whitespace-pre-wrap break-words">{note.content}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-soft">{formatTime(note.createdAt)}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => startEdit(note.id, note.content)}
                        className="p-1 rounded text-muted-soft hover:text-primary hover:bg-primary/10 transition-colors"
                        title="编辑"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-1 rounded text-muted-soft hover:text-red-500 hover:bg-red-50 transition-colors"
                        title="删除"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {notes.length > 3 && (
        <div className="mt-2 pt-2 border-t border-hairline/50 flex justify-end">
          <button
            onClick={clearAll}
            className="text-xs text-muted hover:text-red-500 transition-colors"
          >
            清空全部笔记
          </button>
        </div>
      )}
    </div>
  );
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface AIChatStore {
  messages: ChatMessage[];
  isLoading: boolean;
  apiKey: string;
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  setLoading: (loading: boolean) => void;
  setApiKey: (key: string) => void;
  clearMessages: () => void;
}

const useAIChatStore = create<AIChatStore>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      apiKey: '',
      addMessage: (role, content) => {
        const message: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          role,
          content,
          timestamp: Date.now(),
        };
        set((state) => ({ messages: [...state.messages.slice(-20), message] }));
      },
      setLoading: (isLoading) => set({ isLoading }),
      setApiKey: (apiKey) => set({ apiKey }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'mindtab-ai-chat',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

function AIChatWidget() {
  const { messages, isLoading, apiKey, addMessage, setLoading, clearMessages } = useAIChatStore();
  const [inputValue, setInputValue] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    addMessage('user', userMessage);
    setLoading(true);

    if (!apiKey) {
      addMessage('assistant', '请先在设置中配置 API Key');
      setLoading(false);
      setShowSettings(true);
      return;
    }

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'anthropic/claude-3-haiku',
          messages: [
            { role: 'system', content: '你是一个友好的AI助手，请用简洁的语言回答。' },
            ...messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage },
          ],
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const assistantMessage = data.choices?.[0]?.message?.content || '抱歉，我无法回答这个问题。';
      addMessage('assistant', assistantMessage);
    } catch {
      addMessage('assistant', '抱歉，发生了错误。请检查 API Key 是否正确。');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveApiKey = () => {
    useAIChatStore.getState().setApiKey(localApiKey);
    setShowSettings(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-soft">{messages.length} 条消息</span>
        <div className="flex gap-1">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1 rounded text-muted-soft hover:text-primary hover:bg-surface-soft transition-colors"
            title="设置"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              className="p-1 rounded text-muted-soft hover:text-red-500 hover:bg-red-50 transition-colors"
              title="清空"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {showSettings && (
        <div className="mb-2 p-2 bg-surface-soft/50 rounded-lg border border-hairline/30">
          <label className="text-xs text-muted mb-1 block">OpenRouter API Key</label>
          <input
            type="password"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
            placeholder="sk-or-..."
            className="w-full h-7 px-2 text-xs bg-canvas border border-hairline rounded focus:outline-none focus:border-primary"
          />
          <div className="flex justify-end mt-1">
            <button
              onClick={handleSaveApiKey}
              className="px-2 py-0.5 text-xs bg-primary text-on-primary rounded hover:bg-primary-active transition-colors"
            >
              保存
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto space-y-2 mb-2 min-h-0">
        {messages.length === 0 ? (
          <div className="text-center text-muted-soft text-sm py-4">
            <div className="text-2xl mb-2">💬</div>
            <p>开始对话吧！</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] px-2 py-1.5 rounded-lg text-xs ${
                  msg.role === 'user'
                    ? 'bg-primary/10 text-ink'
                    : 'bg-surface-soft/50 text-body'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="px-2 py-1.5 rounded-lg bg-surface-soft/50">
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入消息..."
          disabled={isLoading}
          className="flex-1 h-8 px-3 text-xs bg-canvas border border-hairline rounded-lg focus:outline-none focus:border-primary disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary rounded-lg hover:bg-primary-active disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </form>
    </div>
  );
}

function RightPanel() {
  return (
    <aside className="w-64 border-l border-hairline p-4">
      <h3 className="text-sm font-medium text-muted mb-4">快捷操作</h3>
      <div className="space-y-2">
        <ActionItem icon="file" label="新建文档" />
        <ActionItem icon="image" label="上传图片" />
        <ActionItem icon="link" label="添加链接" />
        <ActionItem icon="video" label="录制视频" />
      </div>

      <h3 className="text-sm font-medium text-muted mb-4 mt-6">最近访问</h3>
      <div className="space-y-2">
        <RecentItem title="项目文档" time="5分钟前" />
        <RecentItem title="会议记录" time="1小时前" />
        <RecentItem title="设计稿" time="昨天" />
      </div>

      <h3 className="text-sm font-medium text-muted mb-4 mt-6">快速链接</h3>
      <div className="space-y-2">
        <QuickLink href="https://github.com" label="GitHub" />
        <QuickLink href="https://notion.so" label="Notion" />
        <QuickLink href="https://calendar.google.com" label="日历" />
      </div>
    </aside>
  );
}

function ActionItem({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-body hover:bg-surface-soft transition-colors">
      <Icon icon={icon} />
      {label}
    </button>
  );
}

function RecentItem({ title, time }: { title: string; time: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-body hover:bg-surface-soft transition-colors">
      <div className="w-8 h-8 bg-primary/10 rounded flex items-center justify-center">
        <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      </div>
      <div className="flex-1 text-left">
        <div className="text-sm text-body">{title}</div>
        <div className="text-xs text-muted-soft">{time}</div>
      </div>
    </button>
  );
}

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-body hover:bg-surface-soft transition-colors"
    >
      <div className="w-8 h-8 bg-surface-soft rounded flex items-center justify-center">
        <svg className="w-4 h-4 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      </div>
      {label}
    </a>
  );
}