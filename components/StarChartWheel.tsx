import React from 'react';
import { BirthChart } from '../utils/birthChart';

interface StarChartWheelProps {
  chart: BirthChart;
  className?: string;
}

const StarChartWheel: React.FC<StarChartWheelProps> = ({ chart, className = '' }) => {
  const centerX = 300;
  const centerY = 300;
  const outerRadius = 280;
  const innerRadius = 200;

  const renderZodiacRing = () => {
    const signs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    return signs.map((sign, index) => {
      const angle = (index * 30 - 90) * (Math.PI / 180);
      const x = centerX + (outerRadius - 30) * Math.cos(angle);
      const y = centerY + (outerRadius - 30) * Math.sin(angle);
      
      return (
        <text
          key={index}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="text-sm fill-slate-600"
        >
          {sign}
        </text>
      );
    });
  };

  const renderPlanets = () => {
    return chart.planets.map((planet, index) => {
      const angle = (planet.degree - 90) * (Math.PI / 180);
      const radius = innerRadius - 50;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const symbols: Record<string, string> = {
        '太阳': '☉',
        '月亮': '☽',
        '水星': '☿',
        '金星': '♀',
        '火星': '♂',
        '木星': '♃',
        '土星': '♄',
      };

      return (
        <g key={index}>
          <circle cx={x} cy={y} r={12} className="fill-amber-400 stroke-amber-600 stroke-2" />
          <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-bold fill-white"
          >
            {symbols[planet.name] || '●'}
          </text>
        </g>
      );
    });
  };

  return (
    <div className={`bg-white rounded-xl p-4 border border-slate-200 ${className}`}>
      <h3 className="text-center text-xl font-bold text-slate-900 mb-4">出生星盘</h3>
      <svg viewBox="0 0 600 600" className="w-full max-w-md mx-auto">
        <circle cx={centerX} cy={centerY} r={outerRadius} fill="none" stroke="#e5e7eb" strokeWidth="2" />
        <circle cx={centerX} cy={centerY} r={innerRadius} fill="none" stroke="#d1d5db" strokeWidth="2" />
        <circle cx={centerX} cy={centerY} r={innerRadius - 100} fill="none" stroke="#e5e7eb" strokeWidth="1" />

        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => {
          const rad = (angle - 90) * (Math.PI / 180);
          const x1 = centerX + innerRadius * Math.cos(rad);
          const y1 = centerY + innerRadius * Math.sin(rad);
          const x2 = centerX + outerRadius * Math.cos(rad);
          const y2 = centerY + outerRadius * Math.sin(rad);
          return (
            <line
              key={idx}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          );
        })}

        {renderZodiacRing()}
        {renderPlanets()}

        <circle cx={centerX} cy={centerY} r={4} className="fill-slate-900" />
      </svg>

      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        {chart.planets.slice(0, 6).map((planet, idx) => (
          <div key={idx} className="flex items-center gap-1 text-slate-700">
            <span className="font-bold">{planet.name}:</span>
            <span>{planet.sign} {planet.degree}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarChartWheel;
