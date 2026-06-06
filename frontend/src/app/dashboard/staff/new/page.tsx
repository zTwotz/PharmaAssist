'use client';

import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Hash, Shield, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CreateStaffPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    roleId: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    // Fetch roles from backend
    fetch('http://localhost:3001/roles', {
      // In a real app, you would pass the auth token here
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error('Failed to load roles:', err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        ...formData,
        roleId: Number(formData.roleId)
      };

      const res = await fetch('http://localhost:3001/users/staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Lỗi tạo tài khoản');
      }

      alert('Tạo nhân viên thành công!');
      router.push('/dashboard/staff');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Thêm nhân viên mới</h1>
          <p className="text-gray-500 mt-1">Tạo tài khoản và phân quyền cho nhân viên</p>
        </div>
        <Link 
          href="/dashboard" 
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Họ Tên */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Họ và tên</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent transition-all"
                  placeholder="Nguyễn Văn A"
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tên đăng nhập (Username)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Hash className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent transition-all"
                  placeholder="nguyenvana"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent transition-all"
                  placeholder="nguyenvana@gmail.com"
                />
              </div>
            </div>

            {/* Điện thoại */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent transition-all"
                  placeholder="0912345678"
                />
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Mật khẩu ban đầu</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent transition-all"
                  placeholder="Ít nhất 6 ký tự"
                />
              </div>
            </div>

            {/* Vai trò */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Phân quyền (Role)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="roleId"
                  value={formData.roleId}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full rounded-lg border border-gray-300 py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="" disabled>-- Chọn vai trò --</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-[#024ad8] text-white rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-100 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isLoading ? 'Đang tạo...' : 'Lưu tài khoản'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
