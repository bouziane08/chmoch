/**
 * Notification Types
 * نظام أنواع التنبيهات - متوافق مع معايير TypeScript الصارمة
 */

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "INFO" | "WARNING" | "CRITICAL" | "SUCCESS" | "ERROR";
  isRead: boolean;
  readAt?: string;
  createdAt: string;
  updatedAt: string;
  /**
   * الحل: استخدام unknown بدلاً من any لإزالة خطأ ESLint (Severity 8)
   * يضمن هذا النوع أن البيانات الإضافية يتم فحصها قبل الاستخدام.
   */
  metadata?: Record<string, unknown>;
}

export interface NotificationResponse {
  items: Notification[];
  total: number;
  limit: number;
  offset: number;
}

export interface UnreadCountResponse {
  count: number;
}
