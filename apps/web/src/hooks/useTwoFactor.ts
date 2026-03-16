"use client";

import { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { twoFactorApi, BackupCodes, TwoFactorSecret, Enable2FAResponse } from "@/lib/api/two-factor";
import { toast } from "sonner";

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export function useTwoFactor() {
  const queryClient = useQueryClient();
  const [secret, setSecret] = useState<string | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  const generateSecretMutation = useMutation({
    mutationFn: twoFactorApi.generateSecret,
    onSuccess: (data: TwoFactorSecret) => {
      setSecret(data.secret);
      setQrCode(data.qrCode);
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "فشل إنشاء رمز QR");
    },
  });

  const enable2FAMutation = useMutation({
    mutationFn: twoFactorApi.enable2FA,
    onSuccess: (data: Enable2FAResponse) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["backup-codes"], data.backupCodes);
      toast.success("تم تفعيل المصادقة الثنائية بنجاح");
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.message || "فشل تفعيل المصادقة الثنائية",
      );
    },
  });

  const disable2FAMutation = useMutation({
    mutationFn: twoFactorApi.disable2FA,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("تم تعطيل المصادقة الثنائية بنجاح");
    },
    onError: (error: ApiError) => {
      toast.error(
        error.response?.data?.message || "فشل تعطيل المصادقة الثنائية",
      );
    },
  });

  const verifyTokenMutation = useMutation({
    mutationFn: twoFactorApi.verifyToken,
  });

  const { data: backupCodes } = useQuery({
    queryKey: ["backup-codes"],
    queryFn: twoFactorApi.getBackupCodes,
  });

  const regenerateBackupCodesMutation = useMutation({
    mutationFn: twoFactorApi.regenerateBackupCodes,
    onSuccess: (data: BackupCodes) => {
      queryClient.setQueryData(["backup-codes"], data);
      toast.success("تم إنشاء رموز استرجاع جديدة");
    },
    onError: (error: ApiError) => {
      toast.error(error.response?.data?.message || "فشل إنشاء رموز الاسترجاع");
    },
  });

  // استخدام useCallback لضمان استقرار الدالة كاعتماد (Dependency) في useEffect
  const generateSecret = useCallback(async () => {
    return generateSecretMutation.mutateAsync();
  }, [generateSecretMutation]);

  return {
    // State
    secret,
    qrCode,
    backupCodes: backupCodes?.codes || [],
    isLoading:
      generateSecretMutation.isPending ||
      enable2FAMutation.isPending ||
      disable2FAMutation.isPending,

    generateSecret,
    enable2FA: enable2FAMutation,
    disable2FA: disable2FAMutation.mutateAsync,
    verifyToken: verifyTokenMutation.mutateAsync,
    getBackupCodes: twoFactorApi.getBackupCodes,
    regenerateBackupCodes: regenerateBackupCodesMutation.mutateAsync,
  };
}