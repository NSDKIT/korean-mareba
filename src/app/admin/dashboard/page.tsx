import { StatsCard } from '@/components/admin/stats-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, TrendingUp, Calendar } from 'lucide-react';
import { scenarios } from '@/lib/data/scenarios';
import { getAdminUser } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

async function getStats() {
  try {
    await getAdminUser();

    // DEMO MODE: モックデータを返す
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    if (isDemoMode) {
      return {
        users: {
          total: 156,
          newThisWeek: 23,
          byPlan: [
            { plan: 'FREE', _count: 98 },
            { plan: 'STANDARD', _count: 42 },
            { plan: 'PREMIUM', _count: 16 },
          ],
          byLevel: [
            { level: 1, _count: 45 },
            { level: 2, _count: 38 },
            { level: 3, _count: 32 },
            { level: 4, _count: 25 },
            { level: 5, _count: 16 },
          ],
        },
        conversations: {
          total: 1247,
          today: 34,
          byScenario: [
            { scenarioId: 'cafe-order', _count: 342 },
            { scenarioId: 'hotel-checkin', _count: 298 },
            { scenarioId: 'shopping', _count: 267 },
            { scenarioId: 'restaurant', _count: 189 },
            { scenarioId: 'taxi', _count: 151 },
          ],
        },
      };
    }

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const todayStart = new Date(new Date().toISOString().split('T')[0]);

    const [
      totalUsers,
      newUsersThisWeek,
      usersByPlan,
      usersByLevel,
      totalConversations,
      conversationsToday,
      conversationsByScenario,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: { createdAt: { gte: weekAgo } },
      }),
      prisma.user.groupBy({
        by: ['plan'],
        _count: true,
      }),
      prisma.user.groupBy({
        by: ['level'],
        _count: true,
      }),
      prisma.conversation.count(),
      prisma.conversation.count({
        where: { createdAt: { gte: todayStart } },
      }),
      prisma.conversation.groupBy({
        by: ['scenarioId'],
        _count: true,
        orderBy: { _count: { scenarioId: 'desc' } },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
        newThisWeek: newUsersThisWeek,
        byPlan: usersByPlan,
        byLevel: usersByLevel,
      },
      conversations: {
        total: totalConversations,
        today: conversationsToday,
        byScenario: conversationsByScenario,
      },
    };
  } catch (error: any) {
    console.error('Stats fetch error:', error);
    return null;
  }
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
