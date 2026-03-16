export interface Permission {
  id: string;
  name: string;
  description?: string;
  category?: string;
  createdAt?: string; // جعلناه اختيارياً لحل تعارض البيانات
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  isSystem: boolean;
  createdAt?: string; // جعلناه اختيارياً
  updatedAt?: string; // جعلناه اختيارياً
  permissions: Permission[];
  usersCount?: number;
}

export interface CreateRoleDto {
  name: string;
  description?: string;
}

export interface UpdateRoleDto {
  name?: string;
  description?: string;
}

export type RoleResponse = Role;
