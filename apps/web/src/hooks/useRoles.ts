"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rolesApi } from "@/lib/api/roles";
import { toast } from "sonner";

// تعريف واجهات البيانات لمنع استخدام any
interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useRoles() {
  const queryClient = useQueryClient();

  const { data: roles, isLoading } = useQuery({
    queryKey: ["roles"],
    queryFn: () => rolesApi.getAllRoles(),
  });

  const createRole = useMutation({
    mutationFn: rolesApi.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("تم إنشاء الدور بنجاح");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "فشل إنشاء الدور");
    },
  });

  const updateRole = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      rolesApi.updateRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("تم تحديث الدور بنجاح");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "فشل تحديث الدور");
    },
  });

  const deleteRole = useMutation({
    mutationFn: rolesApi.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("تم حذف الدور بنجاح");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "فشل حذف الدور");
    },
  });

  return {
    roles: roles || [],
    isLoading,
    createRole: createRole.mutate,
    updateRole: updateRole.mutate,
    deleteRole: deleteRole.mutate,
  };
}

export function usePermissions() {
  // حل خطأ 2552: يجب استدعاء useQueryClient لاستخدامه في onSuccess
  const queryClient = useQueryClient();

  const { data: permissions, isLoading } = useQuery({
    queryKey: ["permissions"],
    queryFn: () => rolesApi.getAllPermissions(),
  });

  const assignPermission = useMutation({
    mutationFn: ({
      roleId,
      permissionId,
    }: {
      roleId: string;
      permissionId: string;
    }) => rolesApi.assignPermissionToRole(roleId, permissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("تم إضافة الصلاحية بنجاح");
    },
  });

  const removePermission = useMutation({
    mutationFn: ({
      roleId,
      permissionId,
    }: {
      roleId: string;
      permissionId: string;
    }) => rolesApi.removePermissionFromRole(roleId, permissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("تم إزالة الصلاحية بنجاح");
    },
  });

  return {
    permissions: permissions || [],
    isLoading,
    assignPermission: assignPermission.mutate,
    removePermission: removePermission.mutate,
  };
}
