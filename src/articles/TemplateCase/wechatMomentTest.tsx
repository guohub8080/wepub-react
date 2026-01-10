import { MomentImg1, MomentImg2, MomentImg3, MomentImg4, MomentImg56, MomentImg789, MomentAvatar, MomentContent, MomentTimestamp, MomentLocation, InteractionBar } from "@sns/WechatMoment";
import { getDayjs } from "@dev/utils/utDateTime/exDayjs";

const pic1 = `https://mmbiz.qpic.cn/mmbiz_png/plQCOAicD7wQWQkH8ZjBY7vEeiba7XY03NKCDKK3PR0ITfKZwmCIFwBEIlIzE5kZHcZzOjYk3uFoYnstAFLxicmsA/640?wx_fmt=png`;
const pic2 = `https://mmbiz.qpic.cn/mmbiz_png/plQCOAicD7wQWQkH8ZjBY7vEeiba7XY03NT0BGLfeMeEXnYWoBr082RkibTtetiaHt0MMb0raOhNia6JACu4POaccHg/640?wx_fmt=png`;
const pic3 = `https://mmbiz.qpic.cn/sz_mmbiz_jpg/plQCOAicD7wRTKicrj3ibj6qJ8IHz1nT8XUxUaAv8FEQCTubL7PshNQfPgS2Y3w03t92HMTfRVwVWbdTwzXS3KdGQ/640?wx_fmt=jpeg&amp;from=appmsg`;

const articleMeta = {
  title: "微信朋友圈组件测试",
  date: getDayjs("2024-12-29 00:00:12"),
  author: "guohub8080",
  tag: ["微信朋友圈", "社交媒体", "组件测试"],
};

const WechatMomentTest = () => {
  return (
    <main style={{ padding: 0, maxWidth: "600px", margin: "0 auto" }}>
      {/* 组合式组件测试：基本用法 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>组合式组件：基本用法</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="李四" avatar={pic2} />
          <section style={{ flex: 1 }}>
            <MomentContent username="李四" content="使用组合式组件，可以自由拼装各个部分。" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 15)} />
            <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <MomentImg1 maxWidth={300} url={pic3} ratio={[4, 3]} />
            </section>
            <InteractionBar likes={["李四"]} comments={["很棒！", "学习了"]} />
          </section>
        </section>
      </section>

      {/* 组合式组件测试：带位置信息 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>组合式组件：带位置信息</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="王五" />
          <section style={{ flex: 1 }}>
            <MomentContent username="王五" content="可以灵活添加位置信息、多张图片等。" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 5)} />
            <MomentLocation location="北京市·朝阳区" />
            <section style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <MomentImg1 url={pic1} maxWidth={300} />
              <MomentImg1 url={pic2} ratio={[16, 9]} maxWidth="50%" />
            </section>
            <InteractionBar likes={["王五", "赵六"]} comments={["好位置！", "下次我也去"]} />
          </section>
        </section>
      </section>

      {/* MomentImg1 多种场景测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>MomentImg1 单图示例</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="测试用户" avatar={pic1} />
          <section style={{ flex: 1 }}>
            <MomentContent username="测试用户" content="测试 MomentImg1 组件：默认正方形（1:1）" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 30)} />
            <MomentImg1 maxWidth={300} url={pic1} />
          </section>
        </section>
      </section>

      {/* MomentImg2 双图测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>MomentImg2 双图示例</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="测试用户" avatar={pic1} />
          <section style={{ flex: 1 }}>
            <MomentContent username="测试用户" content="测试 MomentImg2 组件：每个图默认 1:1 正方形、默认间隙 4px" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 25)} />
            <MomentImg2 pic1={{ url: pic1 }} pic2={{ url: pic2 }} />
          </section>
        </section>
      </section>

      {/* MomentImg3 三图测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>MomentImg3 三图示例</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="测试用户" avatar={pic1} />
          <section style={{ flex: 1 }}>
            <MomentContent username="测试用户" content="测试 MomentImg3 组件：每个图默认 1:1 正方形、默认间隙 4px" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 20)} />
            <MomentImg3 pic1={{ url: pic1 }} pic2={{ url: pic2 }} pic3={{ url: pic3 }} />
          </section>
        </section>
      </section>

      {/* MomentImg4 四图测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>MomentImg4 四图示例（2x2）</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="测试用户" avatar={pic1} />
          <section style={{ flex: 1 }}>
            <MomentContent username="测试用户" content="测试 MomentImg4 组件：2x2 布局、每个图默认 1:1 正方形、默认间隙 4px" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 15)} />
            <MomentImg4
              maxWidth={350}
              pic1={{ url: pic1 }}
              pic2={{ url: pic2 }}
              pic3={{ url: pic3 }}
              pic4={{ url: pic1 }}
            />
          </section>
        </section>
      </section>

      {/* MomentImg56 五图测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>MomentImg56 五图示例（3x2，中下透明占位）</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="测试用户" avatar={pic1} />
          <section style={{ flex: 1 }}>
            <MomentContent username="测试用户" content="测试 MomentImg56 组件：5张图模式（pic5 为 null 占位）" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 10)} />
            <MomentImg56
              pic1={{ url: pic1 }}
              pic2={{ url: pic2 }}
              pic3={{ url: pic3 }}
              pic4={{ url: pic1 }}
              pic5={null}
              pic6={{ url: pic2 }}
            />
          </section>
        </section>
      </section>

      {/* MomentImg56 六图测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>MomentImg56 六图示例（3x2）</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="测试用户" avatar={pic1} />
          <section style={{ flex: 1 }}>
            <MomentContent username="测试用户" content="测试 MomentImg56 组件：6张图模式（所有位置都有图片）" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 5)} />
            <MomentImg56
              pic1={{ url: pic1 }}
              pic2={{ url: pic2 }}
              pic3={{ url: pic3 }}
              pic4={{ url: pic1 }}
              pic5={{ url: pic2 }}
              pic6={{ url: pic3 }}
            />
          </section>
        </section>
      </section>

      {/* MomentImg789 七图测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>MomentImg789 七图示例（3x3，两个位置透明占位）</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="测试用户" avatar={pic1} />
          <section style={{ flex: 1 }}>
            <MomentContent username="测试用户" content="测试 MomentImg789 组件：7张图模式（pic8 和 pic9 为 null 占位）" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 3)} />
            <MomentImg789
              pic1={{ url: pic1 }}
              pic2={{ url: pic2 }}
              pic3={{ url: pic3 }}
              pic4={{ url: pic1 }}
              pic5={{ url: pic2 }}
              pic6={{ url: pic3 }}
              pic7={{ url: pic1 }}
              pic8={null}
              pic9={null}
            />
          </section>
        </section>
      </section>

      {/* MomentImg789 九图测试 */}
      <section style={{ marginBottom: 30 }}>
        <h3 style={{ marginBottom: 12, fontSize: 16, fontWeight: 600 }}>MomentImg789 九图示例（3x3）</h3>
        <section style={{ display: "flex", alignItems: "flex-start", backgroundColor: "#fff" }}>
          <MomentAvatar username="测试用户" avatar={pic1} />
          <section style={{ flex: 1 }}>
            <MomentContent username="测试用户" content="测试 MomentImg789 组件：9张图模式（所有位置都有图片）" />
            <MomentTimestamp timestamp={new Date(Date.now() - 1000 * 60 * 1)} />
            <MomentImg789
              pic1={{ url: pic1 }}
              pic2={{ url: pic2 }}
              pic3={{ url: pic3 }}
              pic4={{ url: pic1 }}
              pic5={{ url: pic2 }}
              pic6={{ url: pic3 }}
              pic7={{ url: pic1 }}
              pic8={{ url: pic2 }}
              pic9={{ url: pic3 }}
            />
          </section>
        </section>
      </section>
    </main>
  );
};

export default {
  jsx: <WechatMomentTest />,
  ...articleMeta,
};
