import { GoogleGenerativeAI } from '@google/generative-ai';

// 環境変数がない場合でもビルドできるようにする
export const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'dummy-key-for-build');

export function getGeminiTTSModel(plan: string) {
  // Premium プランは Gemini Pro TTS、Standard は Flash TTS
  return plan === 'PREMIUM'
    ? 'gemini-2.5-pro-preview-tts'
    : 'gemini-2.5-flash-preview-tts';
}

// 場面別ボイス設定
export const VOICE_MAP: Record<
  string,
  { voice: string; style: string }
> = {
  cafe: {
    voice: 'Kore',
    style: '明るく親しみやすいカフェ店員として話してください',
  },
  friend: {
    voice: 'Puck',
    style: 'カジュアルでエネルギッシュな友人として話してください',
  },
  business: {
    voice: 'Charon',
    style: '落ち着いたプロフェッショナルなビジネスパーソンとして話してください',
  },
  teacher: {
    voice: 'Leda',
    style: '温かく教育的な先生として話してください',
  },
  hotel: {
    voice: 'Enceladus',
    style: '丁寧でプロフェッショナルなホテルスタッフとして話してください',
  },
};
