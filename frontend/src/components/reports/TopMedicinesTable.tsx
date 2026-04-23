import React from 'react';
import { TrendingUp } from 'lucide-react';

interface TopMedicineItem {
  name: string;
  sku: string;
  quantitySold: number;
  revenue: number;
}

interface TopMedicinesTableProps {
  items: TopMedicineItem[];
}

export default function TopMedicinesTable({ items }: TopMedicinesTableProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

  const maxQty = items.length > 0 ? items[0].quantitySold : 1;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-5 h-5 text-[#024ad8] mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Top Medicines by Sales</h2>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No data available for this period.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 font-medium text-gray-500 w-8">#</th>
                <th className="text-left py-2 pr-4 font-medium text-gray-500">Medicine</th>
                <th className="text-left py-2 pr-4 font-medium text-gray-500">SKU</th>
                <th className="text-right py-2 pr-4 font-medium text-gray-500">Qty Sold</th>
                <th className="text-right py-2 font-medium text-gray-500">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.sku} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 pr-4 text-gray-400 font-medium">{idx + 1}</td>
                  <td className="py-3 pr-4">
                    <div className="font-medium text-gray-800 truncate max-w-xs">{item.name}</div>
                    <div className="mt-1 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#024ad8] transition-all"
                        style={{ width: `${(item.quantitySold / maxQty) * 100}%` }}
                      />
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 font-mono text-xs">{item.sku}</td>
                  <td className="py-3 pr-4 text-right font-semibold text-gray-800">{item.quantitySold.toLocaleString()}</td>
                  <td className="py-3 text-right font-semibold text-green-600">{formatCurrency(item.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
