"use client";

import {
  ComposedChart,
  Bar,
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

export function ProductionOverviewChart({
  data,
  theme,
}: {
  data: ProductionDay[];
  theme: "light" | "dark";
}) {
  const palette = chartPalette[theme];

  const chartData = data.map((d) => ({
    date: d.date.slice(5),
    Actual: d.actualKt,
    Target: d.targetKt,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <ChartLegendRow
          items={[
            { label: "Actual", color: palette.brand },
            { label: "Target", color: palette.secondary, dashed: true },
          ]}
        />
      </div>
      <ResponsiveContainer width="100%" height={260}>
        <ComposedChart data={chartData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke={palette.grid} vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: palette.secondary }}
            axisLine={{ stroke: palette.grid }}
            tickLine={false}
            interval={4}
          />
          <YAxis
            tick={{ fontSize: 11, fill: palette.secondary }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: palette.grid, opacity: 0.3 }} />
          <Bar dataKey="Actual" fill={palette.brand} radius={[2, 2, 0, 0]} maxBarSize={14} />
          <Line
            dataKey="Target"
            stroke={palette.secondary}
            strokeWidth={1.5}
            strokeDasharray="4 3"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
