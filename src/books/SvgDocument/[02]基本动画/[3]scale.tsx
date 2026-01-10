import React, { useState } from "react";
import { DocumentExport } from "../data/svgDocumentLoader.tsx";
import SectionEx from "@dev/pubComponents/PureHTML/basicEx/SectionEx.tsx";
import { genAnimateScale } from "@dev/pubComponents/PubUtils/genSvgAnimateTransform/genAnimateScale";
import { 
    getEaseBezier, 
    getLinearBezier, 
    getPowerBezier, 
    getCircleBezier, 
    getExpoBezier, 
    getSineBezier 
} from "@dev/pubComponents/PubUtils/getBezier";
import {
    CodeBlock,
    PresetPreviewDisplayBlock,
    ControlPanel,
    ControlRow,
    Section,
    H1,
    H2,
    P,
    Description
} from "../data/components";
import pic1 from "../data/assets/1.png";
import { Slider, Select, Switch, Radio, InputNumber } from "antd";

const Article = () => {
    const viewBoxW = 375;

    // 统一使用更大的视觉图尺寸（宽约为画布宽的 1/4），并为每段预览设置合适高度
    const imgSizeBase = Math.floor(viewBoxW / 4);
    const basePadding = 10;

    // 示例1：基础缩放（交互式） - 独立控制
    const [scaleDuration1, setScaleDuration1] = useState(2);
    const [easingType1, setEasingType1] = useState<'linear' | 'ease' | 'power' | 'circle' | 'expo' | 'sine'>('ease');
    const [easeIn1, setEaseIn1] = useState(true);
    const [easeOut1, setEaseOut1] = useState(true);
    const [powerValue1, setPowerValue1] = useState<1 | 2 | 3 | 4 | 5>(3);
    const imgSize1 = imgSizeBase;
    const maxScale1 = 1.5; // 本段最大缩放，确保不裁剪
    const viewBoxH1 = Math.ceil(imgSize1 * maxScale1 + basePadding * 2);
    const imgX1 = (viewBoxW - imgSize1) / 2;
    const imgY1 = (viewBoxH1 - imgSize1) / 2;

    // 示例2：呼吸缩放（循环） - 独立控制
    const [scaleDuration2, setScaleDuration2] = useState(1.5);
    const [easingType2, setEasingType2] = useState<'linear' | 'ease' | 'power' | 'circle' | 'expo' | 'sine'>('ease');
    const [easeIn2, setEaseIn2] = useState(true);
    const [easeOut2, setEaseOut2] = useState(true);
    const [powerValue2, setPowerValue2] = useState<1 | 2 | 3 | 4 | 5>(3);
    const imgSize2 = imgSizeBase;
    const maxScale2 = 1.2; // 呼吸最大缩放
    const viewBoxH2 = Math.ceil(imgSize2 * maxScale2 + basePadding * 2);
    const imgX2 = (viewBoxW - imgSize2) / 2;
    const imgY2 = (viewBoxH2 - imgSize2) / 2;

    // 示例3：自定义缩放原点 - 独立控制
    const [scaleDuration3, setScaleDuration3] = useState(1.5);
    const [origin3, setOrigin3] = useState<'center' | 'origin' | 'topLeft' | 'topCenter' | 'topRight' | 'centerLeft' | 'centerRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'custom'>('topCenter');
    const [customX3, setCustomX3] = useState(0);
    const [customY3, setCustomY3] = useState(0);
    const imgSize3 = imgSizeBase;
    const maxScale3 = 1.8; // 从顶部展开效果
    const viewBoxH3 = Math.ceil(imgSize3 * maxScale3 + basePadding * 2);
    const imgX3 = (viewBoxW - imgSize3) / 2;
    const imgY3 = basePadding;

    // 辅助：根据缓动类型获取 keySplines
    const getKeySplinesBy = (
        type: 'linear' | 'ease' | 'power' | 'circle' | 'expo' | 'sine',
        isIn: boolean,
        isOut: boolean,
        power: 1 | 2 | 3 | 4 | 5
    ) => {
        switch (type) {
            case 'linear':
                return getLinearBezier();
            case 'ease':
                return getEaseBezier({ isIn, isOut });
            case 'power':
                return getPowerBezier({ power, isIn, isOut });
            case 'circle':
                return getCircleBezier({ isIn, isOut });
            case 'expo':
                return getExpoBezier({ isIn, isOut });
            case 'sine':
                return getSineBezier({ isIn, isOut });
            default:
                return getLinearBezier();
        }
    };

    const genKeySplineCodeBy = (
        type: 'linear' | 'ease' | 'power' | 'circle' | 'expo' | 'sine',
        isIn: boolean,
        isOut: boolean,
        power: 1 | 2 | 3 | 4 | 5
    ) => {
        switch (type) {
            case 'linear':
                return 'getLinearBezier()';
            case 'ease':
                return `getEaseBezier({ isIn: ${isIn}, isOut: ${isOut} })`;
            case 'power':
                return `getPowerBezier({ power: ${power}, isIn: ${isIn}, isOut: ${isOut} })`;
            case 'circle':
                return `getCircleBezier({ isIn: ${isIn}, isOut: ${isOut} })`;
            case 'expo':
                return `getExpoBezier({ isIn: ${isIn}, isOut: ${isOut} })`;
            case 'sine':
                return `getSineBezier({ isIn: ${isIn}, isOut: ${isOut} })`;
            default:
                return 'getLinearBezier()';
        }
    };

    return (
        <SectionEx>
            <H1>缩放动画 Scale</H1>
            <Section>
                <Description style={{ marginTop: '8px' }}>
                    通过改变元素的缩放来实现放大/缩小效果，支持循环呼吸等常见动效
                </Description>
            </Section>

            {/* 示例1：基础缩放（交互式） */}
            <H2 style={{ marginTop: '20px' }}>1. 基础缩放（交互式）</H2>
            <Section style={{ marginTop: '16px' }}>
                <P style={{ marginBottom: '8px' }}>从 1 → 1.5 → 1</P>

                <ControlPanel>
                    <ControlRow label={`时长: ${scaleDuration1.toFixed(1)}s`}>
                        <Slider min={0.5} max={5} step={0.1} value={scaleDuration1} onChange={setScaleDuration1} style={{ flex: 1, minWidth: '120px' }} />
                    </ControlRow>
                    <ControlRow label="缓动函数:">
                        <Select value={easingType1} onChange={setEasingType1} style={{ flex: 1 }}
                            options={[
                                { value: 'linear', label: 'Linear（线性）' },
                                { value: 'ease', label: 'Ease（基础缓动）' },
                                { value: 'power', label: 'Power（强力缓动）' },
                                { value: 'circle', label: 'Circle（圆形缓动）' },
                                { value: 'expo', label: 'Expo（指数缓动）' },
                                { value: 'sine', label: 'Sine（正弦缓动）' }
                            ]}
                        />
                    </ControlRow>
                    {easingType1 !== 'linear' && (
                        <ControlRow>
                            <div style={{ flex: 1, display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <span>Ease In</span>
                                <Switch size="small" checked={easeIn1} onChange={setEaseIn1} />
                                <span>Ease Out</span>
                                <Switch size="small" checked={easeOut1} onChange={setEaseOut1} />
                            </div>
                        </ControlRow>
                    )}
                    {easingType1 === 'power' && (
                        <ControlRow label="Power:">
                            <Radio.Group size="small" value={powerValue1} onChange={(e) => setPowerValue1(e.target.value)} optionType="button" buttonStyle="solid">
                                <Radio.Button value={1}>1</Radio.Button>
                                <Radio.Button value={2}>2</Radio.Button>
                                <Radio.Button value={3}>3</Radio.Button>
                                <Radio.Button value={4}>4</Radio.Button>
                                <Radio.Button value={5}>5</Radio.Button>
                            </Radio.Group>
                        </ControlRow>
                    )}
                </ControlPanel>

                <div key={`scale-basic-${scaleDuration1}-${easingType1}-${easeIn1}-${easeOut1}-${powerValue1}`}>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={viewBoxH1} maxWidth={"none"}>
                        <image 
                            href={pic1} 
                            x={imgX1} 
                            y={imgY1} 
                            width={imgSize1} 
                            height={imgSize1}
                        >
                            {genAnimateScale({
                                initScale: 1,
                                origin: 'center',
                                elementBounds: { x: imgX1, y: imgY1, w: imgSize1, h: imgSize1 },
                                timeline: [
                                    { timeSpanSec: scaleDuration1, toValue: 1.5, keySplines: getKeySplinesBy(easingType1, easeIn1, easeOut1, powerValue1) },
                                    { timeSpanSec: scaleDuration1, toValue: 1, keySplines: getKeySplinesBy(easingType1, easeIn1, easeOut1, powerValue1) }
                                ],
                                loopCount: 0,
                                additive: false
                            })}
                        </image>
                    </PresetPreviewDisplayBlock>
                </div>

                <CodeBlock code={`genAnimateScale({
  initScale: 1,
  origin: 'center',
  elementBounds: { x: ${imgX1.toFixed(1)}, y: ${imgY1.toFixed(1)}, w: ${imgSize1}, h: ${imgSize1} },
  timeline: [
    { timeSpanSec: ${scaleDuration1.toFixed(1)}, toValue: 1.5, keySplines: ${genKeySplineCodeBy(easingType1, easeIn1, easeOut1, powerValue1)} },
    { timeSpanSec: ${scaleDuration1.toFixed(1)}, toValue: 1, keySplines: ${genKeySplineCodeBy(easingType1, easeIn1, easeOut1, powerValue1)} }
  ],
  loopCount: 0,
  additive: false
})`} />
            </Section>

            {/* 示例2：呼吸缩放（循环） */}
            <H2 style={{ marginTop: '24px' }}>2. 呼吸缩放（循环）</H2>
            <Section style={{ marginTop: '16px', marginBottom: '20px' }}>
                <P style={{ marginBottom: '8px' }}>1 → 1.2 → 1，repeatCount="indefinite"</P>

                <ControlPanel>
                    <ControlRow label={`半程时长: ${scaleDuration2.toFixed(1)}s`}>
                        <Slider min={0.5} max={5} step={0.1} value={scaleDuration2} onChange={setScaleDuration2} style={{ flex: 1, minWidth: '120px' }} />
                    </ControlRow>
                    <ControlRow label="缓动函数:">
                        <Select value={easingType2} onChange={setEasingType2} style={{ flex: 1 }}
                            options={[
                                { value: 'linear', label: 'Linear（线性）' },
                                { value: 'ease', label: 'Ease（基础缓动）' },
                                { value: 'power', label: 'Power（强力缓动）' },
                                { value: 'circle', label: 'Circle（圆形缓动）' },
                                { value: 'expo', label: 'Expo（指数缓动）' },
                                { value: 'sine', label: 'Sine（正弦缓动）' }
                            ]}
                        />
                    </ControlRow>
                    {easingType2 !== 'linear' && (
                        <ControlRow>
                            <div style={{ flex: 1, display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <span>Ease In</span>
                                <Switch size="small" checked={easeIn2} onChange={setEaseIn2} />
                                <span>Ease Out</span>
                                <Switch size="small" checked={easeOut2} onChange={setEaseOut2} />
                            </div>
                        </ControlRow>
                    )}
                    {easingType2 === 'power' && (
                        <ControlRow label="Power:">
                            <Radio.Group size="small" value={powerValue2} onChange={(e) => setPowerValue2(e.target.value)} optionType="button" buttonStyle="solid">
                                <Radio.Button value={1}>1</Radio.Button>
                                <Radio.Button value={2}>2</Radio.Button>
                                <Radio.Button value={3}>3</Radio.Button>
                                <Radio.Button value={4}>4</Radio.Button>
                                <Radio.Button value={5}>5</Radio.Button>
                            </Radio.Group>
                        </ControlRow>
                    )}
                </ControlPanel>

                <div key={`scale-breathe-${scaleDuration2}-${easingType2}-${easeIn2}-${easeOut2}-${powerValue2}`}>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={viewBoxH2} maxWidth={"none"}>
                        <image 
                            href={pic1} 
                            x={imgX2} 
                            y={imgY2} 
                            width={imgSize2} 
                            height={imgSize2}
                        >
                            {genAnimateScale({
                                initScale: 1,
                                origin: 'center',
                                elementBounds: { x: imgX2, y: imgY2, w: imgSize2, h: imgSize2 },
                                timeline: [
                                    { timeSpanSec: scaleDuration2, toValue: 1.2, keySplines: getKeySplinesBy(easingType2, easeIn2, easeOut2, powerValue2) },
                                    { timeSpanSec: scaleDuration2, toValue: 1, keySplines: getKeySplinesBy(easingType2, easeIn2, easeOut2, powerValue2) }
                                ],
                                loopCount: 0,
                                additive: false
                            })}
                        </image>
                    </PresetPreviewDisplayBlock>
                </div>

                <CodeBlock code={`genAnimateScale({
  initScale: 1,
  origin: 'center',
  elementBounds: { x: ${imgX2.toFixed(1)}, y: ${imgY2.toFixed(1)}, w: ${imgSize2}, h: ${imgSize2} },
  timeline: [
    { timeSpanSec: ${scaleDuration2.toFixed(1)}, toValue: 1.2, keySplines: ${genKeySplineCodeBy(easingType2, easeIn2, easeOut2, powerValue2)} },
    { timeSpanSec: ${scaleDuration2.toFixed(1)}, toValue: 1, keySplines: ${genKeySplineCodeBy(easingType2, easeIn2, easeOut2, powerValue2)} }
  ],
  loopCount: 0,
  additive: false
})`} />
            </Section>

            {/* 示例3：自定义缩放原点 */}
            <H2 style={{ marginTop: '24px' }}>3. 自定义缩放原点</H2>
            <Section style={{ marginTop: '16px', marginBottom: '20px' }}>
                <P style={{ marginBottom: '8px' }}>从指定位置展开/收缩，支持 9 种快捷位置 + 自定义坐标</P>

                <ControlPanel>
                    <ControlRow label={`时长: ${scaleDuration3.toFixed(1)}s`}>
                        <Slider min={0.5} max={5} step={0.1} value={scaleDuration3} onChange={setScaleDuration3} style={{ flex: 1, minWidth: '120px' }} />
                    </ControlRow>
                    <ControlRow label="缩放原点:">
                        <Select value={origin3} onChange={setOrigin3} style={{ flex: 1 }}
                            options={[
                                { value: 'center', label: 'Center（中心）' },
                                { value: 'origin', label: 'Origin（坐标原点 0,0）' },
                                { value: 'topLeft', label: 'Top Left（左上角）' },
                                { value: 'topCenter', label: 'Top Center（顶部中心）' },
                                { value: 'topRight', label: 'Top Right（右上角）' },
                                { value: 'centerLeft', label: 'Center Left（左侧中心）' },
                                { value: 'centerRight', label: 'Center Right（右侧中心）' },
                                { value: 'bottomLeft', label: 'Bottom Left（左下角）' },
                                { value: 'bottomCenter', label: 'Bottom Center（底部中心）' },
                                { value: 'bottomRight', label: 'Bottom Right（右下角）' },
                                { value: 'custom', label: 'Custom（自定义坐标）' },
                            ]}
                        />
                    </ControlRow>
                    {origin3 === 'custom' && (
                        <ControlRow>
                            <div style={{ flex: 1, display: 'flex', gap: '12px', alignItems: 'center' }}>
                                <span style={{ minWidth: '30px' }}>X:</span>
                                <InputNumber value={customX3} onChange={(v) => setCustomX3(v || 0)} style={{ width: '100px' }} step={1} />
                                <span style={{ minWidth: '30px' }}>Y:</span>
                                <InputNumber value={customY3} onChange={(v) => setCustomY3(v || 0)} style={{ width: '100px' }} step={1} />
                            </div>
                        </ControlRow>
                    )}
                </ControlPanel>

                <div key={`scale-origin-${scaleDuration3}-${origin3}-${customX3}-${customY3}`}>
                    <PresetPreviewDisplayBlock viewBoxW={viewBoxW} viewBoxH={viewBoxH3} maxWidth={"none"}>
                        <image 
                            href={pic1} 
                            x={imgX3} 
                            y={imgY3} 
                            width={imgSize3} 
                            height={imgSize3}
                        >
                            {genAnimateScale({
                                initScale: 1,
                                origin: origin3 === 'custom' ? [customX3, customY3] : origin3,
                                elementBounds: origin3 !== 'custom' && origin3 !== 'origin'
                                    ? { x: imgX3, y: imgY3, w: imgSize3, h: imgSize3 }
                                    : undefined,
                                timeline: [
                                    { timeSpanSec: scaleDuration3, toValue: 1.8 },
                                    { timeSpanSec: scaleDuration3, toValue: 1 }
                                ],
                                loopCount: 0,
                                additive: false
                            })}
                        </image>
                    </PresetPreviewDisplayBlock>
                </div>

                <CodeBlock code={`genAnimateScale({
  initScale: 1,
  origin: ${origin3 === 'custom' ? `[${customX3}, ${customY3}]` : `'${origin3}'`},${origin3 !== 'custom' && origin3 !== 'origin' ? `
  elementBounds: { x: ${imgX3}, y: ${imgY3}, w: ${imgSize3}, h: ${imgSize3} },` : ''}
  timeline: [
    { timeSpanSec: ${scaleDuration3.toFixed(1)}, toValue: 1.8 },
    { timeSpanSec: ${scaleDuration3.toFixed(1)}, toValue: 1 }
  ],
  loopCount: 0,
  additive: false
})`} />
            </Section>

            {/* 关于 elementBounds 参数 */}
            <H2 style={{ marginTop: '24px' }}>关于 elementBounds 参数</H2>
            <Section style={{ fontSize: '14px', color: '#333', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '12px' }}>
                    <code>elementBounds</code> 是一个对象，用于描述元素在 SVG 画布中的位置和尺寸：
                </p>
                <CodeBlock code={`elementBounds: {
  x: 100,    // 元素左上角的 X 坐标
  y: 50,     // 元素左上角的 Y 坐标
  w: 200,    // 元素的宽度
  h: 150     // 元素的高度
}`} />
                <p style={{ marginTop: '16px', marginBottom: '12px' }}>
                    <strong>作用：</strong>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                    <li>提供元素的位置和尺寸信息</li>
                    <li>工具函数根据这些信息自动计算快捷位置的实际坐标</li>
                    <li>例如：<code>origin: 'topCenter'</code> 会自动计算为 <code>[x + w/2, y]</code></li>
                </ul>
                <p style={{ marginTop: '16px', marginBottom: '12px' }}>
                    <strong>何时需要提供：</strong>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                    <li>✅ <strong>必须提供：</strong>使用快捷位置时（topCenter、bottomLeft 等）</li>
                    <li>✅ <strong>推荐提供：</strong>origin 为 'center' 时（纯 SVG 实现，无需 CSS）</li>
                </ul>
                <p style={{ marginTop: '16px', marginBottom: '12px' }}>
                    <strong>何时可以省略：</strong>
                </p>
                <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                    <li>⭕ origin 为 'origin' 时（固定在坐标原点 [0, 0]）</li>
                    <li>⭕ origin 为 [x, y] 数组时（已手动指定具体坐标）</li>
                    <li>⭕ origin 为 'center' 且配合 <code>getCenterScaleStyle()</code> 使用 CSS 时</li>
                </ul>
                <p style={{ marginTop: '12px', padding: '12px', background: '#f0f9ff', borderRadius: '4px', borderLeft: '4px solid #0ea5e9' }}>
                    💡 <strong>示例：</strong>假设图片位于 (100, 50)，尺寸为 200×150：
                    <br />• origin: 'center' → 自动计算为 [200, 125]（中心点）
                    <br />• origin: 'topCenter' → 自动计算为 [200, 50]（顶部中心）
                    <br />• origin: 'bottomRight' → 自动计算为 [300, 200]（右下角）
                </p>
            </Section>

            {/* 关于 getCenterScaleStyle() 函数 */}
            <H2 style={{ marginTop: '24px' }}>关于 getCenterScaleStyle() 函数</H2>
            <Section style={{ fontSize: '14px', color: '#333', lineHeight: '1.8' }}>
                <p style={{ marginBottom: '12px' }}>
                    <code>getCenterScaleStyle()</code> 是一个便捷函数，返回一个样式对象，让缩放动画以元素中心为原点。
                </p>
                <CodeBlock code={`import { genAnimateScale, getCenterScaleStyle } from '@pub-utils/genSvgAnimateTransform/genAnimateScale';

<image 
  href={pic1} 
  x={100} 
  y={50} 
  width={200} 
  height={150}
  style={getCenterScaleStyle()}  // 添加这个样式
>
  {genAnimateScale({ 
    timeline: [{ timeSpanSec: 1, toValue: 1.5 }] 
  })}
</image>`} />
                <p style={{ marginTop: '16px', marginBottom: '12px' }}>
                    <strong>两种方法的区别：</strong>
                </p>
                <div style={{ marginLeft: '20px', marginBottom: '12px' }}>
                    <p style={{ marginBottom: '8px' }}><strong>方法1：CSS 方式（getCenterScaleStyle）</strong></p>
                    <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                        <li>✅ 代码简洁，只需添加 <code>style</code> 属性</li>
                        <li>❌ 只能实现中心缩放，不支持其他位置</li>
                        <li>⚠️ 依赖 CSS <code>transform-origin</code> 支持</li>
                        <li>📌 推荐场景：简单的中心缩放动画</li>
                    </ul>

                    <p style={{ marginBottom: '8px' }}><strong>方法2：SVG 方式（elementBounds）</strong></p>
                    <ul style={{ marginLeft: '20px', marginBottom: '12px' }}>
                        <li>✅ 支持任意缩放位置（topCenter、bottomLeft 等）</li>
                        <li>✅ 纯 SVG 实现，兼容性好</li>
                        <li>❌ 需要手动提供元素位置和尺寸信息</li>
                        <li>📌 推荐场景：复杂动画、需要指定缩放原点位置</li>
                    </ul>
                </div>
                <p style={{ marginTop: '12px', padding: '12px', background: '#f0f9ff', borderRadius: '4px', borderLeft: '4px solid #0ea5e9' }}>
                    💡 <strong>建议：</strong>如果只是简单的中心缩放，用 <code>getCenterScaleStyle()</code>；如果需要从其他位置展开（如顶部中心下拉、左侧向右展开），用 <code>elementBounds</code>。
                </p>
            </Section>
        </SectionEx>
    );
};

const preset: DocumentExport = {
  title: "缩放动画 Scale",
  jsx: <Article />
};

export default preset;


