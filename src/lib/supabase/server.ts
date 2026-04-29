import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma/client';
import type { UserProfile } from '@/types';

export async function createClient() {
  const cookieStore = await cookies();

  // 環境変数がない場合でもビルドできるようにする
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key-for-build',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

export async function getUser(): Promise<UserProfile | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch user profile from Prisma
  const profile = await prisma.user.findUnique({
    where: { email: user.email! },
  });

  if (!profile) return null;

  return {
    id: profile.id,
    email: profile.email,
    level: profile.level,
    plan: profile.plan,
    stripeCustomerId: profile.stripeCustomerId ?? undefined,
    stripeSubscriptionId: profile.stripeSubscriptionId ?? undefined,
    createdAt: profile.createdAt,
    updatedAt: profile.updatedAt,
  };
}
