import { Drillhole } from "@/types";

export const drillholes: Drillhole[] = [
  { id: "BH-002", mineId: "balaghat", position: [21.7906, 80.1988], depthM: 142, gradePctMn: 38.2 },
  { id: "BH-004", mineId: "balaghat", position: [21.799, 80.2151], depthM: 98, gradePctMn: 24.6 },
  { id: "BH-009", mineId: "balaghat", position: [21.7847, 80.2123], depthM: 165, gradePctMn: 33.9 },
  { id: "BH-013", mineId: "balaghat", position: [21.7708, 80.2166], depthM: 87, gradePctMn: 19.4 },
  { id: "BH-017", mineId: "balaghat", position: [21.794, 80.2224], depthM: 176, gradePctMn: 41.1 },
  { id: "BH-021", mineId: "balaghat", position: [21.7802, 80.229], depthM: 121, gradePctMn: 29.7 },
  { id: "BH-025", mineId: "balaghat", position: [21.7873, 80.2069], depthM: 103, gradePctMn: 22.8 },
  { id: "BH-029", mineId: "balaghat", position: [21.7955, 80.2278], depthM: 134, gradePctMn: 31.5 },
  { id: "BH-201", mineId: "gumgaon", position: [21.0393, 79.2158], depthM: 118, gradePctMn: 30.1 },
  { id: "BH-205", mineId: "gumgaon", position: [21.0269, 79.2251], depthM: 92, gradePctMn: 20.3 },
  { id: "BH-301", mineId: "ukwa", position: [21.6554, 80.319], depthM: 156, gradePctMn: 36.4 },
  { id: "BH-305", mineId: "ukwa", position: [21.6424, 80.3282], depthM: 79, gradePctMn: 17.9 },
];

export function getDrillholesByMine(mineId: string): Drillhole[] {
  return drillholes.filter((d) => d.mineId === mineId);
}
