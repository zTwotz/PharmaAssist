'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  User, 
  Shield, 
  Receipt, 
  Search, 
  Loader2, 
  AlertTriangle, 
  Printer, 
  FileText, 
  X, 
  Calendar, 
  DollarSign, 
  ShoppingCart,
  Eye
} from 'lucide-react';

interface OrderDetail {
  id: number;
  productVariantId: number;
  quantity: number;
  unitPrice: string | number;
  lineTotal: string | number;
  productVariant: {
    id: number;
    sku: string;
    variantName: string;
    unit: {
      name: string;
    };
    product: {
      name: string;
    };
  };
}

interface Order {
  id: number;
  code: string;
  customerId: number | null;
  staffUserId: string | null;
  storeId: number;
  orderType: string;
  status: string;
  subtotal: string | number;
  discountAmount: string | number;
  shippingFee: string | number;
  totalAmount: string | number;
  createdAt: string;
  details: OrderDetail[];
  customer: {
    id: number;
    fullName: string;
    phone: string | null;
  } | null;
  staff: {
    id: string;
    fullName: string;
    email: string;
  } | null;
}

export default function SalesPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL'); // ALL, RETAIL, POS
  const [errorAlert, setErrorAlert] = useState<string | null>(null);

  // Detail Modal State
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setErrorAlert(null);
    try {
      const response = await api.get('/orders');
      setOrders(response.data);
    } catch (err: any) {
      console.error('Failed to fetch orders:', err);
      setErrorAlert(err.response?.data?.message || 'Không thể tải lịch sử hóa đơn bán hàng.');
    } finally {
      setLoading(false);
    }
  };

  const displayRole = user?.roles?.includes('ADMIN') 
    ? 'Quản trị viên' 
    : 'Nhân viên bán hàng';

  // Calculate statistics
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const codeMatch = order.code?.toLowerCase().includes(searchQuery.toLowerCase());
    const staffMatch = order.staff?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       order.staff?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const customerMatch = order.customer?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer?.phone?.includes(searchQuery);
    
    const matchesSearch = codeMatch || staffMatch || customerMatch;
    const matchesType = typeFilter === 'ALL' || order.orderType === typeFilter;

    return matchesSearch && matchesType;
  });

  const handlePrint = () => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden !important;
        }
        #print-invoice-area, #print-invoice-area * {
          visibility: visible !important;
        }
        #print-invoice-area {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 80mm !important;
          margin: 0 !important;
          padding: 10px !important;
          box-shadow: none !important;
          background: white !important;
          color: black !important;
          font-family: 'Courier New', Courier, monospace !important;
          font-size: 11px !important;
        }
      }
    `;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1000);
  };

  return (
    <RouteGuard allowedPermissions={['CREATE_ORDER']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        {/* Dynamic Sidebar based on roles */}
        <Sidebar currentPath="/sales" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
            <div className="flex items-center gap-3">
              <Receipt className="h-6 w-6 text-primary" />
              <h1 className="text-lg font-bold text-ink uppercase tracking-wider">
                Lịch sử Hóa đơn & Doanh thu
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

          <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-[1366px] w-full mx-auto animate-fade-in duration-200">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-primary-soft text-primary-deep rounded-xl">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-graphite uppercase tracking-wider">Doanh thu bán lẻ</p>
                    <h3 className="text-2xl font-bold text-ink mt-0.5">
                      {totalRevenue.toLocaleString('vi-VN')} đ
                    </h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-graphite uppercase tracking-wider">Tổng số đơn hàng</p>
                    <h3 className="text-2xl font-bold text-emerald-700 mt-0.5">{totalOrders}</h3>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-warning"></div>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="p-3 bg-amber-50 text-warning-deep rounded-xl">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-graphite uppercase tracking-wider font-sans">Giá trị đơn trung bình</p>
                    <h3 className="text-2xl font-bold text-warning-deep mt-0.5">
                      {Math.round(averageOrderValue).toLocaleString('vi-VN')} đ
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </div>

            {errorAlert && (
              <Alert variant="destructive" className="bg-bloom-rose/25 border-error/20 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-error" />
                <AlertTitle className="font-bold text-error">Lỗi kết nối</AlertTitle>
                <AlertDescription className="text-error-deep text-xs font-medium">{errorAlert}</AlertDescription>
              </Alert>
            )}

            {/* Filtering Section */}
            <Card className="bg-white border border-hairline rounded-xl shadow-xs">
              <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-graphite" />
                  <Input
                    placeholder="Tìm kiếm theo mã hóa đơn, tên khách hàng, SĐT, hoặc dược sĩ phụ trách..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-10 text-xs border-hairline focus-visible:ring-primary rounded-lg"
                  />
                </div>

                <div className="flex gap-3 w-full md:w-auto shrink-0">
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full md:w-48 h-10 border border-hairline rounded-lg px-3 text-xs text-charcoal bg-white font-medium focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="ALL">Kênh bán: Tất cả</option>
                    <option value="POS">Tại quầy (POS)</option>
                    <option value="ONLINE">Trực tuyến (Online)</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Orders Table */}
            <Card className="bg-white border border-hairline rounded-xl shadow-xs overflow-hidden">
              <CardContent className="p-0">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    <p className="text-xs text-graphite font-medium">Đang tải lịch sử giao dịch...</p>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center p-6">
                    <span className="text-4xl mb-3">📄</span>
                    <h3 className="font-bold text-ink text-sm">Không tìm thấy hóa đơn nào</h3>
                    <p className="text-xs text-graphite max-w-xs mt-1">
                      Chưa phát sinh giao dịch nào hoặc không có hóa đơn nào khớp với bộ lọc của bạn.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader className="bg-cloud border-b border-hairline">
                        <TableRow>
                          <TableHead className="text-xs font-bold text-ink py-3.5 pl-6">Mã hóa đơn</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Thời gian</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Khách hàng</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Dược sĩ phụ trách</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Kênh bán</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5">Trạng thái</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5 text-right">Tổng thanh toán</TableHead>
                          <TableHead className="text-xs font-bold text-ink py-3.5 pr-6 text-right w-[100px]">Chi tiết</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody className="divide-y divide-hairline">
                        {filteredOrders.map((order) => {
                          const formattedDate = new Date(order.createdAt).toLocaleString('vi-VN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          });

                          return (
                            <TableRow key={order.id} className="hover:bg-cloud/40 transition-colors">
                              <TableCell className="font-bold text-xs text-primary py-4 pl-6">
                                {order.code}
                              </TableCell>
                              <TableCell className="text-xs text-charcoal font-medium py-4">
                                {formattedDate}
                              </TableCell>
                              <TableCell className="text-xs text-charcoal font-semibold py-4">
                                {order.customer ? (
                                  <div>
                                    <p className="font-bold text-ink">{order.customer.fullName}</p>
                                    {order.customer.phone && <p className="text-[10px] text-graphite">{order.customer.phone}</p>}
                                  </div>
                                ) : (
                                  <span className="text-graphite font-normal italic">Khách vãng lai</span>
                                )}
                              </TableCell>
                              <TableCell className="text-xs text-charcoal py-4">
                                {order.staff ? (
                                  <div>
                                    <p className="font-bold text-ink">{order.staff.fullName}</p>
                                    <p className="text-[9px] text-graphite font-mono">{order.staff.email}</p>
                                  </div>
                                ) : (
                                  <span className="text-graphite italic font-normal">Hệ thống</span>
                                )}
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge className={`font-bold text-[10px] px-2 py-0.5 rounded shadow-xs ${
                                  order.orderType === 'POS' 
                                    ? 'bg-blue-50 text-blue-700 border border-blue-500/10' 
                                    : 'bg-indigo-50 text-indigo-700 border border-indigo-500/10'
                                }`}>
                                  {order.orderType === 'POS' ? 'Tại quầy (POS)' : 'Trực tuyến'}
                                </Badge>
                              </TableCell>
                              <TableCell className="py-4">
                                <Badge className={`font-semibold text-[10px] px-2 py-0.5 border shadow-xs ${
                                  order.status === 'COMPLETED'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-500/15'
                                    : 'bg-amber-50 text-warning-deep border-warning-500/15'
                                }`}>
                                  {order.status === 'COMPLETED' ? 'Hoàn thành' : 'Chờ xử lý'}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-xs font-bold text-ink py-4 text-right">
                                {Number(order.totalAmount).toLocaleString('vi-VN')} đ
                              </TableCell>
                              <TableCell className="py-4 pr-6 text-right">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setSelectedOrder(order)}
                                  className="h-8 w-8 text-primary hover:text-primary-deep hover:bg-primary-soft rounded-lg"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
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
          </main>
        </div>
      </div>

      {/* Invoice Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="sm:max-w-[500px] bg-white border border-hairline rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh] font-sans">
            
            <DialogHeader className="flex flex-row items-center justify-between pb-4 border-b border-hairline">
              <div className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-primary" />
                <DialogTitle className="text-base font-bold text-ink">
                  Chi Tiết Hóa Đơn
                </DialogTitle>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedOrder(null)}
                className="h-8 w-8 text-graphite hover:text-ink hover:bg-fog rounded-full shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>

            <div className="py-4">
              <div 
                ref={printAreaRef} 
                id="print-invoice-area" 
                className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 max-w-[80mm] mx-auto text-xs text-slate-700"
              >
                {/* Pharmacy details */}
                <div className="text-center mb-4 pb-3 border-b border-dashed border-slate-300">
                  <h3 className="font-bold text-sm text-slate-800 uppercase tracking-tight">
                    Nhà thuốc PharmaAssist
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                    Địa chỉ: 123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Hotline: 1800 6868 (Miễn phí)
                  </p>
                </div>

                {/* Receipt title */}
                <div className="text-center mb-4">
                  <h4 className="font-bold text-xs text-slate-800 tracking-wider">
                    HÓA ĐƠN BÁN LẺ
                  </h4>
                  <p className="text-[9px] font-mono text-slate-500 mt-0.5">
                    Mã HĐ: {selectedOrder.code}
                  </p>
                  <p className="text-[9px] font-mono text-slate-500">
                    Thời gian: {new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}
                  </p>
                  {selectedOrder.staff && (
                    <p className="text-[9px] text-slate-500">
                      Thu ngân: {selectedOrder.staff.fullName}
                    </p>
                  )}
                  {selectedOrder.customer && (
                    <p className="text-[9px] text-slate-500">
                      Khách hàng: {selectedOrder.customer.fullName} ({selectedOrder.customer.phone || '—'})
                    </p>
                  )}
                </div>

                {/* Items table */}
                <table className="w-full text-[10px] mb-4 border-collapse">
                  <thead>
                    <tr className="border-b border-slate-300 text-slate-500">
                      <th className="text-left py-1 font-bold">Tên thuốc/SP</th>
                      <th className="text-center py-1 font-bold w-[35px]">SL</th>
                      <th className="text-right py-1 font-bold w-[65px]">Đ.Giá</th>
                      <th className="text-right py-1 font-bold w-[75px]">T.Tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.details.map((item, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-1.5 leading-snug">
                          <span className="font-medium text-slate-800 block">
                            {item.productVariant?.product?.name || 'Sản phẩm'}
                          </span>
                          <span className="text-[8px] text-slate-400 font-mono">
                            {item.productVariant?.sku} - {item.productVariant?.unit?.name}
                          </span>
                        </td>
                        <td className="text-center py-1.5 text-slate-800 font-mono">
                          {item.quantity}
                        </td>
                        <td className="text-right py-1.5 text-slate-600 font-mono">
                          {Number(item.unitPrice).toLocaleString('vi-VN')}
                        </td>
                        <td className="text-right py-1.5 text-slate-800 font-bold font-mono">
                          {Number(item.lineTotal).toLocaleString('vi-VN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Receipt Summary */}
                <div className="border-t border-dashed border-slate-300 pt-3 space-y-1.5 font-mono text-[10px]">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Tổng tiền hàng:</span>
                    <span>{Number(selectedOrder.subtotal).toLocaleString('vi-VN')} ₫</span>
                  </div>
                  {Number(selectedOrder.discountAmount) > 0 && (
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Chiết khấu:</span>
                      <span>-{Number(selectedOrder.discountAmount).toLocaleString('vi-VN')} ₫</span>
                    </div>
                  )}
                  {Number(selectedOrder.shippingFee) > 0 && (
                    <div className="flex justify-between items-center text-slate-600">
                      <span>Phí vận chuyển:</span>
                      <span>{Number(selectedOrder.shippingFee).toLocaleString('vi-VN')} ₫</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xs font-black text-slate-900 border-t border-slate-200 pt-1.5">
                    <span>THÀNH TIỀN:</span>
                    <span className="text-primary font-bold">{Number(selectedOrder.totalAmount).toLocaleString('vi-VN')} ₫</span>
                  </div>
                </div>

                {/* Note/Thank you */}
                <div className="text-center mt-6 pt-3 border-t border-dashed border-slate-300 text-[9px] text-slate-500 italic">
                  <p>Cảm ơn quý khách! Hẹn gặp lại!</p>
                  <p className="mt-0.5 font-mono not-italic text-[7px] text-slate-400">
                    Powered by PharmaAssist AI
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 border-t border-hairline pt-4">
              <Button 
                onClick={() => setSelectedOrder(null)} 
                variant="outline" 
                className="flex-1 rounded-xl h-10 text-slate-600 font-bold border-hairline hover:bg-slate-50 text-xs"
              >
                Đóng lại
              </Button>
              
              <Button 
                onClick={handlePrint} 
                className="flex-1 bg-primary hover:bg-primary-deep text-white font-bold rounded-xl h-10 text-xs flex items-center justify-center gap-1.5"
              >
                <Printer className="h-4 w-4" />
                In hóa đơn
              </Button>

              <Button 
                onClick={handlePrint} 
                variant="secondary"
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl h-10 border border-slate-200 text-xs flex items-center justify-center gap-1.5"
                title="Chọn 'Lưu dưới dạng PDF' trong hộp thoại in"
              >
                <FileText className="h-4 w-4" />
                Xuất PDF
              </Button>
            </DialogFooter>

          </DialogContent>
        </Dialog>
      )}
    </RouteGuard>
  );
}
