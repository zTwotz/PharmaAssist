'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2, Loader2, ArrowLeft, Plus, Trash2 } from 'lucide-react';

interface ReferenceData {
  categories: { id: number; name: string }[];
  units: { id: number; name: string }[];
  dosageForms: { id: number; name: string }[];
  brands: { id: number; name: string }[];
  manufacturers: { id: number; name: string }[];
}

interface SelectedIngredient {
  activeIngredientId: string;
  strength: string;
  note: string;
}

export default function EditMedicinePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [refData, setRefData] = useState<ReferenceData | null>(null);
  const [availableIngredients, setAvailableIngredients] = useState<{ id: number; name: string }[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);

  // Alert States
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    categoryId: '',
    brandId: '',
    manufacturerId: '',
    shortDescription: '',
    description: '',
    medicineCode: '',
    registrationNumber: '',
    dosageFormId: '',
    medicineUnitId: '',
    requiresPrescription: false,
    usageNote: '',
    storageInstruction: '',
    shelfLifeMonths: '',
    sellingPrice: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch reference data, medicine details, and active ingredients in parallel
        const [refRes, medRes, ingredientRes] = await Promise.all([
          api.get('/medicines/reference-data'),
          api.get(`/medicines/${id}`),
          api.get('/active-ingredients?status=ACTIVE&limit=200'),
        ]);

        setRefData(refRes.data);
        setAvailableIngredients(ingredientRes.data.data || []);

        // Pre-fill form data
        const med = medRes.data;
        const variant = med.product?.variants?.[0];
        setFormData({
          code: med.product?.code || '',
          name: med.product?.name || '',
          categoryId: med.product?.category?.id?.toString() || '',
          brandId: med.product?.brand?.id?.toString() || 'none',
          manufacturerId: med.product?.manufacturer?.id?.toString() || 'none',
          shortDescription: med.product?.shortDescription || '',
          description: med.product?.description || '',
          medicineCode: med.medicineCode || '',
          registrationNumber: med.registrationNumber || '',
          dosageFormId: med.dosageForm?.id?.toString() || '',
          medicineUnitId: med.unit?.id?.toString() || '',
          requiresPrescription: med.requiresPrescription || false,
          usageNote: med.usageNote || '',
          storageInstruction: med.storageInstruction || '',
          shelfLifeMonths: med.shelfLifeMonths?.toString() || '',
          sellingPrice: variant ? Number(variant.sellingPrice).toString() : '',
        });

        // Pre-fill mapped ingredients
        const mappedIngredients = (med.ingredients || []).map(
          (item: { activeIngredientId: number; strength: string; note?: string | null }) => ({
            activeIngredientId: item.activeIngredientId.toString(),
            strength: item.strength,
            note: item.note || '',
          })
        );
        setSelectedIngredients(mappedIngredients);
      } catch (error) {
        console.error('Failed to load medicine or configuration data', error);
        setErrorMsg('Không thể tải thông tin thuốc hoặc dữ liệu cấu hình. Vui lòng thử lại.');
      } finally {
        setInitialLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // Front-end validation for sellingPrice
    const price = parseFloat(formData.sellingPrice);
    if (isNaN(price) || price <= 0) {
      setErrorMsg('Giá bán phải lớn hơn 0');
      setLoading(false);
      return;
    }

    // Validate ingredients mapping
    for (const item of selectedIngredients) {
      if (!item.activeIngredientId) {
        setErrorMsg('Vui lòng chọn đầy đủ hoạt chất cho các hàng đã thêm');
        setLoading(false);
        return;
      }
      if (!item.strength || !item.strength.trim()) {
        setErrorMsg('Vui lòng nhập hàm lượng cho các hoạt chất đã liên kết');
        setLoading(false);
        return;
      }
    }

    try {
      const payload = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        brandId: formData.brandId && formData.brandId !== 'none' ? parseInt(formData.brandId) : null,
        manufacturerId: formData.manufacturerId && formData.manufacturerId !== 'none' ? parseInt(formData.manufacturerId) : null,
        dosageFormId: parseInt(formData.dosageFormId),
        medicineUnitId: parseInt(formData.medicineUnitId),
        shelfLifeMonths: formData.shelfLifeMonths ? parseInt(formData.shelfLifeMonths) : null,
        sellingPrice: price,
      };

      const res = await api.patch(`/medicines/${id}`, payload);

      if (res.status === 200 || res.status === 201) {
        // Update the mapping!
        const mappingPayload = {
          ingredients: selectedIngredients.map((item) => ({
            activeIngredientId: parseInt(item.activeIngredientId, 10),
            strength: item.strength.trim(),
            note: item.note?.trim() || undefined,
          })),
        };
        await api.put(`/medicines/${id}/active-ingredients`, mappingPayload);

        setSuccessMsg('Đã cập nhật thông tin thuốc thành công. Đang chuyển hướng...');
        setTimeout(() => {
          router.push('/medicines');
        }, 1500);
      }
    } catch (error) {
      console.error('Update error:', error);
      const err = error as { response?: { data?: { message?: string | string[] } } };
      const backendMsg = err.response?.data?.message;
      setErrorMsg(
        Array.isArray(backendMsg)
          ? backendMsg.join(', ')
          : backendMsg || 'Lỗi hệ thống. Không thể cập nhật thông tin thuốc.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getFilteredOptions = (currentIndex: number) => {
    return availableIngredients.filter((option) => {
      const isSelectedElsewhere = selectedIngredients.some(
        (item, idx) => idx !== currentIndex && item.activeIngredientId === option.id.toString()
      );
      return !isSelectedElsewhere;
    });
  };

  if (initialLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-cloud">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs text-graphite font-medium">Đang tải thông tin thuốc...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-[1200px] mx-auto font-sans">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="h-9 w-9 text-graphite hover:text-ink hover:bg-fog rounded-full shrink-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-ink">Chỉnh Sửa Thông Tin Thuốc</h2>
          <p className="text-xs text-graphite mt-0.5">Cập nhật thông tin dược phẩm và cấu hình giá bán.</p>
        </div>
      </div>

      {errorMsg && (
        <Alert variant="destructive" className="bg-bloom-rose/25 border-error/20 rounded-xl">
          <AlertCircle className="h-4 w-4 text-error" />
          <AlertTitle className="font-bold text-error">Lỗi</AlertTitle>
          <AlertDescription className="text-error-deep text-xs font-medium">{errorMsg}</AlertDescription>
        </Alert>
      )}

      {successMsg && (
        <Alert className="bg-bloom-emerald/25 border-emerald-500/20 text-emerald-800 rounded-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          <AlertTitle className="font-bold">Thành công</AlertTitle>
          <AlertDescription className="text-xs font-medium">{successMsg}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Thông tin chung */}
          <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden">
            <CardHeader className="bg-cloud/40 border-b border-hairline px-6 py-4">
              <CardTitle className="text-sm font-bold text-ink">Thông tin chung</CardTitle>
              <CardDescription className="text-xs text-graphite">Các thông tin cơ bản về sản phẩm.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Mã sản phẩm *</label>
                <Input
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: PAN01"
                  className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Tên sản phẩm *</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: Panadol Extra"
                  className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Danh mục *</label>
                <Select value={formData.categoryId} onValueChange={(val) => handleSelectChange('categoryId', val || '')}>
                  <SelectTrigger className="h-10 text-xs border-hairline focus:ring-primary rounded-lg text-charcoal font-medium bg-white">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-hairline rounded-lg">
                    {refData?.categories.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()} className="text-xs hover:bg-cloud/55">{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Thương hiệu</label>
                <Select value={formData.brandId} onValueChange={(val) => handleSelectChange('brandId', val || '')}>
                  <SelectTrigger className="h-10 text-xs border-hairline focus:ring-primary rounded-lg text-charcoal font-medium bg-white">
                    <SelectValue placeholder="Chọn thương hiệu (tùy chọn)" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-hairline rounded-lg">
                    <SelectItem value="none" className="text-xs hover:bg-cloud/55">-- Không chọn --</SelectItem>
                    {refData?.brands.map((b) => (
                      <SelectItem key={b.id} value={b.id.toString()} className="text-xs hover:bg-cloud/55">{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Nhà sản xuất</label>
                <Select value={formData.manufacturerId} onValueChange={(val) => handleSelectChange('manufacturerId', val || '')}>
                  <SelectTrigger className="h-10 text-xs border-hairline focus:ring-primary rounded-lg text-charcoal font-medium bg-white">
                    <SelectValue placeholder="Chọn nhà sản xuất (tùy chọn)" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-hairline rounded-lg">
                    <SelectItem value="none" className="text-xs hover:bg-cloud/55">-- Không chọn --</SelectItem>
                    {refData?.manufacturers.map((m) => (
                      <SelectItem key={m.id} value={m.id.toString()} className="text-xs hover:bg-cloud/55">{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Giá bán (VNĐ) *</label>
                <Input
                  name="sellingPrice"
                  type="number"
                  min="1"
                  step="any"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  required
                  placeholder="Ví dụ: 15000"
                  className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Thông tin y tế */}
          <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden">
            <CardHeader className="bg-cloud/40 border-b border-hairline px-6 py-4">
              <CardTitle className="text-sm font-bold text-ink">Thông tin y tế</CardTitle>
              <CardDescription className="text-xs text-graphite">Chi tiết thuốc và dạng bào chế.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Mã thuốc (Medicine Code) *</label>
                <Input
                  name="medicineCode"
                  value={formData.medicineCode}
                  onChange={handleChange}
                  required
                  className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Số đăng ký</label>
                <Input
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  placeholder="VD: VD-12345-19"
                  className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Dạng bào chế *</label>
                <Select value={formData.dosageFormId} onValueChange={(val) => handleSelectChange('dosageFormId', val || '')}>
                  <SelectTrigger className="h-10 text-xs border-hairline focus:ring-primary rounded-lg text-charcoal font-medium bg-white">
                    <SelectValue placeholder="Chọn dạng bào chế" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-hairline rounded-lg">
                    {refData?.dosageForms.map((d) => (
                      <SelectItem key={d.id} value={d.id.toString()} className="text-xs hover:bg-cloud/55">{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Đơn vị tính *</label>
                <Select value={formData.medicineUnitId} onValueChange={(val) => handleSelectChange('medicineUnitId', val || '')}>
                  <SelectTrigger className="h-10 text-xs border-hairline focus:ring-primary rounded-lg text-charcoal font-medium bg-white">
                    <SelectValue placeholder="Chọn đơn vị tính" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border border-hairline rounded-lg">
                    {refData?.units.map((u) => (
                      <SelectItem key={u.id} value={u.id.toString()} className="text-xs hover:bg-cloud/55">{u.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Hạn sử dụng (tháng)</label>
                <Input
                  name="shelfLifeMonths"
                  type="number"
                  min="1"
                  value={formData.shelfLifeMonths}
                  onChange={handleChange}
                  placeholder="Ví dụ: 24"
                  className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                />
              </div>
              <div className="flex items-center space-x-2.5 pt-2">
                <Checkbox
                  id="prescription"
                  checked={formData.requiresPrescription}
                  onCheckedChange={(checked) => setFormData(p => ({ ...p, requiresPrescription: !!checked }))}
                  className="border-hairline rounded focus:ring-primary"
                />
                <label htmlFor="prescription" className="text-xs font-semibold text-charcoal leading-none select-none">
                  Thuốc kê đơn (Requires Prescription)
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Hoạt chất liên kết */}
          <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden md:col-span-2">
            <CardHeader className="bg-cloud/40 border-b border-hairline px-6 py-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold text-ink">Hoạt chất liên kết</CardTitle>
                <CardDescription className="text-xs text-graphite">Liên kết hoạt chất chính thức, chỉ định hàm lượng và ghi chú.</CardDescription>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedIngredients([...selectedIngredients, { activeIngredientId: '', strength: '', note: '' }])}
                className="border-primary text-primary hover:bg-primary/5 text-xs font-bold h-8 flex items-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Thêm hoạt chất
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {selectedIngredients.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-hairline rounded-lg text-graphite text-xs">
                  Chưa có hoạt chất nào được liên kết. Nhấn nút &quot;Thêm hoạt chất&quot; để bắt đầu.
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedIngredients.map((item, index) => (
                    <div key={index} className="flex flex-col md:flex-row items-start md:items-center gap-3 pb-4 border-b border-hairline last:border-0 last:pb-0">
                      <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="grid gap-1">
                          <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider">Hoạt chất *</label>
                          <Select
                            value={item.activeIngredientId}
                            onValueChange={(val) => {
                              const newIngredients = [...selectedIngredients];
                              newIngredients[index].activeIngredientId = val || '';
                              setSelectedIngredients(newIngredients);
                            }}
                          >
                            <SelectTrigger className="h-9 text-xs border-hairline focus:ring-primary rounded-lg text-charcoal font-medium bg-white">
                              <SelectValue placeholder="Chọn hoạt chất" />
                            </SelectTrigger>
                            <SelectContent className="bg-white border border-hairline rounded-lg max-h-[200px] overflow-y-auto">
                              {getFilteredOptions(index).map((ai) => (
                                <SelectItem key={ai.id} value={ai.id.toString()} className="text-xs hover:bg-cloud/55">
                                  {ai.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="grid gap-1">
                          <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider">Hàm lượng *</label>
                          <Input
                            value={item.strength}
                            onChange={(e) => {
                              const newIngredients = [...selectedIngredients];
                              newIngredients[index].strength = e.target.value;
                              setSelectedIngredients(newIngredients);
                            }}
                            placeholder="Ví dụ: 500mg"
                            required
                            className="h-9 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                          />
                        </div>

                        <div className="grid gap-1">
                          <label className="text-[10px] font-bold text-charcoal uppercase tracking-wider">Ghi chú</label>
                          <Input
                            value={item.note}
                            onChange={(e) => {
                              const newIngredients = [...selectedIngredients];
                              newIngredients[index].note = e.target.value;
                              setSelectedIngredients(newIngredients);
                            }}
                            placeholder="Ví dụ: Dạng khan"
                            className="h-9 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                          />
                        </div>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newIngredients = selectedIngredients.filter((_, idx) => idx !== index);
                          setSelectedIngredients(newIngredients);
                        }}
                        className="text-error hover:text-error-deep hover:bg-bloom-rose/10 h-9 w-9 mt-0 md:mt-5 shrink-0 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Thuyết minh thêm */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden">
            <CardHeader className="bg-cloud/40 border-b border-hairline px-6 py-4">
              <CardTitle className="text-sm font-bold text-ink">Mô tả & Hướng dẫn</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Mô tả ngắn</label>
                <Input
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Mô tả tóm tắt..."
                  className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Mô tả chi tiết</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Mô tả đầy đủ về công dụng..."
                  className="min-h-[100px] p-3 text-xs border border-hairline focus-visible:ring-primary rounded-lg bg-white text-charcoal font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="grid gap-1.5">
                <label className="text-xs font-bold text-charcoal uppercase tracking-wider">Hướng dẫn sử dụng</label>
                <textarea
                  name="usageNote"
                  value={formData.usageNote}
                  onChange={handleChange}
                  placeholder="Cách dùng, liều lượng..."
                  className="min-h-[80px] p-3 text-xs border border-hairline focus-visible:ring-primary rounded-lg bg-white text-charcoal font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="border-hairline text-xs font-bold h-10 hover:bg-fog px-6"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary-deep text-white text-xs font-bold h-10 px-6 shadow-sm flex items-center gap-2"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Lưu Thay Đổi
          </Button>
        </div>
      </form>
    </div>
  );
}
