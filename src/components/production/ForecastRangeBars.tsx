export function ForecastRangeBars({
  p10,
  p50,
  p90,
  targetKt,
}: {
  p10: number;
  p50: number;
  p90: number;
  targetKt: number;
}) {
  const max = Math.max(p90, targetKt) * 1.05;
  const rows = [
    { label: "P10", value: p10, tone: "bg-prospect-low" },
    { label: "P50", value: p50, tone: "bg-prospect-medium" },
    { label: "P90", value: p90, tone: "bg-prospect-high" },
  ];

  return (
    <div className="space-y-2.5">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="flex items-center justify-between text-[12px] mb-1">
            <span className="text-text-secondary font-mono">{row.label}</span>
            <span className="font-mono tabular-nums text-text-primary">{row.value} kt</span>
          </div>
          <div className="h-2 rounded-full bg-bg-subtle overflow-hidden">
            <div
              className={`h-full rounded-full ${row.tone}`}
              style={{ width: `${(row.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
      <div className="pt-1 text-[11px] text-text-muted font-mono">Target {targetKt} kt</div>
    </div>
  );
}
