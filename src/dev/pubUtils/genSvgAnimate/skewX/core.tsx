/**
 * genAnimateSkewX 核心函数
 */

import React from 'react';
import { isUndefined } from 'lodash';
import { genSvgKeySplines, SvgTimelineSegment } from '@pub-utils/genSvgKeySplines';
import { SkewXAnimationConfig } from './types.ts';
import byDefault from '@utils/common/byDefault';
import { getEaseBezier } from '@pub-utils/getBezier';

/**
 * 生成水平斜切动画的 animateTransform React 元素
 * 使用时间线配置方式，支持复杂的多段动画
 * 
 * @returns 返回 React <animateTransform> 元素
 * @example
 * ```tsx
 * // 简单的水平斜切
 * genAnimateSkewX({
 *   timeline: [
 *     { durationSeconds: 1, toAngle: 20 },
 *     { durationSeconds: 1, toAngle: 0 }
 *   ],
 *   loopCount: 0
 * })
 * 
 * // 左右摇摆效果
 * genAnimateSkewX({
 *   initAngle: -15,
 *   timeline: [
 *     { durationSeconds: 1, toAngle: 15 },
 *     { durationSeconds: 1, toAngle: -15 }
 *   ],
 *   loopCount: 0
 * })
 * ```
 */
export function genAnimateSkewX(config: SkewXAnimationConfig) {
  const {
    initAngle = 0,
    timeline,
    delay = 0,
    additive = true,
    isBeginWithClick = false,
    calcMode,
    freeze = false,
    loopCount = 1,
  } = config;

  // 参数验证
  if (!timeline || !Array.isArray(timeline) || timeline.length === 0) {
    throw new Error('timeline 必须是非空数组');
  }

  // 构建完整的角度序列
  const angles: number[] = [initAngle];
  let lastAngle = initAngle;

  timeline.forEach((segment) => {
    const newAngle = !isUndefined(segment.toValue) ? segment.toValue : lastAngle;
    angles.push(newAngle);
    lastAngle = newAngle;
  });

  // 计算总时长
  const totalDuration = timeline.reduce((sum, segment) => sum + segment.durationSeconds, 0);

  // 使用 genSvgKeySplines 生成动画参数
  const angleTimeline: SvgTimelineSegment[] = timeline.map((segment, index) => ({
    keySplines: byDefault(segment.keySplines, getEaseBezier({ isIn: true, isOut: true })),
    toValue: angles[index + 1],
    durationSeconds: segment.durationSeconds,
  }));

  const angleKeys = genSvgKeySplines({
    initValue: initAngle,
    timeline: angleTimeline,
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
    <animateTransform
      attributeName="transform"
      type="skewX"
      values={angleKeys.values}
      keyTimes={angleKeys.keyTimes}
      keySplines={finalCalcMode === 'spline' ? angleKeys.keySplines : undefined}
      dur={`${totalDuration}s`}
      calcMode={finalCalcMode}
      repeatCount={repeatCountValue}
      begin={beginValue}
      fill={freeze ? 'freeze' : 'remove'}
      additive={additive ? 'sum' : undefined}
    />
  );
}

