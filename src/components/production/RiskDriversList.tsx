import { RiskDriver } from "@/types";
import { Badge, levelTone } from "@/components/ui/Badge";

export function RiskDriversList({ drivers }: { drivers: RiskDriver[] }) {
  return (
    <ul className="divide-y divide-border">
      {drivers.map((driver) => (
        <li key={driver.label} className="py-2.5 first:pt-0 last:pb-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[13px] font-medium text-text-primary">{driver.label}</span>
            <Badge tone={levelTone(driver.level)}>
              {driver.level.charAt(0).toUpperCase() + driver.level.slice(1)}
            </Badge>
          </div>
          <p className="text-xs text-text-secondary mt-1 leading-snug">{driver.detail}</p>
        </li>
      ))}
    </ul>
  );
}
