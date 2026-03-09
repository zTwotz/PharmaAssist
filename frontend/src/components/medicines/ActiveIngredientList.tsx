/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Plus,
  Edit,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface ActiveIngredient {
  id: number;
  code: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: string;
}

export function ActiveIngredientList() {
  const [ingredients, setIngredients] = useState<ActiveIngredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Alerts
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState<ActiveIngredient | null>(null);
  const [formLoading, setFormLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    status: 'ACTIVE',
  });

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset page on search change
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchIngredients = async () => {
    setLoading(true);
    setErrorAlert(null);
    try {
      const response = await api.get('/active-ingredients', {
        params: {
          page,
          limit,
          search: debouncedSearch,
          status: statusFilter,
        },
      });
      setIngredients(response.data.data || []);
      setTotal(response.data.total || 0);
      setTotalPages(response.data.totalPages || 1);
    } catch (err: any) {
      console.error('Failed to fetch active ingredients:', err);
      setErrorAlert(
        err.response?.data?.message || 'Không thể tải danh sách hoạt chất.',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIngredients();
  }, [page, limit, debouncedSearch, statusFilter]);

  const handleOpenAdd = () => {
    setEditingIngredient(null);
    setFormData({
      code: '',
      name: '',
      description: '',
      status: 'ACTIVE',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (ingredient: ActiveIngredient) => {
    setEditingIngredient(ingredient);
    setFormData({
      code: ingredient.code,
      name: ingredient.name,
      description: ingredient.description || '',
      status: ingredient.status,
    });
    setIsFormOpen(true);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setErrorAlert(null);
    setSuccessAlert(null);

    // Front-end Validation
    if (!formData.name.trim()) {
      setErrorAlert('Tên hoạt chất không được để trống.');
      setFormLoading(false);
      return;
    }

    try {
      if (editingIngredient) {
        await api.patch(`/active-ingredients/${editingIngredient.id}`, {
          name: formData.name,
          description: formData.description,
          status: formData.status,
        });
        setSuccessAlert(`Đã cập nhật hoạt chất "${formData.name}" thành công.`);
      } else {
        await api.post('/active-ingredients', {
          code: formData.code.trim() || undefined,
          name: formData.name,
          description: formData.description,
        });
        setSuccessAlert(`Đã tạo hoạt chất mới "${formData.name}" thành công.`);
      }
      setIsFormOpen(false);
      fetchIngredients();
    } catch (err: any) {
      console.error('Submit form failed:', err);
      const msg =
        err.response?.data?.message || 'Đã xảy ra lỗi khi lưu hoạt chất.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {successAlert && (
        <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 relative rounded-xl">
          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          <AlertTitle className="font-semibold text-emerald-950">
            Thành công
          </AlertTitle>
          <AlertDescription className="text-xs font-medium">
            {successAlert}
          </AlertDescription>
          <button
            onClick={() => setSuccessAlert(null)}
            className="absolute top-3 right-3 text-emerald-600 hover:text-emerald-800"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      )}

      {errorAlert && (
        <Alert className="bg-rose-50 border-rose-200 text-rose-800 relative rounded-xl">
          <AlertTriangle className="h-5 w-5 text-rose-600" />
          <AlertTitle className="font-semibold text-rose-950">Lỗi</AlertTitle>
          <AlertDescription className="text-xs font-medium">
            {errorAlert}
          </AlertDescription>
          <button
            onClick={() => setErrorAlert(null)}
            className="absolute top-3 right-3 text-rose-600 hover:text-rose-800"
          >
            <X className="h-4 w-4" />
          </button>
        </Alert>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-hairline shadow-sm">
        <div className="flex flex-1 flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-graphite" />
            <Input
              placeholder="Tìm theo tên hoặc mã hoạt chất..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 border-hairline focus-visible:ring-primary rounded-lg text-xs"
            />
          </div>
          <Select
            value={statusFilter}
            onValueChange={(val) => setStatusFilter(val || 'ALL')}
          >
            <SelectTrigger className="w-[180px] h-10 border-hairline text-xs rounded-lg">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="ALL" className="text-xs">
                Tất cả trạng thái
              </SelectItem>
              <SelectItem value="ACTIVE" className="text-xs">
                Hoạt động (ACTIVE)
              </SelectItem>
              <SelectItem value="INACTIVE" className="text-xs">
                Vô hiệu hóa (INACTIVE)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleOpenAdd}
          className="bg-primary hover:bg-primary-deep text-white font-bold h-10 px-4 rounded-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98] text-xs"
        >
          <Plus className="h-4 w-4" />
          Thêm hoạt chất
        </Button>
      </div>

      {/* Main Table */}
      <Card className="bg-white border border-hairline rounded-xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-24 text-slate-500">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-sm font-medium">Đang tải danh sách hoạt chất...</p>
            </div>
          ) : ingredients.length === 0 ? (
            <div className="text-center p-20 text-slate-400">
              <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="font-semibold text-slate-600">
                Không tìm thấy hoạt chất nào
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Hãy thử tìm kiếm với từ khóa khác hoặc tạo mới hoạt chất.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-slate-50/75 border-b border-hairline">
                  <TableRow>
                    <TableHead className="w-[150px] font-bold text-slate-700 text-xs">
                      Mã hoạt chất
                    </TableHead>
                    <TableHead className="font-bold text-slate-700 text-xs">
                      Tên hoạt chất
                    </TableHead>
                    <TableHead className="font-bold text-slate-700 text-xs">
                      Mô tả
                    </TableHead>
                    <TableHead className="w-[150px] text-center font-bold text-slate-700 text-xs">
                      Trạng thái
                    </TableHead>
                    <TableHead className="w-[120px] text-right font-bold text-slate-700 pr-6 text-xs">
                      Thao tác
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ingredients.map((item) => (
                    <TableRow
                      key={item.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <TableCell className="font-mono text-xs text-slate-800">
                        {item.code}
                      </TableCell>
                      <TableCell className="font-bold text-primary-deep text-xs">
                        {item.name}
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 max-w-[300px] truncate">
                        {item.description || (
                          <span className="text-slate-400 italic">Không có mô tả</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          className={
                            item.status === 'ACTIVE'
                              ? 'bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-md px-2 py-0.5 text-[10px] font-bold'
                              : 'bg-slate-400 hover:bg-slate-500 text-white border-none rounded-md px-2 py-0.5 text-[10px] font-bold'
                          }
                        >
                          {item.status === 'ACTIVE' ? 'Hoạt động' : 'Tắt'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-6">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenEdit(item)}
                          className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-md"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>

        {/* Pagination */}
        {!loading && total > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-hairline bg-white gap-4">
            <span className="text-xs text-graphite font-medium">
              Hiển thị từ{' '}
              <strong>{(page - 1) * limit + 1}</strong> đến{' '}
              <strong>{Math.min(page * limit, total)}</strong> trong tổng số{' '}
              <strong>{total}</strong> hoạt chất
            </span>
            <div className="flex items-center space-x-2">
              <Select
                value={limit.toString()}
                onValueChange={(val) => {
                  setLimit(parseInt(val || '', 10));
                  setPage(1);
                }}
              >
                <SelectTrigger className="w-[100px] h-8 text-[11px] border-hairline rounded-md">
                  <SelectValue placeholder="Số hàng" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="5" className="text-xs">
                    5 / trang
                  </SelectItem>
                  <SelectItem value="10" className="text-xs">
                    10 / trang
                  </SelectItem>
                  <SelectItem value="20" className="text-xs">
                    20 / trang
                  </SelectItem>
                  <SelectItem value="50" className="text-xs">
                    50 / trang
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-1.5">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="h-8 w-8 rounded-md border-hairline text-slate-600 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs font-bold px-3 py-1 bg-slate-100 text-slate-800 rounded-md border border-slate-200">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="h-8 w-8 rounded-md border-hairline text-slate-600 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white border border-hairline rounded-xl shadow-lg">
          <form onSubmit={handleFormSubmit}>
            <DialogHeader className="border-b border-hairline pb-4">
              <DialogTitle className="text-lg font-bold text-ink flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-primary" />
                {editingIngredient
                  ? 'Chỉnh sửa thông tin hoạt chất'
                  : 'Thêm hoạt chất mới'}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-6 font-sans">
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  Mã hoạt chất
                </label>
                <Input
                  name="code"
                  value={formData.code}
                  onChange={handleFormChange}
                  placeholder="Hệ thống tự tạo nếu để trống (ACT-...)"
                  disabled={!!editingIngredient || formLoading}
                  className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  Tên hoạt chất *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Ví dụ: Paracetamol"
                  disabled={formLoading}
                  className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">
                  Mô tả hoạt chất
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Nhập ghi chú hoặc mô tả về hoạt chất..."
                  disabled={formLoading}
                  rows={3}
                  className="w-full rounded-lg border border-hairline p-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary bg-white text-charcoal font-medium"
                />
              </div>

              {editingIngredient && (
                <div className="grid gap-1.5">
                  <label className="text-xs font-bold text-charcoal uppercase tracking-wider">
                    Trạng thái hoạt động
                  </label>
                  <Select
                    value={formData.status}
                    onValueChange={(val) =>
                      handleSelectChange('status', val || 'ACTIVE')
                    }
                    disabled={formLoading}
                  >
                    <SelectTrigger className="h-10 text-xs border-hairline rounded-lg bg-white">
                      <SelectValue placeholder="Chọn trạng thái" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="ACTIVE" className="text-xs">
                        Hoạt động (ACTIVE)
                      </SelectItem>
                      <SelectItem value="INACTIVE" className="text-xs">
                        Vô hiệu hóa (INACTIVE)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <DialogFooter className="border-t border-hairline pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
                disabled={formLoading}
                className="border-hairline text-xs font-bold h-10 px-5"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={formLoading}
                className="bg-primary hover:bg-primary-deep text-white font-bold h-10 px-5 rounded-lg text-xs"
              >
                {formLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                ) : null}
                Lưu lại
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
