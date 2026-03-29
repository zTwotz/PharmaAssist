'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
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
  User, 
  Shield, 
  Package, 
  AlertTriangle, 
  Search, 
  Loader2, 
  Warehouse,
  Plus,
  Eye
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface AdjustmentItem {
  id: number;
  code: string;
  storeId: number;
  createdById: string;
  status: string;
  reason: string | null;
  note: string | null;
  createdAt: string;
  confirmedAt: string | null;
  cancelledAt: string | null;
  createdBy: {
    id: string;
    fullName: string;
  };
  store: {
    id: number;
    name: string;
  };
  _count: {
    lines: number;
  };
}

export default function AdjustmentsPage() {
  const { user } = useAuth();
  const [adjustments, setAdjustments] = useState<AdjustmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  async function fetchAdjustments() {
    setLoading(true);
    setErrorAlert(null);
    try {
      const response = await api.get('/inventory/adjustments');
      setAdjustments(response.data);
    } catch (err) {
      console.error('Failed to fetch adjustments:', err);
      const errorMsg = (err as any).response?.data?.message || 'Không thể tải dữ liệu kiểm kho.';
      setErrorAlert(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdjustments();
  }, []);

  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : 'Quản lý kho';

  const filteredAdjustments = adjustments.filter((item) => {
    const codeMatch = item.code.toLowerCase().includes(searchQuery.toLowerCase());
    const reasonMatch = item.reason?.toLowerCase().includes(searchQuery.toLowerCase());
    return codeMatch || reasonMatch;
  });

  return (
    <RouteGuard allowedRoles={['ADMIN', 'WAREHOUSE']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        <Sidebar currentPath="/inventory/adjustments" />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <Warehouse className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-bold text-ink uppercase tracking-wider">
                Lịch sử Kiểm kho
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
            {errorAlert && (
              <Alert variant="destructive" className="bg-bloom-rose/25 border-error/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-error" />
                <AlertTitle className="font-bold text-error">Lỗi xảy ra</AlertTitle>
                <AlertDescription className="text-error-deep text-xs font-medium">{errorAlert}</AlertDescription>
              </Alert>
            )}

            <Card className="bg-white border border-hairline rounded-xl shadow-xs">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-graphite" />
                  <Input
                    placeholder="Tìm theo mã phiếu, lý do..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                  />
                </div>

                <div className="flex shrink-0">
                  <Link href="/inventory/adjustments/create">
                    <Button className="bg-primary hover:bg-primary-deep text-white text-xs font-bold h-10 rounded-lg shadow-sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Tạo phiếu kiểm kho
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-xs text-graphite font-medium">Đang tải dữ liệu kiểm kho...</p>
                  </div>
                ) : filteredAdjustments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center p-6">
                    <span className="text-4xl mb-3">📦</span>
                    <h3 className="font-bold text-ink text-sm">Không tìm thấy phiếu kiểm kho</h3>
                    <p className="text-xs text-graphite max-w-xs mt-1">
                      Chưa có phiếu kiểm kho nào hoặc không có dữ liệu phù hợp với tìm kiếm.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-cloud border-b border-hairline">
                        <TableRow>
                          <TableHead className="text-xs font-bold text-ink py-3.5 pl-6">Mã phiếu</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Trạng thái</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Người tạo</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Ngày tạo</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Số lượng dòng</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5 pr-6 text-right">Thao tác</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-hairline">
                        {filteredAdjustments.map((item) => (
                          <TableRow key={item.id} className="hover:bg-cloud/40 transition-colors">
                            <TableCell className="font-semibold text-xs text-primary py-4 pl-6">
                              {item.code}
                            </TableCell>
                            <TableCell className="py-4">
                              <Badge className={
                                item.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-emerald-500/10' :
                                item.status === 'DRAFT' ? 'bg-amber-50 text-warning-deep border-warning/15' :
                                'bg-slate-100 text-slate-700'
                              }>
                                {item.status === 'CONFIRMED' ? 'Đã xác nhận' : item.status === 'DRAFT' ? 'Bản nháp' : item.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-xs text-charcoal font-medium py-4">
                              {item.createdBy?.fullName || 'N/A'}
                            </TableCell>
                            <TableCell className="text-xs text-charcoal py-4">
                              {format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')}
                            </TableCell>
                            <TableCell className="text-xs text-charcoal py-4">
                              {item._count?.lines || 0} dòng
                            </TableCell>
                            <TableCell className="py-4 pr-6 text-right">
                              <Link href={`/inventory/adjustments/${item.id}`}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-primary hover:text-primary-deep hover:bg-primary-soft rounded-lg"
                                  title="Xem chi tiết"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </Link>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
