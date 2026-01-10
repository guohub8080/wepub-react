import { CSSProperties } from "react";

// 样式常量对象：最外层容器样式，用于设置图片组件的整体布局和间距
export const outerContainerStyle: CSSProperties = {
    width: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: "auto",
    marginRight: "auto"
};

// 样式常量对象：图片包裹层样式，用于将图片居中显示
export const imgWrapperStyle: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 0,
    margin: 0
};

// 样式常量对象：描述框基础样式，定义图片下方描述文字区域的基本样式
export const baseDescriptionBoxStyle: CSSProperties = {
    paddingTop: 5,
    paddingBottom: 10,
    border: "1px #d1d5db solid",
    borderTop: 0
};

// 样式常量对象：描述文字基础样式，定义文字大小、对齐、行高和内边距
export const baseDescriptionTextStyle: CSSProperties = {
    width: "100%",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 1.3,
    paddingTop: 3,
    paddingLeft: 10,
    paddingRight: 10
};

/** 默认图片容器阴影 */
export const defaultBoxShadow = "0 0 15px #efefef";

/** 默认圆角大小 */
export const defaultBorderRadius = 8;

/**
 * 获取描述框容器样式
 * @param commonRadius - 圆角大小
 * @param borderRadius - 可选的四个角圆角数组 [左上, 右上, 右下, 左下]
 */
export const getDescriptionBoxStyle = (
    commonRadius: number | string,
    borderRadius?: number | string | [number, number, number, number]
): CSSProperties => {
    const base: CSSProperties = {
        ...baseDescriptionBoxStyle,
        borderRadius: commonRadius,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    };

    // 如果 borderRadius 是数组，特殊处理描述框的底部圆角
    if (Array.isArray(borderRadius) && borderRadius.length === 4) {
        base.borderBottomLeftRadius = borderRadius[3];
        base.borderBottomRightRadius = borderRadius[2];
        base.borderTopLeftRadius = 0;
        base.borderTopRightRadius = 0;
    }

    return base;
};

/**
 * 获取图片容器样式
 * @param commonRadius - 圆角大小
 * @param boxShadow - 阴影效果
 */
export const getImgContainerStyle = (
    commonRadius: number | string,
    boxShadow: string
): CSSProperties => ({
    borderRadius: commonRadius,
    overflow: "hidden",
    backgroundColor: "white",
    boxShadow: boxShadow,
    margin: "0 auto"
});

/**
 * 获取图片样式
 * @param commonRadius - 圆角大小
 * @param imgBtmRadius - 图片底部圆角
 * @param borderRadius - 可选的四个角圆角数组 [左上, 右上, 右下, 左下]
 */
export const getImgStyle = (
    commonRadius: number | string,
    imgBtmRadius: number | string,
    borderRadius?: number | string | [number, number, number, number]
): CSSProperties => {
    const base: CSSProperties = {
        width: "100%",
        objectFit: "contain",
        margin: 0,
        padding: 0,
        height: "fit-content",
        borderTopRightRadius: commonRadius,
        borderTopLeftRadius: commonRadius,
        borderBottomLeftRadius: imgBtmRadius,
        borderBottomRightRadius: imgBtmRadius,
    };

    // 如果 borderRadius 是数组，特殊处理四个角
    if (Array.isArray(borderRadius) && borderRadius.length === 4) {
        base.borderTopLeftRadius = borderRadius[0];
        base.borderTopRightRadius = borderRadius[1];
        base.borderBottomRightRadius = borderRadius[2];
        base.borderBottomLeftRadius = borderRadius[3];
    }

    return base;
};
