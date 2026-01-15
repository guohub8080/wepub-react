import { articleType } from './articleType';
import defaultArticleData from './defaultArticle';
import { getDayjs } from '@dev/utils/utDateTime/exDayjs';
import byDefault from '@dev/utils/common/byDefault';
import { createRoot } from 'react-dom/client';
import React from 'react';

// 用于追踪已使用的日期ID，避免冲突
const usedDateIds = new Set<string>();

// 追踪每个时间ID第一次出现时的文章信息
const firstArticleInfo = new Map<string, { title: string; path: string }>();

// 存储文章ID冲突信息
export const idConflicts: Array<{
  id: string;
  articles: Array<{ title: string; path: string }>;
}> = [];

/**
 * 从 JSX 中提取纯文本内容（用于搜索）
 */
const extractTextFromJSX = (node: React.ReactNode): string => {
  if (node === null || node === undefined) return '';
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (typeof node === 'boolean') return '';
  if (Array.isArray(node)) {
    return node.map(extractTextFromJSX).filter(Boolean).join(' ');
  }
  if (typeof node === 'object') {
    const element = node as any;
    // 尝试从多个位置获取 children
    const children = element.props?.children || element.children || element._children;
    if (children !== undefined) {
      return extractTextFromJSX(children);
    }
  }
  return '';
};

/**
 * 根据日期生成文章ID
 * 格式: 2025-12-02-00-11-07 (年-月-日-时-分-秒)
 * 如果冲突则添加递增后缀: 2025-12-02-00-11-07_1, 2025-12-02-00-11-07_2 ...
 */
function generateIdFromDate(date: any, title: string, path: string): string {
  const dayjsObj = getDayjs(date);
  const dateStr = dayjsObj.format('YYYY-MM-DD-HH-mm-ss');
  let finalId = dateStr;
  let suffix = 1;

  // 如果ID已存在，添加后缀
  while (usedDateIds.has(finalId)) {
    finalId = `${dateStr}_${suffix}`;
    suffix++;
  }

  usedDateIds.add(finalId);

  // 如果有冲突（添加了后缀），记录冲突信息
  if (suffix > 1) {
    const conflictGroup = idConflicts.find(c => c.id === dateStr);
    if (conflictGroup) {
      conflictGroup.articles.push({ title, path });
    } else {
      // 第一次发现冲突，需要把第一篇文章的信息也加进来
      const firstArticle = firstArticleInfo.get(dateStr);
      idConflicts.push({
        id: dateStr,
        articles: firstArticle
          ? [firstArticle, { title, path }]
          : [{ title, path }]
      });
    }
  } else {
    // 记录第一次使用这个时间ID的文章信息
    firstArticleInfo.set(dateStr, { title, path });
  }

  return finalId;
}

/**
 * 文章数据加载器
 * 使用 Vite 的 import.meta.glob 自动加载文章
 */

// 文章列表项类型(用于侧边栏显示)
export interface ArticleListItem {
  id: string;
  title: string;
  date: any;
  author?: string;
  tag?: string[];
  path: string; // 路由路径,格式: pub/2025/12/03/00-32-56
  filePath: string; // 文件路径,用于调试和回溯
}

// 文章数据映射
const articleMap: Record<string, articleType> = {
  'default': defaultArticleData
};

/**
 * 动态导入所有文章模块
 */
async function loadArticles() {
  try {
    // 使用 Vite 的 glob 导入所有非 data 文件夹中的 .tsx 文件
    // 排除: data 文件夹、node_modules、defaultArticle.tsx、articleType.ts、articlesLoader.tsx
    const modules = import.meta.glob('../!(!data)/**/*.tsx', {
      eager: true
    });

    // 遍历所有导入的模块
    for (const path in modules) {
      const module = modules[path] as any;

      // 检查导出是否符合 articleType 格式
      if (module.default && module.default.jsx && module.default.title) {
        // 检查是否是 defaultArticle.tsx，使用固定 ID 'default'
        const isDefaultArticle = path.includes('defaultArticle.tsx');
        const articleId = isDefaultArticle ? 'default' : generateIdFromDate(module.default.date, module.default.title, path);

        // 将文件路径存储在文章数据中，方便调试
        const articleData = {
          ...module.default,
          tag: byDefault(module.default.tag, []),  // 确保 tag 始终是数组
          _filePath: path,  // 存储原始文件路径
          _textContent: ''  // 预留：用于存储提取的文本内容
        };

        // 尝试提取文章文本内容用于搜索
        try {
          const jsxElement = module.default.jsx;
          if (jsxElement) {
            // 创建一个临时的 DOM 元素来渲染并提取文本
            const tempDiv = document.createElement('div');
            tempDiv.style.display = 'none';
            document.body.appendChild(tempDiv);

            const root = createRoot(tempDiv);
            root.render(jsxElement);

            // 等待渲染完成后提取文本
            setTimeout(() => {
              articleData._textContent = tempDiv.textContent || '';
              root.unmount();
              document.body.removeChild(tempDiv);
            }, 0);
          }
        } catch (e) {
          console.warn(`提取文章文本失败: ${path}`, e);
        }

        articleMap[articleId] = articleData;
      } else {
        console.warn(`⚠️ 跳过不符合格式的文章: ${path}`);
      }
    }
  } catch (error) {
    console.error('❌ 加载文章失败:', error);
  }
}

// 初始化时加载文章
loadArticles();

/**
 * 根据文章ID获取文章数据
 * @param articleId 文章ID
 * @returns 文章数据，如果不存在则返回默认文章
 */
export function getArticleById(articleId: string): articleType {
  return articleMap[articleId] || articleMap['default'];
}

/**
 * 获取所有文章列表
 * @returns 文章ID列表
 */
export function getAllArticleIds(): string[] {
  return Object.keys(articleMap);
}

/**
 * 获取文章列表项(用于侧边栏显示)
 * @returns ArticleListItem数组
 */
export function getArticleListItems(): ArticleListItem[] {
  const items: ArticleListItem[] = [];

  for (const [id, data] of Object.entries(articleMap)) {
    items.push({
      id,
      title: data.title,
      date: data.date,
      author: data.author,
      tag: data.tag,
      path: `/pub/${id}`,  // 直接使用文章ID作为路径
      filePath: (data as any)._filePath || id  // 保留原始文件路径用于调试
    });
  }

  // 按日期降序排序(最新的在前)
  items.sort((a, b) => {
    const dateA = a.date ? getDayjs(a.date).valueOf() : 0;
    const dateB = b.date ? getDayjs(b.date).valueOf() : 0;
    return dateB - dateA;
  });

  return items;
}

/**
 * 获取所有标签（去重并按字母顺序排序）
 * @returns 标签数组
 */
export function getAllTags(): string[] {
  const tagSet = new Set<string>();

  for (const [id, data] of Object.entries(articleMap)) {
    // 收集所有标签
    if (data.tag && Array.isArray(data.tag)) {
      data.tag.forEach(tag => tagSet.add(tag));
    }
  }

  // 按字母顺序排序
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b, 'zh-CN'));
}

/**
 * 生成文章路由配置
 * @returns 路由配置数组
 */
export function generateArticleRoutes() {
  const routes: Array<{ path: string; element: React.ReactNode }> = [];

  for (const [id, data] of Object.entries(articleMap)) {
    routes.push({
      path: id,  // 直接使用文章ID作为路由路径
      element: data.jsx
    });
  }

  return routes;
}

