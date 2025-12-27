import { getDayjs } from '@dev/utils/utDateTime/exDayjs';
import React from 'react';
import SectionTitle from './SectionTitle';

/**
 * WePubReact 默认示例文章
 * 介绍 WePubReact 的设计理念和使用方法
 */

const articleMeta = {
  title: "欢迎使用 WePubReact",
  date: getDayjs('2025-01-01 00:00:00'),
  author: "guohub8080",
  tag: ["介绍", "指南", "AI辅助"],
}

const DefaultArticle = () => {
  return (
    <article style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      background: '#3b82f6',
      padding: '40px 30px',
      borderRadius: '20px',
      color: '#fff'
    }}>
      {/* 头部封面区域 */}
      <section style={{ marginBottom: '40px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '20px',
          marginBottom: '20px',
          fontSize: '14px',
          fontWeight: '500'
        }}>
          ✨ 开启代码创作新纪元
        </div>
        <h1 style={{
          fontSize: '42px',
          fontWeight: '700',
          color: '#fff',
          marginBottom: '16px',
          lineHeight: '1.2',
          textShadow: '0 2px 20px rgba(0,0,0,0.3)'
        }}>
          欢迎使用 WePubReact
        </h1>
      </section>

      {/* 主内容区域 - 白色卡片 */}
      <section style={{
        backgroundColor: '#fff',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        color: '#3f3f3f'
      }}>
        {/* 项目介绍 */}
        <section style={{ marginBottom: '48px' }}>
          <SectionTitle title="项目介绍" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* 框架介绍卡片 */}
            <section style={{
              padding: '28px 24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              position: 'relative'
            }}>
              {/* 标签 */}
              <div style={{
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
              </div>

              {/* 内容 */}
              <p style={{
                fontSize: '17px',
                lineHeight: '1.9',
                color: '#2d3748',
                margin: 0,
                fontWeight: '500',
                textAlign: 'justify',
                marginBottom: '20px'
              }}>
                WePubReact 是一个面向专业工程师的页面框架，而非在线编辑器。它要求使用者具备 HTML、CSS、React、TypeScript 等前端技术能力。你将通过编写代码来构建页面，完全掌控每个细节。另外，得益于原生开发方式，你可以配合 Cursor 或 Claude Code 等智能开发工具，让 AI 帮助你快速创建个性化页面模板，实现标准化的个人作品展示。
              </p>

              {/* 技术栈标签 */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                {['HTML', 'CSS', 'TypeScript', 'React'].map((tech, index) => (
                  <span key={index} style={{
                    padding: '6px 14px',
                    background: '#fff',
                    color: '#3b82f6',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: '2px solid #3b82f6',
                    fontFamily: 'monospace',
                    letterSpacing: '0.5px'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* SVG 支持卡片 */}
            <section style={{
              padding: '28px 24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              position: 'relative'
            }}>
              {/* 标签 */}
              <div style={{
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
              </div>

              {/* 内容 */}
              <p style={{
                fontSize: '17px',
                lineHeight: '1.9',
                color: '#2d3748',
                margin: 0,
                fontWeight: '500',
                textAlign: 'justify',
                marginBottom: '20px'
              }}>
                内置强大的 SVG 组件系统，支持图形化内容创作。提供丰富的 SVG 工具库，包括动画控制、路径编辑、渐变填充等功能。让你可以轻松创建矢量图形、图标、插画等视觉元素，并将其与页面内容完美融合。
              </p>

              {/* 技术栈标签 */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                {['SVG', '动画', '矢量图形', '可视化'].map((tech, index) => (
                  <span key={index} style={{
                    padding: '6px 14px',
                    background: '#fff',
                    color: '#2563eb',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: '2px solid #2563eb',
                    fontFamily: 'monospace',
                    letterSpacing: '0.5px'
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* 核心特性 */}
        <section style={{ marginBottom: '48px' }}>
          <SectionTitle title="核心特性" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px'
          }}>
            <section style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
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
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '10px',
                margin: '0 0 10px 0'
              }}>
                专业页面框架
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#475569',
                margin: 0
              }}>
                使用 HTML + CSS + React + TypeScript 构建页面。支持组件化开发、Tailwind CSS 工具类，完全掌控页面细节。
              </p>
            </section>

            <section style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
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
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '10px',
                margin: '0 0 10px 0'
              }}>
                AI 辅助开发
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#475569',
                margin: 0
              }}>
                在 Cursor 或 Claude Code 中，让 AI 帮你编写页面代码、调整样式、添加功能。描述需求，实时生成。
              </p>
            </section>

            <section style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
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
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '10px',
                margin: '0 0 10px 0'
              }}>
                模板标准化
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#475569',
                margin: 0
              }}>
                创建可复用的个人作品模板。统一的视觉风格、一致的交互体验、标准化的内容结构。
              </p>
            </section>

            <section style={{
              padding: '24px',
              background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
              borderRadius: '16px',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
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
              </div>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1e40af',
                marginBottom: '10px',
                margin: '0 0 10px 0'
              }}>
                多平台发布
              </h3>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#475569',
                margin: 0
              }}>
                一键复制 HTML 到微信公众号、知乎、掘金等平台。保持完美排版，无需二次调整。
              </p>
            </section>
          </div>
        </section>

        {/* 使用指南 */}
        <section style={{ marginBottom: '48px' }}>
          <SectionTitle title="快速开始" />

          <div style={{ display: 'grid', gap: '16px' }}>
            <section style={{
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '8px',
              borderLeft: '4px solid #3b82f6'
            }}>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#3b82f6',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '16px',
                  flexShrink: 0
                }}>
                  1
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    克隆项目
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#64748b',
                    margin: 0
                  }}>
                    克隆仓库，运行 <code style={{
                      backgroundColor: '#e2e8f0',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontFamily: 'monospace',
                      color: '#dc2626',
                      fontSize: '13px'
                    }}>pnpm install</code> 安装依赖
                  </p>
                </div>
              </div>
            </section>

            <section style={{
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '8px',
              borderLeft: '4px solid #2563eb'
            }}>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#2563eb',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '16px',
                  flexShrink: 0
                }}>
                  2
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    创建文章
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#64748b',
                    margin: 0
                  }}>
                    在 <code style={{
                      backgroundColor: '#e2e8f0',
                      padding: '2px 6px',
                      borderRadius: '3px',
                      fontFamily: 'monospace',
                      color: '#dc2626',
                      fontSize: '13px'
                    }}>src/articles</code> 创建 .tsx 文件
                  </p>
                </div>
              </div>
            </section>

            <section style={{
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '8px',
              borderLeft: '4px solid #1d4ed8'
            }}>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#1d4ed8',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '16px',
                  flexShrink: 0
                }}>
                  3
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    AI 辅助开发
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#64748b',
                    margin: 0
                  }}>
                    使用 Cursor 或 Claude Code 让 AI 帮你编写代码
                  </p>
                </div>
              </div>
            </section>

            <section style={{
              padding: '20px',
              background: '#f8fafc',
              borderRadius: '8px',
              borderLeft: '4px solid #1e40af'
            }}>
              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '6px',
                  background: '#1e40af',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '16px',
                  flexShrink: 0
                }}>
                  4
                </div>
                <div>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#1e293b',
                    margin: '0 0 4px 0'
                  }}>
                    发布分享
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: '#64748b',
                    margin: 0
                  }}>
                    浏览器预览，满意后复制 HTML 到目标平台
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>

        {/* 技术亮点 */}
        <section style={{
          padding: '28px',
          background: '#f8fafc',
          borderRadius: '16px',
          marginBottom: '0',
          border: '1px solid #e2e8f0'
        }}>
          <h2 style={{
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
          </h2>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            justifyContent: 'center'
          }}>
            {[
              { name: 'React 18', color: '#3b82f6' },
              { name: 'TypeScript', color: '#2563eb' },
              { name: 'Vite', color: '#1d4ed8' },
              { name: 'Tailwind CSS', color: '#1e40af' },
              { name: 'Zustand', color: '#1e3a8a' },
              { name: 'shadcn/ui', color: '#1e3a8a' }
            ].map((tech, index) => (
              <div key={index} style={{
                padding: '8px 16px',
                background: '#fff',
                borderRadius: '20px',
                border: '1px solid #e2e8f0',
                fontSize: '14px',
                fontWeight: '600',
                color: tech.color,
                fontFamily: 'monospace',
                letterSpacing: '0.5px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                {tech.name}
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* 开源协议 */}
      <section style={{
        textAlign: 'center',
        padding: '30px 20px',
        borderTop: '1px solid rgba(255,255,255,0.2)',
        color: '#fff'
      }}>
        <div style={{
          display: 'inline-block',
          padding: '8px 20px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '20px',
          marginBottom: '12px'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#fff',
            margin: 0,
            fontWeight: '600'
          }}>
            WePubReact
          </p>
        </div>
        <p style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.8)',
          margin: 0
        }}>
          Built by guohub8080 with Claude Code
        </p>
      </section>
    </article>
  );
};

export default {
  jsx: <DefaultArticle />,
  ...articleMeta
};
