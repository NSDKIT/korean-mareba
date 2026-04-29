import { getAdminUser } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { AdminHeader } from '@/components/admin/admin-header';
import { AdminSidebar } from '@/components/admin/admin-sidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await getAdminUser();
  } catch {
    redirect('/home');
  }

  return (
    <div className="min-h-screen bg-[var(--bg-app)]">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6 ml-64">{children}</main>
      </div>
    </div>
  );
}
