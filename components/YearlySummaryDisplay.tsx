import React from 'react';
import { Calendar, TrendingUp, AlertTriangle, Star, Award } from 'lucide-react';

export interface YearlySummary {
  year: number;
  theme: string;
  overallScore: number;
  peakMonth: {
    month: number;
    score: number;
    reason: string;
  };
  challengeMonth: {
    month: number;
    score: number;
    reason: string;
  };
  keyEvents: string[];
  highlights: string[];
  warnings: string[];
  keywords: string[];
  monthlyScores: number[];
}

interface YearlySummaryDisplayProps {
  summary: YearlySummary;
  userName?: string;
}

const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const YearlySummaryDisplay: React.FC<YearlySummaryDisplayProps> = ({ summary, userName }) => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 text-white">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <Calendar className="w-6 h-6 text-amber-300" />
            <h2 className="text-4xl font-bold">{summary.year}</h2>
          </div>
          <p className="text-2xl text-amber-300 font-serif-sc mb-2">{summary.theme}</p>
          {userName && <p className="text-slate-300 text-sm">{userName}的年度运势总结</p>}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <span className="text-sm text-slate-300">巅峰月份</span>
            </div>
            <div className="text-3xl font-bold text-green-400">
              {MONTH_NAMES[summary.peakMonth.month - 1]}
            </div>
            <div className="text-xl font-bold text-green-300">评分: {summary.peakMonth.score}</div>
            <p className="text-xs text-slate-300 mt-2">{summary.peakMonth.reason}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
              <span className="text-sm text-slate-300">挑战月份</span>
            </div>
            <div className="text-3xl font-bold text-rose-400">
              {MONTH_NAMES[summary.challengeMonth.month - 1]}
            </div>
            <div className="text-xl font-bold text-rose-300">评分: {summary.challengeMonth.score}</div>
            <p className="text-xs text-slate-300 mt-2">{summary.challengeMonth.reason}</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-5 h-5 text-amber-400" />
            <span className="font-bold">年度关键词</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {summary.keywords.map((keyword, idx) => (
              <span
                key={idx}
                className="bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full text-sm border border-amber-400/30"
              >
                #{keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-bold text-slate-900">年度亮点</h3>
          </div>
          <ul className="space-y-2">
            {summary.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-slate-200">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-bold text-slate-900">注意事项</h3>
          </div>
          <ul className="space-y-2">
            {summary.warnings.map((warning, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="text-amber-600 mt-0.5">!</span>
                <span>{warning}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-900 mb-4">月度运势趋势</h3>
        <div className="flex items-end justify-between gap-1 h-32">
          {summary.monthlyScores.map((score, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t transition-all ${
                  score >= 70 ? 'bg-green-500' : score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                }`}
                style={{ height: `${score}%` }}
              />
              <span className="text-xs text-slate-600">{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YearlySummaryDisplay;
