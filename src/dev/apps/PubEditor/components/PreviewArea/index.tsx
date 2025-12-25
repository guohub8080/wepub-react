/** @jsxImportSource react */
import { usePubEditorStore, PUB_EDITOR_LAYOUT } from '@apps/PubEditor/store/usePubEditorStore';

/**
 * 中栏：文章预览区组件
 * 功能：显示选中文章的预览内容
 */

// 模拟选中的文章数据 - 使用行内样式，多样化格式
const mockArticle = {
  id: '1',
  title: '测试文章标题 - 富文本格式测试',
  content: `
    <h1 style="font-size: 32px; font-weight: bold; color: #1a1a1a; margin-bottom: 16px; border-bottom: 3px solid #3b82f6; padding-bottom: 8px; max-width: 100%; word-wrap: break-word;">第一章：标题样式测试</h1>

    <p style="font-size: 16px; line-height: 1.8; color: #333; margin-bottom: 16px; text-indent: 2em; max-width: 100%; word-wrap: break-word;">
      这是<strong style="font-weight: bold; color: #e11d48;">加粗文字</strong>，这是<em style="font-style: italic; color: #8b5cf6;">斜体文字</em>，这是<u style="text-decoration: underline; color: #0891b2;">下划线文字</u>，这是<del style="text-decoration: line-through; color: #64748b;">删除线文字</del>。
    </p>

    <p style="font-size: 18px; line-height: 1.8; color: #4b5563; background-color: #fef3c7; padding: 12px; border-left: 4px solid #f59e0b; margin-bottom: 16px; max-width: 100%; word-wrap: break-word;">
      这是一段带背景色和边框的强调段落。<span style="color: #dc2626; font-weight: bold;">重点内容</span>可以用不同颜色标注。
    </p>

    <blockquote style="font-size: 16px; line-height: 1.8; color: #64748b; background-color: #f1f5f9; border-left: 4px solid #3b82f6; padding: 16px; margin: 16px 0; font-style: italic; max-width: 100%; word-wrap: break-word;">
      这是一个引用块，通常用于展示重要的观点或者他人的言论。文字采用斜体样式，背景色为浅灰色，左侧有蓝色边框。
    </blockquote>

    <h2 style="font-size: 28px; font-weight: bold; color: #0f172a; margin-top: 24px; margin-bottom: 16px; background: linear-gradient(to right, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; max-width: 100%; word-wrap: break-word;">第二章：列表和代码</h2>

    <h3 style="font-size: 22px; font-weight: 600; color: #475569; margin-bottom: 12px; border-left: 4px solid #10b981; padding-left: 12px;">2.1 无序列表示例</h3>

    <ul style="list-style-type: disc; margin-left: 24px; margin-bottom: 16px; line-height: 1.8;">
      <li style="margin-bottom: 8px; color: #374151;">
        <span style="font-weight: bold; color: #059669;">列表项 1：</span>这是第一个要点，使用了<span style="background-color: #dbeafe; padding: 2px 6px; border-radius: 4px; font-family: monospace;">行内代码样式</span>
      </li>
      <li style="margin-bottom: 8px; color: #374151;">
        <span style="font-weight: bold; color: #059669;">列表项 2：</span>这是第二个要点，包含<a href="https://example.com" style="color: #2563eb; text-decoration: underline;">超链接示例</a>
      </li>
      <li style="margin-bottom: 8px; color: #374151;">
        <span style="font-weight: bold; color: #059669;">列表项 3：</span>这是第三个要点，使用了多种<span style="font-size: 18px; color: #dc2626;">字体大小</span>和<span style="font-size: 14px; color: #7c3aed;">颜色变化</span>
      </li>
    </ul>

    <h3 style="font-size: 22px; font-weight: 600; color: #475569; margin-bottom: 12px; border-left: 4px solid #f59e0b; padding-left: 12px;">2.2 有序列表示例</h3>

    <ol style="list-style-type: decimal; margin-left: 24px; margin-bottom: 16px; line-height: 1.8;">
      <li style="margin-bottom: 8px; color: #1e293b; font-size: 16px;">第一步：<span style="background-color: #fef3c7; padding: 2px 8px;">准备工作</span></li>
      <li style="margin-bottom: 8px; color: #1e293b; font-size: 16px;">第二步：<span style="background-color: #dbeafe; padding: 2px 8px;">开始执行</span></li>
      <li style="margin-bottom: 8px; color: #1e293b; font-size: 16px;">第三步：<span style="background-color: #dcfce7; padding: 2px 8px;">验证结果</span></li>
    </ol>

    <h3 style="font-size: 22px; font-weight: 600; color: #475569; margin-bottom: 12px; border-left: 4px solid #8b5cf6; padding-left: 12px;">2.3 代码块示例</h3>

    <pre style="background-color: #1e293b; color: #e2e8f0; padding: 16px; border-radius: 8px; overflow-x: auto; max-width: 100%; font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.6; margin-bottom: 16px;"><code style="color: #e2e8f0;">function example() {
  <span style="color: #f472b6;">const</span> message = <span style="color: #34d399;">"这是一个代码示例"</span>;
  <span style="color: #f472b6;">console</span>.<span style="color: #60a5fa;">log</span>(message);
  <span style="color: #f472b6;">return</span> <span style="color: #fbbf24;">true</span>;
}</code></pre>

    <h2 style="font-size: 28px; font-weight: bold; color: #0f172a; margin-top: 24px; margin-bottom: 16px; text-align: center; background-color: #f0f9ff; padding: 12px; border-radius: 8px;">第三章：表格和图片</h2>

    <table style="width: 100%; max-width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 14px; table-layout: fixed;">
      <thead>
        <tr style="background-color: #3b82f6; color: white;">
          <th style="padding: 12px; text-align: left; border: 1px solid #2563eb; font-weight: bold; word-wrap: break-word;">项目</th>
          <th style="padding: 12px; text-align: left; border: 1px solid #2563eb; font-weight: bold; word-wrap: break-word;">描述</th>
          <th style="padding: 12px; text-align: center; border: 1px solid #2563eb; font-weight: bold; word-wrap: break-word;">状态</th>
        </tr>
      </thead>
      <tbody>
        <tr style="background-color: #eff6ff;">
          <td style="padding: 12px; border: 1px solid #bfdbfe; color: #1e293b; word-wrap: break-word;">功能A</td>
          <td style="padding: 12px; border: 1px solid #bfdbfe; color: #475569; word-wrap: break-word;">这是功能A的详细描述</td>
          <td style="padding: 12px; border: 1px solid #bfdbfe; text-align: center; word-wrap: break-word;"><span style="background-color: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 12px; font-weight: bold;">完成</span></td>
        </tr>
        <tr style="background-color: white;">
          <td style="padding: 12px; border: 1px solid #bfdbfe; color: #1e293b; word-wrap: break-word;">功能B</td>
          <td style="padding: 12px; border: 1px solid #bfdbfe; color: #475569; word-wrap: break-word;">这是功能B的详细描述</td>
          <td style="padding: 12px; border: 1px solid #bfdbfe; text-align: center; word-wrap: break-word;"><span style="background-color: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 12px; font-weight: bold;">进行中</span></td>
        </tr>
        <tr style="background-color: #eff6ff;">
          <td style="padding: 12px; border: 1px solid #bfdbfe; color: #1e293b; word-wrap: break-word;">功能C</td>
          <td style="padding: 12px; border: 1px solid #bfdbfe; color: #475569; word-wrap: break-word;">这是功能C的详细描述</td>
          <td style="padding: 12px; border: 1px solid #bfdbfe; text-align: center; word-wrap: break-word;"><span style="background-color: #fee2e2; color: #991b1b; padding: 4px 12px; border-radius: 12px; font-weight: bold;">待开始</span></td>
        </tr>
      </tbody>
    </table>

    <h2 style="font-size: 28px; font-weight: bold; color: #0f172a; margin-top: 24px; margin-bottom: 16px;">第四章：特殊格式</h2>

    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px; margin-bottom: 16px; max-width: 100%;">
      <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 12px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">渐变背景卡片</h3>
      <p style="font-size: 16px; line-height: 1.6; margin: 0;">这是一个带渐变背景的卡片，文字是白色的，标题有阴影效果。</p>
    </div>

    <div style="display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; max-width: 100%;">
      <div style="flex: 1; min-width: 200px; max-width: 100%; background-color: #fee2e2; padding: 16px; border-radius: 8px; border-left: 4px solid #dc2626;">
        <h4 style="font-size: 18px; font-weight: bold; color: #991b1b; margin-bottom: 8px;">警告</h4>
        <p style="font-size: 14px; color: #7f1d1d; margin: 0;">这是一个警告样式的提示框</p>
      </div>
      <div style="flex: 1; min-width: 200px; max-width: 100%; background-color: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #2563eb;">
        <h4 style="font-size: 18px; font-weight: bold; color: #1e40af; margin-bottom: 8px;">提示</h4>
        <p style="font-size: 14px; color: #1e3a8a; margin: 0;">这是一个提示样式的信息框</p>
      </div>
      <div style="flex: 1; min-width: 200px; max-width: 100%; background-color: #dcfce7; padding: 16px; border-radius: 8px; border-left: 4px solid #16a34a;">
        <h4 style="font-size: 18px; font-weight: bold; color: #166534; margin-bottom: 8px;">成功</h4>
        <p style="font-size: 14px; color: #14532d; margin: 0;">这是一个成功样式的确认框</p>
      </div>
    </div>

    <p style="font-size: 20px; line-height: 1.8; color: #1e293b; text-align: center; font-weight: 500; margin-top: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      测试完成！以上内容包含了<span style="color: #dc2626; font-weight: bold;">丰富的格式</span>和<span style="color: #2563eb; font-weight: bold;">多样的样式</span>，非常适合测试<span style="background-color: #fef3c7; padding: 2px 8px; border-radius: 4px;">复制功能</span>。
    </p>
  `,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-02'),
};

export default function PreviewArea() {
  const { previewWidth, previewPadding, showPreviewBorder, previewBorderColor, previewBackgroundColor, setPreviewContentRef } = usePubEditorStore();

  return (
    <div className="h-full flex flex-col items-center">
      {/* 外层容器 - 占满可用空间 */}
      <div className="relative h-full flex flex-col w-full">
        {/* 内容区域 - 可调整宽度，居中显示 */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden flex justify-center"
         style={{
          backgroundColor: previewBackgroundColor
         }}
        >
          <div
            style={{
              marginBottom:150,
              padding: previewPadding,
              width: `${previewWidth}px`,
              boxSizing: 'content-box',
              maxWidth: '100%',
            }}
          >
            {/* 预览模式 - 确保内容不溢出 */}
            <article
              className="prose prose-slate dark:prose-invert max-w-none relative"
              style={{
                width: '100%',
                maxWidth: '100%',
                boxSizing:"content-box",
              }}
            >
              {/* 动态边框 */}
              {showPreviewBorder && (
                <svg
                  style={{
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    width: 'calc(100% + 4px)',
                    height: 'calc(100% + 4px)',
                    pointerEvents: 'none',
                    overflow: 'visible',
                  }}
                >
                  <rect
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    fill="none"
                    stroke={previewBorderColor}
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    style={{
                      animation: 'border-dash-flow 120s linear infinite',
                    }}
                  />
                </svg>
              )}
              <div
                ref={setPreviewContentRef}
                dangerouslySetInnerHTML={{ __html: mockArticle.content }}
                style={{
                  width: '100%',
                  maxWidth: '100%'
                }}
              />
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
