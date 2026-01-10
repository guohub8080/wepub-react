/* eslint-disable no-mixed-spaces-and-tabs */
import wechatColors from "@aieco/presets/color.ts";
import byDefault from "@utils/common/byDefault.ts";
import FootAIECOWithoutTop from "../FullArticleFrame/components/Foot.tsx";
import EachMention from "../FullArticleFrame/components/EachMention.tsx";
import { AIECO_LOGO } from "@aieco/presets/picURLs.ts";
import { CSSProperties } from "react";

interface UnderTitleItem {
    title: string;
    name: string | string[];
}

interface AIECO_OnlyCardProps {
    borderRadius?: number;
    theme?: "red" | undefined;
    underTitle: UnderTitleItem[];
}

/**
 * AIECO 纯卡片组件
 * 只包含底部信息卡片，没有正文内容区域
 * 布局：上部内容区 -> 中间装饰条 -> 底部徽章
 */
const AIECO_FootCardWithCredit = (props: AIECO_OnlyCardProps) => {
    const borderRadius = byDefault(props.borderRadius, 8);
    const borderColor = "#d1d5db";

    let lightBarColor = wechatColors.aiecoLightBlue;
    let darkBarColor = wechatColors.aiecoDarkBlue;
    let titleUnderColor = "#bfdbfe";

    if (props.theme === "red") {
        lightBarColor = "#fbbf24";
        darkBarColor = wechatColors.titleRed;
        titleUnderColor = "#fde68a";
    }

    return (
        <section style={outerContainerStyle}>
            {/* 上部白色内容区 - EachMention */}
            <section style={{
                ...upperContentStyle,
                borderColor: borderColor,
                borderTopLeftRadius: borderRadius,
                borderTopRightRadius: borderRadius,
            }}>
                {props.underTitle.map((x, y) => (
                    <EachMention
                        title={x.title}
                        name={x.name}
                        key={y}
                        titleUnderColor={titleUnderColor}
                        titleColor={darkBarColor}
                    />
                ))}
            </section>

            {/* 钻石徽章容器 - 浮在装饰条上 */}
            <section style={diamondBadgeWrapperStyle}>
                <section style={{...diamondShapeStyle, backgroundColor: darkBarColor}}>
                    <section style={{...innerDiamondStyle, backgroundColor: "#f1f5f9"}}>
                        <img
                            src={AIECO_LOGO}
                            style={logoImgStyle}
                            referrerPolicy="no-referrer"
                            alt=""
                        />
                    </section>
                </section>
            </section>

            {/* 中间装饰条 */}
            <section style={middleBarWrapperStyle}>
                <section style={{...barLineStyle, height: 3, backgroundColor: lightBarColor}}></section>
                <section style={{...barLineStyle, height: 5, backgroundColor: darkBarColor}}></section>
            </section>

            {/* 底部白色区域 */}
            <section style={{
                ...bottomWhiteAreaStyle,
                borderColor: borderColor,
            }}>
            </section>

            {/* 页脚 */}
            <FootAIECOWithoutTop />
        </section>
    );
};

// =============================================== styles ===============================================
const outerContainerStyle: CSSProperties = {
    marginBottom: 0
}

const upperContentStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "white",
    paddingTop: 35,
    paddingBottom: 40,
    borderStyle: "solid",
    borderWidth: 1,
    borderBottom: "none"
}

const diamondBadgeWrapperStyle: CSSProperties = {
    width: "100%",
    height: 0,
    translate: "0 -10px"
}

const diamondShapeStyle: CSSProperties = {
    width: 25,
    height: 30,
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
}

const innerDiamondStyle: CSSProperties = {
    width: 19,
    height: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
}

const logoImgStyle: CSSProperties = {
    width: 10,
    height: "auto",
    display: "block",
    verticalAlign: "middle"
}

const middleBarWrapperStyle: CSSProperties = {
    width: "100%",
    display: "block",
    marginTop: 0,
    marginBottom: 0,
    fontSize: 0,
    lineHeight: 0
}

const barLineStyle: CSSProperties = {
    width: "100%",
    lineHeight: 0
}

const bottomWhiteAreaStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "white",
    paddingTop: 0,
    paddingBottom: 0,
    height: 0,
    lineHeight: 0,
    fontSize: 0,
    borderStyle: "solid",
    borderWidth: 1,
    borderTop: 0,
    borderBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
}

export default AIECO_FootCardWithCredit;

