import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import type { Message, FeedbackReport } from '@/types';

const FeedbackSchema = z.object({
  totalScore: z.number().min(0).max(100),
  breakdown: z.object({
    fluency: z.number().min(0).max(30),
    accuracy: z.number().min(0).max(30),
    vocabulary: z.number().min(0).max(20),
    taskCompletion: z.number().min(0).max(20),
  }),
  goodPoints: z.array(z.string()),
  improvements: z.array(
    z.object({
      original: z.string(),
      suggestion: z.string(),
      explanation: z.string(),
    })
  ),
  newWords: z.array(
    z.object({
      ko: z.string(),
      ruby: z.string(),
      ja: z.string(),
    })
  ),
});

export async function generateFeedback(
  messages: Message[],
  plan: string
): Promise<FeedbackReport> {
  const model = plan === 'PREMIUM' ? openai('gpt-4o') : openai('gpt-4o-mini');

  const { object } = await generateObject({
    model,
    schema: FeedbackSchema,
    prompt: `
以下の韓国語会話を分析して、詳細なフィードバックを生成してください。

会話履歴:
${JSON.stringify(messages, null, 2)}

評価基準:
- fluency (流暢さ): 0-30点
- accuracy (正確性): 0-30点
- vocabulary (語彙力): 0-20点
- taskCompletion (会話目標達成度): 0-20点

フィードバック内容:
1. goodPoints: 良かった点を3-5個挙げる
2. improvements: 改善点を3-5個挙げる（元の文、提案、説明）
3. newWords: 会話に出てきた重要な単語を5-10個挙げる（韓国語、ルビ、日本語訳）
    `.trim(),
  });

  return object as FeedbackReport;
}
