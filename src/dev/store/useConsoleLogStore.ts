import { create } from 'zustand';

export interface ConsoleLogEntry {
  message: string;
  level: 'log' | 'info' | 'warn' | 'error' | 'debug';
  timestamp: number;
  url: string;
  line?: number;
  column?: number;
}

interface ConsoleLogStore {
  logs: ConsoleLogEntry[];
  addLog: (log: ConsoleLogEntry) => void;
  getLogs: () => ConsoleLogEntry[];
  getFormattedLogs: () => string;
  clearLogs: () => void;
}

export const useConsoleLogStore = create<ConsoleLogStore>((set, get) => ({
  logs: [],
  maxLogs: 1000,

  addLog: (log) => {
    set((state) => {
      const newLogs = [...state.logs, log];
      // 限制日志数量，删除最旧的
      if (newLogs.length > 1000) {
        return { logs: newLogs.slice(-1000) };
      }
      return { logs: newLogs };
    });
  },

  getLogs: () => {
    return get().logs;
  },

  getFormattedLogs: () => {
    return get().logs.map(log => {
      const timestamp = new Date(log.timestamp).toLocaleTimeString();
      const level = log.level.toUpperCase();
      return `[${timestamp}] [${level}] ${log.message}`;
    }).join('\n');
  },

  clearLogs: () => {
    set({ logs: [] });
  },
}));
