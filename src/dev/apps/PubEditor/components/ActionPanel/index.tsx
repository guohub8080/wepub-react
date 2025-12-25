/** @jsxImportSource react */
import React from 'react';
import { Copy, FileCode } from 'lucide-react';
import { Button } from '@shadcn/components/ui/button.tsx';
import { Card, CardContent } from '@shadcn/components/ui/card.tsx';
import { Slider } from '@shadcn/components/ui/slider.tsx';
import { Label } from '@shadcn/components/ui/label.tsx';
import { Switch } from '@shadcn/components/ui/switch.tsx';
import { Input } from '@shadcn/components/ui/input.tsx';
import toast from 'react-hot-toast';
import { usePubEditorStore, PUB_EDITOR_LAYOUT } from '@apps/PubEditor/store/usePubEditorStore';

/**
 * 右栏：操作功能组件
 */

// RGB 转 Hex 辅助函数
const rgbToHex = (rgb: string): string => {
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return '#787878';
  const [, r, g, b] = match;
  return '#' + [r, g, b].map(x => {
    const hex = parseInt(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

export default function ActionPanel() {
  const { previewWidth, setPreviewWidth, previewMaxAvailableWidth, previewPadding, setPreviewPadding, showPreviewBorder, toggleShowPreviewBorder, previewBorderColor, setPreviewBorderColor, previewBackgroundColor, setPreviewBackgroundColor, previewContentRef } = usePubEditorStore();

  // 复制富文本到剪贴板
  const handleCopyRichText = async () => {
    try {
      // 从 store 中获取预览内容 DOM
      const contentDiv = previewContentRef.current;
      if (!contentDiv) {
        toast.error('未找到内容');
        return;
      }

      // 创建一个包含格式的 HTML blob
      const htmlContent = contentDiv.innerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const plainText = contentDiv.textContent || '';

      // 使用 Clipboard API 复制富文本
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': blob,
          'text/plain': new Blob([plainText], { type: 'text/plain' })
        })
      ]);

      toast.success('富文本已复制到剪贴板');
    } catch (error) {
      console.error('复制失败:', error);
      toast.error('复制失败，请重试');
    }
  };

  // 复制HTML文字到剪贴板
  const handleCopyHTML = async () => {
    try {
      // 从 store 中获取预览内容 DOM
      const contentDiv = previewContentRef.current;
      if (!contentDiv) {
        toast.error('未找到内容');
        return;
      }

      // 复制HTML源代码，并压缩（去除多余空格和换行）
      const htmlContent = contentDiv.innerHTML
        .replace(/\s+/g, ' ')  // 多个空白字符替换为单个空格
        .replace(/>\s+</g, '><')  // 去除标签之间的空白
        .replace(/\s+\/>/g, '/>')  // 去除自闭合标签前的空白
        .trim();

      await navigator.clipboard.writeText(htmlContent);

      toast.success('HTML代码已复制到剪贴板');
    } catch (error) {
      console.error('复制失败:', error);
      toast.error('复制失败，请重试');
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="space-y-4">
          {/* 预览区宽度控制 */}
          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>内容宽度</Label>
                  <span className="text-sm text-muted-foreground font-mono">
                    {previewWidth}px
                  </span>
                </div>
                <Slider
                  value={[previewWidth]}
                  onValueChange={(value) => setPreviewWidth(value[0])}
                  min={PUB_EDITOR_LAYOUT.PREVIEW_MIN_WIDTH}
                  max={previewMaxAvailableWidth}
                  step={10}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{PUB_EDITOR_LAYOUT.PREVIEW_MIN_WIDTH}px</span>
                  <span>{previewMaxAvailableWidth}px</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>内边距</Label>
                  <span className="text-sm text-muted-foreground font-mono">
                    {previewPadding}px
                  </span>
                </div>
                <Slider
                  value={[previewPadding]}
                  onValueChange={(value) => setPreviewPadding(value[0])}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>0px</span>
                  <span>100px</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="preview-border">显示边框</Label>
                <Switch
                  id="preview-border"
                  checked={showPreviewBorder}
                  onCheckedChange={toggleShowPreviewBorder}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="border-color">边框颜色</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="border-color"
                    type="color"
                    value={previewBorderColor.startsWith('rgb') ? rgbToHex(previewBorderColor) : previewBorderColor}
                    onChange={(e) => setPreviewBorderColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={previewBorderColor}
                    onChange={(e) => setPreviewBorderColor(e.target.value)}
                    placeholder="rgb(120, 120, 120)"
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-color">背景颜色</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="bg-color"
                    type="color"
                    value={previewBackgroundColor}
                    onChange={(e) => setPreviewBackgroundColor(e.target.value)}
                    className="w-12 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={previewBackgroundColor}
                    onChange={(e) => setPreviewBackgroundColor(e.target.value)}
                    placeholder="#ffffff"
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 复制功能 */}
          <Card>
            <CardContent className="pt-6 space-y-2">
              <Button
                className="w-full justify-start"
                variant="default"
                onClick={handleCopyRichText}
              >
                <Copy className="h-4 w-4 mr-2" />
                复制富文本
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={handleCopyHTML}
              >
                <FileCode className="h-4 w-4 mr-2" />
                复制HTML文字
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
