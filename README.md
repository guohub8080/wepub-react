# WePub React

现代化 SVG 动画编辑和发布工具，基于 React + TypeScript + Vite 构建。

## 特性

- **SVG 动画编辑** - 强大的 SVG 动画创作和编辑功能
- **实时预览** - 即时查看动画效果
- **多格式导出** - 支持导出到公众号等平台
- **React 组件转换** - 将原生 SVG 转换为 React 函数组件
- **色彩工具** - Material Design 配色方案，支持多种颜色格式
- **现代化 UI** - 使用 Tailwind CSS v4 和 shadcn/ui 构建

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS v4
- **UI 组件**: shadcn/ui + Radix UI
- **路由**: React Router v6 (Hash Router)
- **状态管理**: Zustand + Jotai
- **动画**: Motion + 自定义 SVG 动画
- **包管理**: pnpm

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
pnpm build
```

### 预览构建结果

```bash
pnpm preview
```

### 代码检查

```bash
pnpm lint
```

## 项目结构

```
src/
├── books/                    # 文档和教程内容
│   └── SvgDocument/         # SVG 文档教程
├── dev/                     # 主要开发代码
│   ├── apps/               # 应用模块
│   │   ├── Home/           # 首页
│   │   ├── Color/          # 颜色选择器
│   │   ├── PubEditor/      # 发布编辑器
│   │   ├── Settings/       # 设置页面
│   │   └── SvgReactConverter/ # SVG/React 转换器
│   ├── components/         # 通用组件
│   ├── pubComponents/      # 发布组件（SVG、HTML等）
│   ├── shadcn/            # shadcn/ui 组件库
│   ├── router/            # 路由配置
│   └── store/             # 状态管理
└── assets/                # 静态资源
```

## 功能模块

### 首页 (`/#/home/`)
- Kanban 风格的卡片布局
- 快速访问各功能模块

### SVG 文档 (`/#/svg-document/`)
- SVG 动画教程
- 组件使用说明
- 动画效果示例

### 发布编辑器 (`/#/pub/`)
- 可视化 SVG 编辑
- 实时预览
- 一键复制到公众号

### 色彩工具 (`/#/color/`)
- Material Design 配色方案
- 支持 HEX、RGB、HSL、OKLCH 等格式
- 色彩搭配和调色板工具

### SVG/React 转换器 (`/#/svg-react/`)
- 将原生 SVG 转换为 React 函数组件
- 支持复杂 SVG 结构解析

## 开发指南

### 路径别名

项目配置了多个路径别名便于导入：

- `@/` → `./src/`
- `@dev/` → `./src/dev/`
- `@apps/` → `./src/dev/apps/`
- `@shadcn/` → `./src/dev/shadcn/`

### 样式系统

- 使用 Tailwind CSS v4
- 支持亮色/暗色主题
- 自定义中文字体和代码字体

### 状态管理

- 组件级状态使用 React Hooks
- 复杂状态使用 Zustand 或 Jotai
- 主题和布局状态使用 Context API
