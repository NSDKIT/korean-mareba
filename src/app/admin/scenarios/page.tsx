"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Plus } from 'lucide-react';

interface Scenario {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  aiRole: string;
  scenarioType: string;
  minLevel: number;
  maxLevel: number;
}

export default function ScenariosManagePage() {
  const router = useRouter();
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScenarios();
  }, []);

  const fetchScenarios = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/scenarios');
      const data = await res.json();
      setScenarios(data.scenarios);
    } catch (error) {
      console.error('Failed to fetch scenarios:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">シナリオ管理</h1>
        <Button onClick={() => router.push('/admin/scenarios/new')}>
          <Plus className="h-4 w-4 mr-1" />
          新規作成
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>シナリオ一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-center text-muted-foreground py-8">読み込み中...</p>
          ) : scenarios.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">シナリオがありません</p>
          ) : (
            <div className="space-y-3">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{scenario.name}</h3>
                      <span className="text-sm text-muted-foreground">{scenario.nameKo}</span>
                      <Badge variant="outline">
                        Lv.{scenario.minLevel} - {scenario.maxLevel}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {scenario.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      タイプ: {scenario.scenarioType}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/scenarios/${scenario.id}`)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    編集
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
