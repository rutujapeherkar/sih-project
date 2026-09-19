interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
}

export function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-bg-surface border border-border rounded-md px-2.5 py-2 shadow-sm text-[12px]">
      <div className="text-text-muted font-mono mb-1">{label}</div>
      {payload.map(
        (item) =>
          item.value !== undefined &&
          item.value !== null && (
            <div key={item.name} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: item.color }} />
              <span className="text-text-secondary">{item.name}</span>
              <span className="ml-auto font-mono tabular-nums text-text-primary">
                {typeof item.value === "number" ? item.value.toFixed(1) : item.value} kt
              </span>
            </div>
          ),
      )}
    </div>
  );
}
