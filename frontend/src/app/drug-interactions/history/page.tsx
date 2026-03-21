'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import { ShieldAlert, AlertTriangle, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import api from '@/lib/api';
import { format } from 'date-fns';

interface InteractionAlertHistory {
  id: number;
  severity: string;
  displayCount: number;
  lastDisplayedAt: string | null;
  isAcknowledged: boolean;
  acknowledgedBy: string | null;
  acknowledgedAt: string | null;
  consultationNote: string | null;
  createdAt: string;
  order: {
    id: number;
    code: string;
    status: string;
    customer: {
      fullName: string;
      phone: string;
    } | null;
  };
  interaction: {
    code: string;
    description: string;
    activeIngredientA: { name: string };
    activeIngredientB: { name: string };
  };
}

export default function InteractionAlertHistoryPage() {
  const { hasRole } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState<InteractionAlertHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hasRole(['ADMIN'])) {
      router.push('/dashboard');
      return;
    }
    fetchHistory();
  }, [hasRole, router]);

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/interactions/alerts/history');
      setHistory(res.data);
    } catch (error) {
      console.error(error);
      alert('Lỗi khi tải lịch sử cảnh báo');
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
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lịch sử cảnh báo tương tác</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý lịch sử hiển thị và ghi đè cảnh báo tương tác</p>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-4 py-3">Đơn hàng</th>
                <th scope="col" className="px-4 py-3">Cảnh báo</th>
                <th scope="col" className="px-4 py-3">Mức độ</th>
                <th scope="col" className="px-4 py-3 text-center">Lần hiển thị</th>
                <th scope="col" className="px-4 py-3">Trạng thái ghi đè</th>
                <th scope="col" className="px-4 py-3">Ghi chú tư vấn</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : history.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Chưa có dữ liệu lịch sử cảnh báo
                  </td>
                </tr>
              ) : (
                history.map((alert) => (
                  <tr key={alert.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{alert.order?.code}</div>
                      <div className="text-xs text-gray-500">{format(new Date(alert.createdAt), 'dd/MM/yyyy HH:mm')}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{alert.interaction?.code}</div>
                      <div className="text-xs text-gray-500 truncate max-w-[200px]" title={alert.interaction?.description}>
                        {alert.interaction?.description}
                      </div>
                    </td>
                    <td className="px-4 py-4">{getSeverityBadge(alert.severity)}</td>
                    <td className="px-4 py-4 text-center font-medium">
                      {alert.displayCount}
                    </td>
                    <td className="px-4 py-4">
                      {alert.isAcknowledged ? (
                        <div>
                          <span className="inline-flex items-center text-xs text-green-600 font-medium">
                            <CheckCircle className="w-3 h-3 mr-1" /> Đã ghi đè
                          </span>
                          {alert.acknowledgedAt && (
                            <div className="text-[10px] text-gray-500 mt-1">
                              {format(new Date(alert.acknowledgedAt), 'dd/MM HH:mm')}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <Clock className="w-3 h-3 mr-1" /> Chưa xử lý
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {alert.consultationNote ? (
                        <div className="text-sm text-gray-700 italic max-w-xs truncate" title={alert.consultationNote}>
                          &quot;{alert.consultationNote}&quot;
                        </div>
                      ) : (
                        <span className="text-gray-400 text-xs">-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
