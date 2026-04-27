'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import api from '@/lib/api';
import GraphDetailPanel from '@/components/GraphDetailPanel';
import { RouteGuard } from '@/components/route-guard';

// Dynamically import GraphExplorer without SSR
const GraphExplorer = dynamic(() => import('@/components/GraphExplorer'), {
  ssr: false,
  loading: () => <p className="p-4">Loading Graph Visualization...</p>,
});

export default function GraphExplorerPage() {
  return (
    <RouteGuard allowedRoles={['ADMIN', 'STAFF']}>
      <GraphExplorerContent />
    </RouteGuard>
  );
}

function GraphExplorerContent() {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [itemType, setItemType] = useState<'node' | 'link' | null>(null);
  const [isStale, setIsStale] = useState(false);

  
  const handleNodeClick = (node: any) => {
    setSelectedItem(node);
    setItemType('node');
  };

  const handleLinkClick = (link: any) => {
    setSelectedItem(link);
    setItemType('link');
  };

  const handleClosePanel = () => {
    setSelectedItem(null);
    setItemType(null);
  };

  useEffect(() => {
    async function fetchGraph() {
      try {
        const [networkRes, freshnessRes] = await Promise.all([
          api.get('/graph-explorer/network'),
          api.get('/graph-explorer/freshness'),
        ]);
        setGraphData(networkRes.data);
        setIsStale(freshnessRes.data.isStale);
        
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || 'Failed to load graph data');
      } finally {
        setLoading(false);
      }
    }
    fetchGraph();
  }, []);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b dark:border-zinc-800 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">Graph Explorer</h1>
      </div>
      
      
      {isStale && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-b border-yellow-200 dark:border-yellow-800 p-3 flex items-center justify-center text-sm text-yellow-800 dark:text-yellow-200">
          <span className="font-semibold mr-2">Warning:</span>
          Graph data might be stale. There are pending sync jobs in the queue.
        </div>
      )}

      <div className="flex-grow relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-zinc-950/80 z-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#024ad8]"></div>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="bg-red-50 text-red-500 p-4 rounded-md text-center max-w-md">
              <p className="font-semibold mb-2">Error loading graph</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <div className="w-full h-full bg-zinc-50 dark:bg-zinc-900 overflow-hidden">
            <GraphExplorer graphData={graphData} onNodeClick={handleNodeClick} onLinkClick={handleLinkClick} />
            <GraphDetailPanel selectedItem={selectedItem} itemType={itemType} onClose={handleClosePanel} />
          </div>
        )}
      </div>
    </div>
  );
}
