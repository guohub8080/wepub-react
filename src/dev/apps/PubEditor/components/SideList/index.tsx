/** @jsxImportSource react */
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Calendar, UserRound, X, Maximize2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@shadcn/components/ui/input.tsx';
import { Card } from '@shadcn/components/ui/card.tsx';
import { cn } from '@shadcn/lib/utils.ts';
import { getArticleListItems, ArticleListItem } from '@articles/data/articlesLoader';
import { getDayjs } from '@dev/utils/utDateTime/exDayjs';
import { getArticleById } from '@articles/data/articlesLoader';
import { usePubEditorStore } from '@apps/PubEditor/store/usePubEditorStore';
import FullscreenArticleMenu from './FullscreenArticleMenu';

/**
 * 左栏：文章列表组件
 * 功能：显示所有文章，支持搜索、筛选、创建新文章
 */

/**
 * 从 JSX 中提取纯文本内容（递归遍历所有节点）
 */
const extractTextFromJSX = (node: React.ReactNode): string => {
  // 空值处理
  if (node === null || node === undefined) return '';

  // 字符串直接返回
  if (typeof node === 'string') return node;

  // 数字转为字符串
  if (typeof node === 'number') return String(node);

  // 布尔值返回空
  if (typeof node === 'boolean') return '';

  // 数组递归处理
  if (Array.isArray(node)) {
    return node.map(extractTextFromJSX).filter(Boolean).join(' ');
  }

  // 对象类型（React 元素）
  if (typeof node === 'object') {
    const element = node as any;

    try {
      // 遍历所有可能的属性位置
      const children = element.props?.children || element.children || element._children;

      if (children !== undefined) {
        return extractTextFromJSX(children);
      }
    } catch (e) {
      // 忽略错误，继续处理
    }
  }

  return '';
};

/**
 * 搜索过滤函数 - 支持标题、作者、标签、内容
 */
const filterArticles = (articles: ArticleListItem[], query: string): ArticleListItem[] => {
  if (!query.trim()) return articles;

  const searchTerms = query.toLowerCase().trim();

  return articles.filter((article) => {
    // 1. 搜索标题
    const titleMatch = article.title.toLowerCase().includes(searchTerms);

    // 2. 搜索作者
    const authorMatch = article.author && article.author.toLowerCase().includes(searchTerms);

    // 3. 搜索标签
    const tagMatch = article.tag && article.tag.some(tag => tag.toLowerCase().includes(searchTerms));

    // 4. 搜索文章内容
    let contentMatch = false;
    if (searchTerms.length >= 2) { // 只在搜索词长度>=2时搜索内容，提升性能
      try {
        const articleData = getArticleById(article.id);
        if (articleData?._textContent) {
          const contentText = articleData._textContent;
          contentMatch = contentText.toLowerCase().includes(searchTerms);
        }
      } catch (e) {
        // 忽略错误，继续其他搜索
      }
    }

    return titleMatch || authorMatch || tagMatch || contentMatch;
  });
};

export default function SideList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setMobileSideList, setFullscreenMenu, mobileShowSideList } = usePubEditorStore();

  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // 从当前路由中提取选中的文章ID
  const selectedId = React.useMemo(() => {
    const match = location.pathname.match(/\/pub\/([^/]+)/);
    return match ? match[1] : null;
  }, [location.pathname]);

  // 加载文章列表
  useEffect(() => {
    const items = getArticleListItems();
    setArticles(items);
  }, []);

  // 当抽屉打开时，滚动到选中的文章位置
  useEffect(() => {
    if (mobileShowSideList && selectedId) {
      // 延迟执行，等待DOM渲染完成
      setTimeout(() => {
        const selectedElement = document.querySelector(`[data-article-id="${selectedId}"]`);
        if (selectedElement) {
          selectedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [mobileShowSideList, selectedId]);

  // 使用 useMemo 优化搜索过滤
  const filteredArticles = useMemo(() => {
    return filterArticles(articles, searchQuery);
  }, [articles, searchQuery]);

  return (
    <>
      <Card className="h-full overflow-hidden p-0">
        <div className="h-full flex flex-col">

          {/* 顶部：标题和新建按钮 */}
          <div className="flex-shrink-0 p-4 pb-3">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">文章列表</h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFullscreenMenu(true)}
                  className="h-8 w-8 p-0 rounded-md hover:bg-foreground/10 transition-all duration-200 flex items-center justify-center"
                  aria-label="全屏"
                >
                  <Maximize2 className="h-4 w-4 text-foreground/70 hover:text-foreground" />
                </button>
                {/* 移动端关闭按钮 */}
                <button
                  type="button"
                  onClick={() => setMobileSideList(false)}
                  className="lg:hidden h-8 w-8 p-0 rounded-md hover:bg-foreground/10 transition-all duration-200 flex items-center justify-center"
                  aria-label="关闭"
                >
                  <X className="w-4 h-4 text-foreground/70 hover:text-foreground" />
                </button>
              </div>
            </div>

            {/* 搜索框 */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索文章..."
                className="pl-8 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* 文章列表 - 可以内部滚动 */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {filteredArticles.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-8">
                {searchQuery ? '未找到相关文章' : '暂无文章'}
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredArticles.map((article) => (
                  <div
                    key={article.id}
                    data-article-id={article.id}
                    className={cn(
                      'p-3 cursor-pointer transition-all duration-200',
                      'hover:bg-accent',
                      selectedId === article.id && 'bg-primary hover:bg-primary/90'
                    )}
                    onClick={() => {
                      navigate(article.path);
                      setMobileSideList(false);
                    }}
                  >
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* 标题 */}
                      <h3 className={cn(
                        'text-sm font-medium truncate',
                        selectedId === article.id && 'text-white'
                      )}>
                        {article.title}
                      </h3>

                      {/* 标签 */}
                      {article.tag && article.tag.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {article.tag.map((tag, index) => (
                            <span
                              key={index}
                              className={cn(
                                'inline-flex items-center px-1.5 py-0.5 rounded text-xs',
                                selectedId === article.id
                                  ? 'bg-white/20 text-white'
                                  : 'bg-primary/10 text-primary'
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 日期和作者 */}
                      <div className="space-y-1 text-xs">
                        {/* 日期 */}
                        {article.date && (
                          <div className={cn(
                            'flex items-center gap-1',
                            selectedId === article.id ? 'text-white/80' : 'text-muted-foreground'
                          )}>
                            <Calendar className="h-3 w-3" />
                            <span>
                              {getDayjs(article.date).format('YYYY-MM-DD')}
                              <span className="ml-2">{['周日', '周一', '周二', '周三', '周四', '周五', '周六'][getDayjs(article.date).day()]}</span>
                            </span>
                          </div>
                        )}

                        {/* 作者 */}
                        {article.author && (
                          <div className={cn(
                            'flex items-center gap-1',
                            selectedId === article.id ? 'text-white/80' : 'text-muted-foreground'
                          )}>
                            <UserRound className="h-3 w-3" />
                            <span>{article.author}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 全屏文章菜单 */}
      <FullscreenArticleMenu />
    </>
  );
}
