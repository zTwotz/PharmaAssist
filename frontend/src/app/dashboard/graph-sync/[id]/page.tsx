'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { RouteGuard } from '@/components/route-guard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Loader2, ArrowLeft, Activity, Calendar, AlertCircle, RefreshCw } from 'lucide-react';
import api from '@/lib/api';

interface GraphSyncAttempt {
  id: string;
  errorMessage: string;
  createdAt: string;
}

interface GraphSyncJob {
  id: string;
  entityType: string;
  entityId: string;
  eventType: string;
  status: string;
  payload: any;
  retryCount: number;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
  attempts?: GraphSyncAttempt[];
}

function getStatusBadge(status: string) {
  switch (status) {
    case 'COMPLETED':
      return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Hoàn thành</Badge>;
    case 'PENDING':
      return <Badge className="bg-amber-100 text-amber-800 border-amber-200">Chờ xử lý</Badge>;
    case 'PROCESSING':
      return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Đang xử lý</Badge>;
    case 'FAILED':
      return <Badge className="bg-rose-100 text-rose-800 border-rose-200">Thất bại</Badge>;
    case 'DEAD_LETTER':
      return <Badge className="bg-slate-100 text-slate-800 border-slate-200">Lỗi vĩnh viễn</Badge>;
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

export default function GraphSyncJobDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [job, setJob] = useState<GraphSyncJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const res = await api.get(`/graph-sync/status/${params.id}`);
        setJob(res.data);
      } catch (err) {
        console.error('Failed to load graph sync job details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadJob();
  }, [params.id]);

  const handleRetry = async () => {
    if (!job) return;
    setRetrying(true);
    try {
      await api.post(`/graph-sync/status/${job.id}/retry`);
      alert('Đã yêu cầu thử lại tác vụ đồng bộ thành công');
      // Reload job details to show new status
      const res = await api.get(`/graph-sync/status/${params.id}`);
      setJob(res.data);
    } catch (err) {
      console.error('Failed to retry job:', err);
      alert('Không thể thử lại tác vụ này');
    } finally {
      setRetrying(false);
    }
  };

  return (
    <RouteGuard allowedRoles={['ADMIN']}>
      <div className="flex min-h-screen bg-cloud font-sans">
        <Sidebar currentPath="/dashboard/graph-sync" />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-16 bg-white border-b border-hairline flex items-center px-8 sticky top-0 z-10 gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard/graph-sync')}>
              <ArrowLeft className="w-5 h-5 text-graphite" />
            </Button>
            <h1 className="text-base font-bold text-ink uppercase tracking-wider flex items-center gap-2 flex-1">
              <Activity className="w-5 h-5 text-primary" />
              Chi tiết tác vụ đồng bộ
            </h1>
            {job && (job.status === 'FAILED' || job.status === 'DEAD_LETTER') && (
              <Button onClick={handleRetry} disabled={retrying} className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
                {retrying ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
                Thử lại tác vụ
              </Button>
            )}
          </header>

          <main className="p-8 space-y-6 flex-1 overflow-y-auto max-w-[1366px] w-full mx-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : !job ? (
              <div className="flex flex-col items-center justify-center h-64 text-graphite space-y-4">
                <AlertCircle className="w-10 h-10 text-slate-300" />
                <p>Không tìm thấy tác vụ (ID: {params.id})</p>
                <Button variant="outline" onClick={() => router.push('/dashboard/graph-sync')}>
                  Quay lại danh sách
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="bg-white border border-hairline shadow-sm">
                  <CardHeader className="pb-3 border-b border-hairline">
                    <CardTitle className="text-sm font-bold text-ink flex items-center justify-between">
                      <span>Thông tin chung</span>
                      {getStatusBadge(job.status)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4 text-sm">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-graphite font-semibold">ID Tác vụ:</span>
                      <span className="col-span-2 text-ink font-mono text-xs">{job.id}</span>
                      
                      <span className="text-graphite font-semibold">Loại Entity:</span>
                      <span className="col-span-2 text-ink">{job.entityType}</span>

                      <span className="text-graphite font-semibold">Entity ID:</span>
                      <span className="col-span-2 text-ink font-mono text-xs break-all">{job.entityId}</span>

                      <span className="text-graphite font-semibold">Loại sự kiện:</span>
                      <span className="col-span-2 text-ink">
                        <Badge variant="secondary" className="text-xs">{job.eventType}</Badge>
                      </span>

                      <span className="text-graphite font-semibold">Lần thử:</span>
                      <span className="col-span-2 text-ink">{job.retryCount}</span>
                    </div>

                    <div className="pt-4 border-t border-hairline grid grid-cols-3 gap-2">
                      <span className="text-graphite font-semibold flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> Tạo lúc:
                      </span>
                      <span className="col-span-2 text-ink">{formatTime(job.createdAt)}</span>

                      <span className="text-graphite font-semibold flex items-center gap-1">
                        <Calendar className="w-4 h-4" /> Cập nhật:
                      </span>
                      <span className="col-span-2 text-ink">{formatTime(job.updatedAt)}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-hairline shadow-sm overflow-hidden flex flex-col">
                  <CardHeader className="pb-3 border-b border-hairline bg-slate-50">
                    <CardTitle className="text-sm font-bold text-ink">Payload (Dữ liệu gửi lên Graph)</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 flex-1 relative bg-slate-900 overflow-y-auto max-h-[300px]">
                    <pre className="p-4 text-xs font-mono text-emerald-400 whitespace-pre-wrap break-all">
                      {JSON.stringify(job.payload, null, 2)}
                    </pre>
                  </CardContent>
                </Card>

                {job.errorMessage && (
                  <Card className="md:col-span-2 border-rose-200 bg-rose-50 shadow-sm">
                    <CardHeader className="pb-3 border-b border-rose-200">
                      <CardTitle className="text-sm font-bold text-rose-800 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Lỗi hiện tại
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5">
                      <p className="text-sm text-rose-700 font-mono whitespace-pre-wrap">{job.errorMessage}</p>
                    </CardContent>
                  </Card>
                )}

                {job.attempts && job.attempts.length > 0 && (
                  <Card className="md:col-span-2 bg-white border border-hairline shadow-sm">
                    <CardHeader className="pb-3 border-b border-hairline">
                      <CardTitle className="text-sm font-bold text-ink">Lịch sử thử lại (Attempts)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader className="bg-slate-50">
                          <TableRow>
                            <TableHead className="w-[180px]">Thời gian</TableHead>
                            <TableHead>Chi tiết lỗi</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {job.attempts.map((attempt) => (
                            <TableRow key={attempt.id} className="hover:bg-slate-50/50">
                              <TableCell className="text-xs text-graphite font-medium whitespace-nowrap">
                                {formatTime(attempt.createdAt)}
                              </TableCell>
                              <TableCell>
                                <span className="text-xs text-rose-600 font-mono break-all">{attempt.errorMessage}</span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </RouteGuard>
  );
}
