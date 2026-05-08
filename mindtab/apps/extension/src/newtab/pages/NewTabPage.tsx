import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
  { id: 'gh', label: 'GH', href: 'https://github.com', bgColor: 'bg-zinc-700' },
  { id: 'yt', label: 'YT', href: 'https://youtube.com', bgColor: 'bg-red-600' },
  { id: 'tw', label: 'TW', href: 'https://twitter.com', bgColor: 'bg-sky-500' },
  { id: 'gm', label: 'GM', href: 'https://gmail.com', bgColor: 'bg-red-500' },
  { id: 'nn', label: 'NN', href: 'https://notion.so', bgColor: 'bg-neutral-800' },
  { id: 'cg', label: 'CG', href: 'https://calendar.google.com', bgColor: 'bg-blue-600' },
];

export function NewTabPage() {
  const [showSettings, setShowSettings] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('claude');

  const models = [
    { value: 'claude', label: 'Claude 3.5' },
    { value: 'gpt-4', label: 'GPT-4o' },
    { value: 'gpt-3.5', label: 'GPT-3.5' },
  ];

  return (
    <div className="h-screen w-screen bg-neutral-950 text-neutral-50 font-sans overflow-hidden">
      <Header onSettingsClick={() => setShowSettings(true)} />
      
      <div className="flex-1 overflow-auto">
        <MemoryCard />
        
        <AIInput 
          query={aiQuery}
          setQuery={setAiQuery}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          models={models}
        />
        
        <div className="max-w-7xl mx-auto px-6 pb-20 mt-6">
          <div className="grid grid-cols-3 gap-6">
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

function Header({ onSettingsClick }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-14 px-6 flex items-center justify-between border-b border-neutral-800 bg-neutral-950">
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <span className="font-semibold text-white tracking-tight">MindTab</span>
        </div>
        
        <div className="h-6 w-px bg-neutral-800"></div>
        
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-400">工作空间</span>
          <div className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-amber-500 font-medium">下午专注模式</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-neutral-200">
              {time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-xs text-neutral-500">
              {time.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' })}
            </div>
          </div>
        </div>
        
        <div className="h-6 w-px bg-neutral-800"></div>
        
        <button 
          onClick={onSettingsClick}
          className="w-9 h-9 rounded-lg hover:bg-neutral-800 flex items-center justify-center transition-colors"
        >
          <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
      <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <div>
              <div className="font-semibold text-white mb-0.5">工作记忆</div>
              <div className="text-sm text-neutral-500">你今天在研究 React 状态管理，我整理了相关资源</div>
            </div>
          </div>
          <span className="text-xs text-neutral-600">5 分钟前更新</span>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex items-center gap-3 text-sm text-neutral-300">
            <span className="w-6 h-6 bg-green-500/20 text-green-400 rounded-md flex items-center justify-center text-xs font-medium">✓</span>
            <span>3 个相关页面摘要</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500">React 官方文档、MDN</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-300">
            <span className="w-6 h-6 bg-amber-500/20 text-amber-400 rounded-md flex items-center justify-center text-xs font-medium">↗</span>
            <span>2 个社区解决方案</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500">Stack Overflow</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-neutral-300">
            <span className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-md flex items-center justify-center text-xs font-medium">📄</span>
            <span>1 篇推荐深度文章</span>
            <span className="text-neutral-600">·</span>
            <span className="text-neutral-500">技术博客</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm font-medium text-white transition-colors">
            查看详情
          </button>
          <button className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors">
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
    '下一步建议',
    '整理标签页',
    '推荐资源',
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('AI Query:', query);
      setShowQuickActions(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 mt-6 relative">
      <div className="text-center text-xs text-neutral-500 mb-3">
        AI 已理解你的工作上下文 · React 状态管理
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="flex items-center bg-neutral-900 rounded-2xl border border-neutral-800 hover:border-neutral-700 transition-colors overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowQuickActions(true)}
            onBlur={() => setTimeout(() => setShowQuickActions(false), 200)}
            placeholder="问我任何问题，或输入指令..."
            className="flex-1 px-5 py-4 bg-transparent text-white placeholder-neutral-500 focus:outline-none"
          />
          
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="px-4 py-4 bg-neutral-800 text-white text-sm border-l border-neutral-700 focus:outline-none cursor-pointer hover:bg-neutral-700 transition-colors"
          >
            {models.map((model) => (
              <option key={model.value} value={model.value} className="bg-neutral-900">
                {model.label}
              </option>
            ))}
          </select>
          
          <button
            type="submit"
            disabled={!query.trim()}
            className="w-14 h-14 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9" />
            </svg>
          </button>
        </div>
      </form>

      {showQuickActions && !query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-900 rounded-xl border border-neutral-800 shadow-2xl z-50">
          <div className="p-2">
            <div className="text-xs text-neutral-500 px-3 py-2">快捷指令</div>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(action);
                    setShowQuickActions(false);
                  }}
                  className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LeftColumn() {
  return (
    <div className="space-y-6">
      <CalendarCard />
      <MemoryDetailsCard />
    </div>
  );
}

function CalendarCard() {
  const [date] = useState(new Date());

  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
      <div className="text-center mb-6">
        <div className="text-5xl font-bold text-white mb-1">
          {date.getDate()}
        </div>
        <div className="text-amber-500 text-sm font-medium">
          {['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]}
        </div>
        <div className="text-neutral-500 text-xs mt-1">
          {date.getFullYear()} 年 {date.getMonth() + 1} 月
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-xs text-neutral-500 uppercase tracking-wider px-1 mb-3">今日安排</div>
        {mockCalendarEvents.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/50 transition-colors">
            <div className="text-xs text-amber-500 font-medium w-12">{event.time}</div>
            <div className="flex-1 text-sm text-neutral-300">{event.title}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
        <div className="text-xs text-amber-400 flex items-center gap-2">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>收藏了一篇关于 React 的文章</span>
        </div>
      </div>
    </div>
  );
}

function MemoryDetailsCard() {
  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span className="text-sm font-medium text-white">记忆详情</span>
      </div>

      <div className="space-y-3">
        {mockMemoryItems.map((item) => (
          <div key={item.id} className="p-3 bg-neutral-800/50 rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer">
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="text-sm text-neutral-200 font-medium leading-tight">{item.title}</div>
              <span className="text-xs text-neutral-500 shrink-0">{item.source}</span>
            </div>
            <div className="text-xs text-neutral-500 leading-relaxed">{item.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiddleColumn() {
  return (
    <div className="space-y-6">
      <TodoCard />
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

  const completedCount = todos.filter(t => t.completed).length;
  const totalCount = todos.length;

  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 11 12 14 22 4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
          <span className="text-sm font-medium text-white">待办事项</span>
        </div>
        {totalCount > 0 && (
          <span className="text-xs text-neutral-500">{completedCount}/{totalCount}</span>
        )}
      </div>

      <div className="space-y-2 mb-5">
        {todos.slice(0, 5).map((todo) => (
          <div key={todo.id} className="group flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-800/50 transition-colors">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                todo.completed 
                  ? 'bg-green-500 border-green-500' 
                  : 'border-neutral-600 hover:border-green-500'
              }`}
            >
              {todo.completed && (
                <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </button>
            <span className={`flex-1 text-sm ${todo.completed ? 'text-neutral-500 line-through' : 'text-neutral-300'}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="opacity-0 group-hover:opacity-100 w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-red-400 transition-all"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ))}
        {todos.length === 0 && (
          <div className="text-center py-6 text-sm text-neutral-500">暂无待办事项</div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="添加新待办..."
          className="flex-1 px-3 py-2.5 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputValue.trim()}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-sm font-medium text-white transition-colors"
        >
          添加
        </button>
      </form>
    </div>
  );
}

function PomodoroCard() {
  const { isRunning, minutes, seconds, mode, cycles, start, pause, reset } = usePomodoroStore();

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <span className="text-lg">🍅</span>
          <span className="text-sm font-medium text-white">番茄钟</span>
        </div>
        <span className="text-xs text-neutral-500">第 {cycles + 1} 个番茄</span>
      </div>

      <div className="text-center py-4">
        <div className={`text-5xl font-bold font-mono mb-2 ${mode === 'work' ? 'text-white' : 'text-green-400'}`}>
          {formatTime(minutes, seconds)}
        </div>
        <div className={`text-xs font-medium ${mode === 'work' ? 'text-amber-500' : 'text-green-400'}`}>
          {mode === 'work' ? '专注时间' : '休息时间'}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {!isRunning ? (
          <button
            onClick={start}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 rounded-lg text-sm font-medium text-white transition-colors"
          >
            开始专注
          </button>
        ) : (
          <button
            onClick={pause}
            className="px-5 py-2.5 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm font-medium text-white transition-colors"
          >
            暂停
          </button>
        )}
        <button
          onClick={reset}
          className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm text-neutral-300 transition-colors"
        >
          重置
        </button>
      </div>
    </div>
  );
}

function RightColumn() {
  return (
    <div className="space-y-6">
      <WeatherCard />
      <FocusStatsCard />
    </div>
  );
}

function WeatherCard() {
  const [weather] = useState({
    temperature: 22,
    city: '北京',
    condition: '多云',
    low: 15,
    high: 26,
    aqi: 45,
  });

  const getWeatherIcon = (condition) => {
    if (condition.includes('晴')) return (
      <svg className="w-12 h-12 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
    if (condition.includes('云')) return (
      <svg className="w-12 h-12 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    );
    return (
      <svg className="w-12 h-12 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25" />
        <line x1="8" y1="19" x2="8" y2="21" />
        <line x1="8" y1="13" x2="8" y2="15" />
        <line x1="16" y1="19" x2="16" y2="21" />
        <line x1="16" y1="13" x2="16" y2="15" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="12" y1="15" x2="12" y2="17" />
      </svg>
    );
  };

  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
          </svg>
          <span className="text-sm font-medium text-white">天气</span>
        </div>
        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
          AQI {weather.aqi}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {getWeatherIcon(weather.condition)}
        <div>
          <div className="text-4xl font-bold text-white">{weather.temperature}°</div>
          <div className="text-sm text-neutral-400">{weather.condition}</div>
          <div className="text-xs text-neutral-500">{weather.city}</div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-neutral-800">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500">温度范围</span>
          <span className="text-neutral-300">{weather.low}° - {weather.high}°</span>
        </div>
        <div className="mt-2 text-xs text-neutral-500 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
          空气质量优，适合户外运动
        </div>
      </div>
    </div>
  );
}

function FocusStatsCard() {
  return (
    <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="text-sm font-medium text-white">专注统计</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-neutral-800/50 rounded-xl">
          <div className="text-2xl font-bold text-amber-500">4.5h</div>
          <div className="text-xs text-neutral-500 mt-1">今日专注</div>
        </div>
        <div className="text-center p-3 bg-neutral-800/50 rounded-xl">
          <div className="text-2xl font-bold text-green-500">12</div>
          <div className="text-xs text-neutral-500 mt-1">完成任务</div>
        </div>
        <div className="text-center p-3 bg-neutral-800/50 rounded-xl">
          <div className="text-2xl font-bold text-orange-500">8</div>
          <div className="text-xs text-neutral-500 mt-1">番茄钟</div>
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
          className={`w-11 h-11 ${link.bgColor} rounded-xl flex items-center justify-center text-white text-xs font-semibold hover:scale-105 hover:shadow-lg transition-all`}
          title={link.label}
        >
          {link.label}
        </a>
      ))}
      
      <div className="w-px h-8 bg-neutral-700 mx-1"></div>
      
      <button className="w-11 h-11 bg-neutral-800 hover:bg-neutral-700 rounded-xl flex items-center justify-center transition-colors">
        <svg className="w-4 h-4 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <div className="fixed right-0 top-0 bottom-0 w-96 bg-neutral-900 border-l border-neutral-800 shadow-2xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-5 border-b border-neutral-800">
        <span className="font-semibold text-white text-lg">设置</span>
        <button
          onClick={onClose}
          className="w-9 h-9 hover:bg-neutral-800 rounded-lg flex items-center justify-center transition-colors"
        >
          <svg className="w-5 h-5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="flex border-b border-neutral-800">
        {['basic', 'widgets', 'appearance'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeTab === tab 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {tab === 'basic' ? '基本' : tab === 'widgets' ? '小组件' : '外观'}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-5">
        {activeTab === 'basic' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">AI 模型</label>
              <select className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500 transition-colors">
                <option value="claude">Claude 3.5 Sonnet</option>
                <option value="gpt-4">GPT-4o</option>
                <option value="gpt-3.5">GPT-3.5 Turbo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-xl text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">权限状态</label>
              <div className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-neutral-300">标签页访问</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-xs text-green-400">已授权</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'widgets' && (
          <div className="space-y-3">
            <div className="text-xs text-neutral-500 uppercase tracking-wider mb-3">已安装组件</div>
            {['天气', '工作记忆', '待办清单', '番茄钟', '专注统计'].map((widget, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-700 rounded-lg flex items-center justify-center">
                    <span className="text-neutral-400 text-sm">📦</span>
                  </div>
                  <span className="text-sm text-neutral-300">{widget}</span>
                </div>
                <button className="text-xs text-red-400 hover:text-red-300 px-3 py-1 rounded-lg hover:bg-red-500/10 transition-colors">移除</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-3">主题色</label>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-amber-500 rounded-xl ring-2 ring-amber-500 ring-offset-2 ring-offset-neutral-900"></button>
                <button className="w-10 h-10 bg-blue-500 rounded-xl"></button>
                <button className="w-10 h-10 bg-green-500 rounded-xl"></button>
                <button className="w-10 h-10 bg-purple-500 rounded-xl"></button>
                <button className="w-10 h-10 bg-neutral-700 rounded-xl"></button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-3">布局宽度</label>
              <div className="flex gap-2">
                <button className="flex-1 px-4 py-3 bg-amber-500/20 text-amber-400 rounded-xl text-sm font-medium border border-amber-500/30">
                  紧凑
                </button>
                <button className="flex-1 px-4 py-3 bg-neutral-800 text-neutral-400 rounded-xl text-sm hover:bg-neutral-700 transition-colors">
                  适中
                </button>
                <button className="flex-1 px-4 py-3 bg-neutral-800 text-neutral-400 rounded-xl text-sm hover:bg-neutral-700 transition-colors">
                  宽松
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
