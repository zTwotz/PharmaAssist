import axios from 'axios';
import { supabase } from './supabase';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor tự động lấy Supabase access token và đính kèm vào Authorization header
api.interceptors.request.use(
  async (config) => {
    // Không đính kèm hoặc gọi session cho request đăng nhập để tránh treo
    if (config.url === '/auth/login') {
      return config;
    }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        config.headers.Authorization = `Bearer ${session.access_token}`;
      }
    } catch (error) {
      console.error('Error fetching Supabase session in interceptor:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
