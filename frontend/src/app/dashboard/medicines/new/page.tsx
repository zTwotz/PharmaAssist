'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface ReferenceData {
  categories: { id: number; name: string }[];
  units: { id: number; name: string }[];
  dosageForms: { id: number; name: string }[];
  brands: { id: number; name: string }[];
  manufacturers: { id: number; name: string }[];
}

export default function NewMedicinePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [refData, setRefData] = useState<ReferenceData | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    categoryId: '',
    brandId: '',
    manufacturerId: '',
    shortDescription: '',
    medicineCode: '',
    registrationNumber: '',
    dosageFormId: '',
    medicineUnitId: '',
    requiresPrescription: false,
    usageNote: '',
  });

  useEffect(() => {
    const fetchRefData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/medicines/reference-data`);
        if (res.ok) {
          const data = await res.json();
          setRefData(data);
        }
      } catch (error) {
        console.error('Failed to fetch reference data', error);
      }
    };
    fetchRefData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Auto-fill medicineCode if code is typed
    if (name === 'code') {
      setFormData((prev) => ({ ...prev, medicineCode: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = getCookie('token');
      
      const payload = {
        ...formData,
        categoryId: parseInt(formData.categoryId),
        brandId: formData.brandId ? parseInt(formData.brandId) : undefined,
        manufacturerId: formData.manufacturerId ? parseInt(formData.manufacturerId) : undefined,
        dosageFormId: parseInt(formData.dosageFormId),
        medicineUnitId: parseInt(formData.medicineUnitId),
      };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/medicines`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Đã thêm thuốc mới thành công.');
        router.push('/dashboard/medicines');
      } else {
        const err = await res.json();
        alert(`Lỗi: ${err.message || 'Không thể thêm thuốc.'}`);
      }
    } catch (error) {
      alert('Lỗi hệ thống. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Thêm Thuốc Mới</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Thông tin chung */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin chung</CardTitle>
              <CardDescription>Các thông tin cơ bản về sản phẩm.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Mã sản phẩm *</label>
                <Input name="code" value={formData.code} onChange={handleChange} required placeholder="Ví dụ: PAN01" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Tên sản phẩm *</label>
                <Input name="name" value={formData.name} onChange={handleChange} required placeholder="Ví dụ: Panadol Extra" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Danh mục *</label>
                <Select value={formData.categoryId} onValueChange={(val) => handleSelectChange('categoryId', val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    {refData?.categories.map((c) => (
                      <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Thương hiệu</label>
                <Select value={formData.brandId} onValueChange={(val) => handleSelectChange('brandId', val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn thương hiệu (tùy chọn)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">-- Không chọn --</SelectItem>
                    {refData?.brands.map((b) => (
                      <SelectItem key={b.id} value={b.id.toString()}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Thông tin y tế */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin y tế</CardTitle>
              <CardDescription>Chi tiết thuốc và dạng bào chế.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Mã thuốc (Medicine Code) *</label>
                <Input name="medicineCode" value={formData.medicineCode} onChange={handleChange} required />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Số đăng ký</label>
                <Input name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="VD: VD-12345-19" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Dạng bào chế *</label>
                <Select value={formData.dosageFormId} onValueChange={(val) => handleSelectChange('dosageFormId', val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn dạng bào chế" />
                  </SelectTrigger>
                  <SelectContent>
                    {refData?.dosageForms.map((d) => (
                      <SelectItem key={d.id} value={d.id.toString()}>{d.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Đơn vị tính *</label>
                <Select value={formData.medicineUnitId} onValueChange={(val) => handleSelectChange('medicineUnitId', val || '')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn đơn vị tính" />
                  </SelectTrigger>
                  <SelectContent>
                    {refData?.units.map((u) => (
                      <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox 
                  id="prescription" 
                  checked={formData.requiresPrescription} 
                  onCheckedChange={(checked) => setFormData(p => ({ ...p, requiresPrescription: !!checked }))}
                />
                <label htmlFor="prescription" className="text-sm font-medium leading-none">
                  Thuốc kê đơn (Requires Prescription)
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>Hủy</Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Lưu Thuốc'}
          </Button>
        </div>
      </form>
    </div>
  );
}
