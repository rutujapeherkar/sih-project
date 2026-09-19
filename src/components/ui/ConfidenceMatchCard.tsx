import { Confidence } from "@/types";
import { CONFIDENCE_MATCH_LABEL, CONFIDENCE_MATCH_DETAIL } from "@/lib/colors";
import { cn } from "@/lib/utils";

const toneClasses: Record<Confidence, string> = {
  high: "bg-success/8 border-success/25 text-success",
  medium: "bg-info/8 border-info/25 text-info",
  low: "bg-bg-subtle border-border text-text-muted",
};

const glyph: Record<Confidence, string> = {
  high: "●",
  medium: "◐",
  low: "○",
};

export function ConfidenceMatchCard({ confidence, className }: { confidence: Confidence; className?: string }) {
  return (
    <div className={cn("flex items-start gap-2 rounded border px-2.5 py-2", toneClasses[confidence], className)}>
      <span className="text-sm leading-none mt-0.5" aria-hidden="true">
        {glyph[confidence]}
      </span>
      <div className="min-w-0">
        <div className="text-[12px] font-semibold leading-tight">
          Confidence: {CONFIDENCE_MATCH_LABEL[confidence]}
        </div>
        <div className="text-[11px] text-text-secondary mt-0.5 leading-snug">
          {CONFIDENCE_MATCH_DETAIL[confidence]}
        </div>
      </div>
    </div>
  );
}
