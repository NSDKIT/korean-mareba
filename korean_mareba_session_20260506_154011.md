# 말해봐 マレバ - 開発セッション履歴

**日時**: 2026-05-06  
**プロジェクト**: 韓国語学習AIアプリ「말해봐 マレバ」

---

## セッション概要

### 1. 管理者画面の404問題解決

**問題**: 
- 管理者ログイン後、`/admin/dashboard` などすべての管理者ページが404エラー
- Middlewareでは認証成功してるが、ページが表示されない

**原因**: 
- `src/app/(admin)/` というroute group（括弧付きフォルダ）を使用していた
- Next.js 14のApp Routerでは、route groupはURLに反映されない
- つまり `(admin)/dashboard/page.tsx` → URL: `/dashboard` (NOT `/admin/dashboard`)

**解決策**: 
```bash
mv src/app/(admin) src/app/admin
```
- 括弧を削除して通常のフォルダ名に変更
- これで `/admin/dashboard` として正しくアクセス可能に

### 2. DEMO MODE対応の追加

管理者画面で実際のデータベースなしでも動作するよう、すべてのAPIエンドポイントにモックデータを追加:

**対応したAPI**:
- `/api/admin/stats` - 統計データ
- `/api/admin/users` - ユーザー一覧
- `/api/admin/users/[id]` - ユーザー詳細
- `/api/admin/scenario-stats` - シナリオ統計
- `/api/admin/conversations` - 会話履歴（新規作成）

**条件分岐**:
```typescript
const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';
if (isDemoMode) {
  return NextResponse.json({ /* モックデータ */ });
}
// 本番のPrismaクエリ
```

### 3. 管理者画面の実装完了

**実装したページ**:
- ✅ `/admin/dashboard` - ダッシュボード（統計カード表示）
- ✅ `/admin/users` - ユーザー管理（一覧・検索）
- ✅ `/admin/users/[id]` - ユーザー詳細（編集・削除）
- ✅ `/admin/conversations` - 会話履歴
- ✅ `/admin/scenario-stats` - シナリオ統計

**認証フロー**:
- Middleware: `/admin/*` へのアクセスを管理者のみに制限
- 一般ユーザーが `/admin/*` にアクセス → `/home` にリダイレクト
- 管理者が `/home` などにアクセス → `/admin/dashboard` にリダイレクト

### 4. コミット履歴

```
3bed0aa - fix: 管理者画面のルーティング修正とDEMO MODE対応
4fd2873 - feat: Prismaスキーマを本番仕様に更新
```

---

## 本番環境構築開始

### Prismaスキーマ更新（本番仕様）

**追加したフィールド**:
- `User.displayName` - 表示名
- `User.placementDone` - プレースメントテスト完了フラグ
- `Conversation.xpEarned` - 獲得XP
- `Conversation.updatedAt` - 更新日時
- `UsageLog.updatedAt` - 更新日時

**追加したモデル**:
- `Badge` - バッジ定義
- `UserBadge` - ユーザーが獲得したバッジ

**その他の変更**:
- `datasource.directUrl` 追加（Supabase接続プーリング対応）
- `.env.example` ファイル作成（全環境変数のテンプレート）

### 次のステップ（Week 1-2: 設計・インフラ）

#### 未完了タスク:

1. **Supabaseプロジェクト作成**
   - アカウント作成: https://supabase.com
   - プロジェクト作成（リージョン: Tokyo）
   - API Keys取得
   - 接続文字列取得

2. **Prismaマイグレーション実行**
   ```bash
   npx prisma migrate dev --name init
   ```

3. **Supabase RLS設定**
   - Row Level Security有効化
   - ユーザーごとのデータアクセス制御

4. **Upstash Redis作成**
   - アカウント作成: https://upstash.com
   - Redis DB作成（リージョン: Tokyo）
   - 日次カウント管理用

5. **基本レイアウト・BottomNavigation実装**
   - モバイルファーストUI
   - BottomNavigationコンポーネント

---

## 技術スタック確認

```
フロントエンド:   Next.js 14 (App Router) / TypeScript / Tailwind CSS
                 shadcn/ui / Zustand / Framer Motion

バックエンド:     Next.js Route Handlers / Supabase / Prisma / Upstash Redis

AI:              GPT-4o mini / GPT-4o（Premium）/ Gemini 2.5 TTS

決済:            Stripe（サブスクリプション）

インフラ:         Vercel / Supabase / Upstash Redis
```

---

## 重要な学び

1. **Next.js Route Groups**
   - `(folder)` 形式はURLに反映されない
   - URLに含めたい場合は括弧なしの通常のフォルダ名を使用

2. **DEMO MODE設計**
   - 環境変数で切り替え可能にする
   - サーバーサイドで条件分岐してモックデータを返す
   - 本番移行がスムーズ

3. **Middleware認証**
   - `/admin/*` のパターンマッチング
   - Cookieベースの認証（DEMO MODE）
   - Supabase Auth（本番環境）

---

## 環境変数一覧

必要な環境変数（`.env.example`参照）:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY

# Database
DATABASE_URL (port 6543 - pooling)
DIRECT_URL (port 5432 - direct)

# Redis
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN

# AI APIs
OPENAI_API_KEY
GEMINI_API_KEY

# Stripe
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
STRIPE_*_PRICE_ID (4つ)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

# App
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_DEMO_MODE
```

---

## 次回セッションでやること

1. Supabaseプロジェクト作成・設定
2. Prismaマイグレーション実行
3. Supabase Auth設定（メール/Google）
4. Upstash Redis設定
5. 基本UI実装開始

---

**セッション終了時刻**: $(date)
