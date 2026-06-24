'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import api from '@/lib/api';
import { useInView } from 'react-intersection-observer';
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
import { 
  User, 
  Shield, 
  Package, 
  AlertTriangle, 
  ArrowUpDown, 
  Edit3, 
  Check, 
  Search, 
  Loader2, 
  CheckCircle2, 
  PackageX, 
  TrendingDown,
  Warehouse
} from 'lucide-react';

interface InventoryItem {
  id: number;
  warehouseId: number;
  storeId: number;
  productVariantId: number;
  quantity: number;
  sellableQuantity: number;
  reservedQuantity: number;
  minQuantity: number;
  isLowStock: boolean;
  totalBatches: number;
  nearExpiryBatchesCount: number;
  expiredBatchesCount: number;
  updatedAt: string;
  productVariant: {
    id: number;
    sku: string;
    barcode: string | null;
    variantName: string;
    unit: {
      id: number;
      name: string;
    };
    product: {
      id: number;
      name: string;
      category: {
        id: number;
        name: string;
      };
    };
  };
  store: {
    id: number;
    name: string;
  };
  warehouse: {
    id: number;
    name: string;
  };
}

export default function InventoryPage() {
  const { user } = useAuth();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL'); // ALL, LOW, OUT, OK
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [stats, setStats] = useState({
    totalItems: 0,
    outOfStockCount: 0,
    lowStockCount: 0,
    normalStockCount: 0
  });
  const { ref, inView } = useInView();
  
  // Alerts
  const [errorAlert, setErrorAlert] = useState<string | null>(null);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);

  // Dialog State
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  
  // Form input states
  const [newMinQuantity, setNewMinQuantity] = useState(10);

  async function fetchInventory(currentPage = 1, reset = false) {
    if (currentPage === 1) setLoading(true);
    setErrorAlert(null);
    try {
      const response = await api.get('/inventories', {
        params: {
          page: currentPage,
          limit: 20,
          search: searchQuery,
          status: statusFilter
        }
      });
      
      const { data, stats: newStats, page: resPage } = response.data;
      
      if (reset) {
        setInventory(data);
      } else {
        setInventory(prev => {
          // Prevent duplicates if API returns same data due to strict mode double fetch
          const existingIds = new Set(prev.map(i => i.id));
          const newItems = data.filter((i: InventoryItem) => !existingIds.has(i.id));
          return [...prev, ...newItems];
        });
      }
      
      setStats(newStats);
      setHasMore(data.length === 20);
    } catch (err) {
      console.error('Failed to fetch inventory:', err);
      const errorMsg = (err as any).response?.data?.message || 'Không thể tải dữ liệu tồn kho.';
      setErrorAlert(errorMsg);
    } finally {
      if (currentPage === 1) setLoading(false);
    }
  }

  // Trigger search/filter change
  useEffect(() => {
    setPage(1);
    fetchInventory(1, true);
  }, [searchQuery, statusFilter]);

  // Load more when scrolled to bottom
  useEffect(() => {
    if (inView && hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchInventory(nextPage, false);
    }
  }, [inView, hasMore, loading]);

  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : 'Quản lý kho';

  // Calculate statistics from backend
  const { totalItems, outOfStockCount, lowStockCount, normalStockCount } = stats;

  const handleOpenUpdate = (item: InventoryItem) => {
    setSelectedItem(item);
    setNewMinQuantity(item.minQuantity);
    setIsUpdateOpen(true);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedItem) return;
    
    setUpdateLoading(true);
    setErrorAlert(null);
    setSuccessAlert(null);

    try {
      await api.put(`/inventories/${selectedItem.id}`, {
        minQuantity: newMinQuantity,
      });

      setSuccessAlert(`Đã điều chỉnh tồn kho cho "${selectedItem.productVariant.product.name} (${selectedItem.productVariant.variantName})" thành công.`);
      setIsUpdateOpen(false);
      
      // Update item in local state
      setInventory(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { ...item, minQuantity: newMinQuantity, isLowStock: item.quantity <= newMinQuantity } 
          : item
      ));
    } catch (err) {
      console.error('Update inventory failed:', err);
      const errorMsg = (err as any).response?.data?.message || 'Đã xảy ra lỗi khi điều chỉnh tồn kho.';
      setErrorAlert(errorMsg);
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <RouteGuard allowedPermissions={['VIEW_INVENTORY']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        {/* Dynamic Sidebar based on roles */}
        <Sidebar currentPath="/inventory" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <Warehouse className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-bold text-ink uppercase tracking-wider">
                Quản lý Tồn kho & Hạn dùng
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
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-primary-soft text-primary-deep rounded-xl">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-graphite uppercase tracking-wider">Tổng sản phẩm</p>
                    <h3 className="text-2xl font-bold text-ink mt-0.5">{totalItems}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-bloom-rose text-error-deep rounded-xl">
                    <PackageX className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-graphite uppercase tracking-wider">Hết hàng (Out)</p>
                    <h3 className="text-2xl font-bold text-error-deep mt-0.5">{outOfStockCount}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-warning"></div>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-amber-50 text-warning-deep rounded-xl">
                    <TrendingDown className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-graphite uppercase tracking-wider">Sắp hết hàng</p>
                    <h3 className="text-2xl font-bold text-warning-deep mt-0.5">{lowStockCount}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-graphite uppercase tracking-wider">Tồn kho an toàn</p>
                    <h3 className="text-2xl font-bold text-emerald-700 mt-0.5">{normalStockCount}</h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notification Alerts */}
            {errorAlert && (
              <Alert variant="destructive" className="bg-bloom-rose/25 border-error/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-error" />
                <AlertTitle className="font-bold text-error">Lỗi xảy ra</AlertTitle>
                <AlertDescription className="text-error-deep text-xs font-medium">{errorAlert}</AlertDescription>
              </Alert>
            )}

            {successAlert && (
              <Alert className="bg-emerald-50/70 border-emerald-500/20 rounded-lg">
                <Check className="h-4 w-4 text-emerald-600" />
                <AlertTitle className="font-bold text-emerald-800">Thành công</AlertTitle>
                <AlertDescription className="text-emerald-700 text-xs font-medium">{successAlert}</AlertDescription>
              </Alert>
            )}

            {/* Filtering Tools */}
            <Card className="bg-white border border-hairline rounded-xl shadow-xs">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-graphite" />
                  <Input
                    placeholder="Tìm theo biệt dược, tên biến thể, mã SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                  />
                </div>

                <div className="flex gap-3 w-full md:w-auto shrink-0">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full md:w-56 h-10 border border-hairline rounded-lg px-3 text-xs text-charcoal bg-white font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="ALL">Mức độ tồn kho: Tất cả</option>
                    <option value="OK">Đủ hàng (Tồn an toàn)</option>
                    <option value="LOW">Cảnh báo: Sắp hết hàng</option>
                    <option value="OUT">Nguy cấp: Hết hàng</option>
                    <option value="NEAR_EXPIRY">Cảnh báo: Sắp hết hạn</option>
                    <option value="EXPIRED">Nguy cấp: Đã hết hạn</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Inventory Table */}
            <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-xs text-graphite font-medium">Đang tải dữ liệu tồn kho...</p>
                  </div>
                ) : inventory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center p-6">
                    <span className="text-4xl mb-3">📦</span>
                    <h3 className="font-bold text-ink text-sm">Không tìm thấy sản phẩm tồn kho</h3>
                    <p className="text-xs text-graphite max-w-xs mt-1">
                      Không có mặt hàng nào phù hợp với bộ lọc tìm kiếm hiện tại của bạn.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-cloud border-b border-hairline">
                        <TableRow>
                          <TableHead className="text-xs font-bold text-ink py-3.5 pl-6">Mã SKU</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Biệt dược / Tên biến thể</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Danh mục</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Kho lưu trữ</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5 text-center">Số lượng tồn</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5 text-center">Ngưỡng tối thiểu</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Đơn vị</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Cảnh báo</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5 pr-6 text-right w-[100px]">Hành động</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-hairline">
                        {inventory.map((item) => {
                          const isOutOfStock = item.quantity === 0;
                          const isLowStock = item.isLowStock;
                          const hasExpired = item.expiredBatchesCount > 0;
                          const hasNearExpiry = item.nearExpiryBatchesCount > 0;
                          
                          let statusBadge = (
                            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-500/10 font-bold text-[10px] px-2 py-0.5 shadow-xs">
                              An toàn
                            </Badge>
                          );
                          if (isOutOfStock) {
                            statusBadge = (
                              <Badge className="bg-bloom-rose text-error-deep border border-error/15 font-bold text-[10px] px-2 py-0.5 shadow-xs">
                                Hết hàng
                              </Badge>
                            );
                          } else if (isLowStock) {
                            statusBadge = (
                              <Badge className="bg-amber-50 text-warning-deep border border-warning/15 font-bold text-[10px] px-2 py-0.5 shadow-xs">
                                Sắp hết hàng
                              </Badge>
                            );
                          }

                          let expiryBadge = null;
                          if (hasExpired) {
                            expiryBadge = (
                              <Badge className="bg-bloom-rose text-error-deep border border-error/15 font-bold text-[10px] px-2 py-0.5 shadow-xs ml-1 mt-1">
                                Lô hết hạn ({item.expiredBatchesCount})
                              </Badge>
                            );
                          } else if (hasNearExpiry) {
                            expiryBadge = (
                              <Badge className="bg-amber-50 text-warning-deep border border-warning/15 font-bold text-[10px] px-2 py-0.5 shadow-xs ml-1 mt-1">
                                Lô sắp hết hạn ({item.nearExpiryBatchesCount})
                              </Badge>
                            );
                          }

                          return (
                            <TableRow key={item.id} className="hover:bg-cloud/40 transition-colors">
                              <TableCell className="font-semibold text-xs text-charcoal py-4 pl-6">
                                {item.productVariant?.sku}
                              </TableCell>
                              <TableCell className="py-4">
                                <div className="space-y-0.5">
                                  <p className="font-bold text-ink text-xs line-clamp-1">
                                    {item.productVariant?.product?.name}
                                  </p>
                                  <p className="text-[10px] text-graphite font-semibold">
                                    Biến thể: {item.productVariant?.variantName}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="text-xs text-charcoal font-medium py-4">
                                {item.productVariant?.product?.category?.name || '—'}
                              </TableCell>
                              <TableCell className="py-4">
                                <div className="space-y-0.5">
                                  <p className="text-xs text-ink font-semibold">{item.warehouse?.name}</p>
                                  <p className="text-[9px] text-graphite font-medium">Thuộc: {item.store?.name}</p>
                                </div>
                              </TableCell>
                              <TableCell className="text-xs font-bold text-center py-4">
                                <span className={isOutOfStock ? 'text-error-deep' : isLowStock ? 'text-warning-deep' : 'text-ink'}>
                                  {item.quantity}
                                </span>
                              </TableCell>
                              <TableCell className="text-xs text-charcoal text-center font-semibold py-4">
                                {item.minQuantity}
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge variant="outline" className="text-[10px] font-medium border-hairline text-charcoal">
                                  {item.productVariant?.unit?.name}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4">
                                <div className="flex flex-col items-start gap-1">
                                  {statusBadge}
                                  {expiryBadge}
                                </div>
                              </TableCell>
                              <TableCell className="py-4 pr-6 text-right">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => window.location.href = `/inventory/${item.id}/batches`}
                                    className="h-8 w-8 text-primary hover:text-primary-deep hover:bg-primary-soft rounded-lg"
                                    title="Xem chi tiết Lô thuốc"
                                  >
                                    <Package className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleOpenUpdate(item)}
                                    className="h-8 w-8 text-primary hover:text-primary-deep hover:bg-primary-soft rounded-lg"
                                    title="Điều chỉnh ngưỡng tồn"
                                  >
                                    <Edit3 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                    
                    {/* Infinite Scroll Trigger */}
                    {hasMore && (
                      <div ref={ref} className="py-6 flex justify-center items-center w-full">
                        <Loader2 className="h-6 w-6 text-primary animate-spin" />
                        <span className="ml-2 text-xs text-graphite font-medium">Đang tải thêm...</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      {/* Adjust Inventory Dialog */}
      {selectedItem && (
        <Dialog open={isUpdateOpen} onOpenChange={() => setIsUpdateOpen(false)}>
          <DialogContent className="max-w-md bg-white border border-hairline rounded-xl shadow-lg p-0 overflow-hidden font-sans">
            <DialogHeader className="p-6 bg-cloud border-b border-hairline flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                <DialogTitle className="text-base font-bold text-ink">
                  Điều chỉnh Tồn kho
                </DialogTitle>
              </div>
            </DialogHeader>

            <form onSubmit={handleUpdateSubmit}>
              <div className="p-6 space-y-4">
                <div className="bg-primary-soft/40 p-4 rounded-lg border border-primary/10 space-y-1">
                  <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Dược phẩm / Biến thể</p>
                  <p className="text-xs font-bold text-ink">{selectedItem.productVariant.product.name}</p>
                  <p className="text-[10px] text-charcoal">
                    Biến thể: <span className="font-semibold">{selectedItem.productVariant.variantName}</span> | SKU: <span className="font-semibold">{selectedItem.productVariant.sku}</span>
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-charcoal">Ngưỡng tồn tối thiểu mới (Cảnh báo hết hàng)</label>
                    <Input
                      type="number"
                      min="1"
                      value={newMinQuantity}
                      onChange={(e) => setNewMinQuantity(parseInt(e.target.value) || 0)}
                      required
                      className="h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg font-semibold"
                    />
                    <p className="text-[10px] text-graphite">Trước điều chỉnh: {selectedItem.minQuantity}</p>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                  <p className="text-[10px] text-warning-deep leading-relaxed">
                    <strong>Lưu ý:</strong> Hành động này sẽ được hệ thống tự động ghi nhật ký vào lịch sử biến động kho (Stock Movements) phục vụ quy trình đối soát dữ liệu.
                  </p>
                </div>
              </div>

              <DialogFooter className="p-4 bg-cloud border-t border-hairline flex gap-2 justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsUpdateOpen(false)}
                  className="border-hairline text-xs font-bold h-9 hover:bg-fog"
                  disabled={updateLoading}
                >
                  Hủy bỏ
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary-deep text-white text-xs font-bold h-9"
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <div className="flex items-center gap-1.5">
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Đang cập nhật...
                    </div>
                  ) : (
                    'Lưu thay đổi'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </RouteGuard>
  );
}
