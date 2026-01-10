import { create } from 'zustand';

// 阴影类型
export type ShadowType = 'box-shadow' | 'filter';

// 输出格式
export type OutputFormat = 'css' | 'react';

// 阴影配置
export interface ShadowConfig {
  type: ShadowType;
  offsetX: number;
  offsetY: number;
  blur: number;
  spread: number; // 仅 box-shadow 使用
  color: string;
  inset: boolean; // 仅 box-shadow 使用
  outputFormat: OutputFormat;
}

interface ShadowStore {
  config: ShadowConfig;
  updateConfig: (updates: Partial<ShadowConfig>) => void;
  resetConfig: () => void;
}

const defaultConfig: ShadowConfig = {
  type: 'box-shadow',
  offsetX: 0,
  offsetY: 4,
  blur: 8,
  spread: 0,
  color: 'rgba(0, 0, 0, 0.25)',
  inset: false,
  outputFormat: 'css'
};

export const useShadowStore = create<ShadowStore>()((set) => ({
  config: defaultConfig,
  updateConfig: (updates) =>
    set((state) => ({
      config: { ...state.config, ...updates }
    })),
  resetConfig: () => set({ config: defaultConfig })
}));
