'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  requiredPermissions?: string[];
}

export default function ProtectedRoute({
  children,
  allowedRoles,
  requiredPermissions,
}: ProtectedRouteProps) {
  const { user, loading, hasRole, hasPermission } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
        return;
      }

      let isAuthorized = true;

      if (allowedRoles && allowedRoles.length > 0) {
        isAuthorized = hasRole(allowedRoles);
      }

      if (isAuthorized && requiredPermissions && requiredPermissions.length > 0) {
        // User must have all required permissions
        const hasAllPermissions = requiredPermissions.every((perm) => hasPermission(perm));
        if (!hasAllPermissions) {
          isAuthorized = false;
        }
      }

      if (!isAuthorized) {
        // Redirect to a dashboard or unauthorized page
        router.push('/dashboard');
      }
    }
  }, [user, loading, allowedRoles, requiredPermissions, hasRole, hasPermission, router]);

  // Show nothing while loading or evaluating
  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Check authorization for render
  let isAuthorized = true;

  if (allowedRoles && allowedRoles.length > 0) {
    isAuthorized = hasRole(allowedRoles);
  }

  if (isAuthorized && requiredPermissions && requiredPermissions.length > 0) {
    isAuthorized = requiredPermissions.every((perm) => hasPermission(perm));
  }

  if (!isAuthorized) {
    return null; // Will redirect in useEffect
  }

  return <>{children}</>;
}
