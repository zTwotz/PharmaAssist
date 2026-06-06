"use client";

import React from 'react';
import { AlertTriangle, X, ShieldAlert } from 'lucide-react';

export interface InteractionData {
  id: number;
  severity: string;
  medicineA: { id: number; name: string };
  medicineB: { id: number; name: string };
  description: string;
  recommendation: string;
}

interface Props {
  interactions: InteractionData[];
  onClose: () => void;
  onAcknowledge: () => void;
  onRemoveItem: (id: string) => void;
  cartItems: any[]; // To find cart id from medicine id
}

export function InteractionWarningModal({ interactions, onClose, onAcknowledge, onRemoveItem, cartItems }: Props) {
  if (interactions.length === 0) return null;

  const handleRemoveMedicine = (medicineId: number) => {
    // Find the cart item with this medicineId
    const item = cartItems.find(i => i.medicineId === medicineId);
    if (item) {
      onRemoveItem(item.id);
    }
  };

  const hasSevere = interactions.some(i => i.severity === 'SEVERE' || i.severity === 'Nghiêm trọng');

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className={`p-4 flex items-center justify-between text-white ${hasSevere ? 'bg-red-600' : 'bg-orange-500'}`}>
          <div className="flex items-center gap-3">
            {hasSevere ? <ShieldAlert size={28} /> : <AlertTriangle size={28} />}
            <div>
              <h3 className="font-bold text-lg leading-tight">Cảnh Báo Tương Tác Thuốc</h3>
              <p className="text-sm opacity-90 font-medium">
                Phát hiện {interactions.length} tương tác trong giỏ hàng
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 space-y-4 bg-slate-50">
          {interactions.map((interaction, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${interaction.severity === 'SEVERE' || interaction.severity === 'Nghiêm trọng' ? 'bg-red-500' : 'bg-orange-400'}`}></div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                      interaction.severity === 'SEVERE' || interaction.severity === 'Nghiêm trọng' 
                        ? 'bg-red-100 text-red-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {interaction.severity}
                    </span>
                    <span className="font-semibold text-slate-800">
                      {interaction.medicineA.name} <span className="text-slate-400 mx-1">↔</span> {interaction.medicineB.name}
                    </span>
                  </div>
                  
                  <div className="text-sm text-slate-600 mb-2">
                    <strong>Hậu quả: </strong>{interaction.description}
                  </div>
                  
                  <div className="text-sm text-slate-600 bg-blue-50 p-2 rounded-lg border border-blue-100">
                    <strong>Khuyến nghị: </strong>{interaction.recommendation}
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 justify-center shrink-0 border-l border-slate-100 pl-4">
                  <button 
                    onClick={() => handleRemoveMedicine(interaction.medicineA.id)}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg transition-colors"
                  >
                    Bỏ {interaction.medicineA.name}
                  </button>
                  <button 
                    onClick={() => handleRemoveMedicine(interaction.medicineB.id)}
                    className="px-3 py-1.5 text-xs font-medium bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-lg transition-colors"
                  >
                    Bỏ {interaction.medicineB.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-100 flex gap-2">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p><strong>Lưu ý an toàn:</strong> Bạn là Dược sĩ phụ trách chuyên môn. Nếu bạn xác nhận bỏ qua cảnh báo này, lịch sử sẽ được ghi lại vào hệ thống để truy xuất sau này.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex justify-end gap-3 shrink-0">
          <button 
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors"
          >
            Sửa lại giỏ hàng
          </button>
          <button 
            onClick={onAcknowledge}
            className={`px-5 py-2 rounded-xl text-white font-bold transition-all flex items-center gap-2 ${
              hasSevere 
                ? 'bg-red-600 hover:bg-red-700 shadow-md shadow-red-200' 
                : 'bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-200'
            }`}
          >
            TÔI XÁC NHẬN BỎ QUA CẢNH BÁO
          </button>
        </div>
      </div>
    </div>
  );
}
