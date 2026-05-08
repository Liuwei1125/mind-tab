import React from 'react';

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
            placeholder="搜索或输入网址..."
            className="w-full h-10 pl-10 pr-4 bg-surface-card text-ink text-sm rounded-full border border-hairline transition-colors placeholder:text-muted-soft focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-9 h-9 rounded-full bg-surface-card border border-hairline flex items-center justify-center text-muted hover:text-ink hover:bg-surface-soft transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </button>
        <button className="w-9 h-9 rounded-full bg-surface-card border border-hairline flex items-center justify-center text-muted hover:text-ink hover:bg-surface-soft transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-surface-card border border-hairline flex items-center justify-center text-muted text-xs font-medium">
          U
        </div>
      </div>
    </header>
  );
}

function LeftSidebar() {
  const menuItems = [
    { icon: 'home', label: '首页', active: true },
    { icon: 'widget', label: '组件' },
    { icon: 'memory', label: '记忆' },
    { icon: 'workshop', label: '工坊' },
    { icon: 'bookmark', label: '书签' },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    home: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    widget: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    memory: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69a.5.5 0 0 0 .62-.45V17.5a.5.5 0 0 0-.26-.44A6.5 6.5 0 0 1 5.5 11a6.5 6.5 0 0 1 13 0 6.5 6.5 0 0 1-5.56 6.06.5.5 0 0 0-.26.44v1.74a.5.5 0 0 0 .62.45A9 9 0 0 0 12 2z" />
      </svg>
    ),
    workshop: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    bookmark: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    ),
  };

  return (
    <aside className="w-16 bg-surface-soft/50 border-r border-hairline flex flex-col items-center py-4 gap-2">
      {menuItems.map((item) => (
        <button
          key={item.label}
          className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center transition-all duration-150 ${
            item.active
              ? 'bg-primary text-on-primary'
              : 'text-muted hover:bg-surface-card hover:text-ink'
          }`}
          title={item.label}
        >
          {iconMap[item.icon]}
        </button>
      ))}

      <div className="flex-1" />

      <button
        className="w-10 h-10 rounded-lg flex items-center justify-center text-muted hover:bg-surface-card hover:text-ink transition-colors"
        title="添加组件"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </aside>
  );
}

function MainContent() {
  return (
    <main className="flex-1 overflow-auto p-6">
      <WidgetCanvas />
    </main>
  );
}

function WidgetCanvas() {
  const widgets = [
    { id: '1', type: 'clock', title: '时钟', x: 0, y: 0, w: 1, h: 1 },
    { id: '2', type: 'weather', title: '天气', x: 1, y: 0, w: 1, h: 1 },
    { id: '3', type: 'todo', title: '待办', x: 2, y: 0, w: 1, h: 2 },
    { id: '4', type: 'search', title: '搜索', x: 0, y: 1, w: 2, h: 1 },
  ];

  return (
    <div className="h-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">我的工作台</h2>
        <button className="text-sm text-muted hover:text-primary transition-colors">
          编辑布局
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 auto-rows-[180px]">
        {widgets.map((widget) => (
          <WidgetCard key={widget.id} widget={widget} />
        ))}
      </div>
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
}

function WidgetCard({ widget }: WidgetCardProps) {
  return (
    <div
      className={`bg-surface-card rounded-lg p-4 border border-hairline/50 hover:shadow-card transition-shadow cursor-pointer ${
        widget.h > 1 ? 'row-span-2' : ''
      } ${widget.w > 1 ? 'col-span-2' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-muted">{widget.title}</h3>
        <button className="w-6 h-6 rounded flex items-center justify-center text-muted-soft hover:text-ink hover:bg-surface-soft transition-colors">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
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
    default:
      return <div className="text-muted-soft text-sm">组件加载中...</div>;
  }
}

function ClockWidget() {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center">
      <div className="font-serif text-4xl text-ink tracking-tight">
        {time.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="text-sm text-muted mt-1">
        {time.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
      </div>
    </div>
  );
}

function WeatherWidget() {
  return (
    <div className="text-center">
      <div className="text-4xl mb-1">☀️</div>
      <div className="font-serif text-2xl text-ink">26°C</div>
      <div className="text-sm text-muted">晴 · 北京</div>
    </div>
  );
}

function TodoWidget() {
  const [todos] = React.useState([
    { id: '1', text: '完成项目文档', done: false },
    { id: '2', text: 'Review 代码', done: true },
    { id: '3', text: '发送周报', done: false },
  ]);

  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center gap-2 text-sm">
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center ${
              todo.done ? 'bg-primary border-primary' : 'border-hairline'
            }`}
          >
            {todo.done && (
              <svg className="w-3 h-3 text-on-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <span className={todo.done ? 'text-muted-soft line-through' : 'text-body'}>
            {todo.text}
          </span>
        </div>
      ))}
    </div>
  );
}

function SearchWidget() {
  return (
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
        className="w-full h-9 pl-10 pr-4 bg-canvas text-sm rounded-full border border-hairline focus:outline-none focus:border-primary"
      />
    </div>
  );
}

function RightPanel() {
  return (
    <aside className="w-80 bg-surface-soft/30 border-l border-hairline p-4 overflow-auto">
      <div className="mb-6">
        <h3 className="font-serif text-lg text-ink mb-3">快捷操作</h3>
        <div className="space-y-2">
          <QuickAction icon="📄" label="新建笔记" />
          <QuickAction icon="📋" label="剪贴板" />
          <QuickAction icon="🔖" label="保存页面" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-serif text-lg text-ink mb-3">最近标签页</h3>
        <div className="space-y-2">
          <RecentTab title="GitHub - 仓库" url="github.com" />
          <RecentTab title="Notion - 工作空间" url="notion.so" />
          <RecentTab title="Claude AI" url="claude.ai" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-serif text-lg text-ink mb-3">AI 推荐</h3>
        <div className="bg-surface-card rounded-lg p-4 border border-hairline/50">
          <p className="text-sm text-body mb-3">
            基于你的浏览历史，你可能对以下内容感兴趣：
          </p>
          <div className="space-y-2">
            <button className="w-full text-left px-3 py-2 rounded-md bg-canvas text-sm text-muted hover:bg-surface-soft hover:text-ink transition-colors">
              继续上次的研究项目 →
            </button>
            <button className="w-full text-left px-3 py-2 rounded-md bg-canvas text-sm text-muted hover:bg-surface-soft hover:text-ink transition-colors">
              查看相关标签页 →
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

function QuickAction({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-card text-sm text-body hover:bg-surface-soft transition-colors">
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function RecentTab({ title, url }: { title: string; url: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left hover:bg-surface-card transition-colors group">
      <div className="w-8 h-8 rounded bg-surface-card border border-hairline flex items-center justify-center text-muted-soft text-xs">
        {url.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-ink truncate">{title}</div>
        <div className="text-xs text-muted-soft truncate">{url}</div>
      </div>
    </button>
  );
}
