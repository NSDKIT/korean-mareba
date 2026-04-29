import { genai, getGeminiTTSModel, VOICE_MAP } from '@/lib/gemini/client';
import { getUser } from '@/lib/supabase/server';
import { checkEnvGroup, createEnvErrorResponse } from '@/lib/env';

export async function POST(req: Request) {
  // 環境変数チェック
  const envCheck = checkEnvGroup('gemini');
  if (!envCheck.isValid) {
    return createEnvErrorResponse('Gemini TTS', envCheck.missing);
  }

  try {
    const user = await getUser();
    if (!user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const { text, scenarioType } = await req.json();

    if (!text) {
      return new Response('Missing text', { status: 400 });
    }

    // プランに応じたモデル選択（Premium: Pro TTS, それ以外: Flash TTS）
    const modelName = getGeminiTTSModel(user.plan);

    // 場面に応じたボイス設定
    const voiceConfig = VOICE_MAP[scenarioType] ?? VOICE_MAP.teacher;

    // Gemini TTS API呼び出し
    const model = genai.getGenerativeModel({ model: modelName });

    // 型エラー回避のため一時的にanyを使用（Gemini TTS APIは新しい機能のため型定義が不完全）
    const response: any = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `${voiceConfig.style}\n\n${text}`,
            },
          ],
        },
      ],
      generationConfig: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {
              voiceName: voiceConfig.voice,
            },
          },
        },
      } as any,
    });

    const audioData =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!audioData) {
      return new Response('TTS generation failed', { status: 500 });
    }

    // Base64デコードして音声データを返す
    const audioBuffer = Buffer.from(audioData, 'base64');

    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.length.toString(),
      },
    });
  } catch (error) {
    console.error('TTS API error:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
