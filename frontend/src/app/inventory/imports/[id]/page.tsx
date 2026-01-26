'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

interface Medicine {
  id: number;
  name: string;
  registrationNumber: string;
}

interface StockImportDetail {
  id: number;
  medicineId: number;
  batchNumber: string;
  quantity: number;
  importPrice: string;
  expiryDate: string;
  lineTotal: string;
  medicine: Medicine;
}

interface StockImport {
  id: number;
  code: string;
  supplier: { name: string };
  warehouse: { name: string };
  createdBy: string;
  importDate: string;
  status: string;
  totalAmount: string;
  details: StockImportDetail[];
}

export default function StockImportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [stockImport, setStockImport] = useState<StockImport | null>(null);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Form state
  const [medicineId, setMedicineId] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [importPrice, setImportPrice] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Edit state
  const [editingLineId, setEditingLineId] = useState<number | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [importRes, medRes] = await Promise.all([
        api.get(`/stock-imports/${id}`),
        api.get('/medicines?page=1&limit=1000')
      ]);
      setStockImport(importRes.data);
      setMedicines(medRes.data.data || []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Không thể tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchData();
  }, [id]);

  const handleAddLine = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      setSubmitting(true);
      if (editingLineId) {
        await api.put(`/stock-imports/${id}/lines/${editingLineId}`, {
          medicineId: Number(medicineId),
          batchNumber,
          quantity: Number(quantity),
          importPrice: Number(importPrice),
          expiryDate,
        });
      } else {
        await api.post(`/stock-imports/${id}/lines`, {
          medicineId: Number(medicineId),
          batchNumber,
          quantity: Number(quantity),
          importPrice: Number(importPrice),
          expiryDate,
        });
      }
      
      // Reset form
      setMedicineId('');
      setBatchNumber('');
      setQuantity('');
      setImportPrice('');
      setExpiryDate('');
      setEditingLineId(null);
      
      await fetchData();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi lưu sản phẩm');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (line: StockImportDetail) => {
    setEditingLineId(line.id);
    setMedicineId(String(line.medicineId));
    setBatchNumber(line.batchNumber);
    setQuantity(String(line.quantity));
    setImportPrice(line.importPrice);
    setExpiryDate(line.expiryDate.split('T')[0]);
  };

  const handleDelete = async (lineId: number) => {
    if (!confirm('Bạn có chắc chắn muốn xoá sản phẩm này khỏi phiếu nhập?')) return;
    try {
      await api.delete(`/stock-imports/${id}/lines/${lineId}`);
      await fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Xóa thất bại');
    }
  };

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!stockImport) return <div className="p-6 text-red-500">{error || 'Không tìm thấy phiếu nhập'}</div>;

  return (
    <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        <Sidebar currentPath="/inventory/imports" />
        
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Chi Tiết Phiếu Nhập</h1>
        <button onClick={() => router.push('/inventory/imports')} className="text-blue-600 hover:underline">
          &larr; Quay lại danh sách
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Mã Phiếu</p>
          <p className="font-semibold">{stockImport.code}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Trạng Thái</p>
          <span className={`px-2 py-1 text-xs rounded-full font-medium ${stockImport.status === 'DRAFT' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
            {stockImport.status}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Nhà Cung Cấp</p>
          <p className="font-medium">{stockImport.supplier?.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Kho Hàng</p>
          <p className="font-medium">{stockImport.warehouse?.name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Người Tạo</p>
          <p className="font-medium">{stockImport.createdBy}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Tổng Tiền</p>
          <p className="font-bold text-blue-600">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(stockImport.totalAmount))}
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {stockImport.status === 'DRAFT' && (
        <form onSubmit={handleAddLine} className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingLineId ? 'Cập Nhật Sản Phẩm' : 'Thêm Sản Phẩm'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Thuốc</label>
              <select
                required
                disabled={!!editingLineId}
                value={medicineId}
                onChange={(e) => setMedicineId(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 disabled:bg-gray-200 p-2 border"
              >
                <option value="">Chọn thuốc...</option>
                {medicines.map((m) => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số Lô</label>
              <input
                type="text"
                required
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
                placeholder="VD: L001"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hạn Sử Dụng</label>
              <input
                type="date"
                required
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Số Lượng</label>
              <input
                type="number"
                min="1"
                required
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá Nhập (VNĐ)</label>
              <input
                type="number"
                min="0"
                required
                value={importPrice}
                onChange={(e) => setImportPrice(e.target.value)}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border"
              />
            </div>

            <div className="flex items-end space-x-2">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:bg-blue-300"
              >
                {submitting ? 'Đang lưu...' : (editingLineId ? 'Cập Nhật' : 'Thêm Vào Phiếu')}
              </button>
              {editingLineId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingLineId(null);
                    setMedicineId('');
                    setBatchNumber('');
                    setQuantity('');
                    setImportPrice('');
                    setExpiryDate('');
                  }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Hủy
                </button>
              )}
            </div>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thuốc</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lô / HSD</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">SL</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Đơn Giá</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Thành Tiền</th>
              {stockImport.status === 'DRAFT' && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Hành động</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stockImport.details.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  Chưa có sản phẩm nào trong phiếu nhập.
                </td>
              </tr>
            ) : (
              stockImport.details.map((line) => (
                <tr key={line.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{line.medicine?.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{line.batchNumber}</div>
                    <div className="text-xs text-gray-500">{new Date(line.expiryDate).toLocaleDateString('vi-VN')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {line.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {new Intl.NumberFormat('vi-VN').format(Number(line.importPrice))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-blue-600">
                    {new Intl.NumberFormat('vi-VN').format(Number(line.lineTotal))}
                  </td>
                  {stockImport.status === 'DRAFT' && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleEdit(line)} className="text-amber-600 hover:text-amber-900 mr-4">Sửa</button>
                      <button onClick={() => handleDelete(line.id)} className="text-red-600 hover:text-red-900">Xóa</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
          </div>
        </main>
      </div>
    </RouteGuard>
  );
}
