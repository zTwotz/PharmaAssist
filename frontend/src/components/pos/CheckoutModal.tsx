import React from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

export function CheckoutModal({ isOpen, onClose, totalAmount }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = React.useState('CASH');

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
          
          {/* Payment method selector (TASK-267) */}
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-700">Phương thức thanh toán</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('CASH')}
                className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'CASH'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">Tiền mặt</span>
              </button>
              
              <button
                onClick={() => setPaymentMethod('BANK_TRANSFER')}
                className={`p-4 border rounded-xl flex flex-col items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'BANK_TRANSFER'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                }`}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span className="font-medium">Chuyển khoản</span>
              </button>
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
