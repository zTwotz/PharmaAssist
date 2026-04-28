
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import api from '@/lib/api';

export function useRealtimeInventory() {
  const [updates, setUpdates] = useState<any[]>([]);

  useEffect(() => {
    // Polling fallback
    const interval = setInterval(async () => {
      try {
        const res = await api.get('/admin/inventory/latest-updates');
        if (res.data && res.data.length > 0) {
          setUpdates(prev => [...prev, ...res.data]);
        }
      } catch (e) {
        // Ignore fallback errors
      }
    }, 30000); // 30s polling fallback

    // Supabase Realtime
    const channel = supabase.channel('inventory-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Inventory' }, payload => {
        setUpdates(prev => [...prev, payload.new]);
      })
      .subscribe();

    return () => {
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);

  return { updates };
}
