import React from 'react';
import { Package, AlertTriangle } from 'lucide-react';

interface InventoryItem {
  sku: string;
  medicineName: string;
  warehouse: string;
  totalStock: number;
  reservedQuantity: number;
  availableQuantity: number;
  minQuantity: number;
  stockStatus: string;
}

interface InventoryReportTableProps {
  items: InventoryItem[];
}

export default function InventoryReportTable({ items }: InventoryReportTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center mb-4">
        <Package className="w-5 h-5 text-[#024ad8] mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Inventory Stock Levels</h2>
        <span className="ml-auto text-sm text-gray-400">{items.length} items</span>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-400 py-10">No inventory data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-2 pr-4 font-medium text-gray-500">Medicine</th>
                <th className="text-left py-2 pr-4 font-medium text-gray-500">SKU</th>
                <th className="text-left py-2 pr-4 font-medium text-gray-500">Warehouse</th>
                <th className="text-right py-2 pr-4 font-medium text-gray-500">Total</th>
                <th className="text-right py-2 pr-4 font-medium text-gray-500">Reserved</th>
                <th className="text-right py-2 pr-4 font-medium text-gray-500">Available</th>
                <th className="text-center py-2 font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr
                  key={`${item.sku}-${item.warehouse}`}
                  className={`border-b border-gray-50 transition-colors ${item.stockStatus === 'low' ? 'bg-red-50 hover:bg-red-100' : 'hover:bg-gray-50'}`}
                >
                  <td className="py-3 pr-4">
                    <div className="font-medium text-gray-800 truncate max-w-xs">{item.medicineName}</div>
                  </td>
                  <td className="py-3 pr-4 text-gray-500 font-mono text-xs">{item.sku}</td>
                  <td className="py-3 pr-4 text-gray-600">{item.warehouse}</td>
                  <td className="py-3 pr-4 text-right text-gray-700">{item.totalStock.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-right text-gray-500">{item.reservedQuantity.toLocaleString()}</td>
                  <td className="py-3 pr-4 text-right font-semibold text-gray-800">{item.availableQuantity.toLocaleString()}</td>
                  <td className="py-3 text-center">
                    {item.stockStatus === 'low' ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <AlertTriangle className="w-3 h-3" />
                        Low
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        Normal
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
