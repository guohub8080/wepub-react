/** @jsxImportSource react */
import React from "react"
import { GradientText } from "@shadcn/components/text/GradientText"
import faviconSvg from "@assets/svgs/logoSvg/favicon.svg"
import googleColors from "@assets/colors/googleColors.ts"

export default function Hero() {
  const floatAnimation = {
    animation: 'circularFloat 6s ease-in-out infinite'
  }

  const shadowAnimation = {
    animation: 'shadowSync 6s ease-in-out infinite'
  }

  const glowAnimation = {
    animation: 'glowPulse 3s ease-in-out infinite'
  }

  return (
    <div className="text-center max-w-[1152px] mx-auto px-6 pb-4">
      <style>{`
        @keyframes circularFloat {
          0%, 100% {
            transform: translateY(0px) scale(1);
          }
          25% {
            transform: translateY(-8px) scale(1.02);
          }
          50% {
            transform: translateY(-5px) scale(1);
          }
          75% {
            transform: translateY(-12px) scale(0.98);
          }
        }

        @keyframes shadowSync {
          0%, 100% {
            transform: translate(-50%, 32px) scale(0.8);
            opacity: 0.1;
          }
          25% {
            transform: translate(-50%, 24px) scale(0.82);
            opacity: 0.08;
          }
          50% {
            transform: translate(-50%, 28px) scale(0.8);
            opacity: 0.1;
          }
          75% {
            transform: translate(-50%, 20px) scale(0.78);
            opacity: 0.12;
          }
        }

        @keyframes glowPulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes colorShift {
          0%, 100% {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2));
          }
          33% {
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2));
          }
          66% {
            background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(139, 92, 246, 0.2));
          }
        }
      `}</style>

      {/* 带循环动效的 favicon */}
      <div className="mb-1 flex justify-center pt-8">
        <div className="relative">
          {/* 动态阴影 */}
          <div
            className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full bg-black"
            style={{
              ...shadowAnimation,
              left: '50%',
              top: '0',
              filter: 'blur(10px)'
            }}
          ></div>

          {/* 图标容器 */}
          <div style={floatAnimation}>
            <div
              className="absolute -inset-4 rounded-full blur-xl"
              style={{
                ...glowAnimation,
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
                animation: 'glowPulse 3s ease-in-out infinite, colorShift 8s ease-in-out infinite',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '140px',
                height: '140px'
              }}
            ></div>
            <img
              src={faviconSvg}
              alt="WePubReact Logo"
              className="w-24 h-24 md:w-32 md:h-32 relative z-10 transition-all duration-300"
              style={{
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15))'
              }}
            />
          </div>
        </div>
      </div>

      {/* 主标题 */}
      <h1 className="text-4xl font-bold tracking-tight leading-tight mb-2">
        <GradientText
          text="WePubReact"
          gradient="linear-gradient(135deg, #3b82f6 0%, #8b5cf6 33%, #06b6d4 66%, #3b82f6 100%)"
        />
      </h1>

  
      {/* 副标题 */}
      <div className="flex justify-center mb-0">
        <span
          className="inline-block px-8 py-2 text-base text-white rounded-full"
          style={{ backgroundColor: googleColors.blue800 }}
        >
          一个前端编辑器
        </span>
      </div>
    </div>
  )
}
