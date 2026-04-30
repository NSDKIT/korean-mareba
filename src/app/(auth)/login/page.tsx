"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // DEMO MODE: モックログイン
      if (isDevelopment) {
        // モックユーザーの認証チェック
        const validUsers = [
          { email: "test@gmail.com", password: "testkorea" },
          { email: "admin@gmail.com", password: "adminkorea" },
        ];

        const user = validUsers.find(u => u.email === email && u.password === password);
        if (!user) {
          throw new Error("メールアドレスまたはパスワードが正しくありません");
        }

        // Cookieにモックユーザーを保存
        document.cookie = `demo_user_email=${email}; path=/; max-age=86400`;

        // ロール別にリダイレクト
        if (email === "admin@gmail.com") {
          router.push("/admin/dashboard");
        } else {
          router.push("/home");
        }
        router.refresh();
        return;
      }

      const supabase = createClient();
      const { error: signInError, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // ロールをチェックしてリダイレクト先を決定
      if (data.user) {
        const response = await fetch(`/api/user`);
        if (response.ok) {
          const userData = await response.json();
          if (userData.role === 'ADMIN') {
            router.push("/admin/dashboard");
          } else {
            router.push("/home");
          }
        } else {
          router.push("/home");
        }
      } else {
        router.push("/home");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "ログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = async (userEmail: string, userPassword: string) => {
    setIsLoading(true);
    setError("");

    try {
      // DEMO MODE: モックログイン
      if (isDevelopment) {
        // Cookieにモックユーザーを保存
        document.cookie = `demo_user_email=${userEmail}; path=/; max-age=86400`;

        // ロール別にリダイレクト
        if (userEmail === "admin@gmail.com") {
          router.push("/admin/dashboard");
        } else {
          router.push("/home");
        }
        router.refresh();
        return;
      }

      const supabase = createClient();
      const { error: signInError, data } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: userPassword,
      });

      if (signInError) throw signInError;

      // ロールをチェックしてリダイレクト先を決定
      if (data.user) {
        const response = await fetch(`/api/user`);
        if (response.ok) {
          const userData = await response.json();
          if (userData.role === 'ADMIN') {
            router.push("/admin/dashboard");
          } else {
            router.push("/home");
          }
        } else {
          router.push("/home");
        }
      } else {
        router.push("/home");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "ログインに失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const isDevelopment = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_DEMO_MODE === "true";

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">말해봐</CardTitle>
          <CardDescription className="text-center">
            アカウントにログイン
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                メールアドレス
              </label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                パスワード
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={isLoading}
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "ログイン中..." : "ログイン"}
            </Button>

            {isDevelopment && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      開発用クイックログイン
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleQuickLogin("test@gmail.com", "testkorea")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    テストユーザー
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleQuickLogin("admin@gmail.com", "adminkorea")}
                    disabled={isLoading}
                    className="w-full"
                  >
                    管理者ユーザー
                  </Button>
                </div>
              </>
            )}

            <p className="text-sm text-center text-muted-foreground">
              アカウントをお持ちでない方は{" "}
              <Link href="/signup" className="text-primary hover:underline">
                新規登録
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
