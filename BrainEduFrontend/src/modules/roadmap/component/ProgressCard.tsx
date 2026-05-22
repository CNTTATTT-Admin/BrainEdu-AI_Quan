import React from 'react';
import { BookOpen, Clock, Check, Lock } from 'lucide-react';

interface ProgressCardProps {
  index: number;
  title: string;
  status: 'completed' | 'active' | 'locked';
  totalLessons?: number;
  totalHours?: number;
  lockMessage?: string;
  children?: React.ReactNode;
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  index,
  title,
  status,
  totalLessons,
  totalHours,
  lockMessage,
  children,
}) => {
  const isCompleted = status === 'completed';
  const isActive = status === 'active';
  const isLocked = status === 'locked';

  return (
    <div className="relative">
      <div className={`absolute -left-[25px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center z-10 shadow-sm ${
        isCompleted ? 'bg-emerald-500 text-white' :
        isActive ? 'bg-[#0052cc] text-white' : 'bg-gray-100 border border-gray-300 text-gray-400'
      }`}>
        {isCompleted && <Check size={14} strokeWidth={3} />}
        {isActive && <BookOpen size={12} />}
        {isLocked && <Lock size={12} />}
      </div>

      <div className={`border rounded-2xl p-5 shadow-sm transition-all ${
        isActive ? 'bg-white border-2 border-[#0052cc]' : 
        isLocked ? 'bg-gray-50 border-gray-200 border-dashed' : 'bg-white border-gray-100'
      }`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-wider block mb-0.5 ${
              isCompleted ? 'text-emerald-600' : isActive ? 'text-[#0052cc]' : 'text-gray-400'
            }`}>
              Giai đoạn {index}
            </span>
            <h4 className={`text-base font-bold ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
              {title}
            </h4>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap ${
            isCompleted ? 'bg-emerald-50 text-emerald-700' :
            isActive ? 'bg-blue-50 text-[#0052cc]' : 'bg-gray-200/60 text-gray-500'
          }`}>
            {isCompleted ? 'Đã hoàn thành' : isActive ? 'Đang học' : 'Đang khóa'}
          </span>
        </div>

        {!isLocked && (
          <div className="flex items-center gap-4 text-[11px] font-medium text-gray-400 mt-3">
            <div className="flex items-center gap-1">
              <BookOpen size={14} />
              <span>{totalLessons} bài học</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{totalHours} giờ học</span>
            </div>
          </div>
        )}

        {lockMessage && isLocked && (
          <p className="text-xs text-gray-400 italic mt-2">{lockMessage}</p>
        )}

        {children && <div className="space-y-2 mt-4">{children}</div>}
      </div>
    </div>
  );
};

export default ProgressCard;