"use client";

import { usePathname } from "next/navigation";
import { AppShell } from "@/components/shell/AppShell";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const fullBleed = pathname?.startsWith("/explore") ?? false;
  return <AppShell fullBleed={fullBleed}>{children}</AppShell>;
}
