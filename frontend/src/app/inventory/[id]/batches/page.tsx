'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import api from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  Calendar,
  Loader2,
  Box,
  Truck
} from 'lucide-react';
import Link from 'next/link';

interface BatchItem {
  id: number;
  batchNumber: string;
  expiryDate: string;
  manufactureDate: string | null;
  quantity: number;
  supplierId: number | null;
  warehouseId: number;
  supplier: { name: string } | null;
}

interface InventoryDetail {
  id: number;
  quantity: number;
  sellableQuantity: number;
  minQuantity: number;
  isLowStock: boolean;
  totalBatches: number;
  nearExpiryBatchesCount: number;
  expiredBatchesCount: number;
  productVariant: {
    sku: string;
    variantName: string;
    product: {
      name: string;
      category: {
        name: string;
      };
    };
    unit: {
      name: string;
    };
  };
  warehouse: {
    name: string;
  };
  store: {
    name: string;
  };
}

export default function BatchDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const [inventory, setInventory] = useState<InventoryDetail | null>(null);
  const [batches, setBatches] = useState<BatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [params.id]);

  const fetchData = async () => {
    setLoading(true);
    setErrorAlert(null);
    try {
      const [invRes, batchRes] = await Promise.all([
        api.get(`/inventories/${params.id}`),
        api.get(`/inventories/${params.id}/batches`)
      ]);
      setInventory(invRes.data);
      setBatches(batchRes.data);
    } catch (err) {
      console.error('Failed to fetch batch details:', err);
      const errorMsg = (err as any).response?.data?.message || 'Không thể tải dữ liệu chi tiết lô thuốc.';
      setErrorAlert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const isBatchExpired = (expiryDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const exp = new Date(expiryDate);
    return exp < today;
  };

  const isBatchNearExpiry = (expiryDate: string, thresholdDays = 90) => {
    if (isBatchExpired(expiryDate)) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const thresholdDate = new Date(today);
    thresholdDate.setDate(thresholdDate.getDate() + thresholdDays);
    const exp = new Date(expiryDate);
    return exp <= thresholdDate;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <RouteGuard allowedPermissions={['VIEW_INVENTORY']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        <Sidebar currentPath="/inventory" />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center px-8 shrink-0 shadow-sm z-10 gap-4">
            <Link href="/inventory">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-graphite hover:text-ink">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Box className="h-5 w-5 text-primary" />
              <h1 className="text-lg font-bold text-ink uppercase tracking-wider">
                Chi tiết Lô thuốc
              </h1>
            </div>
          </header>

          <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-[1000px] w-full mx-auto">
            {errorAlert && (
              <Alert variant="destructive" className="bg-bloom-rose/25 border-error/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-error" />
                <AlertTitle className="font-bold text-error">Lỗi xảy ra</AlertTitle>
                <AlertDescription className="text-error-deep text-xs font-medium">{errorAlert}</AlertDescription>
              </Alert>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-xs text-graphite font-medium">Đang tải dữ liệu...</p>
              </div>
            ) : inventory ? (
              <>
                {/* Header Information Card */}
                <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-primary uppercase tracking-wider">
                          {inventory.productVariant.product.category.name}
                        </p>
                        <h2 className="text-xl font-bold text-ink">{inventory.productVariant.product.name}</h2>
                        <p className="text-xs font-medium text-charcoal flex gap-2 items-center">
                          <span className="bg-cloud px-2 py-0.5 rounded-md border border-hairline">
                            SKU: {inventory.productVariant.sku}
                          </span>
                          <span>Biến thể: {inventory.productVariant.variantName}</span>
                        </p>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="bg-cloud border border-hairline rounded-lg p-3 text-center min-w-[100px]">
                          <p className="text-[10px] font-bold text-graphite uppercase">Tổng tồn (có thể bán)</p>
                          <p className={`text-2xl font-bold mt-1 ${inventory.isLowStock ? 'text-warning-deep' : 'text-primary'}`}>
                            {inventory.sellableQuantity}
                          </p>
                        </div>
                        <div className="bg-cloud border border-hairline rounded-lg p-3 text-center min-w-[100px]">
                          <p className="text-[10px] font-bold text-graphite uppercase">Lô hết hạn</p>
                          <p className={`text-2xl font-bold mt-1 ${inventory.expiredBatchesCount > 0 ? 'text-error-deep' : 'text-ink'}`}>
                            {inventory.expiredBatchesCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Batches Table */}
                <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden">
                  <div className="p-4 bg-cloud/50 border-b border-hairline flex items-center justify-between">
                    <h3 className="font-bold text-ink text-sm flex items-center gap-2">
                      <Package className="h-4 w-4 text-primary" />
                      Danh sách Lô thuộc tồn kho này
                    </h3>
                  </div>
                  <CardContent className="p-0">
                    {batches.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center p-6">
                        <Package className="h-10 w-10 text-graphite mb-3 opacity-20" />
                        <h3 className="font-bold text-ink text-sm">Chưa có lô hàng nào</h3>
                        <p className="text-xs text-graphite mt-1">
                          Hiện tại kho chưa ghi nhận lô hàng nào cho sản phẩm này.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader className="bg-cloud/50 border-b border-hairline">
                            <TableRow>
                              <TableHead className="text-xs font-bold text-ink py-3 pl-6">Số Lô (Batch)</TableHead>
                              <TableHead className="text-xs font-bold text-ink py-3">Hạn sử dụng</TableHead>
                              <TableHead className="text-xs font-bold text-ink py-3">Nhà cung cấp</TableHead>
                              <TableHead className="text-xs font-bold text-ink py-3 text-right">Số lượng tồn</TableHead>
                              <TableHead className="text-xs font-bold text-ink py-3 pl-6">Trạng thái</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody className="divide-y divide-hairline">
                            {batches.map((batch) => {
                              const expired = isBatchExpired(batch.expiryDate);
                              const nearExpiry = isBatchNearExpiry(batch.expiryDate);
                              
                              let statusBadge = (
                                <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-500/10 font-bold text-[10px] px-2 py-0.5 shadow-xs">
                                  <CheckCircle2 className="w-3 h-3 mr-1 inline" /> Có thể bán
                                </Badge>
                              );

                              if (expired) {
                                statusBadge = (
                                  <Badge className="bg-bloom-rose text-error-deep border border-error/15 font-bold text-[10px] px-2 py-0.5 shadow-xs">
                                    <AlertTriangle className="w-3 h-3 mr-1 inline" /> Đã hết hạn
                                  </Badge>
                                );
                              } else if (nearExpiry) {
                                statusBadge = (
                                  <Badge className="bg-amber-50 text-warning-deep border border-warning/15 font-bold text-[10px] px-2 py-0.5 shadow-xs">
                                    <Calendar className="w-3 h-3 mr-1 inline" /> Sắp hết hạn
                                  </Badge>
                                );
                              }

                              return (
                                <TableRow key={batch.id} className="hover:bg-cloud/40 transition-colors">
                                  <TableCell className="font-semibold text-xs text-charcoal py-4 pl-6">
                                    {batch.batchNumber}
                                  </TableCell>
                                  <TableCell className={`text-xs py-4 font-semibold ${expired ? 'text-error-deep' : nearExpiry ? 'text-warning-deep' : 'text-charcoal'}`}>
                                    {formatDate(batch.expiryDate)}
                                  </TableCell>
                                  <TableCell className="py-4">
                                    {batch.supplier ? (
                                      <span className="text-[10px] bg-fog px-2 py-1 rounded text-graphite font-medium flex items-center w-fit">
                                        <Truck className="w-3 h-3 mr-1" /> {batch.supplier.name}
                                      </span>
                                    ) : (
                                      <span className="text-xs text-graphite italic">—</span>
                                    )}
                                  </TableCell>
                                  <TableCell className="text-xs font-bold text-right py-4">
                                    {batch.quantity} {inventory.productVariant.unit.name}
                                  </TableCell>
                                  <TableCell className="py-4 pl-6">
                                    {statusBadge}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : null}
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
