// 首先引入全局控制台日志捕获器（必须在最前面）
import './utils/consoleLogger';

import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/global.css"
import App from "./App.tsx";
import { logger } from './utils/logger';

// 初始化 Logger
logger.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App/>
)
