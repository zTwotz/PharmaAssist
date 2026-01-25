"use client";

import React, { useState, useEffect } from 'react';
import { Search, Plus, PackageOpen } from 'lucide-react';
import api from '@/lib/api';
import { usePosStore } from '@/store/usePosStore';

export function MedicineSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const addItem = usePosStore((state) => state.addItem);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm.trim().length >= 2) {
        performSearch(searchTerm);
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const performSearch = async (term: string) => {
    setIsSearching(true);
    try {
      const response = await api.get(`/medicines/search?term=${encodeURIComponent(term)}`);
      setResults(response.data || []);
    } catch (error) {
      console.error('Error searching medicines:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddItem = (variant: any) => {
    const stockQty = variant.inventories?.[0]?.quantity || 0;
    
    if (stockQty <= 0) {
      alert("Sản phẩm đã hết hàng trong kho!");
      return;
    }

    addItem({
      productVariantId: variant.id,
      medicineId: variant.product?.medicines?.[0]?.id,
      name: variant.product?.name || variant.variant_name,
      sku: variant.sku,
      unitName: variant.unit?.name || 'Viên',
      sellingPrice: Number(variant.selling_price),
      maxQuantity: stockQty
    });
    
    // Optional: Reset search after adding
    // setSearchTerm('');
    // setResults([]);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm thuốc theo tên, mã SKU hoặc quét mã vạch..."
          className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition-all"
        />
        {isSearching && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white rounded-xl shadow-lg border border-slate-200 max-h-[400px] overflow-y-auto">
          <ul className="divide-y divide-slate-100">
            {results.map((variant) => {
              const stockQty = variant.inventories?.[0]?.quantity || 0;
              const isOutOfStock = stockQty <= 0;

              return (
                <li 
                  key={variant.id}
                  className={`p-3 hover:bg-blue-50 transition-colors flex items-center justify-between ${isOutOfStock ? 'opacity-60' : ''}`}
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <h4 className="text-sm font-semibold text-slate-800 truncate">
                      {variant.product?.name || variant.variant_name}
                    </h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                      <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                        {variant.sku}
                      </span>
                      <span className="flex items-center gap-1">
                        <PackageOpen size={12} className={isOutOfStock ? 'text-red-400' : 'text-green-500'} />
                        Tồn kho: <strong className={isOutOfStock ? 'text-red-500' : 'text-slate-700'}>{stockQty}</strong> {variant.unit?.name}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="font-bold text-[#024ad8]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(variant.selling_price)}
                    </span>
                    <button
                      onClick={() => handleAddItem(variant)}
                      disabled={isOutOfStock}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        isOutOfStock 
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white'
                      }`}
                    >
                      <Plus size={14} /> Thêm
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
