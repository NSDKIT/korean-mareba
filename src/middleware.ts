import { type NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';
import { createServerClient } from '@supabase/ssr';
import { prisma } from '@/lib/prisma/client';

export async function middleware(request: NextRequest) {
  const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

  console.log('[Middleware] Path:', request.nextUrl.pathname, 'isDemoMode:', isDemoMode);

  // 管理者が通常アプリにアクセスしようとした場合、管理画面にリダイレクト
  const appRoutes = ['/home', '/scenarios', '/preview', '/chat', '/feedback', '/history', '/settings'];
  const isAppRoute = appRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  if (isAppRoute) {
    // DEMO MODE: cookieから管理者判定
    if (isDemoMode) {
      const demoUserEmail = request.cookies.get('demo_user_email')?.value;
      if (demoUserEmail === 'admin@gmail.com') {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/dashboard';
        return NextResponse.redirect(url);
      }
    } else {
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

      if (user) {
        try {
          const profile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { role: true },
          });

          if (profile && profile.role === 'ADMIN') {
            const url = request.nextUrl.clone();
            url.pathname = '/admin/dashboard';
            return NextResponse.redirect(url);
          }
        } catch (error) {
          console.error('Error checking user role:', error);
        }
      }
    }
  }

  // /admin配下へのアクセスチェック
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('[Middleware] Admin route detected');
    // DEMO MODE: cookieから管理者判定
    if (isDemoMode) {
      const demoUserEmail = request.cookies.get('demo_user_email')?.value;
      console.log('[Middleware] DEMO MODE - User email:', demoUserEmail);
      if (!demoUserEmail) {
        console.log('[Middleware] No user, redirect to login');
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
      if (demoUserEmail !== 'admin@gmail.com') {
        console.log('[Middleware] Not admin, redirect to home');
        const url = request.nextUrl.clone();
        url.pathname = '/home';
        return NextResponse.redirect(url);
      }
      console.log('[Middleware] Admin verified, allow access');
    } else {
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
  }

  // DEMO MODEではセッション更新をスキップ
  if (isDemoMode) {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
