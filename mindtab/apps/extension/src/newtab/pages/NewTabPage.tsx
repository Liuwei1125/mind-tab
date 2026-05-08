import { useState, useEffect } from 'react';
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Clock,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Search,
  Plus,
  Trash2,
  Check,
  Play,
  RotateCcw,
  Settings,
  X,
  ChevronRight,
  GitBranch,
  Video,
  MessageCircle,
  Mail,
  Calendar,
  BookOpen,
  Zap,
  Target,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface Note {
  id: string;
  content: string;
  createdAt: number;
}

interface Widget {
  id: string;
  type: 'todo' | 'note' | 'weather' | 'search' | 'ai' | 'clock' | 'pomodoro' | 'stats';
  title: string;
}

const useTodoStore = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('mindtab-todos');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: '完成状态管理方案对比文档', completed: false },
      { id: '2', text: '重构 CartContext 为 Zustand store', completed: false },
      { id: '3', text: '编写单元测试覆盖 useReducer 逻辑', completed: false },
    ];
  });

  useEffect(() => {
    localStorage.setItem('mindtab-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now().toString(), text, completed: false }]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
};

const useNoteStore = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('mindtab-notes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mindtab-notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (content: string) => {
    if (!content.trim()) return;
    setNotes([...notes, { id: Date.now().toString(), content, createdAt: Date.now() }]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return { notes, addNote, deleteNote };
};

const useWidgetLayoutStore = () => {
  const [widgets, setWidgets] = useState<Widget[]>(() => {
    const saved = localStorage.getItem('mindtab-widgets');
    return saved ? JSON.parse(saved) : [
      { id: 'clock', type: 'clock', title: '日期' },
      { id: 'todo', type: 'todo', title: '待办事项' },
      { id: 'weather', type: 'weather', title: '天气' },
    ];
  });

  useEffect(() => {
    localStorage.setItem('mindtab-widgets', JSON.stringify(widgets));
  }, [widgets]);

  const reorderWidgets = (activeId: string, overId: string) => {
    setWidgets(items => {
      const oldIndex = items.findIndex(item => item.id === activeId);
      const newIndex = items.findIndex(item => item.id === overId);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  return { widgets, reorderWidgets };
};

const useWeatherStore = () => {
  const [weather, setWeather] = useState({
    temperature: 22,
    condition: 'cloudy',
    city: '北京',
    high: 26,
    low: 15,
    aqi: 45,
    description: '今天空气质量优，适合户外运动',
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&current=temperature_2m,relative_humidity_2m,weather_code&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Shanghai`
        );
        const data = await response.json();
        const weatherCodes: Record<number, string> = {
          0: 'clear',
          1: 'clear',
          2: 'cloudy',
          3: 'cloudy',
          45: 'foggy',
          48: 'foggy',
          51: 'rainy',
          53: 'rainy',
          55: 'rainy',
          61: 'rainy',
          63: 'rainy',
          65: 'rainy',
          71: 'snowy',
          73: 'snowy',
          75: 'snowy',
          80: 'rainy',
          81: 'rainy',
          82: 'rainy',
          95: 'thunder',
          96: 'thunder',
          99: 'thunder',
        };
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          condition: weatherCodes[data.current.weather_code] || 'clear',
          city: '北京',
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
          aqi: Math.floor(Math.random() * 50) + 30,
          description: '今天空气质量优，适合户外运动',
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
  }, []);

  return { weather };
};

const useAIChatStore = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('GPT-4o');

  const models = ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'Llama 3'];

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setMessages([...messages, { role: 'user', content }]);
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const responses = [
        '我已经分析了您的工作上下文，关于 React 状态管理，我推荐使用 Zustand，它简洁高效。',
        '好的，我来帮您总结今天的研究内容，并提供学习建议。',
        '理解了！我来帮您整理相关的学习资源和最佳实践。',
        '根据您的工作记忆，我整理了以下几点建议供您参考：',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，暂时无法获取回答。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, selectedModel, setSelectedModel, models, sendMessage };
};

const SortableItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const ClockWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[date.getDay()];
    const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月'];
    const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    
    return {
      date: `${month}月${day}日`,
      weekday,
      lunar: `${lunarMonths[month - 1]}${lunarDays[day - 1]}`,
      time: date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    };
  };

  const { date, weekday, lunar, time } = formatDate(currentTime);

  return (
    <div className="widget-card glass-card">
      <div className="text-center py-4">
        <div className="text-4xl font-bold text-white mb-1">{date}</div>
        <div className="text-lg text-purple-400 mb-1">{weekday}</div>
        <div className="text-sm text-gray-400">{lunar}</div>
        <div className="text-2xl font-light text-white/80 mt-3">{time}</div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-gray-500 mb-2">今日日程</div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-purple-400">10:00</span>
            <span className="text-gray-300">产品评审会</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-purple-400">14:00</span>
            <span className="text-gray-300">代码审查</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-purple-400">16:30</span>
            <span className="text-gray-300">团队周会</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <BookOpen size={14} />
          <span>工作记忆详情</span>
        </div>
        <div className="space-y-2">
          {[
            { title: 'React 官方文档 - useState & useReducer', url: 'react.dev' },
            { title: 'Zustand vs Jotai vs Redux Toolkit - 2024 对比', url: 'dev.to' },
          ].map((item, index) => (
            <div key={index} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="text-xs text-gray-300">{item.title}</div>
              <div className="text-xs text-gray-500 mt-1">{item.url}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TodoWidget = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <div className="widget-card glass-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Check size={16} className="text-green-400" />
          <span className="font-medium text-white">待办事项</span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {todos.map(todo => (
          <div
            key={todo.id}
            className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
              todo.completed ? 'bg-green-500/20' : 'bg-white/5'
            }`}
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                todo.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-500 hover:border-green-500'
              }`}
            >
              {todo.completed && <Check size={12} className="text-white" />}
            </button>
            <span
              className={`flex-1 text-sm ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-200'
              }`}
            >
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 hover:bg-red-500/20 rounded transition-colors"
            >
              <Trash2 size={14} className="text-gray-500 hover:text-red-400" />
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="添加新待办..."
          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
        >
          <Plus size={16} className="text-white" />
        </button>
      </form>
    </div>
  );
};

const PomodoroWidget = () => {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime(t => t - 1), 1000);
    } else if (time === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, time]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTime(25 * 60);
  };

  return (
    <div className="widget-card glass-card">
      <div className="text-center py-4">
        <div className="text-sm text-gray-400 mb-2">番茄钟</div>
        <div className="text-5xl font-bold text-white mb-4">{formatTime(time)}</div>
        <div className="flex gap-2 justify-center">
          <button
            onClick={startTimer}
            disabled={isRunning}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-sm text-white transition-colors flex items-center gap-2"
          >
            <Play size={14} />
            开始
          </button>
          <button
            onClick={resetTimer}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-white transition-colors flex items-center gap-2"
          >
            <RotateCcw size={14} />
            重置
          </button>
        </div>
      </div>
    </div>
  );
};

const WeatherWidget = () => {
  const { weather } = useWeatherStore();

  const WeatherIcon = () => {
    const iconProps = { size: 48 };
    switch (weather.condition) {
      case 'clear':
        return <Sun {...iconProps} className="text-yellow-400" />;
      case 'cloudy':
        return <Cloud {...iconProps} className="text-gray-300" />;
      case 'rainy':
        return <CloudRain {...iconProps} className="text-blue-400" />;
      case 'snowy':
        return <CloudSnow {...iconProps} className="text-cyan-300" />;
      case 'foggy':
        return <Wind {...iconProps} className="text-gray-400" />;
      default:
        return <Sun {...iconProps} className="text-yellow-400" />;
    }
  };

  const getAqiLevel = (aqi: number) => {
    if (aqi <= 50) return { text: '优', color: 'text-green-400', bg: 'bg-green-500/20' };
    if (aqi <= 100) return { text: '良', color: 'text-yellow-400', bg: 'bg-yellow-500/20' };
    if (aqi <= 150) return { text: '轻度', color: 'text-orange-400', bg: 'bg-orange-500/20' };
    if (aqi <= 200) return { text: '中度', color: 'text-red-400', bg: 'bg-red-500/20' };
    return { text: '重度', color: 'text-purple-400', bg: 'bg-purple-500/20' };
  };

  const aqiLevel = getAqiLevel(weather.aqi);

  return (
    <div className="widget-card glass-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sun size={16} className="text-yellow-400" />
          <span className="font-medium text-white">天气</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${aqiLevel.color} ${aqiLevel.bg}`}>
          AQI {weather.aqi} {aqiLevel.text}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <WeatherIcon />
        <div>
          <div className="text-4xl font-bold text-white">{weather.temperature}°</div>
          <div className="text-gray-400 text-sm">{weather.city}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-4 text-sm">
        <span className="text-gray-400">多云</span>
        <span className="text-gray-500">|</span>
        <span className="text-gray-400">{weather.low}°/{weather.high}°</span>
      </div>

      <div className="mt-3 p-2 bg-white/5 rounded-lg">
        <p className="text-xs text-gray-400">{weather.description}</p>
      </div>
    </div>
  );
};

const StatsWidget = () => {
  return (
    <div className="widget-card glass-card">
      <div className="flex items-center gap-2 mb-3">
        <Target size={16} className="text-purple-400" />
        <span className="font-medium text-white">专注统计</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
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
};

const GitHubWidget = () => {
  return (
    <div className="widget-card glass-card">
      <div className="flex items-center gap-2 mb-3">
        <GitBranch size={16} className="text-white" />
        <span className="font-medium text-white">GitHub 贡献</span>
      </div>

      <div className="text-center mb-3">
        <div className="text-sm text-gray-400 mb-1">今日贡献</div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-orange-500/20 rounded-lg">
            <div className="text-3xl font-bold text-orange-400">5</div>
            <div className="text-xs text-gray-500">提交</div>
          </div>
          <div className="p-3 bg-green-500/20 rounded-lg">
            <div className="text-3xl font-bold text-green-400">2</div>
            <div className="text-xs text-gray-500">PR</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkMemoryCard = () => {
  return (
    <div className="glass-card p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Sparkles size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">工作记忆</h3>
            <p className="text-xs text-gray-500">您今天在研究 React 状态管理，我整理了：</p>
          </div>
        </div>
        <span className="text-xs text-gray-500">5 分钟前更新</span>
      </div>

      <ul className="space-y-2 mb-4">
        <li className="flex items-center gap-2 text-gray-300 text-sm">
          <span className="text-green-400">✓</span>
          3 个相关页面摘要
        </li>
        <li className="flex items-center gap-2 text-gray-300 text-sm">
          <span className="text-blue-400">◉</span>
          Stack Overflow 上 2 个高赞解决方案
        </li>
        <li className="flex items-center gap-2 text-gray-300 text-sm">
          <span className="text-purple-400">◆</span>
          1 篇推荐深度文章
        </li>
      </ul>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm text-white transition-colors flex items-center gap-2">
          查看详情
          <ChevronRight size={14} />
        </button>
        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-gray-300 transition-colors">
          忽略
        </button>
      </div>
    </div>
  );
};

const AIInputBox = () => {
  const { messages, isLoading, selectedModel, setSelectedModel, models, sendMessage } = useAIChatStore();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(inputValue);
    setInputValue('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-3">
        <span className="text-xs text-gray-500">AI 已理解你今天的工作上下文</span>
        <span className="text-xs text-purple-400 ml-2">React 状态管理</span>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-4 py-3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="问我任何问题，或输入指令..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <select
              value={selectedModel}
              onChange={e => setSelectedModel(e.target.value)}
              className="bg-white/10 text-white text-sm px-3 py-1 rounded-lg border-none outline-none cursor-pointer"
            >
              {models.map(model => (
                <option key={model} value={model} className="bg-gray-800">
                  {model}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="w-8 h-8 rounded-full bg-purple-600 hover:bg-purple-500 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronRight size={16} className="text-white" />
            </button>
          </div>
        </div>
      </form>

      <div className="flex justify-center gap-2 mt-4">
        {['总结今天的研究', '我接下来该做什么', '整理我的标签页', '推荐学习资源'].map((action, index) => (
          <button
            key={index}
            onClick={() => setInputValue(action)}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-full text-xs text-gray-400 transition-colors"
          >
            {action}
          </button>
        ))}
      </div>

      {messages.length > 0 && (
        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg ${
                msg.role === 'user' ? 'bg-purple-600/30' : 'bg-white/5'
              }`}
            >
              <span className={`text-xs mb-1 block ${
                msg.role === 'user' ? 'text-purple-300' : 'text-gray-500'
              }`}>
                {msg.role === 'user' ? '我' : 'AI'}
              </span>
              <p className="text-sm text-gray-200">{msg.content}</p>
            </div>
          ))}
          {isLoading && (
            <div className="p-3 rounded-lg bg-white/5">
              <span className="text-xs text-gray-500">AI</span>
              <p className="text-sm text-gray-400 mt-1">思考中...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SettingsPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'widgets' | 'layout'>('general');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-end">
      <div className="w-80 h-full bg-gray-900/95 border-l border-white/10 animate-slide-in">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="font-semibold text-white">设置</h3>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded transition-colors">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="flex border-b border-white/10">
          {[
            { id: 'general' as const, label: '基本设置' },
            { id: 'widgets' as const, label: '小组件' },
            { id: 'layout' as const, label: '布局' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 text-sm transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">AI 模型</label>
                <select className="w-full bg-white/10 text-white text-sm px-3 py-2 rounded-lg border border-white/10 outline-none focus:border-purple-500">
                  <option value="gpt4">GPT-4o</option>
                  <option value="claude">Claude 3.5</option>
                  <option value="gemini">Gemini 1.5</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">API Key</label>
                <input
                  type="password"
                  placeholder="sk-..."
                  className="w-full bg-white/10 text-white text-sm px-3 py-2 rounded-lg border border-white/10 outline-none focus:border-purple-500 placeholder-gray-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">标签页访问权限</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">已授权</span>
              </div>
            </div>
          )}

          {activeTab === 'widgets' && (
            <div className="space-y-2">
              {[
                { id: 'weather', name: '天气', icon: Sun },
                { id: 'memory', name: '工作记忆', icon: Sparkles },
                { id: 'todo', name: '待办清单', icon: Check },
                { id: 'pomodoro', name: '番茄钟', icon: Zap },
                { id: 'habit', name: '习惯打卡', icon: Calendar },
                { id: 'notes', name: '知识卡片', icon: BookOpen },
              ].map(widget => (
                <div key={widget.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-3">
                    <widget.icon size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-200">{widget.name}</span>
                  </div>
                  <button className="text-xs text-red-400 hover:text-red-300">移除</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">布局预览</label>
                <div className="flex gap-2">
                  {['左栏', '中栏', '右栏'].map((col, index) => (
                    <div
                      key={col}
                      className={`flex-1 py-2 text-center text-xs rounded-lg ${
                        index === 1 ? 'bg-purple-600/30 text-purple-300' : 'bg-white/5 text-gray-500'
                      }`}
                    >
                      {col}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">显示比例</label>
                <select className="w-full bg-white/10 text-white text-sm px-3 py-2 rounded-lg border border-white/10 outline-none focus:border-purple-500">
                  <option value="1:1:1">1:1:1 均等</option>
                  <option value="1:2:1">左:中:右 1:2:1</option>
                  <option value="2:1:1">左:中:右 2:1:1</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-gray-300 transition-colors">
              创建组件
            </button>
            <button className="flex-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm text-gray-300 transition-colors">
              我的组件
            </button>
            <button className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm text-white transition-colors flex items-center justify-center gap-2">
              <MessageCircle size={14} />
              AI 工坊
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickLinks = () => {
  const links = [
    { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
    { icon: Video, href: 'https://youtube.com', label: 'YouTube' },
    { icon: MessageCircle, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'https://mail.google.com', label: 'Gmail' },
    { icon: Calendar, href: 'https://calendar.google.com', label: 'Calendar' },
    { icon: BookOpen, href: 'https://chrome.google.com/webstore', label: 'Chrome Store' },
  ];

  return (
    <div className="flex items-center justify-center gap-2">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
          title={link.label}
        >
          <link.icon size={18} className="text-gray-400 group-hover:text-white" />
        </a>
      ))}
    </div>
  );
};

export default function NewTabPage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { widgets, reorderWidgets } = useWidgetLayoutStore();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1.5 bg-purple-600/30 text-purple-300 text-xs rounded-full flex items-center gap-2">
              <Zap size={12} />
              下午工作模式
            </span>
          </div>
          <button
            onClick={() => setSettingsOpen(true)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Settings size={18} className="text-gray-400" />
          </button>
        </div>

        <WorkMemoryCard />

        <div className="my-8">
          <AIInputBox />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-4">
            <ClockWidget />
          </div>

          <div className="space-y-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={widgets.map(w => w.id)} strategy={verticalListSortingStrategy}>
                <TodoWidget />
              </SortableContext>
            </DndContext>
            <PomodoroWidget />
          </div>

          <div className="space-y-4">
            <WeatherWidget />
            <StatsWidget />
            <GitHubWidget />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <QuickLinks />
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Settings size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
