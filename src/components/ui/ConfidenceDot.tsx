import { Confidence } from "@/types";
import { cn } from "@/lib/utils";

const glyph: Record<Confidence, string> = {
  high: "●",
  medium: "◐",
  low: "○",
};

const colorClass: Record<Confidence, string> = {
  high: "text-prospect-high",
  medium: "text-accent-copper",
  low: "text-text-muted",
};

export function ConfidenceDot({
  confidence,
  showLabel = true,
  className,
}: {
  confidence: Confidence;
  showLabel?: boolean;
  className?: string;
}) {
  const label = confidence.charAt(0).toUpperCase() + confidence.slice(1);
  return (
    <span className={cn("inline-flex items-center gap-1 text-xs", className)}>
      <span className={colorClass[confidence]} aria-hidden="true">
        {glyph[confidence]}
      </span>
      {showLabel && <span className="text-text-secondary">{label}</span>}
    </span>
  );
}
