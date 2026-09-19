"use client";

import { create } from "zustand";
import { defaultMineId } from "@/data/mines";
import { initialActionLog } from "@/data/actions";
import { ActionDecision, ActionLogEntry, RecommendedAction } from "@/types";

export interface LayerState {
  prospectivity: boolean;
  confidence: boolean;
  drillholes: boolean;
  geology: boolean;
  satellite: boolean;
}

export interface Toast {
  id: number;
  message: string;
  tone: "success" | "info" | "danger";
}

interface UIState {
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  toggleTheme: () => void;

  selectedMineId: string;
  setSelectedMineId: (id: string) => void;

  layers: LayerState;
  toggleLayer: (key: keyof LayerState) => void;

  selectedTargetId: string | null;
  setSelectedTargetId: (id: string | null) => void;

  actionStatuses: Record<string, ActionDecision>;
  actionLog: ActionLogEntry[];
  recordDecision: (action: RecommendedAction, decision: ActionDecision, note?: string) => void;

  toast: Toast | null;
  showToast: (message: string, tone?: Toast["tone"]) => void;
  clearToast: () => void;
}

// Always start at "light" to match server-rendered markup exactly.
// The actual theme (from localStorage, applied pre-hydration by the inline
// script in layout.tsx) is synced onto the store post-mount via ThemeSync,
// which avoids a client/server hydration mismatch.
export const useUIStore = create<UIState>((set, get) => ({
  theme: "light",
  setTheme: (t) => {
    set({ theme: t });
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", t);
      try {
        window.localStorage.setItem("mineintel-theme", t);
      } catch {
        // ignore storage access errors
      }
    }
  },
  toggleTheme: () => {
    const next = get().theme === "light" ? "dark" : "light";
    get().setTheme(next);
  },

  selectedMineId: defaultMineId,
  setSelectedMineId: (id) => set({ selectedMineId: id, selectedTargetId: null }),

  layers: {
    prospectivity: true,
    confidence: true,
    drillholes: true,
    geology: true,
    satellite: false,
  },
  toggleLayer: (key) =>
    set((s) => ({ layers: { ...s.layers, [key]: !s.layers[key] } })),

  selectedTargetId: null,
  setSelectedTargetId: (id) => set({ selectedTargetId: id }),

  actionStatuses: {},
  actionLog: initialActionLog,
  recordDecision: (action, decision, note) => {
    const entry: ActionLogEntry = {
      id: `LOG-${Date.now()}`,
      actionTitle: action.title,
      decision,
      note,
      user: "Mahesh Jadhav",
      timestamp: new Date().toISOString(),
      modelVersion: action.modelVersion,
    };
    set((s) => ({
      actionLog: [entry, ...s.actionLog],
      actionStatuses: { ...s.actionStatuses, [action.id]: decision },
    }));
    const toneMap: Record<ActionDecision, Toast["tone"]> = {
      accepted: "success",
      modified: "info",
      rejected: "danger",
    };
    const verbMap: Record<ActionDecision, string> = {
      accepted: "Accepted",
      modified: "Modified",
      rejected: "Rejected",
    };
    get().showToast(`${verbMap[decision]}: ${action.title}`, toneMap[decision]);
  },

  toast: null,
  showToast: (message, tone = "success") =>
    set({ toast: { id: Date.now(), message, tone } }),
  clearToast: () => set({ toast: null }),
}));
