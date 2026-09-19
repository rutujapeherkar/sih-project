"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/useUIStore";
import { cn } from "@/lib/utils";
import { CheckIcon, CloseIcon, AlertIcon } from "@/components/icons";

const toneClasses = {
  success: "border-success/30 text-success",
  info: "border-info/30 text-info",
  danger: "border-danger/30 text-danger",
};

export function Toast() {
  const toast = useUIStore((s) => s.toast);
  const clearToast = useUIStore((s) => s.clearToast);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(clearToast, 4000);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="fixed top-14 right-4 z-[1000] w-80 max-w-[calc(100vw-2rem)]">
      <div
        className={cn(
          "flex items-start gap-2 bg-bg-surface border rounded-md shadow-sm px-3 py-2.5",
          toneClasses[toast.tone],
        )}
        role="status"
      >
        {toast.tone === "danger" ? (
          <AlertIcon className="mt-0.5 shrink-0" />
        ) : (
          <CheckIcon className="mt-0.5 shrink-0" />
        )}
        <p className="text-[13px] text-text-primary flex-1 leading-5">{toast.message}</p>
        <button
          type="button"
          onClick={clearToast}
          className="text-text-muted hover:text-text-primary"
          aria-label="Dismiss notification"
        >
          <CloseIcon width={14} height={14} />
        </button>
      </div>
    </div>
  );
}
