# MindTab - AI Native New Tab Workspace

## 项目结构

```
mindtab/
├── apps/
│   └── extension/           # Chrome 扩展主应用
│       ├── public/          # 静态资源和 manifest
│       └── src/
│           ├── background/  # Background Service Worker
│           ├── content/      # Content Scripts
│           └── newtab/      # 新标签页 React 应用
│
├── packages/
│   ├── ui/                  # 共享 UI 组件库
│   ├── shared/              # 共享工具和类型
│   ├── storage/             # 存储抽象层
│   └── event-bus/           # 事件总线
│
└── .trae/
    └── documents/            # 项目文档
```

## 快速开始

### 安装依赖

```bash
cd mindtab
pnpm install
```

### 开发扩展

```bash
pnpm dev:extension
```

这将构建扩展到 `apps/extension/dist` 目录。

### 加载扩展

1. 打开 Chrome，访问 `chrome://extensions/`
2. 开启右上角的「开发者模式」
3. 点击「加载已解压的扩展程序」
4. 选择 `mindtab/apps/extension/dist` 目录

### 构建生产版本

```bash
pnpm build:extension
```

## 技术栈

- **React 18** - UI 框架
- **TypeScript** - 类型安全
- **TailwindCSS** - 样式
- **Zustand** - 状态管理
- **Vite** - 构建工具
- **Dexie.js** - IndexedDB ORM

## 设计风格

灵感来源：Claude Design System

- 温暖奶油画布 (#faf9f5)
- 珊瑚主色调 (#cc785c)
- 衬线标题 + 无衬线正文
- 低调阴影哲学
