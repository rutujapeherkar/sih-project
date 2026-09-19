"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";

/**
 * Reconciles the store's theme with the real theme applied pre-hydration by
 * the inline script in layout.tsx (read from localStorage/DOM). Runs only
 * after mount so the first client render still matches the server-rendered
 * "light" markup, avoiding a hydration mismatch.
 */
export function ThemeSync() {
  useEffect(() => {
    const domTheme = document.documentElement.getAttribute("data-theme");
    if (domTheme === "dark" && useUIStore.getState().theme !== "dark") {
      useUIStore.getState().setTheme("dark");
    }
  }, []);

  return null;
}
