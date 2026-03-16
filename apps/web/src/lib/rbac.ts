import { User } from "@/types/auth";

export function hasPermission(user: User | null, permission: string): boolean {
  if (!user) return false;
  if (user.roles?.includes("ADMIN")) return true;
  return user.permissions?.includes(permission) || false;
}

export function hasRole(user: User | null, role: string): boolean {
  if (!user) return false;
  return user.roles?.includes(role) || false;
}

export function hasAnyRole(user: User | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.some((role) => user.roles?.includes(role));
}

export function hasAllRoles(user: User | null, roles: string[]): boolean {
  if (!user) return false;
  return roles.every((role) => user.roles?.includes(role));
}

export const PERMISSIONS = {
  USERS_READ: "users:read",
  USERS_WRITE: "users:write",
  USERS_DELETE: "users:delete",
  ROLES_READ: "roles:read",
  ROLES_WRITE: "roles:write",
  ROLES_DELETE: "roles:delete",
  DASHBOARD_VIEW: "dashboard:view",
  DASHBOARD_STATS: "dashboard:stats",
  LOGS_VIEW: "logs:view",
} as const;
