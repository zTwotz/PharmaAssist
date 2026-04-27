'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { RouteGuard } from '@/components/route-guard';
import { Sidebar } from '@/components/sidebar';
import api from '@/lib/api';
import { MessageSquare, Plus, RefreshCw, Eye } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PromptTemplate {
  id: string;
  code: string;
  version: string;
  status: string;
  updatedAt: string;
}

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<PromptTemplate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/ai/prompts');
      setPrompts(res.data);
    } catch (err) {
      console.error('[PromptsPage] Failed to fetch prompts', err);
      setError('Failed to load prompts. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrompts();
  }, [fetchPrompts]);

  return (
    <RouteGuard allowedRoles={['ADMIN']}>
      <div className="flex h-screen bg-[#f8fafc]">
        <Sidebar currentPath="/dashboard/prompts" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-8 h-8 text-[#024ad8]" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Prompt Management</h1>
                <p className="text-gray-500 mt-1">Manage AI prompts and their active versions.</p>
              </div>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
              <CardTitle>Prompt Templates</CardTitle>
              <button onClick={fetchPrompts} className="p-2 hover:bg-gray-100 rounded-full">
                <RefreshCw className={`w-4 h-4 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </CardHeader>
            <CardContent className="p-0">
              {error ? (
                <div className="p-4 text-red-500 text-center">{error}</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Updated At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prompts.length === 0 && !loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                          No prompts found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      prompts.map((p) => (
                        <TableRow key={p.id}>
                          <TableCell className="font-mono text-sm">{p.code}</TableCell>
                          <TableCell className="font-mono text-sm">{p.version}</TableCell>
                          <TableCell>
                            <Badge variant={p.status === 'ACTIVE' ? 'default' : p.status === 'DRAFT' ? 'secondary' : 'outline'}
                                   className={p.status === 'ACTIVE' ? 'bg-green-100 text-green-800 border-green-200' : ''}>
                              {p.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-500">
                            {new Date(p.updatedAt).toLocaleString('vi-VN')}
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/dashboard/prompts/${p.id}`} className="inline-flex items-center gap-1 text-sm text-[#024ad8] hover:underline">
                              <Eye className="w-4 h-4" /> View
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </RouteGuard>
  );
}
