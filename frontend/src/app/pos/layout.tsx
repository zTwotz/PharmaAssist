import React from 'react';
import { RouteGuard } from '@/components/route-guard';
import Link from 'next/link';
import { Sidebar } from '@/components/sidebar';

export const metadata = {
  title: 'PharmaAssist POS',
  description: 'Point of Sale System cho Dược sĩ',
};

export default function PosLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard allowedPermissions={['CREATE_ORDER']}>
      <div className="flex min-h-screen bg-cloud font-sans overflow-hidden">
        <Sidebar currentPath="/pos" />
        <div className="flex-1 flex flex-col min-w-0">
          {/* POS Header */}
          <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                P
              </div>
              <h1 className="font-semibold text-slate-800 text-lg">PharmaAssist POS</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-slate-600">Dược sĩ: Admin</span>
              </div>
              <Link href="/" className="text-sm text-blue-600 hover:underline">
                Quay lại trang chủ
              </Link>
            </div>
          </header>

          {/* POS Content */}
          <main className="flex-1 flex overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
