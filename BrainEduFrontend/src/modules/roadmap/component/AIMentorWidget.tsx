import React from 'react';
import { Sparkles } from 'lucide-react';

interface AiMentorWidgetProps {
  weakness: string;
  advice: string;
  actionLabel: string;
}

const AiMentorWidget: React.FC<AiMentorWidgetProps> = ({ weakness, advice, actionLabel }) => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-purple-600 rounded-lg flex items-center justify-center text-white shadow-sm">
          <Sparkles size={14} />
        </div>
        <div>
          <span className="text-[9px] font-bold text-purple-600 uppercase tracking-wider block">
            AI Mentor của bạn
          </span>
          <h4 className="text-xs font-bold text-gray-900">Lời khuyên từ AI</h4>
        </div>
      </div>

      <div className="bg-white border border-purple-100/50 rounded-xl p-4 space-y-3 shadow-2xs">
        <p className="text-xs text-gray-600 leading-relaxed">
          Dựa trên kết quả bài kiểm tra <strong className="text-gray-900">"JavaScript Fundamentals"</strong> vừa qua, tôi nhận thấy bạn gặp chút khó khăn ở phần <span className="text-purple-600 font-bold">{weakness}</span>.
        </p>
        <div className="border-l-2 border-purple-400 pl-3 py-0.5 space-y-1">
          <span className="text-[10px] font-bold text-purple-700 block">Gợi ý lộ trình nhỏ:</span>
          <p className="text-[11px] text-gray-500 leading-relaxed">{advice}</p>
        </div>
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-[11px] py-2.5 px-4 rounded-lg transition shadow-2xs">
          {actionLabel}
        </button>
      </div>

      <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 pt-1">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
        AI đang sẵn sàng hỗ trợ 24/7
      </div>
    </div>
  );
};

export default AiMentorWidget;