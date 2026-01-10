import byDefault from "@utils/common/byDefault.ts";
import { useEffect, useRef } from "react";
import { isNumber, isNil, isString } from "lodash";
import UnderImg from "./components/UnderImg.tsx";
import {
  outerContainerStyle,
  imgWrapperStyle,
  defaultBoxShadow,
  defaultBorderRadius,
  getDescriptionBoxStyle,
  getImgContainerStyle,
  getImgStyle
} from "./styles";

/**
 * ImgFrame1 - AIECO 图片展示组件
 *
 * 用于展示图片，支持可选的描述文字。提供圆角、阴影等样式效果。
 *
 * 主要功能：
 * - 图片展示：支持自定义图片地址，默认使用占位图
 * - 描述文字：支持单行或多行描述，显示在图片下方
 * - 圆角效果：默认 8px 圆角，支持自定义四个角的圆角
 * - 阴影效果：默认浅灰色阴影，可自定义
 * - 宽度控制：支持设置最大宽度，≤0 表示不限制（100%）
 * - 自适应填充：使用 object-fit: contain 保持图片比例
 *
 * @example
 * // 基础用法
 * <ImgFrame1 url={imgUrl} description="图片描述" />
 *
 * @example
 * // 不限制宽度
 * <ImgFrame1 url={imgUrl} maxWidth={0} />
 *
 * @example
 * // 自定义圆角和阴影
 * <ImgFrame1
 *   url={imgUrl}
 *   borderRadius={12}
 *   boxShadow="0 4px 20px rgba(0, 0, 0, 0.1)"
 * />
 */
interface ImgFrame1Props {
    /** 图片地址，未提供时使用占位图 */
    url?: string;
    /** 图片描述，支持字符串或字符串数组（多行） */
    description?: string | string[];
    /** 描述文字颜色，未提供时继承父元素颜色 */
    color?: string;
    /** 图片最大宽度，≤0 表示不限制（100%），默认 "550px" */
    maxWidth?: string | number;
    /** 圆角大小，支持数字、字符串或四个角的数组 [左上, 右上, 右下, 左下] */
    borderRadius?: number | string | [number, number, number, number];
    /** 阴影效果，默认 "0 0 15px #efefef" */
    boxShadow?: string;
}

const ImgFrame1 = (props: ImgFrame1Props) => {
    const src = byDefault(props.url, "https://placehold.co/1000x600/png?text=PICTURE")
    const maxWidthValue = byDefault(props.maxWidth, "550px")

    // 处理 maxWidth：≤0 表示不限制（100%）
    let maxWidth = "550px"
    if (isNumber(maxWidthValue)) {
        if (maxWidthValue <= 0) {
            maxWidth = "100%"
        } else {
            maxWidth = `${maxWidthValue}px`
        }
    } else {
        maxWidth = maxWidthValue
    }

    const boxShadow = byDefault(props.boxShadow, defaultBoxShadow)

    // 处理 borderRadius props
    let commonRadius = defaultBorderRadius;
    if (!isNil(props.borderRadius)) {
        if (isNumber(props.borderRadius)) {
            commonRadius = props.borderRadius;
        } else if (isString(props.borderRadius)) {
            // 如果是字符串，直接使用（稍后会用于样式）
            commonRadius = props.borderRadius as any;
        }
    }

    // 图片底部圆角：有描述时为 0，无描述时与 commonRadius 一致
    let imgBtmRadius: number | string = 0;
    if (isNil(props.description)) {
        imgBtmRadius = commonRadius;
    }

    const imgRef = useRef(null);
    const imgRef2 = useRef(null);

    // 使用 !important 强制设置图片容器和图片的宽度
    useEffect(() => {
        if (imgRef) {
            imgRef.current.style.setProperty("width", "100%", "important")
            imgRef.current.style.setProperty("max-width", maxWidth, "important")
            imgRef.current.style.setProperty("object-fit", "contain", "important")
        }
        if (imgRef2) {
            imgRef2.current.style.setProperty("min-width", "100%", "important")
            imgRef2.current.style.setProperty("max-width", "100%", "important")
            imgRef2.current.style.setProperty("width", "100%", "important")
            imgRef2.current.style.setProperty("object-fit", "contain", "important")
        }
    }, [maxWidth])

    // 构建样式对象
    const descriptionBoxStyle = getDescriptionBoxStyle(commonRadius, props.borderRadius);
    const imgContainerStyle = getImgContainerStyle(commonRadius, boxShadow);
    const imgStyle = getImgStyle(commonRadius, imgBtmRadius, props.borderRadius);

    // section: 组件根容器
    return <section>
        {/* section: 最外层容器，控制整体布局和边距 */}
        <section style={outerContainerStyle}>
            {/* section: 图片容器，带圆角和阴影效果，通过 ref 设置最大宽度 */}
            <section ref={imgRef} style={imgContainerStyle}>
                {/* section: 图片包裹层，使图片居中对齐 */}
                <section style={imgWrapperStyle}>
                    <img src={src} referrerPolicy="no-referrer" alt=""
                         ref={imgRef2}
                         style={imgStyle}/>
                </section>

                {/* 图片下方的描述框组件 */}
                <UnderImg
                    description={props.description}
                    color={props.color}
                    descriptionBoxStyle={descriptionBoxStyle}
                />
            </section>

        </section>

    </section>
}

export default ImgFrame1
