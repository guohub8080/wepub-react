# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

wepub-react 是一个基于 React + TypeScript + Vite 的现代化 Web 应用，主要用于 SVG 动画编辑和发布工具开发。项目使用 pnpm 作为包管理工具。

## 常用命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 代码检查
pnpm lint

# 预览构建结果
pnpm preview

# GitHub Pages 构建（别名）
pnpm gh
```

## 项目架构

### 技术栈
- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS v4 + CSS 变量
- **UI 组件**: shadcn/ui + Radix UI
- **路由**: React Router v6 (Hash Router)
- **状态管理**: Zustand + Jotai + React Hooks
- **动画**: Motion + 自定义 SVG 动画

### 目录结构
```
src/
├── books/                    # 文档和教程内容
│   └── SvgDocument/         # SVG 文档教程（按章节组织）
└── dev/                     # 主要开发代码
    ├── apps/               # 应用模块
    ├── components/         # 通用组件
    ├── pubComponents/      # 发布组件（SVG、HTML等）
    ├── shadcn/            # shadcn/ui 组件库
    ├── styles/            # 样式文件
    ├── router/            # 路由配置
    └── store/             # 状态管理
```

### 主要应用模块
1. **Home** (`/home`) - 首页，Kanban 风格横向卡片布局
2. **Color** (`/color`) - 颜色选择器工具，支持多种颜色格式
3. **PubEditor** (`/pubeditor`) - 发布编辑器
4. **Settings** (`/settings`) - 设置页面
5. **SVG 文档教程** - 动态生成的路由，位于 `/books/SvgDocument/`

### 路径别名配置
项目配置了多个路径别名，便于导入：
- `@/` → `./src/`
- `@dev/` → `./src/dev/`
- `@apps/` → `./src/dev/apps/`
- `@comps/` → `./src/dev/components/`
- `@pubSVG/` → `./src/dev/pubComponents/SVG/`
- `@shadcn/` → `./src/dev/shadcn/`
- `@books/` → `./src/books/`

完整配置见 `vite.config.ts` 和 `tsconfig.json`。

## 开发指南

### 样式系统
- 使用 Tailwind CSS v4，配置在 `src/dev/styles/global.css`
- 支持亮色/暗色主题，通过 `data-theme="dark"` 切换
- 自定义中文字体（minsans-v）和代码字体（jb-mono）
- 使用 `tailwindcss-animate` 插件支持动画

### 组件开发
- 主要使用 shadcn/ui 组件库，配置在 `components.json`
- shadcn 组件位于 `src/dev/shadcn/components/ui/`
- 通用组件位于 `src/dev/components/`
- 发布组件（SVG、HTML）位于 `src/dev/pubComponents/`

### 状态管理
- 组件级状态使用 React Hooks
- 复杂状态使用自定义 Hooks（如 `useColorState`）
- 全局状态可使用 zustand 或 jotai
- 主题和布局状态使用 Context API

### 路由配置
- 使用 React Router v6 的 Hash Router
- 主路由配置在 `src/dev/router/index.tsx`
- SVG 文档路由通过 `generateSvgDocumentRoutes()` 动态生成
- 未匹配路由自动重定向到首页

### 构建配置
- Vite 配置在 `vite.config.ts`
- 支持 MDX（Markdown + JSX）用于文档渲染
- 开发服务器配置了微信图片代理
- 生产构建输出到 `docs/` 目录

## 注意事项

1. **Ant Design 已禁用** - 项目已从 Ant Design 迁移到 shadcn/ui，相关代码已注释
2. **SVG 动画工具** - 这是项目的核心功能，关注 `src/dev/pubComponents/SVG/` 目录
3. **国际化支持** - 配置了中文字体和日文字体支持
4. **响应式设计** - 使用 Tailwind 的响应式工具类
5. **类型安全** - 使用 TypeScript，但 `strict` 模式为 `false`，允许更灵活的开发

## 依赖库

主要依赖包括：
- **UI 组件**: shadcn/ui, Radix UI, Headless UI
- **颜色处理**: @jaames/iro, react-colorful, chroma-js, culori
- **拖拽排序**: @dnd-kit
- **编辑器**: Monaco Editor
- **工具库**: lodash, ramda, date-fns, dayjs
- **HTTP 客户端**: axios
- **通知**: react-hot-toast
- 这个项目使用静态CSR的Vite框架，非SSR，也不使用next.js

## Navigation 组件规范

### 功能要求
Navigation 组件位于 `src/dev/components/layout/MainLayout/Navigation/index.tsx`，是应用的主要导航栏。

### 布局结构
1. **三栏布局**:
   - **左侧**: Logo区域（图标+文字）
   - **中间**: 页面标题按钮（图标+文字）
   - **右侧**: 操作按钮（设置、GitHub、TOC）

2. **响应式设计**:
   - **Logo区域**: 窄屏（<550px）时只显示图标，隐藏WePub文字logo
   - **页面标题按钮**: 所有屏幕尺寸都显示图标+文字
   - **右侧按钮**: GitHub按钮在移动端隐藏

### 定位要求
1. **Header容器**:
   - 使用 `sticky top-0` 固定在顶部
   - 必须添加 `relative` 定位作为参考
   - 高度由 `navigationHeight` 动态控制

2. **中间按钮**:
   - 使用 `fixed` 定位在整个屏幕中心
   - 垂直居中: `top: ${navigationHeight / 2}px`
   - 水平居中: `left: 50%` + `translateX(-50%)`
   - 完整居中: `transform: translateX(-50%) translateY(-50%)`

### 样式要求
1. **中间按钮hover效果**:
   - 使用内阴影模拟边框，不影响popover定位
   - 格式: `shadow-[inset_0_0_0_1.5px_rgb(148_163_184/0.3)]`
   - 透明度为 0.3，保持浅色
   - 面板打开时也应用相同效果

2. **滚动效果**:
   - 滚动时显示背景模糊和边框
   - 未滚动时透明背景

### 交互功能
1. **页面标题显示**:
   - 非首页时显示当前页面的标题和图标
   - 图标和颜色从 `initialCards` 配置中匹配
   - 支持路径匹配和子路径匹配

2. **Popover导航面板**:
   - 使用 Radix UI Popover 组件
   - 桌面端 hover 打开，移动端点击切换
   - 响应式布局：移动端全屏，桌面端居中弹出

3. **遮罩层**:
   - 使用 Portal 渲染到 document.body
   - 桌面端显示黑色半透明遮罩
   - 移动端隐藏遮罩

### 注意事项
1. **定位冲突**: 避免同时使用CSS类和内联样式的 `transform`
2. **响应式**: 不同屏幕尺寸的适配要考虑布局结构
3. **z-index**: 确保层级关系正确，不被其他元素遮挡
4. **Popover定位**: 避免边框等样式影响Radix UI的定位计算

## 代码规范

### 路径导入规范
1. **禁止使用相对路径**: 超过两层的相对路径（如 `../../../`）一律禁止使用
2. **使用路径别名**: 必须使用配置好的路径别名进行导入
3. **允许的相对路径**: 只有同一目录下的文件（如 `./Component` 或 `../Component`）可以使用相对路径

**正确示例:**
```typescript
// ✅ 使用路径别名
import useGlobalSettings from "@dev/store/useGlobalSettings"
import { cn } from "@shadcn/lib/utils.ts"
import { initialCards } from "@apps/Home/cardsConfig.tsx"

// ✅ 同级或相邻目录使用相对路径
import NavigationPanel from "./NavigationPanel.tsx"
import UtilityComponent from "../utils/helper.tsx"
```

**错误示例:**
```typescript
// ❌ 超过两层的相对路径
import useGlobalSettings from "../../../../store/useGlobalSettings"
import { cn } from "../../../../shadcn/lib/utils.ts"
import { initialCards } from "../../../../apps/Home/cardsConfig.tsx"
```

### 可用路径别名
- `@/` → `./src/`
- `@dev/` → `./src/dev/`
- `@apps/` → `./src/dev/apps/`
- `@comps/` → `./src/dev/components/`
- `@pubSVG/` → `./src/dev/pubComponents/SVG/`
- `@shadcn/` → `./src/dev/shadcn/`
- `@books/` → `./src/books/`