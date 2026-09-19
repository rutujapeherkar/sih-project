"use client";

import { mines } from "@/data/mines";
import { useUIStore } from "@/store/useUIStore";
import { ChevronDownIcon } from "@/components/icons";

export function MineSelector() {
  const selectedMineId = useUIStore((s) => s.selectedMineId);
  const setSelectedMineId = useUIStore((s) => s.setSelectedMineId);

  return (
    <div className="relative flex items-center">
      <span className="text-xs text-text-muted mr-1.5 hidden md:inline">Mine</span>
      <select
        value={selectedMineId}
        onChange={(e) => setSelectedMineId(e.target.value)}
        className="appearance-none bg-transparent text-[13px] font-medium text-text-primary pr-5 py-1 pl-1 rounded hover:bg-bg-subtle cursor-pointer focus-visible:outline-2 focus-visible:outline-brand"
        aria-label="Select mine"
      >
        {mines.map((m) => (
          <option key={m.id} value={m.id}>
            {m.name}
          </option>
        ))}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-0 text-text-muted" width={14} height={14} />
    </div>
  );
}
