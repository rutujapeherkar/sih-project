"use client";

import { useUIStore } from "@/store/useUIStore";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { MapLegend } from "@/components/map/MapLegend";
import { ActivityIcon, LayersIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

function LayerCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-2.5 py-1.5 text-[13px] text-text-primary cursor-pointer hover:text-brand",
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 rounded-sm accent-brand"
      />
      {label}
    </label>
  );
}

function SectionHeader({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-secondary mb-2">
      <span className="text-text-muted">{icon}</span>
      {children}
    </div>
  );
}

export function LayerControls() {
  const layers = useUIStore((s) => s.layers);
  const toggleLayer = useUIStore((s) => s.toggleLayer);
  const colorBy = useUIStore((s) => s.colorBy);
  const setColorBy = useUIStore((s) => s.setColorBy);
  const theme = useUIStore((s) => s.theme);

  return (
    <div className="flex flex-col divide-y divide-border">
      <div className="px-3.5 py-3.5">
        <SectionHeader icon={<ActivityIcon width={13} height={13} />}>Prospectivity</SectionHeader>
        <LayerCheckbox
          checked={layers.prospectivity}
          onChange={() => toggleLayer("prospectivity")}
          label="Prospectivity map"
        />
        <LayerCheckbox
          checked={layers.confidence}
          onChange={() => toggleLayer("confidence")}
          label="Confidence shading"
        />

        <div className="mt-3 mb-2">
          <div className="text-[11px] text-text-secondary mb-1.5">Colour by</div>
          <SegmentedControl
            value={colorBy}
            onChange={setColorBy}
            options={[
              { value: "prospectivity", label: "Prospectivity" },
              { value: "confidence", label: "Confidence" },
            ]}
          />
        </div>

        {layers.prospectivity && (
          <div className="mt-3">
            <MapLegend theme={theme} colorBy={colorBy} />
          </div>
        )}
      </div>

      <div className="px-3.5 py-3.5">
        <SectionHeader icon={<LayersIcon width={13} height={13} />}>Geology &amp; data layers</SectionHeader>
        <p className="text-[11px] text-text-muted leading-snug mb-2">
          Local geology and known boreholes for this mine.
        </p>
        <LayerCheckbox checked={layers.drillholes} onChange={() => toggleLayer("drillholes")} label="Drill holes" />
        <LayerCheckbox checked={layers.geology} onChange={() => toggleLayer("geology")} label="Geology" />
      </div>

      <div className="px-3.5 py-3.5">
        <SectionHeader icon={<LayersIcon width={13} height={13} />}>Basemap</SectionHeader>
        <LayerCheckbox checked={layers.satellite} onChange={() => toggleLayer("satellite")} label="Satellite" />
      </div>
    </div>
  );
}
