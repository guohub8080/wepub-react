/* eslint-disable no-mixed-spaces-and-tabs */
import { ReactNode, useEffect, useRef } from "react";

/**
 * AIECO 主题框架容器
 *
 * 用于微信公众号文章的标准宽度容器，确保内容在微信环境中正确显示。
 *
 * 主要功能：
 * - 设置最大宽度为 650px（微信公众号标准宽度）
 * - 内容居中显示（margin: "0 auto"）
 * - 添加编辑器标识信息
 * - 使用 !important 强制应用宽度设置
 *
 * @example
 * <AIECO>
 *   <HeadAIECO />
 *   <ArticleFrame>
 *     文章内容...
 *   </ArticleFrame>
 * </AIECO>
 */
const MainFrameAIECO = (props: {
    children?: ReactNode,
}) => {
    const ref = useRef(null)
    useEffect(() => {
        if (ref) {
            ref.current.style.setProperty("max-width", "650px", "important")
        }
    }, [])
    return <section className="Wechat HTML Edit Tool powered by guozhongtian."
        data-tool-by="gzt"
        ref={ref}
        html-editor-name="guo zhongtian"
        style={{ maxWidth: 650, margin: "0 auto" }}>
        {props.children}
    </section>
}

export default MainFrameAIECO

