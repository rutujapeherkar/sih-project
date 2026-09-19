export interface WhatIfInput {
  rainfallMm: number;
  downtimeHours: number;
}

export interface WhatIfOutput {
  forecastKt: number;
  gapKt: number;
  riskPct: number;
}

export const BASE_FORECAST_KT = 276;
export const TARGET_KT = 300;
export const BASELINE_RAINFALL_MM = 40;
export const BASELINE_DOWNTIME_HOURS = 14;

export function computeWhatIf({ rainfallMm, downtimeHours }: WhatIfInput): WhatIfOutput {
  const rainfallDelta = -(rainfallMm - BASELINE_RAINFALL_MM) * 0.045;
  const downtimeDelta = -(downtimeHours - BASELINE_DOWNTIME_HOURS) * 0.55;

  const forecastKt = clamp(BASE_FORECAST_KT + rainfallDelta + downtimeDelta, 150, TARGET_KT + 30);
  const gapKt = forecastKt - TARGET_KT;
  const riskPct = clamp(72 - (forecastKt - BASE_FORECAST_KT) * 1.1, 3, 97);

  return {
    forecastKt: Math.round(forecastKt),
    gapKt: Math.round(gapKt),
    riskPct: Math.round(riskPct),
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
