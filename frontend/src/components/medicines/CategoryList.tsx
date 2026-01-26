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
import { Search, Plus, Edit, Trash2, Loader2, AlertTriangle, CheckCircle2, X } from 'lucide-react';

interface Category {
  id: number;
  code: string;
  name: string;
  slug: string;
  parentId: number | null;
  description: string | null;
  imageUrl: string | null;
  sortOrder: number;
  status: string;
  parent?: {
    id: number;
    name: string;
    code: string;
  } | null;
  _count?: {
    products: number;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string | string[];
    };
  };
}

export function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Alerts
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  // Form states
  const [formLoading, setFormLoading] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    parentId: '',
    description: '',
    imageUrl: '',
    sortOrder: 0,
    status: 'ACTIVE',
  });

  const fetchCategories = async () => {
    setLoading(true);
    setErrorAlert(null);
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (err: unknown) {
      console.error('Failed to fetch categories:', err);
      const apiError = err as ApiError;
      const msg = apiError.response?.data?.message || 'Không thể tải danh sách danh mục.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({
      code: '',
      name: '',
      parentId: '',
      description: '',
      imageUrl: '',
      sortOrder: 0,
      status: 'ACTIVE',
    });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      code: category.code,
      name: category.name,
      parentId: category.parentId ? category.parentId.toString() : '',
      description: category.description || '',
      imageUrl: category.imageUrl || '',
      sortOrder: category.sortOrder,
      status: category.status,
    });
    setIsFormOpen(true);
  };

  const handleOpenDelete = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'sortOrder' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Check if a candidate parent is a descendant of the target category to prevent cycle
  const isDescendant = (candidateId: number, targetId: number): boolean => {
    if (candidateId === targetId) return true;
    const cat = categories.find((c) => c.id === candidateId);
    if (!cat || !cat.parentId) return false;
    return isDescendant(cat.parentId, targetId);
  };

  // Filter categories that can be parent
  const getValidParents = () => {
    if (!editingCategory) return categories;
    return categories.filter(
      (c) => c.id !== editingCategory.id && !isDescendant(c.id, editingCategory.id)
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setErrorAlert(null);
    setSuccessAlert(null);

    const payload = {
      ...formData,
      parentId: formData.parentId ? parseInt(formData.parentId) : null,
    };

    try {
      if (editingCategory) {
        await api.patch(`/categories/${editingCategory.id}`, payload);
        setSuccessAlert(`Đã cập nhật danh mục "${formData.name}" thành công.`);
      } else {
        await api.post('/categories', payload);
        setSuccessAlert(`Đã tạo danh mục "${formData.name}" thành công.`);
      }
      setIsFormOpen(false);
      fetchCategories();
    } catch (err: unknown) {
      console.error('Submit form failed:', err);
      const apiError = err as ApiError;
      const msg = apiError.response?.data?.message || 'Đã xảy ra lỗi khi lưu danh mục.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteSubmit = async () => {
    if (!categoryToDelete) return;
    setFormLoading(true);
    setErrorAlert(null);
    setSuccessAlert(null);

    try {
      await api.delete(`/categories/${categoryToDelete.id}`);
      setSuccessAlert(`Đã xóa danh mục "${categoryToDelete.name}" thành công.`);
      setIsDeleteOpen(false);
      fetchCategories();
    } catch (err: unknown) {
      console.error('Delete failed:', err);
      const apiError = err as ApiError;
      const msg = apiError.response?.data?.message || 'Đã xảy ra lỗi khi xóa danh mục.';
      setErrorAlert(Array.isArray(msg) ? msg.join(', ') : msg);
      setIsDeleteOpen(false);
    } finally {
      setFormLoading(false);
    }
  };

  // Filters
  const filteredCategories = categories.filter((cat) => {
    const matchesSearch =
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      statusFilter === 'ALL' || cat.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
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
              placeholder="Tìm theo tên hoặc mã danh mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-10 border-hairline focus-visible:ring-primary"
            />
          </div>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || 'ALL')}>
            <SelectTrigger className="w-[180px] h-10 border-hairline">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
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
          Thêm danh mục
        </Button>
      </div>

      {/* Main Table Card */}
      <Card className="bg-white border border-hairline rounded-xl shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-24 text-slate-500">
              <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
              <p className="text-sm font-medium">Đang tải danh mục thuốc...</p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="text-center p-20 text-slate-400">
              <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-200">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <p className="font-semibold text-slate-600">Không tìm thấy danh mục nào</p>
              <p className="text-sm text-slate-400 mt-1">Hãy thử tìm kiếm với từ khóa khác hoặc tạo mới danh mục.</p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-slate-50/75 border-b border-hairline">
                <TableRow>
                  <TableHead className="w-[150px] font-bold text-slate-700">Mã danh mục</TableHead>
                  <TableHead className="font-bold text-slate-700">Tên danh mục</TableHead>
                  <TableHead className="font-bold text-slate-700">Danh mục cha</TableHead>
                  <TableHead className="w-[120px] text-center font-bold text-slate-700">Số sản phẩm</TableHead>
                  <TableHead className="w-[120px] text-center font-bold text-slate-700">Sắp xếp</TableHead>
                  <TableHead className="w-[150px] text-center font-bold text-slate-700">Trạng thái</TableHead>
                  <TableHead className="w-[120px] text-right font-bold text-slate-700 pr-6">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((cat) => (
                  <TableRow key={cat.id} className="hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-medium text-slate-800">{cat.code}</TableCell>
                    <TableCell className="font-semibold text-primary-deep">{cat.name}</TableCell>
                    <TableCell className="text-slate-600">
                      {cat.parent ? (
                        <span className="inline-flex items-center gap-1.5 text-xs bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full border border-slate-200">
                          {cat.parent.name}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium italic">Không có (Cấp gốc)</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-700">
                      {cat._count?.products || 0}
                    </TableCell>
                    <TableCell className="text-center text-slate-600 font-mono text-xs">
                      {cat.sortOrder}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={cat.status === 'ACTIVE' ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-slate-400 hover:bg-slate-500 text-white'}>
                        {cat.status === 'ACTIVE' ? 'Hoạt động' : 'Tắt'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right pr-6 space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(cat)}
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 rounded-md"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDelete(cat)}
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

      {/* Add / Edit Form Modal */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border border-hairline rounded-xl shadow-lg">
          <form onSubmit={handleFormSubmit}>
            <DialogHeader className="border-b border-hairline pb-4">
              <DialogTitle className="text-xl font-bold text-ink">
                {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
              </DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-6 font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Mã danh mục *</label>
                  <Input
                    name="code"
                    value={formData.code}
                    onChange={handleFormChange}
                    required
                    placeholder="Ví dụ: TH_HO"
                    disabled={formLoading}
                    className="border-hairline focus-visible:ring-primary"
                  />
                </div>
                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Tên danh mục *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Ví dụ: Thuốc ho & đau họng"
                    disabled={formLoading}
                    className="border-hairline focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Danh mục cha</label>
                <Select
                  value={formData.parentId}
                  onValueChange={(val) => handleSelectChange('parentId', val || '')}
                  disabled={formLoading}
                >
                  <SelectTrigger className="w-full border-hairline">
                    <SelectValue placeholder="Chọn danh mục cha (để trống nếu là cấp gốc)" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="">-- Không chọn (Cấp gốc) --</SelectItem>
                    {getValidParents().map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>
                        {c.name} ({c.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Mô tả</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Nhập mô tả ngắn cho danh mục..."
                  disabled={formLoading}
                  rows={3}
                  className="w-full rounded-md border border-hairline p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Đường dẫn ảnh đại diện</label>
                <Input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleFormChange}
                  placeholder="Ví dụ: /images/categories/thuoc-ho.png"
                  disabled={formLoading}
                  className="border-hairline focus-visible:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-1.5">
                  <label className="text-sm font-semibold text-slate-700">Thứ tự hiển thị</label>
                  <Input
                    type="number"
                    name="sortOrder"
                    value={formData.sortOrder}
                    onChange={handleFormChange}
                    min={0}
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
                    <SelectTrigger className="w-full border-hairline">
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

      {/* Delete Confirm Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white border border-hairline rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-rose-600 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-rose-500" />
              Xác nhận xóa danh mục
            </DialogTitle>
          </DialogHeader>

          <div className="py-4 text-slate-600 text-sm leading-relaxed">
            Bạn có chắc chắn muốn xóa danh mục <span className="font-bold text-ink">&quot;{categoryToDelete?.name}&quot;</span> (Mã: {categoryToDelete?.code})? 
            <p className="mt-2 text-rose-500 font-semibold text-xs bg-rose-50 p-2.5 rounded-lg border border-rose-100">
              * Hành động này sẽ xóa vĩnh viễn danh mục khỏi hệ thống và cập nhật lại cây thư mục. 
              Chỉ có thể xóa nếu danh mục không chứa thuốc và không có danh mục con bên dưới.
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
    </div>
  );
}
