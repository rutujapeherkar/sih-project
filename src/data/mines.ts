import { Mine } from "@/types";

export const mines: Mine[] = [
  {
    id: "balaghat",
    name: "Balaghat Mine",
    state: "Madhya Pradesh",
    center: [21.7897, 80.2181],
    zoom: 14,
  },
  {
    id: "gumgaon",
    name: "Gumgaon Mine",
    state: "Maharashtra",
    center: [21.035, 79.217],
    zoom: 14,
  },
  {
    id: "ukwa",
    name: "Ukwa Mine",
    state: "Madhya Pradesh",
    center: [21.652, 80.3205],
    zoom: 14,
  },
];

export const defaultMineId = "balaghat";

export function getMineById(id: string): Mine {
  return mines.find((m) => m.id === id) ?? mines[0];
}
