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

Prismaマイグレーションを実行します。

```bash
npx prisma migrate dev
```

または、開発環境でスキーマを直接プッシュする場合：

```bash
npm run db:push
```

Prisma Clientを生成します。

```bash
npm run db:generate
```

### 4. 初期ユーザーの作成

テストユーザーと管理者ユーザーを作成するスクリプトを実行します。

```bash
npm run seed
```

以下のユーザーが作成されます：
- **テストユーザー**: `test@gmail.com` / パスワード: `testkorea`
- **管理者ユーザー**: `admin@gmail.com` / パスワード: `adminkorea`

または、Prisma Studioを使って手動で作成することもできます：

```bash
npm run db:studio
```

管理者権限を付与する場合は、Userテーブルで該当ユーザーの `role` を `ADMIN` に変更してください。

### 5. 開発サーバーの起動

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

3. **管理者画面** 🆕
   - ダッシュボード (`/admin/dashboard`) - 統計情報の可視化
   - ユーザー管理 (`/admin/users`) - ユーザー一覧・詳細・編集・削除
   - シナリオ統計 (`/admin/scenario-stats`) - シナリオ別統計表示
   - 権限管理 - Middleware による ADMIN ロールチェック

4. **UIコンポーネント**
   - モックアップデザインに基づくカスタムデザインシステム
   - Button, Card, Input, Badge, Progress, Select, Label等のコンポーネント
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

5. **管理者API** 🆕
   - 統計データ取得 (`/api/admin/stats`)
   - ユーザー管理 (`/api/admin/users`, `/api/admin/users/[id]`)
   - 全API で `getAdminUser()` による権限チェック実施

### ✅ インフラ・設計

1. **環境変数管理**
   - 環境変数なしでもビルド可能
   - 実行時に環境変数をチェックし、不足時はエラー表示
   - Vercelデプロイ対応
   - DEMO_MODE による開発時の認証スキップ機能

2. **データベース**
   - Prismaスキーマ定義済み
   - ユーザー（User.role フィールド追加）、会話、フィードバック、使用ログテーブル
   - パフォーマンス最適化のためのインデックス追加

3. **認証・権限管理**
   - Supabase Auth + Prisma のハイブリッド認証
   - Middleware による `/admin` 配下の自動権限チェック
   - Role-Based Access Control (RBAC) 実装

4. **状態管理**
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

# Prisma マイグレーション実行
npx prisma migrate dev

# Prisma スキーマをDBにプッシュ（開発環境）
npm run db:push

# Prisma Client 生成
npm run db:generate

# 初期ユーザー作成
npm run seed
```

## 管理者画面へのアクセス

管理者アカウント（`admin@gmail.com`）でログイン後、以下のURLにアクセスしてください：

```
http://localhost:3000/admin/dashboard
```

管理者画面では以下の機能が利用できます：
- **ダッシュボード**: ユーザー数、会話数、プラン別統計などの可視化
- **ユーザー管理**: 全ユーザーの一覧、詳細表示、Level/Plan/Role の編集、削除
- **シナリオ統計**: シナリオ別の使用統計（会話数、平均スコア）

## 参考リソース

- [Vercel AI SDK ドキュメント](https://sdk.vercel.ai/docs)
- [Gemini TTS API ドキュメント](https://ai.google.dev/gemini-api/docs/speech-generation)
- [Stripe サブスクリプション ドキュメント](https://stripe.com/docs/billing/subscriptions/overview)
- [Supabase Auth ドキュメント](https://supabase.com/docs/guides/auth)
- [Upstash Redis ドキュメント](https://upstash.com/docs/redis/overall/getstarted)
- [shadcn/ui ドキュメント](https://ui.shadcn.com/)

## ライセンス

Proprietary - All Rights Reserved
