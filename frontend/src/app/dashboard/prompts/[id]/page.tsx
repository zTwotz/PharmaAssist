'use client';

import React, { useEffect, useState, useCallback, use } from 'react';
import { useRouter } from 'next/navigation';
import { RouteGuard } from '@/components/route-guard';
import { Sidebar } from '@/components/sidebar';
import api from '@/lib/api';
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PromptTemplate {
  id: string;
  code: string;
  version: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function PromptDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const [prompt, setPrompt] = useState<PromptTemplate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);

  const fetchPrompt = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/ai/prompts/${id}`);
      setPrompt(res.data);
    } catch (err) {
      console.error('[PromptDetailPage] Failed to fetch', err);
      setError('Failed to load prompt details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPrompt();
  }, [fetchPrompt]);

  const updateStatus = async (newStatus: string) => {
    setUpdating(true);
    try {
      await api.patch(`/ai/prompts/${id}/status`, { status: newStatus });
      await fetchPrompt();
    } catch (err) {
      console.error('Failed to update status', err);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <RouteGuard allowedRoles={['ADMIN']}>
      <div className="flex h-screen bg-[#f8fafc]">
        <Sidebar currentPath="/dashboard/prompts" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-6">
            <Link href="/dashboard/prompts" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-4">
              <ArrowLeft className="w-4 h-4" /> Back to Prompts
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Prompt Details</h1>
                {prompt && <p className="text-gray-500 font-mono mt-1">{prompt.code} - {prompt.version}</p>}
              </div>
              
              {prompt && (
                <div className="flex items-center gap-2">
                  {prompt.status !== 'ACTIVE' && (
                    <button
                      onClick={() => updateStatus('ACTIVE')}
                      disabled={updating}
                      className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Set Active
                    </button>
                  )}
                  {prompt.status === 'ACTIVE' && (
                    <button
                      onClick={() => updateStatus('ARCHIVED')}
                      disabled={updating}
                      className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-lg hover:bg-yellow-700 disabled:opacity-50 inline-flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4" /> Archive
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#024ad8]" /></div>
          ) : error || !prompt ? (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg">{error || 'Not found'}</div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
                      {prompt.content}
                    </pre>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Metadata</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 font-semibold uppercase">Status</label>
                      <div className="mt-1">
                        <Badge variant={prompt.status === 'ACTIVE' ? 'default' : prompt.status === 'DRAFT' ? 'secondary' : 'outline'}
                               className={prompt.status === 'ACTIVE' ? 'bg-green-100 text-green-800 border-green-200' : ''}>
                          {prompt.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-semibold uppercase">Created At</label>
                      <div className="text-sm font-medium mt-1">
                        {new Date(prompt.createdAt).toLocaleString('vi-VN')}
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-semibold uppercase">Updated At</label>
                      <div className="text-sm font-medium mt-1">
                        {new Date(prompt.updatedAt).toLocaleString('vi-VN')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </RouteGuard>
  );
}
