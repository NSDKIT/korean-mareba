import { Redis } from '@upstash/redis';

// 環境変数がない場合でもビルドできるようにする
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || 'https://dummy-redis.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || 'dummy-token-for-build',
});
