"use client";

import React from 'react';
import { AlertTriangle, X, ShieldAlert, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/context/auth-context';

export interface InteractionData {
  id: number;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  medicineA: { id: number; name: string };
  medicineB: { id: number; name: string };
  description: string;
  recommendation: string;
  acknowledged?: boolean;
  consultationNote?: string;
}

interface Props {
  interactions: InteractionData[];
  onClose: () => void;
  onAcknowledge: (alertData: { interactionId: number; note: string; }[]) => void;
  onRemoveItem: (id: string) => void;
  cartItems: any[]; // To find cart id from medicine id
}

export function InteractionWarningModal({ interactions, onClose, onAcknowledge, onRemoveItem, cartItems }: Props) {
  const { hasPermission } = useAuth();
  const [notes, setNotes] = React.useState<Record<number, string>>({});
  const [acks, setAcks] = React.useState<Record<number, boolean>>({});
  const [aiStates, setAiStates] = React.useState<Record<number, { loading?: boolean; explanation?: string; disclaimer?: string; error?: string }>>({});

  const fetchAiExplanation = async (interaction: InteractionData) => {
    setAiStates(prev => ({ ...prev, [interaction.id]: { loading: true, error: undefined } }));
    try {
      const response = await api.post('/ai/interaction-explanation', {
        alertContext: interaction.severity,
        medicines: [interaction.medicineA.name, interaction.medicineB.name],
        activeIngredients: [], // Assuming we don't have this right in the modal, empty is ok for AI prompt if it's optional
        ruleDescription: interaction.description,
      });
      setAiStates(prev => ({
        ...prev,
        [interaction.id]: {
          loading: false,
          explanation: response.data.data.explanation,
          disclaimer: response.data.data.disclaimer,
        }
      }));
    } catch (err: any) {
      setAiStates(prev => ({
        ...prev,
        [interaction.id]: {
          loading: false,
          error: err.response?.data?.message || 'Không thể tải AI explanation',
        }
      }));
    }
  };

  if (interactions.length === 0) return null;

  const highInteractions = interactions.filter(i => i.severity === 'HIGH');
  const allHighAcknowledged = highInteractions.every(i => acks[i.id] && notes[i.id]?.trim().length > 0);


  const handleRemoveMedicine = (medicineId: number) => {
    // Find the cart item with this medicineId
    const item = cartItems.find(i => i.medicineId === medicineId);
    if (item) {
      onRemoveItem(item.id);
    }
  };

  const hasSevere = interactions.some(i => i.severity === 'HIGH');

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
              <div className={`absolute top-0 left-0 w-1 h-full ${
                interaction.severity === 'HIGH' ? 'bg-red-500' : 
                interaction.severity === 'MEDIUM' ? 'bg-orange-400' : 'bg-yellow-400'
              }`}></div>
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${
                      interaction.severity === 'HIGH' ? 'bg-red-100 text-red-700' :
                      interaction.severity === 'MEDIUM' ? 'bg-orange-100 text-orange-700' :
                      'bg-yellow-100 text-yellow-800'
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
                  
                  <div className="text-sm text-slate-600 bg-blue-50 p-2 rounded-lg border border-blue-100 mb-3">
                    <strong>Khuyến nghị: </strong>{interaction.recommendation}
                  </div>

                  {/* AI Explanation Block */}
                  {hasPermission('USE_AI_COPILOT') && (
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm">
                          <Sparkles size={16} />
                          AI Copilot Giải Thích
                        </div>
                        {!aiStates[interaction.id]?.explanation && !aiStates[interaction.id]?.loading && (
                          <button
                            onClick={() => fetchAiExplanation(interaction)}
                            className="px-3 py-1 text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md transition-colors"
                          >
                            Hỏi AI
                          </button>
                        )}
                      </div>

                      {aiStates[interaction.id]?.loading && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 mt-2">
                          <Loader2 size={14} className="animate-spin" /> Đang phân tích...
                        </div>
                      )}

                      {aiStates[interaction.id]?.error && (
                        <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-2 mt-2 rounded">
                          <AlertCircle size={16} className="shrink-0 mt-0.5" />
                          <span>{aiStates[interaction.id]?.error}</span>
                          <button onClick={() => fetchAiExplanation(interaction)} className="underline ml-auto font-medium">Thử lại</button>
                        </div>
                      )}

                      {aiStates[interaction.id]?.explanation && (
                        <div className="mt-3 text-sm text-slate-700">
                          <div className="prose prose-sm prose-slate max-w-none mb-3" dangerouslySetInnerHTML={{ __html: aiStates[interaction.id]?.explanation || '' }} />
                          {aiStates[interaction.id]?.disclaimer && (
                            <div className="text-xs text-slate-500 italic border-t border-slate-200 pt-2">
                              {aiStates[interaction.id]?.disclaimer}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
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
              {interaction.severity === 'HIGH' && (
                <div className="mt-4 pt-4 border-t border-red-100 bg-red-50/50 -mx-4 -mb-4 p-4 rounded-b-xl flex flex-col gap-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mt-1 w-5 h-5 text-red-600 rounded border-red-300 focus:ring-red-500"
                      checked={!!acks[interaction.id]}
                      onChange={(e) => setAcks(prev => ({ ...prev, [interaction.id]: e.target.checked }))}
                    />
                    <span className="text-sm text-red-900 font-medium">
                      Tôi xác nhận đã thông báo cho khách hàng về rủi ro này và chịu trách nhiệm chuyên môn.
                    </span>
                  </label>
                  {acks[interaction.id] && (
                    <div className="pl-8">
                      <textarea
                        className="w-full text-sm rounded-lg border-red-200 focus:border-red-500 focus:ring-red-500 p-2"
                        rows={2}
                        placeholder="Ghi chú tư vấn (Bắt buộc)..."
                        value={notes[interaction.id] || ''}
                        onChange={(e) => setNotes(prev => ({ ...prev, [interaction.id]: e.target.value }))}
                      ></textarea>
                    </div>
                  )}
                </div>
              )}
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
        <div className="p-4 bg-white border-t border-slate-200 flex justify-between items-center shrink-0">
          <div className="text-sm text-slate-500">
            {highInteractions.length > 0 && !allHighAcknowledged && (
              <span className="text-red-500 font-medium flex items-center gap-1">
                <AlertTriangle size={16} />
                Vui lòng xác nhận và ghi chú cho tất cả cảnh báo HIGH.
              </span>
            )}
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="px-5 py-2 rounded-xl text-slate-600 font-medium hover:bg-slate-100 transition-colors"
            >
              Sửa lại giỏ hàng
            </button>
            <button 
              onClick={() => {
                const payload = highInteractions.map(i => ({
                  interactionId: i.id,
                  note: notes[i.id] || ''
                }));
                onAcknowledge(payload);
              }}
              disabled={highInteractions.length > 0 && !allHighAcknowledged}
              className={`px-5 py-2 rounded-xl text-white font-bold transition-all flex items-center gap-2 ${
                (highInteractions.length > 0 && !allHighAcknowledged)
                  ? 'bg-slate-300 cursor-not-allowed shadow-none text-slate-500'
                  : hasSevere 
                  ? 'bg-red-600 hover:bg-red-700 shadow-md shadow-red-200' 
                  : 'bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-200'
              }`}
            >
              TÔI XÁC NHẬN BỎ QUA CẢNH BÁO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// PAC-TASK-243: build POS InteractionAlert panel
