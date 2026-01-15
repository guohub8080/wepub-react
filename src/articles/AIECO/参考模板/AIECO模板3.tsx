import DangjianHead from "@aieco/heads/DangjianHead";
import AIECO from "@aieco/frames/MainFrame";
import FootCardWithCredit from "@aieco/foots/FootCardWithCredit";
import { getDayjs } from "@utils/utDateTime/exDayjs";
import NoWrapText from "@pub-html/common/NoWrapText";
import TextSpace from "@pub-html/common/TextSpace";
import { chunk } from "lodash";  

const articleMeta = {
    title: "AIECO带底部卡片模板",
    date: getDayjs('2024-12-03 00:01:01'),
    author: "guohub8080",
    tag: ["AIECO", "模板", "底部卡片"],
}

const underTitle = [
    { title: "组件来源", name: "WePubReact" },
    { title: "GitHub", name: "https://github.com/guohub8080/wepub-react" },
    { title: "作者", name: "guohub8080" },
]

const Article = () => {
    // 每两个字符切割字符串
    const titleChunks = chunk("经济合作局举办2025年专兼职党务纪检干部培训班".split(""), 2).map(arr => arr.join(""))

    return (<AIECO>
        <DangjianHead mainTitle={["深学细悟砺初心", "履职赋能启新程"]} subTitle={titleChunks}>
        </DangjianHead>
        <section style={{ marginTop: 20, marginBottom: 20, width: "100%" }}>
            <section style={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: 24,
                marginBottom: 16,
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}>
                <section style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 16
                }}>
                    <section style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        backgroundColor: "#dbeafe",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: 12
                    }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1e40af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </section>
                    <section>
                        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: "#1e40af" }}>
                            测试卡片标题
                        </h3>
                        <p style={{ margin: 0, fontSize: 14, color: "#6b7280" }}>
                            这是一个测试卡片的副标题
                        </p>
                    </section>
                </section>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#374151" }}>
                    这是一个测试卡片组件，用于验证 AIECO 模板中自定义卡片的显示效果。你可以在这里放置任何内容，比如文字、图片、列表等。
                </p>
            </section>

            <section style={{
                backgroundColor: "#fef3c7",
                border: "1px solid #f59e0b",
                borderRadius: 12,
                padding: 20,
                marginBottom: 16
            }}>
                <section style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#92400e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <strong style={{ fontSize: 16, color: "#92400e" }}>注意事项</strong>
                </section>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#78350f" }}>
                    这是一个警告样式的卡片，用于提示重要信息。你可以使用不同的颜色和样式来区分不同类型的内容。
                </p>
            </section>

            <section style={{
                backgroundColor: "#d1fae5",
                border: "1px solid #10b981",
                borderRadius: 12,
                padding: 20
            }}>
                <section style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 8
                }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#065f46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 8 }}>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <strong style={{ fontSize: 16, color: "#065f46" }}>成功提示</strong>
                </section>
                <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#064e3b" }}>
                    这是一个成功样式的卡片，用于显示成功状态或正面信息。测试完成后可以删除这些示例卡片。
                </p>
            </section>
        </section>
        <FootCardWithCredit underTitle={underTitle} />
    </AIECO>);
};

export default {
    jsx: <Article />,
    ...articleMeta
}
