import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/supabase/server';
import { scenarios } from '@/lib/data/scenarios';

export const dynamic = 'force-dynamic';

// GET /api/admin/scenarios - シナリオ一覧取得
export async function GET() {
  try {
    await getAdminUser();

    const scenarioList = Object.values(scenarios);

    return NextResponse.json({
      scenarios: scenarioList,
    });
  } catch (error: any) {
    console.error('Scenarios API error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}

// POST /api/admin/scenarios - シナリオ新規作成
export async function POST(request: Request) {
  try {
    await getAdminUser();

    const body = await request.json();
    const { id, name, nameKo, description, aiRole, scenarioType, minLevel, maxLevel } = body;

    // バリデーション
    if (!id || !name || !nameKo || !description || !aiRole || !scenarioType) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      );
    }

    // 既存のシナリオIDチェック
    if (scenarios[id]) {
      return NextResponse.json(
        { error: 'このIDは既に使用されています' },
        { status: 400 }
      );
    }

    // DEMO MODE: メモリ上に追加（実際はDBに保存）
    scenarios[id] = {
      id,
      name,
      nameKo,
      description,
      aiRole,
      scenarioType,
      minLevel: parseInt(minLevel),
      maxLevel: parseInt(maxLevel),
    };

    return NextResponse.json({
      message: 'シナリオを作成しました',
      scenario: scenarios[id],
    });
  } catch (error: any) {
    console.error('Create scenario error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}
