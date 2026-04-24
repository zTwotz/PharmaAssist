'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { RouteGuard } from '@/components/route-guard';
import { Sidebar } from '@/components/sidebar';
import api from '@/lib/api';
import { Settings, Save, RefreshCw, CheckCircle } from 'lucide-react';

interface SystemSetting {
  id: number;
  key: string;
  value: string;
  valueType: string;
  label: string | null;
  updatedAt: string;
}

// PAC-TASK-423: Minimal System Settings UI for near-expiry threshold
export default function SettingsPage() {
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/settings');
      const data: SystemSetting[] = res.data;
      setSettings(data);
      const vals: Record<string, string> = {};
      for (const s of data) vals[s.key] = s.value;
      setEditValues(vals);
    } catch (err) {
      console.error('[SettingsPage] Failed to fetch settings', err);
      setError('Failed to load settings. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (key: string) => {
    setSaving(key);
    setError(null);
    try {
      await api.patch(`/settings/${key}`, { value: editValues[key] });
      setSaved(key);
      setTimeout(() => setSaved(null), 2500);
      await fetchSettings();
    } catch (err: unknown) {
      const apiErr = err as { response?: { data?: { message?: string } } };
      setError(apiErr?.response?.data?.message ?? 'Failed to save setting.');
    } finally {
      setSaving(null);
    }
  };

  return (
    <RouteGuard allowedRoles={['ADMIN']}>
      <div className="flex h-screen bg-[#f8fafc]">
        <Sidebar currentPath="/dashboard/settings" />
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mb-8 flex items-center gap-3">
            <Settings className="w-8 h-8 text-[#024ad8]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
              <p className="text-gray-500 mt-1">Configure operational thresholds and system parameters.</p>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#024ad8]" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <span className="text-red-500 font-medium">{error}</span>
              <button onClick={fetchSettings} className="ml-auto text-sm text-red-600 hover:underline flex items-center gap-1">
                <RefreshCw className="w-3 h-3" /> Retry
              </button>
            </div>
          ) : (
            <div className="max-w-2xl space-y-4">
              {settings.map(setting => (
                <div key={setting.key} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <div className="mb-3">
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      {setting.label ?? setting.key}
                    </label>
                    <p className="text-xs text-gray-400 font-mono">{setting.key}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type={setting.valueType === 'integer' ? 'number' : 'text'}
                      min={setting.valueType === 'integer' ? 0 : undefined}
                      value={editValues[setting.key] ?? setting.value}
                      onChange={e => setEditValues(prev => ({ ...prev, [setting.key]: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:border-transparent"
                    />
                    <button
                      onClick={() => handleSave(setting.key)}
                      disabled={saving === setting.key}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#024ad8] text-white rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-[#024ad8] focus:ring-offset-2 transition-colors disabled:opacity-50"
                    >
                      {saving === setting.key ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      ) : saved === setting.key ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      {saving === setting.key ? 'Saving…' : saved === setting.key ? 'Saved!' : 'Save'}
                    </button>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">
                    Last updated: {new Date(setting.updatedAt).toLocaleString('vi-VN')}
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </RouteGuard>
  );
}
