'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { CategoryList } from '@/components/medicines/CategoryList';
import { MedicineList } from '@/components/medicines/MedicineList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Shield, Pill, FolderTree } from 'lucide-react';

export default function MedicinesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'categories' | 'medicines'>('categories');

  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : 'Quản lý kho';

  return (
    <RouteGuard allowedPermissions={['VIEW_MEDICINES']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        {/* Dynamic Sidebar based on roles */}
        <Sidebar currentPath="/medicines" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-3">
              <FolderTree className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-bold text-ink uppercase tracking-wider">
                Quản lý Thuốc & Danh mục
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-charcoal bg-cloud px-3 py-1.5 rounded-md border border-hairline">
                <User className="h-4 w-4 text-graphite" />
                <span className="font-medium truncate max-w-[150px]">{user?.email}</span>
                <span className="text-gray-300">|</span>
                <Shield className="h-3 w-3 text-primary inline" />
                <span className="font-semibold text-primary">{displayRole}</span>
              </div>
            </div>
          </header>

          <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-[1366px] w-full mx-auto">
            {/* Tabs Control */}
            <div className="flex border-b border-hairline space-x-6">
              <button
                onClick={() => setActiveTab('categories')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'categories'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-graphite hover:text-ink'
                }`}
              >
                <FolderTree className="h-4 w-4" />
                Danh mục thuốc
              </button>
              <button
                onClick={() => setActiveTab('medicines')}
                className={`pb-3 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                  activeTab === 'medicines'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-graphite hover:text-ink'
                }`}
              >
                <Pill className="h-4 w-4" />
                Danh sách thuốc
              </button>
            </div>

            {/* Tab Contents */}
            <div className="mt-4 animate-fade-in duration-200">
              {activeTab === 'categories' ? (
                <CategoryList />
              ) : (
                <MedicineList />
              )}
            </div>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}

