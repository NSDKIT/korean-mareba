import { streamText } from 'ai';
import { getOpenAIModel } from '@/lib/openai/client';
import { checkUsageLimit, incrementDailyCount } from '@/lib/redis/usage';
import { getUser } from '@/lib/supabase/server';
import { buildSystemPrompt } from '@/lib/data/scenarios';
import { checkEnvGroup, createEnvErrorResponse } from '@/lib/env';

export async function POST(req: Request) {
  // 環境変数チェック
  const envCheck = checkEnvGroup('openai');
  if (!envCheck.isValid) {
    return createEnvErrorResponse('OpenAI Chat', envCheck.missing);
  }

  try {
    const user = await getUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    // 日次制限チェック
    const canUse = await checkUsageLimit(user.id, user.plan);
    if (!canUse) {
      return new Response('Daily limit reached', { status: 429 });
    }

    const { messages, scenarioId, level } = await req.json();

    if (!scenarioId || !level) {
      return new Response('Missing scenarioId or level', { status: 400 });
    }

    // プランとレベルに応じたモデル選択
    const model = getOpenAIModel(user.plan, level);

    // システムプロンプトを生成
    const systemPrompt = buildSystemPrompt(scenarioId, level, user.plan);

    // AI会話をストリーミング
    const result = await streamText({
      model,
      system: systemPrompt,
      messages,
      onFinish: async () => {
        // 会話完了後に使用回数をインクリメント
        await incrementDailyCount(user.id);
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
