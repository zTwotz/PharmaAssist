import React from 'react';
import { DollarSign, TrendingUp, Package, Percent } from 'lucide-react';

interface RevenueMetricsProps {
  totalRevenue: number;
  totalCogs: number;
  grossProfit: number;
  orderCount: number;
}

export default function RevenueMetrics({
  totalRevenue,
  totalCogs,
  grossProfit,
  orderCount
}: RevenueMetricsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(value);
  };

  const margin = totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : '0.0';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-[#024ad8] mr-4">
          <DollarSign className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
        <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Total COGS</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(totalCogs)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
          <TrendingUp className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Gross Profit</p>
          <p className="text-2xl font-bold text-gray-800">{formatCurrency(grossProfit)}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
        <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
          <Percent className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Gross Margin</p>
          <p className="text-2xl font-bold text-gray-800">{margin}%</p>
        </div>
      </div>
    </div>
  );
}
