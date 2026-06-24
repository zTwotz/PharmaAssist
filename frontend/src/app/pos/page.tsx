"use client";

import React, { useState, useEffect } from 'react';
import { MedicineSearch } from '@/components/pos/MedicineSearch';
import { PosCart } from '@/components/pos/PosCart';
import { CheckoutPanel } from '@/components/pos/CheckoutPanel';
import { InteractionWarningModal, InteractionData } from '@/components/pos/InteractionWarningModal';
import { usePosStore } from '@/store/usePosStore';
import axios from 'axios';
import { QuickSellTabs } from '@/components/pos/QuickSellTabs';

export default function PosPage() {
  const { cart, removeItem } = usePosStore();
  const [interactions, setInteractions] = useState<InteractionData[]>([]);
  const [showWarning, setShowWarning] = useState(false);
  const [acknowledgedInteractionIds, setAcknowledgedInteractionIds] = useState<number[]>([]);
  const [acknowledgedNotes, setAcknowledgedNotes] = React.useState<Record<number, string>>({});

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
        const response = await axios.post('http://localhost:3001/api/v1/interactions/check', {
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

  const handleAcknowledge = (alertData: { interactionId: number; note: string; }[] = []) => {
    // Save acknowledged interaction IDs so the warning doesn't keep popping up
    // In MVP, we might only require note for HIGH, but mark all as acknowledged locally
    const newIds = interactions.map(i => i.id);
    const newNotes: Record<number, string> = {};
    for (const item of alertData) {
      if (item.note) newNotes[item.interactionId] = item.note;
    }
    setAcknowledgedNotes(prev => ({ ...prev, ...newNotes }));
    setAcknowledgedInteractionIds(prev => [...prev, ...newIds]);
    setShowWarning(false);
  };

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden">
      {/* POS Top Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <h1 className="font-semibold text-slate-800 text-lg">Bán hàng (POS)</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-slate-600">Đang hoạt động</span>
          </div>
        </div>
      </header>

      {/* POS Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Product Search */}
        <div className="flex-1 flex flex-col h-full bg-white border-r border-slate-200">
          <div className="p-4 border-b border-slate-200 shadow-sm z-10 relative shrink-0">
            <MedicineSearch />
          </div>
          <div className="flex-1 overflow-hidden bg-slate-50">
            <QuickSellTabs />
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
            <CheckoutPanel hasUnresolvedHighAlerts={interactions.some(i => i.severity === 'HIGH')} acknowledgedNotes={acknowledgedNotes} />
          </div>
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
