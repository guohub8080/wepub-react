import wechatColors from "@aieco/presets/color.ts";
import FootAIECOWithoutTop from "./Foot.tsx";
import EachMention from "./EachMention.tsx";
import { AIECO_LOGO } from "@aieco/presets/picURLs.ts";
import SectionEx from "@pub-html/basicEx/SectionEx.tsx";
import { CSSProperties } from "react";

interface ArticleBottomProps {
    borderRadius: number;
    borderColor: string;
    lightColor: string;
    darkColor: string;
    titleUnderColor: string;
    underTitle: Array<{ title: string; name?: string | string[] }>;
}

const ArticleBottom = (props: ArticleBottomProps) => {
    return (
        <section style={outerContainerStyle}>
            {/* 局Logo钻石图标 */}
            <section style={logoWrapperStyle}>
                <section style={{
                    ...diamondShapeStyle,
                    backgroundColor: props.darkColor,
                }}>
                    <section style={{
                        ...innerDiamondStyle,
                        backgroundColor: "#f1f5f9"
                    }}>
                        <img
                            src={AIECO_LOGO}
                            style={logoImgStyle}
                            referrerPolicy="no-referrer"
                            alt=""
                        />
                    </section>
                </section>
            </section>

            {/* 横线 */}
            <section style={horizontalLinesWrapperStyle}>
                <section style={{...lineStyle, height: 3, backgroundColor: props.lightColor}}></section>
                <section style={{...lineStyle, height: 5, backgroundColor: props.darkColor}}></section>
            </section>

            {/* 白色底框 */}
            <SectionEx important={[["background-color", "white"]]} style={{
                ...whiteBoxStyle,
                borderColor: props.borderColor,
            }}>
                {/* 编辑栏 */}
                {props.underTitle.map((x, y) => (
                    <EachMention
                        title={x.title}
                        name={x.name}
                        key={y}
                        titleUnderColor={props.titleUnderColor}
                        titleColor={props.darkColor}
                    />
                ))}
            </SectionEx>
            <FootAIECOWithoutTop />
        </section>
    );
};

// ================================================ styles ================================================
const outerContainerStyle: CSSProperties = {
    width: "100%",
    margin: "0 auto"
}

const logoWrapperStyle: CSSProperties = {
    width: "100%",
    height: 0,
    translate: "0 14px"
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

const horizontalLinesWrapperStyle: CSSProperties = {
    width: "100%",
    display: "block",
    marginTop: 25
}

const lineStyle: CSSProperties = {
    width: "100%"
}

const whiteBoxStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "white",
    paddingTop: 35,
    paddingBottom: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderTop: 0
}

export default ArticleBottom;

