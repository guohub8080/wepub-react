import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// SVG转换配置接口
export interface SvgConverterSettings {
  // 组件配置
  componentName: string;
  widthHeightHandling: 'preserve' | 'remove' | '100percent';

  // 高级选项
  importStatement: string;
  flattenStyles: boolean; // 展平style标签内的CSS到行内
  convertStyleToObject: boolean; // 将style属性转为object格式
  removeIds: boolean; // 去除所有id属性

  // 转换选项
  prettier: boolean;
  functionType: 'arrow-implicit' | 'arrow-explicit' | 'function'; // 函数形式

  exportType: 'default' | 'named' | 'both';
}

// 转换器状态接口
export interface ConverterState {
  // 输入输出状态
  svgInput: string;
  reactOutput: string;

  // 转换状态
  converting: boolean;

  // 控制台日志
  consoleLogs: string[];
}

// 默认配置
const defaultSettings: SvgConverterSettings = {
  componentName: 'SvgComponent',
  widthHeightHandling: 'preserve',
  importStatement: "import React from 'react';",
  flattenStyles: false,
  convertStyleToObject: false,
  removeIds: false,
  prettier: true,
  functionType: 'arrow-implicit',
  exportType: 'default',
};

// 默认状态
const defaultState: ConverterState = {
  svgInput: '',
  reactOutput: '',
  converting: false,
  consoleLogs: [],
};

// 合并的 Zustand store
interface ConverterStore {
  // 设置
  settings: SvgConverterSettings;
  updateSettings: (newSettings: Partial<SvgConverterSettings>) => void;
  resetSettings: () => void;

  // 状态
  state: ConverterState;
  setSvgInput: (input: string) => void;
  setReactOutput: (output: string) => void;
  setConverting: (converting: boolean) => void;
  addConsoleLog: (log: string) => void;
  clearConsoleLogs: () => void;
  resetState: () => void;
}

export const useConverterStore = create<ConverterStore>()(
  persist(
    (set) => ({
      // 设置相关
      settings: defaultSettings,

      updateSettings: (newSettings) => {
        set((store) => ({
          settings: { ...store.settings, ...newSettings },
        }));
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
      },

      // 状态相关
      state: defaultState,

      setSvgInput: (input: string) => {
        set((store) => ({
          state: { ...store.state, svgInput: input }
        }));
      },

      setReactOutput: (output: string) => {
        set((store) => ({
          state: { ...store.state, reactOutput: output }
        }));
      },

      setConverting: (converting: boolean) => {
        set((store) => ({
          state: { ...store.state, converting }
        }));
      },

      addConsoleLog: (log: string) => {
        set((store) => ({
          state: {
            ...store.state,
            consoleLogs: [...store.state.consoleLogs, log]
          }
        }));
      },

      clearConsoleLogs: () => {
        set((store) => ({
          state: {
            ...store.state,
            consoleLogs: []
          }
        }));
      },

      resetState: () => {
        set({ state: defaultState });
      },
    }),
    {
      name: 'svg-converter-store',
      // 持久化：settings 全部保存，state 只保存 reactOutput 和 consoleLogs
      partialize: (store) => ({
        settings: store.settings,
        state: {
          reactOutput: store.state.reactOutput,
          consoleLogs: store.state.consoleLogs,
        }
      }),
      // 恢复时重置非持久化字段
      onRehydrateStorage: () => (store) => {
        if (store) {
          store.state.converting = false;
          store.state.svgInput = '';
        }
      }
    }
  )
);
