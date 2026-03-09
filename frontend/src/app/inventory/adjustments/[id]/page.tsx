'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, AlertTriangle, ArrowLeft, Plus } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface Medicine {
  id: number;
  name: string;
  code: string;
}

interface MedicineBatch {
  id: number;
  batchNumber: string;
  quantity: number;
  expiryDate: string;
}

export default function InventoryAdjustmentDetailPage({ params }: { params: { id: string } }) {
  const [adjustment, setAdjustment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  // Line form
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [selectedMedicineId, setSelectedMedicineId] = useState('');
  const [batches, setBatches] = useState<MedicineBatch[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [actualQty, setActualQty] = useState('');
  const [lineLoading, setLineLoading] = useState(false);

  const fetchAdjustment = async () => {
    try {
      const res = await api.get(`/inventory/adjustments/${params.id}`);
      setAdjustment(res.data);
    } catch (err: any) {
      setErrorAlert(err.response?.data?.message || 'Không tìm thấy phiếu kiểm kho');
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      await fetchAdjustment();
      
      try {
        const medRes = await api.get('/medicines?page=1&limit=1000');
        setMedicines(medRes.data.data || []);
      } catch (err) {
        console.error('Lỗi khi tải thuốc', err);
      }
      
      setLoading(false);
    };
    fetchInitialData();
  }, [params.id]);

  useEffect(() => {
    const fetchBatches = async () => {
      if (!selectedMedicineId) {
        setBatches([]);
        setSelectedBatchId('');
        return;
      }
      try {
        const res = await api.get(`/medicine-batches/medicine/${selectedMedicineId}`);
        setBatches(res.data);
      } catch (err) {
        console.error('Lỗi khi tải lô thuốc', err);
      }
    };
    fetchBatches();
  }, [selectedMedicineId]);

  const handleAddLine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedicineId || !selectedBatchId || !actualQty) {
      setErrorAlert('Vui lòng điền đầy đủ thông tin dòng kiểm kho');
      return;
    }

    const batch = batches.find(b => b.id === parseInt(selectedBatchId));
    if (!batch) return;

    try {
      setLineLoading(true);
      setErrorAlert(null);
      await api.post(`/inventory/adjustments/${params.id}/lines`, {
        medicineId: parseInt(selectedMedicineId),
        medicineBatchId: parseInt(selectedBatchId),
        expectedQuantity: batch.quantity,
        actualQuantity: parseInt(actualQty)
      });
      
      // Reset form
      setSelectedMedicineId('');
      setSelectedBatchId('');
      setActualQty('');
      setBatches([]);
      
      // Refresh adjustment
      await fetchAdjustment();
    } catch (err: any) {
      setErrorAlert(err.response?.data?.message || 'Lỗi khi thêm dòng kiểm kho');
    } finally {
      setLineLoading(false);
    }
  };

  if (loading) {
    return (
      <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
          <Sidebar currentPath="/inventory" />
          <main className="flex-1 p-8 flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </main>
        </div>
      </RouteGuard>
    );
  }

  const handleConfirm = async () => {
    if (!confirm('Bạn có chắc chắn muốn hoàn tất phiếu kiểm kho này? Kho sẽ được cập nhật và không thể thay đổi sau khi hoàn tất.')) {
      return;
    }
    
    try {
      setErrorAlert(null);
      await api.post(`/inventory/adjustments/${params.id}/confirm`);
      await fetchAdjustment();
      alert('Đã hoàn tất phiếu kiểm kho thành công');
    } catch (err: any) {
      setErrorAlert(err.response?.data?.message || 'Lỗi khi hoàn tất phiếu kiểm kho');
    }
  };

  if (!adjustment) return null;

  const isDraft = adjustment.status === 'DRAFT';

  return (
    <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <Sidebar currentPath="/inventory" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link href="/inventory">
                  <Button variant="outline" size="icon" type="button">
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Phiếu kiểm kho: {adjustment.code}
                  </h1>
                  <p className="text-slate-500 mt-1">Trạng thái: {adjustment.status}</p>
                </div>
              </div>
              
              {isDraft && (
                <Button onClick={handleConfirm} className="bg-primary text-white">
                  Hoàn tất kiểm kho
                </Button>
              )}
            </div>

            {errorAlert && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Lỗi</AlertTitle>
                <AlertDescription>{errorAlert}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 shadow-sm border-slate-200">
                <CardHeader className="bg-white border-b border-slate-100">
                  <CardTitle className="text-base">Thông tin chung</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4 text-sm">
                  <div>
                    <span className="text-slate-500">Cửa hàng:</span>
                    <div className="font-medium">{adjustment.store?.name || 'Mặc định'}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Người tạo:</span>
                    <div className="font-medium">{adjustment.createdBy?.fullName || 'N/A'}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Ngày tạo:</span>
                    <div className="font-medium">{format(new Date(adjustment.createdAt), 'dd/MM/yyyy HH:mm')}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Lý do:</span>
                    <div className="font-medium">{adjustment.reason || 'Không có'}</div>
                  </div>
                  {adjustment.note && (
                    <div>
                      <span className="text-slate-500">Ghi chú:</span>
                      <div className="font-medium">{adjustment.note}</div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="md:col-span-2 space-y-6">
                <Card className="shadow-sm border-slate-200">
                  <CardHeader className="bg-white border-b border-slate-100 flex flex-row items-center justify-between">
                    <CardTitle className="text-base">Chi tiết kiểm kê</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <tr>
                          <th className="px-4 py-3 font-medium">Thuốc</th>
                          <th className="px-4 py-3 font-medium">Lô</th>
                          <th className="px-4 py-3 font-medium text-right">Tồn lý thuyết</th>
                          <th className="px-4 py-3 font-medium text-right">Tồn thực tế</th>
                          <th className="px-4 py-3 font-medium text-center">Phân loại</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {adjustment.lines?.map((line: any) => (
                          <tr key={line.id} className="hover:bg-slate-50/50">
                            <td className="px-4 py-3">
                              <div className="font-medium text-slate-900">{line.medicine?.name}</div>
                            </td>
                            <td className="px-4 py-3">{line.medicineBatch?.batchNumber}</td>
                            <td className="px-4 py-3 text-right">{line.expectedQuantity}</td>
                            <td className="px-4 py-3 text-right font-medium">{line.actualQuantity}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                line.adjustmentType === 'INCREASE' ? 'bg-green-100 text-green-700' :
                                line.adjustmentType === 'DECREASE' ? 'bg-red-100 text-red-700' :
                                'bg-slate-100 text-slate-700'
                              }`}>
                                {line.adjustmentType}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {(!adjustment.lines || adjustment.lines.length === 0) && (
                          <tr>
                            <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                              Chưa có thuốc nào được kiểm kê
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>

                {isDraft && (
                  <Card className="shadow-sm border-slate-200">
                    <CardHeader className="bg-white border-b border-slate-100">
                      <CardTitle className="text-base">Thêm thuốc kiểm kê</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <form onSubmit={handleAddLine} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-xs font-medium text-slate-700">Thuốc</label>
                          <select 
                            className="flex h-9 w-full rounded-md border border-slate-200 px-3 py-1 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                            value={selectedMedicineId}
                            onChange={(e) => setSelectedMedicineId(e.target.value)}
                            required
                          >
                            <option value="">-- Chọn thuốc --</option>
                            {medicines.map(m => (
                              <option key={m.id} value={m.id}>{m.name} ({m.code})</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-700">Lô thuốc</label>
                          <select 
                            className="flex h-9 w-full rounded-md border border-slate-200 px-3 py-1 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                            value={selectedBatchId}
                            onChange={(e) => setSelectedBatchId(e.target.value)}
                            required
                            disabled={!selectedMedicineId}
                          >
                            <option value="">-- Chọn lô --</option>
                            {batches.map(b => (
                              <option key={b.id} value={b.id}>{b.batchNumber} (Tồn: {b.quantity})</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-700">Thực tế</label>
                          <input 
                            type="number"
                            min="0"
                            className="flex h-9 w-full rounded-md border border-slate-200 px-3 py-1 text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                            value={actualQty}
                            onChange={(e) => setActualQty(e.target.value)}
                            required
                          />
                        </div>
                        <div className="md:col-span-4 flex justify-end mt-2">
                          <Button type="submit" disabled={lineLoading || !selectedBatchId} size="sm">
                            {lineLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                            Thêm vào phiếu
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </RouteGuard>
  );
}
