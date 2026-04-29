import { createBrowserClient } from '@supabase/ssr';

// 環境変数がない場合でもビルドできるようにする
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-anon-key-for-build'
  );
}
