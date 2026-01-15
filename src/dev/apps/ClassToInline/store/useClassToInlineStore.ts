import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ClassToInline 状态接口
interface ClassToInlineState {
  // 输入内容
  htmlInput: string;
  cssInput: string;
  resultOutput: string;

  // Setter
  setHtmlInput: (value: string) => void;
  setCssInput: (value: string) => void;
  setResultOutput: (value: string) => void;
}

export const useClassToInlineStore = create<ClassToInlineState>()(
  persist(
    (set) => ({
      // 输入内容
      htmlInput: '',
      cssInput: '',
      resultOutput: '',

      // Setter
      setHtmlInput: (value) => set({ htmlInput: value }),
      setCssInput: (value) => set({ cssInput: value }),
      setResultOutput: (value) => set({ resultOutput: value }),
    }),
    {
      name: 'class-to-inline-store',
      // 只持久化输入内容，不持久化输出结果
      partialize: (store) => ({
        htmlInput: store.htmlInput,
        cssInput: store.cssInput,
      }),
    }
  )
);
