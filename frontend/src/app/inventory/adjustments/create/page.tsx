'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function CreateInventoryAdjustmentPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    storeId: '1', // Hardcoded to store 1 for MVP
    reason: '',
    note: '',
  });

  const [formLoading, setFormLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // PAC-378: Add required reason validation in UI
    if (!formData.reason) {
      setErrorAlert('Vui lòng chọn lý do kiểm kho');
      return;
    }
    if (formData.reason === 'Khác' && !formData.note.trim()) {
      setErrorAlert('Vui lòng nhập ghi chú khi chọn lý do "Khác"');
      return;
    }

    try {
      setFormLoading(true);
      setErrorAlert(null);
      
      const payload = {
        storeId: parseInt(formData.storeId),
        reason: formData.reason,
        note: formData.note,
        lines: [],
      };

      const res = await api.post('/inventory/adjustments', payload);
      
      router.push(`/inventory/adjustments/${res.data.id}`);
    } catch (err) {
      const error = err as ApiError;
      setErrorAlert(error.response?.data?.message || 'Đã xảy ra lỗi khi tạo phiếu kiểm kho');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <Sidebar currentPath="/inventory" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Link href="/inventory">
                <Button variant="outline" size="icon" type="button">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Tạo phiếu kiểm kho</h1>
                <p className="text-slate-500 mt-1">Khởi tạo phiếu kiểm kê và điều chỉnh kho</p>
              </div>
            </div>

            {errorAlert && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Lỗi</AlertTitle>
                <AlertDescription>{errorAlert}</AlertDescription>
              </Alert>
            )}

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-100 pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800">Thông tin chung</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Cửa hàng <span className="text-red-500">*</span></label>
                      <select 
                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-slate-100"
                        value={formData.storeId}
                        onChange={(e) => setFormData({ ...formData, storeId: e.target.value })}
                        required
                        disabled
                      >
                        <option value="1">Cửa hàng trung tâm (Mặc định)</option>
                      </select>
                      <p className="text-xs text-slate-500">MVP: Mặc định chọn cửa hàng chính</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Lý do kiểm kho</label>
                      <select 
                        className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        required
                      >
                        <option value="">-- Chọn lý do --</option>
                        <option value="Định kỳ">Kiểm kho định kỳ</option>
                        <option value="Đột xuất">Kiểm kho đột xuất</option>
                        <option value="Hư hỏng">Hàng hư hỏng/hết hạn</option>
                        <option value="Thất thoát">Mất mát/thất thoát</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Ghi chú</label>
                    <textarea 
                      className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Nhập ghi chú chi tiết..."
                      value={formData.note}
                      onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button 
                      type="submit" 
                      disabled={formLoading}
                      className="bg-primary hover:bg-primary/90 text-white"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Đang xử lý...
                        </>
                      ) : (
                        'Tạo phiếu kiểm kho (Bản nháp)'
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </RouteGuard>
  );
}
