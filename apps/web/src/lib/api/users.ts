import api from "@/lib/axios";
import { User } from "@/types/auth";

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  email?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export const usersApi = {
  async getAllUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const response = await api.get("/users", { params });
    return response.data;
  },

  async getUserById(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  async updateProfile(data: UpdateProfileDto): Promise<User> {
    const response = await api.patch("/profile", data);
    return response.data;
  },

  async changePassword(data: ChangePasswordDto) {
    const response = await api.patch("/profile/change-password", data);
    return response.data;
  },

  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.patch("/profile/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  async deleteUser(id: string) {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },

  async updateUserStatus(id: string, status: string) {
    const response = await api.patch(`/users/${id}/status`, { status });
    return response.data;
  },
};
