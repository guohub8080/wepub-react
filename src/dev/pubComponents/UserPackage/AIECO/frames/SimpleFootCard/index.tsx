/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useRef, CSSProperties } from "react";
import BetterQRCode from "@pub-svg/C1_Standard/BetterQRCode";
import { AIECO_QR_CODE, AIECO_LOGO_TEXT } from "@aieco/presets/picURLs.ts";

/**
 * SimpleFootCard - AIECO 纯净底部卡片
 *
 * 特点：
 * - 没有钻石 Logo
 * - 没有横线
 * - 没有 underTitle（编辑栏）
 * - 只有二维码和单位名称
 * - 完整的 border（包括上边框）
 * - 四个角都是圆角
 *
 * 适用场景：
 * - 不需要显示元数据的文章
 * - 追求简洁的底部
 * - 作为独立底部使用
 */

const qrcodeSize = 140;
const footRadius = 10;

const SimpleFootCard = () => {
    const ref = useRef<any>();
    useEffect(() => {
        if (ref.current) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ref.current?.style.setProperty("max-width", "330px", "important");
        }
    }, []);

    return (
        <section style={outerContainerStyle}>
            <section style={innerContainerStyle}>
                {/* AIECO 中英文名称 */}
                <section style={logoContainerStyle}>
                    <img
                        src={AIECO_LOGO_TEXT}
                        alt=""
                        referrerPolicy="no-referrer"
                        ref={ref}
                        style={logoImgStyle}
                    />
                </section>

                {/* 二维码 */}
                <section style={qrcodeContainerStyle}>
                    <BetterQRCode url={AIECO_QR_CODE} />
                </section>
            </section>

            {/* 文字信息 */}
            <section style={textSectionStyle}>
                <p style={textStyle}>
                    <strong>更多资讯请关注微信公众号</strong>
                </p>
                <p style={normalTextStyle}>
                    官方网站：aieco.org.cn
                </p>
                <p style={normalTextStyle}>
                    投稿邮箱：tg@aieco.org.cn
                </p>
            </section>
        </section>
    );
};

// =========================================== styles ============================================

const outerContainerStyle: CSSProperties = {
    backgroundColor: "#f3f4f6",
    width: "100%",
    paddingBottom: 50,
    paddingTop: 50,
    margin: "0 auto",
    borderRadius: footRadius,
    borderWidth: 1,
    borderStyle: "solid",
    boxSizing: "border-box",
    borderColor: "#d1d5db",
    borderTop: "1px solid #d1d5db",  // 完整的上边框
    borderTopLeftRadius: footRadius,  // 四个角都是圆角
    borderTopRightRadius: footRadius
};

const innerContainerStyle: CSSProperties = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
};

const logoContainerStyle: CSSProperties = {
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
    display: "flex",
    justifyContent: "center"
};

const logoImgStyle: CSSProperties = {
    width: "100%",
    margin: "0 auto"
};

const qrcodeContainerStyle: CSSProperties = {
    width: qrcodeSize + 20,
    height: qrcodeSize + 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 30,
    marginTop: 30,
    boxShadow: "0px 0px 15px #EcEcEc"
};

const textSectionStyle: CSSProperties = {
    width: "100%",
    marginTop: 25
};

const textStyle: CSSProperties = {
    textAlign: "center",
    fontSize: 14,
    color: "#8d8d8d",
    marginBottom: 5,
    fontWeight: 700
};

const normalTextStyle: CSSProperties = {
    textAlign: "center",
    fontSize: 14,
    color: "#8d8d8d",
    marginBottom: 5
};

export default SimpleFootCard;
