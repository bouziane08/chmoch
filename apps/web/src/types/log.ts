/**
 * Activity Log Types
 * تم تصحيحه ليتوافق مع قواعد ESLint الصارمة ونظام Tailwind v4
 */

export interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  // الحل: استبدال any بـ Record<string, unknown> لضمان الأمان البرمجي
  // أو يمكنك استخدام نوع JSONValue الذي عرفناه سابقاً إذا كان متاحاً عالمياً
  details: Record<string, unknown>;
  performedBy: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;

  user?: {
    id: string;
    email: string;
    profile?: {
      firstName?: string;
      lastName?: string;
      avatar?: string;
    };
  };
}

export interface LogFilters {
  action?: string;
  entity?: string;
  entityId?: string;
  performedBy?: string;
  startDate?: string;
  endDate?: string;
  limit?: number;
  offset?: number;
}

export interface LogResponse {
  items: ActivityLog[];
  total: number;
  limit: number;
  offset: number;
}
