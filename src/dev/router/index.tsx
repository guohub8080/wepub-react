import {createHashRouter, Navigate} from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { generateSvgDocumentRoutes } from "../../books/SvgDocument/data/svgDocumentLoader.tsx";
import Settings from '../apps/Settings';
import Home from '../apps/Home';
import Color from '../apps/Color';
import PubEditor from '../apps/PubEditor';
import SvgReactConverter from '../apps/SvgReactConverter';
import Articles from '../apps/PubEditor/pages/articles';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// 未匹配路由时：打印错误地址并跳转到首页
const BadRouteRedirect: React.FC = () => {
    const location = useLocation()
    
    useEffect(() => {
        console.warn(`访问了不存在的路由: ${location.pathname}`)
    }, [location.pathname])
    
    return <Navigate to="/home/" replace />
}

//

export default createHashRouter([
    {
        path: "",
        element: <Navigate to="/home/" replace />
    },
    {
        path: "/",
        element: <MainLayout/>,
        children:  [
            {
                path: "home",
                element: <Home />
            },
            ...generateSvgDocumentRoutes(),
            {
                path: "settings",
                element: <Settings />
            },
            {
                path: "color",
                element: <Color />
            },
            {
                path: "svg-react",
                element: <SvgReactConverter />
            },
            {
                path: "pubeditor",
                element: <PubEditor />,
                children: [
                    {
                        index: true,
                        element: <Articles />
                    },
                    {
                        path: "articles",
                        element: <Articles />
                    }
                ]
            }
        ]
    },
    {
        path: "*",
        element: <BadRouteRedirect />
    }
]);