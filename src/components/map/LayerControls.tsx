"use client";

import { useUIStore, LayerState } from "@/store/useUIStore";
import { cn } from "@/lib/utils";

const LAYER_ITEMS: { key: keyof LayerState; label: string; hint?: string }[] = [
  { key: "prospectivity", label: "Prospectivity" },
  { key: "confidence", label: "Confidence" },
  { key: "drillholes", label: "Drill holes" },
  { key: "geology", label: "Geology" },
  { key: "satellite", label: "Satellite" },
];

export function LayerControls() {
  const layers = useUIStore((s) => s.layers);
  const toggleLayer = useUIStore((s) => s.toggleLayer);

  return (
    <div className="flex flex-col">
      <div className="px-3 pt-3 pb-2 text-[11px] font-medium uppercase tracking-wide text-text-muted">
        Layers
      </div>
      <div className="flex flex-col">
        {LAYER_ITEMS.map((item) => (
          <label
            key={item.key}
            className={cn(
              "flex items-center gap-2.5 px-3 py-2 text-[13px] text-text-primary cursor-pointer hover:bg-bg-subtle",
            )}
          >
            <input
              type="checkbox"
              checked={layers[item.key]}
              onChange={() => toggleLayer(item.key)}
              className="h-3.5 w-3.5 rounded-sm accent-brand"
            />
            {item.label}
          </label>
        ))}
      </div>
    </div>
  );
}
