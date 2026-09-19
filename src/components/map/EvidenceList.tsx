import { EvidenceSignal } from "@/types";
import { cn } from "@/lib/utils";

const statusWord: Record<EvidenceSignal["direction"], string> = {
  positive: "supports",
  negative: "against",
  neutral: "neutral",
};

const statusTextClass: Record<EvidenceSignal["direction"], string> = {
  positive: "text-success",
  negative: "text-danger",
  neutral: "text-text-muted",
};

const barClass: Record<EvidenceSignal["direction"], string> = {
  positive: "bg-success",
  negative: "bg-danger",
  neutral: "bg-text-muted",
};

export function EvidenceList({ evidence, compact = false }: { evidence: EvidenceSignal[]; compact?: boolean }) {
  const supports = evidence.filter((e) => e.direction === "positive").length;
  const against = evidence.filter((e) => e.direction === "negative").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-[11px] font-medium text-text-secondary">What&apos;s driving this</div>
        <div className="text-[11px] text-text-muted font-mono">
          <span className="text-success">↗</span> {supports} supports · <span className="text-danger">↘</span> {against}{" "}
          against
        </div>
      </div>
      <div className={cn("divide-y divide-border", !compact && "border-t border-border")}>
        {evidence.map((signal) => (
          <div key={signal.label} className="flex items-center justify-between gap-2 py-1.5">
            <span className="text-[12px] text-text-primary truncate">{signal.label}</span>
            <div className="flex items-center gap-2 shrink-0">
              <span className={cn("text-[11px] font-medium", statusTextClass[signal.direction])}>
                {statusWord[signal.direction]}
              </span>
              <span className="h-1.5 w-14 rounded-full bg-bg-subtle overflow-hidden">
                <span
                  className={cn("block h-full rounded-full", barClass[signal.direction])}
                  style={{ width: `${Math.round(signal.strength * 100)}%` }}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
