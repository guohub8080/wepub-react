import HeadAIECO from "@aieco/heads/HeadAIECO";
import SimpleFootCard from "@aieco/frames/SimpleFootCard";
import P from "@aieco/docs/P";
import B from "@aieco/docs/B";
import ImgFrame1 from "@aieco/frames/ImgFrame1";
import AIECO from "@aieco/frames/MainFrame";
import placeholder1 from "@assets/pics/placeholders/300x500/1.jpg";
import { getDayjs } from "@utils/utDateTime/exDayjs";
import wechatColors from "@aieco/presets/color";

const articleMeta = {
    title: "AIECO纯底卡模板",
    date: getDayjs('2024-12-02 00:00:10'),
    author: "guohub8080",
    tag: ["AIECO", "模板"],
}

const pic1= `https://mmbiz.qpic.cn/mmbiz_png/plQCOAicD7wQWQkH8ZjBY7vEeiba7XY03NKCDKK3PR0ITfKZwmCIFwBEIlIzE5kZHcZzOjYk3uFoYnstAFLxicmsA/640?wx_fmt=png`

const pic2 = `https://mmbiz.qpic.cn/mmbiz_png/plQCOAicD7wQWQkH8ZjBY7vEeiba7XY03NT0BGLfeMeEXnYWoBr082RkibTtetiaHt0MMb0raOhNia6JACu4POaccHg/640?wx_fmt=png`

const pic3 = `https://mmbiz.qpic.cn/sz_mmbiz_jpg/plQCOAicD7wRTKicrj3ibj6qJ8IHz1nT8XUxUaAv8FEQCTubL7PshNQfPgS2Y3w03t92HMTfRVwVWbdTwzXS3KdGQ/640?wx_fmt=jpeg&amp;from=appmsg`
const Article = () => {
    return (<AIECO>
        {/* <HeadAIECO /> */}
        <img src={pic2} style={{
            width: "100%",
            aspectRatio: "1 / 1",
            objectFit: "cover",
            objectPosition: "left"
        }} alt="" />
        {/* 文章内容 */}
        {/* <section style={{
            padding: 25,
            backgroundColor: wechatColors.lightBgBlue,
            borderRadius: 8,
            border: "1px solid #d1d5db"
        }}>
            <P><B color={wechatColors.aiecoDarkBlue}>AIECO 纯净底部卡片示例</B></P>
            <P>这是一个使用 SimpleFootCard 的完整文章示例。</P>
            <ImgFrame1
                url={placeholder1}
                description="文章内容区域。"
            />
            <P>SimpleFootCard 的特点：</P>
            <P textIndent={0}>- 没有钻石 Logo</P>
            <P textIndent={0}>- 没有横线</P>
            <P textIndent={0}>- 没有 underTitle（编辑栏）</P>
            <P textIndent={0}>- 只有二维码和单位名称</P>
            <P textIndent={0}>- 完整的 border（四个角都是圆角）</P>
            <P>适用于不需要显示元数据的文章，作为独立的底部卡片使用。</P>
        </section> */}

        {/* 使用 SimpleFootCard（纯净底部卡片） */}
        {/* <div style={{ marginTop: 0 }}>
            <SimpleFootCard />
        </div> */}

    </AIECO>);
};

export default {
    jsx: <Article />,
    ...articleMeta
}
