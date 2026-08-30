export interface User {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
}

export interface AuthResponse {
  user: User;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface GoogleLoginPayload {
  token: string;
}
