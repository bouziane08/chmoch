"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api/users";
import { toast } from "sonner";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useUsers(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      console.log('📡 جلب المستخدمين...');
      try {
        const result = await usersApi.getAllUsers(params);
        console.log('✅ النتيجة:', result);
        
        // ✅ التحقق من شكل البيانات
        if (Array.isArray(result)) {
          // إذا كانت مصفوفة مباشرة
          return {
            items: result,
            total: result.length
          };
        } else if (result?.items) {
          // إذا كان فيها items
          return result;
        } else {
          console.error('❌ شكل بيانات غير متوقع:', result);
          return { items: [], total: 0 };
        }
      } catch (err) {
        console.error('❌ خطأ:', err);
        throw err;
      }
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم حذف المستخدم بنجاح");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "فشل حذف المستخدم");
    },
  });

  const updateStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      usersApi.updateUserStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("تم تحديث حالة المستخدم بنجاح");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(
        apiError.response?.data?.message || "فشل تحديث حالة المستخدم",
      );
    },
  });

  // ✅ تأكد من شكل البيانات قبل إرجاعها
  const items = Array.isArray(data) ? data : (data?.items || []);
  const total = Array.isArray(data) ? data.length : (data?.total || items.length);

  return {
    users: items,
    total: total,
    isLoading,
    error,
    deleteUser: deleteUser.mutate,
    updateStatus: updateStatus.mutate,
  };
}

// باقي الكود كما هو...
export function useUser(id: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user", id],
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });

  return {
    user: data,
    isLoading,
    error,
  };
}

export function useProfile() {
  const queryClient = useQueryClient();

  const updateProfile = useMutation({
    mutationFn: usersApi.updateProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      toast.success("تم تحديث الملف الشخصي بنجاح");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "فشل تحديث الملف الشخصي");
    },
  });

  const changePassword = useMutation({
    mutationFn: usersApi.changePassword,
    onSuccess: () => {
      toast.success("تم تغيير كلمة المرور بنجاح");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "فشل تغيير كلمة المرور");
    },
  });

  const uploadAvatar = useMutation({
    mutationFn: usersApi.uploadAvatar,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user", data.id] });
      toast.success("تم تحديث الصورة الشخصية بنجاح");
    },
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "فشل تحديث الصورة");
    },
  });

  return {
    updateProfile: updateProfile.mutate,
    changePassword: changePassword.mutate,
    uploadAvatar: uploadAvatar.mutate,
    isUpdating: updateProfile.isPending,
    isChangingPassword: changePassword.isPending,
    isUploading: uploadAvatar.isPending,
  };
}