'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
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
import { Search, Plus, Loader2, AlertTriangle, Pill, ShieldAlert, CheckCircle2, Info, X } from 'lucide-react';
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
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [prescriptionFilter, setPrescriptionFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  // Selected medicine for detail modal
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    setLoading(true);
    setErrorAlert(null);
    try {
      const response = await api.get('/medicines');
      setMedicines(response.data);
    } catch (err: any) {
      console.error('Failed to fetch medicines:', err);
      setErrorAlert(err.response?.data?.message || 'Không thể tải danh sách thuốc từ hệ thống.');
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from medicines to populate filter
  const categories = Array.from(
    new Map(
      medicines
        .filter(m => m.product?.category)
        .map(m => [m.product.category.id, m.product.category])
    ).values()
  );

  // Filtered medicines based on search and filters
  const filteredMedicines = medicines.filter((m) => {
    const nameMatch = m.product?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const codeMatch = m.medicineCode?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      m.product?.code?.toLowerCase().includes(searchQuery.toLowerCase());
    const ingredientMatch = m.ingredients?.some(i => 
      i.activeIngredient?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const matchesSearch = nameMatch || codeMatch || ingredientMatch;

    const matchesPrescription = 
      prescriptionFilter === 'ALL' || 
      (prescriptionFilter === 'YES' && m.requiresPrescription) || 
      (prescriptionFilter === 'NO' && !m.requiresPrescription);

    const matchesCategory = 
      categoryFilter === 'ALL' || 
      m.product?.category?.id.toString() === categoryFilter;

    return matchesSearch && matchesPrescription && matchesCategory;
  });

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
        <Link href="/dashboard/medicines/new" passHref>
          <Button className="bg-primary hover:bg-primary-deep text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all shrink-0">
            <Plus className="h-4 w-4" />
            Thêm thuốc mới
          </Button>
        </Link>
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
                onChange={(e) => setCategoryFilter(e.target.value)}
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
                onChange={(e) => setPrescriptionFilter(e.target.value)}
                className="w-full h-10 border border-hairline rounded-lg px-3 text-xs text-charcoal bg-white font-medium focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="ALL">Đơn thuốc: Tất cả</option>
                <option value="YES">Bắt buộc kê đơn 📄</option>
                <option value="NO">Không kê đơn 🟢</option>
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
                      <TableCell className="py-4 pr-6 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedMedicine(m)}
                          className="h-8 w-8 text-primary hover:text-primary-deep hover:bg-primary-soft rounded-lg"
                        >
                          <Info className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
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
    </div>
  );
}
