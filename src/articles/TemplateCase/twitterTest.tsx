import { TweetUserInfo } from "@sns/Twitter"
import { getDayjs } from "@dev/utils/utDateTime/exDayjs"
import { TweetContent } from "@sns/Twitter"
import { TweetMeta } from "@sns/Twitter"
import { TweetImage1 } from "@sns/Twitter"
import { TweetImage2 } from "@sns/Twitter"
import { TweetImage3_Even } from "@sns/Twitter"
import { TweetImage6 } from "@sns/Twitter"
import { TweetCard_RT_0Margin, TweetCard_T, TweetCard_RT, LikeBar } from "@sns/Twitter"

const pic1 = `https://mmbiz.qpic.cn/mmbiz_png/plQCOAicD7wQWQkH8ZjBY7vEeiba7XY03NKCDKK3PR0ITfKZwmCIFwBEIlIzE5kZHcZzOjYk3uFoYnstAFLxicmsA/640?wx_fmt=png`
const pic2 = `https://mmbiz.qpic.cn/mmbiz_png/plQCOAicD7wQWQkH8ZjBY7vEeiba7XY03NT0BGLfeMeEXnYWoBr082RkibTtetiaHt0MMb0raOhNia6JACu4POaccHg/640?wx_fmt=png`
const pic3 = `https://mmbiz.qpic.cn/sz_mmbiz_jpg/plQCOAicD7wRTKicrj3ibj6qJ8IHz1nT8XUxUaAv8FEQCTubL7PshNQfPgS2Y3w03t92HMTfRVwVWbdTwzXS3KdGQ/640?wx_fmt=jpeg&amp;from=appmsg`
const pic4 = pic1
const pic5 = pic2
const pic6 = pic3


const articleMeta = {
    title: "Twitter 组件测试",
    date: getDayjs('2024-12-29 00:00:00'),
    author: "guohub8080",
    tag: ["Twitter", "社交媒体", "组件测试"],
}

const TwitterTest = () => {
    return (
        <main style={{ padding: 0, maxWidth: "600px", margin: "0 auto" }}>

            {/* TweetCard_T 测试 */}
            <div style={{ marginBottom: 40 }}>
                <TweetCard_T isFromTextShow={true}>
                    <TweetUserInfo name="你好Pen77" username="hello" verified={true} />
                    <TweetContent text={[
                        "这是使用 TweetCard_T 组件包装的推文内容，可以看到顶部中央的 X Logo。",
                    ]} />
                    <TweetImage1 url={pic1} ratio={[4,3]} />
                    <TweetMeta
                        time="上午11:43 · 2025年12月29日"
                        views="9,352"
                    />
                </TweetCard_T>
            </div>

            {/* TweetCard_RT 测试 */}
            <div style={{ marginBottom: 40 }}>
                <TweetCard_RT isFromTextShow={true}>
                    <TweetUserInfo name="测试用户" username="testuser" verified={false} />
                    <TweetContent text={[
                        "这是使用 TweetCard_RT 组件包装的推文内容，可以看到顶部右侧的「来自社交媒体 X」。",
                    ]} />
                    <TweetImage1 url={pic2} ratio={[16,9]} />
                    <TweetMeta
                        time="下午2:30 · 2025年12月29日"
                        views="1,234"
                    />
                </TweetCard_RT>
            </div>

            {/* <TweetUserInfo name="你好Pen77" username="hello" verified={true} />

            <TweetContent text={[
                "这是第一段纯文本内容，测试 TweetContent 组件的基本功能。如果这个段落非常的长，那么它应该能够正确地换行显示，而不会出现任何布局问题。",
                null,
                ["这是第二段，包含 ", "*#话题标签", " 和 ", "*@用户提及", " 混合的内容。"],
                ["还可以测试 ", "*#多个标签", " 和 ", "*@多个用户", " 在同一段落中的显示效果。"],
                ["*你好 ", "*世界 ", "*测试 "],
                " ",
                "*整行都是高亮文本的测试，星号应该被去掉",
                "\\*这行以转义星号开头，不会高亮，星号会被保留",
                "这是最后一段纯文本内容，用于测试组件在处理多段内容时的表现。"
            ]}></TweetContent>

            <TweetImage1 url={pic1}  ratio={[4,3]}/>
            <TweetMeta
                time="上午11:43 · 2025年12月29日"
                views="9,352"
            />

            {/* TweetImage2 测试 */}
            {/* <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid rgb(207, 217, 222)" }}>
                <TweetUserInfo name="测试用户" username="testuser" verified={false} />
                <TweetContent text={[
                    "这是一个双图推文的测试示例。"
                ]} />
                <TweetImage2
                    ratio={[16, 9]}
                    pic1={{ url: pic1 }}
                    pic2={{ url: pic3 }}
                />
                <TweetMeta
                    time="下午2:30 · 2025年12月29日"
                    views="1,234"
                />
            </div>  */}

            {/* TweetImage3_Even 测试 */}
            {/* <div style={{ marginTop: 40, paddingTop: 20, borderTop: "1px solid rgb(207, 217, 222)" }}>
                <TweetUserInfo name="三图测试" username="triple" verified={false} />
                <TweetContent text={[
                    "这是一个三图推文的测试示例。"
                ]} />
                <TweetImage3_Even
                    ratio={[16, 9]}
                    gap={4}
                    pic1={{ url: pic1 }}
                    pic2={{ url: pic2 }}
                    pic3={{ url: pic3 }}
                />
                <TweetMeta
                    time="下午3:30 · 2025年12月29日"
                    views="5,678"
                />
            </div> */}

            {/* TweetImage6 测试 */}
            <div style={{ marginTop: 40 }}>
                <TweetCard_RT_0Margin borderRadius={8}>
                    <TweetUserInfo name="六图测试" username="img6" verified={false} />
                    <TweetContent text={[
                        "这是一个使用 TweetCard_RT_0Margin 包装的3x2网格布局六图推文测试示例。"
                    ]} />
                    <TweetImage6
                        gap={4}
                        ratio={[3,2]}
                        pic1={{ url: pic1 }}
                        pic2={{ url: pic2 }}
                        pic3={{ url: pic3 }}
                        pic4={{ url: pic4 }}
                        pic5={{ url: pic5 }}
                        pic6={{ url: pic6 }}
                    />
                    <TweetMeta
                        time="下午4:30 · 2025年12月29日"
                        views="3,456"
                    />
                               <LikeBar />
                </TweetCard_RT_0Margin>
            </div>

            {/* LikeBar 测试 */}
            <div style={{ marginTop: 40, border: "1px solid rgb(207, 217, 222)", borderRadius: 16, padding: 20 }}>
                <h3 style={{ marginBottom: 20 }}>LikeBar 测试（点击心形试试）</h3>
     
            </div>


        </main>
    )
}

export default {
    jsx: <TwitterTest />,
    ...articleMeta
}
