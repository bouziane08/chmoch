"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Log {
  id: string;
  action: string;
  entity: string;
  userId: string;
  userName: string;
  details: string;
  ipAddress: string;
  createdAt: string;
  severity: "INFO" | "WARN" | "ERROR" | "CRITICAL";
}

export interface LogFilters {
  startDate?: Date;
  endDate?: Date;
  action?: string;
  userId?: string;
}

interface LogsResponse {
  items: Log[];
  total: number;
}

export function useLogs(filters: LogFilters) {
  const { data, isLoading, refetch } = useQuery<LogsResponse>({
    queryKey: ["logs", filters],
    queryFn: async () => {
      const response = await axios.get("/api/logs", { params: filters });
      return response.data;
    },
  });

  const exportLogs = async (currentFilters: LogFilters): Promise<Log[]> => {
    const response = await axios.get("/api/logs/export", {
      params: currentFilters,
    });
    return response.data;
  };

  return {
    logs: data?.items || [],
    total: data?.total || 0,
    isLoading,
    refetch,
    exportLogs,
  };
}
