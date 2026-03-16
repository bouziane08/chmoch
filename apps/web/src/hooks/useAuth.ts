"use client";

import { toast } from "sonner";
import { useAuthStore } from "@/store/auth.store";
import { authApi } from "@/lib/api/auth";
import { LoginDto, RegisterDto } from "@/types/auth";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useAuth() {
  const { user, isAuthenticated, isLoading, setAuth, logout } = useAuthStore();

  const login = async (data: LoginDto) => {
    try {
      const response = await authApi.login(data);
      setAuth(response.user, response.accessToken, response.refreshToken);
      toast.success("تم تسجيل الدخول بنجاح");
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "فشل تسجيل الدخول");
      throw error;
    }
  };

  const register = async (data: RegisterDto) => {
    try {
      const response = await authApi.register(data);
      toast.success("تم إنشاء الحساب بنجاح");
      return response;
    } catch (error) {
      const apiError = error as ApiError;
      toast.error(apiError.response?.data?.message || "فشل إنشاء الحساب");
      throw error;
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
  };
}
