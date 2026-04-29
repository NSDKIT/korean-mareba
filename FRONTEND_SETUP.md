# フロントエンド実装完了

## 実装されたページ

### 認証ページ
- `/login` - ログインページ
- `/signup` - サインアップページ

### アプリページ（認証後）
- `/home` - ホーム画面（統計、今日の残り回数、クイックアクション）
- `/scenarios` - 場面選択ページ（カフェ、友達、ビジネス等）
- `/preview` - 場面プレビューページ（場面の詳細、開始前の説明）
- `/chat` - 会話画面（AI会話、音声入力/出力、リアルタイムチャット）
- `/feedback` - フィードバックページ（会話の評価、改善点、新出単語）
- `/history` - 学習履歴ページ（過去の会話記録、統計）
- `/settings` - 設定ページ（プラン管理、アカウント情報）

## 実装された機能

### UIコンポーネント（shadcn/ui）
- Button
- Card
- Input
- Badge
- Progress

### レイアウトコンポーネント
- Header（ユーザー情報、残り回数表示）
- TabBar（下部ナビゲーション）

### チャットコンポーネント
- ChatBubble（メッセージ表示）
- ChatInput（テキスト入力、音声入力）

### 状態管理（Zustand）
- ユーザー情報
- 日次カウント

## 開発サーバーの起動方法

### 1. 環境変数の設定

`.env.example`を`.env.local`にコピーして、必要な環境変数を設定してください：

```bash
cp .env.example .env.local
```

必要な環境変数：
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database
DATABASE_URL=your_postgres_url

# Upstash Redis
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# OpenAI
OPENAI_API_KEY=your_openai_key

# Gemini
GEMINI_API_KEY=your_gemini_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
STRIPE_STANDARD_MONTHLY_PRICE_ID=your_price_id
STRIPE_STANDARD_YEARLY_PRICE_ID=your_price_id
STRIPE_PREMIUM_MONTHLY_PRICE_ID=your_price_id
STRIPE_PREMIUM_YEARLY_PRICE_ID=your_price_id
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Prisma マイグレーション

データベースをセットアップします：

```bash
npm run db:push
npm run db:generate
```

### 3. 開発サーバー起動

```bash
npm run dev
```

開発サーバーは http://localhost:3000 で起動します。

## ページ遷移フロー

1. `/` → `/login`（未認証の場合）
2. `/login` → `/home`（ログイン成功後）
3. `/home` → `/scenarios`（会話開始ボタン）
4. `/scenarios` → `/preview?id=xxx`（場面選択）
5. `/preview` → `/chat?scenario=xxx`（会話開始ボタン）
6. `/chat` → `/feedback?scenario=xxx`（会話終了ボタン）
7. `/feedback` → `/scenarios` or `/home`（次のアクション）

## 主な技術的な実装

### 認証
- Supabase Auth を使用
- middleware.ts で認証チェック
- 未認証の場合は `/login` へリダイレクト

### AI会話
- Vercel AI SDK の `useChat` フックを使用
- `/api/chat` エンドポイントでストリーミング応答
- OpenAI GPT-4o-mini / GPT-4o を使用

### 音声機能
- TTS: Gemini 2.5 Flash/Pro TTS（`/api/tts`）
- STT: Web Speech API（ブラウザ内蔵）

### プラン管理
- Stripe Checkout でサブスクリプション作成
- Webhook で支払い状態を同期
- Redis で日次カウント管理

### 型安全性
- TypeScript で全コンポーネント実装
- Prisma で型安全なDB操作
- Zod でAPIレスポンスのバリデーション

## 注意事項

### Gemini TTS API
- 現在のGemini SDKの型定義が不完全なため、一部 `any` 型を使用
- 実際のAPI呼び出しは動作しますが、型チェックを回避しています
- 将来的にSDKが更新されたら型を修正してください

### Web Speech API
- Chromeベースのブラウザでのみ動作
- `ko-KR`（韓国語）の音声認識を使用
- httpsまたはlocalhostでのみ動作

### 環境変数
- `.env.local`ファイルを作成して環境変数を設定
- 本番環境ではVercelの環境変数設定を使用
- APIキーは絶対にクライアントサイドに公開しないこと

## 次のステップ

1. 環境変数の設定
2. Supabaseプロジェクトの作成
3. Prismaマイグレーションの実行
4. 開発サーバーの起動
5. ログイン/サインアップのテスト
6. 会話機能のテスト
