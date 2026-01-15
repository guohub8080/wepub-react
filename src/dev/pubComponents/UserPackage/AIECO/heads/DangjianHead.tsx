import SectionEx from "@pub-html/basicEx/SectionEx";
import ImgEx from "@pub-html/basicEx/ImgEx";
import { CSSProperties, isValidElement, ReactNode } from "react";
import NoWrapText from "@pub-html/common/NoWrapText";
import { isNil } from "lodash";
import googleColors from "@assets/colors/googleColors";

const birdImg = `https://mmbiz.qpic.cn/sz_mmbiz_gif/S6lhSUeSxeNcEj5BE0o1d3EnnEicoplMhfPhgjTNlXEyv0g7fV0XArj6ou6J6ibZ8m0zialsM7puG1DM0mgn3DjIQ/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1`
const flagImg = `https://mmbiz.qpic.cn/sz_mmbiz_gif/S6lhSUeSxeNcEj5BE0o1d3EnnEicoplMhHO3NZLDvNWgpQLPHCvl1JsZnXm4vRNvpyeSCicy3oGM5Z0XPeXArpibw/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1`

// ============================================ DangjianHead Component ============================================

/**
 * DangjianHead - 党建风格头部组件
 *
 * 用于展示党建风格的文章头部，包含飞鸟装饰、红色背景卡片和旗帜装饰。
 *
 * @param mainTitle - 主要标题，可以是字符串数组或 ReactNode
 *   - 字符串数组：每个元素作为不换行词组，支持换行时保持横向间距（columnGap: 1em）
 *   - ReactNode：直接渲染自定义内容
 * @param subTitle - 子标题，可以是字符串数组或 ReactNode
 *   - 字符串数组：每个元素作为不换行词组
 *   - ReactNode：直接渲染自定义内容
 * @param children - 自定义内容，如果传入则覆盖默认的标题模板
 */
export default (props: {
  children?: ReactNode
  mainTitle: (string | ReactNode)[] | ReactNode
  subTitle: (string | ReactNode)[] | ReactNode
}) => {

  // 默认模板：当没有传入 children 时显示
  const Template = <>
    {/* 主要标题 */}
    {/* 如果 mainTitle 是 React 元素，直接显示；否则用 inline-flex 布局渲染，支持换行时保持横向间距 */}
    {isValidElement(props.mainTitle) ? props.mainTitle : <section style={mainTitleStyle}>
      <NoWrapText textList={props.mainTitle as (string | ReactNode)[]} />
    </section>}

    {/* 子标题 */}
    {/* 如果 subTitle 是 React 元素，直接显示；否则用居中布局渲染 */}
    {isValidElement(props.subTitle) ? props.subTitle : <section style={subTitleStyle}>
      <NoWrapText textList={props.subTitle as (string | ReactNode)[]} />
    </section>}
  </>

  return <SectionEx style={outerWrapperStyle}>
    <SectionEx style={flying_css}>
      <ImgEx url={birdImg} style={birdImgStyle} />
    </SectionEx>
    <SectionEx style={containerStyle}>
      {/* 如果没有传入 children，显示默认模板；否则显示自定义内容 */}
      {isNil(props.children) ? Template : props.children}
    </SectionEx>
    <SectionEx style={flagWrapperStyle}>
      <ImgEx url={flagImg} style={flagImgStyle} />
    </SectionEx>
  </SectionEx>
}

// ============================================ Styles ============================================

const flying_css: CSSProperties = {
  width: "100%",
  display: "flex",
  justifyContent: "end",
  height: 20
}

const mainTitleStyle: CSSProperties = {
  fontSize: 17,
  display: "inline-flex",
  columnGap: "1em",
  flexWrap: "wrap",
  width: "100%",
  justifyContent: "center",
  textAlign: "center",
  color: googleColors.amber400,
  fontWeight: 800
}

const subTitleStyle: CSSProperties = {
  marginTop: 10,
  fontSize: 16,
  textAlign: "center",
  color: googleColors.amber100
}

const containerStyle: CSSProperties = {
  width: "100%",
  backgroundColor: "#dc1416",
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft: 20,
  paddingRight: 20,
  borderRadius: 8,
  zIndex: 0,
}

const birdImgStyle: CSSProperties = {
  width: 60,
  height: 60,
  marginLeft: "auto",
  marginRight: 0,
  marginBottom: -20
}

const flagImgStyle: CSSProperties = {
  width: 65,
  height: 45,
  marginRight: "auto"
}

const outerWrapperStyle: CSSProperties = {
  width: "100%",
  marginBottom: 20
}

const flagWrapperStyle: CSSProperties = {
  width: "100%",
  marginTop: -10,
  zIndex: 999
}