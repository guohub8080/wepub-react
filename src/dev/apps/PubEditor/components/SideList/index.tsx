/** @jsxImportSource react */
import React, { useState } from 'react';
import { Plus, Search, FileText, Calendar } from 'lucide-react';
import { Button } from '@shadcn/components/ui/button.tsx';
import { Input } from '@shadcn/components/ui/input.tsx';
import { Card } from '@shadcn/components/ui/card.tsx';
import { cn } from '@shadcn/lib/utils.ts';

/**
 * 左栏：文章列表组件
 * 功能：显示所有文章，支持搜索、筛选、创建新文章
 */

// 文章数据类型
interface Article {
  id: string;
  title: string;
  content: string;
  excerpt?: string;  // 摘要
  tags?: string[];   // 标签
  createdAt: Date;
  updatedAt: Date;
}

// 模拟数据 - 增加到20篇文章用于测试滚动
const mockArticles: Article[] = [
  {
    id: '1',
    title: '测试文章 1 - 这是一个很长的标题用于测试显示效果',
    content: '这是第一篇测试文章的内容...',
    excerpt: '这是文章的摘要，简要介绍文章的主要内容和核心观点。',
    tags: ['技术', '前端', 'React'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
  },
  {
    id: '2',
    title: '测试文章 2',
    content: '这是第二篇测试文章的内容...',
    excerpt: '第二篇文章的摘要，介绍一些有趣的技术话题。',
    tags: ['教程', 'TypeScript'],
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-04'),
  },
  {
    id: '3',
    title: '测试文章 3',
    content: '这是第三篇测试文章的内容...',
    excerpt: '探讨现代前端开发的最佳实践和设计模式。',
    tags: ['设计模式', '架构'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-06'),
  },
  {
    id: '4',
    title: '测试文章 4',
    content: '这是第四篇测试文章的内容...',
    excerpt: '深入分析组件化开发的优势和应用场景。',
    tags: ['组件化', '最佳实践'],
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-08'),
  },
  {
    id: '5',
    title: '测试文章 5',
    content: '这是第五篇测试文章的内容...',
    excerpt: '介绍状态管理的各种方案和实现方式。',
    tags: ['状态管理', 'Zustand'],
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '6',
    title: '测试文章 6',
    content: '这是第六篇测试文章的内容...',
    excerpt: '性能优化技巧和调试方法的详细讲解。',
    tags: ['性能优化', '调试'],
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-12'),
  },
  {
    id: '7',
    title: '测试文章 7',
    content: '这是第七篇测试文章的内容...',
    excerpt: 'CSS-in-JS 的各种实现方案对比分析。',
    tags: ['CSS', 'Tailwind'],
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-14'),
  },
  {
    id: '8',
    title: '测试文章 8',
    content: '这是第八篇测试文章的内容...',
    excerpt: '响应式设计的核心理念和实现技巧。',
    tags: ['响应式', 'UI/UX'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16'),
  },
  {
    id: '9',
    title: '测试文章 9',
    content: '这是第九篇测试文章的内容...',
    excerpt: '测试驱动开发的实践经验分享。',
    tags: ['测试', 'TDD'],
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-18'),
  },
  {
    id: '10',
    title: '测试文章 10',
    content: '这是第十篇测试文章的内容...',
    excerpt: '代码重构的策略和常见误区分析。',
    tags: ['重构', '代码质量'],
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '11',
    title: '测试文章 11',
    content: '这是第十一篇测试文章的内容...',
    excerpt: 'Git 工作流和版本管理最佳实践。',
    tags: ['Git', '版本控制'],
    createdAt: new Date('2024-01-21'),
    updatedAt: new Date('2024-01-22'),
  },
  {
    id: '12',
    title: '测试文章 12',
    content: '这是第十二篇测试文章的内容...',
    excerpt: 'Node.js 后端开发入门指南。',
    tags: ['Node.js', '后端'],
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-24'),
  },
  {
    id: '13',
    title: '测试文章 13',
    content: '这是第十三篇测试文章的内容...',
    excerpt: '微前端架构的设计思路和实现方案。',
    tags: ['微前端', '架构设计'],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-26'),
  },
  {
    id: '14',
    title: '测试文章 14',
    content: '这是第十四篇测试文章的内容...',
    excerpt: 'Webpack 配置优化和打包策略。',
    tags: ['Webpack', '构建工具'],
    createdAt: new Date('2024-01-27'),
    updatedAt: new Date('2024-01-28'),
  },
  {
    id: '15',
    title: '测试文章 15',
    content: '这是第十五篇测试文章的内容...',
    excerpt: 'Web 安全防护措施和常见漏洞。',
    tags: ['安全', 'Web'],
    createdAt: new Date('2024-01-29'),
    updatedAt: new Date('2024-01-30'),
  },
  {
    id: '16',
    title: '测试文章 16',
    content: '这是第十六篇测试文章的内容...',
    excerpt: 'GraphQL API 设计和实践经验。',
    tags: ['GraphQL', 'API'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-02'),
  },
  {
    id: '17',
    title: '测试文章 17',
    content: '这是第十七篇测试文章的内容...',
    excerpt: 'Serverless 架构的优势和应用场景。',
    tags: ['Serverless', '云计算'],
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-04'),
  },
  {
    id: '18',
    title: '测试文章 18',
    content: '这是第十八篇测试文章的内容...',
    excerpt: 'Docker 容器化部署实战指南。',
    tags: ['Docker', 'DevOps'],
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-06'),
  },
  {
    id: '19',
    title: '测试文章 19',
    content: '这是第十九篇测试文章的内容...',
    excerpt: 'CI/CD 流程搭建和自动化部署。',
    tags: ['CI/CD', '自动化'],
    createdAt: new Date('2024-02-07'),
    updatedAt: new Date('2024-02-08'),
  },
  {
    id: '20',
    title: '测试文章 20',
    content: '这是第二十篇测试文章的内容...',
    excerpt: '前端监控和性能分析工具使用指南。',
    tags: ['监控', '性能分析'],
    createdAt: new Date('2024-02-09'),
    updatedAt: new Date('2024-02-10'),
  },
];

export default function SideList() {
  const [articles] = useState<Article[]>(mockArticles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // 搜索过滤
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="h-full overflow-hidden">
      <div className="h-full flex flex-col p-4 pt-0">

        {/* 顶部：标题和新建按钮 */}
        <div className="flex-shrink-0 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">文章列表</h2>
            <Button size="sm" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
            </Button>
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
          <div className="space-y-2">
            {filteredArticles.length === 0 ? (
              <div className="text-center text-sm text-muted-foreground py-8">
                {searchQuery ? '未找到相关文章' : '暂无文章'}
              </div>
            ) : (
              filteredArticles.map((article) => (
                <Card
                  key={article.id}
                  className={cn(
                    'p-3 cursor-pointer transition-all duration-200',
                    'hover:shadow-md hover:border-primary/50',
                    selectedId === article.id && 'border-primary bg-accent/50 shadow-md'
                  )}
                  onClick={() => setSelectedId(article.id)}
                >
                  <div className="flex items-start gap-2">
                    <FileText className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <div className="flex-1 min-w-0 space-y-1">
                      {/* 标题 */}
                      <h3 className="text-sm font-medium truncate">
                        {article.title}
                      </h3>

                      {/* 摘要 */}
                      {article.excerpt && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {article.excerpt}
                        </p>
                      )}

                      {/* 标签 */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-1.5 py-0.5 rounded text-xs bg-primary/10 text-primary"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 日期 */}
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{article.updatedAt.toLocaleDateString('zh-CN')}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
