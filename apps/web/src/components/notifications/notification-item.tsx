"use client";

import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import {
  Info,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Check,
  Trash2,
  MoreVertical, // أضفت هذه الأيقونة بدلاً من Bell في زر القائمة لتحسين الشكل
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NotificationItemProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: "INFO" | "WARNING" | "CRITICAL" | "SUCCESS" | "ERROR";
    isRead: boolean;
    createdAt: string;
    // تم تغيير any إلى Record ليكون النوع أكثر دقة وأماناً
    metadata?: Record<string, unknown>;
  };
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "SUCCESS":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "WARNING":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "CRITICAL":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "ERROR":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getIconBackground = () => {
    switch (notification.type) {
      case "SUCCESS":
        return "bg-green-500/10";
      case "WARNING":
        return "bg-yellow-500/10";
      case "CRITICAL":
      case "ERROR":
        return "bg-red-500/10";
      default:
        return "bg-blue-500/10";
    }
  };

  return (
    <div
      className={cn(
        "relative flex items-start gap-4 rounded-lg border p-4 text-right transition-colors",
        !notification.isRead && "bg-muted/50",
      )}
      dir="rtl"
    >
      <div className={cn("shrink-0 rounded-lg p-2", getIconBackground())}>
        {getIcon()}
      </div>

      <div className="flex-1 space-y-1 overflow-hidden">
        <div className="flex items-center gap-2">
          {!notification.isRead && (
            <span className="bg-primary h-2 w-2 shrink-0 rounded-full" />
          )}
          <p className="truncate text-sm font-semibold">{notification.title}</p>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
          {notification.message}
        </p>
        <p className="text-muted-foreground/60 text-[10px] uppercase tracking-wider">
          {formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true,
            locale: ar,
          })}
        </p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="text-right">
          {!notification.isRead && (
            <DropdownMenuItem
              onClick={() => onMarkAsRead(notification.id)}
              className="flex-row-reverse gap-2"
            >
              <Check className="h-4 w-4" />
              <span>تحديد كمقروء</span>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => onDelete(notification.id)}
            className="flex-row-reverse gap-2 text-red-600"
          >
            <Trash2 className="h-4 w-4" />
            <span>حذف التنبيه</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
