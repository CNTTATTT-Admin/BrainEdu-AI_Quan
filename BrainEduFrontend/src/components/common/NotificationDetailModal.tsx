import React from 'react';
import { X, Info, CreditCard, BookOpen, AlertTriangle, Calendar } from 'lucide-react';
import type { NotificationResponse } from '../../types/api-response';

type Props = {
  notification: NotificationResponse | null;
  onClose: () => void;
};

const NotificationDetailModal: React.FC<Props> = ({ notification, onClose }) => {
  if (!notification) return null;

  const getTypeStyle = (type: string) => {
    switch (type?.toUpperCase()) {
      case 'PAYMENT':
        return { bg: 'bg-emerald-50 text-emerald-600', label: 'Thanh toán', icon: CreditCard };
      case 'COURSE':
        return { bg: 'bg-blue-50 text-blue-600', label: 'Khóa học', icon: BookOpen };
      case 'SYSTEM':
        return { bg: 'bg-amber-50 text-amber-600', label: 'Hệ thống', icon: AlertTriangle };
      default:
        return { bg: 'bg-gray-50 text-gray-600', label: 'Thông báo', icon: Info };
    }
  };

  const { bg, label, icon: IconComponent } = getTypeStyle(notification.type);

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl relative z-10 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center ${bg}`}>
              <IconComponent size={14} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Chi tiết {label}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4 flex-1">
          <h3 className="text-lg font-bold text-gray-900 leading-snug">
            {notification.title}
          </h3>

          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <Calendar size={14} />
            <span>{formatTime(notification.createdAt)}</span>
          </div>

          <div className="bg-gray-50/60 rounded-xl p-4 border border-gray-100/50">
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
              {notification.content}
            </p>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-gray-50 bg-gray-50/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm"
          >
            Đóng lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetailModal;