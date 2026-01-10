export enum Trigram {
  Qian = '乾',
  Dui = '兑',
  Li = '离',
  Zhen = '震',
  Xun = '巽',
  Kan = '坎',
  Gen = '艮',
  Kun = '坤',
}

export interface Hexagram {
  id: number;
  name: string;
  upperTrigram: Trigram;
  lowerTrigram: Trigram;
  changingLines: number[];
  description: string;
}

const TRIGRAM_VALUES: Record<Trigram, number> = {
  [Trigram.Qian]: 0,
  [Trigram.Dui]: 1,
  [Trigram.Li]: 2,
  [Trigram.Zhen]: 3,
  [Trigram.Xun]: 4,
  [Trigram.Kan]: 5,
  [Trigram.Gen]: 6,
  [Trigram.Kun]: 7,
};

export function timeBasedHexagram(date: Date = new Date()): Hexagram {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();

  const upperIndex = (year + month + day) % 8;
  const lowerIndex = (year + month + day + hour) % 8;
  const changingLine = ((year + month + day + hour) % 6) || 6;

  const trigramArray = Object.values(Trigram);
  const upperTrigram = trigramArray[upperIndex];
  const lowerTrigram = trigramArray[lowerIndex];

  return {
    id: upperIndex * 8 + lowerIndex,
    name: getHexagramName(upperTrigram, lowerTrigram),
    upperTrigram,
    lowerTrigram,
    changingLines: [changingLine],
    description: '基于时间起卦',
  };
}

export function manualHexagram(coinThrows: number[]): Hexagram {
  if (coinThrows.length !== 6) {
    throw new Error('需要投掷6次硬币');
  }

  const lines = coinThrows.map(sum => {
    if (sum === 6) return { type: 'yin', changing: true };
    if (sum === 7) return { type: 'yang', changing: false };
    if (sum === 8) return { type: 'yin', changing: false };
    if (sum === 9) return { type: 'yang', changing: true };
    throw new Error('Invalid coin throw sum');
  });

  const upperLines = lines.slice(3, 6);
  const lowerLines = lines.slice(0, 3);

  const upperTrigram = linesToTrigram(upperLines);
  const lowerTrigram = linesToTrigram(lowerLines);

  const changingLines = lines
    .map((line, idx) => (line.changing ? idx + 1 : null))
    .filter((idx): idx is number => idx !== null);

  return {
    id: TRIGRAM_VALUES[upperTrigram] * 8 + TRIGRAM_VALUES[lowerTrigram],
    name: getHexagramName(upperTrigram, lowerTrigram),
    upperTrigram,
    lowerTrigram,
    changingLines,
    description: '手动摇卦',
  };
}

function linesToTrigram(lines: Array<{ type: string; changing: boolean }>): Trigram {
  const pattern = lines.map(l => l.type).join('');
  const patterns: Record<string, Trigram> = {
    'yangyangyang': Trigram.Qian,
    'yinyangy ang': Trigram.Dui,
    'yangyinyang': Trigram.Li,
    'yinyyangyang': Trigram.Zhen,
    'yangyangyin': Trigram.Xun,
    'yinyanyin': Trigram.Kan,
    'yangyinyin': Trigram.Gen,
    'yinyinyin': Trigram.Kun,
  };
  return patterns[pattern] || Trigram.Qian;
}

function getHexagramName(upper: Trigram, lower: Trigram): string {
  const names: Record<string, string> = {
    '乾乾': '乾为天',
    '坤坤': '坤为地',
    '坎坎': '坎为水',
    '离离': '离为火',
    '震震': '震为雷',
    '巽巽': '巽为风',
    '艮艮': '艮为山',
    '兑兑': '兑为泽',
  };
  return names[`${upper}${lower}`] || `${upper}${lower}`;
}

export const HEXAGRAM_DATABASE = {
  1: { name: '乾为天', fortune: '大吉', theme: '刚健中正' },
  2: { name: '坤为地', fortune: '吉', theme: '厚德载物' },
};
