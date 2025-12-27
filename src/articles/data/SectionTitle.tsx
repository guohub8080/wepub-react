import React from 'react';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div style={{
      marginBottom: '48px',
      position: 'relative'
    }}>
      {/* 标题 */}
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#1e293b',
        margin: '0 0 16px 0',
        textAlign: 'center',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: 'monospace'
      }}>
        {title}
      </h2>

      {/* 装饰线 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
      }}>
        {/* 左短线 */}
        <div style={{
          width: '40px',
          height: '2px',
          background: '#cbd5e1'
        }}></div>

        {/* 方块 */}
        <div style={{
          width: '8px',
          height: '8px',
          background: '#3b82f6',
          transform: 'rotate(45deg)'
        }}></div>

        {/* 右短线 */}
        <div style={{
          width: '40px',
          height: '2px',
          background: '#cbd5e1'
        }}></div>
      </div>
    </div>
  );
};

export default SectionTitle;
