
import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';
import api from '@/lib/api';

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    api.get('/admin/notifications').then(res => setNotifications(res.data)).catch(() => {});
  }, []);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="relative">
      <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} className="relative">
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg p-4 z-50">
          <h3 className="font-semibold mb-2">Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications.</p>
          ) : (
            <ul className="max-h-64 overflow-y-auto space-y-2">
              {notifications.map(n => (
                <li key={n.id} className={`text-sm p-2 rounded ${n.isRead ? 'bg-gray-50' : 'bg-blue-50 font-medium'}`}>
                  {n.notification?.title || 'Notification'}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
