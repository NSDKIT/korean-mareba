"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, Award, MessageSquare } from "lucide-react";
import { scenarios } from "@/lib/data/scenarios";

export default function HistoryPage() {
  const router = useRouter();

  // Mock data - 実際はAPIから取得
  const [conversations] = useState([
    {
      id: "1",
      scenarioId: "cafe",
      date: "2025-01-15",
      score: 85,
      duration: 180,
      messageCount: 12,
    },
    {
      id: "2",
      scenarioId: "friend",
      date: "2025-01-14",
      score: 72,
      duration: 240,
      messageCount: 18,
    },
    {
      id: "3",
      scenarioId: "teacher",
      date: "2025-01-13",
      score: 78,
      duration: 150,
      messageCount: 10,
    },
  ]);

  const stats = {
    totalConversations: conversations.length,
    averageScore: Math.round(
      conversations.reduce((acc, c) => acc + c.score, 0) / conversations.length
    ),
    totalTime: conversations.reduce((acc, c) => acc + c.duration, 0),
    thisWeek: 5,
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}分`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", {
      month: "short",
      day: "numeric",
      weekday: "short",
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">学習履歴</h1>
        <p className="text-muted-foreground">
          これまでの会話練習を振り返りましょう
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総会話数</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversations}</div>
            <p className="text-xs text-muted-foreground">
              今週: {stats.thisWeek}回
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均スコア</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}点</div>
            <p className="text-xs text-muted-foreground">
              100点満点中
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">総学習時間</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(stats.totalTime / 60)}分
            </div>
            <p className="text-xs text-muted-foreground">
              累計練習時間
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今週の進捗</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.thisWeek}回</div>
            <p className="text-xs text-muted-foreground">
              先週より +2回
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 会話履歴リスト */}
      <Card>
        <CardHeader>
          <CardTitle>最近の会話</CardTitle>
          <CardDescription>
            過去の会話記録を確認できます
          </CardDescription>
        </CardHeader>
        <CardContent>
          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                まだ会話履歴がありません
              </p>
              <Button onClick={() => router.push("/scenarios")}>
                会話を始める
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map((conversation) => {
                const scenario = scenarios[conversation.scenarioId];
                return (
                  <div
                    key={conversation.id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() =>
                      router.push(`/feedback?id=${conversation.id}`)
                    }
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{scenario.name}</p>
                        <Badge
                          variant={
                            conversation.score >= 80
                              ? "default"
                              : conversation.score >= 60
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {conversation.score}点
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{formatDate(conversation.date)}</span>
                        <span>•</span>
                        <span>{formatDuration(conversation.duration)}</span>
                        <span>•</span>
                        <span>{conversation.messageCount}メッセージ</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* もっと練習するボタン */}
      {conversations.length > 0 && (
        <Button
          size="lg"
          className="w-full"
          onClick={() => router.push("/scenarios")}
        >
          <MessageSquare className="mr-2 h-5 w-5" />
          新しい会話を始める
        </Button>
      )}
    </div>
  );
}
