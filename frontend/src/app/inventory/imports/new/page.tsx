'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Warehouse {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  name: string;
  code: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export default function CreateStockImportPage() {
  const { user } = useAuth();
  const router = useRouter();

  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    warehouseId: '',
    supplierId: '',
    notes: '',
  });

  const [formLoading, setFormLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [warehouseRes, supplierRes] = await Promise.all([
          api.get('/stock-imports/warehouses'),
          api.get('/stock-imports/suppliers/active'),
        ]);
        
        setWarehouses(warehouseRes.data);
        setSuppliers(supplierRes.data);
        
        if (warehouseRes.data.length > 0) {
          setFormData(prev => ({ ...prev, warehouseId: warehouseRes.data[0].id.toString() }));
        }
      } catch (err) {
        const error = err as ApiError;
        setErrorAlert(error.response?.data?.message || 'Lỗi khi tải dữ liệu khởi tạo');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.warehouseId || !formData.supplierId) {
      setErrorAlert('Vui lòng chọn Kho và Nhà cung cấp');
      return;
    }

    try {
      setFormLoading(true);
      setErrorAlert(null);
      
      const payload = {
        warehouseId: parseInt(formData.warehouseId),
        supplierId: parseInt(formData.supplierId),
        notes: formData.notes,
      };

      const res = await api.post('/stock-imports', payload);
      
      // Navigate to detail page after create
      router.push(`/inventory/imports/${res.data.id}`);
    } catch (err) {
      const error = err as ApiError;
      setErrorAlert(error.response?.data?.message || 'Đã xảy ra lỗi khi tạo phiếu nhập');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <Sidebar currentPath="/inventory/imports" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
              <Link href="/inventory">
                <Button variant="outline" size="icon" type="button">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Tạo phiếu nhập kho</h1>
                <p className="text-slate-500 mt-1">Khởi tạo phiếu nhập hàng mới từ nhà cung cấp</p>
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
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Kho nhập hàng <span className="text-red-500">*</span></label>
                        <select 
                          className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.warehouseId}
                          onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
                          required
                        >
                          <option value="" disabled>-- Chọn kho --</option>
                          {warehouses.map(w => (
                            <option key={w.id} value={w.id}>{w.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Nhà cung cấp <span className="text-red-500">*</span></label>
                        <select 
                          className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={formData.supplierId}
                          onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                          required
                        >
                          <option value="" disabled>-- Chọn nhà cung cấp --</option>
                          {suppliers.map(s => (
                            <option key={s.id} value={s.id}>[{s.code}] {s.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Ghi chú</label>
                      <textarea 
                        className="flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Nhập ghi chú hoặc thông tin tham chiếu..."
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button 
                        type="submit" 
                        disabled={formLoading || !formData.warehouseId || !formData.supplierId}
                        className="bg-primary hover:bg-primary/90 text-white"
                      >
                        {formLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Đang xử lý...
                          </>
                        ) : (
                          'Tạo phiếu nhập (Bản nháp)'
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </RouteGuard>
  );
}
