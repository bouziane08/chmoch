"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "@/lib/api/notifications";
import { toast } from "sonner";

// تعريف واجهة لخطأ الـ API لضمان النوع الصحيح (Type Safety) ومنع خطأ any
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useNotifications() {
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsApi.getMyNotifications({ limit: 50 }),
  });

  const { data: unreadCount } = useQuery({
    queryKey: ["notifications", "unread"],
    queryFn: notificationsApi.getUnreadCount,
  });

  const markAsReadMutation = useMutation({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
      toast.success("تم تحديد جميع الإشعارات كمقروءة");
    },
  });

  const deleteNotificationMutation = useMutation({
    mutationFn: notificationsApi.deleteNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notifications", "unread"] });
      toast.success("تم حذف الإشعار");
    },
    // تم استبدال any بـ ApiError هنا لحل مشكلة ESLint
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "فشل حذف الإشعار");
    },
  });

  const deleteAllReadMutation = useMutation({
    mutationFn: notificationsApi.deleteAllRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("تم حذف جميع الإشعارات المقروءة");
    },
  });

  return {
    notifications: data?.items || [],
    total: data?.total || 0,
    unreadCount: unreadCount?.count || 0,
    isLoading,
    refetch,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    deleteNotification: deleteNotificationMutation.mutate,
    deleteAllRead: deleteAllReadMutation.mutate,
    isMarkingAsRead: markAsReadMutation.isPending,
    isDeleting: deleteNotificationMutation.isPending,
  };
}
