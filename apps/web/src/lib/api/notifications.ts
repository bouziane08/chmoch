import api from "@/lib/axios";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "INFO" | "WARNING" | "CRITICAL" | "SUCCESS" | "ERROR";
  isRead: boolean;
  createdAt: string;
  readAt?: string;
  metadata?: Record<string, never>;
}

export const notificationsApi = {
  async getMyNotifications(params?: { limit?: number; offset?: number }) {
    const response = await api.get("/notifications", { params });
    return response.data;
  },

  async getUnreadCount() {
    const response = await api.get("/notifications/unread/count");
    return response.data;
  },

  async markAsRead(id: string) {
    const response = await api.patch(`/notifications/${id}/read`);
    return response.data;
  },

  async markAllAsRead() {
    const response = await api.patch("/notifications/read-all");
    return response.data;
  },

  async deleteNotification(id: string) {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  },

  async deleteAllRead() {
    const response = await api.delete("/notifications/read/all");
    return response.data;
  },
};
