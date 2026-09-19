"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ProductionDay } from "@/types";
import { chartPalette } from "@/lib/chartPalette";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { ChartLegendRow } from "@/components/charts/ChartLegendRow";

export function ForecastChart({
  data,
  theme,
}: {
  data: ProductionDay[];
  theme: "light" | "dark";
}) {
  const palette = chartPalette[theme];

  const chartData = data.map((d) => ({
    week: d.date.slice(5),
    Actual: d.actualKt,
    Target: d.targetKt,
    Forecast: d.forecastKt,
    band: d.p10Kt !== null && d.p90Kt !== null ? [d.p10Kt, d.p90Kt] : undefined,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <ChartLegendRow
          items={[
            { label: "Actual", color: palette.brand },
            { label: "Target", color: palette.secondary, dashed: true },
            { label: "Forecast", color: palette.copper, dashed: true },
            { label: "P10–P90 range", color: palette.band },
          ]}
        />
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke={palette.grid} vertical={false} />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 11, fill: palette.secondary }}
            axisLine={{ stroke: palette.grid }}
            tickLine={false}
          />
          <YAxis tick={{ fontSize: 11, fill: palette.secondary }} axisLine={false} tickLine={false} width={36} />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: palette.grid }} />
          <Area
            dataKey="band"
            stroke="none"
            fill={palette.band}
            fillOpacity={0.14}
            connectNulls={false}
            legendType="none"
            isAnimationActive={false}
          />
          <Line dataKey="Actual" stroke={palette.brand} strokeWidth={2} dot={false} connectNulls={false} />
          <Line
            dataKey="Target"
            stroke={palette.secondary}
            strokeWidth={1.5}
            strokeDasharray="4 3"
            dot={false}
          />
          <Line
            dataKey="Forecast"
            stroke={palette.copper}
            strokeWidth={2}
            strokeDasharray="4 3"
            dot={false}
            connectNulls={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
