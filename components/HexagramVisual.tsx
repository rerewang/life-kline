import React from 'react';
import { Hexagram } from '../utils/hexagram';

interface HexagramVisualProps {
  hexagram: Hexagram;
  className?: string;
}

const HexagramVisual: React.FC<HexagramVisualProps> = ({ hexagram, className = '' }) => {
  const renderLine = (lineNumber: number, isYang: boolean, isChanging: boolean) => {
    const isActive = hexagram.changingLines.includes(lineNumber);
    
    return (
      <div key={lineNumber} className="flex items-center gap-3">
        <span className="text-xs font-mono text-slate-600 w-8">{lineNumber}爻</span>
        <div className="flex-1 h-3 flex gap-1">
          {isYang ? (
            <div
              className={`flex-1 rounded transition-all ${
                isActive
                  ? 'bg-amber-500 animate-pulse shadow-lg'
                  : 'bg-slate-700'
              }`}
            />
          ) : (
            <>
              <div
                className={`flex-1 rounded transition-all ${
                  isActive
                    ? 'bg-amber-500 animate-pulse shadow-lg'
                    : 'bg-slate-700'
                }`}
              />
              <div className="w-4" />
              <div
                className={`flex-1 rounded transition-all ${
                  isActive
                    ? 'bg-amber-500 animate-pulse shadow-lg'
                    : 'bg-slate-700'
                }`}
              />
            </>
          )}
        </div>
        {isActive && (
          <span className="text-xs font-bold text-amber-600">动</span>
        )}
      </div>
    );
  };

  const lines = [
    { yang: true, changing: false },
    { yang: false, changing: false },
    { yang: true, changing: false },
    { yang: false, changing: false },
    { yang: true, changing: false },
    { yang: false, changing: false },
  ];

  return (
    <div className={`bg-white/95 rounded-xl p-6 border border-slate-200 ${className}`}>
      <div className="mb-4 text-center">
        <h3 className="text-2xl font-bold font-serif-sc text-slate-900 mb-1">
          {hexagram.name}
        </h3>
        <p className="text-sm text-slate-600">{hexagram.description}</p>
      </div>
      
      <div className="space-y-2">
        {[6, 5, 4, 3, 2, 1].map((lineNum) => 
          renderLine(lineNum, lines[lineNum - 1].yang, lines[lineNum - 1].changing)
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-slate-600">上卦：</span>
            <span className="font-bold text-slate-900">{hexagram.upperTrigram}</span>
          </div>
          <div>
            <span className="text-slate-600">下卦：</span>
            <span className="font-bold text-slate-900">{hexagram.lowerTrigram}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HexagramVisual;
