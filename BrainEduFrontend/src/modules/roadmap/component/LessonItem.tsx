import React from 'react';
import { Play } from 'lucide-react';

interface LessonItemProps {
  title: string;
  type: 'current' | 'next';
}

const LessonItem: React.FC<LessonItemProps> = ({ title, type }) => {
  const isCurrent = type === 'current';

  return (
    <div className={`flex items-center justify-between p-3.5 border rounded-xl transition cursor-pointer ${
      isCurrent 
        ? 'bg-blue-50/50 border-blue-100 hover:bg-blue-50' 
        : 'bg-gray-50/50 border-gray-100'
    }`}>
      <span className={`text-xs font-semibold ${isCurrent ? 'text-gray-800' : 'text-gray-500'}`}>
        {title}
      </span>
      {isCurrent ? (
        <Play size={12} className="text-[#0052cc] fill-[#0052cc]" />
      ) : (
        <span className="text-[10px] font-bold text-gray-400 uppercase">Tiếp theo</span>
      )}
    </div>
  );
};

export default LessonItem;