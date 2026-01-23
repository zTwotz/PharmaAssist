'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';
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
import { Search, Plus, Loader2, AlertTriangle, Pill, ShieldAlert, Info, X, Edit, Lock, Unlock, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface ActiveIngredient {
  id: number;
  code: string;
  name: string;
}

interface MedicineIngredient {
  id: number;
  strength: string;
  note: string | null;
  activeIngredient: ActiveIngredient;
}

interface ProductVariant {
  id: number;
  sku: string;
  variantName: string;
  sellingPrice: string | number;
  unit: {
    id: number;
    name: string;
  };
}

interface Medicine {
  id: number;
  medicineCode: string;
  registrationNumber: string | null;
  requiresPrescription: boolean;
  usageNote: string | null;
  storageInstruction: string | null;
  shelfLifeMonths: number | null;
  status: string;
  product: {
    id: number;
    code: string;
    name: string;
    slug: string;
    shortDescription: string | null;
    category: {
      id: number;
      name: string;
    };
    brand: {
      id: number;
      name: string;
    } | null;
    manufacturer: {
      id: number;
      name: string;
    } | null;
    variants: ProductVariant[];
  };
  dosageForm: {
    id: number;
    name: string;
  };
  unit: {
    id: number;
    name: string;
  };
  ingredients: MedicineIngredient[];
}

export function MedicineList() {
  const { hasPermission } = useAuth();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [prescriptionFilter, setPrescriptionFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  
  // Pagination states
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  // Selected medicine for detail modal
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  // Deactivate state
  const [deactivateMed, setDeactivateMed] = useState<Medicine | null>(null);
  const [deactivating, setDeactivating] = useState(false);

  const fetchMedicines = async () => {
    setLoading(true);
    setErrorAlert(null);
    try {
      const response = await api.get('/medicines', {
        params: {
          page,
          limit,
          search: debouncedSearch || undefined,
          status: statusFilter,
          categoryId: categoryFilter === 'ALL' ? undefined : Number(categoryFilter),
          prescription: prescriptionFilter,
        },
      });
      setMedicines(response.data.data || []);
      setTotal(response.data.total || 0);
      setTotalPages(response.data.totalPages || 0);
    } catch (err: unknown) {
      console.error('Failed to fetch medicines:', err);
      const error = err as { response?: { data?: { message?: string } } };
      setErrorAlert(error.response?.data?.message || 'Không thể tải danh sách thuốc từ hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/medicines/reference-data');
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleToggleStatus = async () => {
    if (!deactivateMed) return;
    setDeactivating(true);
    try {
      const newStatus = deactivateMed.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await api.patch(`/medicines/${deactivateMed.id}/status`, { status: newStatus });
      
      // Update local state
      setMedicines((prev) =>
        prev.map((m) => (m.id === deactivateMed.id ? { ...m, status: newStatus } : m))
      );
      setDeactivateMed(null);
    } catch (err: unknown) {
      console.error('Failed to toggle status:', err);
      const error = err as { response?: { data?: { message?: string } } };
      setErrorAlert(error.response?.data?.message || 'Không thể cập nhật trạng thái thuốc.');
    } finally {
      setDeactivating(false);
    }
  };

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch categories on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Fetch medicines when pagination or filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMedicines();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, debouncedSearch, categoryFilter, statusFilter, prescriptionFilter]);

  const handleCategoryFilterChange = (val: string) => {
    setCategoryFilter(val);
    setPage(1);
  };

  const handlePrescriptionFilterChange = (val: string) => {
    setPrescriptionFilter(val);
    setPage(1);
  };

  const handleStatusFilterChange = (val: string) => {
    setStatusFilter(val);
    setPage(1);
  };

  const filteredMedicines = medicines;

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-ink flex items-center gap-2">
            <Pill className="h-5 w-5 text-primary" />
            Danh sách Dược phẩm & Thuốc
          </h2>
          <p className="text-xs text-graphite mt-1">
            Hiển thị danh sách chi tiết các loại thuốc, thành phần dược chất và cấu hình bán hàng.
          </p>
        </div>
        {hasPermission('MANAGE_MEDICINES') && (
          <Link href="/dashboard/medicines/new" passHref>
            <Button className="bg-primary hover:bg-primary-deep text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all shrink-0">
              <Plus className="h-4 w-4" />
              Thêm thuốc mới
            </Button>
          </Link>
        )}
      </div>

      {errorAlert && (
        <Alert variant="destructive" className="bg-bloom-rose/25 border-error/20 rounded-lg">
          <AlertTriangle className="h-4 w-4 text-error" />
          <AlertTitle className="font-bold text-error">Lỗi hệ thống</AlertTitle>
          <AlertDescription className="text-error-deep text-xs font-medium">{errorAlert}</AlertDescription>
        </Alert>
      )}

      {/* Filter and Search Bar */}
      <Card className="bg-white border border-hairline rounded-xl shadow-xs">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-graphite" />
            <Input
              placeholder="Tìm theo tên thuốc, mã thuốc, mã SKU, hoạt chất..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
            />
          </div>

          <div className="flex flex-wrap md:flex-nowrap gap-3 w-full md:w-auto">
            {/* Category Filter */}
            <div className="w-full md:w-48">
              <select
                value={categoryFilter}
                onChange={(e) => handleCategoryFilterChange(e.target.value)}
                className="w-full h-10 border border-hairline rounded-lg px-3 text-xs text-charcoal bg-white font-medium focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ALL">Tất cả danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Prescription Filter */}
            <div className="w-full md:w-44">
              <select
                value={prescriptionFilter}
                onChange={(e) => handlePrescriptionFilterChange(e.target.value)}
                className="w-full h-10 border border-hairline rounded-lg px-3 text-xs text-charcoal bg-white font-medium focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ALL">Đơn thuốc: Tất cả</option>
                <option value="YES">Bắt buộc kê đơn 📄</option>
                <option value="NO">Không kê đơn 🟢</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="w-full md:w-36">
              <select
                value={statusFilter}
                onChange={(e) => handleStatusFilterChange(e.target.value)}
                className="w-full h-10 border border-hairline rounded-lg px-3 text-xs text-charcoal bg-white font-medium focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ALL">Trạng thái: Tất cả</option>
                <option value="ACTIVE">Hoạt động 🟢</option>
                <option value="INACTIVE">Tạm khóa 🔴</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medicines Table */}
      <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
              <p className="text-xs text-graphite font-medium">Đang tải danh sách thuốc...</p>
            </div>
          ) : filteredMedicines.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center p-6">
              <span className="text-4xl mb-3">💊</span>
              <h3 className="font-bold text-ink text-sm">Không tìm thấy thuốc nào</h3>
              <p className="text-xs text-graphite max-w-xs mt-1">
                Không tìm thấy dược phẩm nào khớp với từ khóa hoặc bộ lọc của bạn.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-cloud border-b border-hairline">
                  <TableRow>
                    <TableHead className="text-xs font-bold text-ink py-3.5 pl-6 w-[120px]">Mã thuốc</TableHead>
                    <TableHead className="text-xs font-bold text-ink py-3.5">Tên dược phẩm</TableHead>
                    <TableHead className="text-xs font-bold text-ink py-3.5">Hoạt chất / Hàm lượng</TableHead>
                    <TableHead className="text-xs font-bold text-ink py-3.5">Dạng bào chế</TableHead>
                    <TableHead className="text-xs font-bold text-ink py-3.5">Số đăng ký</TableHead>
                    <TableHead className="text-xs font-bold text-ink py-3.5">Kê đơn</TableHead>
                    <TableHead className="text-xs font-bold text-ink py-3.5">Trạng thái</TableHead>
                    <TableHead className="text-xs font-bold text-ink py-3.5 pr-6 text-right w-[100px]">Chi tiết</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-hairline">
                  {filteredMedicines.map((m) => (
                    <TableRow key={m.id} className="hover:bg-cloud/40 transition-colors">
                      <TableCell className="font-semibold text-xs text-primary py-4 pl-6">
                        {m.medicineCode}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="space-y-1 max-w-[280px]">
                          <p className="font-bold text-ink text-xs line-clamp-1">{m.product?.name}</p>
                          <div className="flex gap-2">
                            {m.product?.category && (
                              <span className="text-[10px] bg-primary-soft text-primary-deep font-semibold px-2 py-0.5 rounded">
                                {m.product.category.name}
                              </span>
                            )}
                            {m.product?.brand && (
                              <span className="text-[10px] bg-fog text-charcoal px-2 py-0.5 rounded">
                                {m.product.brand.name}
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="space-y-0.5 max-w-[200px]">
                          {m.ingredients && m.ingredients.length > 0 ? (
                            m.ingredients.map((ing, idx) => (
                              <p key={idx} className="text-xs text-charcoal font-medium line-clamp-1">
                                {ing.activeIngredient?.name} <span className="text-primary font-bold">({ing.strength})</span>
                              </p>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs italic">Không có thông tin</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-charcoal font-medium py-4">
                        {m.dosageForm?.name || <span className="text-gray-400 italic">Chưa cập nhật</span>}
                      </TableCell>
                      <TableCell className="text-xs text-charcoal font-semibold py-4">
                        {m.registrationNumber || <span className="text-gray-400 font-normal italic">Chưa đăng ký</span>}
                      </TableCell>
                      <TableCell className="py-4">
                        {m.requiresPrescription ? (
                          <Badge className="bg-bloom-rose text-error-deep border border-error/15 font-bold text-[10px] px-2 py-0.5 flex items-center gap-1 w-fit shadow-xs">
                            <ShieldAlert className="h-3 w-3 text-error" />
                            Kê đơn
                          </Badge>
                        ) : (
                          <Badge className="bg-bloom-emerald text-emerald-800 border border-emerald-500/10 font-bold text-[10px] px-2 py-0.5 w-fit shadow-xs">
                            Không kê đơn
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge className={`font-semibold text-[10px] px-2 py-0.5 border w-fit shadow-xs ${
                          m.status === 'ACTIVE'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-500/15'
                            : 'bg-gray-100 text-gray-500 border-gray-200'
                        }`}>
                          {m.status === 'ACTIVE' ? 'Hoạt động' : 'Tạm khóa'}
                        </Badge>
                      </TableCell>
                       <TableCell className="py-4 pr-6 text-right flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedMedicine(m)}
                          className="h-8 w-8 text-primary hover:text-primary-deep hover:bg-primary-soft rounded-lg"
                          title="Chi tiết"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                        {hasPermission('MANAGE_MEDICINES') && (
                          <Link href={`/dashboard/medicines/${m.id}/edit`} passHref>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-charcoal hover:text-ink hover:bg-fog rounded-lg"
                              title="Sửa"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        {hasPermission('MANAGE_MEDICINES') && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setDeactivateMed(m)}
                            className={`h-8 w-8 rounded-lg ${
                              m.status === 'ACTIVE'
                                ? 'text-error hover:text-error-deep hover:bg-bloom-rose/25'
                                : 'text-emerald-600 hover:text-emerald-700 hover:bg-bloom-emerald/25'
                            }`}
                            title={m.status === 'ACTIVE' ? 'Khóa' : 'Mở khóa'}
                          >
                            {m.status === 'ACTIVE' ? (
                              <Lock className="h-4 w-4" />
                            ) : (
                              <Unlock className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-hairline bg-cloud/50">
              <div className="text-xs text-graphite font-medium">
                Hiển thị <span className="font-semibold text-ink">{total > 0 ? (page - 1) * limit + 1 : 0}</span> -{' '}
                <span className="font-semibold text-ink">{Math.min(page * limit, total)}</span> trong số{' '}
                <span className="font-semibold text-ink">{total}</span> thuốc
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className="h-8 w-8 p-0 border-hairline rounded-lg text-charcoal hover:bg-fog"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="text-xs text-charcoal font-semibold px-2">
                  Trang {page} / {totalPages || 1}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= totalPages || totalPages === 0}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  className="h-8 w-8 p-0 border-hairline rounded-lg text-charcoal hover:bg-fog"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                
                <div className="flex items-center gap-1.5 ml-2">
                  <span className="text-[10px] text-graphite uppercase font-bold tracking-wider">Số lượng:</span>
                  <select
                    value={limit}
                    onChange={(e) => {
                      setLimit(Number(e.target.value));
                      setPage(1);
                    }}
                    className="h-8 border border-hairline rounded-lg px-2 text-xs text-charcoal bg-white font-medium focus:outline-none"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
              </div>
            </div>
          </>)}
        </CardContent>
      </Card>

      {/* Medicine Details Modal */}
      {selectedMedicine && (
        <Dialog open={!!selectedMedicine} onOpenChange={() => setSelectedMedicine(null)}>
          <DialogContent className="max-w-2xl bg-white border border-hairline rounded-xl shadow-lg p-0 overflow-hidden font-sans">
            <DialogHeader className="p-6 bg-cloud border-b border-hairline flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="h-5 w-5 text-primary" />
                <DialogTitle className="text-base font-bold text-ink">
                  Chi Tiết Thuốc: {selectedMedicine.medicineCode}
                </DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMedicine(null)}
                className="h-8 w-8 text-graphite hover:text-ink hover:bg-fog rounded-full shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            <div className="p-6 space-y-6 max-h-[500px] overflow-y-auto">
              {/* Product Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">Tên biệt dược / Tên thương mại</span>
                  <p className="text-sm font-bold text-ink">{selectedMedicine.product?.name}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">Số đăng ký lưu hành (SĐK)</span>
                  <p className="text-sm font-bold text-ink">{selectedMedicine.registrationNumber || 'Chưa đăng ký'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">Nhà sản xuất</span>
                  <p className="text-xs text-charcoal font-medium">{selectedMedicine.product?.manufacturer?.name || 'Đang cập nhật'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">Hãng / Thương hiệu</span>
                  <p className="text-xs text-charcoal font-medium">{selectedMedicine.product?.brand?.name || 'Đang cập nhật'}</p>
                </div>
              </div>

              {/* Ingredients */}
              <div className="border-t border-hairline pt-4 space-y-3">
                <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Thành phần & Hàm lượng hoạt chất</h4>
                <div className="bg-cloud p-3 rounded-lg border border-hairline space-y-2">
                  {selectedMedicine.ingredients && selectedMedicine.ingredients.length > 0 ? (
                    selectedMedicine.ingredients.map((ing, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-charcoal py-1 border-b border-hairline last:border-0 last:pb-0">
                        <span className="font-semibold text-ink">{ing.activeIngredient?.name}</span>
                        <span className="font-bold text-primary bg-primary-soft px-2 py-0.5 rounded">{ing.strength}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-graphite italic">Không có dữ liệu thành phần hoạt chất.</p>
                  )}
                </div>
              </div>

              {/* Medicine Specifications */}
              <div className="border-t border-hairline pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">Dạng bào chế</span>
                  <p className="text-xs text-charcoal font-semibold">{selectedMedicine.dosageForm?.name || 'Chưa cập nhật'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">Đơn vị bán lẻ chính</span>
                  <p className="text-xs text-charcoal font-semibold">{selectedMedicine.unit?.name || 'Chưa cập nhật'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">Hạn sử dụng ghi trên nhãn</span>
                  <p className="text-xs text-charcoal font-semibold">
                    {selectedMedicine.shelfLifeMonths ? `${selectedMedicine.shelfLifeMonths} tháng` : 'Đang cập nhật'}
                  </p>
                </div>
              </div>

              {/* Medical notes */}
              {(selectedMedicine.usageNote || selectedMedicine.storageInstruction) && (
                <div className="border-t border-hairline pt-4 space-y-3">
                  {selectedMedicine.usageNote && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">Hướng dẫn sử dụng & Chỉ định</span>
                      <div className="bg-yellow-50/50 border border-yellow-200/50 p-3 rounded-lg text-xs text-charcoal whitespace-pre-line leading-relaxed">
                        {selectedMedicine.usageNote}
                      </div>
                    </div>
                  )}
                  {selectedMedicine.storageInstruction && (
                    <div className="space-y-1">
                      <span className="text-[10px] text-graphite font-bold uppercase tracking-wider">Điều kiện bảo quản</span>
                      <p className="text-xs text-charcoal bg-cloud p-3 rounded-lg border border-hairline leading-relaxed">
                        {selectedMedicine.storageInstruction}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Selling Variants */}
              {selectedMedicine.product?.variants && selectedMedicine.product.variants.length > 0 && (
                <div className="border-t border-hairline pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-ink uppercase tracking-wider">Các đơn vị tính & Giá bán (SKU)</h4>
                  <div className="border border-hairline rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader className="bg-cloud">
                        <TableRow>
                          <TableHead className="text-[10px] font-bold text-ink py-2 pl-4">Mã SKU</TableHead>
                          <TableHead className="text-[10px] font-bold text-ink py-2">Tên biến thể</TableHead>
                          <TableHead className="text-[10px] font-bold text-ink py-2">Đơn vị tính</TableHead>
                          <TableHead className="text-[10px] font-bold text-ink py-2 pr-4 text-right">Giá bán</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-hairline">
                        {selectedMedicine.product.variants.map((v) => (
                          <TableRow key={v.id}>
                            <TableCell className="text-xs text-charcoal font-semibold py-2.5 pl-4">{v.sku}</TableCell>
                            <TableCell className="text-xs text-charcoal py-2.5">{v.variantName}</TableCell>
                            <TableCell className="text-xs text-charcoal py-2.5">
                              <Badge variant="outline" className="text-[10px] font-medium border-hairline">
                                {v.unit?.name}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs font-bold text-primary py-2.5 pr-4 text-right">
                              {Number(v.sellingPrice).toLocaleString('vi-VN')} đ
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className="p-4 bg-cloud border-t border-hairline flex gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedMedicine(null)}
                className="border-hairline text-xs font-bold h-9 hover:bg-fog"
              >
                Đóng
              </Button>
              <Link href={`/dashboard/medicines/new`} passHref>
                <Button className="bg-primary hover:bg-primary-deep text-white text-xs font-bold h-9">
                  Cấu hình hoặc Thêm thuốc mới
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Soft Deactivate Dialog */}
      {deactivateMed && (
        <Dialog open={!!deactivateMed} onOpenChange={() => setDeactivateMed(null)}>
          <DialogContent className="max-w-md bg-white border border-hairline rounded-xl shadow-lg p-0 overflow-hidden font-sans">
            <DialogHeader className="p-6 bg-cloud border-b border-hairline flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <DialogTitle className="text-base font-bold text-ink">
                  {deactivateMed.status === 'ACTIVE' ? 'Tạm khóa thuốc' : 'Kích hoạt lại thuốc'}
                </DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeactivateMed(null)}
                className="h-8 w-8 text-graphite hover:text-ink hover:bg-fog rounded-full shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            <div className="p-6 text-xs text-charcoal font-medium leading-relaxed">
              {deactivateMed.status === 'ACTIVE' ? (
                <p>
                  Bạn có chắc chắn muốn tạm khóa thuốc <span className="font-bold text-ink">&ldquo;{deactivateMed.product?.name}&rdquo;</span>?
                  Khi bị khóa, thuốc này sẽ không thể dùng cho các giao dịch bán hàng mới hoặc chọn trong POS.
                </p>
              ) : (
                <p>
                  Bạn có muốn kích hoạt lại thuốc <span className="font-bold text-ink">&ldquo;{deactivateMed.product?.name}&rdquo;</span>?
                  Sau khi kích hoạt, thuốc sẽ tiếp tục hiển thị và sử dụng bình thường trên toàn hệ thống.
                </p>
              )}
            </div>

            <DialogFooter className="p-4 bg-cloud border-t border-hairline flex gap-2">
              <Button
                variant="outline"
                onClick={() => setDeactivateMed(null)}
                className="border-hairline text-xs font-bold h-9 hover:bg-fog"
              >
                Hủy
              </Button>
              <Button
                disabled={deactivating}
                onClick={handleToggleStatus}
                className={`text-white text-xs font-bold h-9 px-4 rounded-lg flex items-center gap-2 ${
                  deactivateMed.status === 'ACTIVE'
                    ? 'bg-error hover:bg-error-deep'
                    : 'bg-emerald-600 hover:bg-emerald-700'
                }`}
              >
                {deactivating && <Loader2 className="h-4 w-4 animate-spin" />}
                Xác nhận
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
