import ArticleFrame from "@aieco/FullArticleFrame";
import HeadAIECO from "@aieco/heads/HeadAIECO";
import P from "@aieco/docs/P";
import B from "@aieco/docs/B";
import ImgFrame1 from "@aieco/frames/ImgFrame1";
import AIECO from "@aieco/frames/MainFrame";
import placeholder1 from "@assets/pics/placeholders/300x500/1.jpg";
import placeholder2 from "@assets/pics/placeholders/300x300/2.jpg";
import { getDayjs } from "@utils/utDateTime/exDayjs";
import wechatColors from "@aieco/presets/color";

const articleMeta = {
    title: "AIECO普通主题模板",
    date: getDayjs('2024-12-03 00:00:00'),
    author: "guohub8080",
    tag: ["AIECO", "模板"],
}

const underTitle = [
    { title: "组件来源", name: "WePubReact" },
    { title: "GitHub", name: "https://github.com/guohub8080/wepub-react" },
    { title: "作者", name: "guohub8080" },
]

const Article = () => {
    return (<AIECO>
        <HeadAIECO />
        <ArticleFrame underTitle={underTitle}>
            <P>这是一段测试文字。</P>
            <P>这是一段用于测试排版的文字，主要目的是验证 AIECO 模板在显示多段落内容时的效果。</P>
            <ImgFrame1
                url={placeholder1}
                description="这是一张测试图片，用于验证图片组件的显示效果。"
            />
            <P>继续测试。这里是一段中等长度的文字，用来观察不同长度的段落在一起时的视觉效果。</P>
            <P textIndent={0}>这是无首行缩进的文字。</P>
            <P textIndent={0} align="center">这是无首行缩进+正文居中的文字。</P>
            <P textIndent={0} align="center"><B color={wechatColors.aiecoDarkBlue}>这是无首行缩进+正文居中的文字。</B></P>
            <P>这是一段更长的测试文字。在实际使用中，您可以根据需要在这里输入真正的文章内容。目前这些文字只是为了演示模板的排版功能而临时添加的占位符。</P>
            <ImgFrame1
                url={placeholder2}
                description={["这是第二张测试图片。", "支持多行描述文字。"]}
            />
            <P>测试段落六。</P>
            <P>AIECO 模板支持多段落显示，每段之间会有适当的间距，让文章看起来更加清晰易读。这段文字稍微长一点，用来测试较长段落的显示效果。</P>
            <P>短段。</P>
            <P>最后一段测试文字。感谢您花时间阅读这些毫无意义的废话。这段文字的主要作用是验证模板在最底部内容区域的显示效果是否正常。</P>
        </ArticleFrame>
    </AIECO>);
};

export default {
    jsx: <Article />,
    ...articleMeta
}