"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCheck, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationItem } from "./notification-item";
import { EmptyState } from "@/components/shared/empty-state";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNotifications } from "@/hooks/useNotifications";

// تعريف الواجهة لضمان توافق البيانات وتجنب أخطاء any
interface Notification {
  id: string;
  title: string;
  message: string;
  type: "INFO" | "WARNING" | "CRITICAL" | "SUCCESS" | "ERROR";
  isRead: boolean;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

// إضافة filter لتعريف الـ Props لحل خطأ صفحة الإشعارات (2322)
interface NotificationsListProps {
  filter?: "all" | "unread";
}

export function NotificationsList({ filter = "all" }: NotificationsListProps) {
  const [deleteAllDialog, setDeleteAllDialog] = useState(false);
  const {
    notifications,
    isLoading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteAllRead,
  } = useNotifications();

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    );
  }

  // تصفية الإشعارات بناءً على الـ filter الممرر من الصفحة
  const displayNotifications = (notifications as Notification[]).filter((n) =>
    filter === "unread" ? !n.isRead : true,
  );

  const unreadCount = (notifications as Notification[]).filter(
    (n) => !n.isRead,
  ).length;

  if (displayNotifications.length === 0) {
    return (
      <EmptyState
        icon={Bell}
        title={
          filter === "unread" ? "لا توجد إشعارات غير مقروءة" : "لا توجد إشعارات"
        }
        description={
          filter === "unread"
            ? "لقد قمت بقراءة جميع الإشعارات!"
            : "ليس لديك أي إشعارات في الوقت الحالي"
        }
      />
    );
  }

  return (
    <div className="space-y-4 text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">
            {filter === "unread" ? "إشعارات غير مقروءة" : "جميع الإشعارات"}
          </h2>
          {unreadCount > 0 && (
            <span className="bg-primary text-primary-foreground rounded-full px-2 py-0.5 text-xs font-bold">
              {unreadCount} غير مقروء
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={() => markAllAsRead()}>
              <CheckCheck className="ml-2 h-4 w-4" />
              تحديد الكل كمقروء
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDeleteAllDialog(true)}
          >
            <Trash2 className="ml-2 h-4 w-4" />
            حذف المقروء
          </Button>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="space-y-2">
          {displayNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              layout
            >
              <NotificationItem
                notification={notification}
                onMarkAsRead={(id) => markAsRead(id)}
                onDelete={(id) => deleteNotification(id)}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      <AlertDialog open={deleteAllDialog} onOpenChange={setDeleteAllDialog}>
        <AlertDialogContent dir="rtl" className="text-right">
          <AlertDialogHeader>
            <AlertDialogTitle>حذف جميع الإشعارات المقروءة</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من حذف جميع الإشعارات التي تمت قراءتها؟ هذا الإجراء
              لا يمكن التراجع عنه.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row-reverse gap-2 sm:justify-start">
            <AlertDialogAction
              onClick={() => {
                deleteAllRead();
                setDeleteAllDialog(false);
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              حذف
            </AlertDialogAction>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
