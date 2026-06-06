"use client";

import React, { useState, useEffect } from 'react';
import { MedicineSearch } from '@/components/pos/MedicineSearch';
import { PosCart } from '@/components/pos/PosCart';
import { CheckoutPanel } from '@/components/pos/CheckoutPanel';
import { InteractionWarningModal, InteractionData } from '@/components/pos/InteractionWarningModal';
import { usePosStore } from '@/store/usePosStore';
import axios from 'axios';

export default function PosPage() {
  const { cart, removeItem } = usePosStore();
  const [interactions, setInteractions] = useState<InteractionData[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [acknowledgedInteractionIds, setAcknowledgedInteractionIds] = useState<number[]>([]);

  // Check for drug interactions when cart changes
  useEffect(() => {
    const checkInteractions = async () => {
      // Get unique medicine IDs from the cart
      const medicineIds = cart
        .map(item => item.medicineId)
        .filter((id): id is number => id !== undefined);

      // Need at least 2 medicines to check interactions
      if (new Set(medicineIds).size < 2) {
        setShowWarning(false);
        setInteractions([]);
        return;
      }

      try {
        const response = await axios.post('http://localhost:3001/api/interactions/check', {
          medicineIds: Array.from(new Set(medicineIds)),
        });

        const data = response.data;
        if (data && data.hasInteractions) {
          // Filter out interactions the pharmacist has already acknowledged
          const newInteractions = data.interactions.filter(
            (i: InteractionData) => !acknowledgedInteractionIds.includes(i.id)
          );

          if (newInteractions.length > 0) {
            setInteractions(newInteractions);
            setShowWarning(true);
          }
        } else {
          setShowWarning(false);
          setInteractions([]);
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra tương tác thuốc:', error);
      }
    };

    checkInteractions();
  }, [cart, acknowledgedInteractionIds]);

  const handleAcknowledge = () => {
    // Save acknowledged interaction IDs so the warning doesn't keep popping up
    const newIds = interactions.map(i => i.id);
    setAcknowledgedInteractionIds(prev => [...prev, ...newIds]);
    setShowWarning(false);
  };

  return (
    <div className="flex-1 flex w-full h-full">
      {/* Left Column: Product Search */}
      <div className="flex-1 flex flex-col h-full bg-white border-r border-slate-200">
        <div className="p-4 border-b border-slate-200 shadow-sm z-10 relative">
          <MedicineSearch />
        </div>
        <div className="flex-1 overflow-auto p-4 bg-slate-50/50">
          <div className="text-center text-slate-500 mt-20">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p>Gõ tên thuốc hoặc mã SKU (Ví dụ: Paracetamol, SKU123)</p>
            <p className="text-sm mt-1">Hoặc quét mã vạch để thêm nhanh vào đơn</p>
          </div>
        </div>
      </div>

      {/* Right Column: Cart & Checkout */}
      <div className="w-[400px] xl:w-[450px] shrink-0 flex flex-col bg-slate-50 h-full">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="font-semibold text-slate-800 text-lg flex items-center gap-2">
            Giỏ Hàng <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">POS</span>
          </h2>
        </div>
        
        <div className="flex-1 overflow-auto bg-slate-50">
          <PosCart />
        </div>

        <div className="bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <CheckoutPanel />
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <InteractionWarningModal
          interactions={interactions}
          onClose={() => setShowWarning(false)}
          onAcknowledge={handleAcknowledge}
          onRemoveItem={removeItem}
          cartItems={cart}
        />
      )}
    </div>
  );
}
