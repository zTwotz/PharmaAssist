"use client";

import React from 'react';
import { usePosStore } from '@/store/usePosStore';
import { Minus, Plus, Trash2 } from 'lucide-react';

export function PosCart() {
  const { cart, updateQuantity, removeItem, clearCart } = usePosStore();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 p-8 text-center">
        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p className="font-medium text-slate-500">Giỏ hàng trống</p>
        <p className="text-sm mt-1">Tìm kiếm và thêm thuốc vào đơn hàng</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b border-slate-100 bg-slate-50/80">
        <span className="text-sm font-medium text-slate-600">{cart.length} sản phẩm</span>
        <button 
          onClick={clearCart}
          className="text-xs text-red-500 font-medium hover:text-red-700 hover:underline flex items-center gap-1"
        >
          <Trash2 size={12} /> Xóa tất cả
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-2 space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2 group relative">
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 text-sm leading-tight line-clamp-2 pr-6">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">SKU: {item.sku}</p>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
            
            <div className="flex items-center justify-between mt-1">
              <div className="text-[#024ad8] font-bold">
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.sellingPrice)}
                <span className="text-xs font-normal text-slate-500 ml-1">/{item.unitName}</span>
              </div>
              
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-8">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <div className="w-10 h-full flex items-center justify-center font-semibold text-sm border-x border-slate-200 bg-white">
                  {item.quantity}
                </div>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.maxQuantity}
                  className="w-8 h-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed text-slate-600 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
            
            {item.quantity >= item.maxQuantity && (
              <p className="text-[10px] text-orange-500 font-medium text-right mt-1">
                Đã đạt số lượng tồn kho tối đa
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
