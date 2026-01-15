import {createHashRouter, Navigate} from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { generateSvgDocumentRoutes } from "@books/SvgDocument/data/svgDocumentLoader";
import { generateUserDocumentRoutes } from "@books/UserDocument/data/userDocumentLoader";
import { generateComponentsPreviewRoutes } from "@books/ComponentsPreview/data/componentsPreviewLoader";
import { generateArticleRoutes } from "@articles/data/articlesLoader";
import Settings from '../apps/Settings';
import Home from '../apps/Home';
import Color from '../apps/Color';
import PubEditor from '../apps/PubEditor';
import SvgReactConverter from '../apps/SvgReactConverter';
import ClassToInline from '../apps/ClassToInline';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import defaultArticleData from '@articles/data/defaultArticle';
import ShadowTool from '../apps/ShadowTool';

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
            ...generateUserDocumentRoutes(),
            ...generateSvgDocumentRoutes(),
            ...generateComponentsPreviewRoutes(),
            {
                path: "settings",
                element: <Settings />
            },
            {
                path: "color",
                element: <Color />
            },
            {
                path: "shadow-tool",
                element: <ShadowTool />
            },
            {
                path: "svg-react",
                element: <SvgReactConverter />
            },
            {
                path: "class-inline",
                element: <ClassToInline />
            },
            {
                path: "pub",
                element: <PubEditor />,
                children: [
                    {
                        index: true,
                        element: <Navigate to="/pub/default" replace />
                    },
                    ...generateArticleRoutes(),
                    {
                        path: "*",
                        element: <Navigate to="/pub/default" replace />
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