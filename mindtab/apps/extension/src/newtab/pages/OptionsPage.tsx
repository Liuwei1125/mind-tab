import React, { useState } from 'react';

type Tab = 'general' | 'widgets' | 'ai' | 'privacy';

export function OptionsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('general');

  return (
    <div className="min-h-screen bg-canvas">
      <header className="h-14 px-6 flex items-center border-b border-hairline bg-surface-card/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-on-primary font-bold">M</span>
          </div>
          <span className="font-serif text-xl text-ink">MindTab 设置</span>
        </div>
      </header>

      <div className="flex">
        <aside className="w-56 border-r border-hairline p-4">
          <nav className="space-y-1">
            <NavItem
              label="通用设置"
              active={activeTab === 'general'}
              onClick={() => setActiveTab('general')}
            />
            <NavItem
              label="组件管理"
              active={activeTab === 'widgets'}
              onClick={() => setActiveTab('widgets')}
            />
            <NavItem
              label="AI 设置"
              active={activeTab === 'ai'}
              onClick={() => setActiveTab('ai')}
            />
            <NavItem
              label="隐私与数据"
              active={activeTab === 'privacy'}
              onClick={() => setActiveTab('privacy')}
            />
          </nav>
        </aside>

        <main className="flex-1 p-6 max-w-2xl">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'widgets' && <WidgetSettings />}
          {activeTab === 'ai' && <AISettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
        </main>
      </div>
    </div>
  );
}

function NavItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
        active ? 'bg-primary text-on-primary' : 'text-muted hover:bg-surface-card hover:text-ink'
      }`}
    >
      {label}
    </button>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-serif text-xl text-ink mb-4">主题</h2>
        <div className="flex gap-3">
          <ThemeOption label="浅色" active />
          <ThemeOption label="深色" />
          <ThemeOption label="跟随系统" />
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl text-ink mb-4">布局</h2>
        <div className="grid grid-cols-3 gap-3">
          <LayoutOption label="默认布局" active />
          <LayoutOption label="极简布局" />
          <LayoutOption label="专注布局" />
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl text-ink mb-4">快捷键</h2>
        <div className="space-y-3">
          <ShortcutRow label="打开工作台" shortcut="Alt + M" />
          <ShortcutRow label="快速搜索" shortcut="Alt + S" />
          <ShortcutRow label="新建笔记" shortcut="Alt + N" />
        </div>
      </section>
    </div>
  );
}

function ThemeOption({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`px-4 py-2 rounded-lg border text-sm transition-colors ${
        active ? 'border-primary bg-primary/5 text-primary' : 'border-hairline text-muted hover:border-primary'
      }`}
    >
      {label}
    </button>
  );
}

function LayoutOption({ label, active }: { label: string; active?: boolean }) {
  return (
    <button
      className={`p-4 rounded-lg border text-center transition-colors ${
        active ? 'border-primary bg-primary/5' : 'border-hairline hover:border-primary'
      }`}
    >
      <div className="w-full h-16 bg-surface-card rounded mb-2 flex items-center justify-center">
        <div className="w-8 h-8 bg-primary/20 rounded" />
      </div>
      <span className={`text-xs ${active ? 'text-primary' : 'text-muted'}`}>{label}</span>
    </button>
  );
}

function ShortcutRow({ label, shortcut }: { label: string; shortcut: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-body">{label}</span>
      <kbd className="px-2 py-1 bg-surface-card border border-hairline rounded text-xs font-mono text-muted">
        {shortcut}
      </kbd>
    </div>
  );
}

function WidgetSettings() {
  const widgets = [
    { id: 'clock', name: '时钟', enabled: true },
    { id: 'weather', name: '天气', enabled: true },
    { id: 'search', name: '搜索', enabled: true },
    { id: 'todo', name: '待办事项', enabled: true },
    { id: 'quick-note', name: '快捷笔记', enabled: false },
    { id: 'bookmarks', name: '书签', enabled: false },
    { id: 'ai-chat', name: 'AI 助手', enabled: true },
  ];

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-serif text-xl text-ink mb-4">已安装组件</h2>
        <div className="space-y-2">
          {widgets.map((widget) => (
            <div key={widget.id} className="flex items-center justify-between py-3 px-4 bg-surface-card rounded-lg">
              <div>
                <div className="text-sm font-medium text-ink">{widget.name}</div>
                <div className="text-xs text-muted-soft">widget/{widget.id}</div>
              </div>
              <Toggle enabled={widget.enabled} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Toggle({ enabled }: { enabled: boolean }) {
  return (
    <button
      className={`relative w-10 h-6 rounded-full transition-colors ${
        enabled ? 'bg-primary' : 'bg-hairline'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function AISettings() {
  const [apiKey, setApiKey] = useState('');
  const [provider, setProvider] = useState('openai');

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-serif text-xl text-ink mb-4">AI 提供商</h2>
        <div className="space-y-3">
          <ProviderOption
            name="OpenAI"
            description="使用 GPT-4 和 GPT-3.5 模型"
            active={provider === 'openai'}
            onClick={() => setProvider('openai')}
          />
          <ProviderOption
            name="DeepSeek"
            description="高性价比的中文大模型"
            active={provider === 'deepseek'}
            onClick={() => setProvider('deepseek')}
          />
          <ProviderOption
            name="本地模型"
            description="完全本地运行，保护隐私"
            active={provider === 'local'}
            onClick={() => setProvider('local')}
          />
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl text-ink mb-4">API 密钥</h2>
        <input
          type="password"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="输入您的 API 密钥"
          className="w-full h-10 px-4 bg-canvas border border-hairline rounded-lg text-sm focus:outline-none focus:border-primary"
        />
        <p className="text-xs text-muted-soft mt-2">
          您的 API 密钥将安全存储在本地，不会同步到云端
        </p>
      </section>
    </div>
  );
}

function ProviderOption({
  name,
  description,
  active,
  onClick,
}: {
  name: string;
  description: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-colors ${
        active ? 'border-primary bg-primary/5' : 'border-hairline hover:border-primary'
      }`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className={`font-medium ${active ? 'text-primary' : 'text-ink'}`}>{name}</span>
        {active && (
          <svg className="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        )}
      </div>
      <p className="text-xs text-muted">{description}</p>
    </button>
  );
}

function PrivacySettings() {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-serif text-xl text-ink mb-4">记忆系统</h2>
        <div className="space-y-4">
          <ToggleRow label="启用跨标签页记忆" description="记录您的浏览历史以提供智能推荐" enabled />
          <ToggleRow
            label="自动清理"
            description="自动删除超过 30 天的记忆数据"
            enabled={false}
          />
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl text-ink mb-4">数据管理</h2>
        <div className="space-y-3">
          <button className="w-full px-4 py-3 bg-surface-card rounded-lg text-sm text-body hover:bg-surface-soft transition-colors text-left">
            导出所有数据
          </button>
          <button className="w-full px-4 py-3 bg-surface-card rounded-lg text-sm text-error hover:bg-error/5 transition-colors text-left">
            清除所有数据
          </button>
        </div>
      </section>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  enabled,
}: {
  label: string;
  description: string;
  enabled: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-3 px-4 bg-surface-card rounded-lg">
      <div>
        <div className="text-sm font-medium text-ink">{label}</div>
        <div className="text-xs text-muted-soft">{description}</div>
      </div>
      <Toggle enabled={enabled} />
    </div>
  );
}

export default OptionsPage;
