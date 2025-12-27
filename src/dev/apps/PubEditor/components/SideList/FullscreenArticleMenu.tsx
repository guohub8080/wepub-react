/** @jsxImportSource react */
import { useEffect, useMemo, useState } from 'react';
import { Search, Calendar, Tag, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input } from '@shadcn/components/ui/input.tsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@shadcn/components/ui/dialog.tsx';
import { cn } from '@shadcn/lib/utils.ts';
import { getArticleListItems, getAllTags, ArticleListItem } from '@articles/data/articlesLoader';
import { getDayjs } from '@dev/utils/utDateTime/exDayjs';
import { getArticleById } from '@articles/data/articlesLoader';
import { usePubEditorStore } from '@apps/PubEditor/store/usePubEditorStore';

/**
 * 搜索过滤函数 - 支持标题、作者、标签、内容和标签筛选
 */
const filterArticles = (
  articles: ArticleListItem[],
  query: string,
  selectedTags: string[]
): ArticleListItem[] => {
  let filtered = articles;

  // 先按标签筛选
  if (selectedTags.length > 0) {
    filtered = filtered.filter(article =>
      article.tag && article.tag.some(tag => selectedTags.includes(tag))
    );
  }

  // 再按搜索词筛选
  if (query.trim()) {
    const searchTerms = query.toLowerCase().trim();

    filtered = filtered.filter((article) => {
      // 1. 搜索标题
      const titleMatch = article.title.toLowerCase().includes(searchTerms);

      // 2. 搜索作者
      const authorMatch = article.author && article.author.toLowerCase().includes(searchTerms);

      // 3. 搜索标签
      const tagMatch = article.tag && article.tag.some(tag => tag.toLowerCase().includes(searchTerms));

      // 4. 搜索文章内容
      let contentMatch = false;
      if (searchTerms.length >= 2) {
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
  }

  return filtered;
};

export default function FullscreenArticleMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showFullscreenMenu, setFullscreenMenu, setMobileSideList } = usePubEditorStore();

  const [articles, setArticles] = useState<ArticleListItem[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // 从当前路由中提取选中的文章ID
  const selectedId = useMemo(() => {
    const match = location.pathname.match(/\/pub\/([^/]+)/);
    return match ? match[1] : null;
  }, [location.pathname]);

  // 加载文章列表和标签
  useEffect(() => {
    const items = getArticleListItems();
    const tags = getAllTags();
    setArticles(items);
    setAllTags(tags);
  }, []);

  // 使用 useMemo 优化搜索过滤
  const filteredArticles = useMemo(() => {
    return filterArticles(articles, searchQuery, selectedTags);
  }, [articles, searchQuery, selectedTags]);

  // 点击文章后跳转并关闭弹窗，同时关闭抽屉
  const handleArticleClick = (path: string) => {
    navigate(path);
    setFullscreenMenu(false);
    setMobileSideList(false);
  };

  // 切换标签选择
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // 清除所有标签筛选
  const clearTagFilter = () => {
    setSelectedTags([]);
  };

  return (
    <>
      <style>{`
        .article-grid-custom {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
        }
        @media (min-width: 450px) {
          .article-grid-custom {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 750px) {
          .article-grid-custom {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
      <Dialog open={showFullscreenMenu} onOpenChange={setFullscreenMenu}>
        <DialogContent
          className="max-w-4xl max-h-[80vh] max-sm:max-h-[100vh] flex flex-col p-0 gap-0"
          showClose={false}
        >
        {/* 自定义标题栏 */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b">
          <DialogTitle className="text-2xl font-semibold">选择文章</DialogTitle>
          <button
            type="button"
            onClick={() => setFullscreenMenu(false)}
            className="h-8 w-8 rounded-md hover:bg-foreground/10 transition-all duration-200 flex items-center justify-center"
            aria-label="关闭"
          >
            <X className="h-5 w-5 text-foreground/70 hover:text-foreground" />
          </button>
        </div>

        {/* 搜索框和标签筛选 - 重新设计 */}
        <div className="px-6 pt-4 pb-4 border-b space-y-3">
          {/* 搜索框 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索文章..."
              className="pl-10 h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          {/* 标签筛选 - 单行设计 */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Tag className="h-4 w-4" />
                <span>标签</span>
                <span className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-medium',
                  selectedTags.length > 0
                    ? 'bg-primary/10 text-primary'
                    : 'bg-secondary/50 text-secondary-foreground'
                )}>
                  {selectedTags.length}
                </span>
              </div>
              {allTags.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={cn(
                    'px-3 py-1.5 rounded-md text-sm transition-all duration-200',
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  )}
                >
                  {tag}
                </button>
              ))}
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={clearTagFilter}
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm ml-auto"
                >
                  清除
                </button>
              )}
            </div>
          )}
        </div>

        {/* 文章列表 - 网格布局 */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
              {searchQuery || selectedTags.length > 0 ? '未找到相关文章' : '暂无文章'}
            </div>
          ) : (
            <div className="article-grid-custom gap-px bg-border border-2 border-border">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className={cn(
                    'cursor-pointer transition-all duration-200 bg-background p-3',
                    'hover:bg-accent',
                    selectedId === article.id && 'bg-primary text-white hover:bg-primary/90'
                  )}
                  onClick={() => handleArticleClick(article.path)}
                >
                  {/* 标题 */}
                  <h3 className="text-sm font-semibold mb-2 line-clamp-2">
                    {article.title}
                  </h3>

                  {/* 标签 */}
                  {article.tag && article.tag.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {article.tag.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
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

                  {/* 日期 */}
                  {article.date && (
                    <div className={cn(
                      'flex items-center gap-1 text-xs',
                      selectedId === article.id ? 'text-white/70' : 'text-muted-foreground'
                    )}>
                      <Calendar className="h-3 w-3" />
                      <span>
                        {getDayjs(article.date).format('YYYY-MM-DD')}
                        <span className="ml-2">{
                          ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][getDayjs(article.date).day()]
                        }</span>
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
    </>
  );
}
