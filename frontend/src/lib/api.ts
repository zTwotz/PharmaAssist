import axios from 'axios';
import { supabase } from './supabase';

function withTimeout<T>(promise: Promise<T>, ms: number = 3000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
    )
  ]);
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor tự động lấy access token và đính kèm vào Authorization header
api.interceptors.request.use(
  async (config) => {
    // Không đính kèm hoặc gọi session cho request đăng nhập để tránh treo
    if (config.url === '/auth/login') {
      return config;
    }
    
    // Lấy token từ localStorage trước để tránh Supabase bị treo
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('access_token');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      // Fallback sang Supabase session
      try {
        const { data: { session } } = await withTimeout(supabase.auth.getSession(), 1500);
        if (session?.access_token) {
          config.headers.Authorization = `Bearer ${session.access_token}`;
          if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', session.access_token);
          }
        }
      } catch (error) {
        console.error('Error fetching Supabase session in interceptor:', error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

