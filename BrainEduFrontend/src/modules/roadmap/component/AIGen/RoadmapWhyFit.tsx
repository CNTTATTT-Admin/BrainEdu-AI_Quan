import React from 'react';
import { Clock, UserCheck, BarChart3 } from 'lucide-react';

const RoadmapWhyFit: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50/50 to-indigo-50/50 border border-purple-100 rounded-2xl p-6 shadow-2xs space-y-6 h-full flex flex-col justify-between">
      <div className="space-y-5">
        <div className="space-y-1">
          <h3 className="text-sm font-black text-purple-950 uppercase tracking-wider">
            Tại sao lộ trình này phù hợp với bạn?
          </h3>
          <p className="text-[11px] text-purple-700/80 font-medium">
            AI đã phân tích dữ liệu đầu vào và nhu cầu thị trường để tối ưu hóa riêng cho bạn.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-3 bg-white border border-purple-100 p-3.5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 flex-shrink-0">
              <Clock size={16} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-gray-900">Thời gian tối ưu</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Lộ trình được cấu trúc để vừa vặn với 2 giờ học mỗi ngày của bạn, không gây quá tải.
              </p>
            </div>
          </div>

          <div className="flex gap-3 bg-white border border-purple-100 p-3.5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 flex-shrink-0">
              <UserCheck size={16} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-gray-900">Cá nhân hóa kỹ năng</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Tập trung chuyên sâu vào React và Node.js, những mảng kỹ năng bạn còn thiếu dựa trên bài test đầu vào.
              </p>
            </div>
          </div>

          <div className="flex gap-3 bg-white border border-purple-100 p-3.5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
              <BarChart3 size={16} />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold text-gray-900">Nhu cầu thị trường</h4>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Các công nghệ trong lộ trình đang có nhu cầu tuyển dụng cao nhất tại Việt Nam (Theo báo cáo TopCV Insights).
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-gray-900 border border-purple-100 shadow-sm mt-4 lg:mt-0">
        <img 
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600" 
          alt="Data analytics dashboard" 
          className="w-full h-full object-cover opacity-80" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent p-4 flex flex-col justify-end">
          <p className="text-[10px] font-bold text-purple-300 italic leading-normal">
            "AI đã phân tích hơn 5,000 hồ sơ tuyển dụng để thiết kế các dự án được triển khai."
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapWhyFit;