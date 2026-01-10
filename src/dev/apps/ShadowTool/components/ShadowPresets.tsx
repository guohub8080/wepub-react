import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/components/ui/card';
import { Button } from '@shadcn/components/ui/button';
import { useShadowStore } from '../store/useShadowStore';

// 阴影预设（包含颜色和透明度）
const shadowPresets = [
  // 基础
  {
    name: '无阴影',
    category: '基础',
    config: { offsetX: 0, offsetY: 0, blur: 0, spread: 0, color: 'rgba(0, 0, 0, 0)' }
  },
  {
    name: '极轻微',
    category: '基础',
    config: { offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: 'rgba(0, 0, 0, 0.05)' }
  },
  {
    name: '轻微',
    category: '基础',
    config: { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: 'rgba(0, 0, 0, 0.08)' }
  },
  {
    name: '中等',
    category: '基础',
    config: { offsetX: 0, offsetY: 4, blur: 8, spread: 0, color: 'rgba(0, 0, 0, 0.1)' }
  },
  {
    name: '明显',
    category: '基础',
    config: { offsetX: 0, offsetY: 6, blur: 12, spread: 0, color: 'rgba(0, 0, 0, 0.12)' }
  },

  // 框架标准
  {
    name: 'TW sm',
    category: '框架标准',
    config: { offsetX: 0, offsetY: 1, blur: 2, spread: 0, color: 'rgba(0, 0, 0, 0.05)' }
  },
  {
    name: 'TW md',
    category: '框架标准',
    config: { offsetX: 0, offsetY: 4, blur: 6, spread: -1, color: 'rgba(0, 0, 0, 0.1)' }
  },
  {
    name: 'TW lg',
    category: '框架标准',
    config: { offsetX: 0, offsetY: 10, blur: 15, spread: -3, color: 'rgba(0, 0, 0, 0.1)' }
  },
  {
    name: 'TW xl',
    category: '框架标准',
    config: { offsetX: 0, offsetY: 20, blur: 25, spread: -5, color: 'rgba(0, 0, 0, 0.1)' }
  },
  {
    name: 'TW 2xl',
    category: '框架标准',
    config: { offsetX: 0, offsetY: 25, blur: 50, spread: -12, color: 'rgba(0, 0, 0, 0.25)' }
  },
  {
    name: 'Material1',
    category: '框架标准',
    config: { offsetX: 0, offsetY: 2, blur: 4, spread: 0, color: 'rgba(0, 0, 0, 0.14)' }
  },
  {
    name: 'Material2',
    category: '框架标准',
    config: { offsetX: 0, offsetY: 3, blur: 6, spread: 0, color: 'rgba(0, 0, 0, 0.16)' }
  },
  {
    name: 'Material3',
    category: '框架标准',
    config: { offsetX: 0, offsetY: 10, blur: 20, spread: 0, color: 'rgba(0, 0, 0, 0.19)' }
  },
  {
    name: 'Material4',
    category: '框架标准',
    config: { offsetX: 0, offsetY: 14, blur: 28, spread: 0, color: 'rgba(0, 0, 0, 0.22)' }
  },

  // 常用场景
  {
    name: '卡片',
    category: '常用',
    config: { offsetX: 0, offsetY: 2, blur: 8, spread: 0, color: 'rgba(0, 0, 0, 0.1)' }
  },
  {
    name: '按钮',
    category: '常用',
    config: { offsetX: 0, offsetY: 1, blur: 3, spread: 0, color: 'rgba(0, 0, 0, 0.15)' }
  },
  {
    name: '浮动',
    category: '常用',
    config: { offsetX: 0, offsetY: 8, blur: 16, spread: 0, color: 'rgba(0, 0, 0, 0.1)' }
  },
  {
    name: '弹窗',
    category: '常用',
    config: { offsetX: 0, offsetY: 12, blur: 40, spread: -5, color: 'rgba(0, 0, 0, 0.2)' }
  },
  {
    name: '强烈',
    category: '常用',
    config: { offsetX: 0, offsetY: 12, blur: 24, spread: 0, color: 'rgba(0, 0, 0, 0.2)' }
  },
  {
    name: '内凹',
    category: '常用',
    config: { offsetX: 0, offsetY: 2, blur: 4, spread: -1, color: 'rgba(0, 0, 0, 0.15)' }
  },

  // 特殊效果
  {
    name: '发光',
    category: '特效',
    config: { offsetX: 0, offsetY: 0, blur: 20, spread: 5, color: 'rgba(0, 0, 0, 0.15)' }
  },
  {
    name: '锐利',
    category: '特效',
    config: { offsetX: 0, offsetY: 4, blur: 0, spread: 0, color: 'rgba(0, 0, 0, 0.2)' }
  },
  {
    name: '底部加深',
    category: '特效',
    config: { offsetX: 0, offsetY: 8, blur: 12, spread: -4, color: 'rgba(0, 0, 0, 0.15)' }
  },
  {
    name: '环绕',
    category: '特效',
    config: { offsetX: 0, offsetY: 0, blur: 10, spread: -5, color: 'rgba(0, 0, 0, 0.1)' }
  }
];

const ShadowPresets: React.FC = () => {
  const { updateConfig } = useShadowStore();

  // 应用预设（改变颜色和透明度）
  const applyPreset = (preset: typeof shadowPresets[0]) => {
    updateConfig({
      offsetX: preset.config.offsetX,
      offsetY: preset.config.offsetY,
      blur: preset.config.blur,
      spread: preset.config.spread,
      color: preset.config.color,
      inset: false
    });
  };

  // 按类别分组预设
  const groupedPresets = shadowPresets.reduce((acc, preset) => {
    if (!acc[preset.category]) {
      acc[preset.category] = [];
    }
    acc[preset.category].push(preset);
    return acc;
  }, {} as Record<string, typeof shadowPresets>);

  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="text-base">预设阴影</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(groupedPresets).map(([category, presets]) => (
          <div key={category} className="space-y-2">
            <div className="text-xs font-medium text-muted-foreground">{category}</div>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <Button
                  key={preset.name}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(preset)}
                  className="h-auto py-2 px-3 text-xs justify-start"
                >
                  {preset.name}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ShadowPresets;
