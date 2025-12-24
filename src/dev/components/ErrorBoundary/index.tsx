import React, { type ErrorInfo } from "react";
import { ErrorDisplay } from "./ErrorDisplay.tsx";
import { parseErrorStack } from "./utils.ts";

interface ConsoleError {
  message: string;
  url: string;
  line: number;
  column: number;
  timestamp: number;
}

interface PreviewErrorBoundaryProps {
  children: React.ReactNode;
  errorTitle?: string;
}

interface PreviewErrorBoundaryState {
  hasError: boolean;
  error: (Error & {
    componentStack?: string;
    source?: string;
    line?: number;
    column?: number;
    consoleErrors?: ConsoleError[];
  }) | null;
}

class PreviewErrorBoundary extends React.Component<PreviewErrorBoundaryProps, PreviewErrorBoundaryState> {
  private originalConsoleError: typeof console.error;
  private consoleErrors: ConsoleError[] = [];

  constructor(props: PreviewErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
    this.originalConsoleError = console.error;
    this.setupConsoleErrorCapture();
  }

  private setupConsoleErrorCapture() {
    const self = this;

    console.error = function(...args: any[]) {
      // 调用原始的console.error
      self.originalConsoleError.apply(console, args);

      // 捕获错误信息
      const errorString = args.map(arg => {
        if (arg instanceof Error) {
          return arg.stack || arg.message;
        }
        return String(arg);
      }).join(' ');

      // 尝试解析错误位置信息
      const match = errorString.match(/at\s+(.+?)\s+\((.+?):(\d+):(\d+)\)/);
      if (match) {
        const [, func, url, line, column] = match;
        self.consoleErrors.push({
          message: errorString,
          url: url,
          line: parseInt(line),
          column: parseInt(column),
          timestamp: Date.now()
        });
      } else {
        // 如果没有匹配到位置信息，至少记录消息
        self.consoleErrors.push({
          message: errorString,
          url: window.location.href,
          line: 0,
          column: 0,
          timestamp: Date.now()
        });
      }
    };
  }

  static getDerivedStateFromError(error: Error): Partial<PreviewErrorBoundaryState> {
    return {
      hasError: true,
      error: error as Error & { componentStack?: string },
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const stackInfo = parseErrorStack(error.stack || '');

    this.setState({
      error: {
        ...error,
        message: error.message,
        name: error.name,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        source: stackInfo.source,
        line: stackInfo.line,
        column: stackInfo.column,
        consoleErrors: [...this.consoleErrors], // 复制console错误数组
      } as Error & {
        componentStack?: string;
        source?: string;
        line?: number;
        column?: number;
        consoleErrors?: ConsoleError[];
      }
    });
  }

  componentWillUnmount() {
    // 恢复原始的console.error
    console.error = this.originalConsoleError;
  }

  render() {
    const { hasError, error } = this.state;
    const { children, errorTitle } = this.props;

    if (hasError && error) {
      return <ErrorDisplay error={error} errorTitle={errorTitle} />;
    }

    return children as React.ReactElement;
  }
}

export default PreviewErrorBoundary;

