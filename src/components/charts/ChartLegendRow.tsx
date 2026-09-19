interface LegendItem {
  label: string;
  color: string;
  dashed?: boolean;
}

export function ChartLegendRow({ items }: { items: LegendItem[] }) {
  return (
    <div className="flex items-center gap-4 text-[12px] text-text-secondary">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <svg width="14" height="2" viewBox="0 0 14 2">
            <line
              x1="0"
              y1="1"
              x2="14"
              y2="1"
              stroke={item.color}
              strokeWidth={2}
              strokeDasharray={item.dashed ? "3 2" : undefined}
            />
          </svg>
          {item.label}
        </span>
      ))}
    </div>
  );
}
