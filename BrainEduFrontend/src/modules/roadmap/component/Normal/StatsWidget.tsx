import React from 'react';
import { Flame } from 'lucide-react';

interface StatsWidgetProps {
  streakDays: number;
  totalHours: number;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({ streakDays, totalHours }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
      <h4 className="text-xs font-bold text-gray-700">Thành tích học tập</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500 font-medium">Chuỗi học tập (Streak)</span>
          <div className="flex items-center gap-1 text-amber-600 font-bold">
            <Flame size={14} className="fill-amber-500 stroke-amber-600" />
            <span>{streakDays} ngày</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500 font-medium">Tổng thời gian</span>
          <span className="text-gray-800 font-bold">{totalHours} giờ</span>
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;