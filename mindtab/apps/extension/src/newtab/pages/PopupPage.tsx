import React, { useState, useEffect } from 'react';

export function PopupPage() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-canvas ${isExpanded ? 'w-80' : 'w-64'} p-4 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
            <span className="text-on-primary text-xs font-bold">M</span>
          </div>
          <span className="font-serif text-lg text-ink">MindTab</span>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-8 h-8 rounded-full flex items-center justify-center text-muted hover:bg-surface-soft transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {isExpanded ? (
              <path d="M19 9l-7 7-7-7" />
            ) : (
              <path d="M9 5l7 7-7 7" />
            )}
          </svg>
        </button>
      </div>

      <div className="space-y-2">
        <QuickLink icon="🏠" label="打开工作台" />
        <QuickLink icon="⚡" label="AI 助手" />
        <QuickLink icon="📝" label="新建笔记" />
        <QuickLink icon="⚙️" label="设置" href="options.html" />
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-hairline">
          <div className="text-xs text-muted mb-2">最近访问</div>
          <div className="space-y-1">
            <MiniLink title="GitHub" />
            <MiniLink title="Notion" />
            <MiniLink title="Gmail" />
          </div>
        </div>
      )}
    </div>
  );
}

function QuickLink({ icon, label, href }: { icon: string; label: string; href?: string }) {
  const handleClick = () => {
    if (href) {
      window.open(href, '_blank');
    } else {
      chrome.tabs.create({ url: 'chrome://newtab' });
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-body hover:bg-surface-soft transition-colors"
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function MiniLink({ title }: { title: string }) {
  return (
    <button className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-muted hover:bg-surface-card transition-colors">
      <div className="w-5 h-5 rounded bg-surface-card border border-hairline flex items-center justify-center">
        {title[0]}
      </div>
      <span>{title}</span>
    </button>
  );
}

export default PopupPage;
