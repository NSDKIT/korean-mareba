---
name: mareba-dev
description: |
  「말해봐 マレバ」韓国語学習AI会話アプリの開発スキル。
  Next.js 14 / TypeScript / Supabase / Prisma / Upstash Redis / Stripe / Gemini TTS / OpenAI GPT-4o を組み合わせたフルスタック開発の手順・設計原則・実装パターンを提供する。

  以下のような作業で必ずこのスキルを参照すること：
  - 新しい画面・コンポーネントの実装
  - AI会話エンジン・Gemini TTSの統合
  - Stripe決済・プラン管理の実装
  - Supabase / Prisma / Redisのデータ操作
  - フリーミアムプランのアクセス制御
  - プレースメントテストのロジック実装
  - セキュリティ・認証まわりの実装
  - テスト・デバッグ作業
---

# 말해봐 マレバ — 開発スキル

## プロジェクト概要

日本語母語の韓国語学習者向けAI会話アプリ。
AIが場面別のキャラクターを演じ、レベルに応じた韓国語会話練習を提供する。

---

## 技術スタック

```
フロントエンド:  Next.js 14+ (App Router) / TypeScript / Tailwind CSS / shadcn/ui / Zustand / Framer Motion
バックエンド:    Next.js Route Handlers / Supabase (Auth + DB + Storage) / Prisma / Upstash Redis
AI会話:         GPT-4o mini (全プラン) / GPT-4o (Premium Lv.4-5) / Vercel AI SDK (useChat)
音声TTS:        Gemini 2.5 Flash TTS (Standard) / Gemini 2.5 Pro TTS (Premium)
音声STT:        Web Speech API (ブラウザ内蔵・無料)
決済:           Stripe (サブスクリプション)
インフラ:        Vercel / Supabase / Upstash Redis
```

---

## ディレクトリ構成

```
src/
├── app/
│   ├── (auth)/          # 認証ページ（ログイン・サインアップ）
│   ├── (app)/           # 認証済みユーザー向けページ
│   │   ├── home/        # ホーム画面
│   │   ├── scenarios/   # 場面選択
│   │   ├── preview/     # 場面プレビュー
│   │   ├── chat/        # 会話画面（メイン）
│   │   ├── feedback/    # フィードバック
│   │   ├── history/     # 学習履歴
│   │   └── settings/    # 設定
│   └── api/
│       ├── chat/        # AI会話エンジン
│       ├── tts/         # Gemini TTS
│       ├── placement/   # プレースメントテスト判定
│       ├── stripe/      # Stripe Webhook
│       └── usage/       # 日次カウント管理
├── components/
│   ├── chat/            # チャット関連コンポーネント
│   ├── ui/              # shadcn/ui ベースのUIパーツ
│   └── layout/          # ヘッダー・タブバー等
├── lib/
│   ├── supabase/        # Supabaseクライアント
│   ├── prisma/          # Prismaクライアント
│   ├── redis/           # Upstash Redisクライアント
│   ├── stripe/          # Stripeクライアント
│   ├── openai/          # OpenAIクライアント
│   └── gemini/          # Gemini TTSクライアント
├── stores/              # Zustand状態管理
├── hooks/               # カスタムフック
└── types/               # TypeScript型定義
```

---

## データモデル（Prisma）

```prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  level         Int       @default(1)      // 1〜5
  plan          Plan      @default(FREE)
  stripeCustomerId String? @unique
  stripeSubscriptionId String? @unique
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  conversations Conversation[]
  usageLogs     UsageLog[]
  savedPhrases  SavedPhrase[]
}

model Conversation {
  id          String   @id @default(cuid())
  userId      String
  scenarioId  String
  messages    Json     // Message[]
  score       Int?
  feedback    Json?    // FeedbackReport
  duration    Int?     // 秒
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id])
}

model UsageLog {
  id        String   @id @default(cuid())
  userId    String
  date      String   // YYYY-MM-DD
  count     Int      @default(0)
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  @@unique([userId, date])
}

model SavedPhrase {
  id        String   @id @default(cuid())
  userId    String
  ko        String
  ruby      String
  ja        String
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
}

enum Plan {
  FREE
  STANDARD
  PREMIUM
}
```

---

## プラン設計・アクセス制御

### 日次会話回数制限

| プラン | 上限 | TTSクオリティ |
|--------|------|--------------|
| FREE | 3回/日 | 初回1回のみ Gemini Flash、以降 Web Speech API |
| STANDARD | 10回/日 | 全回 Gemini Flash |
| PREMIUM | 20回/日 | 全回 Gemini Pro |

### Redis による日次カウント実装

```typescript
// lib/redis/usage.ts
import { redis } from './client';

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
  const limits = { FREE: 3, STANDARD: 10, PREMIUM: 20 };
  const count = await getDailyCount(userId);
  return count < limits[plan];
}

function getNextMidnightUnix(): number {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return Math.floor(tomorrow.getTime() / 1000);
}
```

---

## AI会話エンジン

### Route Handler（/api/chat）

```typescript
// app/api/chat/route.ts
import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { checkUsageLimit, incrementDailyCount } from '@/lib/redis/usage';
import { getUser } from '@/lib/supabase/server';

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  // 日次制限チェック
  const canUse = await checkUsageLimit(user.id, user.plan);
  if (!canUse) {
    return new Response('Daily limit reached', { status: 429 });
  }

  const { messages, scenarioId, level } = await req.json();

  // プランに応じたモデル選択
  const model = user.plan === 'PREMIUM' && level >= 4
    ? openai('gpt-4o')
    : openai('gpt-4o-mini');

  const systemPrompt = buildSystemPrompt(scenarioId, level, user.plan);

  const result = await streamText({
    model,
    system: systemPrompt,
    messages,
    onFinish: async () => {
      await incrementDailyCount(user.id);
    },
  });

  return result.toDataStreamResponse();
}
```

### システムプロンプト設計原則

```typescript
function buildSystemPrompt(scenarioId: string, level: number, plan: string): string {
  const scenario = scenarios[scenarioId];
  const levelConfig = levelConfigs[level];

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
${plan !== 'FREE' ? '会話の流れを止めずに優しく言い換えて返すこと' : '誤りがあっても指摘せず、会話を続けること'}

# 重要
- 必ず韓国語で応答する
- レベル${level}の語彙・文法範囲を厳守する
- 場面の役割から外れないこと
  `.trim();
}
```

---

## Gemini TTS 実装

```typescript
// app/api/tts/route.ts
import { GoogleGenAI } from '@google/genai';
import { getUser } from '@/lib/supabase/server';

const genai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

// 場面別ボイス設定
const VOICE_MAP: Record<string, { voice: string; style: string }> = {
  cafe:     { voice: 'Kore',      style: '明るく親しみやすいカフェ店員として話してください' },
  friend:   { voice: 'Puck',      style: 'カジュアルでエネルギッシュな友人として話してください' },
  business: { voice: 'Charon',    style: '落ち着いたプロフェッショナルなビジネスパーソンとして話してください' },
  teacher:  { voice: 'Leda',      style: '温かく教育的な先生として話してください' },
  hotel:    { voice: 'Enceladus', style: '丁寧でプロフェッショナルなホテルスタッフとして話してください' },
};

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { text, scenarioType } = await req.json();

  // FREE プランは初回1回のみ Gemini TTS
  // STANDARD: Flash / PREMIUM: Pro
  const modelName = user.plan === 'PREMIUM'
    ? 'gemini-2.5-pro-preview-tts'
    : 'gemini-2.5-flash-preview-tts';

  const voiceConfig = VOICE_MAP[scenarioType] ?? VOICE_MAP.teacher;

  const response = await genai.models.generateContent({
    model: modelName,
    contents: [{ parts: [{ text: `${voiceConfig.style}\n\n${text}` }] }],
    generationConfig: {
      responseModalities: ['AUDIO'],
      speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voiceConfig.voice } } },
    },
  });

  const audioData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
  if (!audioData) return new Response('TTS failed', { status: 500 });

  const audioBuffer = Buffer.from(audioData, 'base64');
  return new Response(audioBuffer, {
    headers: { 'Content-Type': 'audio/wav' },
  });
}
```

---

## Stripe 決済実装

### サブスクリプション作成

```typescript
// app/api/stripe/create-checkout/route.ts
import Stripe from 'stripe';
import { getUser } from '@/lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS = {
  STANDARD_MONTHLY:  process.env.STRIPE_STANDARD_MONTHLY_PRICE_ID!,
  STANDARD_YEARLY:   process.env.STRIPE_STANDARD_YEARLY_PRICE_ID!,
  PREMIUM_MONTHLY:   process.env.STRIPE_PREMIUM_MONTHLY_PRICE_ID!,
  PREMIUM_YEARLY:    process.env.STRIPE_PREMIUM_YEARLY_PRICE_ID!,
};

export async function POST(req: Request) {
  const user = await getUser();
  if (!user) return new Response('Unauthorized', { status: 401 });

  const { priceKey } = await req.json();
  const priceId = PRICE_IDS[priceKey as keyof typeof PRICE_IDS];

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings?canceled=true`,
    metadata: { userId: user.id },
  });

  return Response.json({ url: session.url });
}
```

### Webhook 処理

```typescript
// app/api/stripe/webhook/route.ts
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch {
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.CheckoutSession;
      const userId = session.metadata?.userId;
      if (!userId) break;
      await prisma.user.update({
        where: { id: userId },
        data: {
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
          plan: getPlanFromPriceId(session),
        },
      });
      break;
    }
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await prisma.user.updateMany({
        where: { stripeSubscriptionId: subscription.id },
        data: { plan: 'FREE', stripeSubscriptionId: null },
      });
      break;
    }
  }

  return new Response('OK');
}
```

---

## プレースメントテスト

```typescript
// app/api/placement/route.ts
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

export async function POST(req: Request) {
  const { answers, conversationHistory } = await req.json();

  const { object } = await generateObject({
    model: openai('gpt-4o-mini'),
    schema: z.object({
      level: z.number().min(1).max(5),
      reasoning: z.string(),
      confidence: z.number().min(0).max(1),
    }),
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
    `,
  });

  return Response.json(object);
}
```

---

## フィードバックレポート生成

```typescript
// lib/feedback/generate.ts
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';

const FeedbackSchema = z.object({
  totalScore: z.number().min(0).max(100),
  breakdown: z.object({
    fluency:    z.number().min(0).max(30),
    accuracy:   z.number().min(0).max(30),
    vocabulary: z.number().min(0).max(20),
    taskCompletion: z.number().min(0).max(20),
  }),
  goodPoints:   z.array(z.string()),
  improvements: z.array(z.object({ original: z.string(), suggestion: z.string(), explanation: z.string() })),
  newWords:     z.array(z.object({ ko: z.string(), ruby: z.string(), ja: z.string() })),
});

export async function generateFeedback(messages: Message[], plan: string) {
  const { object } = await generateObject({
    model: openai(plan === 'PREMIUM' ? 'gpt-4o' : 'gpt-4o-mini'),
    schema: FeedbackSchema,
    prompt: `以下の韓国語会話を分析してフィードバックを生成してください:\n${JSON.stringify(messages)}`,
  });
  return object;
}
```

---

## 環境変数

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Database
DATABASE_URL=

# Upstash Redis
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# OpenAI
OPENAI_API_KEY=

# Gemini
GEMINI_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STANDARD_MONTHLY_PRICE_ID=
STRIPE_STANDARD_YEARLY_PRICE_ID=
STRIPE_PREMIUM_MONTHLY_PRICE_ID=
STRIPE_PREMIUM_YEARLY_PRICE_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

---

## 実装優先順位（MVP）

### Phase 1：基盤（Week 1〜2）
1. Supabase Auth 設定・ログイン/サインアップ画面
2. Prisma スキーマ・マイグレーション
3. Upstash Redis クライアント設定
4. 基本レイアウト・ナビゲーション

### Phase 2：コア機能（Week 3〜6）
5. ホーム画面・場面選択・プレビュー画面
6. AI会話エンジン（/api/chat）+ useChat 統合
7. Gemini TTS（/api/tts）
8. Web Speech API（STT）
9. 会話画面（チャットバブル・マイク・TTS再生）

### Phase 3：プラン・決済（Week 7〜8）
10. Stripe 決済フロー
11. Webhook 処理・プラン更新
12. 日次カウント・アクセス制御

### Phase 4：付加機能（Week 9〜10）
13. フィードバックレポート
14. プレースメントテスト
15. 学習履歴・フレーズブック
16. 設定画面

---

## 実装上の注意点

### セキュリティ
- API キーは必ずサーバーサイドのみで使用（クライアントに絶対公開しない）
- Stripe Webhook は必ず署名検証を行う
- Supabase Row Level Security (RLS) を全テーブルに設定する
- ユーザーのプラン・使用量データはサーバーサイドで検証（クライアントの値を信用しない）

### パフォーマンス
- TTS 音声は生成後 Supabase Storage にキャッシュして再利用する
- AI 応答は Vercel AI SDK のストリーミングを使用する
- 重いコンポーネントは dynamic import で遅延読み込みする

### Gemini TTS の注意事項
- Gemini 2.5 Flash/Pro TTS は比較的新しい API のため、エラーハンドリングを厚めに実装する
- レート制限に注意し、リトライロジックを実装する
- 音声生成失敗時は Web Speech API にフォールバックする

### コスト管理
- FREE ユーザーの Gemini TTS 使用は1日1回に制限する
- Redis のカウントは日付ごとにキーを分けて管理する
- 本番デプロイ前に OpenAI / Gemini の月次予算アラートを設定する

---

## 参考リソース

- [Vercel AI SDK ドキュメント](https://sdk.vercel.ai/docs)
- [Gemini TTS API ドキュメント](https://ai.google.dev/gemini-api/docs/speech-generation)
- [Stripe サブスクリプション ドキュメント](https://stripe.com/docs/billing/subscriptions/overview)
- [Supabase Auth ドキュメント](https://supabase.com/docs/guides/auth)
- [Upstash Redis ドキュメント](https://upstash.com/docs/redis/overall/getstarted)
