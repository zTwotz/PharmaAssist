import React from 'react';

export const metadata = {
  title: 'PharmaAssist POS',
  description: 'Point of Sale System cho Dược sĩ',
};

export default function PosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden flex flex-col">
      {/* POS Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            P
          </div>
          <h1 className="font-semibold text-slate-800 text-lg">PharmaAssist POS</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-slate-600">Dược sĩ: Admin</span>
          </div>
          <a href="/" className="text-sm text-blue-600 hover:underline">
            Quay lại trang chủ
          </a>
        </div>
      </header>

      {/* POS Content */}
      <main className="flex-1 flex overflow-hidden">
        {children}
      </main>
    </div>
  );
}
