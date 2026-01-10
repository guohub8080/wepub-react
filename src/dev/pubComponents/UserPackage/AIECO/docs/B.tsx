import wechatColors from "@aieco/presets/color";

const B = (props: {
    children?: string
    isAIECO?: boolean
    isAIECOLight?: boolean
    isRed?: boolean
    color?: string
}) => {
    let fontColor = ""
    if (props.color) fontColor = props.color
    else if (props.isAIECO) fontColor = wechatColors.aiecoDarkBlue
    else if (props.isAIECOLight) fontColor = wechatColors.aiecoLightBlue
    else if (props.isRed) fontColor = wechatColors.darkBgRed
    return <strong style={{fontSize: 17, color: fontColor, fontWeight: 700}}>{props.children}</strong>
}
export default B