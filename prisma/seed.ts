import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('環境変数 NEXT_PUBLIC_SUPABASE_URL と SUPABASE_SERVICE_ROLE_KEY が必要です');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function main() {
  console.log('初期ユーザーを作成中...\n');

  // テストユーザー作成
  console.log('1. テストユーザー (test@gmail.com) を作成中...');
  try {
    const { data: testUser, error: testAuthError } = await supabaseAdmin.auth.admin.createUser({
      email: 'test@gmail.com',
      password: 'testkorea',
      email_confirm: true,
    });

    if (testAuthError) {
      if (testAuthError.message.includes('already registered')) {
        console.log('   ⚠️  test@gmail.com は既に登録されています');
      } else {
        throw testAuthError;
      }
    } else {
      console.log('   ✓ Supabase Authユーザー作成完了');

      // Prismaでユーザー作成
      await prisma.user.upsert({
        where: { email: 'test@gmail.com' },
        update: {},
        create: {
          id: testUser.user.id,
          email: 'test@gmail.com',
          role: 'USER',
          level: 1,
          plan: 'FREE',
        },
      });
      console.log('   ✓ Prismaユーザー作成完了\n');
    }
  } catch (error) {
    console.error('   ✗ テストユーザー作成エラー:', error);
  }

  // 管理者ユーザー作成
  console.log('2. 管理者ユーザー (admin@gmail.com) を作成中...');
  try {
    const { data: adminUser, error: adminAuthError } = await supabaseAdmin.auth.admin.createUser({
      email: 'admin@gmail.com',
      password: 'adminkorea',
      email_confirm: true,
    });

    if (adminAuthError) {
      if (adminAuthError.message.includes('already registered')) {
        console.log('   ⚠️  admin@gmail.com は既に登録されています');

        // 既存ユーザーのロールをADMINに更新
        await prisma.user.update({
          where: { email: 'admin@gmail.com' },
          data: { role: 'ADMIN' },
        });
        console.log('   ✓ 既存ユーザーのロールをADMINに更新しました\n');
      } else {
        throw adminAuthError;
      }
    } else {
      console.log('   ✓ Supabase Authユーザー作成完了');

      // Prismaでユーザー作成
      await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: { role: 'ADMIN' },
        create: {
          id: adminUser.user.id,
          email: 'admin@gmail.com',
          role: 'ADMIN',
          level: 5,
          plan: 'PREMIUM',
        },
      });
      console.log('   ✓ Prismaユーザー作成完了（ADMIN権限付与）\n');
    }
  } catch (error) {
    console.error('   ✗ 管理者ユーザー作成エラー:', error);
  }

  console.log('初期ユーザー作成完了！\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('作成されたユーザー:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('1. テストユーザー');
  console.log('   Email:    test@gmail.com');
  console.log('   Password: testkorea');
  console.log('   Role:     USER');
  console.log('');
  console.log('2. 管理者ユーザー');
  console.log('   Email:    admin@gmail.com');
  console.log('   Password: adminkorea');
  console.log('   Role:     ADMIN');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
