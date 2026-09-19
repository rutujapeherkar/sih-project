"use client";

import { Target } from "@/types";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { ConfidenceDot } from "@/components/ui/ConfidenceDot";
import { cn } from "@/lib/utils";

interface RankedTargetsTableProps {
  targets: Target[];
  selectedTargetId: string | null;
  onSelectTarget: (id: string) => void;
  hoveredTargetId: string | null;
  onHoverTarget: (id: string | null) => void;
}

export function RankedTargetsTable({
  targets,
  selectedTargetId,
  onSelectTarget,
  hoveredTargetId,
  onHoverTarget,
}: RankedTargetsTableProps) {
  const ranked = [...targets].sort((a, b) => b.prospectivity - a.prospectivity);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th className="w-8">#</Th>
          <Th>Target</Th>
          <Th>Prospectivity</Th>
          <Th>Confidence</Th>
          <Th>Area</Th>
          <Th>Strongest evidence</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ranked.map((target, i) => (
          <Tr
            key={target.id}
            id={`target-row-${target.id}`}
            interactive
            onClick={() => onSelectTarget(target.id)}
            onMouseEnter={() => onHoverTarget(target.id)}
            onMouseLeave={() => onHoverTarget(null)}
            className={cn(
              selectedTargetId === target.id && "bg-brand/5 border-l-2 border-l-brand",
              hoveredTargetId === target.id && selectedTargetId !== target.id && "bg-bg-subtle",
            )}
          >
            <Td className="text-text-muted font-mono">{i + 1}</Td>
            <Td className="font-mono font-medium">{target.id}</Td>
            <Td>
              <div className="flex items-center gap-2">
                <span className="tabular-nums font-mono">{target.prospectivity.toFixed(2)}</span>
                <span className="h-1.5 w-16 rounded-full bg-bg-subtle overflow-hidden hidden sm:inline-block">
                  <span
                    className="block h-full rounded-full bg-prospect-high"
                    style={{ width: `${target.prospectivity * 100}%` }}
                  />
                </span>
              </div>
            </Td>
            <Td>
              <ConfidenceDot confidence={target.confidence} />
            </Td>
            <Td className="font-mono text-text-secondary">{target.areaKm2.toFixed(2)} km²</Td>
            <Td className="text-text-secondary">
              {target.evidence
                .filter((e) => e.direction === "positive")
                .slice(0, 3)
                .map((e) => e.label)
                .join(" · ") || "—"}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
