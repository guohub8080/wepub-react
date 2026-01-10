/**
 * 从MDX组件中提取第一个一级标题作为文档标题
 * MDX组件会被编译成React组件，我们需要从props中提取标题
 */

import { findFirstH1 } from './findFirstH1.ts';

/**
 * 从MDX组件中提取第一个一级标题作为文档标题
 * 支持从MDX文件的导出变量中读取title
 *
 * MDX文件可以这样定义标题：
 * export const title = "我的标题"
 *
 * 或使用frontmatter：
 * ---
 * title: "我的标题"
 * ---
 */
export function extractTitleFromMDX(mdxComponent: any): string {
  try {
    // 1. 优先检查 MDX 组件的 title 属性（从 export const title 导出）
    if (mdxComponent.title) {
      return mdxComponent.title;
    }

    // 2. 检查 frontmatter 的 title
    if (mdxComponent.frontmatter?.title) {
      return mdxComponent.frontmatter.title;
    }

    // 3. 检查 __mdxMetadata
    if (mdxComponent.__mdxMetadata?.title) {
      return mdxComponent.__mdxMetadata.title;
    }

    // 4. 尝试从 displayName 或 name 中提取
    if (mdxComponent.displayName && mdxComponent.displayName !== 'MDXContent') {
      return mdxComponent.displayName;
    }

    // 5. 如果有 children，尝试从第一个 h1 元素提取标题
    if (mdxComponent.children) {
      const firstH1 = findFirstH1(mdxComponent.children);
      if (firstH1) {
        return firstH1;
      }
    }

    // 如果都没有，返回默认标题
    return '未命名文档';
  } catch (error) {
    console.warn('提取MDX标题失败:', error);
    return '未命名文档';
  }
}
