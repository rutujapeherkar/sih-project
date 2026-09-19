import { ProductionDay, RiskDriver, MineStatusItem } from "@/types";

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(19092026);

function dateNDaysAgo(n: number): string {
  const d = new Date("2026-09-19T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

// Last 30 days: actual vs target, daily kt.
export const dailyProduction: ProductionDay[] = Array.from({ length: 30 }, (_, i) => {
  const daysAgo = 29 - i;
  const targetKt = 9.8 + Math.sin(i / 5) * 0.4;
  const variance = (rand() - 0.55) * 2.4;
  const actualKt = Math.max(4.5, targetKt + variance - (i > 22 ? 1.1 : 0));
  return {
    date: dateNDaysAgo(daysAgo),
    targetKt: Number(targetKt.toFixed(2)),
    actualKt: Number(actualKt.toFixed(2)),
    forecastKt: null,
    p10Kt: null,
    p90Kt: null,
  };
});

// Weekly view: 8 historical weeks (actual) + 4 forecast weeks (forecast band).
export const weeklyProduction: ProductionDay[] = [
  { date: "2026-07-27", actualKt: 68.2, targetKt: 71, forecastKt: null, p10Kt: null, p90Kt: null },
  { date: "2026-08-03", actualKt: 70.1, targetKt: 71, forecastKt: null, p10Kt: null, p90Kt: null },
  { date: "2026-08-10", actualKt: 66.4, targetKt: 71, forecastKt: null, p10Kt: null, p90Kt: null },
  { date: "2026-08-17", actualKt: 72.8, targetKt: 72, forecastKt: null, p10Kt: null, p90Kt: null },
  { date: "2026-08-24", actualKt: 69.5, targetKt: 72, forecastKt: null, p10Kt: null, p90Kt: null },
  { date: "2026-08-31", actualKt: 64.7, targetKt: 73, forecastKt: null, p10Kt: null, p90Kt: null },
  { date: "2026-09-07", actualKt: 61.3, targetKt: 74, forecastKt: null, p10Kt: null, p90Kt: null },
  { date: "2026-09-14", actualKt: 59.8, targetKt: 75, forecastKt: 59.8, p10Kt: 59.8, p90Kt: 59.8 },
  { date: "2026-09-21", actualKt: null, targetKt: 75, forecastKt: 64.5, p10Kt: 57.2, p90Kt: 71.8 },
  { date: "2026-09-28", actualKt: null, targetKt: 76, forecastKt: 66.1, p10Kt: 55.4, p90Kt: 76.9 },
  { date: "2026-10-05", actualKt: null, targetKt: 76, forecastKt: 68.7, p10Kt: 54.8, p90Kt: 81.3 },
  { date: "2026-10-12", actualKt: null, targetKt: 77, forecastKt: 76.9, p10Kt: 60.1, p90Kt: 92.5 },
];

export const overviewKpis = {
  productionKt: 92.4,
  forecastKt: 89.1,
  shortfallRiskPct: 68,
  oreAvailableMt: 1.82,
};

export const productionKpis = {
  targetKt: 300,
  forecastKt: 276,
  gapKt: -24,
  riskPct: 72,
  p10Kt: 251,
  p50Kt: 276,
  p90Kt: 304,
};

export const riskDrivers: RiskDriver[] = [
  {
    label: "Equipment downtime",
    level: "high",
    detail: "Crusher unit 2 offline 14h in the last 7 days; haul fleet utilization down 11%.",
  },
  {
    label: "Rainfall",
    level: "medium",
    detail: "68mm forecast over next 5 days across open-pit benches, above seasonal norm.",
  },
  {
    label: "Blasting delay",
    level: "medium",
    detail: "Block C blast window pushed 2 days pending clearance approval.",
  },
  {
    label: "Accessible ore",
    level: "low",
    detail: "1.82 Mt currently accessible against 300 kt monthly target — not a constraint.",
  },
];

export const mineStatus: MineStatusItem[] = [
  { label: "Equipment", value: "92%", level: "good" },
  { label: "Weather", value: "Normal", level: "good" },
  { label: "Ore access", value: "Watch", level: "watch" },
];

export const priorityItems = [
  { label: "Equipment downtime — Crusher unit 2", level: "high" as const },
  { label: "Blast delay — Block C", level: "medium" as const },
  { label: "Rainfall risk — next 48h", level: "medium" as const },
];
