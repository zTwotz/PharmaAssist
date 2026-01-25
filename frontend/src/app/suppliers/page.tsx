'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
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
import { Search, Plus, Edit, Trash2, Loader2, AlertTriangle, CheckCircle2, X, User, Shield, Truck } from 'lucide-react';

interface Supplier {
  id: number;
  code: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  taxCode: string | null;
  status: string;
  createdAt: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
}

export default function SuppliersPage() {
  const { user } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Alerts
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(null);
  const [supplierToDeactivate, setSupplierToDeactivate] = useState<Supplier | null>(null);

  // Form states
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    phone: '',
    email: '',
    address: '',
    taxCode: '',
    status: 'ACTIVE',
  });

  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : 'Thủ kho / Nhân viên kho';

  const fetchSuppliers = async () => {
    setLoading(true);
    setErrorAlert(null);
    try {
      const response = await api.get('/suppliers');
      setSuppliers(response.data);
    } catch (err: unknown) {
      console.error('Failed to fetch suppliers:', err);
      const apiError = err as ApiError;
      const msg = apiError.response?.data?.message || 'Không thể tải danh sách nhà cung cấp.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSuppliers();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenAdd = () => {
    setEditingSupplier(null);
    setFormData({
      code: '',
      name: '',
      phone: '',
      email: '',
      address: '',
      taxCode: '',
      status: 'ACTIVE',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      code: supplier.code,
      name: supplier.name,
      phone: supplier.phone || '',
      email: supplier.email || '',
      address: supplier.address || '',
      taxCode: supplier.taxCode || '',
      status: supplier.status,
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (supplier: Supplier) => {
    setSupplierToDelete(supplier);
    setIsDeleteOpen(true);
  };

  const handleOpenDeactivate = (supplier: Supplier) => {
    setSupplierToDeactivate(supplier);
    setIsDeactivateOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const payload = {
      ...formData,
      code: formData.code.trim() || undefined,
      phone: formData.phone.trim() || undefined,
      email: formData.email.trim() || undefined,
      address: formData.address.trim() || undefined,
      taxCode: formData.taxCode.trim() || undefined,
    };

    try {
      if (editingSupplier) {
        await api.patch(`/suppliers/${editingSupplier.id}`, payload);
        setSuccessAlert(`Đã cập nhật nhà cung cấp "${formData.name}" thành công.`);
      } else {
        await api.post('/suppliers', payload);
        setSuccessAlert(`Đã thêm nhà cung cấp "${formData.name}" thành công.`);
      }
      setIsFormOpen(false);
      fetchSuppliers();
    } catch (err: unknown) {
      console.error('Submit supplier failed:', err);
      const apiError = err as ApiError;
      const msg = apiError.response?.data?.message || 'Đã xảy ra lỗi khi lưu nhà cung cấp.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!supplierToDelete) return;
    setFormLoading(true);
    setErrorAlert(null);
    setSuccessAlert(null);

    try {
      await api.delete(`/suppliers/${supplierToDelete.id}`);
      setSuccessAlert(`Đã xóa nhà cung cấp "${supplierToDelete.name}" thành công.`);
      setIsDeleteOpen(false);
      fetchSuppliers();
    } catch (err: unknown) {
      console.error('Delete supplier failed:', err);
      const apiError = err as ApiError;
      const msg = apiError.response?.data?.message || 'Đã xảy ra lỗi khi xóa nhà cung cấp.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
      setIsDeleteOpen(false);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeactivateSubmit = async () => {
    if (!supplierToDeactivate) return;
    setFormLoading(true);
    setErrorAlert(null);
    setSuccessAlert(null);

    try {
      await api.patch(`/suppliers/${supplierToDeactivate.id}/deactivate`);
      setSuccessAlert(`Đã ngưng hoạt động nhà cung cấp "${supplierToDeactivate.name}" thành công.`);
      setIsDeactivateOpen(false);
      fetchSuppliers();
    } catch (err: unknown) {
      console.error('Deactivate supplier failed:', err);
      const apiError = err as ApiError;
      const msg = apiError.response?.data?.message || 'Đã xảy ra lỗi khi ngưng hoạt động nhà cung cấp.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
      setIsDeactivateOpen(false);
    } finally {
      setFormLoading(false);
    }
  };

  // Filters
  const filteredSuppliers = suppliers.filter((supp) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      supp.name.toLowerCase().includes(query) ||
      supp.code.toLowerCase().includes(query) ||
      (supp.phone && supp.phone.includes(query)) ||
      (supp.email && supp.email.toLowerCase().includes(query)) ||
      (supp.taxCode && supp.taxCode.includes(query));
    
    const matchesStatus =
      statusFilter === 'ALL' || supp.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        {/* Sidebar */}
        <Sidebar currentPath="/suppliers" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-3">
              <Truck className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-bold text-ink uppercase tracking-wider">
                Quản lý Nhà cung cấp
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
            {/* Alerts */}
            {successAlert && (
              <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <AlertTitle className="font-semibold text-emerald-950">Thành công</AlertTitle>
                <AlertDescription>{successAlert}</AlertDescription>
                <button onClick={() => setSuccessAlert(null)} className="absolute top-2 right-2 text-emerald-600 hover:text-emerald-800">
                  <X className="h-4 w-4" />
                </button>
              </Alert>
            )}

            {errorAlert && (
              <Alert className="bg-rose-50 border-rose-200 text-rose-800">
                <AlertTriangle className="h-5 w-5 text-rose-600" />
                <AlertTitle className="font-semibold text-rose-950">Lỗi</AlertTitle>
                <AlertDescription>{errorAlert}</AlertDescription>
                <button onClick={() => setErrorAlert(null)} className="absolute top-2 right-2 text-rose-600 hover:text-rose-800">
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
                    placeholder="Tìm tên, SĐT, mã số thuế hoặc mã nhà cung cấp..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 border-hairline focus-visible:ring-primary"
                  />
                </div>
                <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || 'ALL')}>
                  <SelectTrigger className="w-[180px] h-10 border-hairline bg-white">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="ALL">Tất cả trạng thái</SelectItem>
                    <SelectItem value="ACTIVE">Hoạt động (ACTIVE)</SelectItem>
                    <SelectItem value="INACTIVE">Vô hiệu hóa (INACTIVE)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleOpenAdd}
                className="bg-primary hover:bg-primary-deep text-white font-bold h-10 px-4 rounded-lg flex items-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" />
                Thêm nhà cung cấp
              </Button>
            </div>

            {/* Suppliers Table */}
            <Card className="bg-white border border-hairline rounded-xl shadow-sm overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-24 text-slate-500">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                    <p className="text-sm font-medium">Đang tải danh sách nhà cung cấp...</p>
                  </div>
                ) : filteredSuppliers.length === 0 ? (
                  <div className="text-center p-20 text-slate-400">
                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                      <Truck className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="font-semibold text-slate-600">Không tìm thấy nhà cung cấp nào</p>
                    <p className="text-sm text-slate-400 mt-1">Nhập từ khóa khác hoặc tạo mới nhà cung cấp.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader className="bg-slate-50/75 border-b border-hairline">
                      <TableRow>
                        <TableHead className="w-[150px] font-bold text-slate-700">Mã nhà cung cấp</TableHead>
                        <TableHead className="font-bold text-slate-700">Tên nhà cung cấp</TableHead>
                        <TableHead className="font-bold text-slate-700">Số điện thoại</TableHead>
                        <TableHead className="font-bold text-slate-700">Email</TableHead>
                        <TableHead className="font-bold text-slate-700">Địa chỉ</TableHead>
                        <TableHead className="w-[120px] font-bold text-slate-700">Mã số thuế</TableHead>
                        <TableHead className="w-[120px] text-center font-bold text-slate-700">Trạng thái</TableHead>
                        <TableHead className="w-[120px] text-right font-bold text-slate-700 pr-6">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSuppliers.map((supp) => (
                        <TableRow key={supp.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="font-medium text-slate-800">{supp.code}</TableCell>
                          <TableCell className="font-semibold text-primary-deep">{supp.name}</TableCell>
                          <TableCell className="text-slate-600 font-mono text-xs">{supp.phone || '-'}</TableCell>
                          <TableCell className="text-slate-600 text-xs">{supp.email || '-'}</TableCell>
                          <TableCell className="text-slate-600 text-xs truncate max-w-[200px]" title={supp.address || ''}>
                            {supp.address || '-'}
                          </TableCell>
                          <TableCell className="text-slate-600 font-mono text-xs">{supp.taxCode || '-'}</TableCell>
                          <TableCell className="text-center">
                            <Badge className={supp.status === 'ACTIVE' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-slate-400 hover:bg-slate-500 text-white'}>
                              {supp.status === 'ACTIVE' ? 'Hoạt động' : 'Tắt'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-6 space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenEdit(supp)}
                              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-md"
                              title="Chỉnh sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {user?.roles?.includes('ADMIN') && (
                              <>
                                {supp.status === 'ACTIVE' && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleOpenDeactivate(supp)}
                                    className="h-8 w-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50/50 rounded-md"
                                    title="Ngưng hoạt động"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleOpenDelete(supp)}
                                  className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50/50 rounded-md"
                                  title="Xóa"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Add / Edit Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[450px] bg-white border border-hairline rounded-xl shadow-lg">
          <form onSubmit={handleFormSubmit}>
            <DialogHeader className="border-b border-hairline pb-4">
              <DialogTitle className="text-xl font-bold text-ink">
                {editingSupplier ? 'Chỉnh sửa nhà cung cấp' : 'Thêm nhà cung cấp mới'}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-6 font-sans">
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Mã nhà cung cấp</label>
                <Input
                  name="code"
                  value={formData.code}
                  onChange={handleFormChange}
                  placeholder="Để trống để tự sinh mã (VD: SUPP-xxx)"
                  disabled={formLoading}
                  className="border-hairline focus-visible:ring-primary"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Tên nhà cung cấp *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  placeholder="Ví dụ: Công ty Dược phẩm TW1"
                  disabled={formLoading}
                  className="border-hairline focus-visible:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Số điện thoại</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    placeholder="Ví dụ: 0243123456"
                    disabled={formLoading}
                    className="border-hairline focus-visible:ring-primary font-mono"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Mã số thuế</label>
                  <Input
                    name="taxCode"
                    value={formData.taxCode}
                    onChange={handleFormChange}
                    placeholder="Ví dụ: 0101234567"
                    disabled={formLoading}
                    className="border-hairline focus-visible:ring-primary font-mono"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Ví dụ: contact@duoctw1.com"
                  disabled={formLoading}
                  className="border-hairline focus-visible:ring-primary"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Địa chỉ</label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="Ví dụ: 120 Hai Bà Trưng, Hoàn Kiếm, Hà Nội"
                  disabled={formLoading}
                  className="border-hairline focus-visible:ring-primary"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Trạng thái</label>
                <Select
                  value={formData.status}
                  onValueChange={(val) => handleSelectChange('status', val || 'ACTIVE')}
                  disabled={formLoading}
                >
                  <SelectTrigger className="w-full border-hairline bg-white">
                    <SelectValue placeholder="Trạng thái" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="ACTIVE">Hoạt động (ACTIVE)</SelectItem>
                    <SelectItem value="INACTIVE">Vô hiệu hóa (INACTIVE)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter className="border-t border-hairline pt-4">
              <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} disabled={formLoading}>
                Hủy
              </Button>
              <Button type="submit" disabled={formLoading} className="bg-primary hover:bg-primary-deep text-white font-bold">
                {formLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
                Lưu lại
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white border border-hairline rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-rose-600 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-rose-500" />
              Xác nhận xóa nhà cung cấp
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 text-slate-600 text-sm leading-relaxed">
            Bạn có chắc chắn muốn xóa nhà cung cấp <span className="font-bold text-ink">&quot;{supplierToDelete?.name}&quot;</span> (Mã: {supplierToDelete?.code})?
            <p className="mt-2 text-rose-500 font-semibold text-xs bg-rose-50 p-2.5 rounded-lg border border-rose-100">
              * Hành động này sẽ xóa vĩnh viễn nhà cung cấp. Chỉ có thể thực hiện nếu nhà cung cấp chưa phát sinh lịch sử đặt hàng hoặc nhập kho.
            </p>
          </div>

          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={formLoading}>
              Hủy
            </Button>
            <Button onClick={handleDeleteSubmit} disabled={formLoading} className="bg-rose-600 hover:bg-rose-700 text-white font-bold">
              {formLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Đồng ý xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Deactivate Confirm Dialog */}
      <Dialog open={isDeactivateOpen} onOpenChange={setIsDeactivateOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white border border-hairline rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-amber-600 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              Ngưng hoạt động nhà cung cấp
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 text-slate-600 text-sm leading-relaxed font-sans">
            Bạn có chắc chắn muốn ngưng hoạt động nhà cung cấp <span className="font-bold text-ink">&quot;{supplierToDeactivate?.name}&quot;</span> (Mã: {supplierToDeactivate?.code})?
            <p className="mt-2 text-amber-600 font-semibold text-xs bg-amber-50 p-2.5 rounded-lg border border-amber-100">
              * Khi ngưng hoạt động, nhà cung cấp này sẽ không hiển thị trong danh sách lựa chọn cho các phiếu Nhập kho mới nhưng lịch sử nhập kho cũ vẫn được bảo toàn.
            </p>
          </div>

          <DialogFooter className="pt-2">
            <Button variant="outline" onClick={() => setIsDeactivateOpen(false)} disabled={formLoading}>
              Hủy
            </Button>
            <Button onClick={handleDeactivateSubmit} disabled={formLoading} className="bg-amber-600 hover:bg-amber-700 text-white font-bold">
              {formLoading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : null}
              Xác nhận ngưng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RouteGuard>
  );
}
