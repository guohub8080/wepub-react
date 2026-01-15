import React, { useState, useEffect } from 'react';
import SideList from './components/SideList';
import PreviewArea from './components/PreviewArea';
import ActionPanel from './components/ActionPanel';
import { Sheet, SheetContent, SheetTitle } from '@shadcn/components/ui/sheet.tsx';
import { usePubEditorStore, PUB_EDITOR_LAYOUT } from './store/usePubEditorStore';
import useGlobalSettings from '@dev/store/useGlobalSettings';
import { Card } from '@shadcn/components/ui/card.tsx';
import { idConflicts } from '@articles/data/articlesLoader';

/**
 * PubEditor 主布局组件
 * 三栏布局：左侧文章列表 + 中间预览区 + 右侧操作功能
 *
 * 布局说明：
 * - 宽屏模式：三栏作为整体居中，左右侧边栏在预览区两侧，各有20px间距
 * - 左栏 (SideList): 文章列表，sticky 定位，固定宽度 280px
 * - 中栏 (PreviewArea): 文章预览，正常流，最大宽度 800px
 * - 右栏 (ActionPanel): 操作功能，sticky 定位，固定宽度 320px
 *
 * 响应式逻辑：
 * - Desktop (≥1280px): 三栏都显示，整体居中
 * - Medium (1024px-1279px): 中栏+右栏显示，左侧通过抽屉打开
 * - Tablet & Mobile (<1024px): 只显示中栏，左右侧边栏都通过抽屉打开
 */
export default function PubEditor() {
  // 获取导航栏高度
  const { navigationHeight } = useGlobalSettings();

  // 检测是否应该使用抽屉模式
  // <1280px 左侧使用抽屉，<1024px 左右都使用抽屉
  const [shouldUseLeftDrawer, setShouldUseLeftDrawer] = useState(false);
  const [shouldUseRightDrawer, setShouldUseRightDrawer] = useState(false);

  // 中栏容器引用，用于计算可用宽度
  const mainContainerRef = React.useRef<HTMLDivElement>(null);

  // PC 端和移动端状态管理
  const {
    showSideList,
    showActionPanel,
    setSideList,
    setActionPanel,
    mobileShowSideList,
    mobileShowActionPanel,
    setMobileSideList,
    setMobileActionPanel,
    setPreviewMaxAvailableWidth,
    setPreviewWidth,
    previewWidth,
    previewMaxWidth
  } = usePubEditorStore();

  // 监听窗口大小变化并自动调整侧边栏显示 + 计算预览区最大可用宽度
  useEffect(() => {
    let lastBreakpoint: 'narrow' | 'medium' | 'wide' | null = null;

    const handleResize = () => {
      const width = window.innerWidth;

      // 检测是否应该使用抽屉模式
      setShouldUseLeftDrawer(width < 1280);
      setShouldUseRightDrawer(width < 1024);

      // 确定当前断点
      let currentBreakpoint: 'narrow' | 'medium' | 'wide';
      if (width >= 1280) {
        currentBreakpoint = 'wide';
      } else if (width >= 1024) {
        currentBreakpoint = 'medium';
      } else {
        currentBreakpoint = 'narrow';
      }

      // 只在断点变化时自动调整侧边栏，避免覆盖用户的手动操作
      if (lastBreakpoint !== currentBreakpoint) {
        if (currentBreakpoint === 'wide') {
          // 宽屏（≥1280px）：三栏都显示
          setSideList(true);
          setActionPanel(true);
        } else if (currentBreakpoint === 'medium') {
          // 中屏（1024px-1279px）：中栏+右栏，左侧抽屉
          setSideList(false);
          setActionPanel(true);
        } else {
          // 窄屏（<1024px）：只显示中栏，左右都抽屉
          setSideList(false);
          setActionPanel(false);
        }
        lastBreakpoint = currentBreakpoint;
      }

      // 计算中栏实际可用宽度
      if (mainContainerRef.current) {
        const containerWidth = mainContainerRef.current.offsetWidth;
        // 不减去任何间距，确保内容与容器无缝贴合
        const availableWidth = containerWidth;
        // 取最小值：配置的最大宽度 vs 实际可用宽度
        const maxAllowedWidth = Math.min(PUB_EDITOR_LAYOUT.PREVIEW_MAX_WIDTH, availableWidth);
        setPreviewMaxAvailableWidth(maxAllowedWidth);

        // 如果当前宽度超过新的最大宽度，自动调整
        if (previewWidth > maxAllowedWidth) {
          setPreviewWidth(maxAllowedWidth);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 使用 ResizeObserver 监听容器大小变化
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });

    if (mainContainerRef.current) {
      resizeObserver.observe(mainContainerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [setSideList, setActionPanel, setPreviewMaxAvailableWidth, setPreviewWidth, previewWidth]);

  // 计算实际显示的栏数和布局方式
  const showLeftColumn = showSideList && !shouldUseLeftDrawer;
  const showRightColumn = showActionPanel && !shouldUseRightDrawer;
  const visibleColumns = [showLeftColumn, true, showRightColumn].filter(Boolean).length;

  return (
    <div
      className="w-full relative flex justify-center"
      style={{ minHeight: `calc(100vh - ${navigationHeight}px)` }}
    >
      {/* 左侧抽屉 - 小于1280px时使用 */}
      <Sheet open={mobileShowSideList} onOpenChange={setMobileSideList}>
        <SheetContent side="left" className="p-0" hideClose={true} style={{ width: `${PUB_EDITOR_LAYOUT.SIDE_LIST_WIDTH}px` }}>
          <SheetTitle className="sr-only">文章列表</SheetTitle>
          <SideList />
        </SheetContent>
      </Sheet>

      {/* 右侧抽屉 - 小于1024px时使用 */}
      <Sheet open={mobileShowActionPanel} onOpenChange={setMobileActionPanel}>
        <SheetContent side="right" className="p-0" hideClose={true} style={{ width: `${PUB_EDITOR_LAYOUT.ACTION_PANEL_WIDTH}px` }}>
          <SheetTitle className="sr-only">预览选项</SheetTitle>
          <ActionPanel />
        </SheetContent>
      </Sheet>

      {/* 三栏容器 - 根据显示栏数动态居中 */}
      <div
        className="flex w-full relative"
        style={{
          maxWidth: visibleColumns === 3 ? '1440px' :
            visibleColumns === 2 ? '1200px' :
              '800px',
          justifyContent: 'center',
          gap: '20px',
        }}
      >
        {/* 左栏：文章列表 - sticky 定位 */}
        {showLeftColumn && (
          <aside
            className="flex-shrink-0 pt-2 pb-2 sticky"
            style={{
              width: `${PUB_EDITOR_LAYOUT.SIDE_LIST_WIDTH}px`,
              height: `calc(100vh - ${navigationHeight}px)`,
              top: `${navigationHeight}px`,
            }}
          >
            <SideList />
          </aside>
        )}

        {/* 中栏：预览区 - 正常流 */}
        <main
          ref={mainContainerRef}
          className="flex-1"
          style={{
            maxWidth: `${previewMaxWidth}px`,
            minWidth: 0,
          }}
        >
          <PreviewArea />
        </main>

        {/* 右栏：操作功能 - sticky 定位 */}
        {showRightColumn && (
          <aside
            className="flex-shrink-0 sticky pt-2 pr-5 overflow-y-auto"
            style={{
              width: `${PUB_EDITOR_LAYOUT.ACTION_PANEL_WIDTH}px`,
              height: `calc(100vh - ${navigationHeight}px)`,
              top: `${navigationHeight}px`,
            }}
          >
            {/* 文章ID冲突警告 - 在卡片外面 */}
            {idConflicts.length > 0 && (
              <div className="mb-4 rounded-lg border-2 border-red-500 bg-red-50 p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.932-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.932 3z" />
                  </svg>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-red-800 mb-1">文章时间冲突</h4>
                    <p className="text-xs text-red-700">以下文章使用了相同的发布时间，导致ID冲突：</p>
                  </div>
                </div>
                {idConflicts.map((conflict, idx) => (
                  <div key={idx} className="bg-white rounded-md p-3 border border-red-200">
                    <div className="text-xs font-mono text-red-600 mb-2">时间ID: {conflict.id}</div>
                    <ul className="space-y-1">
                      {conflict.articles.map((article, articleIdx) => (
                        <li key={articleIdx} className="text-xs text-red-700">
                          • {article.title} <span className="text-red-400 ml-1">({article.path})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            <Card className="bg-card rounded-lg pt-0">
              <ActionPanel />
            </Card>
          </aside>
        )}
      </div>
    </div>
  );
}

