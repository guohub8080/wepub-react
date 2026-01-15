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

## 开发工作流规范

### 开发服务器管理
1. **不要重复启动开发服务器**：
   - 如果开发服务器已经在运行（默认端口5173），不要使用 `npm run dev` 或 `pnpm dev` 重新启动
   - Vite 的热更新（HMR）会自动检测文件变化并实时更新浏览器

2. **错误检查方法**：
   - ✅ **优先使用浏览器控制台**：查看运行时错误和React错误报告
   - ✅ **利用Vite热更新**：修改代码后自动刷新，观察是否有编译错误
   - ✅ **查看终端输出**：开发服务器会实时显示编译状态和错误信息
   - ❌ **不要重新启动服务器**：除非服务器崩溃或需要更新依赖
   - ❌ **绝对不要使用 build 命令检查语法错误**：build 过程很慢，且会产生不必要的文件

3. **调试流程**：
   ```
   修改代码 → 等待Vite热更新 → 查看浏览器 → 检查控制台报错 → 根据错误信息修复
   ```

4. **错误报告**：
   - 如果用户提供了详细的错误报告（如React错误边界信息），直接根据报告修复问题
   - 错误报告通常包含：错误类型、错误信息、错误位置、组件堆栈、环境信息
   - 这些信息足够快速定位和修复问题

5. **代码修改后检查**：
   - 修改代码后等待几秒钟，让Vite完成编译
   - 检查浏览器是否自动更新，是否有错误提示
   - 如有语法错误，Vite会在终端显示具体的错误位置
   - 不要依赖重新启动服务器来检查错误

6. **完成前必须运行 JSX 检查**：
   - 在声称任务完成之前，必须检查JSX语法是否正确
   - ✅ **检查方法**：等待Vite热更新完成，观察浏览器控制台是否有编译错误
   - ✅ **检查终端输出**：查看是否有编译错误或警告信息
   - ❌ **禁止使用方法**：不要运行 `npm run build` 或 `pnpm build` 来检查语法
   - 确保没有语法错误（如Unexpected token、JSX结构错误等）
   - 如果有语法错误，立即修复而不是依赖用户报告
   - 只有在确认代码正常编译和运行后才能认为任务完成

## Git 提交规范

### 提交命令简写
- **c** - `git add` + `git commit` (提交但不push)
- **cp** - `git add` + `git commit` + `git push` (提交并push)

当用户输入 "c" 或 "cp" 时，按照上述含义执行相应的git操作。

## 微信公众号等兼容模式转换规范

### 适用场景
当需要将第三方平台（Twitter、微博、小红书等）的 HTML/CSS 转换为微信公众号兼容的 React 组件时，使用以下规范。

### 核心原则

#### 1. 语义化标签替换
```typescript
// ✅ 正确：使用语义化标签
<section>替代 <div>
<section>替代 <article>

// ❌ 错误：使用非语义化标签
<div>...</div>
```

#### 2. 去除交互元素与语义化注释

- 将所有 `<a>` 链接改为 `<section>` 或 `<span>`
- 将所有 `<button>` 按钮改为 `<section>`，去掉点击事件和 hover 事件
- 将有语义化的属性（`data-testid`、`id` 等）提取到注释中
- 保留 `aria-label` 等辅助属性

```typescript
// 原始 HTML
<a href="/user" role="link" data-testid="User-Name">用户名</a>
<button type="button" data-testid="follow" onclick="handleFollow()">关注</button>
<div data-testid="Tweet-User-Avatar">...</div>

// 转换后
{/* data-testid="User-Name" */}
<section aria-label="用户链接">用户名</section>

{/* data-testid="follow" */}
<section aria-label="关注按钮" style={buttonStyle}>关注</section>

{/* data-testid="Tweet-User-Avatar" */}
<section style={avatarStyle}>...</section>
```

#### 3. 行内样式提取方法

**CSS 样式层级处理**

原始 HTML 中的样式有三种优先级，需要按以下顺序处理：

1. **普通 CSS 类组合** (如 `css-175oi2r r-18u37iz r-136ojw6`) → 按顺序合并，后面的覆盖前面的
2. **内联样式** (如 `#style-CJZaJ.style-CJZaJ`) → 最高优先级，覆盖所有类样式
3. **最终样式** = 所有类样式合并 + 内联样式覆盖

```typescript
// 原始 HTML
<div class="css-175oi2r r-18u37iz r-136ojw6">...</div>

// CSS 类定义（按顺序）
.css-175oi2r {
    flex-direction: column;  // 第一个类
    display: flex;
    z-index: 0;
}
.r-18u37iz {
    flex-direction: row;     // 第二个类，覆盖上面的 flex-direction
}
.r-136ojw6 {
    z-index: 2;              // 第三个类，覆盖上面的 z-index
}

// 转换步骤：按顺序合并所有类样式
const mergedStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",    // r-18u37iz 覆盖了 css-175oi2r 的 column
    zIndex: 2,               // r-136ojw6 覆盖了 css-175oi2r 的 0
}

// 如果还有内联样式
<div id="style-CJZaJ" class="...">
#style-CJZaJ.style-CJZaJ { color: rgb(15, 20, 25); }

// 最终样式 = 类样式合并 + 内联样式覆盖
const finalStyle: CSSProperties = {
    ...mergedStyle,
    color: "rgb(15, 20, 25)",  // 内联样式覆盖
}
```

**多类组合的正确处理方法**：

```typescript
// ❌ 错误：只提取第一个类
const baseStyle: CSSProperties = {
    flexDirection: "column",  // 错误！没有考虑后面的覆盖
}

// ✅ 正确：按顺序合并所有类
const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "row",    // 正确！使用后面类的值
    zIndex: 2,
}
```

**步骤1：创建基础样式对象**
```typescript
import { CSSProperties } from "react"

const baseStyle: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    position: "relative",
    margin: 0,
    padding: 0,
    minWidth: 0,
    minHeight: 0,
    flexShrink: 0,
}
```

**步骤2：提取 CSS 类为 CSSProperties**
```typescript
// 原始 CSS
.container {
    display: flex;
    flex-direction: row;
    gap: 8px;
    padding: 16px;
}

// 转换为
const containerStyle: CSSProperties = {
    ...baseStyle,
    flexDirection: "row",
    gap: 8,
    padding: 16,
}
```

**步骤3：使用展开运算符继承基础样式**
```typescript
const specificStyle: CSSProperties = {
    ...baseStyle,  // 继承基础样式
    backgroundColor: "rgb(15, 20, 25)",
    borderRadius: "50%",
}
```

#### 4. 颜色值转换规范
```typescript
// ✅ 保持原始 HTML 中的颜色值格式
color: "rgb(15, 20, 25)"        // 原始是 rgb() 就用 rgb()
color: "#0F1419"                // 原始是十六进制就用十六进制
color: "hsl(210 25% 8%)"        // 原始是 hsl() 就用 hsl()
backgroundColor: "rgba(0, 0, 0, 0)"  // 原始是 rgba() 就用 rgba()

// 原则：原始 HTML 是什么格式，就用什么格式，不需要转换
```

#### 5. 单位转换规范
```typescript
// ✅ 数字形式（无单位属性）
padding: 16
margin: 8
borderWidth: 1

// ✅ 字符串形式（有单位属性）
width: "100%"
height: "40px"
fontSize: "15px"
lineHeight: "20px"
borderRadius: "9999px"  // 圆形

// ✅ calc() 表达式
width: "calc(100% - 4px)"
```

#### 6. SVG 图标处理
```typescript
// ✅ 直接内联 SVG，设置固定尺寸
<svg style={{ display: "inline-block", width: 18, height: 18 }} viewBox="0 0 22 22">
    <g>
        <path fill="rgb(29, 155, 240)" d="..." />
    </g>
</svg>

// ❌ 不要使用外部引用
<Icon name="verified" />
```

#### 7. 组件结构模板
```typescript
import { CSSProperties } from "react"

// ============================================ 组件 ============================================

const ComponentName = () => {
    return (
        <section style={containerStyle}>
            {/* 内容区域 */}
            <section style={contentStyle}>
                <span style={textStyle}>文本内容</span>
            </section>
        </section>
    )
}

export default ComponentName

// ============================================ Styles ============================================

const baseStyle: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    // ... 其他基础属性
}

const containerStyle: CSSProperties = {
    ...baseStyle,
    // 容器特定样式
}

const contentStyle: CSSProperties = {
    ...baseStyle,
    // 内容特定样式
}
```

#### 8. 图片处理规范
```typescript
// ✅ 头像圆形裁剪
<section style={avatarWrapperStyle}>
    <img src={avatarUrl} alt="" style={avatarImgStyle} />
</section>

const avatarWrapperStyle: CSSProperties = {
    width: 40,
    height: 40,
    borderRadius: "50%",
    overflow: "hidden",
}

const avatarImgStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
}
```

### 完整示例：Twitter 用户信息组件

```typescript
import { CSSProperties } from "react"

// ============================================ UserInfo Component ============================================

interface UserInfoProps {
    avatar?: string
    name: string
    verified?: boolean
    username: string
}

const UserInfo = (props: UserInfoProps) => {
    return (
        <section style={containerStyle}>
            {/* 头像 */}
            <section style={avatarSideStyle}>
                {props.avatar ? (
                    <section style={avatarWrapperStyle}>
                        <img src={props.avatar} alt="" style={avatarImgStyle} />
                    </section>
                ) : (
                    <section style={avatarFallbackStyle}>
                        <span style={avatarTextStyle}>{props.name[0]}</span>
                    </section>
                )}
            </section>

            {/* 用户信息 */}
            <section style={contentStyle}>
                <section style={nameRowStyle}>
                    <span style={nameStyle}>{props.name}</span>
                    {props.verified && (
                        <svg style={verifiedIconStyle} viewBox="0 0 22 22" aria-label="认证账号">
                            <g>
                                <path fill="rgb(29, 155, 240)" d="..." />
                            </g>
                        </svg>
                    )}
                </section>
                <section style={usernameRowStyle}>
                    <span style={usernameStyle}>@{props.username}</span>
                </section>
            </section>
        </section>
    )
}

export default UserInfo

// ============================================ Styles ============================================

const baseStyle: CSSProperties = {
    boxSizing: "border-box",
    display: "block",
}

const containerStyle: CSSProperties = {
    ...baseStyle,
    display: "flex",
    flexDirection: "row",
    marginBottom: 2,
}

// ... 其他样式定义
```

### 注意事项

1. **保持原有视觉效果**：所有间距、颜色、字体大小必须与原始 HTML 一致
2. **使用 TypeScript 类型**：所有样式对象使用 `CSSProperties` 类型
3. **提取公共样式**：相似的样式使用展开运算符继承
4. **保留注释**：使用注释标记区域（头像、用户名、操作按钮等）
5. **文件命名**：转换后的文件命名为 `参考.tsx`，放在原始 `参考.md` 同目录下
6. **样式区域分隔**：使用注释横线将组件代码和样式定义分开，样式放在文件最后

```typescript
// ============================================ 组件 ============================================

const ComponentName = () => {
    return (
        <section style={containerStyle}>
            {/* 组件内容 */}
        </section>
    )
}

export default ComponentName

// ============================================ Styles ============================================

const baseStyle: CSSProperties = {
    // ... 样式定义
}

const containerStyle: CSSProperties = {
    // ... 样式定义
}
```

## 微信公众号 CSS 支持限制

### 严格过滤的 CSS 属性

微信公众号对 HTML/CSS 有严格的**白名单限制**，以下属性会被**过滤删除**：

#### ❌ 不支持的 CSS 属性

1. **定位属性**
   - `position: relative`
   - `position: absolute`
   - `position: fixed`
   - `position: sticky`

2. **动态计算**
   - `calc()` 函数会被完全删除

3. **其他限制**
   - 部分高级 CSS 特性
   - 某些伪元素和伪类

#### ✅ 支持的 CSS 属性

**布局相关**
- `display: flex` ✅
- `flex-direction` ✅
- `align-items` ✅
- `justify-content` ✅
- `flex-wrap` ✅
- `gap` ✅
- `flex-grow`, `flex-shrink`, `flex-basis` ✅

**尺寸相关**
- `width` / `height` ✅
- `min-width` / `max-width` ✅
- `min-height` / `max-height` ✅
- `padding` / `margin` ✅
- 百分比单位 ✅
- 固定单位（px, em, rem）✅

**盒模型**
- `box-sizing` ✅
- `border` ✅
- `border-radius` ✅
- `overflow` ✅

**颜色和背景**
- `color` ✅
- `background-color` ✅
- `background-image` ✅
- `background-size` ✅
- `background-position` ✅
- `opacity` ✅

**文字**
- `font-size` ✅
- `font-weight` ✅
- `line-height` ✅
- `text-align` ✅

**其他**
- `aspect-ratio` ✅
- `object-fit` ✅
- `object-position` ✅

### 微信公众号 SVG 白名单

微信公众号对 SVG 属性也有严格的白名单限制：

#### 官方规范
- **制定时间**: 2016年
- **制定方**: 复旦大学新媒体研究机构与微信团队
- **现状**: 已被收录为国家标准
- **规范名称**: 《中华人民共和国融媒体SVG交互设计技术规范》

#### 参考资源
- [中华人民共和国融媒体SVG交互设计技术规范](https://www.fudan.design/svg.html)
- [SVG 交互图文设计开发必读入门规则](https://zhuanlan.zhihu.com/p/29151913974)
- [微信SVG AttributeName白名单（2023版）](https://www.sohu.com/a/745340968_121759104)

### 开发建议

1. **避免使用被过滤的属性**
   - 不使用 `position` 定位
   - 不使用 `calc()` 计算
   - 优先使用 flexbox 布局

2. **测试方法**
   - 在开发服务器中测试
   - 导出到微信公众号编辑器
   - 查看导出的 HTML 源代码，检查哪些样式被过滤

3. **替代方案**

   - **使用负 margin 替代 position 定位**

     微信公众号会过滤所有 `position` 属性（`relative`、`absolute`、`fixed`、`sticky`）。如果需要实现元素叠加效果（如右上角图标），可以使用负 margin。

     **示例：右上角 X Logo**

     ```typescript
     // ❌ 错误：使用 position absolute（会被过滤）
     const cardStyle = {
         position: "relative",
     }

     const logoStyle = {
         position: "absolute",
         top: 12,
         right: 12,
     }

     // ✅ 正确：使用负 margin 实现
     const logoWrapperStyle = {
         display: "flex",
         justifyContent: "flex-end",
         paddingTop: 12,
         paddingRight: 12,
         height: 32,  // 固定高度
     }

     const contentStyle = {
         marginTop: -32,  // 负 margin，向上偏移
         padding: 12,
     }
     ```

     **原理**：
     1. Logo 容器占据固定高度（如 32px = 12px padding + 20px logo）
     2. 内容区域使用负 margin（`marginTop: -32`）向上偏移
     3. 内容叠加在 Logo 上方，实现类似 absolute 的效果

   - 用 `flex` 布局替代 `position`
   - 用百分比替代 `calc()`
   - 用 `background-image` + 透明 `img` 实现点击功能

### 实际案例

从用户导出的 HTML 可以看到：
- `position: relative` 被删除
- `calc(-100% - 0.5px)` 被删除
- `background-image` ✅ 保留
- `aspect-ratio` ✅ 保留
- `opacity: 0` ✅ 保留

**Sources:**
- [微信公众号图文的HTML/CSS 支持概览](https://www.axtonliu.ai/newsletters/ai-2/posts/wechat-article-html-css-support)
- [中华人民共和国融媒体SVG交互设计技术规范](https://www.fudan.design/svg.html)
- [SVG 交互图文设计开发必读入门规则](https://zhuanlan.zhihu.com/p/29151913974)
- [微信SVG AttributeName白名单（2023版）](https://www.sohu.com/a/745340968_121759104)
