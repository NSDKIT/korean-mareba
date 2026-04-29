"use client";

import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/stores/user-store';
import { Crown } from 'lucide-react';

export function AdminHeader() {
  const { user } = useUserStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur h-14">
      <div className="container flex h-full items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-bold">말해봐 管理画面</h1>
          <Badge variant="default">
            <Crown className="h-3 w-3 mr-1" />
            ADMIN
          </Badge>
        </div>
        <span className="text-sm text-muted-foreground">{user?.email}</span>
      </div>
    </header>
  );
}
