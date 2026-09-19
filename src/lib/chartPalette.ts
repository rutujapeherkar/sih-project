export interface ChartPalette {
  brand: string;
  brandSoft: string;
  secondary: string;
  danger: string;
  copper: string;
  grid: string;
  band: string;
}

export const chartPalette: Record<"light" | "dark", ChartPalette> = {
  light: {
    brand: "#0B5F63",
    brandSoft: "#4E9CA0",
    secondary: "#5F6965",
    danger: "#B43A35",
    copper: "#B56A32",
    grid: "#D9DEDA",
    band: "#4E9CA0",
  },
  dark: {
    brand: "#5EB4B3",
    brandSoft: "#3F8286",
    secondary: "#A9B3AE",
    danger: "#D1615C",
    copper: "#D18A4A",
    grid: "#2A3430",
    band: "#3F8286",
  },
};
