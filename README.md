# 말해봐 マレバ - AI韓国語会話アプリ

日本語母語の韓国語学習者向けAI会話アプリ。AIが場面別のキャラクターを演じ、レベルに応じた韓国語会話練習を提供します。

## 技術スタック

- **フロントエンド**: Next.js 14+ (App Router) / TypeScript / Tailwind CSS / shadcn/ui / Zustand / Framer Motion
- **バックエンド**: Next.js Route Handlers / Supabase (Auth + DB + Storage) / Prisma / Upstash Redis
- **AI会話**: GPT-4o mini (全プラン) / GPT-4o (Premium Lv.4-5) / Vercel AI SDK
- **音声TTS**: Gemini 2.5 Flash TTS (Standard) / Gemini 2.5 Pro TTS (Premium)
- **音声STT**: Web Speech API (ブラウザ内蔵・無料)
- **決済**: Stripe (サブスクリプション)
- **インフラ**: Vercel / Supabase / Upstash Redis

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.example`を`.env.local`にコピーして、必要な環境変数を設定してください。

```bash
cp .env.example .env.local
```

以下のサービスのアカウント作成とAPIキーの取得が必要です：

- **Supabase**: https://supabase.com
  - プロジェクトを作成し、URL と Anon Key を取得
  - Settings > API から Service Role Key も取得
  - Database の接続文字列を DATABASE_URL に設定

- **Upstash Redis**: https://upstash.com
  - Redisデータベースを作成
  - REST URL と Token を取得

- **OpenAI**: https://platform.openai.com
  - API キーを取得

- **Google AI (Gemini)**: https://ai.google.dev
  - API キーを取得

- **Stripe**: https://stripe.com
  - アカウント作成後、API キーを取得
  - 製品とプライスIDを作成（Standard Monthly/Yearly, Premium Monthly/Yearly）
  - Webhook エンドポイントを設定し、Webhook Secret を取得

### 3. データベースのセットアップ

Prismaを使ってデータベーススキーマをプッシュします。

```bash
npm run db:push
```

Prisma Clientを生成します。

```bash
npm run db:generate
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## プロジェクト構成

```
src/
├── app/
│   ├── api/           # API Routes
│   │   ├── chat/      # AI会話エンジン
│   │   ├── tts/       # Gemini TTS
│   │   ├── placement/ # プレースメントテスト
│   │   └── stripe/    # Stripe決済・Webhook
│   ├── layout.tsx     # ルートレイアウト
│   └── page.tsx       # ホームページ
├── components/
│   ├── chat/          # チャット関連コンポーネント
│   ├── ui/            # shadcn/uiベースのUIパーツ
│   └── layout/        # ヘッダー・タブバー等
├── lib/
│   ├── supabase/      # Supabaseクライアント
│   ├── prisma/        # Prismaクライアント
│   ├── redis/         # Upstash Redisクライアント
│   ├── stripe/        # Stripeクライアント
│   ├── openai/        # OpenAIクライアント
│   ├── gemini/        # Gemini TTSクライアント
│   ├── feedback/      # フィードバック生成
│   └── data/          # シナリオ・レベル設定
├── stores/            # Zustand状態管理
├── hooks/             # カスタムフック
└── types/             # TypeScript型定義
```

## 実装済み機能

### ✅ フロントエンド（全ページ実装完了）

1. **認証ページ**
   - ログイン画面 (`/login`)
   - サインアップ画面 (`/signup`)
   - Supabase Auth統合済み

2. **メインアプリ画面**
   - ホーム画面 (`/home`) - 統計表示、おすすめ場面
   - 場面選択 (`/scenarios`) - カフェ、友達、ビジネス等の場面一覧
   - 場面プレビュー (`/preview`) - 場面詳細とフレーズ例
   - 会話画面 (`/chat`) - AI会話、音声入力/TTS再生
   - フィードバック (`/feedback`) - 会話後の詳細評価
   - 学習履歴 (`/history`) - 過去の会話履歴と統計
   - 設定 (`/settings`) - プラン管理、アカウント情報

3. **UIコンポーネント**
   - モックアップデザインに基づくカスタムデザインシステム
   - Button, Card, Input, Badge, Progress等のコンポーネント
   - Dusty pastel カラーパレット + pill-shaped デザイン

### ✅ バックエンド（全API実装完了）

1. **AI会話API** (`/api/chat`)
   - GPT-4o / GPT-4o-mini による会話生成
   - プランとレベルに応じたモデル選択
   - Vercel AI SDK によるストリーミング対応

2. **音声TTS API** (`/api/tts`)
   - Gemini 2.5 Flash/Pro TTS
   - 場面別ボイス設定

3. **プレースメントテストAPI** (`/api/placement`)
   - GPT-4o-mini によるレベル判定

4. **Stripe決済API**
   - チェックアウトセッション作成 (`/api/stripe/create-checkout`)
   - Webhook処理 (`/api/stripe/webhook`)

### ✅ インフラ・設計

1. **環境変数管理**
   - 環境変数なしでもビルド可能
   - 実行時に環境変数をチェックし、不足時はエラー表示
   - Vercelデプロイ対応

2. **データベース**
   - Prismaスキーマ定義済み
   - ユーザー、会話、フィードバックテーブル

3. **状態管理**
   - Zustandによるユーザー状態管理

## デプロイ手順

### 1. GitHubリポジトリ
すでにプッシュ済み: https://github.com/NSDKIT/korean-mareba

### 2. Vercelデプロイ
1. https://vercel.com でGitHubリポジトリをインポート
2. 環境変数を設定（`.env.example`参照）
3. デプロイ実行

### 3. 必須の外部サービス設定
- Supabase（認証・DB）
- Upstash Redis（使用制限管理）
- OpenAI（AI会話）
- Google AI / Gemini（TTS）
- Stripe（決済）

## プラン設計

| プラン | 日次回数制限 | TTS | 価格（月額） |
|--------|------------|-----|------------|
| FREE | 3回/日 | 初回1回のみ Gemini Flash、以降 Web Speech API | 無料 |
| STANDARD | 10回/日 | 全回 Gemini Flash | ¥980/月 |
| PREMIUM | 20回/日 | 全回 Gemini Pro | ¥1,980/月 |

## 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# Prisma Studio（データベースGUI）起動
npm run db:studio

# Prisma マイグレーション生成
npm run db:push
```

## 参考リソース

- [Vercel AI SDK ドキュメント](https://sdk.vercel.ai/docs)
- [Gemini TTS API ドキュメント](https://ai.google.dev/gemini-api/docs/speech-generation)
- [Stripe サブスクリプション ドキュメント](https://stripe.com/docs/billing/subscriptions/overview)
- [Supabase Auth ドキュメント](https://supabase.com/docs/guides/auth)
- [Upstash Redis ドキュメント](https://upstash.com/docs/redis/overall/getstarted)
- [shadcn/ui ドキュメント](https://ui.shadcn.com/)

## ライセンス

Proprietary - All Rights Reserved
