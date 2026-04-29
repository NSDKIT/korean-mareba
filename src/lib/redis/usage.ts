import { redis } from './client';
import type { Plan } from '@/types';

const getKey = (userId: string, date: string) => `usage:${userId}:${date}`;

export async function getDailyCount(userId: string): Promise<number> {
  const date = new Date().toISOString().split('T')[0];
  const key = getKey(userId, date);
  const count = await redis.get<number>(key);
  return count ?? 0;
}

export async function incrementDailyCount(userId: string): Promise<number> {
  const date = new Date().toISOString().split('T')[0];
  const key = getKey(userId, date);
  const count = await redis.incr(key);

  // 翌日0時に期限切れ
  if (count === 1) {
    await redis.expireat(key, getNextMidnightUnix());
  }

  return count;
}

export async function checkUsageLimit(userId: string, plan: Plan): Promise<boolean> {
  const limits: Record<Plan, number> = {
    FREE: 3,
    STANDARD: 10,
    PREMIUM: 20,
  };

  const count = await getDailyCount(userId);
  return count < limits[plan];
}

function getNextMidnightUnix(): number {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return Math.floor(tomorrow.getTime() / 1000);
}
