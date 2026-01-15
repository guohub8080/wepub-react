import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * PubEditor 布局常量
 */
export const PUB_EDITOR_LAYOUT = {
  SIDE_LIST_WIDTH: 280,      // 左侧文章列表宽度
  ACTION_PANEL_WIDTH: 320,   // 右侧操作面板宽度
  PREVIEW_MAX_WIDTH: 650,    // 预览区最大宽度
  PREVIEW_MIN_WIDTH: 150,    // 预览区最小宽度
  PREVIEW_DEFAULT_PADDING: 30, // 预览区默认内边距
} as const;

/**
 * PubEditor 状态管理
 * 管理侧边栏的显示/隐藏状态（包括移动端抽屉）
 */

interface PubEditorState {
  // 左侧文章列表是否显示（PC端）
  showSideList: boolean;
  // 右侧操作面板是否显示（PC端）
  showActionPanel: boolean;
  // 移动端左侧抽屉是否显示
  mobileShowSideList: boolean;
  // 移动端右侧抽屉是否显示
  mobileShowActionPanel: boolean;
  // 全屏文章菜单是否显示
  showFullscreenMenu: boolean;
  // 预览区域宽度
  previewWidth: number;
  // 预览区域最大可用宽度（根据容器动态计算）
  previewMaxAvailableWidth: number;
  // 预览区域最大宽度
  previewMaxWidth: number;
  // 预览区域内边距
  previewPadding: number;
  // 是否显示预览区边框
  showPreviewBorder: boolean;
  // 预览区边框颜色
  previewBorderColor: string;
  // 预览区背景颜色（hex格式，支持透明度）
  previewBackgroundColor: string;
  // 预览区内容 DOM 引用
  previewContentRef: React.MutableRefObject<HTMLDivElement | null>;

  // 切换左侧列表
  toggleSideList: () => void;
  // 切换右侧面板
  toggleActionPanel: () => void;
  // 设置左侧列表
  setSideList: (show: boolean) => void;
  // 设置右侧面板
  setActionPanel: (show: boolean) => void;
  // 设置移动端左侧抽屉
  setMobileSideList: (show: boolean) => void;
  // 设置移动端右侧抽屉
  setMobileActionPanel: (show: boolean) => void;
  // 设置全屏文章菜单
  setFullscreenMenu: (show: boolean) => void;
  // 设置预览区域宽度
  setPreviewWidth: (width: number) => void;
  // 设置预览区域最大可用宽度
  setPreviewMaxAvailableWidth: (width: number) => void;
  // 设置预览区域最大宽度
  setPreviewMaxWidth: (width: number) => void;
  // 设置预览区域内边距
  setPreviewPadding: (padding: number) => void;
  // 切换预览区边框显示
  toggleShowPreviewBorder: () => void;
  // 设置预览区边框颜色
  setPreviewBorderColor: (color: string) => void;
  // 设置预览区背景颜色
  setPreviewBackgroundColor: (color: string) => void;
  // 设置预览区内容 DOM 引用
  setPreviewContentRef: (ref: HTMLDivElement | null) => void;
}

export const usePubEditorStore = create<PubEditorState>()(
  persist(
    (set, get) => ({
      // 默认状态：PC端都显示，移动端抽屉关闭，预览区默认800px，内边距30px，不显示边框，边框透明，背景白色
      showSideList: true,
      showActionPanel: true,
      mobileShowSideList: false,
      mobileShowActionPanel: false,
      showFullscreenMenu: false,
      previewWidth: PUB_EDITOR_LAYOUT.PREVIEW_MAX_WIDTH,
      previewMaxAvailableWidth: PUB_EDITOR_LAYOUT.PREVIEW_MAX_WIDTH,
      previewMaxWidth: PUB_EDITOR_LAYOUT.PREVIEW_MAX_WIDTH,
      previewPadding: PUB_EDITOR_LAYOUT.PREVIEW_DEFAULT_PADDING,
      showPreviewBorder: false,
      previewBorderColor: 'transparent',
      previewBackgroundColor: '#ffffff',
      previewContentRef: { current: null },

      // 切换方法
      toggleSideList: () => set((state) => ({ showSideList: !state.showSideList })),
      toggleActionPanel: () => set((state) => ({ showActionPanel: !state.showActionPanel })),
      toggleShowPreviewBorder: () => set((state) => ({ showPreviewBorder: !state.showPreviewBorder })),

      // 设置方法
      setSideList: (show: boolean) => set({ showSideList: show }),
      setActionPanel: (show: boolean) => set({ showActionPanel: show }),
      setMobileSideList: (show: boolean) => set({ mobileShowSideList: show }),
      setMobileActionPanel: (show: boolean) => set({ mobileShowActionPanel: show }),
      setFullscreenMenu: (show: boolean) => set({ showFullscreenMenu: show }),
      setPreviewWidth: (width: number) => set({ previewWidth: width }),
      setPreviewMaxAvailableWidth: (width: number) => set({ previewMaxAvailableWidth: width }),
      setPreviewMaxWidth: (width: number) => set({ previewMaxWidth: width }),
      setPreviewPadding: (padding: number) => set({ previewPadding: padding }),
      setPreviewBorderColor: (color: string) => set({ previewBorderColor: color }),
      setPreviewBackgroundColor: (color: string) => set({ previewBackgroundColor: color }),
      setPreviewContentRef: (ref: HTMLDivElement | null) => set({ previewContentRef: { current: ref } }),
    }),
    {
      name: 'pub-editor-storage', // localStorage 键名
      // 持久化侧边栏状态、预览区宽度、内边距、边框显示、边框颜色和背景颜色（不包括 ref）
      partialize: (state) => ({
        showSideList: state.showSideList,
        showActionPanel: state.showActionPanel,
        previewWidth: state.previewWidth,
        previewMaxWidth: state.previewMaxWidth,
        previewPadding: state.previewPadding,
        showPreviewBorder: state.showPreviewBorder,
        previewBorderColor: state.previewBorderColor,
        previewBackgroundColor: state.previewBackgroundColor,
        // 不持久化 previewContentRef
      }),
    }
  )
);
