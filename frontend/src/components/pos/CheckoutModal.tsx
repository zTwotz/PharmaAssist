import React from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

export function CheckoutModal({ isOpen, onClose, totalAmount }: CheckoutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-800">Thanh toán</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="text-sm text-blue-600 font-medium mb-1">Tổng tiền thanh toán</div>
            <div className="text-3xl font-bold text-blue-800">
              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
            </div>
          </div>
          
          {/* Payment method placeholder (for TASK-267) */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-700">Phương thức thanh toán</h3>
            <div className="p-4 border rounded-xl text-slate-500 text-center bg-slate-50">
              (Phương thức thanh toán sẽ được cập nhật)
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-white">
          <button
            className="w-full py-4 bg-[#024ad8] hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg transition-all active:scale-[0.98]"
            onClick={() => {
              alert('Đang xử lý thanh toán...');
            }}
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
