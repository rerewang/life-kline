interface SolarTimeCalculationOptions {
  localTime: string;
  longitude: number;
  timezone?: string;
}

interface SolarTimeResult {
  localTime: string;
  solarTime: string;
  timeDifference: number;
  explanation: string;
}

export function calculateSolarTime(options: SolarTimeCalculationOptions): SolarTimeResult {
  const { localTime, longitude, timezone = 'Asia/Shanghai' } = options;

  const standardLongitude = 120;
  const longitudeDifference = longitude - standardLongitude;
  
  const minutesDifference = (longitudeDifference / 15) * 60;

  const [hours, minutes] = localTime.split(':').map(Number);
  let totalMinutes = hours * 60 + minutes + minutesDifference;

  if (totalMinutes >= 1440) totalMinutes -= 1440;
  if (totalMinutes < 0) totalMinutes += 1440;

  const solarHours = Math.floor(totalMinutes / 60);
  const solarMinutes = Math.round(totalMinutes % 60);

  const solarTime = `${String(solarHours).padStart(2, '0')}:${String(solarMinutes).padStart(2, '0')}`;

  let explanation = '';
  if (minutesDifference > 0) {
    explanation = `东经${longitude.toFixed(2)}°，比北京时间快${Math.abs(minutesDifference).toFixed(0)}分钟`;
  } else if (minutesDifference < 0) {
    explanation = `东经${longitude.toFixed(2)}°，比北京时间慢${Math.abs(minutesDifference).toFixed(0)}分钟`;
  } else {
    explanation = `恰好位于东经120°，真太阳时与北京时间一致`;
  }

  return {
    localTime,
    solarTime,
    timeDifference: minutesDifference,
    explanation,
  };
}

export function getHourPillarFromSolarTime(solarTime: string): string {
  const [hours, minutes] = solarTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;

  const hourRanges = [
    { start: 23 * 60, end: 24 * 60, pillar: '子时' },
    { start: 0, end: 1 * 60, pillar: '子时' },
    { start: 1 * 60, end: 3 * 60, pillar: '丑时' },
    { start: 3 * 60, end: 5 * 60, pillar: '寅时' },
    { start: 5 * 60, end: 7 * 60, pillar: '卯时' },
    { start: 7 * 60, end: 9 * 60, pillar: '辰时' },
    { start: 9 * 60, end: 11 * 60, pillar: '巳时' },
    { start: 11 * 60, end: 13 * 60, pillar: '午时' },
    { start: 13 * 60, end: 15 * 60, pillar: '未时' },
    { start: 15 * 60, end: 17 * 60, pillar: '申时' },
    { start: 17 * 60, end: 19 * 60, pillar: '酉时' },
    { start: 19 * 60, end: 21 * 60, pillar: '戌时' },
    { start: 21 * 60, end: 23 * 60, pillar: '亥时' },
  ];

  for (const range of hourRanges) {
    if (totalMinutes >= range.start && totalMinutes < range.end) {
      return range.pillar;
    }
  }

  return '子时';
}
