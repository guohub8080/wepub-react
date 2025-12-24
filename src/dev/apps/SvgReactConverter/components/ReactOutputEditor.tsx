import React from 'react';
import { Button } from "@shadcn/components/ui/button.tsx";
import { Copy, Maximize2 } from "lucide-react";
import { toast } from 'react-hot-toast';
import CodeEditorCard from './CodeEditorCard';
import { useConverterStore } from '../store/useConverterStore';

interface ReactOutputEditorProps {
  onOpenFullscreen: (title: string, content: string, language: 'xml' | 'jsx') => void;
}

const ReactOutputEditor: React.FC<ReactOutputEditorProps> = ({ onOpenFullscreen }) => {
  const {
    state: { reactOutput },
    setReactOutput
  } = useConverterStore();

  // 复制到剪贴板
  const copyToClipboard = async (text: string, toastMessage: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${toastMessage}已复制到剪贴板`);
    } catch (error) {
      console.error('复制失败:', error);
      toast.error('复制失败，请手动复制');
    }
  };

  const toolbarButtons = (
    <>
      {/* 复制按钮 */}
      {reactOutput.trim() && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(reactOutput, 'React代码')}
          className="h-6 w-6 p-0"
        >
          <Copy className="w-3 h-3" />
        </Button>
      )}

      {/* 全屏查看按钮 */}
      {reactOutput.trim() && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onOpenFullscreen('React 输出', reactOutput, 'jsx')}
          className="h-6 w-6 p-0"
          title="全屏查看"
        >
          <Maximize2 className="w-3 h-3" />
        </Button>
      )}

      {/* 复制错误信息按钮 - 只在有错误时显示 */}
      {reactOutput.includes('转换错误:') && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            const errorMatch = reactOutput.match(/转换错误: (.+?)(?=\n\n\/\/ 📋|$)/s);
            const errorText = errorMatch ? errorMatch[1] : '未知错误';
            copyToClipboard(`转换错误: ${errorText}`, '错误信息');
          }}
          className="h-6 w-6 p-0"
          title="复制错误信息"
        >
          <Copy className="w-3 h-3" />
        </Button>
      )}
    </>
  );

  return (
    <CodeEditorCard
      title="React 输出"
      value={reactOutput}
      onChange={setReactOutput}
      readOnly={true}
      placeholder="// 转换后的React代码将显示在这里"
      language="jsx"
      highlight={true}
      showToggle={false}
      toolbarButtons={toolbarButtons}
    />
  );
};

export default ReactOutputEditor;
