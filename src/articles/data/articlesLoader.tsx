import defaultArticleData from './defaultArticle';

/**
 * 文章数据加载器
 * 根据文章ID返回对应的文章数据
 */

export interface ArticleData {
  jsx: React.ReactNode;
  title: string;
  date?: any;
  author?: string;
  tag?: string[];
}

// 文章数据映射
const articleMap: Record<string, ArticleData> = {
  'default': defaultArticleData,
};

/**
 * 根据文章ID获取文章数据
 * @param articleId 文章ID
 * @returns 文章数据，如果不存在则返回默认文章
 */
export function getArticleById(articleId: string): ArticleData {
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
 * 生成文章路由配置
 * @returns 路由配置数组
 */
export function generateArticleRoutes() {
  const articleIds = getAllArticleIds();

  return articleIds.map(id => ({
    path: id,
    element: articleMap[id].jsx,
  }));
}
