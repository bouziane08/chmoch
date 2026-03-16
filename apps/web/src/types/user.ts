export interface User {
  id: string;
  email: string;
  status:
    | "ACTIVE"
    | "INACTIVE"
    | "SUSPENDED"
    | "PENDING_VERIFICATION"
    | "LOCKED";
  provider: "CREDENTIALS" | "GOOGLE" | "GITHUB";
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  isTwoFactorEnabled: boolean;

  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
    avatar?: string;
  };

  roles: Array<{
    id: string;
    name: string;
  }>;

  permissions: string[];
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

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

export interface UserResponse {
  id: string;
  email: string;
  status: string;
  provider: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
  };
  roles: Array<{
    id: string;
    name: string;
  }>;
}
