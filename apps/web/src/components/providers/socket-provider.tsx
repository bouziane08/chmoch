"use client";

import { createContext, useContext, useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useAuthStore } from "@/store/auth.store";

interface SocketContextType {
  isConnected: boolean;
  subscribe: (userId: string) => void;
  unsubscribe: (userId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  const { isConnected, subscribe, unsubscribe } = useSocket();

  useEffect(() => {
    // نقوم بتخزين المعرف في متغير محلي لضمان توفره داخل الـ cleanup
    // حتى لو تغيرت حالة الـ store لاحقاً
    const userId = user?.id;

    if (userId) {
      subscribe(userId);

      return () => {
        unsubscribe(userId);
      };
    }
  }, [subscribe, unsubscribe, user?.id]); // استخدام الـ optional chaining هنا أيضاً

  return (
    <SocketContext.Provider value={{ isConnected, subscribe, unsubscribe }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketContext() {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }
  return context;
}
