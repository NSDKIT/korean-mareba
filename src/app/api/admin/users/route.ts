import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';

export async function GET(req: Request) {
  try {
    await getAdminUser();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const pageSize = 20;

    const where: any = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' } },
            { id: { contains: search } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
        include: {
          _count: {
            select: { conversations: true },
          },
          conversations: {
            take: 1,
            orderBy: { createdAt: 'desc' },
            select: { createdAt: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users: users.map((u) => ({
        ...u,
        conversationCount: u._count.conversations,
        lastConversationAt: u.conversations[0]?.createdAt,
      })),
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('Users API error:', error);
    return new Response('Unauthorized', { status: 401 });
  }
}
