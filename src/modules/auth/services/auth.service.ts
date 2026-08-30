import { ApiClient } from '@/lib/http/client/api-client';
import { ApiResponse } from '@/lib/types';
import {
  AuthResponse,
  GoogleLoginPayload,
  LoginPayload,
  RegisterPayload,
  User,
} from '../types/auth';

export const authService = {
  async register(payload: RegisterPayload): Promise<ApiResponse<AuthResponse>> {
    return ApiClient.post<AuthResponse, RegisterPayload>('v1/auth/register', payload, {
      credentials: 'include',
    });
  },

  async login(payload: LoginPayload): Promise<ApiResponse<AuthResponse>> {
    return ApiClient.post<AuthResponse, LoginPayload>('v1/auth/login', payload, {
      credentials: 'include',
    });
  },

  async loginWithGoogle(payload: GoogleLoginPayload): Promise<ApiResponse<AuthResponse>> {
    return ApiClient.post<AuthResponse, GoogleLoginPayload>('v1/auth/google', payload, {
      credentials: 'include',
    });
  },

  async getMe(): Promise<ApiResponse<User>> {
    return ApiClient.get<User>('v1/auth/me', {
      credentials: 'include',
    });
  },

  async logout(): Promise<ApiResponse<null>> {
    return ApiClient.post<null>('v1/auth/logout', undefined, {
      credentials: 'include',
    });
  },
};
