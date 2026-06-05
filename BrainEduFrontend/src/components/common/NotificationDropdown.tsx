import React, { useState } from 'react';
import { Bell, Info, CreditCard, BookOpen, AlertTriangle } from 'lucide-react';
import useGetNotification from '../../hooks/useGetNotification';
import useReadNotification from '../../hooks/useReadNotification';
import type { NotificationResponse } from '../../types/api-response';
import NotificationDetailModal from './NotificationDetailModal';
import useReadAllNotification from '../../hooks/useReadAllNotification';

type Props = {
  onClose: () => void;
};

const NotificationDropdown: React.FC<Props> = ({ onClose }) => {
  const { data, isPending } = useGetNotification();
  const { mutate: readNoti } = useReadNotification();
  const { mutate: readAllNoti } = useReadAllNotification()
  
  const notifications = data?.data || [];
  const [selectedNoti, setSelectedNoti] = useState<NotificationResponse | null>(null);

  const getTypeStyle = (type: string) => {
    switch (type?.toUpperCase()) {
      case 'PAYMENT':
        return { bg: 'bg-emerald-50 text-emerald-600', icon: CreditCard };
      case 'COURSE':
        return { bg: 'bg-blue-50 text-blue-600', icon: BookOpen };
      case 'SYSTEM':
        return { bg: 'bg-amber-50 text-amber-600', icon: AlertTriangle };
      default:
        return { bg: 'bg-gray-50 text-gray-600', icon: Info };
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  const handleNotificationClick = (item: NotificationResponse) => {
    setSelectedNoti(item);
    if (!item.isRead) {
      readNoti(item.id);
    }
  };

  const handleMarkAllAsRead = () => {
    readAllNoti()
  };

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-1 duration-200 z-50">
      <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
        <span className="font-bold text-gray-800 text-sm">Thông báo gần đây</span>
        {notifications.some(n => !n.isRead) && (
          <button 
            onClick={handleMarkAllAsRead}
            className="text-[11px] text-[#0052cc] font-semibold cursor-pointer hover:underline bg-transparent border-none outline-none p-0"
          >
            Đánh dấu đã đọc
          </button>
        )}
      </div>

      <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
        {isPending ? (
          <div className="p-4 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-gray-100 shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-400 text-xs flex flex-col items-center gap-2">
            <Bell size={24} className="text-gray-300" />
            <span>Bạn chưa có thông báo nào</span>
          </div>
        ) : (
          notifications.map((item) => {
            const { bg, icon: IconComponent } = getTypeStyle(item.type);
            return (
              <div
                key={item.id}
                onClick={() => handleNotificationClick(item)}
                className={`p-3 flex gap-3 hover:bg-gray-50/80 transition-colors cursor-pointer relative ${
                  !item.isRead ? 'bg-blue-50/20' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
                  <IconComponent size={15} />
                </div>
                <div className="flex-1 space-y-0.5 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-xs truncate ${!item.isRead ? 'font-bold text-gray-900' : 'font-semibold text-gray-700'}`}>
                      {item.title}
                    </p>
                    {!item.isRead && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0052cc] mt-1.5 shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 line-clamp-2 leading-relaxed">
                    {item.content}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium">
                    {formatTime(item.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
      {selectedNoti && (
        <NotificationDetailModal 
          notification={selectedNoti} 
          onClose={() => setSelectedNoti(null)} 
        />
      )}
    </div>
  );
};

export default NotificationDropdown;