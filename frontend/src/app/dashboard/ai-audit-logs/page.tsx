'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';

export default function AiAuditLogListPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  // Filters
  const [providerUsed, setProviderUsed] = useState<string>('all');
  const [guardrailStatus, setGuardrailStatus] = useState<string>('all');
  const [promptType, setPromptType] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (providerUsed && providerUsed !== 'all') params.append('providerUsed', providerUsed);
      if (guardrailStatus && guardrailStatus !== 'all') params.append('guardrailStatus', guardrailStatus);
      if (promptType) params.append('promptType', promptType);
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const response = await api.get(`/admin/ai-audit-logs?${params.toString()}`);
      setLogs(response.data.items);
      setTotalPages(response.data.meta.totalPages);
    } catch (error) {
      console.error('Error fetching AI audit logs:', error);
    } finally {
      setLoading(false);
    }
  }, [page, providerUsed, guardrailStatus, promptType, startDate, endDate]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const handleFilter = () => {
    setPage(1);
    fetchLogs();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PASS':
        return 'bg-green-500';
      case 'FAIL':
        return 'bg-red-500';
      case 'BYPASSED':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getProviderColor = (provider: string) => {
    return provider === 'google-ai' ? 'bg-blue-500' : 'bg-gray-500';
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">AI Audit Logs</h1>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border shadow-sm mb-6 flex flex-wrap gap-4 items-end">
        <div className="w-48">
          <label className="text-sm font-medium mb-1 block">Provider</label>
          <Select value={providerUsed} onValueChange={(val) => setProviderUsed(val || 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="All Providers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="google-ai">Google AI</SelectItem>
              <SelectItem value="mock">Mock AI</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <label className="text-sm font-medium mb-1 block">Guardrail Status</label>
          <Select value={guardrailStatus} onValueChange={(val) => setGuardrailStatus(val || 'all')}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="PASS">PASS</SelectItem>
              <SelectItem value="FAIL">FAIL</SelectItem>
              <SelectItem value="BYPASSED">BYPASSED</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <label className="text-sm font-medium mb-1 block">Loại Prompt</label>
          <Input 
            placeholder="e.g. interaction_check" 
            value={promptType} 
            onChange={(e) => setPromptType(e.target.value)} 
          />
        </div>

        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Từ ngày</label>
          <Input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </div>

        <div className="w-40">
          <label className="text-sm font-medium mb-1 block">Đến ngày</label>
          <Input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>

        <Button onClick={handleFilter}>Lọc</Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thời gian</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Prompt Type</TableHead>
              <TableHead>Guardrail</TableHead>
              <TableHead>Latency (ms)</TableHead>
              <TableHead>Fallback</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  Đang tải...
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  Không có dữ liệu.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getProviderColor(log.providerUsed)} text-white`}>
                      {log.providerUsed}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.model}</TableCell>
                  <TableCell>{log.promptType}</TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(log.guardrailStatus)} text-white`}>
                      {log.guardrailStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.latencyMs} ms</TableCell>
                  <TableCell>
                    {log.fallbackReason ? (
                      <span className="text-red-500 text-sm truncate block max-w-[200px]" title={log.fallbackReason}>
                        {log.fallbackReason}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Trang {page} / {totalPages || 1}
        </span>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
          >
            Trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages || totalPages === 0 || loading}
          >
            Sau
          </Button>
        </div>
      </div>
    </div>
  );
}
