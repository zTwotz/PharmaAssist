'use client';

import React, { useState, useEffect } from 'react';
import api from '@/lib/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, AlertTriangle, Truck } from 'lucide-react';

interface Supplier {
  id: number;
  code: string;
  name: string;
  phone: string | null;
  email: string | null;
  status: string;
}

interface SupplierSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function SupplierSelector({ value, onChange, error, disabled }: SupplierSelectorProps) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActiveSuppliers = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const response = await api.get('/suppliers?status=ACTIVE');
        setSuppliers(response.data);
      } catch (err: unknown) {
        console.error('Failed to load active suppliers:', err);
        setFetchError('Không thể tải danh sách nhà cung cấp đang hoạt động.');
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSuppliers();
  }, []);

  return (
    <div className="space-y-1.5 font-sans">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
          <Truck className="h-4 w-4 text-primary" />
          Nhà cung cấp *
        </label>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-xs text-graphite h-10 px-3 border border-hairline rounded-lg bg-slate-50">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>Đang tải danh sách nhà cung cấp...</span>
        </div>
      ) : fetchError ? (
        <div className="flex items-center gap-2 text-xs text-rose-600 h-10 px-3 border border-rose-200 rounded-lg bg-rose-50">
          <AlertTriangle className="h-4 w-4 text-rose-500" />
          <span>{fetchError}</span>
        </div>
      ) : (
        <Select
          value={value}
          onValueChange={(val) => onChange(val || '')}
          disabled={disabled || suppliers.length === 0}
        >
          <SelectTrigger className={`w-full border-hairline bg-white h-10 focus:ring-primary ${error ? 'border-rose-500 focus:ring-rose-500' : ''}`}>
            <SelectValue placeholder={suppliers.length === 0 ? "Không có nhà cung cấp hoạt động" : "Chọn nhà cung cấp..."} />
          </SelectTrigger>
          <SelectContent className="bg-white">
            {suppliers.map((supp) => (
              <SelectItem key={supp.id} value={supp.id.toString()}>
                <span className="font-semibold text-ink">{supp.name}</span>
                <span className="text-xs text-graphite ml-2">({supp.code})</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {error && (
        <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
          <AlertTriangle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}
