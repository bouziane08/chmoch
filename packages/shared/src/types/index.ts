// packages/shared/src/types/index.ts
// هذه الحزمة ستستخدم في كل من API و Web

// ===========================================
// 👤 USER TYPES
// ===========================================

export type UserStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'SUSPENDED'
  | 'PENDING_VERIFICATION'
  | 'LOCKED';

export type AuthProvider =
  | 'CREDENTIALS'
  | 'GOOGLE'
  | 'GITHUB'
  | 'FACEBOOK'
  | 'TWITTER'
  | 'APPLE';

export interface Profile {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  birthDate?: string;
  avatar?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface User {
  id: string;
  email: string;
  status: UserStatus;
  provider: AuthProvider;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isTwoFactorEnabled: boolean;
  profile?: Profile;
  roles: Array<{
    id: string;
    name: string;
  }>;
  permissions: string[];
}

// ===========================================
// 🔐 AUTH TYPES
// ===========================================

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

// ===========================================
// 🛡️ ROLE & PERMISSION TYPES
// ===========================================

export interface Permission {
  id: string;
  name: string;
  description?: string;
  category?: string;
  resource?: string;
  action?: string;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  priority?: number;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
  usersCount?: number;
}

export interface CreateRoleDto {
  name: string;
  description?: string;
}

// ===========================================
// 📝 LOG TYPES
// ===========================================

export type LoginStatus =
  | 'SUCCESS'
  | 'FAILED'
  | 'FAILED_INVALID_CREDENTIALS'
  | 'FAILED_USER_NOT_FOUND'
  | 'FAILED_ACCOUNT_LOCKED'
  | 'FAILED_ACCOUNT_SUSPENDED'
  | 'FAILED_2FA_INVALID'
  | 'FAILED_RATE_LIMIT'
  | 'FAILED_OAUTH';

export interface LoginHistory {
  id: string;
  userId?: string;
  email: string;
  status: LoginStatus;
  provider: AuthProvider;
  ipAddress?: string;
  userAgent?: string;
  failureReason?: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  details: Record<string, unknown>;
  performedBy: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt: string;
  user?: {
    id: string;
    email: string;
    profile?: Profile;
  };
}

// ===========================================
// 🔔 NOTIFICATION TYPES
// ===========================================

export type NotificationType =
  | 'INFO'
  | 'WARNING'
  | 'CRITICAL'
  | 'SUCCESS'
  | 'ERROR';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  readAt?: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// ===========================================
// 📊 DASHBOARD TYPES
// ===========================================

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
    status: 'healthy' | 'degraded' | 'down';
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

// ===========================================
// 📦 API RESPONSE TYPES
// ===========================================

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  data: T;
  timestamp: string;
  path: string;
  method: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
      statusCode?: number;
    };
    status?: number;
  };
  message?: string;
}
