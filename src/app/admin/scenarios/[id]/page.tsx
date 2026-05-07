"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

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

export default function ScenarioEditPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Scenario>({
    id: '',
    name: '',
    nameKo: '',
    description: '',
    aiRole: '',
    scenarioType: 'cafe',
    minLevel: 1,
    maxLevel: 3,
  });

  const isNew = params.id === 'new';

  useEffect(() => {
    if (!isNew) {
      fetchScenario();
    } else {
      setLoading(false);
    }
  }, [params.id]);

  const fetchScenario = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/scenarios/${params.id}`);
      const data = await res.json();
      setScenario(data.scenario);
      setFormData(data.scenario);
    } catch (error) {
      console.error('Failed to fetch scenario:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isNew ? '/api/admin/scenarios' : `/api/admin/scenarios/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert(isNew ? 'シナリオを作成しました' : 'シナリオを更新しました');
        router.push('/admin/scenarios');
      } else {
        const data = await res.json();
        alert(data.error || '操作に失敗しました');
      }
    } catch (error) {
      console.error('Failed to save scenario:', error);
      alert('保存に失敗しました');
    }
  };

  const handleDelete = async () => {
    if (!confirm('本当にこのシナリオを削除しますか？この操作は取り消せません。')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/scenarios/${params.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('シナリオを削除しました');
        router.push('/admin/scenarios');
      }
    } catch (error) {
      console.error('Failed to delete scenario:', error);
      alert('削除に失敗しました');
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">シナリオ編集</h1>
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">読み込み中...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/admin/scenarios')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            戻る
          </Button>
          <h1 className="text-3xl font-bold">
            {isNew ? 'シナリオ新規作成' : 'シナリオ編集'}
          </h1>
        </div>
        {!isNew && (
          <Button variant="destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 mr-1" />
            削除
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="id">シナリオID *</Label>
                <Input
                  id="id"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  placeholder="例: cafe"
                  required
                  disabled={!isNew}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="scenarioType">シナリオタイプ *</Label>
                <Select
                  value={formData.scenarioType}
                  onValueChange={(v) => setFormData({ ...formData, scenarioType: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cafe">カフェ</SelectItem>
                    <SelectItem value="friend">友達</SelectItem>
                    <SelectItem value="business">ビジネス</SelectItem>
                    <SelectItem value="teacher">先生</SelectItem>
                    <SelectItem value="hotel">ホテル</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">シナリオ名（日本語） *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="例: カフェで注文"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameKo">シナリオ名（韓国語） *</Label>
                <Input
                  id="nameKo"
                  value={formData.nameKo}
                  onChange={(e) => setFormData({ ...formData, nameKo: e.target.value })}
                  placeholder="例: 카페에서 주문하기"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明 *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="シナリオの説明を入力..."
                rows={3}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="aiRole">AIロール *</Label>
              <Textarea
                id="aiRole"
                value={formData.aiRole}
                onChange={(e) => setFormData({ ...formData, aiRole: e.target.value })}
                placeholder="AIの役割を入力..."
                rows={4}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="minLevel">最小レベル *</Label>
                <Select
                  value={formData.minLevel.toString()}
                  onValueChange={(v) => setFormData({ ...formData, minLevel: parseInt(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((l) => (
                      <SelectItem key={l} value={l.toString()}>
                        レベル {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxLevel">最大レベル *</Label>
                <Select
                  value={formData.maxLevel.toString()}
                  onValueChange={(v) => setFormData({ ...formData, maxLevel: parseInt(v) })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((l) => (
                      <SelectItem key={l} value={l.toString()}>
                        レベル {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push('/admin/scenarios')}
              >
                キャンセル
              </Button>
              <Button type="submit">
                <Save className="h-4 w-4 mr-1" />
                {isNew ? '作成' : '保存'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
