'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  allowedPermissions?: string[];
}

export function RouteGuard({ children, allowedRoles, allowedPermissions }: RouteGuardProps) {
  const { user, loading, isAuthenticated, hasRole, hasAnyPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    } else if (!loading && isAuthenticated) {
      // Check roles
      if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
        router.replace('/forbidden');
      }
      // Check permissions
      else if (allowedPermissions && allowedPermissions.length > 0 && !hasAnyPermission(allowedPermissions)) {
        router.replace('/forbidden');
      }
    }
  }, [loading, isAuthenticated, router, user, allowedRoles, allowedPermissions, hasRole, hasAnyPermission]);

  // If still loading session, show premium spinner
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <div className="text-center space-y-3 font-sans">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <p className="text-sm font-medium text-graphite">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, do not show children while redirecting
  if (!isAuthenticated) {
    return null;
  }

  // If roles restriction exists, verify roles
  if (allowedRoles && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return null; // Will be redirected by useEffect
  }

  // If permission restriction exists, verify permissions
  if (allowedPermissions && allowedPermissions.length > 0 && !hasAnyPermission(allowedPermissions)) {
    return null; // Will be redirected by useEffect
  }

  // Everything is fine, render child components
  return <>{children}</>;
}
