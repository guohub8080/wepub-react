import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import { useNavigate, useLocation } from "react-router-dom"
import { useWindowScroll } from "@uidotdev/usehooks"
import { BookText, BookOpen, PanelLeftOpen, PanelLeftClose, PanelRightOpen, PanelRightClose } from "lucide-react"
import { isUndefined } from "lodash"
import logoUrl from "@dev/assets/svgs/logoSvg/favicon.svg"
import useGlobalSettings from "@dev/store/useGlobalSettings"
import { usePubEditorStore, PUB_EDITOR_LAYOUT } from "@apps/PubEditor/store/usePubEditorStore"
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/components/ui/popover.tsx"
import NavigationPanel from "./NavigationPanel.tsx"
import { cn } from "@shadcn/lib/utils.ts"
import { allCards } from "@apps/Home/cardsConfig.tsx"

export default function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  const { navigationHeight, isBookTocShow, toggleBookTocShow, isBookPage } = useGlobalSettings()

  // Logo颜色状态
  const [logoColors, setLogoColors] = useState({
    mainColor: 'rgb(48, 48, 48)',    // 亮色模式下的主色
    accentColor: 'rgb(62, 125, 193)' // 亮色模式下的强调色（R的颜色）
  })

  // 监听主题变化，更新Logo颜色
  useEffect(() => {
    const updateLogoColors = () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark' ||
                     document.documentElement.classList.contains('dark')

      if (isDark) {
        setLogoColors({
          mainColor: 'rgb(248, 248, 248)',      // 暗色模式下白色
          accentColor: 'rgb(147, 197, 253)'     // 暗色模式下亮蓝色
        })
      } else {
        setLogoColors({
          mainColor: 'rgb(48, 48, 48)',         // 亮色模式下深灰色
          accentColor: 'rgb(62, 125, 193)'      // 亮色模式下蓝色
        })
      }
    }

    // 初始设置
    updateLogoColors()

    // 监听主题变化
    const observer = new MutationObserver(() => {
      updateLogoColors()
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class']
    })

    return () => observer.disconnect()
  }, [])
  const [{ y: scrollY }] = useWindowScroll()
  
  // 计算icon大小（导航栏高度的45%）
  const iconSize = navigationHeight * 0.45
  
  // 根据滚动位置判断是否显示模糊效果
  const isScrolled = scrollY > 0
  
  // 动态判断当前页面是否是 book 类型 - 基于全局书籍状态
  // 不需要额外判断，直接使用全局状态

  // 判断是否是 home 页面
  const isHomePage = location.pathname === '/home' || location.pathname === '/home/' || location.pathname === '/'

  // 判断是否是 pub 页面
  const isPubPage = location.pathname.startsWith('/pub')

  // Pub 编辑器状态
  const { showSideList, showActionPanel, toggleSideList, toggleActionPanel, setMobileSideList, setMobileActionPanel } = usePubEditorStore()

  // 检测是否应该使用抽屉模式
  // <1280px 左侧使用抽屉，<1024px 右侧使用抽屉
  const [shouldUseLeftDrawer, setShouldUseLeftDrawer] = useState(false)
  const [shouldUseRightDrawer, setShouldUseRightDrawer] = useState(false)
  useEffect(() => {
    const checkDrawerMode = () => {
      const width = window.innerWidth
      setShouldUseLeftDrawer(width < 1280)
      setShouldUseRightDrawer(width < 1024)
    }
    checkDrawerMode()
    window.addEventListener('resize', checkDrawerMode)
    return () => window.removeEventListener('resize', checkDrawerMode)
  }, [])
  
  // 获取当前页面 title - 从 Home 卡片配置中匹配
  const [pageTitle, setPageTitle] = useState<string>('')
  
  useEffect(() => {
    if (isHomePage) {
      setPageTitle('')
      return
    }
    
    // 从 Home 卡片配置中匹配当前路径
    const currentPath = location.pathname.replace(/^#/, '').replace(/\/$/, '') || '/'
    
    // 查找匹配的卡片
    const matchedCard = allCards.find(card => {
      // 处理卡片 href
      let cardPath = card.href
      // 移除开头的 # 和 /
      cardPath = cardPath.replace(/^#?\/?/, '/')
      // 确保以 / 开头
      if (!cardPath.startsWith('/')) {
        cardPath = '/' + cardPath
      }
      // 移除末尾的 /
      cardPath = cardPath.replace(/\/$/, '') || '/'
      
      // 精确匹配或路径匹配
      return cardPath === currentPath || currentPath.startsWith(cardPath + '/')
    })
    
    if (matchedCard) {
      setPageTitle(matchedCard.title)
    } else {
      // 如果找不到匹配的卡片，从路径推断
      const pathParts = location.pathname.split('/').filter(Boolean)
      if (pathParts.length > 0) {
        const lastPart = pathParts[pathParts.length - 1]
        const inferredTitle = lastPart
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
        setPageTitle(inferredTitle)
      } else {
        setPageTitle('')
      }
    }
  }, [location.pathname, isHomePage])

  // 从 global store 获取导航面板状态
  const { isNavigationPanelOpen, setIsNavigationPanelOpen } = useGlobalSettings()

  // 处理 hover 打开（仅桌面端，通过 CSS 媒体查询控制）
  const handleMouseEnter = () => {
    setIsNavigationPanelOpen(true)
  }

  // 所有尺寸都使用 fixed 定位（通过宽度判断调整参数）
  useEffect(() => {
    if (!isNavigationPanelOpen) return
    
    let lastBreakpoint: 'mobile' | 'tablet' | 'desktop' | null = null
    
    const setPosition = (force = false) => {
      const width = window.innerWidth
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const currentBreakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
      
      // 只在断点变化时才更新样式，避免频繁设置导致抖动（除非强制）
      if (!force && lastBreakpoint === currentBreakpoint) return
      lastBreakpoint = currentBreakpoint
      
      const panelWidth = isTablet ? 600 : 800
      
      // 查找 Popover 的 wrapper 和 content
      const wrapper = document.querySelector('[data-radix-popper-content-wrapper]')
      const content = document.querySelector('[data-radix-popper-content-wrapper] > div')
      
      if (!wrapper || !content) {
        // 如果还没渲染，延迟重试
        if (force) {
          setTimeout(() => setPosition(true), 10)
        }
        return
      }
      
      const wrapperEl = wrapper as HTMLElement
      const contentEl = content as HTMLElement
      
      // 统一设置基础样式
      wrapperEl.style.position = 'fixed'
      wrapperEl.style.transform = 'none'
      wrapperEl.style.margin = '0'
      
      if (isMobile) {
        // 移动端：全屏 fixed 定位
        // wrapper 作为滚动容器，固定高度
        wrapperEl.style.left = '0'
        wrapperEl.style.right = '0'
        wrapperEl.style.top = `${navigationHeight}px`
        wrapperEl.style.bottom = '0'
        wrapperEl.style.width = '100vw'
        wrapperEl.style.maxWidth = '100vw'
        wrapperEl.style.height = `calc(100vh - ${navigationHeight}px)`
        wrapperEl.style.overflowY = 'auto'
        wrapperEl.style.overflowX = 'hidden'
        wrapperEl.style.display = 'block'
        wrapperEl.style.justifyContent = ''
        wrapperEl.style.alignItems = ''
        
        // content 作为内容，使用 relative 定位，让 wrapper 可以滚动
        contentEl.style.position = 'relative'
        contentEl.style.transform = 'none'
        contentEl.style.scale = '1'
        contentEl.style.width = '100vw'
        contentEl.style.maxWidth = '100vw'
        contentEl.style.height = 'auto'
        contentEl.style.overflowY = 'visible'
        contentEl.style.overflowX = 'hidden'
        contentEl.style.left = '0'
        contentEl.style.right = '0'
        contentEl.style.top = '0'
        contentEl.style.bottom = 'auto'
        contentEl.style.marginTop = '0'
        contentEl.style.marginBottom = '0'
      } else {
        // 平板和宽屏：content 使用 fixed 定位
        contentEl.style.position = 'fixed'
        contentEl.style.transform = 'none'
        contentEl.style.scale = '1'
        // 平板和宽屏：同一套逻辑 - 半透明背景框 + flex 居中内容
        // wrapper 作为半透明背景框，垂直贴顶对齐
        wrapperEl.style.left = '0'
        wrapperEl.style.right = '0'
        wrapperEl.style.top = `${navigationHeight}px`
        wrapperEl.style.bottom = '0'
        wrapperEl.style.width = '100%'
        wrapperEl.style.height = `calc(100vh - ${navigationHeight}px)`
        wrapperEl.style.display = 'flex'
        wrapperEl.style.justifyContent = 'center'
        wrapperEl.style.alignItems = 'flex-start'
        wrapperEl.style.overflowY = 'auto'
        
        // content 作为实际内容，设置固定宽度，flex 自动居中，使用 margin-top 实现间距
        contentEl.style.width = `${panelWidth}px`
        contentEl.style.maxWidth = `${panelWidth}px`
        contentEl.style.height = 'auto'
        contentEl.style.minHeight = '0'
        contentEl.style.marginTop = '12px'
        contentEl.style.marginBottom = '12px'
        contentEl.style.position = 'relative'
        contentEl.style.left = '0'
        contentEl.style.right = '0'
        contentEl.style.top = '0'
        contentEl.style.bottom = 'auto'
      }
    }
    
    // 初始执行 - 使用 requestAnimationFrame 确保在渲染后执行
    const initPosition = () => {
      requestAnimationFrame(() => {
        setPosition(true) // 强制执行第一次
        // 如果还没找到，再试一次
        requestAnimationFrame(() => {
          setPosition(true)
        })
      })
    }
    const timeout = setTimeout(initPosition, 0)
    
    // 只在断点变化时更新，不监听所有 resize
    const handleResize = () => {
      const width = window.innerWidth
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const currentBreakpoint = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop'
      
      if (lastBreakpoint !== currentBreakpoint) {
        setPosition(true)
      }
    }
    window.addEventListener('resize', handleResize, { passive: true })
    
    // 监听 DOM 变化（只在 Popover 首次渲染时）
    const observer = new MutationObserver(() => {
      if (lastBreakpoint === null) {
        setPosition(true)
      }
    })
    if (!isUndefined(document.body)) {
      observer.observe(document.body, { childList: true, subtree: true })
    }
    
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', handleResize)
      observer.disconnect()
    }
  }, [isNavigationPanelOpen, navigationHeight])

  return (
    <header
      className={`sticky top-0 z-50 flex w-full flex-shrink-0 items-center justify-center transition-all duration-300 relative ${
        isScrolled
          ? 'border-b border-border/30 backdrop-blur-[8px] bg-background/60 shadow-sm'
          : 'border-b border-transparent backdrop-blur-none bg-transparent shadow-none'
      }`}
      style={{ height: `${navigationHeight}px` }}
    >
      <div className="mx-auto flex h-full w-full max-w-[1400px] items-center min-[1800px]:max-w-[1536px]">
        <div className="flex w-full items-center px-4 max-lg:gap-4 sm:px-6 lg:px-8">
          {/* Logo 区域 */}
          <div className="flex-shrink-0">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/home/'); }}>
              <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300 cursor-pointer">
                <img
                  src={logoUrl}
                  alt="Logo"
                  className="drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.5)] transition-all duration-300"
                  style={{
                    width: `${iconSize}px`,
                    height: `${iconSize}px`
                  }}
                />
                <div className="h-5 w-auto -ml-2.5 transition-all duration-300 max-[550px]:hidden">
                <svg viewBox="0 0 175 34.2" className="h-full w-auto object-contain">
                  <style>{`
                    .logo-main { fill: ${logoColors.mainColor}; }
                    .logo-accent { fill: ${logoColors.accentColor}; }
                  `}</style>
                  <g>
                    <path className="logo-main" d="M14.2,11.3c-.5,2.1-2.3,8-3,10.1l-3.1,9.7H.8L1.6,3.2h5.3l-.5,14.3c-.1,3.2-.3,5.4-.6,7.9h.3c.6-2.5,1.3-4.6,2.5-7.9L13.5,3.2h4.9l-.2,14.3c0,3.2-.2,5.8-.4,7.9h.3c.5-2.2,1.2-4.7,2.2-7.9l4.5-14.3h5.2l-9.4,27.9h-6.9l.2-9.9c0-2,.3-7.8.6-10h-.3Z"/>
                    <path className="logo-main" d="M40.9,22.7h-9.4c-.3,3.4.5,4.7,1.9,4.7s1.9-.9,2.6-2.6l3.8,1.6c-2.1,4.1-4.5,5.2-7.2,5.2-4.8,0-6.8-3.7-5.6-10.2,1.3-7.3,5-10.9,9.1-10.9s6.3,4.2,5.4,9.2l-.6,3.1ZM37.2,18.6c.5-2.8-.3-4.2-1.7-4.2s-2.4.9-3.3,4.2h5Z"/>
                    <path className="logo-main" d="M54.6,3.2c5.1,0,7.4,2.9,6.2,9.2s-5.3,9.9-10.2,9.9h-1.7l-1.6,8.8h-4.9l5.1-27.9h7.1ZM51.7,17.6c1.8,0,3.3-1.4,3.9-4.9s-.4-4.9-2.1-4.9h-2l-1.8,9.8h2Z"/>
                    <path className="logo-main" d="M77.7,10.7l-3.7,20.4h-4.4l.5-2.8h0c-1.3,2.1-3.1,3.1-5.1,3.1-2.8,0-4.6-2.2-3.8-6.9l2.5-13.8h4.7l-2.3,12.5c-.5,2.8,0,3.7,1.5,3.7s2.6-1.1,3.1-3.7l2.3-12.5h4.7Z"/>
                    <path className="logo-main" d="M84.8,13.8c1.4-2.2,3.2-3.4,5.2-3.4,4.1,0,5.7,3.8,4.5,10.6s-4.7,10.5-8.6,10.5-3.2-1.1-3.7-3.1h0c.1.8.2,1.2,0,2.5v.2h-4.6l5.2-28.6h4.7l-1.2,6.8c-.3,1.8-.9,3.5-1.4,4.5h0ZM89.6,21c.7-4,0-6.2-1.8-6.2s-3.1,2.2-3.9,6.2c-.7,4.1-.2,6.1,1.8,6.1s3.2-2.1,3.9-6.1Z"/>
                    <path className="logo-accent" d="M105.9,31.1l-1.4-10.2h-2.1l-1.9,10.2h-5l5.1-27.9h7.3c4.5,0,7.2,2.6,6.2,8.2s-2.5,6.3-4.8,7.5l2.4,12.2h-5.8ZM103.3,16.2h1.8c2,0,3.4-1.1,3.9-4.1s-.4-4.2-2.4-4.2h-1.8l-1.5,8.3Z"/>
                    <path className="logo-main" d="M128.2,22.7h-9.4c-.3,3.4.5,4.7,1.9,4.7s1.9-.9,2.6-2.6l3.8,1.6c-2.1,4.1-4.5,5.2-7.2,5.2-4.8,0-6.8-3.7-5.6-10.2s5-10.9,9.1-10.9,6.3,4.2,5.4,9.2l-.6,3.1ZM124.5,18.6c.5-2.8-.3-4.2-1.7-4.2s-2.4.9-3.3,4.2h5Z"/>
                    <path className="logo-main" d="M143.5,24.4c-.2,1.3,0,1.9.7,1.9s.3,0,.4,0l-.8,4.3c-1,.4-1.7.6-2.6.6-1.8,0-2.5-.8-2.6-2.3-1.3,1.8-2.9,2.7-4.9,2.7-3.3,0-4.9-2.3-4.2-6.1s3.8-6.5,8-6.5,1.4,0,2.2.3l.2-1.2c.4-2.5,0-3.6-1.3-3.6s-2.2,1-2.9,3.3l-3.9-1c1.5-4.1,4.3-6.3,7.8-6.3s5.9,2.7,5.1,7.3l-1.2,6.7ZM139,23.1c-.5-.2-1.2-.3-1.9-.3-1.4,0-2.5.9-2.8,2.4s.3,2.1,1.5,2.1,2.7-1.3,3.2-4.3Z"/>
                    <path className="logo-main" d="M160.3,25.3c-2.2,5-5.2,6.2-8.3,6.2-4.6,0-6.5-3.7-5.3-10.2,1.2-6.7,4.8-10.9,9.3-10.9s5.5,1.9,5.6,7l-4.6,1.4c.2-3-.5-4.3-1.7-4.3s-2.9,1.4-3.8,6.4-.1,6.5,1.5,6.5,2.2-.9,3.1-3.7l4.3,1.6Z"/>
                    <path className="logo-main" d="M168.3,24.3c-.4,2,.2,2.6,1.8,2.6s1.1-.1,1.4-.3l-.8,4.3c-.9.4-2.2.6-3.2.6-3,0-4.7-2-4-6.3l1.9-10.2h-2.3l.8-4.3h2.3l.5-2.7,5.2-3.4-1.1,6.1h3.4l-.8,4.3h-3.4l-1.7,9.2Z"/>
                  </g>
                </svg>
              </div>
              </div>
            </a>
          </div>

          {/* 中间区域 - 页面标题或空白 */}
          <div className="flex-1"></div>

          {/* 中间居中的页面标题按钮 - fixed定位在整个屏幕中心 */}
          {!isHomePage && pageTitle && (
            <div
              className="fixed left-1/2 flex items-center justify-center"
              style={{
                zIndex: 50,
                top: `${navigationHeight / 2}px`,
                transform: 'translateX(-50%) translateY(-50%)'
              }}
            >
              {/* 黑色半透明遮罩层 - 使用 Portal 确保在最顶层，但低于 navigation，移动端通过 CSS 隐藏 */}
              {isNavigationPanelOpen && !isUndefined(document) && createPortal(
                <div
                  className="fixed bg-black/50 backdrop-blur-sm hidden md:block"
                  onClick={() => setIsNavigationPanelOpen(false)}
                  style={{
                    // 从 navigation 下方开始，确保不覆盖 navigation
                    position: 'fixed',
                    top: `${navigationHeight}px`,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100vw',
                    height: `calc(100vh - ${navigationHeight}px)`,
                    // 确保遮罩层在 navigation 下方，但在其他内容之上
                    zIndex: 40,
                  }}
                />,
                document.body
              )}
              <Popover open={isNavigationPanelOpen} onOpenChange={setIsNavigationPanelOpen}>
                <PopoverTrigger asChild>
                  <div
                    role="button"
                    tabIndex={0}
                    className={cn(
                      "text-sm font-medium text-foreground hover:text-foreground transition-all duration-200",
                      "px-4 py-2 rounded-full hover:bg-accent",
                      "cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "relative z-[50] flex items-center justify-center gap-2",
                      // 面板打开时保持更明显的样式
                      isNavigationPanelOpen && "bg-accent text-foreground",
                      // 使用内阴影来模拟边框，不影响布局计算
                      "hover:shadow-[inset_0_0_0_1.5px_rgb(148_163_184/0.3)]",
                      isNavigationPanelOpen && "shadow-[inset_0_0_0_1.5px_rgb(148_163_184/0.3)]"
                    )}
                    onMouseEnter={handleMouseEnter}
                    onClick={() => {
                      // 移动端点击切换（通过 CSS 媒体查询控制）
                      setIsNavigationPanelOpen(!isNavigationPanelOpen)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setIsNavigationPanelOpen(!isNavigationPanelOpen)
                      }
                    }}
                  >
                    {(() => {
                      const matchedCard = allCards.find(card => {
                        let cardPath = card.href.replace(/^#?\/?/, '/');
                        if (!cardPath.startsWith('/')) {
                          cardPath = '/' + cardPath;
                        }
                        cardPath = cardPath.replace(/\/$/, '') || '/';
                        const currentPath = location.pathname.replace(/^#/, '').replace(/\/$/, '') || '/';
                        return cardPath === currentPath || currentPath.startsWith(cardPath + '/');
                      });
                      if (matchedCard?.icon) {
                        return (
                          <div className="w-4 h-4 flex items-center justify-center" style={{ color: matchedCard.color }}>
                            {matchedCard.icon}
                          </div>
                        );
                      }
                      return null;
                    })()}
                    <div className="h-5 flex items-center justify-center">{pageTitle}</div>
                  </div>
                </PopoverTrigger>
                <PopoverContent
                  className={cn(
                    "p-0 border-border/50 shadow-lg z-[50] bg-background/95 backdrop-blur-sm overflow-hidden",
                    // 桌面端和平板样式
                    "w-auto max-w-[90vw]",
                    "data-[state=open]:animate-in data-[state=closed]:animate-out",
                    "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
                    "data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2",
                    // 移动端：全屏样式，强制固定定位
                    "max-md:rounded-none max-md:border-x-0 max-md:border-t max-md:border-b-0",
                    "max-md:!fixed max-md:!left-0 max-md:!right-0 max-md:!top-0 max-md:!bottom-0",
                    "max-md:!w-screen max-md:!max-w-screen max-md:!h-screen",
                    "max-md:!transform-none max-md:!translate-x-0 max-md:!translate-y-0",
                    "max-md:[&[data-state=open]]:!scale-100 max-md:[&[data-state=closed]]:!scale-100"
                  )}
                  data-navigation-height={navigationHeight}
                  align="center"
                  side="bottom"
                  sideOffset={12}
                  avoidCollisions={true}
                  onOpenAutoFocus={(e) => e.preventDefault()}
                >
                  <NavigationPanel onNavigate={() => {
                    // 导航后关闭 popover
                    setIsNavigationPanelOpen(false)
                  }} />
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* 右侧操作区 */}
          <div className="flex items-center gap-2 lg:gap-4">
            {/* Pub 页面侧边栏控制按钮 */}
            {isPubPage && (
              <>
                {/* 左侧文章列表切换 */}
                <button
                  onClick={() => {
                    if (shouldUseLeftDrawer) {
                      // 小于1280px：打开抽屉
                      setMobileSideList(true)
                    } else {
                      // 宽屏：切换内联侧边栏
                      toggleSideList()
                    }
                  }}
                  className="size-6 flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-300"
                  title={showSideList && !shouldUseLeftDrawer ? "隐藏文章列表" : "显示文章列表"}
                >
                  {showSideList && !shouldUseLeftDrawer ? (
                    <PanelLeftClose className="size-5" />
                  ) : (
                    <PanelLeftOpen className="size-5" />
                  )}
                  <span className="sr-only">{showSideList && !shouldUseLeftDrawer ? "隐藏文章列表" : "显示文章列表"}</span>
                </button>

                {/* 右侧操作面板切换 */}
                <button
                  onClick={() => {
                    if (shouldUseRightDrawer) {
                      // 小于1024px：打开抽屉
                      setMobileActionPanel(true)
                    } else {
                      // 中宽屏：切换内联侧边栏
                      toggleActionPanel()
                    }
                  }}
                  className="size-6 flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-300"
                  title={showActionPanel && !shouldUseRightDrawer ? "隐藏操作面板" : "显示操作面板"}
                >
                  {showActionPanel && !shouldUseRightDrawer ? (
                    <PanelRightClose className="size-5" />
                  ) : (
                    <PanelRightOpen className="size-5" />
                  )}
                  <span className="sr-only">{showActionPanel && !shouldUseRightDrawer ? "隐藏操作面板" : "显示操作面板"}</span>
                </button>
              </>
            )}

            {/* 设置按钮 */}
            <a 
              href="/settings"
              onClick={(e) => { e.preventDefault(); navigate('/settings'); }}
              className="size-6 flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-300"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="size-5" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="sr-only">Settings</span>
            </a>
            
            {/* GitHub 按钮 */}
            <a 
              href="https://github.com/guohub8080" 
              target="_blank" 
              rel="noopener noreferrer"
              className="size-6 flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-300 max-lg:hidden"
            >
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-foreground">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="sr-only">Github</span>
            </a>
            
            {/* TOC 切换按钮 - 仅在 book 页面显示 */}
            {isBookPage && (
              <button
                onClick={toggleBookTocShow}
                className="size-6 flex items-center justify-center hover:opacity-80 hover:scale-110 transition-all duration-300"
                title={isBookTocShow ? "隐藏目录" : "显示目录"}
              >
                {isBookTocShow ? (
                  <BookOpen className="size-5" />
                ) : (
                  <BookText className="size-5" />
                )}
                <span className="sr-only">{isBookTocShow ? "隐藏目录" : "显示目录"}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}