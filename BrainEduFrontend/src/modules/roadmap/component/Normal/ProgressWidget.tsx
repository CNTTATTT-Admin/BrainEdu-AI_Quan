import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ProgressWidgetProps {
  percentage: number;
  completedCount: number;
  totalCount: number;
  nextLessonNumber: number;
}

const ProgressWidget: React.FC<ProgressWidgetProps> = ({
  percentage,
  completedCount,
  totalCount,
  nextLessonNumber,
}) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-700">Tiến độ lộ trình</span>
        <span className="text-lg font-black text-[#0052cc]">{percentage}%</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#0052cc] rounded-full transition-all duration-300" 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 font-medium">
        Đã hoàn thành <strong className="text-gray-800">{completedCount}/{totalCount}</strong> bài học
      </p>
      <button className="w-full bg-[#0052cc] hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5">
        Tiếp tục học bài {nextLessonNumber} <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default ProgressWidget;