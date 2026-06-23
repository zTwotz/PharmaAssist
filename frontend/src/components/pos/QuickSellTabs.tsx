import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePosStore } from '@/store/usePosStore';
import Image from 'next/image';

interface Medicine {
  id: number;
  name: string;
  sku: string;
  sellingPrice: number;
  imageUrl: string | null;
  baseUnit: string;
  product: {
    variants: { id: number }[];
  };
}

interface MedicineGroup {
  id: number;
  name: string;
  description: string;
  members: {
    medicine: Medicine;
  }[];
}

export function QuickSellTabs() {
  const [activeTab, setActiveTab] = useState<'TOP_SELLING' | 'COMBOS'>('TOP_SELLING');
  const [topSelling, setTopSelling] = useState<Medicine[]>([]);
  const [combos, setCombos] = useState<MedicineGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const { addItem } = usePosStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'TOP_SELLING' && topSelling.length === 0) {
          const res = await axios.get('http://localhost:3001/api/v1/medicines/top-selling', {
            withCredentials: true
          });
          setTopSelling(res.data);
        } else if (activeTab === 'COMBOS' && combos.length === 0) {
          const res = await axios.get('http://localhost:3001/api/v1/medicine-groups', {
            withCredentials: true
          });
          setCombos(res.data);
        }
      } catch (error) {
        console.error('Error fetching quick sell data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const handleAddCombo = (combo: MedicineGroup) => {
    combo.members.forEach(member => {
      if (member.medicine) {
        const variantId = member.medicine.product?.variants?.[0]?.id || 0;
        addItem({
          productVariantId: variantId,
          medicineId: member.medicine.id,
          name: member.medicine.name,
          sku: member.medicine.sku,
          sellingPrice: member.medicine.sellingPrice || 0,
          unitName: member.medicine.baseUnit,
          maxQuantity: 999, // default
        });
      }
    });
  };

  const handleAddMedicine = (med: Medicine) => {
    const variantId = med.product?.variants?.[0]?.id || 0;
    addItem({
      productVariantId: variantId,
      medicineId: med.id,
      name: med.name,
      sku: med.sku,
      sellingPrice: med.sellingPrice || 0,
      unitName: med.baseUnit,
      maxQuantity: 999, // default
    });
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tabs Header */}
      <div className="flex border-b border-slate-200 shrink-0 px-4 mt-2">
        <button
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'TOP_SELLING'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }`}
          onClick={() => setActiveTab('TOP_SELLING')}
        >
          Sản phẩm bán chạy
        </button>
        <button
          className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
            activeTab === 'COMBOS'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          }`}
          onClick={() => setActiveTab('COMBOS')}
        >
          Đơn thuốc mẫu (Combo)
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-4 bg-slate-50">
        {loading ? (
          <div className="flex justify-center items-center h-full text-slate-500">
            Đang tải dữ liệu...
          </div>
        ) : (
          <>
            {activeTab === 'TOP_SELLING' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {topSelling.map(med => (
                  <div
                    key={med.id}
                    onClick={() => handleAddMedicine(med)}
                    className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 cursor-pointer transition-all flex flex-col group"
                  >
                    <div className="aspect-square bg-slate-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {med.imageUrl ? (
                        <Image src={med.imageUrl} alt={med.name} width={120} height={120} className="object-cover" />
                      ) : (
                        <span className="text-slate-400 text-3xl">💊</span>
                      )}
                    </div>
                    <h4 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {med.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 mb-2">{med.sku}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="font-bold text-blue-700">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(med.sellingPrice || 0)}
                      </span>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded">/{med.baseUnit}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'COMBOS' && (
              <div className="space-y-4">
                {combos.map(combo => (
                  <div
                    key={combo.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg text-blue-700">{combo.name}</h3>
                        <p className="text-sm text-slate-600">{combo.description}</p>
                      </div>
                      <button
                        onClick={() => handleAddCombo(combo)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Thêm Combo
                      </button>
                    </div>
                    
                    {/* Danh sách thuốc trong combo */}
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Thành phần ({combo.members.length} thuốc):</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {combo.members.map((member, idx) => (
                          <li key={idx} className="text-sm text-slate-700 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            <span className="font-medium">{member.medicine?.name}</span>
                            <span className="text-slate-400 text-xs">- {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(member.medicine?.sellingPrice || 0)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
