/* eslint-disable no-mixed-spaces-and-tabs */
import { ReactNode, useEffect, useRef } from "react";
import wechatColors from "@aieco/presets/color.ts";
import byDefault from "@utils/common/byDefault.ts";
import ArticleBottom from "./components/ArticleBottom.tsx";

interface UnderTitleItem {
    title: string;
    name?: string | string[];
}

const ArticleFrame = (props: {
    children?: ReactNode,
    borderRadius?: number,
    articleBgColor?: string,
    theme?: "red" | undefined,
    underTitle: UnderTitleItem[]
}) => {
    const borderRadius = byDefault(props.borderRadius, 8)
    const borderColor = "#d1d5db"
    let articleBgColor = byDefault(props.articleBgColor, wechatColors.lightBgBlue)
    let lightBarColor = wechatColors.aiecoLightBlue
    let darkBarColor = wechatColors.aiecoDarkBlue
    let titleUnderColor = "#bfdbfe"
    if (props.theme === "red") {
        lightBarColor = "#fbbf24"
        darkBarColor = wechatColors.titleRed
        titleUnderColor = "#fde68a"
        articleBgColor = wechatColors.lightBgYellow
    }

    return (<>
        <section style={{ marginBottom: 0 }}>
            <section style={{
                paddingTop: 25,
                paddingBottom: 25,
                borderRadius: borderRadius,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
                marginBottom: -25,
                backgroundColor: articleBgColor,
                border: `1px ${borderColor} solid`,
                borderBottom: `1px ${articleBgColor} solid`,
            }}>
                {props.children}
            </section>
            <ArticleBottom borderRadius={borderRadius} borderColor={borderColor} lightColor={lightBarColor}
                darkColor={darkBarColor} titleUnderColor={titleUnderColor} underTitle={props.underTitle} />
        </section>
    </>)
}
export default ArticleFrame
