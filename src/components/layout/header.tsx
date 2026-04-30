"use client";

import { useUserStore } from "@/stores/user-store";
import { Badge } from "@/components/ui/badge";

const PLAN_LIMITS = {
  FREE: 3,
  STANDARD: 10,
  PREMIUM: 20,
};

export function Header() {
  const { user, dailyCount } = useUserStore();

  if (!user) return null;

  const limit = PLAN_LIMITS[user.plan];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold">말해봐</h1>
          <Badge variant={user.plan === "PREMIUM" ? "default" : user.plan === "STANDARD" ? "secondary" : "outline"}>
            {user.plan}
          </Badge>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm">
            <span className="text-muted-foreground">今日の会話:</span>
            <span className="ml-2 font-semibold">
              {dailyCount} / {limit}
            </span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">レベル:</span>
            <span className="ml-2 font-semibold">Lv.{user.level}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
