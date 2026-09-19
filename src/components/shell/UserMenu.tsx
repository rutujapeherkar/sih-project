"use client";

import { useState, useRef, useEffect } from "react";

const CURRENT_USER = {
  name: "Mahesh Jadhav",
  email: "mahesh.jadhav6688@gmail.com",
  role: "Mine Planner",
  initials: "MJ",
};

const SECONDARY_ITEMS = ["Data", "Methodology", "Audit", "Settings"];

export function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="h-7 w-7 rounded-full bg-brand text-white text-[11px] font-semibold flex items-center justify-center hover:bg-brand-dark"
        aria-label="User menu"
        aria-expanded={open}
      >
        {CURRENT_USER.initials}
      </button>
      {open && (
        <div className="absolute right-0 top-9 w-56 bg-bg-surface border border-border rounded-md shadow-sm py-1.5 z-50">
          <div className="px-3 py-2 border-b border-border">
            <div className="text-[13px] font-medium text-text-primary">{CURRENT_USER.name}</div>
            <div className="text-xs text-text-muted truncate">{CURRENT_USER.email}</div>
            <div className="text-xs text-text-secondary mt-0.5">{CURRENT_USER.role}</div>
          </div>
          <div className="py-1">
            {SECONDARY_ITEMS.map((item) => (
              <div
                key={item}
                className="px-3 py-1.5 text-[13px] text-text-secondary hover:bg-bg-subtle hover:text-text-primary cursor-default"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
