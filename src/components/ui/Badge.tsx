import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "success" | "warning" | "danger" | "info" | "copper";

interface BadgeProps {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  neutral: "bg-bg-subtle text-text-secondary border-border",
  brand: "bg-brand/10 text-brand border-brand/25",
  success: "bg-success/10 text-success border-success/25",
  warning: "bg-warning/10 text-warning border-warning/25",
  danger: "bg-danger/10 text-danger border-danger/25",
  info: "bg-info/10 text-info border-info/25",
  copper: "bg-accent-copper/10 text-accent-copper border-accent-copper/25",
};

export function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded border px-1.5 py-0.5 text-[11px] font-medium leading-none",
        toneClasses[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function levelTone(level: "low" | "medium" | "high" | "good" | "watch" | "alert"): Tone {
  switch (level) {
    case "low":
    case "good":
      return "success";
    case "medium":
    case "watch":
      return "warning";
    case "high":
    case "alert":
      return "danger";
    default:
      return "neutral";
  }
}
