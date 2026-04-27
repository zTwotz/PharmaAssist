import React from 'react';
import { X } from 'lucide-react';

interface GraphDetailPanelProps {
  selectedItem: any | null;
  itemType: 'node' | 'link' | null;
  onClose: () => void;
}

export default function GraphDetailPanel({ selectedItem, itemType, onClose }: GraphDetailPanelProps) {
  if (!selectedItem || !itemType) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-80 bg-white dark:bg-zinc-950 border-l dark:border-zinc-800 shadow-xl z-20 flex flex-col overflow-hidden animate-in slide-in-from-right duration-300">
      <div className="flex items-center justify-between p-4 border-b dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <h2 className="font-semibold text-lg text-zinc-900 dark:text-zinc-50 truncate">
          {itemType === 'node' ? 'Node Details' : 'Relationship Details'}
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {itemType === 'node' && (
          <>
            <div>
              <h3 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider mb-2">Labels</h3>
              <div className="flex flex-wrap gap-2">
                {selectedItem.labels?.map((label: string) => (
                  <span key={label} className="px-2 py-1 bg-[#024ad8]/10 text-[#024ad8] dark:bg-[#024ad8]/20 dark:text-blue-300 rounded text-xs font-medium">
                    {label}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider mb-2">Properties</h3>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md p-3 border dark:border-zinc-800 text-sm">
                {Object.keys(selectedItem.properties || {}).length === 0 ? (
                  <span className="text-zinc-400 italic">No properties</span>
                ) : (
                  <dl className="space-y-2">
                    {Object.entries(selectedItem.properties).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 gap-2 border-b dark:border-zinc-800 pb-2 last:border-0 last:pb-0">
                        <dt className="text-zinc-500 font-medium col-span-1 truncate" title={key}>{key}</dt>
                        <dd className="text-zinc-900 dark:text-zinc-300 col-span-2 break-words">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </>
        )}

        {itemType === 'link' && (
          <>
            <div>
              <h3 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider mb-2">Type</h3>
              <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 rounded text-sm font-medium">
                {selectedItem.type}
              </span>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase text-zinc-500 tracking-wider mb-2">Properties</h3>
              <div className="bg-zinc-50 dark:bg-zinc-900 rounded-md p-3 border dark:border-zinc-800 text-sm">
                {Object.keys(selectedItem.properties || {}).length === 0 ? (
                  <span className="text-zinc-400 italic">No properties</span>
                ) : (
                  <dl className="space-y-2">
                    {Object.entries(selectedItem.properties).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 gap-2 border-b dark:border-zinc-800 pb-2 last:border-0 last:pb-0">
                        <dt className="text-zinc-500 font-medium col-span-1 truncate" title={key}>{key}</dt>
                        <dd className="text-zinc-900 dark:text-zinc-300 col-span-2 break-words">{String(value)}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
