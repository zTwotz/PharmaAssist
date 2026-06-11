"use client";

import React, { useState } from 'react';
import { usePosStore, PosCartItem } from '@/store/usePosStore';
import axios from 'axios';
import { InvoiceModal } from './InvoiceModal';

export function CheckoutPanel() {
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

      <button
        onClick={handleCheckout}
        disabled={cart.length === 0 || isProcessing}
        className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
          cart.length === 0
            ? 'bg-slate-300 cursor-not-allowed shadow-none'
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
