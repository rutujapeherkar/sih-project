"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LogoMarkIcon } from "@/components/icons";
import { MineSelector } from "@/components/shell/MineSelector";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { UserMenu } from "@/components/shell/UserMenu";

const NAV_ITEMS = [
  { href: "/overview", label: "Overview" },
  { href: "/explore", label: "Explore" },
  { href: "/production", label: "Production" },
  { href: "/actions", label: "Actions" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <header className="h-12 shrink-0 border-b border-border bg-bg-surface flex items-center px-4 gap-5">
      <Link href="/overview" className="flex items-center gap-1.5 shrink-0">
        <LogoMarkIcon className="text-brand" />
        <span className="text-[14px] font-semibold tracking-tight text-text-primary">
          MOIL DSS
        </span>
      </Link>

      <MineSelector />

      <nav className="flex items-center gap-1 ml-1">
        {NAV_ITEMS.map((item) => {
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-2.5 py-1.5 rounded text-[13px] font-medium transition-colors",
                active
                  ? "text-brand bg-brand/10"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-subtle",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
