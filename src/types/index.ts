export type Confidence = "low" | "medium" | "high";
export type RiskLevel = "low" | "medium" | "high";
export type MineStatusLevel = "good" | "watch" | "alert";

export interface Mine {
  id: string;
  name: string;
  state: string;
  center: [number, number];
  zoom: number;
}

export interface EvidenceSignal {
  label: string;
  direction: "positive" | "negative";
  strength: number;
}

export interface Target {
  id: string;
  mineId: string;
  label: string;
  polygon: [number, number][];
  prospectivity: number;
  confidence: Confidence;
  areaKm2: number;
  evidence: EvidenceSignal[];
  nearestDrillholeId: string;
  nearestDrillholeDistanceM: number;
  geologicalUnit: string;
  modelVersion: string;
  updatedAt: string;
}

export interface Drillhole {
  id: string;
  mineId: string;
  position: [number, number];
  depthM: number;
  gradePctMn: number;
}

export interface GeologyUnit {
  id: string;
  mineId: string;
  name: string;
  polygon: [number, number][];
}

export interface ProductionDay {
  date: string;
  actualKt: number | null;
  targetKt: number;
  forecastKt: number | null;
  p10Kt: number | null;
  p90Kt: number | null;
}

export interface RiskDriver {
  label: string;
  level: RiskLevel;
  detail: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  reason: string;
  impactLowKt: number;
  impactHighKt: number;
  modelVersion: string;
}

export type ActionDecision = "accepted" | "modified" | "rejected";

export interface ActionLogEntry {
  id: string;
  actionTitle: string;
  decision: ActionDecision;
  note?: string;
  user: string;
  timestamp: string;
  modelVersion: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  type: string;
  status: "operational" | "down" | "maintenance";
  utilizationPct: number;
}

export interface MineStatusItem {
  label: string;
  value: string;
  level: MineStatusLevel;
}
