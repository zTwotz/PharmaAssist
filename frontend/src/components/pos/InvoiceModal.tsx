'use client';

import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer, FileText, X, CheckCircle2 } from 'lucide-react';
import { PosCartItem } from '@/store/usePosStore';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: {
    code: string;
    createdAt: string;
    subtotal: number;
    totalAmount: number;
  } | null;
  cartItems: PosCartItem[];
}

export function InvoiceModal({ isOpen, onClose, order, cartItems }: InvoiceModalProps) {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!order) return null;

  const handlePrint = () => {
    // Add print styles dynamically
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden !important;
        }
        #print-invoice-area, #print-invoice-area * {
          visibility: visible !important;
        }
        #print-invoice-area {
          position: absolute !important;
          left: 0 !important;
          top: 0 !important;
          width: 80mm !important; /* Standard K80 receipt width */
          margin: 0 !important;
          padding: 10px !important;
          box-shadow: none !important;
          background: white !important;
          color: black !important;
          font-family: 'Courier New', Courier, monospace !important;
          font-size: 12px !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    window.print();
    
    // Cleanup style after print dialog closes
    setTimeout(() => {
      document.head.removeChild(style);
    }, 1000);
  };

  // eslint-disable-next-line react-hooks/purity
  const formattedDate = new Date(order.createdAt || Date.now()).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent className="sm:max-w-[500px] bg-white border border-hairline rounded-2xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        
        {/* Success Header */}
        <div className="flex flex-col items-center text-center pb-4 border-b border-dashed border-slate-200">
          <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-2.5">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-800">
            Thanh toán thành công!
          </DialogTitle>
          <p className="text-xs text-slate-500 mt-1">
            Đơn hàng đã được ghi nhận và trừ tồn kho tự động.
          </p>
        </div>

        {/* Invoice Printable Wrapper */}
        <div className="py-6 font-sans">
          <div 
            ref={printAreaRef} 
            id="print-invoice-area" 
            className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 shadow-inner max-w-[80mm] mx-auto text-xs text-slate-700"
          >
            {/* Pharmacy details */}
            <div className="text-center mb-4 pb-3 border-b border-dashed border-slate-300">
              <h3 className="font-bold text-sm text-slate-800 uppercase tracking-tight">
                Nhà thuốc PharmaAssist
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">
                Địa chỉ: 123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. HCM
              </p>
              <p className="text-[10px] text-slate-500">
                Hotline: 1800 6868 (Miễn phí)
              </p>
            </div>

            {/* Receipt title */}
            <div className="text-center mb-4">
              <h4 className="font-black text-xs text-slate-800 tracking-wider">
                HÓA ĐƠN BÁN LẺ
              </h4>
              <p className="text-[9px] font-mono text-slate-500 mt-0.5">
                Mã HĐ: {order.code}
              </p>
              <p className="text-[9px] font-mono text-slate-500">
                Thời gian: {formattedDate}
              </p>
            </div>

            {/* Items table */}
            <table className="w-full text-[10px] mb-4 border-collapse">
              <thead>
                <tr className="border-b border-slate-300 text-slate-500">
                  <th className="text-left py-1 font-bold">Tên thuốc/SP</th>
                  <th className="text-center py-1 font-bold w-[35px]">SL</th>
                  <th className="text-right py-1 font-bold w-[65px]">Đ.Giá</th>
                  <th className="text-right py-1 font-bold w-[75px]">T.Tiền</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, idx) => (
                  <tr key={idx} className="border-b border-slate-100">
                    <td className="py-1.5 leading-snug">
                      <span className="font-medium text-slate-800 block">{item.name}</span>
                      <span className="text-[8px] text-slate-400 font-mono">{item.sku} - {item.unitName}</span>
                    </td>
                    <td className="text-center py-1.5 text-slate-800 font-mono">
                      {item.quantity}
                    </td>
                    <td className="text-right py-1.5 text-slate-600 font-mono">
                      {new Intl.NumberFormat('vi-VN').format(item.sellingPrice)}
                    </td>
                    <td className="text-right py-1.5 text-slate-800 font-bold font-mono">
                      {new Intl.NumberFormat('vi-VN').format(item.sellingPrice * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Receipt Summary */}
            <div className="border-t border-dashed border-slate-300 pt-3 space-y-1.5 font-mono text-[10px]">
              <div className="flex justify-between items-center text-slate-600">
                <span>Tổng tiền hàng:</span>
                <span>{new Intl.NumberFormat('vi-VN').format(order.subtotal)} ₫</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Giảm giá:</span>
                <span>0 ₫</span>
              </div>
              <div className="flex justify-between items-center text-xs font-black text-slate-900 border-t border-slate-200 pt-1.5">
                <span>THÀNH TIỀN:</span>
                <span className="text-[#024ad8]">{new Intl.NumberFormat('vi-VN').format(order.totalAmount)} ₫</span>
              </div>
            </div>

            {/* Note/Thank you */}
            <div className="text-center mt-6 pt-3 border-t border-dashed border-slate-300 text-[9px] text-slate-500 italic">
              <p>Cảm ơn quý khách! Hẹn gặp lại!</p>
              <p className="mt-0.5 font-mono not-italic text-[7px] text-slate-400">
                Powered by PharmaAssist AI
              </p>
            </div>
          </div>
        </div>

        {/* Dialog Actions */}
        <DialogFooter className="flex flex-col sm:flex-row gap-2 border-t border-slate-100 pt-4">
          <Button 
            onClick={onClose} 
            variant="outline" 
            className="flex-1 rounded-xl h-11 text-slate-600 font-bold hover:bg-slate-50"
          >
            <X className="h-4 w-4 mr-1.5" />
            Đóng lại
          </Button>
          
          <Button 
            onClick={handlePrint} 
            className="flex-1 bg-[#024ad8] hover:bg-blue-700 text-white font-bold rounded-xl h-11"
          >
            <Printer className="h-4 w-4 mr-1.5" />
            In hóa đơn
          </Button>

          <Button 
            onClick={handlePrint} 
            variant="secondary"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl h-11 border border-slate-200"
            title="Sử dụng tính năng in của hệ thống và chọn 'Lưu dưới dạng PDF'"
          >
            <FileText className="h-4 w-4 mr-1.5" />
            Xuất PDF
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}
