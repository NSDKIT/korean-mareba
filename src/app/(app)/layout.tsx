import { Header } from "@/components/layout/header";
import { TabBar } from "@/components/layout/tab-bar";
import { UserProvider } from "@/components/providers/user-provider";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserProvider>
      <div className="min-h-screen pb-16">
        <Header />
        <main className="container mx-auto py-6 px-4">{children}</main>
        <TabBar />
      </div>
    </UserProvider>
  );
}
