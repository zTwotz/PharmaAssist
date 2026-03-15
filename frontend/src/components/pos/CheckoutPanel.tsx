"use client";

import React, { useState } from 'react';
import { usePosStore, PosCartItem } from '@/store/usePosStore';
import axios from 'axios';
import { InvoiceModal } from './InvoiceModal';

export function CheckoutPanel({ hasUnresolvedHighAlerts = false }: { hasUnresolvedHighAlerts?: boolean }) {
  const { cart, totalAmount, clearCart } = usePosStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);
  const [invoiceCartItems, setInvoiceCartItems] = useState<PosCartItem[]>([]);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const orderPayload = {
        orderType: 'OFFLINE',
        storeId: 1, // Default store for demo
        details: cart.map(item => ({
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          unitPrice: item.sellingPrice
        }))
      };

      const response = await axios.post('http://localhost:3001/api/orders', orderPayload);
      
      // Save data for receipt rendering before resetting the cart
      setCompletedOrder(response.data);
      setInvoiceCartItems([...cart]);
      setIsInvoiceOpen(true);
      
      clearCart();
    } catch (error: any) {
      console.error('Lỗi thanh toán:', error);
      alert(error.response?.data?.message || 'Có lỗi xảy ra khi thanh toán!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span>Tổng tiền hàng ({cart.length} món)</span>
          <span className="font-medium">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-slate-600">
          <span>Giảm giá (Loyalty/Coupon)</span>
          <span className="font-medium text-green-600">- 0 ₫</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-200 mt-2">
          <span className="font-bold text-slate-800 text-lg">Khách Cần Trả</span>
          <span className="font-bold text-2xl text-[#024ad8]">
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
          </span>
        </div>
      </div>

      <div className="relative group">
        <button
          onClick={handleCreateDraft}
          disabled={cart.length === 0 || isProcessing}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-slate-700 shadow-md transition-all flex items-center justify-center gap-2 mb-3 border ${
            cart.length === 0
              ? 'bg-slate-100 border-slate-200 cursor-not-allowed shadow-none text-slate-400'
              : isProcessing
              ? 'bg-slate-200 cursor-wait'
              : 'bg-white hover:bg-slate-50 hover:shadow-lg active:scale-[0.98] border-slate-300'
          }`}
        >
          {isProcessing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang lưu nháp...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              LƯU ĐƠN NHÁP
            </>
          )}
        </button>
      </div>

      <div className="relative group">
        <button
          onClick={handleCheckout}
          disabled={cart.length === 0 || isProcessing || hasUnresolvedHighAlerts}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
            cart.length === 0
              ? 'bg-slate-300 cursor-not-allowed shadow-none'
              : hasUnresolvedHighAlerts
              ? 'bg-red-300 cursor-not-allowed shadow-none'
              : isProcessing
              ? 'bg-blue-400 cursor-wait'
              : 'bg-[#024ad8] hover:bg-blue-700 hover:shadow-lg active:scale-[0.98]'
          }`}
        >
        {isProcessing ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang xử lý...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            THANH TOÁN (F9)
          </>
        )}
        </button>
        {hasUnresolvedHighAlerts && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-red-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 shadow-lg">
            Khóa thanh toán do có cảnh báo HIGH chưa xác nhận
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-red-600"></div>
          </div>
        )}
      </div>

      {completedOrder && (
        <InvoiceModal
          isOpen={isInvoiceOpen}
          onClose={() => {
            setIsInvoiceOpen(false);
            setCompletedOrder(null);
          }}
          order={completedOrder}
          cartItems={invoiceCartItems}
        />
      )}
    </div>
  );
}
