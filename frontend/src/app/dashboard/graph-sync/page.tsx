'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loader2, RefreshCw, Activity, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import api from '@/lib/api';

interface GraphSyncJob {
  id: string;
  entityType: string;
  entityId: string;
  eventType: string;
  status: string;
  retryCount: number;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'COMPLETED':
      return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200">Hoàn thành</Badge>;
    case 'PENDING':
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">Chờ xử lý</Badge>;
    case 'PROCESSING':
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200">Đang xử lý</Badge>;
    case 'FAILED':
      return <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200">Thất bại</Badge>;
    case 'DEAD_LETTER':
      return <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200 border-slate-200">Lỗi vĩnh viễn</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('vi-VN', { 
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}

export default function GraphSyncPage() {
  const [jobs, setJobs] = useState<GraphSyncJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await api.get('/graph-sync/status?take=100');
      if (res.data) {
        setJobs(res.data.data || []);
        setTotal(res.data.total || 0);
      }
    } catch (err) {
      console.error('Failed to load graph sync status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  // Compute degraded status based on failing/pending
  const failingCount = jobs.filter(j => j.status === 'FAILED' || j.status === 'DEAD_LETTER').length;
  const pendingCount = jobs.filter(j => j.status === 'PENDING' || j.status === 'PROCESSING').length;
  const isDegraded = failingCount > 0;
  
  return (
    <RouteGuard allowedRoles={['ADMIN']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        <Sidebar currentPath="/dashboard/graph-sync" />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center justify-between px-8 sticky top-0 z-10">
            <h1 className="text-base font-bold text-ink uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Graph Sync Status
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={loadData}
                className="flex items-center gap-1.5 text-xs text-graphite hover:text-primary transition-colors"
                title="Làm mới số liệu"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Làm mới</span>
              </button>
            </div>
          </header>

          <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-[1366px] w-full mx-auto">
            {/* System Status Overview */}
            <div className="grid gap-5 sm:grid-cols-3">
              <Card className={`border-l-4 ${isDegraded ? 'border-l-rose-500 bg-rose-50' : 'border-l-emerald-500 bg-emerald-50'}`}>
                <CardContent className="p-5 flex items-center gap-4">
                  <div className={`p-3 rounded-full ${isDegraded ? 'bg-rose-100 text-rose-600' : 'bg-emerald-100 text-emerald-600'}`}>
                    {isDegraded ? <AlertCircle className="w-6 h-6" /> : <CheckCircle2 className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Trạng thái hệ thống</p>
                    <p className={`text-xl font-bold ${isDegraded ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {isDegraded ? 'Degraded (Lỗi đồng bộ)' : 'Healthy (Fresh)'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-graphite">Đang chờ xử lý</p>
                    <p className="text-2xl font-bold text-ink">{pendingCount}</p>
                  </div>
                  <Clock className="w-8 h-8 text-amber-500 opacity-20" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-graphite">Tổng Outbox Jobs</p>
                    <p className="text-2xl font-bold text-ink">{total}</p>
                  </div>
                  <Activity className="w-8 h-8 text-blue-500 opacity-20" />
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white border border-hairline shadow-sm">
              <CardHeader className="pb-3 border-b border-hairline">
                <CardTitle className="text-sm font-bold text-ink">Danh sách tác vụ đồng bộ gần đây</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow>
                      <TableHead>Entity</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Trạng thái</TableHead>
                      <TableHead>Lần thử</TableHead>
                      <TableHead>Cập nhật lần cuối</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading && jobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          <Loader2 className="h-5 w-5 animate-spin text-graphite mx-auto" />
                        </TableCell>
                      </TableRow>
                    ) : jobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center text-graphite">
                          Không có tác vụ nào
                        </TableCell>
                      </TableRow>
                    ) : (
                      jobs.map((job) => (
                        <TableRow key={job.id} className="hover:bg-slate-50/50 cursor-pointer">
                          <TableCell>
                            <p className="font-semibold text-ink text-xs">{job.entityType}</p>
                            <p className="text-[10px] text-graphite truncate max-w-[200px]" title={job.entityId}>
                              {job.entityId}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-[10px]">
                              {job.eventType}
                            </Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(job.status)}</TableCell>
                          <TableCell className="text-xs">{job.retryCount}</TableCell>
                          <TableCell className="text-xs text-graphite">
                            {formatTime(job.updatedAt)}
                            {job.errorMessage && (
                              <p className="text-rose-500 truncate max-w-[250px] mt-1" title={job.errorMessage}>
                                {job.errorMessage}
                              </p>
                            )}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
