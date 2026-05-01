import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { scenarios } from '@/lib/data/scenarios';

export const dynamic = 'force-dynamic';

export default async function ConversationsPage() {
  // DEMO MODE: モックデータを表示
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (isDemoMode) {
    const mockConversations = [
      {
        id: '1',
        scenarioId: 'cafe-order',
        userEmail: 'test@gmail.com',
        score: 85,
        createdAt: new Date('2024-05-01T10:30:00'),
      },
      {
        id: '2',
        scenarioId: 'hotel-checkin',
        userEmail: 'test@gmail.com',
        score: 92,
        createdAt: new Date('2024-05-01T14:20:00'),
      },
      {
        id: '3',
        scenarioId: 'shopping',
        userEmail: 'user2@example.com',
        score: 78,
        createdAt: new Date('2024-04-30T16:45:00'),
      },
    ];

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">会話履歴</h1>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <p className="text-sm text-blue-800">
              DEMO MODE: これはサンプルデータです。本番環境では実際の会話履歴が表示されます。
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {mockConversations.map((conv) => {
            const scenario = scenarios[conv.scenarioId as keyof typeof scenarios];
            return (
              <Card key={conv.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{scenario?.name || conv.scenarioId}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{conv.userEmail}</p>
                    </div>
                    <Badge variant={conv.score >= 80 ? 'default' : 'secondary'}>
                      スコア: {conv.score}点
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {conv.createdAt.toLocaleString('ja-JP')}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">会話履歴</h1>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            データベースに接続して会話履歴を表示します。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
