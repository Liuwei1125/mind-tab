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
}

interface NoteStore {
  notes: NoteItem[];
  addNote: (content: string) => void;
  deleteNote: (id: string) => void;
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
        };
        set((state) => ({ notes: [newNote, ...state.notes] }));
      },
      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        }));
      },
    }),
    {
      name: 'mindtab-notes',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

interface PomodoroStore {
  isRunning: boolean;
  minutes: number;
  seconds: number;
  cycles: number;
  mode: 'work' | 'break';
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const usePomodoroStore = create<PomodoroStore>((set, get) => ({
  isRunning: false,
  minutes: 25,
  seconds: 0,
  cycles: 0,
  mode: 'work',
  start: () => {
    set({ isRunning: true });
    const interval = setInterval(() => {
      const { minutes, seconds, isRunning, mode } = get();
      if (!isRunning) {
        clearInterval(interval);
        return;
      }
      if (seconds === 0) {
        if (minutes === 0) {
          if (mode === 'work') {
            set({ mode: 'break', minutes: 5, seconds: 0, cycles: get().cycles + 1 });
          } else {
            set({ mode: 'work', minutes: 25, seconds: 0 });
          }
        } else {
          set({ minutes: minutes - 1, seconds: 59 });
        }
      } else {
        set({ seconds: seconds - 1 });
      }
    }, 1000);
  },
  pause: () => set({ isRunning: false }),
  reset: () => set({ isRunning: false, minutes: 25, seconds: 0, mode: 'work' }),
}));

interface CalendarEvent {
  id: string;
  title: string;
  time: string;
}

const mockCalendarEvents: CalendarEvent[] = [
  { id: '1', title: '产品评审会', time: '10:00' },
  { id: '2', title: '代码审查', time: '14:00' },
  { id: '3', title: '团队周会', time: '16:30' },
];

const mockMemoryItems = [
  { id: '1', title: 'React 官方文档 - useState & useReducer', source: 'react.dev', summary: '详细对比了 useState 和 useReducer 的适用场景' },
  { id: '2', title: 'Zustand vs Jotai vs Redux Toolkit - 2024 对比', source: 'dev.to', summary: '从包体积、API 简洁度和性能三个维度对比' },
  { id: '3', title: 'How to share state between components in React', source: 'stackoverflow.com', summary: '高赞回答讨论了 Context API、状态提升和第三方库方案' },
];

const quickLinks = [
  { id: 'gh', label: 'GH', href: 'https://github.com', color: 'bg-gray-700' },
  { id: 'yt', label: 'YT', href: 'https://youtube.com', color: 'bg-red-600' },
  { id: 'tw', label: 'TW', href: 'https://twitter.com', color: 'bg-blue-400' },
  { id: 'gm', label: 'GM', href: 'https://gmail.com', color: 'bg-red-500' },
  { id: 'nn', label: 'NN', href: 'https://notion.so', color: 'bg-black' },
  { id: 'cg', label: 'CG', href: 'https://calendar.google.com', color: 'bg-blue-600' },
];

export function NewTabPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('gpt-4');

  const models = [
    { value: 'gpt-4', label: 'GPT-4o' },
    { value: 'gpt-3.5', label: 'GPT-3.5' },
    { value: 'claude', label: 'Claude' },
  ];

  return (
    <div className="h-screen w-screen bg-[#0d0d12] flex flex-col overflow-hidden text-white">
      <Header />
      
      <div className="flex-1 overflow-auto">
        <MemoryCard />
        
        <AIInput 
          query={aiQuery}
          setQuery={setAiQuery}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          models={models}
        />
        
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-3 gap-4 mt-6">
            <LeftColumn />
            <MiddleColumn />
            <RightColumn />
          </div>
        </div>
      </div>

      <BottomBar />

      {showSettings && (
        <SettingsPanel onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}

function Header() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-12 px-6 flex items-center justify-between border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">M</span>
          </div>
          <span className="font-medium text-white">MindTab</span>
        </div>
        
        <div className="px-3 py-1 bg-purple-500/20 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span className="text-xs text-purple-200">下午工作模式</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="text-sm font-light text-gray-300">
            {time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        
        <button className="w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center transition-colors">
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
      </div>
    </header>
  );
}

function MemoryCard() {
  return (
    <div className="max-w-4xl mx-auto px-6 mt-6">
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] rounded-xl p-5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">🧠</span>
            </div>
            <div>
              <div className="font-medium text-white">工作记忆</div>
              <div className="text-xs text-gray-400">你今天在研究 React 状态管理，我整理了：</div>
            </div>
          </div>
          <span className="text-xs text-gray-500">5 分钟前更新</span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-red-400">✓</span>
            <span>3 个相关页面摘要</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-orange-400">↗</span>
            <span>Stack Overflow 上 2 个高赞解决方案</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span className="text-blue-400">📄</span>
            <span>1 篇推荐深度文章</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-medium transition-colors">
            查看详情
          </button>
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors">
            忽略
          </button>
        </div>
      </div>
    </div>
  );
}

function AIInput({ query, setQuery, selectedModel, setSelectedModel, models }) {
  const [showQuickActions, setShowQuickActions] = useState(false);

  const quickActions = [
    '总结今天的研究',
    '我接下来该做什么',
    '整理我的标签页',
    '推荐学习资源',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('AI Query:', query);
      setShowQuickActions(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 mt-6">
      <div className="relative">
        <div className="text-center text-xs text-gray-500 mb-2">
          AI 已理解你今天的工作上下文 · React 状态管理
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="flex items-center bg-[#1a1a2e] rounded-xl border border-white/10 overflow-hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setShowQuickActions(true)}
              onBlur={() => setTimeout(() => setShowQuickActions(false), 200)}
              placeholder="问我任何问题，或输入指令..."
              className="flex-1 px-5 py-3 bg-transparent text-white placeholder-gray-500 focus:outline-none"
            />
            
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="px-3 py-3 bg-white/5 text-white text-sm border-l border-white/10 focus:outline-none cursor-pointer"
            >
              {models.map((model) => (
                <option key={model.value} value={model.value} className="bg-[#1a1a2e]">
                  {model.label}
                </option>
              ))}
            </select>
            
            <button
              type="submit"
              disabled={!query.trim()}
              className="w-10 h-10 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9" />
              </svg>
            </button>
          </div>
        </form>

        {showQuickActions && !query && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a2e] rounded-xl border border-white/10 shadow-xl z-50">
            <div className="flex gap-2 p-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(action);
                    setShowQuickActions(false);
                  }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function LeftColumn() {
  const [date] = useState(new Date());

  return (
    <div className="space-y-4">
      <CalendarCard />
      <MemoryDetailsCard />
    </div>
  );
}

function CalendarCard() {
  const [date] = useState(new Date());

  return (
    <div className="bg-[#1a1a2e] rounded-xl border border-white/10 p-5">
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-white">
          {date.getDate()}
        </div>
        <div className="text-purple-400 text-sm font-medium">
          {['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]}
        </div>
        <div className="text-gray-500 text-xs">
          {date.getMonth() + 1}月 {date.getFullYear()}年
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">今日安排</div>
        {mockCalendarEvents.map((event) => (
          <div key={event.id} className="flex items-center gap-3">
            <div className="text-xs text-gray-500 w-12">{event.time}</div>
            <div className="flex-1">
              <div className="text-sm text-gray-300">{event.title}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg border border-purple-500/20">
        <div className="text-xs text-purple-300">
          📚 你收藏了一篇关于 React 的文章，今天下午有空可以阅读
        </div>
      </div>
    </div>
  );
}

function MemoryDetailsCard() {
  return (
    <div className="bg-[#1a1a2e] rounded-xl border border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-red-400">📝</span>
        <span className="text-sm font-medium text-white">工作记忆详情</span>
      </div>

      <div className="space-y-3">
        {mockMemoryItems.map((item) => (
          <div key={item.id} className="p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-1">
              <div className="text-sm text-gray-300 font-medium">{item.title}</div>
              <span className="text-xs text-gray-500">{item.source}</span>
            </div>
            <div className="text-xs text-gray-500">{item.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiddleColumn() {
  return (
    <div className="space-y-4">
      <TodoCard />
      <PomodoroCard />
      <PomodoroCard />
    </div>
  );
}

function TodoCard() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="bg-[#1a1a2e] rounded-xl border border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-green-400">✓</span>
        <span className="text-sm font-medium text-white">待办事项</span>
      </div>

      <div className="space-y-2 mb-4">
        {todos.slice(0, 4).map((todo) => (
          <div key={todo.id} className="flex items-center gap-3">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-600 hover:border-green-500'
              }`}
            >
              {todo.completed && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
            <span className={`flex-1 text-sm ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 hover:opacity-100 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-400 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加新待办..."
          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="px-3 py-2 bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium transition-colors"
        >
          添加
        </button>
      </form>
    </div>
  );
}

function PomodoroCard() {
  const { isRunning, minutes, seconds, mode, start, pause, reset } = usePomodoroStore();

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#1a1a2e] rounded-xl border border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-orange-400">🍅</span>
        <span className="text-sm font-medium text-white">番茄钟</span>
      </div>

      <div className="text-center py-4">
        <div className={`text-4xl font-bold ${mode === 'work' ? 'text-white' : 'text-green-400'}`}>
          {formatTime(minutes, seconds)}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {mode === 'work' ? '专注时间' : '休息时间'}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-medium transition-colors"
          >
            开始
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-medium transition-colors"
          >
            暂停
          </button>
        )}
        <button
          onClick={reset}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-gray-300 transition-colors"
        >
          重置
        </button>
      </div>
    </div>
  );
}

function RightColumn() {
  return (
    <div className="space-y-4">
      <WeatherCard />
      <FocusStatsCard />
      <GitHubContributionCard />
    </div>
  );
}

function WeatherCard() {
  const [weather, setWeather] = useState({
    temperature: 22,
    city: '北京',
    condition: '多云',
    low: 15,
    high: 26,
    aqi: 45,
  });

  const getWeatherEmoji = (condition) => {
    if (condition.includes('晴')) return '☀️';
    if (condition.includes('云')) return '⛅';
    if (condition.includes('雨')) return '🌧️';
    return '🌤️';
  };

  return (
    <div className="bg-[#1a1a2e] rounded-xl border border-white/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">🌤️</span>
          <span className="text-sm font-medium text-white">天气</span>
        </div>
        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs">
          AQI {weather.aqi}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-5xl">{getWeatherEmoji(weather.condition)}</div>
        <div>
          <div className="text-3xl font-bold text-white">{weather.temperature}°</div>
          <div className="text-sm text-gray-400">{weather.condition}</div>
          <div className="text-xs text-gray-500">{weather.city}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">温度范围</span>
          <span className="text-sm text-gray-300">{weather.low}° - {weather.high}°</span>
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">今日空气质量优，适合户外运动</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FocusStatsCard() {
  return (
    <div className="bg-[#1a1a2e] rounded-xl border border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-purple-400">🎯</span>
        <span className="text-sm font-medium text-white">专注统计</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">4.5h</div>
          <div className="text-xs text-gray-500">今日专注</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">12</div>
          <div className="text-xs text-gray-500">完成任务</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">8</div>
          <div className="text-xs text-gray-500">番茄钟</div>
        </div>
      </div>
    </div>
  );
}

function GitHubContributionCard() {
  return (
    <div className="bg-[#1a1a2e] rounded-xl border border-white/10 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-400">🐙</span>
        <span className="text-sm font-medium text-white">GitHub 贡献</span>
      </div>

      <div className="text-center mb-4">
        <div className="text-xs text-gray-500 mb-2">今日贡献</div>
        <div className="flex justify-center gap-2">
          <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-400">5</span>
          </div>
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-green-400">2</span>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-2">
          <span className="text-xs text-gray-500">提交</span>
          <span className="text-xs text-gray-500">PR</span>
        </div>
      </div>
    </div>
  );
}

function BottomBar() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
      {quickLinks.map((link) => (
        <a
          key={link.id}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 ${link.color} rounded-lg flex items-center justify-center text-white text-sm font-medium hover:scale-110 transition-transform`}
          title={link.label}
        >
          {link.label}
        </a>
      ))}
      
      <div className="w-px h-8 bg-white/10 mx-2"></div>
      
      <button className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors">
        <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>
    </div>
  );
}

function SettingsPanel({ onClose }) {
  const [activeTab, setActiveTab] = useState('basic');
  const [apiKey, setApiKey] = useState('');

  return (
    <div className="fixed right-0 top-0 bottom-0 w-80 bg-[#1a1a2e] border-l border-white/10 shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <span className="font-medium text-white">设置</span>
        <button
          onClick={onClose}
          className="w-8 h-8 hover:bg-white/10 rounded-lg flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="flex border-b border-white/10">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex-1 px-4 py-2 text-sm transition-colors ${
            activeTab === 'basic' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          基本设置
        </button>
        <button
          onClick={() => setActiveTab('widgets')}
          className={`flex-1 px-4 py-2 text-sm transition-colors ${
            activeTab === 'widgets' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          小组件
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`flex-1 px-4 py-2 text-sm transition-colors ${
            activeTab === 'layout' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          布局
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">AI 模型</label>
              <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500">
                <option value="gpt-4">GPT-4o</option>
                <option value="gpt-3.5">GPT-3.5</option>
                <option value="claude">Claude</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">权限</label>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span className="text-sm text-gray-300">标签页访问权限</span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="text-xs text-green-400">已授权</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'widgets' && (
          <div className="space-y-3">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">已安装组件</div>
            {['天气', '工作记忆', '待办清单', '番茄钟', '习惯打卡', '知识卡片'].map((widget, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">📦</span>
                  <span className="text-sm text-gray-300">{widget}</span>
                </div>
                <button className="text-xs text-red-400 hover:text-red-300">移除</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">三栏布局</label>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 transition-colors">
                  左栏
                </button>
                <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 transition-colors">
                  中栏
                </button>
                <button className="flex-1 px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-gray-300 transition-colors">
                  右栏
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">显示比例</label>
              <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500">
                <option value="1:1:1">1:1:1 均等</option>
                <option value="1:2:1">1:2:1 中间宽</option>
                <option value="2:1:1">2:1:1 左侧宽</option>
                <option value="1:1:2">1:1:2 右侧宽</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">时段模式</label>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-purple-500/20 text-purple-400 rounded-lg text-xs font-medium">
                  上午模式
                </button>
                <button className="flex-1 px-3 py-2 bg-white/5 text-gray-400 rounded-lg text-xs">
                  下午模式
                </button>
                <button className="flex-1 px-3 py-2 bg-white/5 text-gray-400 rounded-lg text-xs">
                  夜间模式
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
