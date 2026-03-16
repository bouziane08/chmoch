//apps/web/src/app/dashboard/layout.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // نستخدم التعليق لتجاوز القاعدة لأن هذا النمط ضروري في Next.js لمنع Hydration Mismatch
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (hasMounted && !isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router, hasMounted]);

  // من أجل تجنب Hydration mismatch، لا نرندر أي شيء حتى يجهز المكون في المتصفح
  if (!hasMounted) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-background flex h-screen w-full items-center justify-center">
        <div className="border-primary h-12 w-12 animate-spin rounded-full border-4 border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
