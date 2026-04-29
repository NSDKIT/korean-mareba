import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { scenarios } from '@/lib/data/scenarios';
import { prisma } from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

async function getScenarioStats() {
  const stats = await Promise.all(
    Object.keys(scenarios).map(async (scenarioId) => {
      const [count, avgScore] = await Promise.all([
        prisma.conversation.count({
          where: { scenarioId },
        }),
        prisma.conversation.aggregate({
          where: { scenarioId, score: { not: null } },
          _avg: { score: true },
        }),
      ]);

      return {
        scenarioId,
        conversationCount: count,
        averageScore: avgScore._avg.score || 0,
      };
    })
  );

  return stats;
}

export default async function ScenariosAdminPage() {
  const stats = await getScenarioStats();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">シナリオ管理</h1>

      <div className="grid gap-4">
        {Object.entries(scenarios).map(([id, scenario]) => {
          const stat = stats.find((s) => s.scenarioId === id);

          return (
            <Card key={id}>
              <CardHeader>
                <CardTitle>{scenario.name}</CardTitle>
                <CardDescription>{scenario.nameKo}</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">説明</p>
                  <p className="text-sm">{scenario.description}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">対象レベル</p>
                  <p className="text-sm">
                    Lv.{scenario.minLevel} 〜 Lv.{scenario.maxLevel}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">会話回数</p>
                  <p className="text-2xl font-bold">{stat?.conversationCount || 0}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">平均スコア</p>
                  <p className="text-2xl font-bold">
                    {Math.round(stat?.averageScore || 0)}点
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-muted">
        <CardHeader>
          <CardTitle className="text-base">シナリオの編集について</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>シナリオはファイルベースで管理されています。</p>
          <p className="mt-2">
            編集する場合は{' '}
            <code className="bg-muted px-1 py-0.5 rounded">
              /src/lib/data/scenarios.ts
            </code>{' '}
            を直接編集し、デプロイしてください。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
