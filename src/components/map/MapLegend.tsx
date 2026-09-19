import { prospectivityColor } from "@/lib/colors";

export function MapLegend({ theme, showConfidence }: { theme: "light" | "dark"; showConfidence: boolean }) {
  const stops = Array.from({ length: 20 }, (_, i) => prospectivityColor(i / 19, theme));

  return (
    <div className="absolute bottom-3 left-3 z-[500] bg-bg-surface/95 border border-border rounded-md px-3 py-2.5 shadow-sm w-56">
      <div className="text-[11px] font-medium text-text-secondary mb-1">Prospectivity</div>
      <div
        className="h-2 rounded-sm"
        style={{ background: `linear-gradient(to right, ${stops.join(",")})` }}
      />
      <div className="flex justify-between text-[10px] text-text-muted mt-0.5 font-mono">
        <span>0.0</span>
        <span>0.5</span>
        <span>1.0</span>
      </div>
      {showConfidence && (
        <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border text-[11px] text-text-secondary">
          <span className="flex items-center gap-1">
            <span className="text-prospect-high">●</span> High
          </span>
          <span className="flex items-center gap-1">
            <span className="text-accent-copper">◐</span> Medium
          </span>
          <span className="flex items-center gap-1">
            <span className="text-text-muted">○</span> Low
          </span>
        </div>
      )}
    </div>
  );
}
