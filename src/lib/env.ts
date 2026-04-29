/**
 * 環境変数チェックユーティリティ
 * ビルド時ではなく実行時にチェックすることで、
 * 環境変数がなくてもデプロイ可能にする
 */

export interface EnvCheckResult {
  isValid: boolean;
  missing: string[];
  message?: string;
}

const REQUIRED_ENV_VARS = {
  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: 'Supabase URL',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'Supabase Anon Key',
  SUPABASE_SERVICE_ROLE_KEY: 'Supabase Service Role Key',

  // Database
  DATABASE_URL: 'Database URL',

  // Redis
  UPSTASH_REDIS_REST_URL: 'Upstash Redis URL',
  UPSTASH_REDIS_REST_TOKEN: 'Upstash Redis Token',

  // OpenAI
  OPENAI_API_KEY: 'OpenAI API Key',

  // Gemini
  GEMINI_API_KEY: 'Gemini API Key',

  // Stripe
  STRIPE_SECRET_KEY: 'Stripe Secret Key',
  STRIPE_WEBHOOK_SECRET: 'Stripe Webhook Secret',
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: 'Stripe Publishable Key',

  // App
  NEXT_PUBLIC_APP_URL: 'App URL',
};

/**
 * 環境変数をチェック
 */
export function checkEnv(): EnvCheckResult {
  const missing: string[] = [];

  for (const [key, label] of Object.entries(REQUIRED_ENV_VARS)) {
    const value = process.env[key];
    if (!value || value.startsWith('your_') || value === '') {
      missing.push(label);
    }
  }

  if (missing.length > 0) {
    return {
      isValid: false,
      missing,
      message: `以下の環境変数が設定されていません: ${missing.join(', ')}`,
    };
  }

  return {
    isValid: true,
    missing: [],
  };
}

/**
 * 特定の環境変数グループをチェック
 */
export function checkEnvGroup(group: 'supabase' | 'stripe' | 'openai' | 'gemini' | 'redis'): EnvCheckResult {
  const missing: string[] = [];

  const groups = {
    supabase: ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY'],
    stripe: ['STRIPE_SECRET_KEY', 'STRIPE_WEBHOOK_SECRET', 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'],
    openai: ['OPENAI_API_KEY'],
    gemini: ['GEMINI_API_KEY'],
    redis: ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  };

  const keysToCheck = groups[group];

  for (const key of keysToCheck) {
    const value = process.env[key];
    if (!value || value.startsWith('your_') || value === '') {
      missing.push(REQUIRED_ENV_VARS[key as keyof typeof REQUIRED_ENV_VARS]);
    }
  }

  if (missing.length > 0) {
    return {
      isValid: false,
      missing,
      message: `${group.toUpperCase()}の設定が不完全です: ${missing.join(', ')}`,
    };
  }

  return {
    isValid: true,
    missing: [],
  };
}

/**
 * エラーレスポンスを生成
 */
export function createEnvErrorResponse(service: string, missing: string[]) {
  return new Response(
    JSON.stringify({
      error: 'Configuration Error',
      message: `${service}の環境変数が設定されていません`,
      missing,
      hint: '.env.localファイルを確認して、必要な環境変数を設定してください',
    }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
