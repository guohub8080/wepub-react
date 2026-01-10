import { ChatMessageSelf, ChatMessageOther } from "@sns/WeChatMsg";

const avatar1 = `https://mmbiz.qpic.cn/mmbiz_png/plQCOAicD7wQWQkH8ZjBY7vEeiba7XY03NKCDKK3PR0ITfKZwmCIFwBEIlIzE5kZHcZzOjYk3uFoYnstAFLxicmsA/640?wx_fmt=png`;
const avatar2 = `https://mmbiz.qpic.cn/mmbiz_png/plQCOAicD7wQWQkH8ZjBY7vEeiba7XY03NT0BGLfeMeEXnYWoBr082RkibTtetiaHt0MMb0raOhNia6JACu4POaccHg/640?wx_fmt=png`;

const articleMeta = {
  title: "微信聊天组件测试",
  date: "2025-01-07 14:30:45",
  author: "guohub8080",
  tag: ["微信聊天", "社交媒体", "组件测试"],
};

const WechatChatTest = () => {
  return (
    <main style={{ padding: 0, maxWidth: "600px", margin: "0 auto" }}>
      {/* 基础测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>微信聊天组件测试</h3>
        <section style={{ backgroundColor: "#F5F5F5", padding: 20 }}>
          {/* 对方消息 */}
          <ChatMessageOther
            username="张三"
            avatar={avatar1}
            content={<section>你好！</section>}
          />

          {/* 我方消息 */}
          <ChatMessageSelf
            avatar={avatar2}
            content={<section>你好，有什么可以帮助你的吗？</section>}
          />

          {/* 对方消息 */}
          <ChatMessageOther
            username="张三"
            avatar={avatar1}
            content={<section>我想咨询一下产品价格</section>}
          />

          {/* 我方消息 */}
          <ChatMessageSelf
            avatar={avatar2}
            content={<section>好的，我们的产品价格是...</section>}
          />
        </section>
      </section>

      {/* 长文本测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>长文本测试</h3>
        <section style={{ backgroundColor: "#F5F5F5", padding: 20 }}>
          <ChatMessageOther
            username="李四"
            content={<section>这是一段很长的文字内容，用来测试气泡的最大宽度和自动换行功能。当文本内容超过最大宽度时，应该会自动换行显示。</section>}
          />

          <ChatMessageSelf
            content={<section>这是我回复的一段很长的文字内容，同样用来测试气泡的最大宽度和自动换行功能。气泡应该有一个固定的最大宽度限制，但是可以根据内容自动扩展，直到达到最大宽度为止。</section>}
          />
        </section>
      </section>

      {/* 无头像测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>无头像降级显示</h3>
        <section style={{ backgroundColor: "#F5F5F5", padding: 20 }}>
          <ChatMessageOther
            username="王五"
            content={<section>我没有头像，会显示首字母</section>}
          />

          <ChatMessageSelf
            content={<section>我也没有头像，会显示"我"字</section>}
          />
        </section>
      </section>
    </main>
  );
};

export default {
  jsx: <WechatChatTest />,
  ...articleMeta,
};
