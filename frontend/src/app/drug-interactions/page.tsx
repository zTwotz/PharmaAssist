'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Plus, ShieldAlert, AlertTriangle, AlertCircle, Clock } from 'lucide-react';
import api from '@/lib/api';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';

interface ActiveIngredient {
  id: number;
  name: string;
}

interface DrugInteraction {
  id: number;
  code: string;
  activeIngredientA: ActiveIngredient;
  activeIngredientB: ActiveIngredient;
  severity: string;
  description: string;
  recommendation: string;
}

export default function DrugInteractionsPage() {
  const { hasRole } = useAuth();
  const router = useRouter();
  const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hasRole(['ADMIN'])) {
      router.push('/dashboard');
      return;
    }
    fetchInteractions();
  }, [hasRole, router]);

  const fetchInteractions = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/interactions');
      setInteractions(res.data);
    } catch (error) {
      console.error(error);
      alert('Lỗi khi tải danh sách tương tác thuốc');
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity?.toUpperCase()) {
      case 'HIGH':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <ShieldAlert className="w-3 h-3 mr-1" /> Cao
          </span>
        );
      case 'MEDIUM':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <AlertTriangle className="w-3 h-3 mr-1" /> Trung bình
          </span>
        );
      case 'LOW':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <AlertCircle className="w-3 h-3 mr-1" /> Thấp
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {severity}
          </span>
        );
    }
  };

  return (
    <RouteGuard allowedPermissions={['MANAGE_DRUG_INTERACTIONS']}>
      <div className="flex min-h-screen bg-gray-50 font-sans">
        <Sidebar currentPath="/drug-interactions" />
        <div className="flex-1 overflow-x-hidden">
          <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Luật tương tác thuốc</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý các luật tương tác giữa các hoạt chất</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => router.push('/drug-interactions/history')} variant="outline" className="border-gray-300">
            <Clock className="w-4 h-4 mr-2" />
            Lịch sử cảnh báo
          </Button>
          <Button onClick={() => router.push('/drug-interactions/create')} className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Thêm luật mới
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4">Mã luật</th>
                <th scope="col" className="px-6 py-4">Hoạt chất A</th>
                <th scope="col" className="px-6 py-4">Hoạt chất B</th>
                <th scope="col" className="px-6 py-4">Mức độ</th>
                <th scope="col" className="px-6 py-4">Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : interactions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    Chưa có luật tương tác nào
                  </td>
                </tr>
              ) : (
                interactions.map((interaction) => (
                  <tr key={interaction.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{interaction.code}</td>
                    <td className="px-6 py-4">{interaction.activeIngredientA?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{interaction.activeIngredientB?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{getSeverityBadge(interaction.severity)}</td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs truncate" title={interaction.description}>
                        {interaction.description || 'Không có mô tả'}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
      </div>
    </RouteGuard>
  );
}
