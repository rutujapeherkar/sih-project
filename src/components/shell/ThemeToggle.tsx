"use client";

import { useUIStore } from "@/store/useUIStore";
import { SunIcon, MoonIcon } from "@/components/icons";

export function ThemeToggle() {
  const theme = useUIStore((s) => s.theme);
  const toggleTheme = useUIStore((s) => s.toggleTheme);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="h-7 w-7 flex items-center justify-center rounded text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      title={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
