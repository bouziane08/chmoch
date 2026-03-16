import api from "@/lib/axios";

export interface Role {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
  usersCount?: number;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  category?: string;
  createdAt: string;
}

export const rolesApi = {
  async getAllRoles() {
    const response = await api.get("/roles");
    return response.data;
  },

  async getRoleById(id: string): Promise<Role> {
    const response = await api.get(`/roles/${id}`);
    return response.data;
  },

  async createRole(data: { name: string; description?: string }) {
    const response = await api.post("/roles", data);
    return response.data;
  },

  async updateRole(id: string, data: { name?: string; description?: string }) {
    const response = await api.patch(`/roles/${id}`, data);
    return response.data;
  },

  async deleteRole(id: string) {
    const response = await api.delete(`/roles/${id}`);
    return response.data;
  },

  async getAllPermissions(category?: string): Promise<Permission[]> {
    const response = await api.get("/roles/permissions", {
      params: { category },
    });
    return response.data;
  },

  async assignPermissionToRole(roleId: string, permissionId: string) {
    const response = await api.post(`/roles/${roleId}/permissions`, {
      permissionId,
    });
    return response.data;
  },

  async removePermissionFromRole(roleId: string, permissionId: string) {
    const response = await api.delete(
      `/roles/${roleId}/permissions/${permissionId}`,
    );
    return response.data;
  },

  async assignRoleToUser(userId: string, roleId: string) {
    const response = await api.post(`/roles/users/${userId}/roles/${roleId}`);
    return response.data;
  },

  async removeRoleFromUser(userId: string, roleId: string) {
    const response = await api.delete(`/roles/users/${userId}/roles/${roleId}`);
    return response.data;
  },

  async getUserRoles(userId: string) {
    const response = await api.get(`/roles/users/${userId}`);
    return response.data;
  },
};
