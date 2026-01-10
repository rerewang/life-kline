import { LifeDestinyResult } from '../types';
import { YearlySummary } from '../components/YearlySummaryDisplay';

export function generateYearlySummary(
  data: LifeDestinyResult,
  targetYear: number
): YearlySummary {
  const yearData = data.chartData.filter(point => point.year === targetYear);
  
  if (yearData.length === 0) {
    throw new Error(`No data found for year ${targetYear}`);
  }

  const monthlyScores = yearData.map(point => point.score);
  const avgScore = monthlyScores.reduce((a, b) => a + b, 0) / monthlyScores.length;

  const peakMonth = yearData.reduce((prev, current) => 
    current.high > prev.high ? current : prev
  );

  const challengeMonth = yearData.reduce((prev, current) => 
    current.low < prev.low ? current : prev
  );

  let theme = '';
  if (avgScore >= 75) theme = '巅峰之年';
  else if (avgScore >= 60) theme = '稳步上升';
  else if (avgScore >= 50) theme = '平稳过渡';
  else if (avgScore >= 40) theme = '谨慎前行';
  else theme = '蓄势待发';

  const keywords: string[] = [];
  if (avgScore >= 70) keywords.push('顺遂');
  if (avgScore < 50) keywords.push('谨慎');
  if (peakMonth.high - challengeMonth.low > 40) keywords.push('波动');
  keywords.push(data.analysis.industry.split('、')[0] || '发展');

  const highlights = [
    `${peakMonth.age}岁（${peakMonth.ganZhi}）运势达到巅峰，评分${peakMonth.high}`,
    `年度平均运势评分${avgScore.toFixed(0)}分`,
    data.analysis.wealth ? `财运：${data.analysis.wealth.substring(0, 30)}...` : '财运平稳',
  ];

  const warnings = [
    `${challengeMonth.age}岁（${challengeMonth.ganZhi}）需特别注意，评分${challengeMonth.low}`,
    data.analysis.health ? `健康：${data.analysis.health.substring(0, 30)}...` : '注意健康',
  ];

  return {
    year: targetYear,
    theme,
    overallScore: Math.round(avgScore),
    peakMonth: {
      month: new Date(peakMonth.year, 0).getMonth() + 1,
      score: peakMonth.high,
      reason: peakMonth.reason.substring(0, 50),
    },
    challengeMonth: {
      month: new Date(challengeMonth.year, 0).getMonth() + 1,
      score: challengeMonth.low,
      reason: challengeMonth.reason.substring(0, 50),
    },
    keyEvents: yearData.slice(0, 3).map(d => d.reason.substring(0, 40)),
    highlights,
    warnings,
    keywords,
    monthlyScores,
  };
}
