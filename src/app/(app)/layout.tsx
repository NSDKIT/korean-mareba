import { Header } from "@/components/layout/header";
import { TabBar } from "@/components/layout/tab-bar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-16">
      <Header />
      <main className="container py-6">{children}</main>
      <TabBar />
    </div>
  );
}
