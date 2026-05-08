import React, { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsStore {
  theme: 'light' | 'dark' | 'system';
  memoryEnabled: boolean;
  autoCleanup: boolean;
  cleanupDays: number;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setMemoryEnabled: (enabled: boolean) => void;
  setAutoCleanup: (enabled: boolean) => void;
  setCleanupDays: (days: number) => void;
}

const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      theme: 'system',
      memoryEnabled: true,
      autoCleanup: false,
      cleanupDays: 30,
      setTheme: (theme) => set({ theme }),
      setMemoryEnabled: (memoryEnabled) => set({ memoryEnabled }),
      setAutoCleanup: (autoCleanup) => set({ autoCleanup }),
      setCleanupDays: (cleanupDays) => set({ cleanupDays }),
    }),
    {
      name: 'mindtab-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

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
  const { theme, setTheme } = useSettingsStore();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-serif text-xl text-ink mb-4">主题</h2>
        <div className="flex gap-3">
          <ThemeOption label="浅色" active={theme === 'light'} onClick={() => setTheme('light')} />
          <ThemeOption label="深色" active={theme === 'dark'} onClick={() => setTheme('dark')} />
          <ThemeOption label="跟随系统" active={theme === 'system'} onClick={() => setTheme('system')} />
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

      <section>
        <h2 className="font-serif text-xl text-ink mb-4">关于</h2>
        <div className="p-4 bg-surface-card rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-on-primary font-bold text-lg">M</span>
            </div>
            <div>
              <div className="font-medium text-ink">MindTab</div>
              <div className="text-xs text-muted-soft">版本 0.1.0</div>
            </div>
          </div>
          <p className="text-sm text-muted">AI 原生浏览器新标签页工作台</p>
        </div>
      </section>
    </div>
  );
}

function ThemeOption({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
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

function Toggle({ enabled, onChange }: { enabled: boolean; onChange?: (enabled: boolean) => void }) {
  return (
    <button
      onClick={() => onChange?.(!enabled)}
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
  const { memoryEnabled, autoCleanup, cleanupDays, setMemoryEnabled, setAutoCleanup, setCleanupDays } = useSettingsStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleExportData = () => {
    const data = {
      todos: localStorage.getItem('mindtab-todos'),
      notes: localStorage.getItem('mindtab-notes'),
      widgetLayout: localStorage.getItem('mindtab-widget-layout'),
      aiChat: localStorage.getItem('mindtab-ai-chat'),
      settings: localStorage.getItem('mindtab-settings'),
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindtab-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearAllData = () => {
    localStorage.removeItem('mindtab-todos');
    localStorage.removeItem('mindtab-notes');
    localStorage.removeItem('mindtab-widget-layout');
    localStorage.removeItem('mindtab-ai-chat');
    localStorage.removeItem('mindtab-settings');
    setShowClearConfirm(false);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <section>
        <h2 className="font-serif text-xl text-ink mb-4">记忆系统</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 px-4 bg-surface-card rounded-lg">
            <div>
              <div className="text-sm font-medium text-ink">启用跨标签页记忆</div>
              <div className="text-xs text-muted-soft">记录您的浏览历史以提供智能推荐</div>
            </div>
            <Toggle enabled={memoryEnabled} onChange={setMemoryEnabled} />
          </div>
          <div className="flex items-center justify-between py-3 px-4 bg-surface-card rounded-lg">
            <div>
              <div className="text-sm font-medium text-ink">自动清理</div>
              <div className="text-xs text-muted-soft">自动删除超过一定天数的记忆数据</div>
            </div>
            <Toggle enabled={autoCleanup} onChange={setAutoCleanup} />
          </div>
          {autoCleanup && (
            <div className="py-3 px-4 bg-surface-card rounded-lg">
              <div className="text-sm font-medium text-ink mb-2">清理天数</div>
              <select
                value={cleanupDays}
                onChange={(e) => setCleanupDays(Number(e.target.value))}
                className="w-full h-9 px-3 bg-canvas border border-hairline rounded-lg text-sm focus:outline-none focus:border-primary"
              >
                <option value={7}>7 天</option>
                <option value={14}>14 天</option>
                <option value={30}>30 天</option>
                <option value={90}>90 天</option>
              </select>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-xl text-ink mb-4">数据管理</h2>
        <div className="space-y-3">
          <button
            onClick={handleExportData}
            className="w-full px-4 py-3 bg-surface-card rounded-lg text-sm text-body hover:bg-surface-soft transition-colors text-left flex items-center gap-2"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            导出所有数据
          </button>
          {showClearConfirm ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 mb-3">确定要清除所有数据吗？此操作不可恢复。</p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 bg-surface-card rounded-lg text-sm text-body hover:bg-surface-soft transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={handleClearAllData}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
                >
                  确认清除
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="w-full px-4 py-3 bg-surface-card rounded-lg text-sm text-red-500 hover:bg-red-50 transition-colors text-left flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
              清除所有数据
            </button>
          )}
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
