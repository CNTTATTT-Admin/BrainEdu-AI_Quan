import React from 'react';
import { Sparkles, Calendar, BookOpen, Award, ArrowRight, Download } from 'lucide-react';

interface OverviewProps {
  timeline: number;
  totalLessons: number;
  skillNumber: number;
  targetJob: string;
  isPending: boolean;
}

const RoadmapOverview: React.FC<OverviewProps> = ({
  timeline, totalLessons, skillNumber, targetJob, isPending
}) => {
  if (isPending) {
    return <div className="h-48 w-full bg-white border border-gray-100 rounded-2xl animate-pulse" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-2xs">
      <div className="lg:col-span-7 space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg text-purple-700 text-[11px] font-bold">
          <Sparkles size={12} className="fill-purple-200" />
          <span>Đề xuất bởi AI trí tuệ</span>
        </div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Lộ trình cá nhân hóa của bạn
        </h1>
        <p className="text-xs text-gray-500 leading-relaxed max-w-xl">
          Dựa trên mục tiêu trở thành <strong className="text-gray-800">{targetJob}</strong> của bạn, AI đã thiết kế lộ trình tối ưu này. Chúng tôi tập trung vào việc lấp đầy các khoảng trống kỹ năng của bạn một cách nhanh nhất.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 shadow-2xs cursor-pointer">
            Bắt đầu lộ trình <ArrowRight size={14} />
          </button>
          <button className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-bold text-xs py-2.5 px-4 rounded-xl transition flex items-center gap-1.5 cursor-pointer">
            Tải lộ trình <Download size={14} />
          </button>
        </div>
      </div>

      <div className="lg:col-span-5 bg-gray-50 rounded-xl p-4 border border-gray-100 flex flex-col justify-between space-y-4">
        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Tổng quan lộ trình</span>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-gray-200/60 pb-2">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Calendar size={14} className="text-blue-500" />
              <span>Thời gian dự kiến</span>
            </div>
            <span className="font-bold text-gray-900">{timeline} tháng</span>
          </div>

          <div className="flex items-center justify-between text-xs border-b border-gray-200/60 pb-2">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <BookOpen size={14} className="text-purple-500" />
              <span>Số lượng khóa học</span>
            </div>
            <span className="font-bold text-gray-900">{totalLessons} khóa học</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-gray-500 font-medium">
              <Award size={14} className="text-amber-500" />
              <span>Kỹ năng đạt được</span>
            </div>
            <span className="font-bold text-gray-900">{skillNumber} kỹ năng</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
            <span>Tiến độ hoàn thành</span>
            <span className="text-blue-600">0%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-0 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapOverview;