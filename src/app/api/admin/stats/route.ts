import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await getAdminUser();

    // DEMO MODE: モックデータを返す
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    if (isDemoMode) {
      return NextResponse.json({
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
      });
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
