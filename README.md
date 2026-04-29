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

## 次のステップ

### 実装が必要な項目

1. **認証ページ（ログイン・サインアップ）**
   - Supabase Auth を使った認証フロー
   - メールアドレス＋パスワード認証
   - 新規ユーザー登録時に Prisma でユーザー作成

2. **ホーム画面と場面選択**
   - ユーザーのレベルと利用可能回数の表示
   - 場面カード一覧（カフェ、友達、ビジネス等）
   - 場面プレビュー画面

3. **会話画面（チャットUI）**
   - Vercel AI SDK の useChat フックを使用
   - チャットバブル表示
   - マイクボタン（Web Speech API）
   - TTS 再生ボタン
   - 会話終了時のフィードバック表示

4. **設定画面**
   - プラン管理（Stripe チェックアウト）
   - アカウント情報
   - 学習履歴・統計

5. **shadcn/ui コンポーネントの追加**
   - 必要に応じて shadcn/ui から UI コンポーネントを追加
   - `npx shadcn@latest add button card input` 等

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
