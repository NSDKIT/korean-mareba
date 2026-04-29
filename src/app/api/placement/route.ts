import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { checkEnvGroup, createEnvErrorResponse } from '@/lib/env';

const PlacementResultSchema = z.object({
  level: z.number().min(1).max(5),
  reasoning: z.string(),
  confidence: z.number().min(0).max(1),
});

export async function POST(req: Request) {
  // 環境変数チェック
  const envCheck = checkEnvGroup('openai');
  if (!envCheck.isValid) {
    return createEnvErrorResponse('OpenAI Placement', envCheck.missing);
  }

  try {
    const { answers, conversationHistory } = await req.json();

    const { object } = await generateObject({
      model: openai('gpt-4o-mini'),
      schema: PlacementResultSchema,
      prompt: `
以下の回答データを元に、ユーザーの韓国語レベルをLv.1〜5で判定してください。

選択式テスト回答: ${JSON.stringify(answers)}
AI短文会話履歴: ${JSON.stringify(conversationHistory)}

判定基準:
- Lv.1: ハングル読み書きレベル、語彙300語以下
- Lv.2: TOPIK I（1-2級）相当、語彙1,000語以下
- Lv.3: TOPIK II（3-4級）相当、語彙3,000語以下
- Lv.4: TOPIK II（5級）相当、語彙6,000語以下
- Lv.5: TOPIK II（6級）相当、語彙6,000語以上
      `.trim(),
    });

    return Response.json(object);
  } catch (error) {
    console.error('Placement API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
