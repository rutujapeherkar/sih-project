"use client";

import { Target, Drillhole } from "@/types";
import { ConfidenceMatchCard } from "@/components/ui/ConfidenceMatchCard";
import { EvidenceList } from "@/components/map/EvidenceList";
import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/icons";

interface TargetPanelProps {
  target: Target | null;
  drillhole: Drillhole | null;
  onClose: () => void;
}

export function TargetPanel({ target, drillhole, onClose }: TargetPanelProps) {
  if (!target) {
    return (
      <div className="h-full flex items-center justify-center p-6 text-center">
        <p className="text-[13px] text-text-muted max-w-[200px]">
          Select a target on the map or from the ranked list below.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between px-4 pt-3.5 pb-3 border-b border-border">
        <div className="text-[15px] font-semibold text-text-primary font-mono">{target.id}</div>
        <button
          type="button"
          onClick={onClose}
          className="text-text-muted hover:text-text-primary"
          aria-label="Close target detail"
        >
          <CloseIcon width={16} height={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3.5 space-y-4">
        <div>
          <div className="flex items-center justify-between text-[11px] text-text-secondary mb-1">
            <span>Prospectivity</span>
            <span className="text-lg font-semibold tabular-nums text-text-primary leading-none">
              {target.prospectivity.toFixed(2)}
            </span>
          </div>
          <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
            <div
              className="h-full rounded-full bg-prospect-high"
              style={{ width: `${target.prospectivity * 100}%` }}
            />
          </div>
        </div>

        <ConfidenceMatchCard confidence={target.confidence} />

        <EvidenceList evidence={target.evidence} />

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <div className="text-[11px] text-text-secondary">Area</div>
            <div className="text-[13px] font-medium tabular-nums font-mono mt-0.5">{target.areaKm2.toFixed(2)} km²</div>
          </div>
          <div>
            <div className="text-[11px] text-text-secondary">Rock unit</div>
            <div className="text-[13px] font-medium mt-0.5">{target.geologicalUnit}</div>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-medium text-text-secondary mb-1.5">Nearby drilling</div>
          <div className="text-[13px] text-text-primary font-mono">
            {target.nearestDrillholeId} · {target.nearestDrillholeDistanceM} m
          </div>
          {drillhole && (
            <div className="text-xs text-text-secondary mt-0.5">
              {drillhole.depthM} m depth · {drillhole.gradePctMn}% Mn grade
            </div>
          )}
        </div>

        <div className="text-[11px] text-text-muted font-mono pt-2 border-t border-border">
          Model {target.modelVersion} · {target.updatedAt}
        </div>
      </div>

      <div className="px-4 py-3 border-t border-border">
        <Button
          variant="primary"
          size="md"
          className="w-full"
          onClick={() => {
            document
              .getElementById(`target-row-${target.id}`)
              ?.scrollIntoView({ behavior: "smooth", block: "center" });
          }}
        >
          Open target
        </Button>
      </div>
    </div>
  );
}
