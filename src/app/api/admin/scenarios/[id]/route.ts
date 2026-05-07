import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/supabase/server';
import { scenarios } from '@/lib/data/scenarios';

export const dynamic = 'force-dynamic';

// GET /api/admin/scenarios/[id] - シナリオ詳細取得
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await getAdminUser();

    const scenario = scenarios[params.id];

    if (!scenario) {
      return NextResponse.json(
        { error: 'シナリオが見つかりません' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      scenario,
    });
  } catch (error: any) {
    console.error('Get scenario error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}

// PUT /api/admin/scenarios/[id] - シナリオ更新
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await getAdminUser();

    const scenario = scenarios[params.id];

    if (!scenario) {
      return NextResponse.json(
        { error: 'シナリオが見つかりません' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { name, nameKo, description, aiRole, scenarioType, minLevel, maxLevel } = body;

    // バリデーション
    if (!name || !nameKo || !description || !aiRole || !scenarioType) {
      return NextResponse.json(
        { error: '必須フィールドが不足しています' },
        { status: 400 }
      );
    }

    // DEMO MODE: メモリ上で更新（実際はDBに保存）
    scenarios[params.id] = {
      ...scenario,
      name,
      nameKo,
      description,
      aiRole,
      scenarioType,
      minLevel: parseInt(minLevel),
      maxLevel: parseInt(maxLevel),
    };

    return NextResponse.json({
      message: 'シナリオを更新しました',
      scenario: scenarios[params.id],
    });
  } catch (error: any) {
    console.error('Update scenario error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}

// DELETE /api/admin/scenarios/[id] - シナリオ削除
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await getAdminUser();

    const scenario = scenarios[params.id];

    if (!scenario) {
      return NextResponse.json(
        { error: 'シナリオが見つかりません' },
        { status: 404 }
      );
    }

    // DEMO MODE: メモリ上から削除（実際はDBから削除）
    delete scenarios[params.id];

    return NextResponse.json({
      message: 'シナリオを削除しました',
    });
  } catch (error: any) {
    console.error('Delete scenario error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}
