import React from 'react';
import { Sparkles } from 'lucide-react';

const RecommendationWidget: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-5 shadow-2xs space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={16} className="text-purple-600" />
        <h4 className="text-xs font-black text-purple-900 uppercase tracking-wider">AI Đề xuất</h4>
      </div>
      <p className="text-xs text-gray-600 leading-relaxed">
        Dựa trên lịch sử học JavaScript của bạn... Bạn nên bắt đầu với <strong className="text-gray-900">"Thực chiến TypeScript"</strong> để tối ưu hóa quy trình phát triển.
      </p>

      <div className="bg-white border border-purple-100 p-3 rounded-xl flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0">
          <img src="https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=150" alt="ts" className="w-full h-full object-cover" />
        </div>
        <div className="min-w-0">
          <span className="text-[9px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">Dành cho bạn</span>
          <h5 className="text-xs font-bold text-gray-900 truncate mt-1">TypeScript & NestJS Mastery</h5>
        </div>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition shadow-2xs">
        Khám phá lộ trình AI
      </button>
    </div>
  );
};

export default RecommendationWidget;