export type ThemeName = "light" | "dark";

const STOPS: Record<ThemeName, [string, string, string]> = {
  light: ["#DCE9ED", "#4E9CA0", "#163E63"],
  dark: ["#22343D", "#3F8286", "#7FB8D9"],
};

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  return [
    parseInt(v.slice(0, 2), 16),
    parseInt(v.slice(2, 4), 16),
    parseInt(v.slice(4, 6), 16),
  ];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  const c = (n: number) => Math.round(Math.min(255, Math.max(0, n))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

function lerp(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

export function prospectivityColor(value: number, theme: ThemeName = "light"): string {
  const [low, medium, high] = STOPS[theme].map(hexToRgb) as [
    [number, number, number],
    [number, number, number],
    [number, number, number],
  ];
  const v = Math.min(1, Math.max(0, value));
  const rgb = v <= 0.5 ? lerp(low, medium, v / 0.5) : lerp(medium, high, (v - 0.5) / 0.5);
  return rgbToHex(rgb);
}

// Categorical scale for "colour by confidence" mode — how strongly a
// target resembles ground with known deposits, independent of its raw
// prospectivity score.
const CONFIDENCE_COLORS: Record<ThemeName, Record<"high" | "medium" | "low", string>> = {
  light: { high: "#19734A", medium: "#315F9E", low: "#8A928E" },
  dark: { high: "#34A06A", medium: "#5B8FD1", low: "#6F7A75" },
};

export function confidenceColor(confidence: "high" | "medium" | "low", theme: ThemeName = "light"): string {
  return CONFIDENCE_COLORS[theme][confidence];
}

export const CONFIDENCE_MATCH_LABEL: Record<"high" | "medium" | "low", string> = {
  high: "Strong match",
  medium: "Partial match",
  low: "Limited match",
};

export const CONFIDENCE_MATCH_DETAIL: Record<"high" | "medium" | "low", string> = {
  high: "Resembles ground with known deposits.",
  medium: "Partly resembles known-deposit ground.",
  low: "Little local training data supports this ground.",
};
