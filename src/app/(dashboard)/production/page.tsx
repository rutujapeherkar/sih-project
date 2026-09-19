"use client";

import { useUIStore } from "@/store/useUIStore";
import { getMineById } from "@/data/mines";
import { weeklyProduction, productionKpis, riskDrivers } from "@/data/production";
import { KpiRow, Kpi } from "@/components/ui/Kpi";
import { Card } from "@/components/ui/Card";
import { ForecastChart } from "@/components/charts/ForecastChart";
import { ForecastRangeBars } from "@/components/production/ForecastRangeBars";
import { RiskDriversList } from "@/components/production/RiskDriversList";

export default function ProductionPage() {
  const mineId = useUIStore((s) => s.selectedMineId);
  const theme = useUIStore((s) => s.theme);
  const mine = getMineById(mineId);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-text-primary">Production</h1>
        <p className="text-[13px] text-text-secondary mt-0.5">
          {mine.name} · {mine.state} · Current month
        </p>
      </div>

      <KpiRow>
        <Kpi label="Target" value={`${productionKpis.targetKt} kt`} />
        <Kpi label="Forecast" value={`${productionKpis.forecastKt} kt`} />
        <Kpi label="Gap" value={`${productionKpis.gapKt} kt`} tone="danger" />
        <Kpi label="Shortfall risk" value={`${productionKpis.riskPct}%`} tone="danger" />
      </KpiRow>

      <Card title="Production vs plan" subtitle="8 weeks actual · 4 weeks forecast">
        <ForecastChart data={weeklyProduction} theme={theme} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Forecast range">
          <ForecastRangeBars
            p10={productionKpis.p10Kt}
            p50={productionKpis.p50Kt}
            p90={productionKpis.p90Kt}
            targetKt={productionKpis.targetKt}
          />
        </Card>
        <Card title="Risk drivers">
          <RiskDriversList drivers={riskDrivers} />
        </Card>
      </div>
    </div>
  );
}
