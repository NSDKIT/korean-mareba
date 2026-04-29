import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';

export async function GET() {
  try {
    await getAdminUser();

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

    return NextResponse.json({
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
    });
  } catch (error: any) {
    console.error('Stats API error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}
