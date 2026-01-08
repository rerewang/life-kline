import React from 'react';
import { AnalysisHistoryItem } from '../types';
import { Clock, RotateCcw, History } from 'lucide-react';

interface AnalysisHistoryProps {
  history: AnalysisHistoryItem[];
  onSelect: (item: AnalysisHistoryItem) => void;
  onClear: () => void;
}

const AnalysisHistory: React.FC<AnalysisHistoryProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 text-gray-500">
          <History className="w-5 h-5" />
          <p className="text-sm">暂无历史记录，完成一次排盘后这里会自动保存。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-bold text-gray-800">分析记录</h3>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          清空记录
        </button>
      </div>

      <div className="space-y-3">
        {history.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            className="w-full text-left border border-gray-100 rounded-xl p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-gray-800">{item.name}</span>
                  <span className="text-xs text-gray-400">命理报告</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 truncate">
                  {item.result.analysis.summary}
                </p>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 font-medium">
                  总评 {Math.round(item.result.analysis.summaryScore)} / 10
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                  <Clock className="w-3 h-3" />
                  {new Date(item.createdAt).toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;
