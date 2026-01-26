'use client';

import Link from 'next/link';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Shield, TrendingUp, ShoppingCart, Package, AlertTriangle, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from 'lucide-react';
import api from '@/lib/api';

interface DashboardStats {
  todayRevenue: number;
  todayOrderCount: number;
  totalSkuCount: number;
  lowStockCount: number;
  expiredCount: number;
  nearExpiryCount: number;
}

interface RecentOrder {
  id: number;
  code: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  customer?: { name: string } | null;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  loading,
  trend,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  loading: boolean;
  trend?: 'up' | 'down' | 'neutral';
}) {
  return (
    <Card className="bg-white border border-hairline rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden">
      {/* Accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${color}`} />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-5">
        <CardTitle className="text-xs font-semibold text-graphite uppercase tracking-wider">{title}</CardTitle>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color.replace('bg-', 'bg-').replace('-600', '-50').replace('-500', '-50')}`}>
          <Icon className={`h-5 w-5 ${color.replace('bg-', 'text-')}`} />
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        {loading ? (
          <div className="space-y-2">
            <div className="h-8 bg-slate-100 rounded-md animate-pulse w-3/4" />
            <div className="h-3 bg-slate-100 rounded animate-pulse w-1/2" />
          </div>
        ) : (
          <>
            <div className="flex items-end gap-2">
              <div className="text-2xl font-bold text-ink">{value}</div>
              {trend === 'up' && <ArrowUpRight className="h-4 w-4 text-emerald-500 mb-1" />}
              {trend === 'down' && <ArrowDownRight className="h-4 w-4 text-rose-500 mb-1" />}
            </div>
            <p className="text-xs text-graphite mt-0.5">{subtitle}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const displayRole = user?.roles?.includes('ADMIN')
    ? 'Quản trị viên'
    : user?.roles?.includes('WAREHOUSE')
    ? 'Quản lý kho'
    : 'Nhân viên bán hàng';

  const loadData = async () => {
    setLoading(true);
    try {
      const [statsRes, ordersRes] = await Promise.all([
        api.get('/orders/stats'),
        api.get('/orders'),
      ]);
      setStats(statsRes.data);
      // Show only the 5 most recent orders
      setRecentOrders((ordersRes.data as RecentOrder[]).slice(0, 5));
      setLastRefreshed(new Date());
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Auto-refresh every 60 seconds
    const interval = setInterval(loadData, 60_000);
    return () => clearInterval(interval);
  }, []);

  const statCards = [
    {
      title: 'Doanh thu hôm nay',
      value: stats ? formatCurrency(stats.todayRevenue) : '0 đ',
      subtitle: `${stats?.todayOrderCount ?? 0} hóa đơn đã thanh toán`,
      icon: TrendingUp,
      color: 'bg-blue-600',
      trend: 'up' as const,
    },
    {
      title: 'Số đơn bán ra',
      value: String(stats?.todayOrderCount ?? 0),
      subtitle: 'Đơn bán lẻ POS thành công hôm nay',
      icon: ShoppingCart,
      color: 'bg-violet-500',
      trend: 'neutral' as const,
    },
    {
      title: 'SKU trong kho',
      value: String(stats?.totalSkuCount ?? 0),
      subtitle: 'Biến thể đang còn tồn kho',
      icon: Package,
      color: 'bg-emerald-500',
      trend: 'neutral' as const,
    },
    {
      title: 'Cảnh báo tồn tối thiểu',
      value: String(stats?.lowStockCount ?? 0),
      subtitle: 'SKU dưới ngưỡng tồn kho tối thiểu',
      icon: AlertTriangle,
      color: stats && stats.lowStockCount > 0 ? 'bg-amber-500' : 'bg-slate-400',
      trend: stats && stats.lowStockCount > 0 ? ('down' as const) : ('neutral' as const),
    },
    {
      title: 'Cảnh báo hết hạn',
      value: String(stats?.expiredCount ?? 0),
      subtitle: 'Lô thuốc đã hết hạn sử dụng',
      icon: AlertTriangle,
      color: stats && stats.expiredCount > 0 ? 'bg-rose-600' : 'bg-slate-400',
      trend: stats && stats.expiredCount > 0 ? ('down' as const) : ('neutral' as const),
    },
    {
      title: 'Sắp hết hạn',
      value: String(stats?.nearExpiryCount ?? 0),
      subtitle: 'Lô thuốc sẽ hết hạn trong 90 ngày',
      icon: Clock,
      color: stats && stats.nearExpiryCount > 0 ? 'bg-orange-500' : 'bg-slate-400',
      trend: stats && stats.nearExpiryCount > 0 ? ('down' as const) : ('neutral' as const),
    },
  ];

  return (
    <RouteGuard allowedPermissions={['VIEW_DASHBOARD']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        <Sidebar currentPath="/dashboard" />

        <div className="flex-1 flex flex-col min-w-0">
          {/* Header */}
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8 sticky top-0 z-10">
            <h1 className="text-base font-bold text-ink uppercase tracking-wider">
              Tổng quan hệ thống
            </h1>
            <div className="flex items-center gap-4">
              {/* Last refreshed */}
              <button
                onClick={loadData}
                className="flex items-center gap-1.5 text-xs text-graphite hover:text-primary transition-colors"
                title="Làm mới số liệu"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">
                  Cập nhật lúc {lastRefreshed.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </button>
              {/* User chip */}
              <div className="flex items-center space-x-2 text-xs text-charcoal bg-cloud px-3 py-1.5 rounded-md border border-hairline">
                <User className="h-4 w-4 text-graphite" />
                <span className="font-medium truncate max-w-[150px]">{user?.email}</span>
                <span className="text-gray-300">|</span>
                <Shield className="h-3 w-3 text-primary inline" />
                <span className="font-semibold text-primary">{displayRole}</span>
              </div>
            </div>
          </header>

          <main className="p-8 space-y-8 flex-1 overflow-y-auto max-w-[1366px] w-full mx-auto">
            {/* Metric Cards */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {statCards.map((card) => (
                <StatCard key={card.title} {...card} loading={loading} />
              ))}
            </div>

            {/* Bottom row: Recent orders + Quick links */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Recent Orders Table */}
              <Card className="lg:col-span-2 bg-white border border-hairline rounded-xl shadow-sm">
                <CardHeader className="pb-3 border-b border-hairline">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold text-ink flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      Đơn hàng gần đây hôm nay
                    </CardTitle>
                    <Link
                      href="/sales"
                      className="text-xs text-primary hover:underline font-medium"
                    >
                      Xem tất cả →
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="space-y-0 divide-y divide-hairline">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between px-6 py-3.5">
                          <div className="space-y-1.5">
                            <div className="h-3.5 bg-slate-100 rounded animate-pulse w-24" />
                            <div className="h-3 bg-slate-100 rounded animate-pulse w-16" />
                          </div>
                          <div className="h-4 bg-slate-100 rounded animate-pulse w-20" />
                        </div>
                      ))}
                    </div>
                  ) : recentOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-graphite">
                      <ShoppingCart className="h-10 w-10 text-slate-200 mb-3" />
                      <p className="text-sm font-medium">Chưa có đơn hàng nào hôm nay</p>
                      <Link href="/pos" className="mt-2 text-xs text-primary hover:underline">
                        Đi đến màn hình bán hàng POS
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-hairline">
                      {recentOrders.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center justify-between px-6 py-3 hover:bg-slate-50/60 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-semibold text-ink">{order.code}</p>
                            <p className="text-xs text-graphite mt-0.5">
                              {order.customer?.name ?? 'Khách lẻ'} · {formatTime(order.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-ink">
                              {formatCurrency(order.totalAmount)}
                            </p>
                            <span className="inline-block mt-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {order.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Action Links */}
              <Card className="bg-white border border-hairline rounded-xl shadow-sm">
                <CardHeader className="pb-3 border-b border-hairline">
                  <CardTitle className="text-sm font-bold text-ink">Truy cập nhanh</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-2">
                  {[
                    { href: '/pos', label: 'Bán hàng POS', desc: 'Mở màn hình thanh toán', icon: '🛒', color: 'bg-blue-50 hover:bg-blue-100 border-blue-200' },
                    { href: '/inventory', label: 'Quản lý tồn kho', desc: 'Xem và điều chỉnh kho', icon: '📦', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200' },
                    { href: '/medicines', label: 'Danh sách thuốc', desc: 'Duyệt dược phẩm & danh mục', icon: '💊', color: 'bg-violet-50 hover:bg-violet-100 border-violet-200' },
                    { href: '/sales', label: 'Lịch sử bán hàng', desc: 'Xem & in lại hóa đơn', icon: '📋', color: 'bg-amber-50 hover:bg-amber-100 border-amber-200' },
                    { href: '/customers', label: 'Khách hàng', desc: 'Quản lý thông tin KH', icon: '👤', color: 'bg-pink-50 hover:bg-pink-100 border-pink-200' },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${link.color}`}
                    >
                      <span className="text-xl">{link.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-ink">{link.label}</p>
                        <p className="text-xs text-graphite">{link.desc}</p>
                      </div>
                    </a>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Welcome card with system info */}
            <Card className="w-full bg-white border border-hairline rounded-xl shadow-sm relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary" />
              <CardContent className="pl-8 py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-ink">
                      Chào mừng, {user?.fullName || 'Dược sĩ'}! 👋
                    </p>
                    <p className="text-xs text-charcoal mt-0.5 leading-relaxed max-w-xl">
                      Hệ thống PharmaAssist đã kết nối thành công. Bảng điều khiển tự động làm mới mỗi 60 giây.
                      Nhấn <kbd className="px-1 py-0.5 text-[10px] bg-slate-100 border border-hairline rounded font-mono">↺</kbd> để cập nhật ngay.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-emerald-700 font-medium">Hệ thống hoạt động bình thường</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
