export interface User {
  createdAt: string | number | Date;
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED";
  provider: "CREDENTIALS" | "GOOGLE" | "GITHUB";
  isTwoFactorEnabled: boolean;
  roles: string[];
  permissions: string[];
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    bio?: string;
  };
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}
