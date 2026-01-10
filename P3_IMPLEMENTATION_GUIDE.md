# Life-Kline P3 功能扩展实施指南

## 🎯 概述

本文档为 Life-Kline 项目的 P3 优先级功能扩展提供详细的实施指南。这些功能将显著增强产品竞争力和用户群体多样性。

---

## 📋 P3 任务清单

| ID | 功能 | 预计工作量 | 技术难度 | 商业价值 |
|----|------|-----------|---------|---------|
| #6 | 事件测算（六爻） | 1周 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| #5 | 星盘测算 | 1周 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| #7 | 年度总结 | 3天 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

**建议实施顺序**：#6 (六爻) → #5 (星盘) → #7 (年度总结)

---

## 🎴 #6 事件测算（六爻起卦）

### 核心价值
- **差异化竞争力**：市面上少见的六爻+AI结合
- **决策辅助工具**：为用户重大决策提供参考
- **Polymarket 集成**：连接预测市场，增加趣味性

### 技术方案

#### 1. 六爻起卦算法
```typescript
// utils/hexagram.ts
interface Hexagram {
  upperTrigram: Trigram;   // 上卦
  lowerTrigram: Trigram;   // 下卦
  changingLines: number[]; // 动爻 (1-6)
  name: string;            // 卦名 (如"天雷无妄")
  resultHexagram?: Hexagram; // 变卦
}

enum Trigram {
  Qian = '乾', // ☰
  Dui = '兑',  // ☱
  Li = '离',   // ☲
  Zhen = '震', // ☳
  Xun = '巽',  // ☴
  Kan = '坎',  // ☵
  Gen = '艮',  // ☶
  Kun = '坤',  // ☷
}

// 时间起卦
function timeBasedHexagram(date: Date): Hexagram {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  
  const upperIndex = (year + month + day) % 8;
  const lowerIndex = (year + month + day + hour) % 8;
  const changingLine = (year + month + day + hour) % 6 || 6;
  
  return {
    upperTrigram: Object.values(Trigram)[upperIndex],
    lowerTrigram: Object.values(Trigram)[lowerIndex],
    changingLines: [changingLine],
    name: getHexagramName(upperIndex, lowerIndex),
  };
}

// 手动摇卦（用户点击6次）
function manualHexagram(throws: number[]): Hexagram {
  // 每次掷三枚硬币，正面为3，反面为2
  // 6 = 老阴（动爻），7 = 少阳，8 = 少阴，9 = 老阳（动爻）
  // ...实现逻辑
}
```

#### 2. 卦象可视化组件
```typescript
// components/HexagramVisual.tsx
const HexagramVisual: React.FC<{hexagram: Hexagram}> = ({hexagram}) => {
  return (
    <div className="flex flex-col gap-2">
      {/* 显示6个爻，从下往上 */}
      {[1,2,3,4,5,6].reverse().map(line => (
        <div key={line} className="flex items-center gap-2">
          <span className="text-xs">{line}爻</span>
          <div className={`h-2 rounded ${
            hexagram.changingLines.includes(line) 
              ? 'bg-amber-500 animate-pulse' 
              : 'bg-slate-700'
          }`}>
            {/* 阳爻：连续线，阴爻：中断线 */}
          </div>
        </div>
      ))}
    </div>
  );
};
```

#### 3. AI 提示词（六爻专用）
```typescript
const HEXAGRAM_SYSTEM_INSTRUCTION = `
你是专业的六爻卦象分析师。请根据以下信息进行解读：

输入信息：
- 本卦：{hexagramName}
- 变卦：{resultHexagramName}
- 动爻：第{changingLines}爻
- 问事：{question}

输出格式（JSON）：
{
  "卦象分析": "...",
  "吉凶判断": "吉/凶/平",
  "应期": "...",
  "建议": "...",
  "置信度": 75
}
`;
```

### 文件清单
```
utils/hexagram.ts          - 起卦算法
components/HexagramForm.tsx    - 事件输入表单
components/HexagramVisual.tsx  - 卦象可视化
components/HexagramAnalysis.tsx - AI解读展示
constants/hexagramData.ts   - 64卦数据库
```

---

## 🌟 #5 星盘测算

### 核心价值
- **扩大用户群**：吸引西方占星爱好者
- **技术挑战高**：展示技术实力
- **国际化潜力**：可面向全球市场

### 技术方案

#### 1. 星历计算库选择
```bash
# 方案 A：使用 Swiss Ephemeris (推荐)
npm install swisseph

# 方案 B：使用 astronomy-engine (轻量级)
npm install astronomy-engine
```

#### 2. 核心数据结构
```typescript
interface BirthChart {
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
}

interface Planet {
  name: 'Sun' | 'Moon' | 'Mercury' | 'Venus' | 'Mars' | 'Jupiter' | 'Saturn' | 'Uranus' | 'Neptune' | 'Pluto';
  sign: ZodiacSign;
  degree: number;
  house: number;
  retrograde: boolean;
}

interface House {
  number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sign: ZodiacSign;
  degree: number;
}

interface Aspect {
  planet1: string;
  planet2: string;
  angle: number;
  type: 'Conjunction' | 'Sextile' | 'Square' | 'Trine' | 'Opposition';
  orb: number;
}
```

#### 3. 星盘图可视化
```typescript
// 使用 SVG 绘制
// components/StarChartWheel.tsx
const StarChartWheel: React.FC<{chart: BirthChart}> = ({chart}) => {
  return (
    <svg viewBox="0 0 600 600" className="w-full max-w-md">
      {/* 外圈：12星座 */}
      <circle cx="300" cy="300" r="280" fill="none" stroke="#ccc" />
      
      {/* 中圈：12宫位 */}
      <circle cx="300" cy="300" r="200" fill="none" stroke="#999" />
      
      {/* 内圈：行星位置 */}
      {chart.planets.map(planet => (
        <PlanetSymbol key={planet.name} planet={planet} />
      ))}
      
      {/* 相位线 */}
      {chart.aspects.map(aspect => (
        <AspectLine key={`${aspect.planet1}-${aspect.planet2}`} aspect={aspect} />
      ))}
    </svg>
  );
};
```

### 文件清单
```
utils/starChart.ts              - 星盘计算引擎
components/StarChartForm.tsx    - 出生信息表单
components/StarChartWheel.tsx   - 星盘可视化
components/StarChartAnalysis.tsx - AI解读
constants/zodiacData.ts          - 星座数据
constants/planetData.ts          - 行星数据
```

---

## 📅 #7 年度总结功能

### 核心价值
- **社交裂变最强**：类似支付宝年度账单
- **实施成本最低**：基于现有数据
- **传播效果显著**：用户自发分享

### 技术方案

#### 1. 年度聚焦分析
```typescript
interface YearlySummary {
  year: number;
  theme: string;          // 年度主题（如"逆袭之年"）
  keyEvents: KeyEvent[];  // 3-5个关键事件
  monthlyTrend: number[]; // 12个月运势曲线
  highlights: string[];   // 亮点总结
  warnings: string[];     // 注意事项
  keywords: string[];     // 关键词标签
  peakMonth: number;      // 巅峰月份
  challengeMonth: number; // 挑战月份
}
```

#### 2. 分享图片生成
```typescript
// 使用 html2canvas
import html2canvas from 'html2canvas';

async function generateShareImage(summary: YearlySummary): Promise<string> {
  const element = document.getElementById('yearly-summary-card');
  const canvas = await html2canvas(element, {
    backgroundColor: '#0b0f19',
    scale: 2,
  });
  
  return canvas.toDataURL('image/png');
}
```

#### 3. 分享卡片设计
```typescript
// components/YearlySummaryCard.tsx
const YearlySummaryCard: React.FC<{summary: YearlySummary}> = ({summary}) => {
  return (
    <div id="yearly-summary-card" className="w-[375px] h-[667px] bg-gradient-to-br from-indigo-900 to-purple-900 p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white">{summary.year}</h1>
        <p className="text-2xl text-amber-300 font-serif-sc">{summary.theme}</p>
      </div>
      
      {/* 关键数据 */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white/10 p-4 rounded-xl">
          <div className="text-5xl font-bold text-amber-400">{summary.peakMonth}</div>
          <div className="text-white text-sm">巅峰月份</div>
        </div>
        <div className="bg-white/10 p-4 rounded-xl">
          <div className="text-5xl font-bold text-rose-400">{summary.challengeMonth}</div>
          <div className="text-white text-sm">挑战月份</div>
        </div>
      </div>
      
      {/* 关键词云 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {summary.keywords.map(keyword => (
          <span key={keyword} className="bg-amber-500/20 text-amber-200 px-3 py-1 rounded-full text-sm">
            #{keyword}
          </span>
        ))}
      </div>
      
      {/* 水印 */}
      <div className="text-center text-white/50 text-xs">
        来自 lifekline.cn | 扫码查看你的{summary.year + 1}年运势
      </div>
      
      {/* 二维码 */}
      <QRCode value="https://lifekline.cn" size={60} />
    </div>
  );
};
```

### 文件清单
```
components/YearlySummaryForm.tsx  - 年份选择
components/YearlySummaryCard.tsx  - 分享卡片
components/YearlySummaryAnalysis.tsx - 详细分析
utils/shareImage.ts               - 图片生成
```

---

## 🚀 实施时间表

### Week 1-2: 事件测算（六爻）
- Day 1-2: 起卦算法实现
- Day 3-4: 卦象可视化
- Day 5-6: AI 解读集成
- Day 7: 测试与优化

### Week 3-4: 星盘测算
- Day 1-3: Swiss Ephemeris 集成
- Day 4-5: 星盘图绘制
- Day 6-7: AI 占星分析

### Week 5: 年度总结
- Day 1-2: 年度分析逻辑
- Day 3: 分享卡片设计
- Day 4: 图片生成与分享功能

---

## 📦 依赖包清单

```json
{
  "dependencies": {
    "swisseph": "^2.10.3",
    "html2canvas": "^1.4.1",
    "qrcode.react": "^3.1.0"
  }
}
```

---

## ⚠️ 注意事项

1. **性能优化**：星历计算较重，考虑 Web Worker
2. **数据缓存**：星盘数据可缓存减少计算
3. **多语言支持**：星盘功能考虑英文界面
4. **法律风险**：添加"仅供娱乐"免责声明

---

**生成时间**: 2026-01-10  
**文档状态**: 待实施

---

**下一步行动**：

由于 P3 功能均为大型开发任务（1周+工作量），建议：
1. 先部署已完成的 P0-P2 优化
2. 收集用户反馈
3. 根据市场需求决定优先实施哪个 P3 功能

**已完成核心优化 (5/8)**，产品已具备商业化基础 ✅
