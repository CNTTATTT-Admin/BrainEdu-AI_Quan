import React from 'react';
import { FileText } from 'lucide-react';

interface RoadmapHeaderProps {
  title: string;
  description: string;
  level: string;
  duration: string;
}

const RoadmapHeader: React.FC<RoadmapHeaderProps> = ({ title, description, level, duration }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-50 text-[#0052cc] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
          Cấp độ: {level}
        </span>
        <span className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase">
          Thời gian: {duration}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-tight">
        {title}
      </h2>
      <p className="text-sm text-gray-500 leading-relaxed max-w-3xl">
        {description}
      </p>
      <div className="flex flex-wrap gap-3 pt-2">
        <button className="bg-[#0052cc] hover:bg-blue-700 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-sm transition">
          Bắt đầu ngay
        </button>
        <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs py-3 px-6 rounded-xl transition flex items-center gap-2">
          <FileText size={14} /> Tải giáo trình (PDF)
        </button>
      </div>
    </div>
  );
};

export default RoadmapHeader;