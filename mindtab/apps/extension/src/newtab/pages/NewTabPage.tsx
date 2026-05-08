import { useState, useEffect, createContext, useContext } from 'react';
import {
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
  ChevronDown,
  ChevronUp,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Wind,
  Clock,
  Moon,
} from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({ theme: 'light', toggleTheme: () => {} });

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('mindtab-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mindtab-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

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

const useAIChatStore = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('GPT-4o');
  const [currentResponse, setCurrentResponse] = useState('');

  const models = ['GPT-4o', 'Claude 3.5', 'Gemini 1.5', 'Llama 3'];

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    setMessages([...messages, { role: 'user', content }]);
    setIsLoading(true);
    setCurrentResponse('');

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const responses = [
        '我已经分析了您的工作上下文，关于 React 状态管理，我推荐使用 Zustand，它简洁高效。',
        '好的，我来帮您总结今天的研究内容，并提供学习建议。',
        '理解了！我来帮您整理相关的学习资源和最佳实践。',
        '根据您的工作记忆，我整理了以下几点建议供您参考：',
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      for (let i = 0; i <= randomResponse.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        setCurrentResponse(randomResponse.slice(0, i));
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: randomResponse }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，暂时无法获取回答。' }]);
    } finally {
      setIsLoading(false);
      setCurrentResponse('');
    }
  };

  return { messages, isLoading, selectedModel, setSelectedModel, models, sendMessage, currentResponse };
};

const PeriodBadge = () => {
  const [period, setPeriod] = useState('下午工作模式');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setPeriod('上午工作模式');
    else if (hour >= 12 && hour < 14) setPeriod('午休时间');
    else if (hour >= 14 && hour < 18) setPeriod('下午工作模式');
    else if (hour >= 18 && hour < 22) setPeriod('晚间模式');
    else setPeriod('深夜模式');
  }, []);

  return (
    <div className="period-badge">
      <span className="dot"></span>
      {period}
    </div>
  );
};

const AIContextCard = () => {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const memoryPages = [
    { title: 'React 官方文档 - useState & useReducer', domain: 'react.dev', summary: '深入理解 React Hooks 的基本用法和最佳实践' },
    { title: 'Zustand vs Jotai vs Redux Toolkit - 2024 对比', domain: 'dev.to', summary: '三大状态管理方案的优缺点对比分析' },
    { title: 'Stack Overflow - React State Management', domain: 'stackoverflow.com', summary: '社区热议的状态管理解决方案' },
  ];

  if (dismissed) return null;

  return (
    <div className={`ai-context-card ${dismissed ? 'dismissed' : ''}`}>
      <div className="ai-context-header">
        <div className="ai-context-title">
          <span className="icon">✨</span>
          <span>AI 工作记忆</span>
        </div>
        <span className="ai-context-timestamp">5 分钟前更新</span>
      </div>
      
      <div className="ai-context-body">
        <span className="line">您今天在研究 React 状态管理</span>
        <span className="line">我已整理 {memoryPages.length} 个相关页面摘要和资源</span>
      </div>

      <div className="ai-context-actions">
        <button className="btn btn-primary btn-sm" onClick={() => setExpanded(!expanded)}>
          {expanded ? '收起详情' : '查看详情'}
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        <button className="btn btn-sm" onClick={() => setDismissed(true)}>
          忽略
        </button>
      </div>

      <div className={`ai-context-details ${expanded ? 'expanded' : ''}`}>
        {memoryPages.map((page, index) => (
          <div key={index} className="detail-item">
            <div>
              <div className="detail-title">{page.title}</div>
              <div className="detail-domain">{page.domain}</div>
              <div className="detail-summary">{page.summary}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AIDialogSection = () => {
  const { messages, isLoading, selectedModel, setSelectedModel, models, sendMessage, currentResponse } = useAIChatStore();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMessage(inputValue);
    setInputValue('');
  };

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

  return (
    <div className="ai-dialog-section">
      <div className="ai-context-hint">
        <span>AI 已理解你今天的工作上下文</span> · React 状态管理
      </div>

      <form onSubmit={handleSubmit} className="dialog-input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          placeholder="问我任何问题，或输入指令..."
          className="dialog-input"
        />
        <div className="model-selector">
          <select
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            className="model-select"
          >
            {models.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
          <button type="submit" className="send-btn" disabled={isLoading || !inputValue.trim()}>
            <ChevronRight size={16} />
          </button>
        </div>
      </form>

      <div className="quick-commands">
        {['总结今天的研究', '我接下来该做什么', '整理我的标签页', '推荐学习资源'].map((action, index) => (
          <button
            key={index}
            onClick={() => setInputValue(action)}
            className="quick-cmd"
          >
            {action}
          </button>
        ))}
      </div>

      <div className="ai-response-area">
        {isLoading && currentResponse && (
          <div className="ai-response visible">
            <span>{currentResponse}</span>
            <span className="typing-cursor"></span>
          </div>
        )}
        {!isLoading && lastMessage && lastMessage.role === 'assistant' && (
          <div className="ai-response visible">
            {lastMessage.content}
          </div>
        )}
      </div>
    </div>
  );
};

const LeftColumn = () => {
  const memoryPages = [
    { title: 'React 官方文档 - useState & useReducer', domain: 'react.dev' },
    { title: 'Zustand vs Jotai vs Redux Toolkit - 2024 对比', domain: 'dev.to' },
  ];

  const schedules = [
    { time: '10:00', title: '产品评审会' },
    { time: '14:00', title: '代码审查' },
    { time: '16:30', title: '团队周会' },
  ];

  return (
    <>
      <div className="column-card card">
        <div className="section-title">工作记忆详情</div>
        {memoryPages.map((page, index) => (
          <div key={index} className="memory-page">
            <div className="page-title">{page.title}</div>
            <div className="page-domain">{page.domain}</div>
          </div>
        ))}
      </div>

      <div className="column-card card">
        <div className="section-title">今日日程</div>
        {schedules.map((item, index) => (
          <div key={index} className="schedule-item">
            <span className="schedule-time">{item.time}</span>
            <span className="schedule-title">{item.title}</span>
          </div>
        ))}
      </div>
    </>
  );
};

const MiddleColumn = () => {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodoStore();
  const [inputValue, setInputValue] = useState('');
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

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(inputValue);
    setInputValue('');
  };

  return (
    <>
      <div className="column-card card">
        <div className="module-title">
          <Check size={16} style={{ color: 'var(--accent-purple)' }} />
          待办事项
        </div>
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <div
              className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
              onClick={() => toggleTodo(todo.id)}
            ></div>
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={{ opacity: 0.5, cursor: 'pointer' }}>
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        <form onSubmit={handleAddTodo} className="todo-add">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="添加新待办..."
          />
          <button type="submit" className="btn btn-primary btn-sm">
            <Plus size={14} />
          </button>
        </form>

        <div className="pomodoro">
          <div className="pomodoro-label">番茄钟</div>
          <div className="pomodoro-time">{formatTime(time)}</div>
          <div className="pomodoro-controls">
            <button
              onClick={() => setIsRunning(true)}
              disabled={isRunning}
              className="btn btn-primary btn-sm"
            >
              <Play size={12} /> 开始
            </button>
            <button
              onClick={() => { setIsRunning(false); setTime(25 * 60); }}
              className="btn btn-sm"
            >
              <RotateCcw size={12} /> 重置
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const RightColumn = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState({ temperature: 22, condition: 'cloudy', city: '北京', high: 26, low: 15 });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=39.9042&longitude=116.4074&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Asia/Shanghai`
        );
        const data = await response.json();
        const weatherCodes: Record<number, string> = { 0: 'clear', 1: 'clear', 2: 'cloudy', 3: 'cloudy', 45: 'foggy', 51: 'rainy', 61: 'rainy', 71: 'snowy', 95: 'thunder' };
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          condition: weatherCodes[data.current.weather_code] || 'clear',
          city: '北京',
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
        });
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      }
    };
    fetchWeather();
  }, []);

  const WeatherIcon = () => {
    const iconProps = { size: 20 };
    switch (weather.condition) {
      case 'clear': return <Sun {...iconProps} style={{ color: '#fbbf24' }} />;
      case 'cloudy': return <Cloud {...iconProps} style={{ color: '#9ca3af' }} />;
      case 'rainy': return <CloudRain {...iconProps} style={{ color: '#60a5fa' }} />;
      case 'snowy': return <CloudSnow {...iconProps} style={{ color: '#67e8f9' }} />;
      case 'foggy': return <Wind {...iconProps} style={{ color: '#9ca3af' }} />;
      default: return <Sun {...iconProps} style={{ color: '#fbbf24' }} />;
    }
  };

  const resources = [
    { title: 'React 状态管理完全指南', source: 'react.dev', reason: '官方推荐方案' },
    { title: 'Zustand 实战技巧', source: 'dev.to', reason: '最受欢迎的状态库' },
  ];

  return (
    <>
      <div className="column-card card">
        <div className="module-title">
          <Clock size={16} style={{ color: 'var(--accent-purple)' }} />
          时间和天气
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '4px' }}>
          {currentTime.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          {currentTime.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <WeatherIcon />
          <span style={{ fontSize: '1.5rem', fontWeight: 600 }}>{weather.temperature}°</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{weather.city}</span>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {weather.low}° / {weather.high}°
        </div>
      </div>

      <div className="column-card card">
        <div className="section-title">相关资料</div>
        {resources.map((res, index) => (
          <div key={index} className="resource-item">
            <div className="res-title">{res.title}</div>
            <div className="res-source">{res.source}</div>
            <div className="res-reason">{res.reason}</div>
          </div>
        ))}
      </div>

      <div className="column-card card">
        <div className="section-title">知识卡片</div>
        <div className="knowledge-card">
          <div className="knowledge-term">Zustand</div>
          <div className="knowledge-desc">一个轻量、简洁的状态管理解决方案，基于 React hooks</div>
        </div>
      </div>
    </>
  );
};

const SettingsPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'general' | 'widgets' | 'layout'>('general');

  if (!isOpen) return null;

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={e => e.stopPropagation()}>
        <div className="settings-header">
          <h3>设置</h3>
          <button onClick={onClose} className="btn btn-sm">
            <X size={16} />
          </button>
        </div>

        <div className="settings-tabs">
          {[
            { id: 'general' as const, label: '基本设置' },
            { id: 'widgets' as const, label: '小组件' },
            { id: 'layout' as const, label: '布局' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'general' && (
            <div className="settings-section">
              <div className="settings-field">
                <label>AI 模型</label>
                <select className="settings-input">
                  <option value="gpt4">GPT-4o</option>
                  <option value="claude">Claude 3.5</option>
                  <option value="gemini">Gemini 1.5</option>
                </select>
              </div>
              <div className="settings-field">
                <label>API Key</label>
                <input type="password" placeholder="sk-..." className="settings-input" />
              </div>
              <div className="settings-item">
                <span>标签页访问权限</span>
                <span className="badge-success">已授权</span>
              </div>
            </div>
          )}

          {activeTab === 'widgets' && (
            <div className="settings-section">
              {[
                { id: 'weather', name: '天气', icon: Sun },
                { id: 'memory', name: '工作记忆', icon: Sparkles },
                { id: 'todo', name: '待办清单', icon: Check },
                { id: 'pomodoro', name: '番茄钟', icon: Zap },
                { id: 'habit', name: '习惯打卡', icon: Calendar },
                { id: 'notes', name: '知识卡片', icon: BookOpen },
              ].map(widget => (
                <div key={widget.id} className="widget-item">
                  <div className="widget-info">
                    <widget.icon size={16} />
                    <span>{widget.name}</span>
                  </div>
                  <button className="btn-link-danger">移除</button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="settings-section">
              <div className="settings-field">
                <label>布局预览</label>
                <div className="layout-preview">
                  {['左栏', '中栏', '右栏'].map((col, index) => (
                    <div key={col} className={`layout-col ${index === 1 ? 'active' : ''}`}>
                      {col}
                    </div>
                  ))}
                </div>
              </div>
              <div className="settings-field">
                <label>显示比例</label>
                <select className="settings-input">
                  <option value="1:1:1">1:1:1 均等</option>
                  <option value="1:2:1">左:中:右 1:2:1</option>
                  <option value="2:1:1">左:中:右 2:1:1</option>
                </select>
              </div>
            </div>
          )}
        </div>

        <div className="settings-footer">
          <button className="btn btn-sm">创建组件</button>
          <button className="btn btn-sm">我的组件</button>
          <button className="btn btn-primary btn-sm">
            <MessageCircle size={14} /> AI 工坊
          </button>
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
    <div className="quick-links">
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="quick-link"
          title={link.label}
        >
          <link.icon size={18} />
        </a>
      ))}
    </div>
  );
};

export default function NewTabPage() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeProvider>
      <div className="app-container">
        <div className="top-bar">
          <PeriodBadge />
          <div className="top-bar-actions">
            <button
              className={`theme-toggle-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={toggleTheme}
              aria-label="切换主题"
            >
              <Sun size={16} className="theme-icon-light" />
              <Moon size={16} className="theme-icon-dark" />
            </button>
            <button onClick={() => setSettingsOpen(true)} className="btn btn-sm" aria-label="打开设置">
              <Settings size={14} />
            </button>
          </div>
        </div>
        <AIContextCard />
        <AIDialogSection />

        <div className="three-columns">
          <LeftColumn />
          <MiddleColumn />
          <RightColumn />
        </div>

        <QuickLinks />

        <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      </div>
    </ThemeProvider>
  );
}
