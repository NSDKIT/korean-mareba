import type { Scenario, LevelConfig } from '@/types';

export const scenarios: Record<string, Scenario> = {
  cafe: {
    id: 'cafe',
    name: 'カフェで注文',
    nameKo: '카페에서 주문하기',
    description: 'カフェでコーヒーや食べ物を注文する会話を練習します',
    aiRole: 'あなたは明るくフレンドリーなカフェ店員です。お客様の注文を丁寧に聞き取り、メニューの提案をしてください。',
    scenarioType: 'cafe',
    minLevel: 1,
    maxLevel: 3,
  },
  friend: {
    id: 'friend',
    name: '友達との雑談',
    nameKo: '친구와의 수다',
    description: '友達との日常会話を楽しく練習します',
    aiRole: 'あなたは親しい友人です。カジュアルで楽しい雰囲気で、趣味や最近の出来事について話してください。',
    scenarioType: 'friend',
    minLevel: 2,
    maxLevel: 5,
  },
  business: {
    id: 'business',
    name: 'ビジネスミーティング',
    nameKo: '비즈니스 미팅',
    description: 'ビジネスシーンでの丁寧な会話を練習します',
    aiRole: 'あなたはビジネスパートナーです。プロフェッショナルで礼儀正しい態度で、仕事の打ち合わせを進めてください。',
    scenarioType: 'business',
    minLevel: 3,
    maxLevel: 5,
  },
  teacher: {
    id: 'teacher',
    name: '先生と学習相談',
    nameKo: '선생님과 학습 상담',
    description: '先生に質問したり相談したりする会話を練習します',
    aiRole: 'あなたは優しく教育熱心な韓国語の先生です。生徒の質問に丁寧に答え、励ましてください。',
    scenarioType: 'teacher',
    minLevel: 1,
    maxLevel: 5,
  },
  hotel: {
    id: 'hotel',
    name: 'ホテルでチェックイン',
    nameKo: '호텔에서 체크인',
    description: 'ホテルのフロントでの会話を練習します',
    aiRole: 'あなたは丁寧で親切なホテルのフロントスタッフです。お客様のチェックイン手続きをスムーズに進めてください。',
    scenarioType: 'hotel',
    minLevel: 2,
    maxLevel: 4,
  },
};

export const levelConfigs: Record<number, LevelConfig> = {
  1: {
    level: 1,
    name: '初級',
    description: 'ハングル読み書き、基本的な挨拶',
    vocabCount: '〜300語',
    instructions: `
【レベル1制約】
- 超基本的な語彙のみ使用（こんにちは、ありがとう、はい、いいえ等）
- 文法は最小限（〜です/ます、〜ですか）
- 短い1〜2文で応答する
- 日本語話者向けに助詞を強調して説明する
    `.trim(),
  },
  2: {
    level: 2,
    name: '初中級',
    description: '日常会話、簡単な旅行会話',
    vocabCount: '〜1,000語',
    instructions: `
【レベル2制約】
- 日常的な語彙を中心に使用
- TOPIK I（1-2級）レベルの文法
- 過去形、未来形を含む基本的な時制
- 2〜3文で自然な応答を心がける
- 頻出する助詞の使い分けを強調
    `.trim(),
  },
  3: {
    level: 3,
    name: '中級',
    description: '複雑な会話、意見を述べる',
    vocabCount: '〜3,000語',
    instructions: `
【レベル3制約】
- TOPIK II（3-4級）レベルの語彙・文法
- 接続表現を使った複文構造
- 理由や意見を述べる表現
- 3〜4文で論理的な応答
- 漢字語の手がかりを適宜提示
    `.trim(),
  },
  4: {
    level: 4,
    name: '中上級',
    description: '抽象的な話題、ビジネス会話',
    vocabCount: '〜6,000語',
    instructions: `
【レベル4制約】
- TOPIK II（5級）レベルの高度な語彙
- 抽象的・専門的な話題に対応
- 敬語の使い分け
- 慣用表現やことわざの使用
- 4〜5文で詳細な説明
    `.trim(),
  },
  5: {
    level: 5,
    name: '上級',
    description: 'ネイティブレベル、専門的な議論',
    vocabCount: '6,000語以上',
    instructions: `
【レベル5制約】
- TOPIK II（6級）レベルのネイティブに近い表現
- 複雑な論理展開
- ニュアンスの使い分け
- 俗語やスラング、流行語も含む
- 5文以上で詳細かつ自然な応答
    `.trim(),
  },
};

export function buildSystemPrompt(
  scenarioId: string,
  level: number,
  plan: string
): string {
  const scenario = scenarios[scenarioId];
  const levelConfig = levelConfigs[level];

  if (!scenario || !levelConfig) {
    throw new Error('Invalid scenario or level');
  }

  return `
# ロール設定
${scenario.aiRole}

# 言語レベル制御
${levelConfig.instructions}

# 日本語話者向け共通ルール
1. 助詞ヒント: は→는/은、が→가/이、を→를/을
2. 日韓のSOV構造の類似性を活用した指導
3. 苦手発音の重点指導: ㅓ vs ㅗ、パッチム、激音 vs 濃音
4. 漢字語の手がかり提示（例：図書館→도서관）

# リアルタイム補正
${
  plan !== 'FREE'
    ? '会話の流れを止めずに優しく言い換えて返すこと'
    : '誤りがあっても指摘せず、会話を続けること'
}

# 重要
- 必ず韓国語で応答する
- レベル${level}の語彙・文法範囲を厳守する
- 場面の役割から外れないこと
  `.trim();
}
