//apps/web/src/components/providers.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "next-themes";
import { SocketProvider } from "@/components/providers/socket-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // إعدادات افتراضية لجعل التطبيق أكثر استجابة
            staleTime: 60 * 1000, // البيانات تبقى "طازجة" لمدة دقيقة
            retry: 1, // إعادة المحاولة مرة واحدة فقط عند الفشل
            refetchOnWindowFocus: false, // منع إعادة الجلب عند تغيير تبويب المتصفح
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SocketProvider>{children}</SocketProvider>
      </ThemeProvider>

      {/* أدوات المطورين تظهر فقط في بيئة التطوير وتساعدك جداً في تتبع الـ API */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
