import { EquipmentItem } from "@/types";

export const equipment: EquipmentItem[] = [
  { id: "CRH-02", name: "Crusher unit 2", type: "Crusher", status: "down", utilizationPct: 0 },
  { id: "TRK-07", name: "Haul truck TRK-07", type: "Haul truck", status: "operational", utilizationPct: 74 },
  { id: "TRK-11", name: "Haul truck TRK-11", type: "Haul truck", status: "operational", utilizationPct: 88 },
  { id: "EXC-03", name: "Excavator EXC-03", type: "Excavator", status: "maintenance", utilizationPct: 12 },
  { id: "DRL-05", name: "Drill rig DRL-05", type: "Drill rig", status: "operational", utilizationPct: 91 },
  { id: "CNV-01", name: "Conveyor CNV-01", type: "Conveyor", status: "operational", utilizationPct: 95 },
];
