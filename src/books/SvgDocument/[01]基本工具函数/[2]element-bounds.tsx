import React from "react";
import { DocumentExport } from "../data/svgDocumentLoader.tsx";
import SectionEx from "@dev/pubComponents/PureHTML/basicEx/SectionEx.tsx";
import { genAnimateRotate, getCenterRotateStyle } from "@dev/pubComponents/PubUtils/genSvgAnimateTransform/genAnimateRotate";
import { genAnimateScale, getCenterScaleStyle } from "@dev/pubComponents/PubUtils/genSvgAnimateTransform/genAnimateScale";
import { getOriginNumByText, type ElementBoundsType, type OriginPosition } from "@dev/pubComponents/PubUtils/genSvgAnimateTransform";
import { getEaseBezier } from "@dev/pubComponents/PubUtils/getBezier";
import {
    CodeBlock,
    PresetPreviewDisplayBlock,
    InfoBox,
    TableContainer,
    Section,
    H1,
    H2,
    H3,
    P,
    Description
} from "../data/components";
import pic1 from "../data/assets/1.png";

const Article = () => {
    const viewBoxW = 375;
    const viewBoxH = 200;
    
    // 元素尺寸和位置
    const rectW = 80;
    const rectH = 60;
    const rectX = 50;
    const rectY = 70;
    
    const elementBounds: ElementBoundsType = {
        x: rectX,
        y: rectY,
        w: rectW,
        h: rectH
    };

    // 计算各个位置的坐标
    const positions: Record<Exclude<OriginPosition, 'origin'>, [number, number]> = {
        topLeft: getOriginNumByText('topLeft', elementBounds),
        topCenter: getOriginNumByText('topCenter', elementBounds),
        topRight: getOriginNumByText('topRight', elementBounds),
        centerLeft: getOriginNumByText('centerLeft', elementBounds),
        center: getOriginNumByText('center', elementBounds),
        centerRight: getOriginNumByText('centerRight', elementBounds),
        bottomLeft: getOriginNumByText('bottomLeft', elementBounds),
        bottomCenter: getOriginNumByText('bottomCenter', elementBounds),
        bottomRight: getOriginNumByText('bottomRight', elementBounds),
    };

    return (
        <SectionEx>
            <H1>元素边界工具 Element Bounds</H1>
            <Section>
                <Description style={{ marginTop: '8px' }}>
                    <code>elementBounds</code> 用于描述 SVG 元素的位置和尺寸，配合 <code>getOriginNumByText</code> 函数自动计算变换原点坐标
                </Description>
            </Section>

            {/* 1. 什么是 ElementBounds */}
            <H2 style={{ padding: '0 16px', marginTop: '20px' }}>1. 什么是 ElementBounds？</H2>
            <Section>
                <P>
                    <code>ElementBoundsType</code> 是一个描述元素边界的类型，包含以下属性：
                </P>
                <InfoBox type="info" style={{ background: '#f5f5f5', border: 'none' }}>
                    <ul style={{ fontSize: '14px', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                        <li><code>x?</code>: 元素左上角 X 坐标（可选，默认 0）</li>
                        <li><code>y?</code>: 元素左上角 Y 坐标（可选，默认 0）</li>
                        <li><code>w</code>: 元素宽度（必填）</li>
                        <li><code>h</code>: 元素高度（必填）</li>
                    </ul>
                </InfoBox>
                <CodeBlock code={`type ElementBoundsType = { 
  x?: number;  // 左上角 X 坐标，默认 0
  y?: number;  // 左上角 Y 坐标，默认 0
  w: number;   // 宽度（必填）
  h: number;   // 高度（必填）
}`} />
            </Section>

            {/* 2. 为什么需要 ElementBounds？ */}
            <H2 style={{ padding: '0 16px', marginTop: '24px' }}>2. 为什么需要 ElementBounds？</H2>
            <Section>
                <P>
                    SVG 的旋转、缩放等变换默认以坐标原点 <code>(0, 0)</code> 为中心。但通常我们希望：
                </P>
                <InfoBox type="warning">
                    <p style={{ fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        ✅ <strong>以元素自身的中心</strong>为变换原点<br/>
                        ✅ <strong>以元素的某个角落或边缘</strong>为变换原点
                    </p>
                </InfoBox>
                <P>
                    <code>elementBounds</code> 提供元素的位置和尺寸信息，让函数能够<strong>自动计算</strong>出正确的变换原点坐标。
                </P>
            </Section>

            {/* 3. 支持的快捷位置 */}
            <H2 style={{ padding: '0 16px', marginTop: '24px' }}>3. 支持的快捷位置（OriginPosition）</H2>
            <Section>
                <P>
                    <code>getOriginNumByText</code> 函数支持 10 种快捷位置：
                </P>

                <InfoBox type="info" style={{ background: '#f5f5f5', border: 'none' }}>
                    <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #ddd' }}>
                                <th style={{ padding: '8px', textAlign: 'left', width: '35%' }}>位置名称</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>计算坐标</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>示例结果</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '6px' }}>topLeft</td>
                                <td style={{ padding: '6px', color: '#666' }}>[x, y]</td>
                                <td style={{ padding: '6px' }}>[{positions.topLeft[0]}, {positions.topLeft[1]}]</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '6px' }}>topCenter</td>
                                <td style={{ padding: '6px', color: '#666' }}>[x + w/2, y]</td>
                                <td style={{ padding: '6px' }}>[{positions.topCenter[0]}, {positions.topCenter[1]}]</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '6px' }}>topRight</td>
                                <td style={{ padding: '6px', color: '#666' }}>[x + w, y]</td>
                                <td style={{ padding: '6px' }}>[{positions.topRight[0]}, {positions.topRight[1]}]</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '6px' }}>centerLeft</td>
                                <td style={{ padding: '6px', color: '#666' }}>[x, y + h/2]</td>
                                <td style={{ padding: '6px' }}>[{positions.centerLeft[0]}, {positions.centerLeft[1]}]</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee', background: '#fffde7' }}>
                                <td style={{ padding: '6px' }}><strong>center</strong></td>
                                <td style={{ padding: '6px', color: '#666' }}>[x + w/2, y + h/2]</td>
                                <td style={{ padding: '6px' }}><strong>[{positions.center[0]}, {positions.center[1]}]</strong></td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '6px' }}>centerRight</td>
                                <td style={{ padding: '6px', color: '#666' }}>[x + w, y + h/2]</td>
                                <td style={{ padding: '6px' }}>[{positions.centerRight[0]}, {positions.centerRight[1]}]</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '6px' }}>bottomLeft</td>
                                <td style={{ padding: '6px', color: '#666' }}>[x, y + h]</td>
                                <td style={{ padding: '6px' }}>[{positions.bottomLeft[0]}, {positions.bottomLeft[1]}]</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '6px' }}>bottomCenter</td>
                                <td style={{ padding: '6px', color: '#666' }}>[x + w/2, y + h]</td>
                                <td style={{ padding: '6px' }}>[{positions.bottomCenter[0]}, {positions.bottomCenter[1]}]</td>
                            </tr>
                            <tr style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '6px' }}>bottomRight</td>
                                <td style={{ padding: '6px', color: '#666' }}>[x + w, y + h]</td>
                                <td style={{ padding: '6px' }}>[{positions.bottomRight[0]}, {positions.bottomRight[1]}]</td>
                            </tr>
                            <tr>
                                <td style={{ padding: '6px' }}>origin</td>
                                <td style={{ padding: '6px', color: '#666' }}>[0, 0]</td>
                                <td style={{ padding: '6px' }}>[0, 0]</td>
                            </tr>
                        </tbody>
                    </table>
                </InfoBox>
            </Section>

            {/* 4. 使用示例 */}
            <H2 style={{ padding: '0 16px', marginTop: '24px' }}>4. 使用示例</H2>
            
            <Section>
                {/* 4.1 旋转动画 */}
                <H3 style={{ marginTop: '16px' }}>4.1 旋转动画 - 不同原点的效果</H3>
                <P>
                    使用 <code>elementBounds</code> 指定不同的旋转中心：
                </P>
                
                <div style={{ marginBottom: '12px' }}>
                    <div style={{ marginBottom: '8px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
                        <code style={{ fontSize: '13px' }}>origin: 'center'</code> - 绕中心旋转
                    </div>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={120} maxWidth="100%">
                        <image 
                            href={pic1} 
                            x={(viewBoxW - 60) / 2} 
                            y={30} 
                            width={60} 
                            height={60}
                        >
                            {genAnimateRotate({
                                origin: 'center',
                                elementBounds: { x: (viewBoxW - 60) / 2, y: 30, w: 60, h: 60 },
                                timeline: [{ timeSpanSec: 3, toValue: 360, keySplines: getEaseBezier({ isIn: true, isOut: true }) }],
                                loopCount: 0
                            })}
                        </image>
                    </PresetPreviewDisplayBlock>
                    <CodeBlock code={`genAnimateRotate({
  origin: 'center',
  elementBounds: { x: 100, y: 30, w: 60, h: 60 },
  timeline: [{ timeSpanSec: 3, toValue: 360 }],
  loopCount: 0
})`} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <div style={{ marginBottom: '8px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
                        <code style={{ fontSize: '13px' }}>origin: 'topLeft'</code> - 绕左上角旋转
                    </div>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={140} maxWidth="100%">
                        <image 
                            href={pic1} 
                            x={60} 
                            y={20} 
                            width={60} 
                            height={60}
                        >
                            {genAnimateRotate({
                                origin: 'topLeft',
                                elementBounds: { x: 60, y: 20, w: 60, h: 60 },
                                timeline: [{ timeSpanSec: 3, toValue: 360, keySplines: getEaseBezier({ isIn: true, isOut: true }) }],
                                loopCount: 0
                            })}
                        </image>
                    </PresetPreviewDisplayBlock>
                    <CodeBlock code={`genAnimateRotate({
  origin: 'topLeft',
  elementBounds: { x: 60, y: 20, w: 60, h: 60 },
  timeline: [{ timeSpanSec: 3, toValue: 360 }],
  loopCount: 0
})`} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <div style={{ marginBottom: '8px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
                        <code style={{ fontSize: '13px' }}>origin: 'bottomCenter'</code> - 绕底部中心旋转（钟摆效果）
                    </div>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={140} maxWidth="100%">
                        <image 
                            href={pic1} 
                            x={(viewBoxW - 60) / 2} 
                            y={20} 
                            width={60} 
                            height={60}
                        >
                            {genAnimateRotate({
                                initAngle: -30,
                                origin: 'bottomCenter',
                                elementBounds: { x: (viewBoxW - 60) / 2, y: 20, w: 60, h: 60 },
                                timeline: [
                                    { timeSpanSec: 1.5, toValue: 30, keySplines: getEaseBezier({ isIn: true, isOut: true }) },
                                    { timeSpanSec: 1.5, toValue: -30, keySplines: getEaseBezier({ isIn: true, isOut: true }) }
                                ],
                                loopCount: 0
                            })}
                        </image>
                    </PresetPreviewDisplayBlock>
                    <CodeBlock code={`genAnimateRotate({
  initAngle: -30,
  origin: 'bottomCenter',
  elementBounds: { x: 157, y: 20, w: 60, h: 60 },
  timeline: [
    { timeSpanSec: 1.5, toValue: 30 },
    { timeSpanSec: 1.5, toValue: -30 }
  ],
  loopCount: 0
})`} />
                </div>

                {/* 4.2 缩放动画 */}
                <H3 style={{ marginTop: '24px' }}>4.2 缩放动画 - 不同原点的效果</H3>
                <P>
                    使用 <code>elementBounds</code> 指定不同的缩放中心：
                </P>

                <div style={{ marginBottom: '12px' }}>
                    <div style={{ marginBottom: '8px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
                        <code style={{ fontSize: '13px' }}>origin: 'center'</code> - 从中心缩放
                    </div>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={120} maxWidth="100%">
                        <image 
                            href={pic1} 
                            x={(viewBoxW - 60) / 2} 
                            y={30} 
                            width={60} 
                            height={60}
                        >
                            {genAnimateScale({
                                origin: 'center',
                                elementBounds: { x: (viewBoxW - 60) / 2, y: 30, w: 60, h: 60 },
                                timeline: [
                                    { timeSpanSec: 1, toValue: 1.3, keySplines: getEaseBezier({ isIn: true, isOut: true }) },
                                    { timeSpanSec: 1, toValue: 1, keySplines: getEaseBezier({ isIn: true, isOut: true }) }
                                ],
                                loopCount: 0
                            })}
                        </image>
                    </PresetPreviewDisplayBlock>
                    <CodeBlock code={`genAnimateScale({
  origin: 'center',
  elementBounds: { x: 157, y: 30, w: 60, h: 60 },
  timeline: [
    { timeSpanSec: 1, toValue: 1.3 },
    { timeSpanSec: 1, toValue: 1 }
  ],
  loopCount: 0
})`} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <div style={{ marginBottom: '8px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
                        <code style={{ fontSize: '13px' }}>origin: 'topLeft'</code> - 从左上角缩放
                    </div>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={160} maxWidth="100%">
                        <image 
                            href={pic1} 
                            x={60} 
                            y={20} 
                            width={60} 
                            height={60}
                        >
                            {genAnimateScale({
                                origin: 'topLeft',
                                elementBounds: { x: 60, y: 20, w: 60, h: 60 },
                                timeline: [
                                    { timeSpanSec: 1, toValue: 1.5, keySplines: getEaseBezier({ isIn: true, isOut: true }) },
                                    { timeSpanSec: 1, toValue: 1, keySplines: getEaseBezier({ isIn: true, isOut: true }) }
                                ],
                                loopCount: 0
                            })}
                        </image>
                    </PresetPreviewDisplayBlock>
                    <CodeBlock code={`genAnimateScale({
  origin: 'topLeft',
  elementBounds: { x: 60, y: 20, w: 60, h: 60 },
  timeline: [
    { timeSpanSec: 1, toValue: 1.5 },
    { timeSpanSec: 1, toValue: 1 }
  ],
  loopCount: 0
})`} />
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <div style={{ marginBottom: '8px', padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
                        <code style={{ fontSize: '13px' }}>origin: 'bottomRight'</code> - 从右下角缩放
                    </div>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={160} maxWidth="100%">
                        <image 
                            href={pic1} 
                            x={240} 
                            y={20} 
                            width={60} 
                            height={60}
                        >
                            {genAnimateScale({
                                origin: 'bottomRight',
                                elementBounds: { x: 240, y: 20, w: 60, h: 60 },
                                timeline: [
                                    { timeSpanSec: 1, toValue: 1.5, keySplines: getEaseBezier({ isIn: true, isOut: true }) },
                                    { timeSpanSec: 1, toValue: 1, keySplines: getEaseBezier({ isIn: true, isOut: true }) }
                                ],
                                loopCount: 0
                            })}
                        </image>
                    </PresetPreviewDisplayBlock>
                    <CodeBlock code={`genAnimateScale({
  origin: 'bottomRight',
  elementBounds: { x: 240, y: 20, w: 60, h: 60 },
  timeline: [
    { timeSpanSec: 1, toValue: 1.5 },
    { timeSpanSec: 1, toValue: 1 }
  ],
  loopCount: 0
})`} />
                </div>
            </Section>

            {/* 5. CSS 辅助函数：getCenterRotateStyle() 和 getCenterScaleStyle() */}
            <H2 style={{ padding: '0 16px', marginTop: '24px' }}>5. CSS 辅助函数：快速实现中心变换</H2>
            
            <div style={{ padding: '0 16px' }}>
                <P>
                    如果你<strong>只需要中心点变换</strong>，且不想手动提供 <code>elementBounds</code>，可以使用 CSS 辅助函数：
                </P>

                <InfoBox type="info">
                    <p style={{ fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        💡 <strong>快捷方式：</strong><br/>
                        <code>getCenterRotateStyle()</code> - 旋转中心为元素中心<br/>
                        <code>getCenterScaleStyle()</code> - 缩放中心为元素中心<br/>
                        <span style={{ fontSize: '13px', color: '#666' }}>这两个函数通过 CSS 的 <code>transform-origin</code> 和 <code>transform-box</code> 实现中心变换</span>
                    </p>
                </InfoBox>

                <H3 style={{ marginTop: '16px' }}>5.1 getCenterRotateStyle() - 中心旋转</H3>
                <P>
                    使用 CSS 方式实现中心旋转，无需手动计算坐标。
                </P>

                <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginBottom: '12px' }}>
                    <p style={{ fontSize: '13px', margin: 0, marginBottom: '8px', fontWeight: 600 }}>函数返回值：</p>
                    <CodeBlock code={`{
  transformOrigin: 'center',
  transformBox: 'fill-box'
}`} />
                    <p style={{ fontSize: '12px', color: '#666', margin: 0, marginTop: '8px' }}>
                        • <code>transformOrigin: 'center'</code> - 设置变换原点为元素中心<br/>
                        • <code>transformBox: 'fill-box'</code> - 让原点计算基于元素的填充边界（而不是视口）
                    </p>
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={120} maxWidth="100%">
                        <g style={getCenterRotateStyle()}>
                            <image 
                                href={pic1} 
                                x={(viewBoxW - 60) / 2} 
                                y={30} 
                                width={60} 
                                height={60}
                            >
                                {genAnimateRotate({
                                    origin: 'center',
                                    timeline: [{ timeSpanSec: 3, toValue: 360, keySplines: getEaseBezier({ isIn: true, isOut: true }) }],
                                    loopCount: 0
                                })}
                            </image>
                        </g>
                    </PresetPreviewDisplayBlock>
                    <CodeBlock code={`// ✅ 简洁方式：使用 CSS 辅助函数
<g style={getCenterRotateStyle()}>
  <image href={pic1} x={157} y={30} width={60} height={60}>
    {genAnimateRotate({
      origin: 'center',  // 不需要 elementBounds
      timeline: [{ timeSpanSec: 3, toValue: 360 }],
      loopCount: 0
    })}
  </image>
</g>`} />
                </div>

                <H3 style={{ marginTop: '16px' }}>5.2 getCenterScaleStyle() - 中心缩放</H3>
                <P>
                    使用 CSS 方式实现中心缩放。
                </P>

                <div style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', marginBottom: '12px' }}>
                    <p style={{ fontSize: '13px', margin: 0, marginBottom: '8px', fontWeight: 600 }}>函数返回值：</p>
                    <CodeBlock code={`{
  transformOrigin: 'center',
  transformBox: 'fill-box'
}`} />
                    <p style={{ fontSize: '12px', color: '#666', margin: 0, marginTop: '8px' }}>
                        与 <code>getCenterRotateStyle()</code> 返回值相同，两者都是通过 CSS 设置变换原点为元素中心。
                    </p>
                </div>

                <div style={{ marginBottom: '12px' }}>
                    <CodeBlock code={`// ✅ 简洁方式：使用 CSS 辅助函数
<g style={getCenterScaleStyle()}>
  <image href={pic1} x={157} y={30} width={60} height={60}>
    {genAnimateScale({
      origin: 'center',  // 不需要 elementBounds
      timeline: [
        { timeSpanSec: 1, toValue: 1.3 },
        { timeSpanSec: 1, toValue: 1 }
      ],
      loopCount: 0
    })}
  </image>
</g>`} />
                </div>

                <H3 style={{ marginTop: '16px' }}>5.3 CSS 方式 vs ElementBounds 方式</H3>
                <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', border: '1px solid #ddd', marginTop: '12px' }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5' }}>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>对比项</th>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>CSS 方式<br/><code style={{ fontWeight: 'normal', fontSize: '11px' }}>getCenterRotateStyle()</code></th>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>ElementBounds 方式<br/><code style={{ fontWeight: 'normal', fontSize: '11px' }}>elementBounds + origin</code></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px', fontWeight: 600 }}>代码简洁度</td>
                            <td style={{ padding: '10px' }}>✅ 非常简洁，一行代码</td>
                            <td style={{ padding: '10px' }}>⚠️ 需要提供位置和尺寸信息</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px', fontWeight: 600 }}>支持的原点</td>
                            <td style={{ padding: '10px' }}>⚠️ 只支持 <code>center</code></td>
                            <td style={{ padding: '10px' }}>✅ 支持 10 种快捷位置 + 自定义坐标</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px', fontWeight: 600 }}>技术依赖</td>
                            <td style={{ padding: '10px' }}>⚠️ 依赖 CSS 支持</td>
                            <td style={{ padding: '10px' }}>✅ 纯 SVG，兼容性更好</td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px', fontWeight: 600 }}>精确控制</td>
                            <td style={{ padding: '10px' }}>⚠️ 由浏览器自动计算</td>
                            <td style={{ padding: '10px' }}>✅ 完全精确控制</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px', fontWeight: 600 }}>推荐场景</td>
                            <td style={{ padding: '10px' }}>快速原型、简单中心动画</td>
                            <td style={{ padding: '10px' }}>生产环境、复杂变换</td>
                        </tr>
                    </tbody>
                </table>

                <div style={{ background: '#fff3cd', padding: '12px', borderRadius: '4px', marginTop: '16px', border: '1px solid #ffc107' }}>
                    <p style={{ fontSize: '14px', margin: 0, lineHeight: '1.6' }}>
                        <strong>💡 选择建议：</strong><br/>
                        - 快速开发或只需要中心点变换：使用 <code>getCenterRotateStyle()</code> 或 <code>getCenterScaleStyle()</code><br/>
                        - 需要其他原点（如角落、边缘）或生产环境：使用 <code>elementBounds</code> 方式
                    </p>
                </div>
            </div>

            {/* 6. 哪些动画使用 ElementBounds */}
            <H2 style={{ padding: '0 16px', marginTop: '24px' }}>6. 哪些动画使用 ElementBounds？</H2>
            <div style={{ padding: '0 16px' }}>
                <div style={{ background: '#e8f5e9', padding: '12px', borderRadius: '4px', marginBottom: '12px' }}>
                    <ul style={{ fontSize: '14px', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                        <li><strong>旋转动画（genAnimateRotate）</strong> - 指定旋转中心</li>
                        <li><strong>缩放动画（genAnimateScale）</strong> - 指定缩放中心</li>
                        <li>未来可能支持：斜切动画（genAnimateSkewX/Y）</li>
                    </ul>
                </div>
            </div>

            {/* 7. 三种使用方式对比 */}
            <H2 style={{ padding: '0 16px', marginTop: '24px', marginBottom: '20px' }}>7. 三种使用方式对比</H2>
            <div style={{ padding: '0 16px', marginBottom: '20px' }}>
                <table style={{ width: '100%', fontSize: '13px', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                    <thead>
                        <tr style={{ background: '#f5f5f5' }}>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>方式</th>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>优点</th>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>缺点</th>
                            <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>适用场景</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>
                                <div><code>origin: 'center'</code></div>
                                <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>+ <code>elementBounds</code></div>
                            </td>
                            <td style={{ padding: '10px', fontSize: '12px' }}>
                                ✅ 纯 SVG 实现<br/>
                                ✅ 精确控制<br/>
                                ✅ 支持 9 种快捷位置
                            </td>
                            <td style={{ padding: '10px', fontSize: '12px' }}>
                                ⚠️ 需要提供尺寸信息
                            </td>
                            <td style={{ padding: '10px', fontSize: '12px' }}>
                                推荐使用
                            </td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '10px' }}>
                                <div><code>origin: 'center'</code></div>
                                <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>+ <code>getCenterRotateStyle()</code></div>
                            </td>
                            <td style={{ padding: '10px', fontSize: '12px' }}>
                                ✅ 代码简洁<br/>
                                ✅ 自适应元素大小
                            </td>
                            <td style={{ padding: '10px', fontSize: '12px' }}>
                                ⚠️ 依赖 CSS<br/>
                                ⚠️ 只支持 center
                            </td>
                            <td style={{ padding: '10px', fontSize: '12px' }}>
                                快速原型
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '10px' }}>
                                <code>origin: [x, y]</code>
                            </td>
                            <td style={{ padding: '10px', fontSize: '12px' }}>
                                ✅ 完全自定义
                            </td>
                            <td style={{ padding: '10px', fontSize: '12px' }}>
                                ⚠️ 需手动计算坐标
                            </td>
                            <td style={{ padding: '10px', fontSize: '12px' }}>
                                特殊需求
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </SectionEx>
    );
};

const preset: DocumentExport = {
    title: "元素边界ElementBounds",
    jsx: <Article />
};

export default preset;

