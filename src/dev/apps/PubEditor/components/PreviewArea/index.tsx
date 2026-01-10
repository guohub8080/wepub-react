/** @jsxImportSource react */
import { Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { usePubEditorStore, PUB_EDITOR_LAYOUT } from '@apps/PubEditor/store/usePubEditorStore';

/**
 * 中栏：文章预览区组件
 * 功能：显示选中文章的预览内容
 */

export default function PreviewArea() {
  const { previewWidth, previewPadding, previewBorderColor, previewBackgroundColor, setPreviewContentRef } = usePubEditorStore();
  const contentRef = useRef<HTMLDivElement>(null);

  // 将 ref 设置到 store 中，供 ActionPanel 使用
  useEffect(() => {
    setPreviewContentRef(contentRef.current);
  }, [setPreviewContentRef]);

  return (
    <div className="h-auto pb-0 flex flex-col items-center" style={{marginBottom:50}}>
      {/* 外层容器 - 占满可用空间 */}
      <div className="relative pb-0 mb-0 flex flex-col w-full">
        {/* 内容区域 - 可调整宽度，居中显示 */}
        <div className="flex-1 mb-0 overflow-y-auto overflow-x-hidden flex justify-center"
          style={{
            backgroundColor: previewBackgroundColor,
            transition: 'background-color 0.3s ease-in-out',
            padding: previewPadding,
          }}
        >
          <div
            style={{
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
                boxSizing: "content-box",
              }}
            >
              {/* 动态边框 - 完全在容器内，不触发滚动 */}
              {previewBorderColor !== 'transparent' && (
                <svg
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    overflow: 'hidden',
                  }}
                >
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    fill="none"
                    stroke={previewBorderColor}
                    strokeWidth="2"
                    strokeDasharray="8 4"
                    style={{
                      animation: 'border-dash-flow 120s linear infinite',
                      transition: 'stroke 0.3s ease-in-out',
                    }}
                  />
                </svg>
              )}
              <div ref={contentRef}>
                <Outlet />
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
