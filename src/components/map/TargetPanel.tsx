"use client";

import { Target, Drillhole } from "@/types";
import { ConfidenceDot } from "@/components/ui/ConfidenceDot";
import { Button } from "@/components/ui/Button";
import { CloseIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

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
        <div>
          <div className="text-[15px] font-semibold text-text-primary font-mono">{target.id}</div>
          <ConfidenceDot confidence={target.confidence} className="mt-1" />
        </div>
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[11px] text-text-secondary">Prospectivity</div>
            <div className="text-xl font-semibold tabular-nums mt-0.5">{target.prospectivity.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-[11px] text-text-secondary">Area</div>
            <div className="text-xl font-semibold tabular-nums mt-0.5 font-mono">{target.areaKm2.toFixed(2)} km²</div>
          </div>
        </div>

        <div>
          <div className="text-[11px] text-text-secondary mb-1.5">Geological unit</div>
          <div className="text-[13px] text-text-primary">{target.geologicalUnit}</div>
        </div>

        <div>
          <div className="text-[11px] font-medium text-text-secondary mb-2">Evidence</div>
          <div className="space-y-2">
            {target.evidence.map((signal) => (
              <div key={signal.label}>
                <div className="flex items-center justify-between text-[12px] mb-0.5">
                  <span className="text-text-primary">{signal.label}</span>
                  <span
                    className={cn(
                      "font-mono text-[11px]",
                      signal.direction === "positive" ? "text-success" : "text-danger",
                    )}
                  >
                    {signal.direction === "positive" ? "+" : "−"}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-bg-subtle overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      signal.direction === "positive" ? "bg-brand" : "bg-danger",
                    )}
                    style={{ width: `${Math.round(signal.strength * 100)}%` }}
                  />
                </div>
              </div>
            ))}
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
