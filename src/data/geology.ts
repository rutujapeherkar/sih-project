import { GeologyUnit } from "@/types";

export const geologyUnits: GeologyUnit[] = [
  {
    id: "GU-1",
    mineId: "balaghat",
    name: "Gondite — Mn ore bearing formation",
    polygon: [
      [21.802, 80.195],
      [21.803, 80.223],
      [21.792, 80.234],
      [21.783, 80.225],
      [21.786, 80.2],
    ],
  },
  {
    id: "GU-2",
    mineId: "balaghat",
    name: "Banded gneissic complex, margin zone",
    polygon: [
      [21.792, 80.234],
      [21.798, 80.219],
      [21.789, 80.211],
      [21.782, 80.222],
    ],
  },
  {
    id: "GU-3",
    mineId: "gumgaon",
    name: "Gondite — Mn ore bearing formation",
    polygon: [
      [21.043, 79.211],
      [21.044, 79.226],
      [21.033, 79.229],
      [21.026, 79.219],
      [21.03, 79.209],
    ],
  },
  {
    id: "GU-4",
    mineId: "ukwa",
    name: "Gondite — Mn ore bearing formation",
    polygon: [
      [21.66, 80.312],
      [21.661, 80.327],
      [21.649, 80.332],
      [21.642, 80.32],
      [21.647, 80.312],
    ],
  },
];

export function getGeologyByMine(mineId: string): GeologyUnit[] {
  return geologyUnits.filter((g) => g.mineId === mineId);
}
