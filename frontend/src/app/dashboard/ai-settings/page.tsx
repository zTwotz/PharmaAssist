'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { RouteGuard } from '@/components/route-guard';
import { Sidebar } from '@/components/sidebar';
import api from '@/lib/api';
import { Bot, Save, RefreshCw, CheckCircle, BrainCircuit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AiProviderConfig {
  id: string;
  providerKey: string;
  modelName: string | null;
  priority: number;
  isEnabled: boolean;
  timeoutMs: number | null;
  updatedAt: string;
}

export default function AiSettingsPage() {
  const [configs, setConfigs] = useState<AiProviderConfig[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, Partial<AiProviderConfig>>>({});

  const fetchConfigs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/ai/configs');
      const data: AiProviderConfig[] = res.data;
      setConfigs(data);
      const vals: Record<string, Partial<AiProviderConfig>> = {};
      for (const c of data) {
        vals[c.id] = {
          modelName: c.modelName ?? '',
          priority: c.priority,
          isEnabled: c.isEnabled,
          timeoutMs: c.timeoutMs ?? 30000,
        };
      }
      setEditValues(vals);
    } catch (err) {
      console.error('[AiSettingsPage] Failed to fetch configs', err);
      setError('Failed to load AI configurations. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  const handleUpdate = (id: string, field: keyof AiProviderConfig, value: any) => {
    setEditValues(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  const handleSave = async (id: string) => {
    setSaving(id);
    setError(null);
    try {
      const payload = editValues[id];
      await api.patch(`/ai/configs/${id}`, {
        ...payload,
        timeoutMs: payload.timeoutMs ? Number(payload.timeoutMs) : undefined,
        priority: payload.priority ? Number(payload.priority) : undefined,
      });
      setSaved(id);
      setTimeout(() => setSaved(null), 2500);
      await fetchConfigs();
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      setError(apiErr?.response?.data?.message ?? 'Failed to save configuration.');
    } finally {
      setSaving(null);
    }
  };

  return (
    <RouteGuard allowedRoles={['ADMIN']}>
      <div className="flex h-screen bg-[#f8fafc]">
        <Sidebar currentPath="/dashboard/ai-settings" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8 flex items-center gap-3">
            <BrainCircuit className="w-8 h-8 text-[#024ad8]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">AI Configurations</h1>
              <p className="text-gray-500 mt-1">Manage AI providers, models, and fallback settings.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#024ad8]" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <span className="text-red-500 font-medium">{error}</span>
              <button onClick={fetchConfigs} className="ml-auto text-sm text-red-600 hover:underline flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Retry
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
              {configs.map(config => (
                <Card key={config.id} className="shadow-sm">
                  <CardHeader className="pb-3 border-b border-gray-100 flex flex-row justify-between items-center">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Bot className="w-5 h-5 text-[#024ad8]" />
                        {config.providerKey}
                      </CardTitle>
                      <p className="text-xs text-gray-400 mt-1">
                        Last updated: {new Date(config.updatedAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={editValues[config.id]?.isEnabled ?? config.isEnabled}
                          onChange={(e) => handleUpdate(config.id, 'isEnabled', e.target.checked)}
                        />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${editValues[config.id]?.isEnabled ? 'bg-[#024ad8]' : 'bg-gray-300'}`}></div>
                        <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${editValues[config.id]?.isEnabled ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                    </label>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                      <input
                        type="text"
                        value={editValues[config.id]?.modelName || ''}
                        onChange={(e) => handleUpdate(config.id, 'modelName', e.target.value)}
                        placeholder="e.g. gemini-1.5-pro"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                        <input
                          type="number"
                          min={0}
                          value={editValues[config.id]?.priority ?? 0}
                          onChange={(e) => handleUpdate(config.id, 'priority', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Timeout (ms)</label>
                        <input
                          type="number"
                          min={1000}
                          step={1000}
                          value={editValues[config.id]?.timeoutMs ?? 30000}
                          onChange={(e) => handleUpdate(config.id, 'timeoutMs', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleSave(config.id)}
                        disabled={saving === config.id}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#024ad8] text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:ring-offset-2 transition-colors disabled:opacity-50"
                      >
                        {saving === config.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        ) : saved === config.id ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        {saving === config.id ? 'Saving…' : saved === config.id ? 'Saved!' : 'Save Changes'}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </RouteGuard>
  );
}
