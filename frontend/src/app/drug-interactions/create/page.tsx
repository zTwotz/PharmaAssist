'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save } from 'lucide-react';

interface ActiveIngredient {
  id: number;
  name: string;
}

export default function CreateDrugInteractionPage() {
  const router = useRouter();
  const { hasRole } = useAuth();
  const [ingredients, setIngredients] = useState<ActiveIngredient[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    activeIngredientAId: '',
    activeIngredientBId: '',
    severity: 'LOW',
    description: '',
    recommendation: '',
  });

  useEffect(() => {
    if (!hasRole(['ADMIN', 'WAREHOUSE'])) {
      router.push('/dashboard');
      return;
    }
    fetchIngredients();
  }, [hasRole, router]);

  const fetchIngredients = async () => {
    try {
      const res = await api.get('/active-ingredients');
      setIngredients(res.data);
    } catch (error) {
      console.error(error);
      alert('Lỗi khi tải danh sách hoạt chất');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.activeIngredientAId || !formData.activeIngredientBId) {
      alert('Vui lòng chọn 2 hoạt chất');
      return;
    }
    if (formData.activeIngredientAId === formData.activeIngredientBId) {
      alert('Hoạt chất A và B không được giống nhau');
      return;
    }

    try {
      setIsLoading(true);
      await api.post('/interactions', {
        activeIngredientAId: Number(formData.activeIngredientAId),
        activeIngredientBId: Number(formData.activeIngredientBId),
        severity: formData.severity,
        description: formData.description,
        recommendation: formData.recommendation,
      });
      alert('Tạo luật tương tác thành công');
      router.push('/drug-interactions');
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi tạo luật tương tác');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center space-x-4 mb-6">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thêm luật tương tác mới</h1>
          <p className="text-sm text-gray-500">Thiết lập tương tác giữa hai hoạt chất</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Hoạt chất A <span className="text-red-500">*</span></label>
              <select
                name="activeIngredientAId"
                value={formData.activeIngredientAId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">-- Chọn hoạt chất --</option>
                {ingredients.map((ing) => (
                  <option key={ing.id} value={ing.id}>{ing.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Hoạt chất B <span className="text-red-500">*</span></label>
              <select
                name="activeIngredientBId"
                value={formData.activeIngredientBId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">-- Chọn hoạt chất --</option>
                {ingredients.map((ing) => (
                  <option key={ing.id} value={ing.id}>{ing.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Mức độ nghiêm trọng <span className="text-red-500">*</span></label>
            <select
              name="severity"
              value={formData.severity}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="LOW">Thấp (Low)</option>
              <option value="MEDIUM">Trung bình (Medium)</option>
              <option value="HIGH">Cao (High)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Mô tả tương tác</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Mô tả chi tiết về tương tác này..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Khuyến nghị xử lý</label>
            <textarea
              name="recommendation"
              value={formData.recommendation}
              onChange={handleChange}
              rows={3}
              placeholder="Khuyến nghị cho bác sĩ/dược sĩ..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="mr-3"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Đang lưu...' : 'Lưu luật tương tác'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
