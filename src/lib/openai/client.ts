import { openai } from '@ai-sdk/openai';

export function getOpenAIModel(plan: string, level: number) {
  // Premium プランでレベル4-5の場合は GPT-4o を使用
  if (plan === 'PREMIUM' && level >= 4) {
    return openai('gpt-4o');
  }
  // それ以外は GPT-4o-mini を使用
  return openai('gpt-4o-mini');
}
