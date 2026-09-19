"use client";

import { useMemo, useState } from "react";
import {
  computeWhatIf,
  BASELINE_RAINFALL_MM,
  BASELINE_DOWNTIME_HOURS,
  TARGET_KT,
} from "@/lib/forecast";
import { Button } from "@/components/ui/Button";
import { formatKt, formatPct } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function WhatIfSimulator() {
  const [rainfallMm, setRainfallMm] = useState(BASELINE_RAINFALL_MM);
  const [downtimeHours, setDowntimeHours] = useState(BASELINE_DOWNTIME_HOURS);

  const result = useMemo(
    () => computeWhatIf({ rainfallMm, downtimeHours }),
    [rainfallMm, downtimeHours],
  );

  const isBaseline = rainfallMm === BASELINE_RAINFALL_MM && downtimeHours === BASELINE_DOWNTIME_HOURS;

  return (
    <div>
      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between text-[12px] mb-1.5">
            <label htmlFor="rainfall" className="font-medium text-text-primary">
              Rainfall (5-day)
            </label>
            <span className="font-mono tabular-nums text-text-secondary">{rainfallMm} mm</span>
          </div>
          <input
            id="rainfall"
            type="range"
            min={0}
            max={200}
            step={5}
            value={rainfallMm}
            onChange={(e) => setRainfallMm(Number(e.target.value))}
            className="w-full accent-brand"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-[12px] mb-1.5">
            <label htmlFor="downtime" className="font-medium text-text-primary">
              Equipment downtime (7-day)
            </label>
            <span className="font-mono tabular-nums text-text-secondary">{downtimeHours} h</span>
          </div>
          <input
            id="downtime"
            type="range"
            min={0}
            max={48}
            step={1}
            value={downtimeHours}
            onChange={(e) => setDowntimeHours(Number(e.target.value))}
            className="w-full accent-brand"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-border">
        <div>
          <div className="text-[11px] text-text-secondary">Forecast</div>
          <div className="text-lg font-semibold tabular-nums mt-0.5">{formatKt(result.forecastKt, 0)}</div>
        </div>
        <div>
          <div className="text-[11px] text-text-secondary">Gap vs target</div>
          <div
            className={cn(
              "text-lg font-semibold tabular-nums mt-0.5",
              result.gapKt < 0 ? "text-danger" : "text-success",
            )}
          >
            {result.gapKt > 0 ? "+" : ""}
            {formatKt(result.gapKt, 0)}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-text-secondary">Shortfall risk</div>
          <div className="text-lg font-semibold tabular-nums mt-0.5">{formatPct(result.riskPct)}</div>
        </div>
      </div>

      <p className="text-[11px] text-text-muted mt-3">Target {TARGET_KT} kt this month.</p>

      {!isBaseline && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2"
          onClick={() => {
            setRainfallMm(BASELINE_RAINFALL_MM);
            setDowntimeHours(BASELINE_DOWNTIME_HOURS);
          }}
        >
          Reset to current conditions
        </Button>
      )}
    </div>
  );
}
