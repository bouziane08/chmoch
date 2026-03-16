/**
 * Dashboard Types & Interfaces
 * نظام الأنواع للوحة التحكم - متوافق مع TypeScript Strict Mode و Tailwind v4
 */

// نوع مساعد لبيانات JSON المرنة لضمان عدم استخدام any
export type JSONValue =
  | string
  | number
  | boolean
  | null
  | { [x: string]: JSONValue }
  | JSONValue[];

export interface DashboardStats {
  users: {
    total: number;
    active: number;
    suspended: number;
    pending: number;
    newToday: number;
    newThisWeek: number;
    newThisMonth: number;
    growthRate: number;
  };
  roles: {
    total: number;
    system: number;
    custom: number;
    usersPerRole: Record<string, number>;
  };
  activity: {
    totalLogins: number;
    successfulLogins: number;
    failedLogins: number;
    uniqueUsers: number;
    averagePerDay: number;
    peakHour: number;
    peakDay: string;
  };
  system: {
    status: "healthy" | "degraded" | "down";
    uptime: number;
    responseTime: number;
    memoryUsage: number;
    cpuUsage: number;
    apiCalls: number;
    errorRate: number;
  };
  notifications: {
    total: number;
    unread: number;
    read: number;
    byType: Record<string, number>;
  };
  timeline: {
    labels: string[];
    users: number[];
    logins: number[];
    registrations: number[];
  };
  geography: {
    countries: Record<string, number>;
    cities: Record<string, number>;
  };
}

export interface MetricCard {
  title: string;
  value: number | string;
  change: number;
  changeType: "increase" | "decrease";
  icon: string;
  color: string;
  trend?: number[];
}

export interface ActivityItem {
  id: string;
  user: {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
  };
  action: string;
  entity: string;
  // تم التصحيح هنا: استخدام Record<string, unknown> بدلاً من any لإرضاء ESLint
  details: Record<string, unknown>;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    tension?: number;
    fill?: boolean;
  }[];
}

/**
 * أنواع إضافية مفيدة لعمليات التصفية (Filtering) في لوحة التحكم
 */
export type DashboardTimeRange = "7d" | "30d" | "90d" | "12m" | "all";

export interface UserComparisonData {
  period: string;
  current: number;
  previous: number;
}
