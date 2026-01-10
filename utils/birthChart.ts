export enum ZodiacSign {
  Aries = '白羊座',
  Taurus = '金牛座',
  Gemini = '双子座',
  Cancer = '巨蟹座',
  Leo = '狮子座',
  Virgo = '处女座',
  Libra = '天秤座',
  Scorpio = '天蝎座',
  Sagittarius = '射手座',
  Capricorn = '摩羯座',
  Aquarius = '水瓶座',
  Pisces = '双鱼座',
}

export enum PlanetName {
  Sun = '太阳',
  Moon = '月亮',
  Mercury = '水星',
  Venus = '金星',
  Mars = '火星',
  Jupiter = '木星',
  Saturn = '土星',
  Uranus = '天王星',
  Neptune = '海王星',
  Pluto = '冥王星',
}

export interface Planet {
  name: PlanetName;
  sign: ZodiacSign;
  degree: number;
  house: number;
  retrograde: boolean;
}

export interface House {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sign: ZodiacSign;
  degree: number;
}

export interface Aspect {
  planet1: PlanetName;
  planet2: PlanetName;
  angle: number;
  type: 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';
  orb: number;
}

export interface BirthChart {
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
  ascendant: { sign: ZodiacSign; degree: number };
  midheaven: { sign: ZodiacSign; degree: number };
}

export function calculateSimpleBirthChart(
  birthDate: Date,
  latitude: number,
  longitude: number
): BirthChart {
  const dayOfYear = getDayOfYear(birthDate);
  const sunSign = calculateSunSign(dayOfYear);
  
  const mockPlanets: Planet[] = [
    { name: PlanetName.Sun, sign: sunSign, degree: 15, house: 1, retrograde: false },
    { name: PlanetName.Moon, sign: ZodiacSign.Cancer, degree: 22, house: 4, retrograde: false },
    { name: PlanetName.Mercury, sign: sunSign, degree: 8, house: 1, retrograde: false },
    { name: PlanetName.Venus, sign: ZodiacSign.Taurus, degree: 12, house: 2, retrograde: false },
    { name: PlanetName.Mars, sign: ZodiacSign.Aries, degree: 28, house: 10, retrograde: false },
  ];

  const mockHouses: House[] = Array.from({ length: 12 }, (_, i) => ({
    number: (i + 1) as any,
    sign: Object.values(ZodiacSign)[i % 12],
    degree: (i * 30) % 360,
  }));

  const mockAspects: Aspect[] = [
    { planet1: PlanetName.Sun, planet2: PlanetName.Moon, angle: 90, type: 'Square', orb: 2 },
    { planet1: PlanetName.Venus, planet2: PlanetName.Mars, angle: 120, type: 'Trine', orb: 3 },
  ];

  return {
    planets: mockPlanets,
    houses: mockHouses,
    aspects: mockAspects,
    ascendant: { sign: sunSign, degree: 15 },
    midheaven: { sign: ZodiacSign.Capricorn, degree: 0 },
  };
}

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function calculateSunSign(dayOfYear: number): ZodiacSign {
  if (dayOfYear < 50) return ZodiacSign.Aquarius;
  if (dayOfYear < 80) return ZodiacSign.Pisces;
  if (dayOfYear < 111) return ZodiacSign.Aries;
  if (dayOfYear < 142) return ZodiacSign.Taurus;
  if (dayOfYear < 173) return ZodiacSign.Gemini;
  if (dayOfYear < 205) return ZodiacSign.Cancer;
  if (dayOfYear < 237) return ZodiacSign.Leo;
  if (dayOfYear < 269) return ZodiacSign.Virgo;
  if (dayOfYear < 299) return ZodiacSign.Libra;
  if (dayOfYear < 330) return ZodiacSign.Scorpio;
  if (dayOfYear < 360) return ZodiacSign.Sagittarius;
  return ZodiacSign.Capricorn;
}
