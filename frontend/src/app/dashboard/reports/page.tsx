'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { RouteGuard } from '@/components/route-guard';
import { Sidebar } from '@/components/sidebar';
import api from '@/lib/api';
import RevenueMetrics from '@/components/reports/RevenueMetrics';
import ReportFilters from '@/components/reports/ReportFilters';
import TopMedicinesTable from '@/components/reports/TopMedicinesTable';
import InventoryReportTable from '@/components/reports/InventoryReportTable';
import { BarChart2, Package, TrendingUp, RefreshCw } from 'lucide-react';

interface RevenueData {
  totalRevenue: number;
  totalCogs: number;
  grossProfit: number;
  orderCount: number;
}

interface TopMedicineItem {
  name: string;
  sku: string;
  quantitySold: number;
  revenue: number;
}

interface InventoryItem {
  sku: string;
  medicineName: string;
  warehouse: string;
  totalStock: number;
  reservedQuantity: number;
  availableQuantity: number;
  minQuantity: number;
  stockStatus: string;
}

type ActiveTab = 'revenue' | 'topMedicines' | 'inventory';

// PAC-TASK-418: Loading skeleton component
function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-24 bg-gray-200 rounded-lg" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 rounded-lg" />
    </div>
  );
}

// PAC-TASK-418: Error state component
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-red-400 mb-4">
        <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
      </div>
      <p className="text-gray-600 font-medium mb-2">Failed to load report data</p>
      <p className="text-gray-400 text-sm mb-4">Please check your connection and try again.</p>
      <button
        onClick={onRetry}
        className="inline-flex items-center px-4 py-2 bg-[#024ad8] text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Retry
      </button>
    </div>
  );
}

// PAC-TASK-418: Empty state component
function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="text-gray-300 mb-4">
        <BarChart2 className="w-12 h-12 mx-auto" />
      </div>
      <p className="text-gray-500 font-medium">{message}</p>
      <p className="text-gray-400 text-sm mt-1">Try adjusting the filters or date range.</p>
    </div>
  );
}

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('revenue');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [topMedicinesData, setTopMedicinesData] = useState<{ items: TopMedicineItem[]; total: number } | null>(null);
  const [inventoryData, setInventoryData] = useState<{ items: InventoryItem[]; total: number } | null>(null);

  const [filters, setFilters] = useState({ startDate: '', endDate: '', status: '' });
  const [stockStatusFilter, setStockStatusFilter] = useState<string>('all');

  const fetchAllReports = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const revenueParams = {
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
        ...(filters.status && { status: filters.status })
      };

      const [revResponse, topResponse, invResponse] = await Promise.all([
        api.get('/reports/revenue', { params: revenueParams }),
        api.get('/reports/top-medicines', { params: { ...revenueParams, limit: 10 } }),
        api.get('/reports/inventory', { params: { stockStatus: stockStatusFilter } })
      ]);
      setRevenueData(revResponse.data);
      setTopMedicinesData(topResponse.data);
      setInventoryData(invResponse.data);
    } catch (err) {
      console.error('[ReportsPage] Error fetching report data', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [filters, stockStatusFilter]);

  useEffect(() => {
    fetchAllReports();
  }, [fetchAllReports]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const tabs: { key: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { key: 'revenue', label: 'Revenue', icon: <TrendingUp className="w-4 h-4" /> },
    { key: 'topMedicines', label: 'Top Medicines', icon: <BarChart2 className="w-4 h-4" /> },
    { key: 'inventory', label: 'Inventory', icon: <Package className="w-4 h-4" /> }
  ];

  return (
    <RouteGuard allowedRoles={['ADMIN', 'MANAGER']}>
      <div className="flex h-screen bg-[#f8fafc]">
        <Sidebar currentPath="/dashboard/reports" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Reports Dashboard</h1>
            <p className="text-gray-500 mt-1">Analyze revenue, top-selling medicines, and inventory levels.</p>
          </div>

          {/* Filters — PAC-TASK-413 */}
          <ReportFilters
            startDate={filters.startDate}
            endDate={filters.endDate}
            status={filters.status}
            onFilterChange={handleFilterChange}
            onApply={fetchAllReports}
          />

          {/* Tab navigation */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                  activeTab === tab.key
                    ? 'border-[#024ad8] text-[#024ad8]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* PAC-TASK-418: Loading / Error states */}
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState onRetry={fetchAllReports} />
          ) : (
            <>
              {activeTab === 'revenue' && (
                revenueData && revenueData.orderCount > 0
                  ? <RevenueMetrics {...revenueData} />
                  : <EmptyState message="No revenue data for this period" />
              )}

              {activeTab === 'topMedicines' && (
                topMedicinesData
                  ? <TopMedicinesTable items={topMedicinesData.items} />
                  : <EmptyState message="No sales data found" />
              )}

              {activeTab === 'inventory' && (
                <>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">Filter by stock:</span>
                    {(['all', 'low', 'normal'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setStockStatusFilter(s)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          stockStatusFilter === s
                            ? 'bg-[#024ad8] text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                  {inventoryData
                    ? <InventoryReportTable items={inventoryData.items} />
                    : <EmptyState message="No inventory data found" />
                  }
                </>
              )}
            </>
          )}
        </main>
      </div>
    </RouteGuard>
  );
}
