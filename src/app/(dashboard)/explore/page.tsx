"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useUIStore } from "@/store/useUIStore";
import { getMineById } from "@/data/mines";
import { getTargetsByMine } from "@/data/targets";
import { getDrillholesByMine, drillholes as allDrillholes } from "@/data/drillholes";
import { getGeologyByMine } from "@/data/geology";
import { LayerControls } from "@/components/map/LayerControls";
import { MapLegend } from "@/components/map/MapLegend";
import { TargetPanel } from "@/components/map/TargetPanel";
import { RankedTargetsTable } from "@/components/map/RankedTargetsTable";
import { Button } from "@/components/ui/Button";
import { SearchIcon, ResetIcon } from "@/components/icons";

const ExploreMap = dynamic(() => import("@/components/map/ExploreMap"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center text-text-muted text-[13px] bg-bg-subtle">
      Loading map…
    </div>
  ),
});

export default function ExplorePage() {
  const mineId = useUIStore((s) => s.selectedMineId);
  const theme = useUIStore((s) => s.theme);
  const layers = useUIStore((s) => s.layers);
  const selectedTargetId = useUIStore((s) => s.selectedTargetId);
  const setSelectedTargetId = useUIStore((s) => s.setSelectedTargetId);

  const [search, setSearch] = useState("");
  const [resetSignal, setResetSignal] = useState(0);

  const mine = getMineById(mineId);
  const targets = useMemo(() => getTargetsByMine(mineId), [mineId]);
  const mineDrillholes = useMemo(() => getDrillholesByMine(mineId), [mineId]);
  const mineGeology = useMemo(() => getGeologyByMine(mineId), [mineId]);

  const selectedTarget = targets.find((t) => t.id === selectedTargetId) ?? null;
  const selectedDrillhole = selectedTarget
    ? (allDrillholes.find((d) => d.id === selectedTarget.nearestDrillholeId) ?? null)
    : null;

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim().toLowerCase();
    if (!q) return;
    const match = targets.find((t) => t.id.toLowerCase().includes(q));
    if (match) setSelectedTargetId(match.id);
  }

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="h-11 shrink-0 border-b border-border bg-bg-surface flex items-center gap-3 px-4">
        <h1 className="text-[14px] font-semibold text-text-primary">Explore</h1>
        <span className="text-[13px] text-text-secondary hidden sm:inline">
          {mine.name} · {mine.state}
        </span>

        <form onSubmit={handleSearchSubmit} className="ml-auto flex items-center gap-2">
          <div className="relative">
            <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-text-muted" width={14} height={14} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search target ID…"
              className="h-7 w-44 rounded border border-border bg-bg-app pl-7 pr-2 text-[12px] text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-brand"
            />
          </div>
          <Button type="button" size="sm" variant="secondary" onClick={() => setResetSignal((n) => n + 1)}>
            <ResetIcon width={13} height={13} />
            Reset view
          </Button>
        </form>
      </div>

      <div className="flex-1 min-h-0 flex">
        <aside className="w-44 shrink-0 border-r border-border bg-bg-surface overflow-y-auto scrollbar-thin">
          <LayerControls />
        </aside>

        <div className="flex-1 min-w-0 relative">
          <ExploreMap
            mine={mine}
            targets={targets}
            drillholes={mineDrillholes}
            geologyUnits={mineGeology}
            layers={layers}
            theme={theme}
            selectedTargetId={selectedTargetId}
            onSelectTarget={setSelectedTargetId}
            resetSignal={resetSignal}
          />
          {layers.prospectivity && <MapLegend theme={theme} showConfidence={layers.confidence} />}
        </div>

        <aside className="w-[300px] shrink-0 border-l border-border bg-bg-surface overflow-y-auto scrollbar-thin">
          <TargetPanel
            target={selectedTarget}
            drillhole={selectedDrillhole}
            onClose={() => setSelectedTargetId(null)}
          />
        </aside>
      </div>

      <div className="h-56 shrink-0 border-t border-border bg-bg-surface overflow-y-auto scrollbar-thin">
        <div className="px-4 pt-2.5 pb-1 text-[11px] font-medium uppercase tracking-wide text-text-muted sticky top-0 bg-bg-surface">
          Ranked targets
        </div>
        <RankedTargetsTable
          targets={targets}
          selectedTargetId={selectedTargetId}
          onSelectTarget={setSelectedTargetId}
        />
      </div>
    </div>
  );
}
