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

    await prisma.user.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('User delete API error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}
