import { prospectivityColor, confidenceColor } from "@/lib/colors";

const PROSPECTIVITY_CAPTION = "Warmer colours mark more prospective ground. Sharp edges follow target boundaries.";
const CONFIDENCE_CAPTION = "Colour marks how strongly this ground resembles known deposits, not its raw score.";

export function MapLegend({
  theme,
  colorBy,
}: {
  theme: "light" | "dark";
  colorBy: "prospectivity" | "confidence";
}) {
  if (colorBy === "confidence") {
    const rows: { level: "high" | "medium" | "low"; label: string }[] = [
      { level: "high", label: "Strong match" },
      { level: "medium", label: "Partial match" },
      { level: "low", label: "Limited match" },
    ];
    return (
      <div>
        <div className="text-[11px] font-medium text-text-secondary mb-1.5">Confidence</div>
        <div className="space-y-1">
          {rows.map((row) => (
            <div key={row.level} className="flex items-center gap-2 text-[11px] text-text-secondary">
              <span
                className="h-2.5 w-2.5 rounded-sm shrink-0"
                style={{ background: confidenceColor(row.level, theme) }}
              />
              {row.label}
            </div>
          ))}
        </div>
        <p className="text-[11px] text-text-muted mt-2 leading-snug">{CONFIDENCE_CAPTION}</p>
      </div>
    );
  }

  const stops = Array.from({ length: 20 }, (_, i) => prospectivityColor(i / 19, theme));

  return (
    <div>
      <div className="text-[11px] font-medium text-text-secondary mb-1.5">Prospectivity — low to high</div>
      <div className="h-2 rounded-sm" style={{ background: `linear-gradient(to right, ${stops.join(",")})` }} />
      <div className="flex justify-between text-[10px] text-text-muted mt-0.5 font-mono">
        <span>0.0</span>
        <span>0.5</span>
        <span>1.0</span>
      </div>
      <p className="text-[11px] text-text-muted mt-2 leading-snug">{PROSPECTIVITY_CAPTION}</p>
    </div>
  );
}
