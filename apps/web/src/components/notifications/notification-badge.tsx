"use client";

import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // تم تصحيح المسار هنا
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/hooks/useNotifications";
import { useSocket } from "@/hooks/useSocket";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import Link from "next/link";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "INFO" | "WARNING" | "CRITICAL" | "SUCCESS" | "ERROR";
  isRead: boolean;
  createdAt: string;
}

export function NotificationBadge() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, refetch } =
    useNotifications();
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("notification", () => {
        refetch();
      });

      return () => {
        socket.off("notification");
      };
    }
  }, [socket, refetch]);

  const handleNotificationClick = async (id: string) => {
    try {
      await markAsRead(id);
      setOpen(false);
    } catch (_error) {
      console.error("فشل تحديد كـ مقروء");
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "SUCCESS":
        return "🟢";
      case "WARNING":
        return "🟡";
      case "CRITICAL":
      case "ERROR":
        return "🔴";
      default:
        return "🔵";
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-muted/80 relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground ring-background absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ring-2">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="border-border/50 w-80 p-0 shadow-xl"
      >
        <DropdownMenuLabel className="bg-muted/30 flex items-center justify-between p-4">
          <span className="text-sm font-bold">الإشعارات</span>
          {unreadCount > 0 && (
            <span className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-[10px] font-medium">
              {unreadCount} جديدة
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0" />

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex h-[200px] items-center justify-center p-4 text-center">
              <div className="space-y-2">
                <Bell className="text-muted-foreground/20 mx-auto h-8 w-8" />
                <p className="text-muted-foreground text-sm">
                  لا توجد إشعارات حالياً
                </p>
              </div>
            </div>
          ) : (
            (notifications as Notification[])
              .slice(0, 10)
              .map((notification: Notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={cn(
                    "border-border/40 focus:bg-muted/80 flex cursor-pointer items-start gap-3 border-b p-4 outline-none transition-colors last:border-0",
                    !notification.isRead && "bg-primary/5",
                  )}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="shrink-0 select-none pt-0.5 text-base">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="min-w-0 flex-1 space-y-1 text-right">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          "truncate text-xs font-semibold",
                          !notification.isRead
                            ? "text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <span className="bg-primary h-1.5 w-1.5 shrink-0 animate-pulse rounded-full" />
                      )}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-[11px] leading-relaxed">
                      {notification.message}
                    </p>
                    <p className="text-muted-foreground/50 text-[10px]">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                        locale: ar,
                      })}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))
          )}
        </ScrollArea>

        <DropdownMenuSeparator className="m-0" />
        <Link
          href="/dashboard/notifications"
          onClick={() => setOpen(false)}
          className="block w-full"
        >
          <div className="text-primary hover:bg-primary/5 py-3 text-center text-xs font-bold transition-colors">
            عرض كل الإشعارات
          </div>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
