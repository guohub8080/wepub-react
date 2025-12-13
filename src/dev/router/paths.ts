/**
 * 路由路径常量定义
 * 用于统一管理所有静态路由路径，避免硬编码
 */
const routerPaths = {
  // 首页
  home: "home",

  // 设置页面
  settings: "settings",

  // SVG 文档
  svgDocument: "svg-document",

  // 前端相关
  pubeditor: "pubeditor",
  color: "color",

  // 外部链接
  github: "https://github.com/guohub8080/wepub-react",
} as const;

export default routerPaths;

// 导出类型定义，方便TypeScript使用
export type RouterPath = typeof routerPaths[keyof typeof routerPaths];