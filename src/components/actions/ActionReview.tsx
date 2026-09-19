"use client";

import { useState } from "react";
import { RecommendedAction } from "@/types";
import { useUIStore } from "@/store/useUIStore";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatDateTime } from "@/lib/utils";

export function ActionReview({ action }: { action: RecommendedAction }) {
  const status = useUIStore((s) => s.actionStatuses[action.id]);
  const actionLog = useUIStore((s) => s.actionLog);
  const recordDecision = useUIStore((s) => s.recordDecision);

  const [mode, setMode] = useState<"idle" | "modify" | "reject">("idle");
  const [note, setNote] = useState("");

  const logEntry = actionLog.find((e) => e.actionTitle === action.title && e.decision === status);

  if (status) {
    return (
      <div className="border border-border rounded-md p-4 bg-bg-surface">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[14px] font-semibold text-text-primary">{action.title}</h3>
          <Badge tone={status === "accepted" ? "success" : status === "modified" ? "info" : "danger"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        {logEntry && (
          <p className="text-xs text-text-muted mt-2">
            {logEntry.user} · {formatDateTime(logEntry.timestamp)} · Model {logEntry.modelVersion}
            {logEntry.note ? ` · “${logEntry.note}”` : ""}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="border border-border rounded-md p-4 bg-bg-surface">
      <h3 className="text-[14px] font-semibold text-text-primary">{action.title}</h3>

      <div className="mt-2.5">
        <div className="text-[11px] font-medium text-text-secondary">Reason</div>
        <p className="text-[13px] text-text-primary mt-0.5 leading-relaxed">{action.reason}</p>
      </div>

      <div className="mt-2.5">
        <div className="text-[11px] font-medium text-text-secondary">Estimated impact</div>
        <p className="text-[13px] text-success font-mono mt-0.5">
          +{action.impactLowKt}–{action.impactHighKt} kt
        </p>
      </div>

      {mode === "idle" ? (
        <div className="flex items-center gap-2 mt-3.5">
          <Button variant="primary" onClick={() => recordDecision(action, "accepted")}>
            Accept
          </Button>
          <Button variant="secondary" onClick={() => setMode("modify")}>
            Modify
          </Button>
          <Button variant="danger" onClick={() => setMode("reject")}>
            Reject
          </Button>
        </div>
      ) : (
        <div className="mt-3.5 space-y-2">
          <label className="text-[11px] font-medium text-text-secondary">
            {mode === "modify" ? "Modification note" : "Reason for rejection"}
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            autoFocus
            placeholder={
              mode === "modify" ? "Describe what should change before this proceeds…" : "Why isn't this being taken?"
            }
            className="w-full resize-none rounded border border-border bg-bg-app px-2.5 py-1.5 text-[13px] text-text-primary placeholder:text-text-muted focus-visible:outline-2 focus-visible:outline-brand"
          />
          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              onClick={() => {
                recordDecision(action, mode === "modify" ? "modified" : "rejected", note || undefined);
                setMode("idle");
                setNote("");
              }}
            >
              Confirm {mode === "modify" ? "modification" : "rejection"}
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setMode("idle");
                setNote("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
