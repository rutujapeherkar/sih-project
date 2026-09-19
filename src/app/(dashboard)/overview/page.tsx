"use client";

import { useUIStore } from "@/store/useUIStore";
import { getMineById } from "@/data/mines";
import { dailyProduction, overviewKpis, priorityItems, mineStatus } from "@/data/production";
import { KpiRow, Kpi } from "@/components/ui/Kpi";
import { Card } from "@/components/ui/Card";
import { Badge, levelTone } from "@/components/ui/Badge";
import { ProductionOverviewChart } from "@/components/charts/ProductionOverviewChart";

export default function OverviewPage() {
  const mineId = useUIStore((s) => s.selectedMineId);
  const theme = useUIStore((s) => s.theme);
  const mine = getMineById(mineId);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-text-primary">Overview</h1>
        <p className="text-[13px] text-text-secondary mt-0.5">
          {mine.name} · {mine.state} · Today, 19 Sep 2026
        </p>
      </div>

      <KpiRow>
        <Kpi label="Production (MTD)" value={`${overviewKpis.productionKt} kt`} />
        <Kpi label="Forecast" value={`${overviewKpis.forecastKt} kt`} />
        <Kpi
          label="Shortfall risk"
          value={`${overviewKpis.shortfallRiskPct}%`}
          tone="danger"
        />
        <Kpi label="Ore available" value={`${overviewKpis.oreAvailableMt} Mt`} />
      </KpiRow>

      <Card title="Production vs target" subtitle="Last 30 days">
        <ProductionOverviewChart data={dailyProduction} theme={theme} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Priority">
          <ul className="divide-y divide-border -mx-4 -mt-1">
            {priorityItems.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="text-[13px] text-text-primary">{item.label}</span>
                <Badge tone={levelTone(item.level)}>
                  {item.level.charAt(0).toUpperCase() + item.level.slice(1)}
                </Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Mine status">
          <ul className="divide-y divide-border -mx-4 -mt-1">
            {mineStatus.map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-3 px-4 py-2.5">
                <span className="text-[13px] text-text-primary">{item.label}</span>
                <span className="flex items-center gap-1.5 text-[13px] text-text-secondary">
                  <span
                    className={
                      item.level === "good"
                        ? "h-1.5 w-1.5 rounded-full bg-success"
                        : item.level === "watch"
                          ? "h-1.5 w-1.5 rounded-full bg-warning"
                          : "h-1.5 w-1.5 rounded-full bg-danger"
                    }
                  />
                  {item.value}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
