import { getDayjs } from '@dev/utils/utDateTime/exDayjs';
import React from 'react';

/**
 * WePubReact 默认示例文章
 * 介绍 WePubReact 的设计理念和使用方法
 */

const articleMeta = {
  title: "欢迎使用 WePubReact",
  date: getDayjs('2025-01-01 00:00:00'),
  author: "guohub8080",
  tag: ["文档"],
}

// SectionTitle 组件
const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  return (
    <section style={{
      marginBottom: '48px',
      position: 'relative'
    }}>
      {/* 标题 */}
      <section style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 16px 0',
        textAlign: 'center',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: 'monospace'
      }}>
        {title}
      </section>

      {/* 装饰线 */}
      <section style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}>
        {/* 左短线 */}
        <section style={{
          width: '40px',
          height: '2px',
          background: '#cbd5e1'
        }}></section>

        {/* 方块 */}
        <section style={{
          width: '8px',
          height: '8px',
          background: '#3b82f6',
          transform: 'rotate(45deg)'
        }}></section>

        {/* 右短线 */}
        <section style={{
          width: '40px',
          height: '2px',
          background: '#cbd5e1'
        }}></section>
      </section>
    </section>
  );
};

const DefaultArticle = () => {
  return (
    <section style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: '#3b82f6',
      padding: '40px 16px',
      borderRadius: '20px',
      color: '#fff',
      boxShadow: 'none'
    }}>
      {/* 头部封面区域 */}
      <section style={{ marginBottom: '40px', textAlign: 'center' }}>
        <section style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '20px',
          marginBottom: '20px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          面向前端的页面框架
        </section>
        <section style={{
          fontSize: '42px',
          fontWeight: '700',
          color: '#fff',
          marginBottom: '16px',
          lineHeight: '1.2',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)'
        }}>
          欢迎使用 WePubReact
        </section>
      </section>

      {/* 主内容区域 - 白色卡片 */}
      <section style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '16px',
        paddingTop:50,
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        color: '#3f3f3f'
      }}>
        {/* 项目介绍 */}
        <section style={{ marginBottom: '48px' }}>
          <SectionTitle title="项目介绍" />

          <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 框架介绍卡片 */}
            <section style={{
              padding: '28px 24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              position: 'relative'
            }}>
              {/* 标签 */}
              <section style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: '#3b82f6',
                color: '#fff',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '16px',
                letterSpacing: '0.5px'
              }}>
                代码级页面框架
              </section>

              {/* 内容 */}
              <section style={{
                fontSize: '17px',
                lineHeight: '1.9',
                color: '#2d3748',
                margin: 0,
                fontWeight: '500',
                textAlign: 'justify',
                marginBottom: '20px'
              }}>
                WePubReact 是一个面向专业工程师的页面框架，而非在线编辑器。它要求使用者具备 HTML、CSS、React、TypeScript 等前端技术能力。你将通过编写代码来构建页面，完全掌控每个细节。另外，得益于原生开发方式，你可以配合 Cursor 或 Claude Code 等智能开发工具，让 AI 帮助你快速创建个性化页面模板，实现标准化的个人作品展示。
              </section>

              {/* 技术栈标签 */}
              <section style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {['HTML', 'CSS', 'TypeScript', 'React'].map((tech, index) => (
                  <span key={index} style={{
                    padding: '6px 16px',
                    background: '#fff',
                    color: '#3b82f6',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: '1.5px solid #3b82f6',
                    fontFamily: 'monospace',
                    letterSpacing: '0.5px',
                    boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)',
                    transition: 'all 0.2s ease'
                  }}>
                    {tech}
                  </span>
                ))}
              </section>
            </section>

            {/* SVG 支持卡片 */}
            <section style={{
              padding: '28px 24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              position: 'relative'
            }}>
              {/* 标签 */}
              <section style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: '#2563eb',
                color: '#fff',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '16px',
                letterSpacing: '0.5px'
              }}>
                SVG 增强支持
              </section>

              {/* 内容 */}
              <section style={{
                fontSize: '17px',
                lineHeight: '1.9',
                color: '#2d3748',
                margin: 0,
                fontWeight: '500',
                textAlign: 'justify',
                marginBottom: '20px'
              }}>
                内置强大的 SVG 组件系统，支持图形化内容创作。提供丰富的 SVG 工具库，包括动画控制、路径编辑、渐变填充等功能。让你可以轻松创建矢量图形、图标、插画等视觉元素，并将其与页面内容完美融合。
              </section>

              {/* 技术栈标签 */}
              <section style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {['SVG', '动画', '矢量图形', '可视化'].map((tech, index) => (
                  <span key={index} style={{
                    padding: '6px 16px',
                    background: '#fff',
                    color: '#3b82f6',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: '1.5px solid #3b82f6',
                    fontFamily: 'monospace',
                    letterSpacing: '0.5px',
                    boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)',
                    transition: 'all 0.2s ease'
                  }}>
                    {tech}
                  </span>
                ))}
              </section>
            </section>
          </section>
        </section>

        {/* 核心特性 */}
        <section style={{ marginBottom: '48px' }}>
          <SectionTitle title="核心特性" />

          <section style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <section style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <section style={{
                width: '48px',
                height: '48px',
                background: '#3b82f6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                  <path d="M2 2l7.586 7.586"></path>
                  <circle cx="11" cy="11" r="2"></circle>
                </svg>
              </section>
              <section style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '10px',
                margin: '0 0 10px 0'
              }}>
                专业页面框架
              </section>
              <section style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#475569',
                margin: 0
              }}>
                使用 HTML + CSS + React + TypeScript 构建页面。支持组件化开发、Tailwind CSS 工具类，完全掌控页面细节。
              </section>
            </section>

            <section style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <section style={{
                width: '48px',
                height: '48px',
                background: '#2563eb',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7H9V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"></path>
                  <circle cx="9" cy="9" r="2"></circle>
                  <circle cx="15" cy="9" r="2"></circle>
                  <path d="M8 14h8"></path>
                </svg>
              </section>
              <section style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '10px',
                margin: '0 0 10px 0'
              }}>
                AI 辅助开发
              </section>
              <section style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#475569',
                margin: 0
              }}>
                在 Cursor 或 Claude Code 中，让 AI 帮你编写页面代码、调整样式、添加功能。描述需求，实时生成。
              </section>
            </section>

            <section style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <section style={{
                width: '48px',
                height: '48px',
                background: '#1d4ed8',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </section>
              <section style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '10px',
                margin: '0 0 10px 0'
              }}>
                模板标准化
              </section>
              <section style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#475569',
                margin: 0
              }}>
                创建可复用的个人作品模板。统一的视觉风格、一致的交互体验、标准化的内容结构。
              </section>
            </section>

            <section style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <section style={{
                width: '48px',
                height: '48px',
                background: '#1e40af',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
              </section>
              <section style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '10px',
                margin: '0 0 10px 0'
              }}>
                多平台发布
              </section>
              <section style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#475569',
                margin: 0
              }}>
                一键复制 HTML 到微信公众号、知乎、掘金等平台。保持完美排版，无需二次调整。
              </section>
            </section>
          </section>
        </section>

        {/* 使用指南 */}
        <section style={{ marginBottom: '48px' }}>
          <SectionTitle title="快速开始" />

          <section style={{ display: 'grid', gap: '12px' }}>
            <section style={{
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              borderLeft: '4px solid #3b82f6',
              transition: 'all 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <section style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '20px',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
                }}>
                  1
                </section>
                <section style={{ flex: 1 }}>
                  <section style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1e293b',
                    margin: '0 0 6px 0'
                  }}>
                    克隆项目
                  </section>
                  <section style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#64748b',
                    margin: 0
                  }}>
                    克隆 WePubReact 仓库，运行 <section style={{
                      backgroundColor: '#f1f5f9',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: '600',
                      color: '#dc2626',
                      fontSize: '13px'
                    }}>pnpm install</section> 安装依赖
                  </section>
                </section>
              </section>
            </section>

            <section style={{
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              borderLeft: '4px solid #2563eb',
              transition: 'all 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <section style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '20px',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
                }}>
                  2
                </section>
                <section style={{ flex: 1 }}>
                  <section style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1e293b',
                    margin: '0 0 6px 0'
                  }}>
                    创建文章
                  </section>
                  <section style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#64748b',
                    margin: 0
                  }}>
                    在 <section style={{
                      backgroundColor: '#f1f5f9',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontFamily: 'monospace',
                      fontWeight: '600',
                      color: '#dc2626',
                      fontSize: '13px'
                    }}>src/articles</section> 创建 .tsx 文件
                  </section>
                </section>
              </section>
            </section>

            <section style={{
              padding: '16px',
              background: '#f8fafc',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              borderLeft: '4px solid #1d4ed8',
              transition: 'all 0.3s ease',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <section style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <section style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '20px',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)'
                }}>
                  3
                </section>
                <section style={{ flex: 1 }}>
                  <section style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1e293b',
                    margin: '0 0 6px 0'
                  }}>
                    发布分享
                  </section>
                  <section style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#64748b',
                    margin: 0
                  }}>
                    浏览器预览效果，满意后一键复制 HTML 到目标平台
                  </section>
                </section>
              </section>
            </section>
          </section>
        </section>

        {/* 技术亮点 */}
        <section style={{
          padding: '28px',
          background: '#f8fafc',
          borderRadius: '16px',
          marginBottom: '0',
          border: '1px solid #e2e8f0'
        }}>
          <section style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '20px',
            textAlign: 'center',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontFamily: 'monospace'
          }}>
            技术栈
          </section>

          <section style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            justifyContent: 'center'
          }}>
            {[
              'React 18', 'TypeScript', 'Vite', 'Tailwind CSS v4',
              'Radix UI', 'Zustand', 'Jotai', 'React Router', 'Motion', 'MDX',
              'Syntax Highlighter', 'Lucide Icons', 'Heroicons', 'Day.js', 'Axios',
              'Prettier', '@dnd-kit', 'Ahooks', 'Lodash', 'Ramda',
              'React Hot Toast', 'Monaco Editor', 'Chroma.js', 'Culori',
              'Gray Matter', 'Highlight.js', 'Shiki', 'Prism',
              'Qrcode.react', 'React Icons', 'date-fns',
              'Copy to Clipboard', 'Class Variance Authority', 'Cmdk',
              'Tailwind Merge', 'Clsx', 'Immer', 'React Use', 'UseHooks TS',
              'Ant Design', 'Emotion', 'Headless UI', 'Re-resizable', 'React RND',
              'React Colorful', 'Jaames IRO', 'KeyboardJS',
              'UA Parser JS', 'JSEncrypt', 'jsrsasign', 'JS Base64',
              'React Device Detect', 'React Image Size', 'React Type Animation',
              'React Async', 'React Day Picker', '@uiw React JSON View',
              '...'
            ].map((tech, index) => (
              <section key={index} style={{
                padding: '6px 16px',
                background: '#fff',
                borderRadius: '20px',
                border: '1.5px solid #3b82f6',
                fontSize: '13px',
                fontWeight: '600',
                color: '#3b82f6',
                fontFamily: 'monospace',
                letterSpacing: '0.5px',
                boxShadow: '0 1px 3px rgba(59, 130, 246, 0.2)',
                transition: 'all 0.2s ease'
              }}>
                {tech}
              </section>
            ))}
          </section>
        </section>
      </section>

      {/* 开源协议 */}
      <section style={{
        textAlign: 'center',
        marginTop:20,
        padding: '30px 20px',
        color: '#fff'
      }}>
        <section style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '20px',
          marginBottom: '12px'
        }}>
          <section style={{
            fontSize: '14px',
            color: '#fff',
            margin: 0,
            fontWeight: '600'
          }}>
            WePubReact
          </section>
        </section>
        <section style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.8)',
          margin: 0
        }}>
          Built by guohub8080 with Claude Code
        </section>
      </section>
    </section>
  );
};

export default {
  jsx: <DefaultArticle />,
  ...articleMeta
};
