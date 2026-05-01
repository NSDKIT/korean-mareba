"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';

interface UserDetail {
  id: string;
  email: string;
  role: string;
  level: number;
  plan: string;
  createdAt: string;
  updatedAt: string;
  conversations: any[];
  savedPhrases: any[];
}

interface Stats {
  totalConversations: number;
  averageScore: number;
  totalDuration: number;
  savedPhrasesCount: number;
}

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<UserDetail | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    level: 1,
    plan: 'FREE',
    role: 'USER',
  });

  useEffect(() => {
    fetchUser();
  }, [params.id]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${params.id}`);
      const data = await res.json();
      setUser(data.user);
      setStats(data.stats);
      setFormData({
        level: data.user.level,
        plan: data.user.plan,
        role: data.user.role,
      });
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/admin/users/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await fetchUser();
        setEditMode(false);
        alert('ユーザー情報を更新しました');
      }
    } catch (error) {
      console.error('Failed to update user:', error);
      alert('更新に失敗しました');
    }
  };

  const handleDelete = async () => {
    if (!confirm('本当にこのユーザーを削除しますか？この操作は取り消せません。')) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users/${params.id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('ユーザーを削除しました');
        router.push('/admin/users');
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('削除に失敗しました');
    }
  };

  if (loading || !user || !stats) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">ユーザー詳細</h1>
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
            onClick={() => router.push('/admin/users')}
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            戻る
          </Button>
          <h1 className="text-3xl font-bold">ユーザー詳細</h1>
        </div>
        <div className="flex gap-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                キャンセル
              </Button>
              <Button onClick={handleUpdate}>
                <Save className="h-4 w-4 mr-1" />
                保存
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setEditMode(true)}>
                編集
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-1" />
                削除
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Email</Label>
              <p className="text-sm mt-1">{user.email}</p>
            </div>

            <div>
              <Label>Level</Label>
              {editMode ? (
                <Select
                  value={formData.level.toString()}
                  onValueChange={(v) => setFormData({ ...formData, level: parseInt(v) })}
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
              ) : (
                <p className="text-sm mt-1">レベル {user.level}</p>
              )}
            </div>

            <div>
              <Label>Plan</Label>
              {editMode ? (
                <Select
                  value={formData.plan}
                  onValueChange={(v) => setFormData({ ...formData, plan: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FREE">FREE</SelectItem>
                    <SelectItem value="STANDARD">STANDARD</SelectItem>
                    <SelectItem value="PREMIUM">PREMIUM</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge
                  variant={
                    user.plan === 'PREMIUM'
                      ? 'default'
                      : user.plan === 'STANDARD'
                      ? 'secondary'
                      : 'outline'
                  }
                  className="mt-1"
                >
                  {user.plan}
                </Badge>
              )}
            </div>

            <div>
              <Label>Role</Label>
              {editMode ? (
                <Select
                  value={formData.role}
                  onValueChange={(v) => setFormData({ ...formData, role: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">USER</SelectItem>
                    <SelectItem value="ADMIN">ADMIN</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <Badge
                  variant={user.role === 'ADMIN' ? 'default' : 'outline'}
                  className="mt-1"
                >
                  {user.role}
                </Badge>
              )}
            </div>

            <div>
              <Label>登録日</Label>
              <p className="text-sm mt-1">
                {new Date(user.createdAt).toLocaleString('ja-JP')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>統計情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">総会話数</span>
              <span className="text-2xl font-bold">{stats.totalConversations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">平均スコア</span>
              <span className="text-2xl font-bold">{stats.averageScore}点</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">総学習時間</span>
              <span className="text-2xl font-bold">
                {Math.floor(stats.totalDuration / 60)}分
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">保存フレーズ数</span>
              <span className="text-2xl font-bold">{stats.savedPhrasesCount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>最近の会話履歴</CardTitle>
        </CardHeader>
        <CardContent>
          {user.conversations.length === 0 ? (
            <p className="text-sm text-muted-foreground">会話履歴がありません</p>
          ) : (
            <div className="space-y-2">
              {user.conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">シナリオ: {conv.scenarioId}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(conv.createdAt).toLocaleString('ja-JP')}
                    </p>
                  </div>
                  {conv.score && (
                    <Badge>{conv.score}点</Badge>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
