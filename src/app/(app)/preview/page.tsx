"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { scenarios } from "@/lib/data/scenarios";
import { useUserStore } from "@/stores/user-store";
import { ArrowLeft, MessageSquare, Sparkles, Loader2 } from "lucide-react";

function PreviewPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scenarioId = searchParams.get("id");
  const { user, dailyCount } = useUserStore();

  if (!scenarioId || !scenarios[scenarioId]) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>場面が見つかりません</CardTitle>
            <CardDescription>
              選択された場面が存在しません。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/scenarios")}>
              場面選択に戻る
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const scenario = scenarios[scenarioId];
  const userLevel = user?.level || 1;

  const PLAN_LIMITS = {
    FREE: 3,
    STANDARD: 10,
    PREMIUM: 20,
  };

  const limit = user ? PLAN_LIMITS[user.plan] : 3;
  const remainingToday = limit - dailyCount;
  const canStart = remainingToday > 0;

  const examplePhrases = [
    { ko: "안녕하세요", ruby: "アンニョンハセヨ", ja: "こんにちは" },
    { ko: "감사합니다", ruby: "カムサハムニダ", ja: "ありがとうございます" },
    { ko: "잘 부탁드립니다", ruby: "チャル プタクドゥリムニダ", ja: "よろしくお願いします" },
  ];

  const handleStart = () => {
    if (!canStart) return;
    router.push(`/chat?scenario=${scenarioId}`);
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.push("/scenarios")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        場面選択に戻る
      </Button>

      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold">{scenario.name}</h1>
          <p className="text-xl text-muted-foreground mt-1">
            {scenario.nameKo}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              この場面について
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{scenario.description}</p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">
                対象レベル: Lv.{scenario.minLevel} - Lv.{scenario.maxLevel}
              </Badge>
              <Badge variant="outline">
                あなたのレベル: Lv.{userLevel}
              </Badge>
            </div>

            <div className="rounded-lg bg-muted p-4">
              <p className="text-sm font-medium mb-2">AIの役割:</p>
              <p className="text-sm text-muted-foreground">
                {scenario.aiRole}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>よく使うフレーズ</CardTitle>
            <CardDescription>
              この場面でよく使われる表現です
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {examplePhrases.map((phrase, index) => (
                <div
                  key={index}
                  className="rounded-lg border p-3 space-y-1"
                >
                  <p className="font-medium">{phrase.ko}</p>
                  <p className="text-sm text-muted-foreground">{phrase.ruby}</p>
                  <p className="text-sm">{phrase.ja}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>会話のヒント</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>自然な会話を心がけましょう。間違いを恐れずに話してみてください。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>AIがあなたのレベルに合わせて会話をリードします。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>マイクボタンを押して音声入力も使えます。</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>会話が終わったら詳しいフィードバックがもらえます。</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3">
          <Button
            size="lg"
            onClick={handleStart}
            disabled={!canStart}
            className="w-full"
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            {canStart ? "会話を始める" : "本日の上限に達しました"}
          </Button>

          {!canStart && (
            <p className="text-sm text-center text-muted-foreground">
              残り回数: {remainingToday} / {limit}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>}>
      <PreviewPageContent />
    </Suspense>
  );
}
