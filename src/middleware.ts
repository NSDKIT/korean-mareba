import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/prisma/client';

export async function middleware(request: NextRequest) {
  // DEMO MODE: 認証を一時的にスキップ（Supabase設定前のデモ用）
  // 本番環境では必ずこのコメントアウトを外してください
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  if (isDemoMode) {
    return NextResponse.next();
  }

  const sessionResponse = await updateSession(request);

  // /admin配下へのアクセスチェック
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key-for-build',
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll() {
            // Middleware内では使用しない
          },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // ユーザーのロールをチェック
    try {
      const profile = await prisma.user.findUnique({
        where: { email: user.email! },
        select: { role: true },
      });

      if (!profile || profile.role !== 'ADMIN') {
        const url = request.nextUrl.clone();
        url.pathname = '/home';
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      const url = request.nextUrl.clone();
      url.pathname = '/home';
      return NextResponse.redirect(url);
    }
  }

  return sessionResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
