import React from 'react';
import { RouteGuard } from '@/components/route-guard';
import { Sidebar } from '@/components/sidebar';

export const metadata = {
  title: 'PharmaAssist POS',
  description: 'Point of Sale System cho Dược sĩ',
};

export default function PosLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedPermissions={['CREATE_ORDER']}>
      <div className="min-h-screen bg-slate-50 overflow-hidden flex">
        {/* Left Sidebar Navigation */}
        <Sidebar currentPath="/pos" />

        {/* Main POS Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </div>
    </RouteGuard>
  );
}
