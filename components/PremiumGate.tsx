import React, { useState } from 'react';
import { Crown, X } from 'lucide-react';

interface PremiumGateProps {
  remainingUses: number;
  maxUses: number;
  onUpgrade: (apiKey: string) => void;
  onClose: () => void;
}

const PremiumGate: React.FC<PremiumGateProps> = ({ remainingUses, maxUses, onUpgrade, onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      setError('请输入 API Key');
      return;
    }
    onUpgrade(apiKey);
    onClose();
  };

  const isLimitReached = remainingUses === 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mb-4">
            <Crown className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            {isLimitReached ? '已达每日免费限制' : '升级至高级版'}
          </h2>
          <p className="text-slate-600 text-sm">
            {isLimitReached 
              ? `今日免费次数（${maxUses}次）已用完`
              : `今日剩余免费次数：${remainingUses}/${maxUses}`
            }
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 mb-6 border border-amber-200">
          <h3 className="font-bold text-amber-900 mb-2">高级版特权</h3>
          <ul className="space-y-2 text-sm text-amber-800">
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">✓</span>
              <span>无限次数分析，随时随地</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">✓</span>
              <span>更深度的AI解读与建议</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-600 mt-0.5">✓</span>
              <span>优先体验新功能</span>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              输入您的 API Key
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                setError('');
              }}
              placeholder="sk-..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-400 outline-none"
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-3 rounded-lg shadow-md transition-all"
          >
            立即升级
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-4">
          暂不升级？明天可继续使用 {maxUses} 次免费分析
        </p>
      </div>
    </div>
  );
};

export default PremiumGate;
