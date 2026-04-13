'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { RouteGuard } from '@/components/route-guard';
import { Sidebar } from '@/components/sidebar';
import api from '@/lib/api';
import RevenueMetrics from '@/components/reports/RevenueMetrics';
import ReportFilters from '@/components/reports/ReportFilters';

interface RevenueData {
  totalRevenue: number;
  totalCogs: number;
  grossProfit: number;
  orderCount: number;
}

export default function ReportsPage() {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<RevenueData | null>(null);
  
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: ''
  });

  const fetchRevenueReport = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/reports/revenue', { params: filters });
      setData(response.data);
    } catch (error) {
      window.alert('Failed to load revenue report.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRevenueReport();
  }, [fetchRevenueReport]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    fetchRevenueReport();
  };

  return (
    <RouteGuard allowedRoles={['ADMIN', 'MANAGER']}>
      <div className="flex h-screen bg-[#f8fafc]">
        <Sidebar currentPath="/dashboard/reports" />
        <main className="flex-1 overflow-y-auto p-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Revenue Reports</h1>
            <p className="text-gray-500 mt-1">Analyze your sales, COGS, and profit margins over time.</p>
          </div>

          <ReportFilters 
            startDate={filters.startDate}
            endDate={filters.endDate}
            status={filters.status}
            onFilterChange={handleFilterChange}
            onApply={handleApplyFilters}
          />

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#024ad8]"></div>
            </div>
          ) : data ? (
            <RevenueMetrics 
              totalRevenue={data.totalRevenue}
              totalCogs={data.totalCogs}
              grossProfit={data.grossProfit}
              orderCount={data.orderCount}
            />
          ) : null}
          
        </main>
      </div>
    </RouteGuard>
  );
}
