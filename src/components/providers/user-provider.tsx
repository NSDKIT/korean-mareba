"use client";

import { useEffect } from "react";
import { useUserStore } from "@/stores/user-store";

export function UserProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    async function fetchUser() {
      try {
        // DEMO MODE: cookieからユーザー情報を取得
        const isDemoMode = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

        if (isDemoMode) {
          const cookies = document.cookie.split("; ");
          const demoUserCookie = cookies.find((c) => c.startsWith("demo_user_email="));

          if (demoUserCookie) {
            const email = demoUserCookie.split("=")[1];

            if (email === "test@gmail.com") {
              setUser({
                id: "demo-test-user-id",
                email: "test@gmail.com",
                role: "USER",
                level: 3,
                plan: "FREE",
                createdAt: new Date(),
                updatedAt: new Date(),
              });
              return;
            }

            if (email === "admin@gmail.com") {
              setUser({
                id: "demo-admin-user-id",
                email: "admin@gmail.com",
                role: "ADMIN",
                level: 5,
                plan: "PREMIUM",
                createdAt: new Date(),
                updatedAt: new Date(),
              });
              return;
            }
          }

          setUser(null);
          return;
        }

        // 本番モード: APIからユーザー情報を取得
        const res = await fetch("/api/user");
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        setUser(null);
      }
    }

    fetchUser();
  }, [setUser]);

  return <>{children}</>;
}
