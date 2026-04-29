"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, MessageCircle, BarChart3, User } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/home", label: "ホーム", icon: Home },
  { href: "/scenarios", label: "場面", icon: BookOpen },
  { href: "/chat", label: "会話", icon: MessageCircle },
  { href: "/history", label: "記録", icon: BarChart3 },
  { href: "/settings", label: "マイ", icon: User },
];

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[var(--ink-4)]/20 pb-safe">
      <div className="flex h-16 items-center justify-around px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all min-w-[64px]",
                isActive
                  ? "text-[var(--plum-deep)]"
                  : "text-[var(--ink-3)] active:bg-[var(--bg-soft)]"
              )}
            >
              <Icon className={cn(
                "h-5 w-5",
                isActive && "stroke-[2.5]"
              )} />
              <span className={cn(
                "text-[11px]",
                isActive ? "font-semibold" : "font-medium"
              )}>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
