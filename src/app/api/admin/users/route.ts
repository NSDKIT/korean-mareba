import { NextResponse } from 'next/server';
import { getAdminUser } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    await getAdminUser();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const search = searchParams.get('search') || '';
    const pageSize = 20;

    // DEMO MODE: モックデータを返す
    const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
    if (isDemoMode) {
      const mockUsers = [
        {
          id: 'demo-test-user-id',
          email: 'test@gmail.com',
          role: 'USER',
          level: 3,
          plan: 'FREE',
          createdAt: new Date('2024-04-15'),
          conversationCount: 12,
          lastConversationAt: new Date('2024-05-01'),
        },
        {
          id: 'demo-admin-user-id',
          email: 'admin@gmail.com',
          role: 'ADMIN',
          level: 5,
          plan: 'PREMIUM',
          createdAt: new Date('2024-01-01'),
          conversationCount: 45,
          lastConversationAt: new Date('2024-05-01'),
        },
        {
          id: 'demo-user-2',
          email: 'user2@example.com',
          role: 'USER',
          level: 2,
          plan: 'STANDARD',
          createdAt: new Date('2024-03-20'),
          conversationCount: 8,
          lastConversationAt: new Date('2024-04-28'),
        },
      ];

      const filteredUsers = search
        ? mockUsers.filter((u) => u.email.toLowerCase().includes(search.toLowerCase()))
        : mockUsers;

      return NextResponse.json({
        users: filteredUsers,
        pagination: {
          page: 1,
          pageSize: 20,
          total: filteredUsers.length,
          totalPages: 1,
        },
      });
    }

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
