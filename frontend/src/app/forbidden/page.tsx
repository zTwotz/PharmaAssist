import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <div className="bg-red-100 p-4 rounded-full inline-flex mb-6">
          <ShieldAlert className="w-12 h-12 text-red-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Truy cập bị từ chối</h1>
        <p className="text-gray-600 mb-8">
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ quản trị viên nếu bạn cho rằng đây là một sự nhầm lẫn.
        </p>
        <Link href="/dashboard" passHref>
          <Button className="w-full sm:w-auto">Quay lại Tổng quan</Button>
        </Link>
      </div>
    </div>
  );
}
