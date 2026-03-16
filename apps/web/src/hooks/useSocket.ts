"use client";

import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuthStore } from "@/store/auth.store";

// تعريف الـ Instance خارج الـ Hook لمنع إعادة الإنشاء عند كل Re-render
let socketInstance: Socket | null = null;

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false);

  // تصحيح الخطأ: افترضت أن التوكن يسمى 'token' أو موجود داخل الـ store
  // إذا كان الاسم مختلفاً في ملف auth.store لديك، يرجى استبدال 'token' بالاسم الصحيح
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
      }
      return;
    }

    if (!socketInstance) {
      socketInstance = io(
        process.env.NEXT_PUBLIC_WS_URL || "http://localhost:3000",
        {
          path: "/notifications",
          auth: { token },
          transports: ["websocket"],
          reconnection: true,
          reconnectionAttempts: 5,
        },
      );
    }

    const socket = socketInstance;

    function onConnect() {
      setIsConnected(true);
      console.log("✅ WebSocket connected");
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log("❌ WebSocket disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // إذا كان متصلاً بالفعل عند تحميل الـ Hook
    if (socket.connected) {
      onConnect();
    } else {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [token]);

  const subscribe = (userId: string) => {
    if (socketInstance?.connected) {
      socketInstance.emit("subscribe", { userId });
    }
  };

  const unsubscribe = (userId: string) => {
    if (socketInstance?.connected) {
      socketInstance.emit("unsubscribe", { userId });
    }
  };

  return {
    socket: socketInstance,
    isConnected,
    subscribe,
    unsubscribe,
  };
}
