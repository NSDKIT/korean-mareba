import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await getAdminUser();

    // DEMO MODE: モックデータを返す
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    if (isDemoMode) {
      const mockUserData: Record<string, any> = {
        'demo-test-user-id': {
          id: 'demo-test-user-id',
          email: 'test@gmail.com',
          role: 'USER',
          level: 3,
          plan: 'FREE',
          createdAt: new Date('2024-04-15'),
          updatedAt: new Date('2024-05-01'),
          conversations: [],
          savedPhrases: [],
          _count: { conversations: 12, savedPhrases: 5 },
        },
        'demo-admin-user-id': {
          id: 'demo-admin-user-id',
          email: 'admin@gmail.com',
          role: 'ADMIN',
          level: 5,
          plan: 'PREMIUM',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-05-01'),
          conversations: [],
          savedPhrases: [],
          _count: { conversations: 45, savedPhrases: 23 },
        },
      };

      const user = mockUserData[params.id];
      if (!user) {
        return new Response('User not found', { status: 404 });
      }

      return NextResponse.json({
        user,
        stats: {
          totalConversations: user._count.conversations,
          averageScore: 82,
          totalDuration: 3600,
          savedPhrasesCount: user._count.savedPhrases,
        },
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.id },
      include: {
        conversations: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        savedPhrases: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
        _count: {
          select: {
            conversations: true,
            savedPhrases: true,
          },
        },
      },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // 統計計算
    const avgScore =
      user.conversations.length > 0
        ? user.conversations
            .filter((c) => c.score !== null)
            .reduce((acc, c) => acc + (c.score || 0), 0) /
          user.conversations.filter((c) => c.score !== null).length
        : 0;

    const totalDuration = user.conversations.reduce(
      (acc, c) => acc + (c.duration || 0),
      0
    );

    return NextResponse.json({
      user,
      stats: {
        totalConversations: user._count.conversations,
        averageScore: Math.round(avgScore),
        totalDuration,
        savedPhrasesCount: user._count.savedPhrases,
      },
    });
  } catch (error) {
    console.error('User detail API error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await getAdminUser();
    const body = await req.json();
    const { level, plan, role } = body;

    // DEMO MODE: モック更新（実際には更新しない）
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    if (isDemoMode) {
      return NextResponse.json({
        id: params.id,
        level: level ?? 3,
        plan: plan ?? 'FREE',
        role: role ?? 'USER',
        message: 'DEMO MODE: 更新はシミュレートされました',
      });
    }

    const updateData: any = {};
    if (level !== undefined) updateData.level = level;
    if (plan !== undefined) updateData.plan = plan;
    if (role !== undefined) updateData.role = role;

    const updated = await prisma.user.update({
      where: { id: params.id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('User update API error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await getAdminUser();

    // DEMO MODE: モック削除（実際には削除しない）
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    if (isDemoMode) {
      return NextResponse.json({
        success: true,
        message: 'DEMO MODE: 削除はシミュレートされました',
      });
    }

    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('User delete API error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}
