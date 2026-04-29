"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, Sparkles, Home, MessageSquare } from "lucide-react";

export default function FeedbackPage() {
  const router = useRouter();

  // Mock feedback data - 実際はAPIから取得
  const feedback = {
    totalScore: 75,
    breakdown: {
      fluency: 22,
      accuracy: 20,
      vocabulary: 16,
      taskCompletion: 17,
    },
    goodPoints: [
      "自然な会話の流れで話せていました",
      "基本的な挨拶と質問がスムーズでした",
      "発音が明瞭で聞き取りやすかったです",
    ],
    improvements: [
      {
        original: "저는 커피를 마시고 싶어요",
        suggestion: "저는 커피를 마시고 싶습니다",
        explanation: "丁寧な状況では「-고 싶습니다」を使う方が自然です",
      },
      {
        original: "얼마예요?",
        suggestion: "가격이 얼마예요?",
        explanation: "「가격이」を付けるとより丁寧な表現になります",
      },
    ],
    newWords: [
      { ko: "주문하다", ruby: "チュムンハダ", ja: "注文する" },
      { ko: "메뉴판", ruby: "メニュパン", ja: "メニュー" },
      { ko: "따뜻한", ruby: "タトゥタン", ja: "温かい" },
    ],
  };

  const maxScores = {
    fluency: 30,
    accuracy: 30,
    vocabulary: 20,
    taskCompletion: 20,
  };

  return (
    <div className="space-y-6">
      {/* 総合評価 */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">会話フィードバック</CardTitle>
            <Badge
              variant={
                feedback.totalScore >= 80
                  ? "default"
                  : feedback.totalScore >= 60
                  ? "secondary"
                  : "outline"
              }
              className="text-lg px-3 py-1"
            >
              {feedback.totalScore}点
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={feedback.totalScore} className="h-3" />
          <p className="text-sm text-muted-foreground mt-2">
            {feedback.totalScore >= 80 && "素晴らしい会話でした!"}
            {feedback.totalScore >= 60 && feedback.totalScore < 80 && "良い会話でした!"}
            {feedback.totalScore < 60 && "もう少し練習してみましょう"}
          </p>
        </CardContent>
      </Card>

      {/* 詳細評価 */}
      <Card>
        <CardHeader>
          <CardTitle>詳細評価</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(feedback.breakdown).map(([key, value]) => {
            const labels = {
              fluency: "流暢さ",
              accuracy: "正確さ",
              vocabulary: "語彙力",
              taskCompletion: "タスク達成度",
            };

            return (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{labels[key as keyof typeof labels]}</span>
                  <span className="font-semibold">
                    {value} / {maxScores[key as keyof typeof maxScores]}
                  </span>
                </div>
                <Progress
                  value={(value / maxScores[key as keyof typeof maxScores]) * 100}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* 良かった点 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            良かった点
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {feedback.goodPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* 改善点 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            改善できる点
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedback.improvements.map((item, index) => (
            <div key={index} className="rounded-lg border p-4 space-y-2">
              <div>
                <p className="text-sm text-muted-foreground">あなたの表現:</p>
                <p className="font-medium text-destructive">{item.original}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">改善案:</p>
                <p className="font-medium text-green-600">{item.suggestion}</p>
              </div>
              <div className="rounded bg-muted p-2">
                <p className="text-sm">{item.explanation}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* 新出単語 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            今回学んだ単語
          </CardTitle>
          <CardDescription>
            これらの単語を復習しましょう
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {feedback.newWords.map((word, index) => (
              <div key={index} className="rounded-lg border p-3 space-y-1">
                <p className="font-medium text-lg">{word.ko}</p>
                <p className="text-sm text-muted-foreground">{word.ruby}</p>
                <p className="text-sm">{word.ja}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* アクションボタン */}
      <div className="grid gap-3 md:grid-cols-2">
        <Button
          size="lg"
          variant="outline"
          onClick={() => router.push("/home")}
        >
          <Home className="mr-2 h-5 w-5" />
          ホームに戻る
        </Button>
        <Button
          size="lg"
          onClick={() => router.push("/scenarios")}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          もう一度練習する
        </Button>
      </div>
    </div>
  );
}
