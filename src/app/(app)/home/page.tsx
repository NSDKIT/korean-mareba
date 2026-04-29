"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/user-store";
import { Flame, Star, Sparkles, Coffee, Users, Plane, Briefcase, Clock, ArrowRight } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { user, dailyCount } = useUserStore();

  const PLAN_LIMITS = {
    FREE: 3,
    STANDARD: 10,
    PREMIUM: 20,
  };

  const limit = user ? PLAN_LIMITS[user.plan] : 3;
  const remainingToday = limit - dailyCount;

  return (
    <div className="min-h-screen bg-[var(--bg-app)]">
      {/* ヘッダー部分 - グラデーション背景 */}
      <div className="bg-gradient-to-b from-[var(--bg-blush)] to-[var(--bg-app)] px-5 pt-3 pb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-[var(--ink-3)] font-medium tracking-wide mb-1" lang="ko">
              안녕하세요 ✿
            </div>
            <h1 className="text-2xl font-bold">
              おかえりなさい、<span className="text-[var(--plum-deep)]">みお</span>さん
            </h1>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="rounded-full bg-white shadow-[var(--sh-sm)]"
            onClick={() => router.push("/settings")}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--ink-2)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"></path>
            </svg>
          </Button>
        </div>

        {/* 統計カード */}
        <Card className="p-4">
          <div className="grid grid-cols-3 gap-1">
            <div className="text-center p-2">
              <div className="w-9 h-9 rounded-full bg-[var(--rose-soft)] text-[var(--rose-deep)] flex items-center justify-center mx-auto mb-2">
                <Flame className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold leading-none">{12}</div>
              <div className="text-xs text-[var(--ink-3)] mt-1">連続日</div>
            </div>
            <div className="text-center p-2">
              <div className="w-9 h-9 rounded-full bg-[var(--plum-soft)] text-[var(--plum-deep)] flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold leading-none">Lv.{user?.level || 1}</div>
              <div className="text-xs text-[var(--ink-3)] mt-1">
                {user?.level === 1 && "初級"}
                {user?.level === 2 && "初中級"}
                {user?.level === 3 && "中級"}
                {user?.level === 4 && "中上級"}
                {user?.level === 5 && "上級"}
              </div>
            </div>
            <div className="text-center p-2">
              <div className="w-9 h-9 rounded-full bg-[var(--bg-cream)] text-[var(--gold)] flex items-center justify-center mx-auto mb-2">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="text-lg font-bold leading-none">{remainingToday}/{limit}</div>
              <div className="text-xs text-[var(--ink-3)] mt-1">今日 回</div>
            </div>
          </div>
        </Card>
      </div>

      {/* 今日のおすすめ */}
      <div className="px-5 pt-5">
        <div className="mb-3">
          <div className="text-base font-bold">今日のおすすめ</div>
          <div className="text-xs text-[var(--ink-3)] mt-1">あなたのレベルに合わせて</div>
        </div>

        <button
          onClick={() => router.push("/preview?id=cafe")}
          className="w-full text-left bg-gradient-to-br from-[var(--rose-soft)] to-[var(--bg-lilac)] rounded-[var(--r-lg)] p-5 relative overflow-hidden shadow-[var(--sh-sm)] active:scale-[0.98] transition-transform"
        >
          <div className="absolute right-[-30px] top-[-30px] w-[120px] h-[120px] rounded-full bg-white/50"></div>
          <div className="relative">
            <Badge variant="default" className="bg-white/70 text-[var(--plum-deep)] mb-3">
              <Coffee className="w-3 h-3" />
              飲食 · Lv.{user?.level || 1}
            </Badge>
            <div className="text-xl font-bold leading-tight mb-1">
              カフェで<br />ラテを注文する
            </div>
            <div lang="ko" className="text-base text-[var(--rose-deep)] font-semibold mb-3">
              카페에서 라떼 주문하기
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--ink-2)]">
              <Clock className="w-3.5 h-3.5" />
              <span>5分</span>
              <span className="w-1 h-1 rounded-full bg-[var(--ink-3)]"></span>
              <Star className="w-3.5 h-3.5" />
              <span>★★☆</span>
            </div>
          </div>
        </button>
      </div>

      {/* カテゴリーで探す */}
      <div className="px-5 pt-5 pb-24">
        <div className="flex items-baseline justify-between mb-3">
          <div className="text-base font-bold">カテゴリーで探す</div>
          <button
            onClick={() => router.push("/scenarios")}
            className="text-sm text-[var(--plum-deep)] font-medium"
          >
            すべて見る →
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => router.push("/scenarios")}
            className="bg-[var(--bg-lilac)] rounded-[var(--r-md)] p-4 text-left flex flex-col gap-3 min-h-[100px] active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-[var(--r-sm)] bg-white/70 flex items-center justify-center text-[var(--plum-deep)]">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-bold">日常</div>
              <div className="text-xs text-[var(--ink-3)] mt-0.5">4つの場面</div>
            </div>
          </button>

          <button
            onClick={() => router.push("/scenarios")}
            className="bg-[var(--bg-blush)] rounded-[var(--r-md)] p-4 text-left flex flex-col gap-3 min-h-[100px] active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-[var(--r-sm)] bg-white/70 flex items-center justify-center text-[var(--rose-deep)]">
              <Coffee className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-bold">飲食</div>
              <div className="text-xs text-[var(--ink-3)] mt-0.5">5つの場面</div>
            </div>
          </button>

          <button
            onClick={() => router.push("/scenarios")}
            className="bg-[var(--bg-mint)] rounded-[var(--r-md)] p-4 text-left flex flex-col gap-3 min-h-[100px] active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-[var(--r-sm)] bg-white/70 flex items-center justify-center text-[var(--success)]">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-bold">旅行</div>
              <div className="text-xs text-[var(--ink-3)] mt-0.5">3つの場面</div>
            </div>
          </button>

          <button
            onClick={() => router.push("/scenarios")}
            className="bg-[var(--bg-cream)] rounded-[var(--r-md)] p-4 text-left flex flex-col gap-3 min-h-[100px] active:scale-[0.98] transition-transform"
          >
            <div className="w-9 h-9 rounded-[var(--r-sm)] bg-white/70 flex items-center justify-center text-[var(--gold)]">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="text-base font-bold">ビジネス</div>
              <div className="text-xs text-[var(--ink-3)] mt-0.5">3つの場面</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
