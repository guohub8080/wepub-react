import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shadcn/components/ui/card';
import { Button } from '@shadcn/components/ui/button';
import { Label } from '@shadcn/components/ui/label';
import { Slider } from '@shadcn/components/ui/slider';
import { Copy, Check } from 'lucide-react';
import { useShadowStore } from '../store/useShadowStore';
import { generateCSSCode } from '../utils/shadowUtils';
import type { ColorFormat } from '../utils/shadowUtils';

interface ShadowPreviewProps {
  colorFormat: ColorFormat;
}

const ShadowPreview: React.FC<ShadowPreviewProps> = ({ colorFormat }) => {
  const { config } = useShadowStore();
  const [copied, setCopied] = useState(false);

  // 预览方块设置
  const [previewSize, setPreviewSize] = useState(150);
  const [previewBorderRadius, setPreviewBorderRadius] = useState(8);

  const cssCode = generateCSSCode(config, colorFormat);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('复制失败:', error);
    }
  };

  // 生成预览盒子的样式
  const previewStyle: React.CSSProperties = {
    width: `${previewSize}px`,
    height: `${previewSize}px`,
    backgroundColor: 'white',
    borderRadius: `${previewBorderRadius}px`,
    ...(config.type === 'box-shadow'
      ? {
          boxShadow: `${config.inset ? 'inset ' : ''}${config.offsetX}px ${config.offsetY}px ${config.blur}px ${config.spread}px ${config.color}`
        }
      : {
          filter: `drop-shadow(${config.offsetX}px ${config.offsetY}px ${config.blur}px ${config.color})`
        })
  };

  return (
    <div className="space-y-3">
      {/* 预览区域 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">阴影预览</CardTitle>
          <CardDescription className="text-xs">
            当前类型: {config.type === 'box-shadow' ? 'Box Shadow' : 'Filter Drop Shadow'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 预览方块 */}
          <div className="w-full h-[300px] bg-muted/30 rounded-lg flex items-center justify-center">
            <div style={previewStyle} />
          </div>

          {/* CSS 代码 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">CSS 代码</Label>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopy}
                className="h-7 gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    已复制
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    复制
                  </>
                )}
              </Button>
            </div>
            <div className="bg-muted/50 rounded-md p-3 font-mono text-xs">
              <code className="text-foreground break-all">{cssCode}</code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 预览设置 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">预览设置</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 方块大小 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">方块大小</Label>
              <span className="text-xs text-muted-foreground">{previewSize}px</span>
            </div>
            <Slider
              value={[previewSize]}
              onValueChange={([value]) => setPreviewSize(value)}
              min={50}
              max={250}
              step={10}
              className="w-full"
            />
          </div>

          {/* 圆角 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm">圆角</Label>
              <span className="text-xs text-muted-foreground">{previewBorderRadius}px</span>
            </div>
            <Slider
              value={[previewBorderRadius]}
              onValueChange={([value]) => setPreviewBorderRadius(value)}
              min={0}
              max={125}
              step={1}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShadowPreview;
