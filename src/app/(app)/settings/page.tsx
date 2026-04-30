"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/stores/user-store";
import { createClient } from "@/lib/supabase/client";
import { Crown, Check, LogOut, User, CreditCard } from "lucide-react";

const PLANS = {
  FREE: {
    name: "無料プラン",
    price: "¥0",
    features: [
      "1日3回までの会話",
      "初回1回のみGemini TTS",
      "基本的なフィードバック",
      "全場面にアクセス",
    ],
  },
  STANDARD: {
    name: "スタンダード",
    price: "¥980",
    priceYearly: "¥9,800",
    features: [
      "1日10回までの会話",
      "全回Gemini Flash TTS",
      "詳細なフィードバック",
      "全場面にアクセス",
      "学習履歴の保存",
    ],
  },
  PREMIUM: {
    name: "プレミアム",
    price: "¥1,980",
    priceYearly: "¥19,800",
    features: [
      "1日20回までの会話",
      "全回Gemini Pro TTS",
      "GPT-4o会話（Lv.4-5）",
      "詳細なフィードバック",
      "全場面にアクセス",
      "優先サポート",
    ],
  },
};

export default function SettingsPage() {
  const router = useRouter();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpgrade = async (plan: "STANDARD" | "PREMIUM", billing: "monthly" | "yearly") => {
    setIsLoading(true);
    try {
      const priceKey = `${plan}_${billing.toUpperCase()}`;
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceKey }),
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    // DEMO MODE: cookieを削除
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";
    if (isDemoMode) {
      document.cookie = "demo_user_email=; path=/; max-age=0";
      router.push("/login");
      router.refresh();
      return;
    }

    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">設定</h1>
        <p className="text-muted-foreground">
          アカウントとプランの管理
        </p>
      </div>

      {/* アカウント情報 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            アカウント情報
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">メールアドレス</p>
              <p className="font-medium">{user?.email || "未設定"}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">現在のレベル</p>
              <p className="font-medium">レベル {user?.level || 1}</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">現在のプラン</p>
              <Badge variant={user?.plan === "PREMIUM" ? "default" : "secondary"}>
                {PLANS[user?.plan || "FREE"].name}
              </Badge>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            ログアウト
          </Button>
        </CardContent>
      </Card>

      {/* プラン比較 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5" />
          <h2 className="text-xl font-bold">プラン変更</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(PLANS).map(([key, plan]) => {
            const isCurrentPlan = user?.plan === key;
            const isPremium = key === "PREMIUM";

            return (
              <Card
                key={key}
                className={`relative ${
                  isPremium ? "border-primary shadow-lg" : ""
                }`}
              >
                {isPremium && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="px-3">
                      <Crown className="h-3 w-3 mr-1" />
                      おすすめ
                    </Badge>
                  </div>
                )}

                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>
                    <span className="text-3xl font-bold text-foreground">
                      {plan.price}
                    </span>
                    {key !== "FREE" && (
                      <span className="text-muted-foreground">/月</span>
                    )}
                  </CardDescription>
                  {key !== "FREE" && "priceYearly" in plan && (
                    <p className="text-xs text-muted-foreground">
                      年払い: {plan.priceYearly}（2ヶ月分お得）
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <Button variant="outline" className="w-full" disabled>
                      現在のプラン
                    </Button>
                  ) : key === "FREE" ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      ダウングレードは未対応
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button
                        className="w-full"
                        onClick={() =>
                          handleUpgrade(key as "STANDARD" | "PREMIUM", "monthly")
                        }
                        disabled={isLoading}
                      >
                        月額で申し込む
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() =>
                          handleUpgrade(key as "STANDARD" | "PREMIUM", "yearly")
                        }
                        disabled={isLoading}
                      >
                        年額で申し込む
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* 注意事項 */}
      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-base">💡 プラン変更について</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            • プラン変更はいつでも可能です
          </p>
          <p>
            • アップグレードは即座に反映されます
          </p>
          <p>
            • 年払いプランは月額プランより2ヶ月分お得です
          </p>
          <p>
            • キャンセルは次回更新日まで有効です
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
