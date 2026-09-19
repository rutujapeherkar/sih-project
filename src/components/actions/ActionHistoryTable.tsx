"use client";

import { useUIStore } from "@/store/useUIStore";
import { Table, Thead, Tbody, Tr, Th, Td } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/utils";

const decisionTone = {
  accepted: "success",
  modified: "info",
  rejected: "danger",
} as const;

export function ActionHistoryTable() {
  const actionLog = useUIStore((s) => s.actionLog);

  if (actionLog.length === 0) {
    return <p className="text-[13px] text-text-muted py-4">No decisions recorded yet.</p>;
  }

  return (
    <Table className="table-fixed">
      <Thead>
        <Tr>
          <Th className="w-[15%]">Timestamp</Th>
          <Th className="w-[22%]">Action</Th>
          <Th className="w-[10%]">Decision</Th>
          <Th className="w-[28%]">Note</Th>
          <Th className="w-[15%]">User</Th>
          <Th className="w-[10%]">Model</Th>
        </Tr>
      </Thead>
      <Tbody>
        {actionLog.map((entry) => (
          <Tr key={entry.id}>
            <Td className="font-mono text-text-secondary whitespace-normal">{formatDateTime(entry.timestamp)}</Td>
            <Td className="whitespace-normal">{entry.actionTitle}</Td>
            <Td>
              <Badge tone={decisionTone[entry.decision]}>
                {entry.decision.charAt(0).toUpperCase() + entry.decision.slice(1)}
              </Badge>
            </Td>
            <Td className="whitespace-normal text-text-secondary">{entry.note ?? "—"}</Td>
            <Td className="whitespace-normal">{entry.user}</Td>
            <Td className="font-mono text-text-secondary whitespace-normal">{entry.modelVersion}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
