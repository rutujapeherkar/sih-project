"use client";

import { useUIStore } from "@/store/useUIStore";
import { getMineById } from "@/data/mines";
import { productionKpis, riskDrivers } from "@/data/production";
import { recommendedActions } from "@/data/actions";
import { KpiRow, Kpi } from "@/components/ui/Kpi";
import { Card } from "@/components/ui/Card";
import { RiskDriversList } from "@/components/production/RiskDriversList";
import { WhatIfSimulator } from "@/components/actions/WhatIfSimulator";
import { ActionReview } from "@/components/actions/ActionReview";
import { ActionHistoryTable } from "@/components/actions/ActionHistoryTable";

export default function ActionsPage() {
  const mineId = useUIStore((s) => s.selectedMineId);
  const mine = getMineById(mineId);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[22px] font-semibold tracking-tight text-text-primary">Actions</h1>
        <p className="text-[13px] text-text-secondary mt-0.5">
          {mine.name} · {mine.state} · Shortfall risk and corrective actions
        </p>
      </div>

      <KpiRow>
        <Kpi label="Shortfall risk" value={`${productionKpis.riskPct}%`} tone="danger" />
        <Kpi label="Forecast" value={`${productionKpis.forecastKt} kt`} />
        <Kpi label="Target" value={`${productionKpis.targetKt} kt`} />
        <Kpi label="Gap" value={`${productionKpis.gapKt} kt`} tone="danger" />
      </KpiRow>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card title="Main drivers">
          <RiskDriversList drivers={riskDrivers} />
        </Card>
        <Card title="What-if simulator" subtitle="Adjust conditions to see live impact">
          <WhatIfSimulator />
        </Card>
      </div>

      <div>
        <h2 className="text-[15px] font-semibold text-text-primary mb-2.5">Recommended actions</h2>
        <div className="space-y-3">
          {recommendedActions.map((action) => (
            <ActionReview key={action.id} action={action} />
          ))}
        </div>
      </div>

      <Card title="Action history" subtitle="Audit record of every decision">
        <ActionHistoryTable />
      </Card>
    </div>
  );
}
