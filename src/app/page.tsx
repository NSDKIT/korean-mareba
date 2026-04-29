import { redirect } from "next/navigation";

export default function Home() {
  // ルートページにアクセスした場合、ログインページにリダイレクト
  redirect("/login");
}
