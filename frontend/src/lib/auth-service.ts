import api from './api';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
  permissions?: string[];
  mustChangePassword?: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: UserProfile;
}

export const authService = {
  async register(registerData: any): Promise<any> {
    const response = await api.post('/auth/register', registerData);
    return response.data;
  },

  async login(loginData: any): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', loginData);
    return response.data;
  },

  async getMe(): Promise<UserProfile> {
    const response = await api.get<UserProfile>('/auth/me');
    return response.data;
  },

  async clearMustChangePassword(): Promise<void> {
    await api.patch('/auth/me/clear-must-change-password');
  },
};
