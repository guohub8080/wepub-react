/**
 * genAnimateOpacity 核心函数
 */

import React from 'react';
import { isUndefined } from 'lodash';
import { genSvgKeySplines, SvgTimelineSegment } from '@pub-utils/genSvgKeySplines';
import { OpacityAnimationConfig } from './types.ts';
import byDefault from '@utils/common/byDefault';
import { getEaseBezier } from '@pub-utils/getBezier';

/**
 * 生成不透明度动画的 animate React 元素
 * 使用时间线配置方式，支持复杂的多段动画
 * 
 * @returns 返回 React <animate> 元素
 * @example
 * ```tsx
 * // 简单的淡入淡出
 * genAnimateOpacity({
 *   initOpacity: 1,
 *   timeline: [
 *     { durationSeconds: 1, toOpacity: 0 },  // 淡出
 *     { durationSeconds: 1, toOpacity: 1 }   // 淡入
 *   ],
 *   loopCount: 0
 * })
 * 
 * // 闪烁效果
 * genAnimateOpacity({
 *   initOpacity: 1,
 *   timeline: [
 *     { durationSeconds: 0.5, toOpacity: 0 },
 *     { durationSeconds: 0.5, toOpacity: 1 }
 *   ],
 *   loopCount: 0
 * })
 * 
 * // 保持不透明度（延迟效果）
 * genAnimateOpacity({
 *   initOpacity: 1,
 *   timeline: [
 *     { durationSeconds: 1, toOpacity: 0 },    // 淡出
 *     { durationSeconds: 2 },                   // 保持 2 秒
 *     { durationSeconds: 1, toOpacity: 1 }     // 淡入
 *   ],
 *   loopCount: 0
 * })
 * 
 * // 自定义缓动（线性淡出）
 * genAnimateOpacity({
 *   timeline: [
 *     { durationSeconds: 2, toOpacity: 0, keySplines: '0 0 1 1' }
 *   ]
 * })
 * ```
 */
export function genAnimateOpacity(config: OpacityAnimationConfig) {
  const {
    initOpacity = 1,
    timeline,
    delay = 0,
    isBeginWithClick = false,
    calcMode,
    freeze = false,
    loopCount = 1,
  } = config;

  // 参数验证
  if (!timeline || !Array.isArray(timeline) || timeline.length === 0) {
    throw new Error('timeline 必须是非空数组');
  }

  // 构建完整的不透明度序列
  const opacities: number[] = [initOpacity];
  let lastOpacity = initOpacity;

  timeline.forEach((segment) => {
    const newOpacity = !isUndefined(segment.toValue) ? segment.toValue : lastOpacity;
    opacities.push(newOpacity);
    lastOpacity = newOpacity;
  });

  // 计算总时长
  const totalDuration = timeline.reduce((sum, segment) => sum + segment.durationSeconds, 0);

  // 使用 genSvgKeySplines 生成动画参数
  const opacityTimeline: SvgTimelineSegment[] = timeline.map((segment, index) => ({
    keySplines: byDefault(segment.keySplines, getEaseBezier({ isIn: true, isOut: true })),
    toValue: opacities[index + 1],
    durationSeconds: segment.durationSeconds,
  }));

  const opacityKeys = genSvgKeySplines({
    initValue: initOpacity,
    timeline: opacityTimeline,
  });

  // 确定 calcMode
  const hasKeySplines = timeline.some(seg => seg.keySplines);
  const finalCalcMode = byDefault(calcMode, hasKeySplines ? 'spline' : 'linear');

  // 处理 begin 属性
  const beginValue = isBeginWithClick 
    ? (delay !== 0 ? `click+${delay}s` : 'click')
    : (delay !== 0 ? `${delay}s` : undefined);

  // 处理 repeatCount
  const repeatCountValue = loopCount === 0 ? 'indefinite' : loopCount;

  return (
    <animate
      attributeName="opacity"
      values={opacityKeys.values}
      keyTimes={opacityKeys.keyTimes}
      keySplines={finalCalcMode === 'spline' ? opacityKeys.keySplines : undefined}
      dur={`${totalDuration}s`}
      calcMode={finalCalcMode}
      repeatCount={repeatCountValue}
      begin={beginValue}
      fill={freeze ? 'freeze' : 'remove'}
    />
  );
}

