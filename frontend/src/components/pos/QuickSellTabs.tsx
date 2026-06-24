import React, { useEffect, useState } from 'react';
import api from '@/lib/api';
import { usePosStore } from '@/store/usePosStore';
import Image from 'next/image';
import { Pill, Flame, Package, ShoppingCart, Search, Info } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = usePosStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'TOP_SELLING' && topSelling.length === 0) {
          const res = await api.get('/medicines/top-selling');
          setTopSelling(res.data);
        } else if (activeTab === 'COMBOS' && combos.length === 0) {
          const res = await api.get('/medicine-groups');
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
          maxQuantity: 999,
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
      maxQuantity: 999,
    });
  };

  const filteredTopSelling = topSelling.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    med.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCombos = combos.filter(combo => 
    combo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#f8fafc]">
      {/* Premium Tabs Header */}
      <div className="flex items-center gap-6 px-6 pt-4 bg-white border-b border-slate-200 shrink-0">
        <button
          className={`pb-3 font-semibold text-sm transition-all duration-300 relative flex items-center gap-2 ${
            activeTab === 'TOP_SELLING'
              ? 'text-blue-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          onClick={() => setActiveTab('TOP_SELLING')}
        >
          <Flame className={`w-4 h-4 ${activeTab === 'TOP_SELLING' ? 'text-orange-500' : ''}`} />
          Sản phẩm bán chạy
          {activeTab === 'TOP_SELLING' && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.4)]"></span>
          )}
        </button>
        <button
          className={`pb-3 font-semibold text-sm transition-all duration-300 relative flex items-center gap-2 ${
            activeTab === 'COMBOS'
              ? 'text-blue-700'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          onClick={() => setActiveTab('COMBOS')}
        >
          <Package className={`w-4 h-4 ${activeTab === 'COMBOS' ? 'text-blue-500' : ''}`} />
          Đơn thuốc mẫu (Combo)
          {activeTab === 'COMBOS' && (
            <span className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-full shadow-[0_-2px_10px_rgba(37,99,235,0.4)]"></span>
          )}
        </button>
      </div>

      {/* Internal Search Bar */}
      <div className="px-6 py-4 bg-white border-b border-slate-100 shadow-sm shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder={activeTab === 'TOP_SELLING' ? "Tìm thuốc trong danh sách..." : "Tìm đơn thuốc combo..."}
            className="w-full bg-slate-50 border border-slate-200 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6 scroll-smooth">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-full text-slate-400 gap-3">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="font-medium animate-pulse text-blue-600">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            {activeTab === 'TOP_SELLING' && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-5">
                {filteredTopSelling.map(med => (
                  <div
                    key={med.id}
                    onClick={() => handleAddMedicine(med)}
                    className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:border-blue-200 cursor-pointer transition-all duration-300 flex flex-col group overflow-hidden"
                  >
                    <div className="aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden relative border border-slate-50">
                      {med.imageUrl ? (
                        <Image src={med.imageUrl} alt={med.name} fill className="object-contain p-2 mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                      ) : (
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-100 group-hover:text-blue-500 transition-all duration-500">
                          <Pill size={32} strokeWidth={1.5} />
                        </div>
                      )}
                      
                      {/* Quick Add Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white text-blue-600 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                          <ShoppingCart className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {med.name || "Sản phẩm chưa có tên"}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-400 mt-1 uppercase tracking-wider">{med.sku || 'N/A'}</p>
                      
                      <div className="mt-auto pt-3 flex items-end justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-medium mb-0.5">Giá bán lẻ</span>
                          <span className="font-extrabold text-blue-600 text-base">
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(med.sellingPrice || 0)}
                          </span>
                        </div>
                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">/{med.baseUnit || 'Đơn vị'}</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredTopSelling.length === 0 && !loading && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-400">
                    <Info className="w-12 h-12 mb-3 opacity-50" />
                    <p>Không tìm thấy sản phẩm nào.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'COMBOS' && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filteredCombos.map(combo => (
                  <div
                    key={combo.id}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group"
                  >
                    <div className="p-5 flex-1">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">Combo Tiết Kiệm</span>
                          </div>
                          <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">{combo.name || "Đơn thuốc mẫu"}</h3>
                          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{combo.description || "Combo hỗ trợ tối ưu điều trị"}</p>
                        </div>
                        <button
                          onClick={() => handleAddCombo(combo)}
                          className="shrink-0 bg-white border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white hover:border-transparent px-4 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-blue-500/30"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Thêm nhanh
                        </button>
                      </div>
                      
                      <div className="mt-5 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-50 pointer-events-none"></div>
                        <div className="relative p-4 rounded-xl border border-blue-100/50">
                          <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                              <Pill className="w-3.5 h-3.5 text-blue-500" />
                              Bao gồm {combo.members?.length || 0} thuốc:
                            </p>
                          </div>
                          <ul className="space-y-2">
                            {combo.members?.map((member, idx) => (
                              <li key={idx} className="flex items-center justify-between group/item">
                                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/item:scale-150 transition-transform"></div>
                                  <span className="font-semibold text-sm text-slate-700 truncate">{member.medicine?.name || "Chưa rõ tên thuốc"}</span>
                                  <span className="text-[10px] font-medium text-slate-400 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">x1 {member.medicine?.baseUnit || ''}</span>
                                </div>
                                <span className="font-bold text-slate-600 text-sm pl-4">
                                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(member.medicine?.sellingPrice || 0)}
                                </span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-500">Tổng giá trị combo</span>
                            <span className="text-lg font-extrabold text-blue-600">
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
                                combo.members?.reduce((acc, m) => acc + Number(m.medicine?.sellingPrice || 0), 0) || 0
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredCombos.length === 0 && !loading && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-slate-400">
                    <Info className="w-12 h-12 mb-3 opacity-50" />
                    <p>Không tìm thấy combo nào.</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
