"use client";

import { ReactNode } from "react";
import { TopNav } from "@/components/shell/TopNav";
import { Toast } from "@/components/shell/Toast";
import { ThemeSync } from "@/components/shell/ThemeSync";
import { cn } from "@/lib/utils";

export function AppShell({
  children,
  fullBleed = false,
}: {
  children: ReactNode;
  fullBleed?: boolean;
}) {
  return (
    <div className="flex flex-col h-full min-h-screen">
      <ThemeSync />
      <TopNav />
      <main className={cn("flex-1 min-h-0", fullBleed ? "flex flex-col" : "p-5 max-w-[1400px] w-full mx-auto")}>
        {children}
      </main>
      <Toast />
    </div>
  );
}
