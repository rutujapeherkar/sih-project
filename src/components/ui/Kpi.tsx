import { cn } from "@/lib/utils";

interface KpiProps {
  label: string;
  value: string;
  delta?: string;
  tone?: "neutral" | "success" | "warning" | "danger";
  className?: string;
}

const toneText: Record<NonNullable<KpiProps["tone"]>, string> = {
  neutral: "text-text-secondary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-danger",
};

export function Kpi({ label, value, delta, tone = "neutral", className }: KpiProps) {
  return (
    <div className={cn("px-4 py-3.5 min-w-0", className)}>
      <div className="text-xs font-medium text-text-secondary truncate">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[26px] font-semibold leading-none tracking-tight text-text-primary tabular-nums">
          {value}
        </span>
        {delta && (
          <span className={cn("text-xs font-medium tabular-nums", toneText[tone])}>{delta}</span>
        )}
      </div>
    </div>
  );
}

export function KpiRow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border bg-bg-surface border border-border rounded-md overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}
