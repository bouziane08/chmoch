import api from "@/lib/axios";

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

export const dashboardApi = {
  async getStats(range: string = "last7days"): Promise<DashboardStats> {
    const response = await api.get("/dashboard/stats", { params: { range } });
    return response.data;
  },

  async getMetrics() {
    const response = await api.get("/dashboard/metrics");
    return response.data;
  },

  async getRecentActivity(limit: number = 10) {
    const response = await api.get("/dashboard/activity", {
      params: { limit },
    });
    return response.data;
  },

  async getUserTimeline(range: string = "last7days") {
    const response = await api.get("/dashboard/users/timeline", {
      params: { range },
    });
    return response.data;
  },

  async getActivityChart(range: string = "last7days") {
    const response = await api.get("/dashboard/activity/chart", {
      params: { range },
    });
    return response.data;
  },

  async getRoleDistribution() {
    const response = await api.get("/dashboard/roles/distribution");
    return response.data;
  },

  async getGeography(range: string = "last7days") {
    const response = await api.get("/dashboard/geography", {
      params: { range },
    });
    return response.data;
  },

  async exportData(
    type: "users" | "activity" | "analytics",
    format: "csv" | "json",
  ) {
    const response = await api.get("/dashboard/export", {
      params: { type, format },
      responseType: "blob",
    });
    return response.data;
  },

  async clearCache() {
    const response = await api.post("/dashboard/cache/clear");
    return response.data;
  },

  async getHealth() {
    const response = await api.get("/dashboard/health");
    return response.data;
  },

  async getUserActivity(userId: string) {
    const response = await api.get(`/dashboard/user/${userId}/activity`);
    return response.data;
  },

  async getSummary() {
    const response = await api.get("/dashboard/summary");
    return response.data;
  },
};
