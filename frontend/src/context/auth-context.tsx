'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { authService, UserProfile } from '@/lib/auth-service';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  hasRole: (allowedRoles: string[]) => boolean;
  hasAnyPermission: (allowedPermissions: string[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function withTimeout<T>(promise: Promise<T>, ms: number = 3000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Operation timed out after ${ms}ms`)), ms)
    )
  ]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user session on startup
  useEffect(() => {
    async function loadSession() {
      try {
        let token = null;
        if (typeof window !== 'undefined') {
          token = localStorage.getItem('access_token');
        }

        if (token) {
          // Fetch user profile and roles from NestJS Backend
          const profile = await authService.getMe();
          setUser(profile);
        } else {
          // Fallback to Supabase session
          const { data: { session } } = await withTimeout(supabase.auth.getSession(), 2000);
          if (session?.access_token) {
            if (typeof window !== 'undefined') {
              localStorage.setItem('access_token', session.access_token);
            }
            const profile = await authService.getMe();
            setUser(profile);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Error loading session:', error);
        setUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
        }
        // If profile fetch fails, clean up Supabase session
        try {
          await withTimeout(supabase.auth.signOut(), 2000);
        } catch (signOutError) {
          console.error('Sign out error on session load failure:', signOutError);
        }
      } finally {
        setLoading(false);
      }
    }

    loadSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token');
        }
        router.push('/login');
      } else if (event === 'SIGNED_IN' && session) {
        try {
          if (typeof window !== 'undefined') {
            localStorage.setItem('access_token', session.access_token);
          }
          const profile = await authService.getMe();
          setUser(profile);
        } catch (error) {
          console.error('Error getting profile on auth state change:', error);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', response.accessToken);
      }

      // Log in the frontend Supabase client so its session is updated
      try {
        await withTimeout(
          supabase.auth.setSession({
            access_token: response.accessToken,
            refresh_token: response.refreshToken,
          }),
          2000
        );
      } catch (authError) {
        console.error('Failed to set Supabase session, proceeding anyway:', authError);
      }

      setUser(response.user);
      router.push('/dashboard');
    } catch (error) {
      setUser(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
      }
      await supabase.auth.signOut();
      setUser(null);
      router.push('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };


  const hasRole = (allowedRoles: string[]) => {
    if (!user || !user.roles) return false;
    return user.roles.some(role => allowedRoles.includes(role));
  };

  const hasAnyPermission = (allowedPermissions: string[]) => {
    if (!user || !user.permissions) return false;
    return user.permissions.some(permission => allowedPermissions.includes(permission));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user, hasRole, hasAnyPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
