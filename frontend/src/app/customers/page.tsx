'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
import { Search, Plus, Edit, Trash2, Loader2, AlertTriangle, CheckCircle2, X, User, Shield, Users } from 'lucide-react';

interface Customer {
  id: number;
  code: string;
  fullName: string;
  phone: string | null;
  email: string | null;
  gender: string | null;
  dateOfBirth: string | null;
  status: string;
  createdAt: string;
}

export default function CustomersPage() {
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Alerts
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  // Form states
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    fullName: '',
    phone: '',
    email: '',
    gender: 'MALE',
    dateOfBirth: '',
    status: 'ACTIVE',
  });

  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : 'Nhân viên bán hàng';

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    setErrorAlert(null);
    try {
      const response = await api.get('/customers');
      setCustomers(response.data);
    } catch (err: any) {
      console.error('Failed to fetch customers:', err);
      setErrorAlert(err.response?.data?.message || 'Không thể tải danh sách khách hàng.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setFormData({
      code: '',
      fullName: '',
      phone: '',
      email: '',
      gender: 'MALE',
      dateOfBirth: '',
      status: 'ACTIVE',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    
    let formattedDob = '';
    if (customer.dateOfBirth) {
      formattedDob = new Date(customer.dateOfBirth).toISOString().split('T')[0];
    }

    setFormData({
      code: customer.code,
      fullName: customer.fullName,
      phone: customer.phone || '',
      email: customer.email || '',
      gender: customer.gender || 'MALE',
      dateOfBirth: formattedDob,
      status: customer.status,
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (customer: Customer) => {
    setCustomerToDelete(customer);
    setIsDeleteOpen(true);
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
      dateOfBirth: formData.dateOfBirth || undefined,
    };

    try {
      if (editingCustomer) {
        await api.patch(`/customers/${editingCustomer.id}`, payload);
        setSuccessAlert(`Đã cập nhật khách hàng "${formData.fullName}" thành công.`);
      } else {
        await api.post('/customers', payload);
        setSuccessAlert(`Đã thêm khách hàng "${formData.fullName}" thành công.`);
      }
      setIsFormOpen(false);
      fetchCustomers();
    } catch (err: any) {
      console.error('Submit customer failed:', err);
      const msg = err.response?.data?.message || 'Đã xảy ra lỗi khi lưu khách hàng.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!customerToDelete) return;
    setFormLoading(true);
    setErrorAlert(null);
    setSuccessAlert(null);

    try {
      await api.delete(`/customers/${customerToDelete.id}`);
      setSuccessAlert(`Đã xóa khách hàng "${customerToDelete.fullName}" thành công.`);
      setIsDeleteOpen(false);
      fetchCustomers();
    } catch (err: any) {
      console.error('Delete customer failed:', err);
      const msg = err.response?.data?.message || 'Đã xảy ra lỗi khi xóa khách hàng.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
      setIsDeleteOpen(false);
    } finally {
      setFormLoading(false);
    }
  };

  // Filters
  const filteredCustomers = customers.filter((cust) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      cust.fullName.toLowerCase().includes(query) ||
      cust.code.toLowerCase().includes(query) ||
      (cust.phone && cust.phone.includes(query)) ||
      (cust.email && cust.email.toLowerCase().includes(query));
    
    const matchesStatus =
      statusFilter === 'ALL' || cust.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <RouteGuard allowedRoles={['ADMIN', 'STAFF']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        {/* Sidebar */}
        <Sidebar currentPath="/customers" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-bold text-ink uppercase tracking-wider">
                Quản lý Khách hàng
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
                    placeholder="Tìm tên, SĐT, email hoặc mã khách hàng..."
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
                Thêm khách hàng
              </Button>
            </div>

            {/* Customers Table */}
            <Card className="bg-white border border-hairline rounded-xl shadow-sm overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center p-24 text-slate-500">
                    <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                    <p className="text-sm font-medium">Đang tải danh sách khách hàng...</p>
                  </div>
                ) : filteredCustomers.length === 0 ? (
                  <div className="text-center p-20 text-slate-400">
                    <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                      <Users className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="font-semibold text-slate-600">Không tìm thấy khách hàng nào</p>
                    <p className="text-sm text-slate-400 mt-1">Nhập từ khóa khác hoặc tạo mới khách hàng.</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader className="bg-slate-50/75 border-b border-hairline">
                      <TableRow>
                        <TableHead className="w-[150px] font-bold text-slate-700">Mã khách hàng</TableHead>
                        <TableHead className="font-bold text-slate-700">Họ và tên</TableHead>
                        <TableHead className="font-bold text-slate-700">Số điện thoại</TableHead>
                        <TableHead className="font-bold text-slate-700">Email</TableHead>
                        <TableHead className="w-[100px] text-center font-bold text-slate-700">Giới tính</TableHead>
                        <TableHead className="w-[150px] text-center font-bold text-slate-700">Ngày sinh</TableHead>
                        <TableHead className="w-[120px] text-center font-bold text-slate-700">Trạng thái</TableHead>
                        <TableHead className="w-[120px] text-right font-bold text-slate-700 pr-6">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCustomers.map((cust) => (
                        <TableRow key={cust.id} className="hover:bg-slate-50/50 transition-colors">
                          <TableCell className="font-medium text-slate-800">{cust.code}</TableCell>
                          <TableCell className="font-semibold text-primary-deep">{cust.fullName}</TableCell>
                          <TableCell className="text-slate-600 font-mono text-xs">{cust.phone || '-'}</TableCell>
                          <TableCell className="text-slate-600 text-xs">{cust.email || '-'}</TableCell>
                          <TableCell className="text-center text-xs text-slate-700 font-medium">
                            {cust.gender === 'MALE' ? 'Nam' : cust.gender === 'FEMALE' ? 'Nữ' : 'Khác'}
                          </TableCell>
                          <TableCell className="text-center text-xs text-slate-600">
                            {cust.dateOfBirth ? new Date(cust.dateOfBirth).toLocaleDateString('vi-VN') : '-'}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={cust.status === 'ACTIVE' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-slate-400 hover:bg-slate-500 text-white'}>
                              {cust.status === 'ACTIVE' ? 'Hoạt động' : 'Tắt'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right pr-6 space-x-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenEdit(cust)}
                              className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-md"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleOpenDelete(cust)}
                              className="h-8 w-8 text-rose-600 hover:text-rose-700 hover:bg-rose-50/50 rounded-md"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
                {editingCustomer ? 'Chỉnh sửa khách hàng' : 'Thêm khách hàng mới'}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-6 font-sans">
              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Mã khách hàng</label>
                <Input
                  name="code"
                  value={formData.code}
                  onChange={handleFormChange}
                  placeholder="Để trống để tự sinh mã (VD: CUST-xxx)"
                  disabled={formLoading}
                  className="border-hairline focus-visible:ring-primary"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Họ và tên *</label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleFormChange}
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
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
                    placeholder="Ví dụ: 0912345678"
                    disabled={formLoading}
                    className="border-hairline focus-visible:ring-primary font-mono"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Giới tính</label>
                  <Select
                    value={formData.gender}
                    onValueChange={(val) => handleSelectChange('gender', val || 'MALE')}
                    disabled={formLoading}
                  >
                    <SelectTrigger className="w-full border-hairline">
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="MALE">Nam</SelectItem>
                      <SelectItem value="FEMALE">Nữ</SelectItem>
                      <SelectItem value="OTHER">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Ví dụ: nva@pharmaassist.com"
                  disabled={formLoading}
                  className="border-hairline focus-visible:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Ngày sinh</label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleFormChange}
                    disabled={formLoading}
                    className="border-hairline focus-visible:ring-primary font-mono"
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
              Xác nhận xóa khách hàng
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 text-slate-600 text-sm leading-relaxed">
            Bạn có chắc chắn muốn xóa khách hàng <span className="font-bold text-ink">&quot;{customerToDelete?.fullName}&quot;</span> (Mã: {customerToDelete?.code})?
            <p className="mt-2 text-rose-500 font-semibold text-xs bg-rose-50 p-2.5 rounded-lg border border-rose-100">
              * Hành động này sẽ xóa vĩnh viễn khách hàng. Chỉ có thể thực hiện nếu khách hàng chưa phát sinh đơn hàng hoặc hóa đơn trên hệ thống.
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
    </RouteGuard>
  );
}
