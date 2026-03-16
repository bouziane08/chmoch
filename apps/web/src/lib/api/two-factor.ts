import api from "@/lib/axios";

export interface TwoFactorSecret {
  secret: string;
  qrCode: string;
  otpauth_url: string;
}

export interface BackupCode {
  code: string;
  createdAt: string;
  isUsed: boolean;
}

export interface BackupCodes {
  codes: BackupCode[];
  total: number;
  used: number;
}

export interface Enable2FAResponse {
  success: boolean;
  backupCodes: BackupCodes;
}

export const twoFactorApi = {
  async generateSecret(): Promise<TwoFactorSecret> {
    const response = await api.post<TwoFactorSecret>("/auth/2fa/generate");
    return response.data;
  },

  async enable2FA(token: string): Promise<Enable2FAResponse> {
    const response = await api.post<Enable2FAResponse>("/auth/2fa/enable", { token });
    return response.data;
  },

  async disable2FA(token: string): Promise<{ success: boolean }> {
    const response = await api.post<{ success: boolean }>("/auth/2fa/disable", { token });
    return response.data;
  },

  async verifyToken(token: string): Promise<{ valid: boolean }> {
    const response = await api.post<{ valid: boolean }>("/auth/2fa/verify", { token });
    return response.data;
  },

  async getBackupCodes(): Promise<BackupCodes> {
    const response = await api.get<BackupCodes>("/auth/2fa/backup-codes");
    return response.data;
  },

  async regenerateBackupCodes(): Promise<BackupCodes> {
    const response = await api.post<BackupCodes>("/auth/2fa/backup-codes/regenerate");
    return response.data;
  },
};