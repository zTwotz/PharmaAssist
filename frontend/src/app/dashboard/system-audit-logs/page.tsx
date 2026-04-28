'use client';

import { useEffect, useState, useCallback } from 'react';
import { RouteGuard } from '@/components/route-guard';
import { Sidebar } from '@/components/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Server, Search } from 'lucide-react';
import api from '@/lib/api';

export default function SystemAuditLogListPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  // Filters
  const [actionFilter, setActionFilter] = useState('');
  const [entityTypeFilter, setEntityTypeFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (actionFilter) params.append('action', actionFilter);
      if (entityTypeFilter) params.append('entityType', entityTypeFilter);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await api.get(`/admin/system-audit-logs?${params.toString()}`);
      setLogs(response.data.items);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error('Error fetching system audit logs:', error);
    } finally {
      setLoading(false);
    }
  }, [page, actionFilter, entityTypeFilter, startDate, endDate]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleFilter = () => {
    setPage(1);
    fetchLogs();
  };

  return (
    <RouteGuard allowedRoles={['ADMIN']}>
      <div className="flex h-screen bg-[#f8fafc]">
        <Sidebar currentPath="/dashboard/system-audit-logs" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Server className="w-8 h-8 text-[#024ad8]" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">System Audit Logs</h1>
                <p className="text-gray-500 mt-1">Review system activities and data modifications.</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="p-4 flex flex-wrap gap-4 items-end">
              <div className="w-48">
                <label className="text-sm font-medium mb-1 block text-gray-700">Action</label>
                <Input 
                  placeholder="e.g. CREATE, UPDATE" 
                  value={actionFilter} 
                  onChange={(e) => setActionFilter(e.target.value)} 
                />
              </div>

              <div className="w-48">
                <label className="text-sm font-medium mb-1 block text-gray-700">Entity Type</label>
                <Input 
                  placeholder="e.g. User, Medicine" 
                  value={entityTypeFilter} 
                  onChange={(e) => setEntityTypeFilter(e.target.value)} 
                />
              </div>

              <div className="w-40">
                <label className="text-sm font-medium mb-1 block text-gray-700">From Date</label>
                <Input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)} 
                />
              </div>

              <div className="w-40">
                <label className="text-sm font-medium mb-1 block text-gray-700">To Date</label>
                <Input 
                  type="date" 
                  value={endDate} 
                  onChange={(e) => setEndDate(e.target.value)} 
                />
              </div>

              <Button onClick={handleFilter} className="flex items-center gap-2">
                <Search className="w-4 h-4" /> Filter
              </Button>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardHeader className="pb-2 border-b">
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Entity</TableHead>
                    <TableHead>Entity ID</TableHead>
                    <TableHead>Changes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : logs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center h-24 text-gray-500">
                        No system audit logs found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="whitespace-nowrap text-sm text-gray-500">
                          {new Date(log.createdAt).toLocaleString('vi-VN')}
                        </TableCell>
                        <TableCell className="text-sm">
                          {log.user ? `${log.user.fullName} (${log.user.email})` : 'Unknown'}
                        </TableCell>
                        <TableCell>
                          <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                            {log.action}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{log.entityType}</TableCell>
                        <TableCell className="font-mono text-xs text-gray-500">{log.entityId}</TableCell>
                        <TableCell className="text-xs">
                          {log.oldValue && <div className="text-red-500">Old: <span className="truncate max-w-[200px] inline-block">{log.oldValue}</span></div>}
                          {log.newValue && <div className="text-green-600">New: <span className="truncate max-w-[200px] inline-block">{log.newValue}</span></div>}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Pagination */}
          <div className="mt-4 flex justify-between items-center px-2">
            <span className="text-sm text-gray-500">
              Page {page} of {totalPages || 1}
            </span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || totalPages === 0 || loading}
              >
                Next
              </Button>
            </div>
          </div>
        </main>
      </div>
    </RouteGuard>
  );
}
