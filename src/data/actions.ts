import { RecommendedAction, ActionLogEntry } from "@/types";

export const recommendedActions: RecommendedAction[] = [
  {
    id: "ACT-101",
    title: "Redeploy available haul capacity to Block B",
    reason:
      "Current haul capacity is constraining forecast production while Crusher unit 2 is offline. Redirecting TRK-07 and TRK-11 to Block B recovers throughput without new equipment.",
    impactLowKt: 8,
    impactHighKt: 12,
    modelVersion: "v0.3",
  },
  {
    id: "ACT-102",
    title: "Bring forward Block C blast window by 1 day",
    reason:
      "Clearance approval is on track to complete a day early. Moving the blast window forward reduces the compounding delay from the current 2-day slip.",
    impactLowKt: 3,
    impactHighKt: 6,
    modelVersion: "v0.3",
  },
  {
    id: "ACT-103",
    title: "Prioritize Crusher unit 2 repair over scheduled maintenance",
    reason:
      "Crusher unit 2 accounts for the largest single driver of the current shortfall risk. Reordering the maintenance queue restores capacity 2 days sooner than the scheduled repair slot.",
    impactLowKt: 10,
    impactHighKt: 16,
    modelVersion: "v0.3",
  },
];

export const initialActionLog: ActionLogEntry[] = [
  {
    id: "LOG-0001",
    actionTitle: "Reroute conveyor feed during rainfall event",
    decision: "accepted",
    user: "R. Deshmukh",
    timestamp: "2026-09-16T09:12:00+05:30",
    modelVersion: "v0.3",
  },
  {
    id: "LOG-0002",
    actionTitle: "Add night shift to Block A drilling",
    decision: "rejected",
    note: "Insufficient certified operators available for night shift this week.",
    user: "S. Iyer",
    timestamp: "2026-09-14T17:45:00+05:30",
    modelVersion: "v0.3",
  },
];
