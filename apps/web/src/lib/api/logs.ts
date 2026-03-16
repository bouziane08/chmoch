import api from "@/lib/axios";

export interface ActivityLog {
  id: string;
  action: string;
  entity: string;
  entityId?: string;
  details: Record<string, never>;
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

export const logsApi = {
  async getLogs(filters?: LogFilters) {
    const response = await api.get("/logs", { params: filters });
    return response.data;
  },

  async getUserLogs(userId: string, limit: number = 50) {
    const response = await api.get(`/logs/user/${userId}`, {
      params: { limit },
    });
    return response.data;
  },

  async getEntityLogs(entity: string, entityId: string, limit: number = 50) {
    const response = await api.get("/logs/entity", {
      params: { entity, entityId, limit },
    });
    return response.data;
  },
};
