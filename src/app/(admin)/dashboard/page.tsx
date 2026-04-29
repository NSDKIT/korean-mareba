import { StatsCard } from '@/components/admin/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, TrendingUp, Calendar } from 'lucide-react';
import { scenarios } from '@/lib/data/scenarios';

export const dynamic = 'force-dynamic';

async function getStats() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/admin/stats`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function DashboardPage() {
  const stats = await getStats();

  if (!stats) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">ダッシュボード</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground">統計データの読み込みに失敗しました。</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">ダッシュボード</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="総ユーザー数"
          value={stats.users.total}
          icon={Users}
        />
        <StatsCard
          title="今週の新規登録"
          value={stats.users.newThisWeek}
          icon={TrendingUp}
        />
        <StatsCard
          title="総会話数"
          value={stats.conversations.total}
          icon={MessageSquare}
        />
        <StatsCard
          title="今日の会話数"
          value={stats.conversations.today}
          icon={Calendar}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>プラン別ユーザー数</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.users.byPlan.map((item: any) => (
              <div key={item.plan} className="flex items-center justify-between">
                <Badge
                  variant={
                    item.plan === 'PREMIUM'
                      ? 'default'
                      : item.plan === 'STANDARD'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {item.plan}
                </Badge>
                <span className="text-2xl font-bold">{item._count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>レベル別ユーザー数</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {stats.users.byLevel.map((item: any) => (
              <div key={item.level} className="flex items-center justify-between">
                <span className="text-sm font-medium">レベル {item.level}</span>
                <span className="text-2xl font-bold">{item._count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>シナリオ別人気ランキング</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {stats.conversations.byScenario.length > 0 ? (
            stats.conversations.byScenario.map((item: any, index: number) => {
              const scenario = scenarios[item.scenarioId as keyof typeof scenarios];
              return (
                <div key={item.scenarioId} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-muted-foreground">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{scenario?.name || item.scenarioId}</p>
                      <p className="text-xs text-muted-foreground">
                        {scenario?.nameKo || ''}
                      </p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{item._count}</span>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">会話データがありません</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
